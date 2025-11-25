package com.ecommerce.project.security.jwt.config;

import com.ecommerce.project.model.AppRole;
import com.ecommerce.project.model.Role;
import com.ecommerce.project.model.User;
import com.ecommerce.project.repositories.RoleRepository;
import com.ecommerce.project.repositories.UserRepository;
import com.ecommerce.project.security.jwt.AuthEntryPoint;
import com.ecommerce.project.security.jwt.AuthTokenFilter;
import com.ecommerce.project.security.jwt.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Set;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private AuthEntryPoint authEntryPoint;

    @Bean
    public AuthTokenFilter authenticationFilter()
    {
        return new AuthTokenFilter();
    }
    @Bean
    public DaoAuthenticationProvider authenticationProvider()
    {
        DaoAuthenticationProvider daoAuthenticationProvider=new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        return daoAuthenticationProvider;
    }
    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfiguration) throws Exception {
       return authConfiguration.getAuthenticationManager();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(c-> c.disable())
                .sessionManagement(session->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(exception->
                        exception.authenticationEntryPoint(authEntryPoint))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(authenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults())
                .authorizeHttpRequests(auth->
                        auth.requestMatchers("/api/auth/**").permitAll()
                                .requestMatchers("/v3/api-docs/**").permitAll()
                                .requestMatchers("/swagger-ui/**").permitAll()
                                //.requestMatchers("/api/public/**").permitAll()
                                //.requestMatchers("/api/admin/**").permitAll()
                                .requestMatchers("/api/test/**").permitAll()
                                .requestMatchers("/images/**").permitAll()
                                .anyRequest().authenticated());
        return httpSecurity.build();
    }
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer()
    {
      return   (web -> web.ignoring().requestMatchers("/v2/api-docs",
              "/configuration/ui",
              "/swagger-resources/**",
              "configuration/security",
              "/swagger-ui.html",
              "/webjars/**"
              ));
    }
    public CommandLineRunner init(RoleRepository roleRepository, UserRepository userRepository,PasswordEncoder passwordEncoder)
    {
        return args -> {
            Role userRole=roleRepository.findByRoleName(AppRole.ROLE_USER)
                    .orElseGet(()->{
                       Role newUserRole=new Role(AppRole.ROLE_USER);
                      return roleRepository.save(newUserRole);
                    });
            Role sellerRole=roleRepository.findByRoleName(AppRole.ROLE_SELLER)
                    .orElseGet(()->{
                        Role newSellerRole=new Role(AppRole.ROLE_SELLER);
                        return roleRepository.save(newSellerRole);
                    });
            Role adminRole=roleRepository.findByRoleName(AppRole.ROLE_ADMIN)
                    .orElseGet(()->{

                        Role newAdminRole=new Role(AppRole.ROLE_ADMIN);
                        return roleRepository.save(newAdminRole);
                    });
            Set<Role> userRoles=Set.of(userRole);
            Set<Role> adminRoles=Set.of(adminRole);
            Set<Role> sellerRoles=Set.of(sellerRole);
        if (!userRepository.existsByUsername("user1")) {
            User user1 = new User("user1",
                    "user1@exapmle.com",
                    passwordEncoder.encode("user@1234"));
        }
        if(!userRepository.existsByUsername("admin1")) {
            User admin1 = new User("admin1",
                    "admin1@example.com",
                    passwordEncoder.encode("admin@1234"));
        }
        if(!userRepository.existsByUsername("seller1")) {

            User seller1 = new User("seller1",
                    "seller1@example.com",
                    passwordEncoder.encode("seller@1234"));
        }
        userRepository.findByUsername("user1").ifPresent(user ->{
            user.setRoles(userRoles);
            userRepository.save(user);
        });
        userRepository.findByUsername("admin1").ifPresent(admin->{
            admin.setRoles(adminRoles);
            userRepository.save(admin);
        });
        userRepository.findByUsername("seller1").ifPresent(seller->{
           seller.setRoles(sellerRoles);
           userRepository.save(seller);
        });
        };
    }
}
