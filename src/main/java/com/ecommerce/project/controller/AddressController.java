package com.ecommerce.project.controller;

import com.ecommerce.project.model.User;
import com.ecommerce.project.payload.AddressDTO;
import com.ecommerce.project.service.AddressService;
import com.ecommerce.project.util.AuthUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
    @Tag(name = "Address APIs",description = "APIs for managing address")
    @Operation(summary = "Create address",description = "Api to create the new category")
    @ApiResponses({@ApiResponse( responseCode="201",description = "Address Created Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal server error",content = @Content)
    })
    @PostMapping("/addresses")
    public ResponseEntity<AddressDTO> creatingAddress(@Valid @RequestBody AddressDTO addressDTO)
    {
        User user=authUtil.loggedInUser();
        AddressDTO address=addressService.createAddress(addressDTO,user);
        return new ResponseEntity<>(address, HttpStatus.CREATED);
    }

    @Tag(name = "Address APIs",description = "APIs for managing address")
    @Operation(summary = "Getting all the address",description = "Api to get all the address")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Successfull"),
    @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
    @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
    @GetMapping("/addresses")
    public ResponseEntity<List<AddressDTO>> gettingAllAddress()
    {
        List<AddressDTO> addressDTOS=addressService.gettingAllAddress();
        return new ResponseEntity<>(addressDTOS,HttpStatus.OK);
    }

    @Tag(name = "Address APIs",description = "APIs for managing address")
    @Operation(summary = "Get address by Id",description = "Api to get address  by Id")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Successfull"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
    @GetMapping("/addresses/{addressId}")
    public ResponseEntity<AddressDTO> getAddressById(@PathVariable Long addressId)
    {
            AddressDTO addressDTO=addressService.getAddressById(addressId);
            return new ResponseEntity<>(addressDTO,HttpStatus.OK);
    }
    @Tag(name = "Address APIs",description = "APIs for managing address")
    @Operation(summary = "Get Logged in User address",description = "Api to get Logged in user address")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Successfull"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
    @GetMapping("/user/address")
    public ResponseEntity<List<AddressDTO>> getAddressByUser()
    {
        User user=authUtil.loggedInUser();

       List< AddressDTO>addressDTO=addressService.getUserAddress(user);
        return new ResponseEntity<>(addressDTO,HttpStatus.OK);

    }

    @Tag(name = "Address APIs",description = "APIs for managing address")
    @Operation(summary = "Update address",description = "Api to update address  by address Id")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Successfull"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
    @PutMapping("addresses/{addressId}")
    public ResponseEntity<AddressDTO> updateAddress(@PathVariable Long addressId,
                                                    @Valid @RequestBody AddressDTO addressDTO)
    {
       User user=authUtil.loggedInUser();
         AddressDTO updatedAddress=addressService.updateAddressById(addressId,addressDTO,user);
         return new ResponseEntity<>(updatedAddress,HttpStatus.OK);
    }

    @Tag(name = "Address APIs",description = "APIs for managing address")
    @Operation(summary = "Deleting the address",description = "Api to delete address  by Id")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Deleted Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
    @DeleteMapping("addresses/{addressId}")
    public ResponseEntity<String> deleteAddress(@PathVariable Long addressId)
    {
        User user=authUtil.loggedInUser();
        String status=addressService.deleteAddress(addressId,user);
        return new ResponseEntity<>(status,HttpStatus.OK);
    }
}
