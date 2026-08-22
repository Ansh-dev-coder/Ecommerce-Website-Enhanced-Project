package com.ecommerce.project.service;

import com.ecommerce.project.model.AppRole;
import com.ecommerce.project.model.Role;
import com.ecommerce.project.model.User;
import com.ecommerce.project.payload.AuthenticationResult;
import com.ecommerce.project.payload.UserDTO;
import com.ecommerce.project.payload.UserResponse;
import com.ecommerce.project.repositories.RoleRepository;
import com.ecommerce.project.repositories.UserRepository;
import com.ecommerce.project.security.jwt.JwtUtils;
import com.ecommerce.project.security.jwt.security.services.UserDetailImpl;
import com.ecommerce.project.security.request.LoginRequest;
import com.ecommerce.project.security.request.SignupRequest;
import com.ecommerce.project.security.response.MessageResponse;
import com.ecommerce.project.security.response.UserInfoResponse;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
public class AuthServiceImpl implements AuthService{
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ModelMapper mapper;

    @Override
    public AuthenticationResult login(LoginRequest loginRequest) {
        Authentication authentication=authenticationManager.authenticate
                (new UsernamePasswordAuthenticationToken
                        (loginRequest.getUsername(),loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailImpl userDetail=(UserDetailImpl) authentication.getPrincipal();
//    String jwtToken=jwtUtils.generateJwtTokenFromUsername(userDetail);
        ResponseCookie jwtCookie=jwtUtils.generateJwtCookie(userDetail);
        List<String> roles=userDetail.getAuthorities().stream().map(item->item.getAuthority()).toList();
//    UserInfoResponse response=new UserInfoResponse(userDetail.getId(), jwtToken, userDetail.getUsername(), roles);
     UserInfoResponse userInfoResponse = new UserInfoResponse(userDetail.getId(),jwtCookie.toString(),userDetail.getUsername(),userDetail.getEmail(),roles);
     return new AuthenticationResult(userInfoResponse,jwtCookie);
    }

    @Override
    public ResponseEntity<MessageResponse> register(SignupRequest signupRequest) {
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

    @Override
    public UserInfoResponse getCurrentUserDetails(Authentication authentication) {
        UserDetailImpl userDetail=(UserDetailImpl) authentication.getPrincipal();
        ResponseCookie jwtCookie=jwtUtils.generateJwtCookie(userDetail);


        List<String> roles=userDetail.getAuthorities().stream().map(auth->auth.getAuthority()).toList();

        UserInfoResponse userInfoResponse=new UserInfoResponse(userDetail.getId(),jwtCookie.toString(),userDetail.getUsername(),userDetail.getEmail(),roles);
        return userInfoResponse;
    }

    @Override
    public ResponseCookie logoutUser() {

        return  jwtUtils.getCleanCookie();
    }

    @Override
    public UserResponse getAllSellers(Pageable pageDetails) {
        Page<User> allUser=userRepository.findByRoleName(AppRole.ROLE_SELLER,pageDetails);
        List<UserDTO> userDTOS=allUser.getContent().stream().map(p->mapper.map(p, UserDTO.class)).toList();

        UserResponse userResponse=new UserResponse();
        userResponse.setContent(userDTOS);
        userResponse.setPageNumber(allUser.getNumber());
        userResponse.setPageSize(allUser.getSize());
        userResponse.setTotalElements(allUser.getTotalElements());
        userResponse.setTotalPages(allUser.getTotalPages());
        userResponse.setLastPage(allUser.isLast());
        return userResponse;
    }
}
