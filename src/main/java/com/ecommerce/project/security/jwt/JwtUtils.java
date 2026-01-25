package com.ecommerce.project.security.jwt;


import com.ecommerce.project.security.jwt.security.services.UserDetailImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {
    @Value("${spring.app.jwtExpirationMs}")
    private int jwtExpirationMs;
    @Value("${spring.app.jwtSecret}")
    private String jwtSecret;
    @Value("${spring.app.jwtCookie}")
    private String jwtCookie;
    private static final Logger logger= LoggerFactory.getLogger(JwtUtils.class);
    public String getJwtFromCookie(HttpServletRequest httpServletRequest)
    {
        Cookie cookie= WebUtils.getCookie(httpServletRequest,jwtCookie);
        if(cookie!=null)
        {
            return cookie.getValue();
        }
        else {
            return null;
        }
    }

public ResponseCookie generateJwtCookie(UserDetailImpl userDetail)
{
        String jwt=generateJwtTokenFromUsername(userDetail.getUsername());
        ResponseCookie cookie=ResponseCookie.from(jwtCookie,jwt)
                .path("/api")
                .maxAge(24*60*60)
                .httpOnly(false)
                .build();
        return cookie;
}

public ResponseCookie getCleanCookie()
{
    ResponseCookie cookie=ResponseCookie.from(jwtCookie,null).path("/api").build();
    return cookie;
}
   public String getJwtFromHeaders(HttpServletRequest request)
   {
       String bearerToken =request.getHeader("Authorization");
        if(bearerToken !=null && bearerToken.startsWith("Bearer "))
        {
            return bearerToken.substring(7);
        }
        return null ;
   }
   public String generateJwtTokenFromUsername(String username)
   {
//       String username=userDetail.getUsername();
       return Jwts.builder()
               .subject(username)
               .issuedAt(new Date())
               .expiration(new Date(new Date().getTime()+jwtExpirationMs)).
               signWith(key())
               .compact();
   }
   public String getUsernameFromJwtToken(String token)
   {
     return   Jwts.parser()
               .verifyWith((SecretKey) key())
               .build()
               .parseSignedClaims(token)
               .getPayload()
               .getSubject();
   }
   public Key key()
   {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
   }
   public boolean validateToken(String authToken)
   {
       try {
           Jwts.parser().verifyWith((SecretKey) key()).build().parseSignedClaims(authToken);
           return true;
       }catch (MalformedJwtException e)
       {
           logger.error("Invalid Jwt Token : {}",e.getMessage());
       }catch (ExpiredJwtException e)
       {
           logger.error("Jwt Token Is expired : {}",e.getMessage());
       }catch ( UnsupportedJwtException e)
       {
           logger.error("Jwt Token is UnSupported  : {}",e.getMessage());
       }
       catch (IllegalArgumentException e)
       {
           logger.error("Jwt claims String is empty : {}",e.getMessage());
       }
       return false;
   }
}
