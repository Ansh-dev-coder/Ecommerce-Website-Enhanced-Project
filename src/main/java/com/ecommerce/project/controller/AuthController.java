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
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    String jwtToken=jwtUtils.generateJwtTokenFromUsername(userDetail);
    List<String> roles=userDetail.getAuthorities().stream().map(item->item.getAuthority()).toList();
    UserInfoResponse response=new UserInfoResponse(userDetail.getId(), jwtToken, userDetail.getUsername(), roles);
    return ResponseEntity.ok(response);
}
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
}
