package com.ecommerce.project.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customSwagger() {
        SecurityScheme securityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .description("JWT Bearer Token");
        SecurityRequirement securityRequirement = new SecurityRequirement()
                .addList("Bearer Authorization");
        return new OpenAPI().
                info(new Info()
                        .title("Springboot eCommerce API")
                        .version("1.0")
                        .description("This is the springboot project for eCommerce")
                        .license(new License().name("Apace 2.0"))
                        .contact(new Contact()
                                .name("Ansh Saxena")
                                .email("anshsaxena27@gmail.com")
                                .url("https://github.com/Ansh-dev-coder/Ecommerce-Website-Enhanced-Project")
                                ))
                .components(new Components()
                .addSecuritySchemes("Bearer Authorization",securityScheme))
                .addSecurityItem(securityRequirement);
    }


}
