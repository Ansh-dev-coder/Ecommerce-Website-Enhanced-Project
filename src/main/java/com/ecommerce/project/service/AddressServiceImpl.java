package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Address;
import com.ecommerce.project.model.User;
import com.ecommerce.project.payload.AddressDTO;
import com.ecommerce.project.repositories.AddressRepository;
import com.ecommerce.project.util.AuthUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService{
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private ModelMapper mapper;
    @Override
    public AddressDTO createAddress(AddressDTO addressDTO, User user) {
        Address newAddress =mapper.map(addressDTO,Address.class);
        List<Address> addressList =user.getAddresses();
        addressList.add(newAddress);
        user.setAddresses(addressList);
        newAddress.setUser(user);
        Address savedAddress=addressRepository.save(newAddress);
        AddressDTO addressDTO1=mapper.map(savedAddress,AddressDTO.class);
        return addressDTO1;
    }

    @Override
    public List<AddressDTO> gettingAllAddress() {
        List<Address> addresses=addressRepository.findAll();
        List<AddressDTO> addressDTOS=addresses.stream()
                .map(address -> mapper.map(address, AddressDTO.class)).toList();
        return addressDTOS;
    }

    public AddressDTO getAddressById(Long addressId)
    {

        Address address=addressRepository.findById(addressId)
                .orElseThrow(()->new ResourceNotFoundException("Address","addressId",addressId));

        AddressDTO addressDTO=mapper.map(address,AddressDTO.class);
        return addressDTO;
    }

    public List<AddressDTO> getUserAddress(User user)
    {
       List<Address> address=user.getAddresses();
        List<AddressDTO> addressDTO=address.stream()
                .map(add ->mapper.map(add, AddressDTO.class)).toList();
        return addressDTO;
    }

    @Override
    public AddressDTO updateAddressById( Long addressId,AddressDTO addressDTO,User user) {
        Address address=addressRepository.findAddressByAddressIdAndUser(addressId, user)
                .orElseThrow(()->new ResourceNotFoundException("Address","addressId",addressId));



            address.setCountry(addressDTO.getCountry());
            address.setPincode(addressDTO.getPincode());
            address.setCity(addressDTO.getCity());
            address.setState(addressDTO.getState());
            address.setBuildingName(addressDTO.getBuildingName());
            address.setStreet(addressDTO.getStreet());

            Address savedAddress = addressRepository.save(address);

        AddressDTO savedAddressDTO=mapper.map(savedAddress, AddressDTO.class);
        return savedAddressDTO;
    }

    @Override
    public String deleteAddress(Long addressId, User user) {
       Address address= addressRepository.findAddressByAddressIdAndUser(addressId,user)
               .orElseThrow(()->new ResourceNotFoundException("Address","addressId",addressId));

       addressRepository.delete(address);
        return "Deleted Successfully";
    }
}
