package com.ecommerce.project.controller;


import com.ecommerce.project.model.AppRole;
import com.ecommerce.project.model.Role;
import com.ecommerce.project.model.User;
import com.ecommerce.project.repositories.RoleRepository;
import com.ecommerce.project.repositories.UserRepository;
import com.ecommerce.project.security.jwt.JwtUtils;
import com.ecommerce.project.security.jwt.security.services.UserDetailImpl;
import com.ecommerce.project.security.request.LoginRequest;
import com.ecommerce.project.security.request.SignupRequest;
import com.ecommerce.project.security.response.MessageResponse;
import com.ecommerce.project.security.response.UserInfoResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Tag(name = "Auth APIs",description = "APIs for managing users")
    @Operation(summary = "Signing in the Existing user",description = "Api to sign in the existing user")
    @ApiResponses({@ApiResponse(responseCode = "302",description = "Authentication Successfull"),
            @ApiResponse(responseCode = "404",description = "There is no user found with these details"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
    @PostMapping("signin")
    public ResponseEntity<?> authentication(@RequestBody LoginRequest loginRequest)
{
     Authentication authentication;
     try{
         authentication=authenticationManager.authenticate
                 (new UsernamePasswordAuthenticationToken
                         (loginRequest.getUsername(),loginRequest.getPassword()));

     }catch (AuthenticationException e)
     {

         Map<String,Object> map=new HashMap<>();
         map.put("message","Bad credentials");
         map.put("status",false);
         return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
     }
    SecurityContextHolder.getContext().setAuthentication(authentication);
    UserDetailImpl userDetail=(UserDetailImpl) authentication.getPrincipal();
//    String jwtToken=jwtUtils.generateJwtTokenFromUsername(userDetail);
    ResponseCookie jwtCookie=jwtUtils.generateJwtCookie(userDetail);
    List<String> roles=userDetail.getAuthorities().stream().map(item->item.getAuthority()).toList();
//    UserInfoResponse response=new UserInfoResponse(userDetail.getId(), jwtToken, userDetail.getUsername(), roles);
    UserInfoResponse response=new UserInfoResponse(userDetail.getId(),jwtCookie.toString(),userDetail.getUsername(),userDetail.getEmail(),roles);
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,jwtCookie.toString()).body(response);
}

    @Tag(name = "Auth APIs",description = "APIs for managing users")
    @Operation(summary = "Sign Up the  new user",description = "Api to sign up the new user")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Register  Successfull"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
@PostMapping("signup")
public ResponseEntity<?> register(@Valid @RequestBody SignupRequest signupRequest)
{
    if(userRepository.existsByUsername(signupRequest.getUsername()))
    {
        return ResponseEntity.badRequest().
                body(new MessageResponse("Error : username  is already exist!"));
    }
    if(userRepository.existsByEmail(signupRequest.getEmail()))
    {
        return ResponseEntity.badRequest().
                body(new MessageResponse("Error : email is already exist"));
    }
    User user=new User(
            signupRequest.getUsername(),
            signupRequest.getEmail(),
            passwordEncoder.encode(signupRequest.getPassword())
    );
    Set<String> strRoles=signupRequest.getRoles();
    Set<Role> roles = new HashSet<>();
    if(strRoles==null)
    {
        Role userRole=roleRepository.findByRoleName(AppRole.ROLE_USER)
                .orElseThrow(()->new RuntimeException("ERROR: Role is not found"));
        roles.add(userRole);
    }else {
        strRoles.forEach(role-> {
            switch (role) {
                case "admin":
                    Role adminRole=roleRepository.findByRoleName (AppRole.ROLE_ADMIN)
                            .orElseThrow(()->new RuntimeException("Error: Role name is not found"));
                    roles.add(adminRole);
                    break;
                case "seller":
                    Role sellerRole=roleRepository.findByRoleName(AppRole.ROLE_SELLER)
                            .orElseThrow(()->new RuntimeException("Error: Role is ot found"));
                    roles.add(sellerRole);
                    break;
                default:
                    Role userRole=roleRepository.findByRoleName(AppRole.ROLE_USER)
                            .orElseThrow(()->new RuntimeException("Error: Role is not found"));
                    roles.add(userRole);
            }
        });
    }
    user.setRoles(roles);
    userRepository.save(user);
    return ResponseEntity.ok(new MessageResponse("Message : user is registered"));
}

    @Tag(name = "Auth APIs",description = "APIs for managing users")
    @Operation(summary = "Getting the  Existing users's username",description = "Api to get  the existing user's username")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Found Successfull"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
    @GetMapping("getusername")
   public String getUsername(Authentication authentication)
   {

       if(authentication!=null)
       {
           return authentication.getName();
       }
       else{
           return "";
       }
   }

    @Tag(name = "Auth APIs",description = "APIs for managing users")
    @Operation(summary = " Get the Existing user's details",description = "Api to get the existing user's details")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Found Successfull"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
   @GetMapping("getuserdetails")
   public ResponseEntity<?> getUser(Authentication authentication)
   {
       UserDetailImpl userDetail=(UserDetailImpl) authentication.getPrincipal();
       ResponseCookie jwtCookie=jwtUtils.generateJwtCookie(userDetail);


       List<String> roles=userDetail.getAuthorities().stream().map(auth->auth.getAuthority()).toList();

       UserInfoResponse userInfoResponse=new UserInfoResponse(userDetail.getId(),jwtCookie.toString(),userDetail.getUsername(),userDetail.getEmail(),roles);
       return ResponseEntity.ok(userInfoResponse);
   }


    @Tag(name = "Auth APIs",description = "APIs for managing users")
    @Operation(summary = "Sign out the Existing user",description = "Api to sign out the existing user")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Logout Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
   @PostMapping("signout")
   public ResponseEntity<?> signoutUser()
   {
       ResponseCookie cookie=jwtUtils.getCleanCookie();
       return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString()).body(new MessageResponse("You have been signed out"));
   }
}
