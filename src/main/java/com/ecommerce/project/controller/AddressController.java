package com.ecommerce.project.controller;

import com.ecommerce.project.model.User;
import com.ecommerce.project.payload.AddressDTO;
import com.ecommerce.project.service.AddressService;
import com.ecommerce.project.util.AuthUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AddressController {


    @Autowired
    private AddressService addressService;

    @Autowired
    private AuthUtil authUtil;
    //Creating address
    @PostMapping("/addresses")
    public ResponseEntity<AddressDTO> creatingAddress(@Valid @RequestBody AddressDTO addressDTO)
    {
        User user=authUtil.loggedInUser();
        AddressDTO address=addressService.createAddress(addressDTO,user);
        return new ResponseEntity<>(address, HttpStatus.CREATED);
    }

    @GetMapping("/addresses")
    public ResponseEntity<List<AddressDTO>> gettingAllAddress()
    {
        List<AddressDTO> addressDTOS=addressService.gettingAllAddress();
        return new ResponseEntity<>(addressDTOS,HttpStatus.OK);
    }

    @GetMapping("/addresses/{addressId}")
    public ResponseEntity<AddressDTO> getAddressById(@PathVariable Long addressId)
    {
            AddressDTO addressDTO=addressService.getAddressById(addressId);
            return new ResponseEntity<>(addressDTO,HttpStatus.OK);
    }

    @GetMapping("/users/address")
    public ResponseEntity<List<AddressDTO>> getAddressByUser()
    {
        User user=authUtil.loggedInUser();

       List< AddressDTO>addressDTO=addressService.getUserAddress(user);
        return new ResponseEntity<>(addressDTO,HttpStatus.OK);

    }

    @PutMapping("addresses/{addressId}")
    public ResponseEntity<AddressDTO> updateAddress(@PathVariable Long addressId,
                                                    @Valid @RequestBody AddressDTO addressDTO)
    {
       User user=authUtil.loggedInUser();
         AddressDTO updatedAddress=addressService.updateAddressById(addressId,addressDTO,user);
         return new ResponseEntity<>(updatedAddress,HttpStatus.OK);
    }

    @DeleteMapping("addresses/{addressId}")
    public ResponseEntity<String> deleteAddress(@PathVariable Long addressId)
    {
        User user=authUtil.loggedInUser();
        String status=addressService.deleteAddress(addressId,user);
        return new ResponseEntity<>(status,HttpStatus.OK);
    }
}
