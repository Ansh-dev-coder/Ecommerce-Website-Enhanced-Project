package com.ecommerce.project.security.jwt;

import com.ecommerce.project.security.jwt.security.services.UserDetailImpl;
import com.ecommerce.project.security.jwt.security.services.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class AuthTokenFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    private static final Logger logger= LoggerFactory.getLogger(AuthTokenFilter.class);
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try{
            String jwtToken=parseJwt(request);
            if(jwtToken!=null && jwtUtils.validateToken(jwtToken))
            {
                String username=jwtUtils.getUsernameFromJwtToken(jwtToken);
                UserDetailImpl userDetail= (UserDetailImpl) userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(
                        userDetail,null,userDetail.getAuthorities()                );
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }catch (Exception e)
        {
            logger.error("Cannot set user authentication : {}",e);
        }
        filterChain.doFilter(request,response);
    }
//    private String parseJwt(HttpServletRequest request) {
//        String jwtToken=jwtUtils.getJwtFromHeaders(request);
//        String jwtToken=jwtUtils.getJwtFromCookie(request);
//        return jwtToken;
//    }
    private String parseJwt(HttpServletRequest request) {
        String jwtFromCookie = jwtUtils.getJwtFromCookie(request);
        if (jwtFromCookie != null) {
            return jwtFromCookie;
        }
        String jwtFromHeader = jwtUtils.getJwtFromHeaders(request);
        if (jwtFromHeader != null) {
            return jwtFromHeader;
        }
        return null;
    }
}
