package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.ApiException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.*;
import com.ecommerce.project.payload.OrderDTO;
import com.ecommerce.project.payload.OrderItemDTO;
import com.ecommerce.project.payload.OrderResponse;
import com.ecommerce.project.repositories.*;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private ModelMapper mapper;
    @Override
    @Transactional
    public OrderDTO placeOrder(String email,
                               Long addressId,
                               String paymentMethod,
                               String pgName,
                               String pgPaymentId,
                               String pgStatus,
                               String pgResponseMessage)
    {
        Cart cart=cartRepository.findCartByEmail(email);
        if(cart==null)
        {
            throw new ResourceNotFoundException("Cart","email",email);
        }

        Address address= addressRepository.findById(addressId).
            orElseThrow(()-> new ResourceNotFoundException("Address","addressId",addressId));
        Order order=new Order();
        order.setEmail(email);
        order.setAddress(address);
        order.setTotalPrice(cart.getTotalPrice());
        order.setOrderDate(LocalDate.now());
        order.setOrderStatus("Order Accepted");
        Payment payment=new Payment(paymentMethod,pgPaymentId,pgStatus,pgResponseMessage,pgName);
        payment.setOrder(order);
        payment=  paymentRepository.save(payment);
        order.setPayment(payment);
        Order savedOrder=orderRepository.save(order);
       List<CartItem> cartItems=cart.getCartItem();
       if(cartItems==null || cartItems.isEmpty())
       {
           throw new ApiException("There is no cart Item in the cart");
       }
       List<OrderItem> orderItems=new ArrayList<>();
       for(CartItem cartItem: cartItems)
       {
           OrderItem orderItem=new OrderItem();
           orderItem.setProduct(cartItem.getProduct());
           orderItem.setQuantity(cartItem.getQuantity());
           orderItem.setDiscount(cartItem.getDiscount());
           orderItem.setOrderedProductPrice(cartItem.getProductPrice());
           orderItem.setOrder(savedOrder);
           orderItems.add(orderItem);
       }
       orderItems=orderItemRepository.saveAll(orderItems);

       cart.getCartItem().forEach(item -> {
           int quantity= item.getQuantity();
           Product product = item.getProduct();
           product.setQuantity(product.getQuantity()-quantity);
           productRepository.save(product);
           cartService.deleteProductFromCart(item.getProduct().getProductId(),cart.getCartId());
       });

//        cart.getCartItem().clear();
        //cart.setTotalPrice(0.0);
        cartRepository.save(cart);
       OrderDTO orderDTO=mapper.map(savedOrder,OrderDTO.class);
       orderItems.forEach(item->
               orderDTO.getOrderItemDTO()
                       .add(mapper.map(item,OrderItemDTO.class)));
       orderDTO.setAddressId(addressId);
        return orderDTO;
    }

    @Override
    public OrderResponse getAllOrders(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {

        Sort sortByAndOrder=sortOrder.equalsIgnoreCase("asc")? Sort.by(sortBy).ascending() : Sort.by("dsc");
        Pageable pageDetails= PageRequest.of(pageNumber,pageSize,sortByAndOrder);
      Page<Order> pageOrders= orderRepository.findAll(pageDetails);
      List<Order> orders=pageOrders.getContent();

      List<OrderDTO> orderDTOS=orders.stream().map(
              order -> mapper.map(order,OrderDTO.class)
      ).toList();

      OrderResponse orderResponse=new OrderResponse();
      orderResponse.setContent(orderDTOS);
      orderResponse.setPageNumber(pageOrders.getNumber());
      orderResponse.setPageSize(pageOrders.getSize());
      orderResponse.setTotalElements(pageOrders.getTotalElements());
      orderResponse.setTotalPages(pageOrders.getTotalPages());
      orderResponse.setLastPage(pageOrders.isLast());
        return orderResponse;
    }
}
