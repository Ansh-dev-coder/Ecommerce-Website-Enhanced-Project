package com.ecommerce.project.service;

import com.ecommerce.project.model.Address;
import com.ecommerce.project.model.User;
import com.ecommerce.project.payload.AddressDTO;
import org.springframework.stereotype.Component;

import java.util.List;

@Component

public interface AddressService {
    AddressDTO createAddress(AddressDTO addressDTO, User user);

    List<AddressDTO> gettingAllAddress();

    AddressDTO getAddressById(Long addressId);

    List<AddressDTO> getUserAddress(User user);


    AddressDTO updateAddressById(Long addressId,AddressDTO addressDTO,User user);

    String deleteAddress(Long addressId, User user);
}
