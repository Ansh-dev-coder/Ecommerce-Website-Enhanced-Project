package com.ecommerce.project.controller;


import com.ecommerce.project.payload.AuthenticationResult;
import com.ecommerce.project.security.request.LoginRequest;
import com.ecommerce.project.security.request.SignupRequest;
import com.ecommerce.project.security.response.MessageResponse;
import com.ecommerce.project.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;
    @Tag(name = "Auth APIs",description = "APIs for managing users")
    @Operation(summary = "Signing in the Existing user",description = "Api to sign in the existing user")
    @ApiResponses({@ApiResponse(responseCode = "302",description = "Authentication Successfull"),
            @ApiResponse(responseCode = "404",description = "There is no user found with these details"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
    @PostMapping("signin")
    public ResponseEntity<?> authentication(@RequestBody LoginRequest loginRequest)
{
    AuthenticationResult result= authService.login(loginRequest);
    return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE,result.getJwtCookie().toString())
            .body(result.getResponse());
}

    @Tag(name = "Auth APIs",description = "APIs for managing users")
    @Operation(summary = "Sign Up the  new user",description = "Api to sign up the new user")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Register  Successfull"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
@PostMapping("signup")
public ResponseEntity<?> register(@Valid @RequestBody SignupRequest signupRequest)
{
    return authService.register(signupRequest);
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
       return ResponseEntity.ok().body(authService.getCurrentUserDetails(authentication));
   }


    @Tag(name = "Auth APIs",description = "APIs for managing users")
    @Operation(summary = "Sign out the Existing user",description = "Api to sign out the existing user")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Logout Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
   @PostMapping("signout")
   public ResponseEntity<?> signoutUser()
   {
       ResponseCookie cookie=authService.logoutUser();
       return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,cookie.toString()).body(new MessageResponse("You have been signed out"));
   }
}
