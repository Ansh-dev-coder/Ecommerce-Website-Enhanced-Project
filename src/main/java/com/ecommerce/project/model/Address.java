package com.ecommerce.project.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer addressId;
    @NotBlank
    @Size(min = 4,message = "street must be at least 4 characters")
    private String street;
    @NotBlank
    @Size(min = 4,message = "Building name must be at least 4 characters")
    private String buildingName;
    @NotBlank
    @Size(min = 4,message = "city name must be 4 characters")
    private String city;
    @NotBlank
    @Size(min = 4,message = "state name must be 4 characters")
    private String state;
    @NotBlank
    @Size(min = 4,message = "country name must be 4 characters")
    private String country;
    @NotBlank
    @Size(min = 4,message = "pincode must be 4 characters")
    private String pincode;
    @ToString.Exclude
    @ManyToMany(mappedBy = "addresses")
    private List<User> users=new ArrayList<>();
    public Address(String street, String buildingName, String city, String state, String country,String pincode)
    {
        this.street=street;
        this.buildingName=buildingName;
        this.city=city;
        this.state=state;
        this.country=country;
        this.pincode=pincode;
    }
}
