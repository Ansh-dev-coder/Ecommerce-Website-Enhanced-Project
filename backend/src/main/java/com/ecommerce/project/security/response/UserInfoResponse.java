package com.ecommerce.project.security.response;

import lombok.*;
import org.springframework.http.ResponseCookie;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponse {
    private Long id;
    private String jwtCookie;
    private String username;
    private String email;
    private List<String> roles;

//    public UserInfoResponse(Long id, String username, List<String> roles) {
//        this.id = id;
//        this.username = username;
//        this.roles = roles;
//    }
}
