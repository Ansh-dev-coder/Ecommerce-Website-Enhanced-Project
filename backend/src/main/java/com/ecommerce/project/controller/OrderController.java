package com.ecommerce.project.controller;

import com.ecommerce.project.config.AppConst;
import com.ecommerce.project.payload.OrderDTO;
import com.ecommerce.project.payload.OrderRequestDTO;
import com.ecommerce.project.payload.OrderResponse;
import com.ecommerce.project.payload.StripePaymentDTO;
import com.ecommerce.project.service.OrderService;
import com.ecommerce.project.service.StripeService;
import com.ecommerce.project.util.AuthUtil;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private AuthUtil authUtil;
    @Autowired
    private StripeService stripeService;



    @Tag(name = "Order APIs",description = "APIs for managing Orders")
    @Operation(summary = "Ordering the products",description = "Api to order the products")
    @ApiResponses({@ApiResponse(responseCode = "201",description = " Created Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
    @PostMapping("/order/users/payments/{paymentMethod}")
    public ResponseEntity<OrderDTO> orderProducts(@PathVariable String paymentMethod,
                                                  @RequestBody OrderRequestDTO orderRequestDTO)
    {
        String email=authUtil.loggedInEmail();
       OrderDTO orderDTO= orderService.placeOrder(email,
                orderRequestDTO.getAddressId(),
                paymentMethod,
                orderRequestDTO.getPgName(),
                orderRequestDTO.getPgPaymentId(),
                orderRequestDTO.getPgStatus(),
                orderRequestDTO.getPgResponseMessage());
       return new ResponseEntity<>(orderDTO, HttpStatus.CREATED);
    }


    @PostMapping("/order/stripe-client-secret")
    public ResponseEntity<String> createStripeClientSecret(@RequestBody StripePaymentDTO stripePaymentDto) throws StripeException {
        System.out.println("Stripe Payment Dto Data" + stripePaymentDto);
            PaymentIntent paymentIntent=stripeService.paymentIntent(stripePaymentDto);
        return new ResponseEntity<>(paymentIntent.getClientSecret(),HttpStatus.CREATED);
    }

    @GetMapping("/admin/orders")
    public ResponseEntity<OrderResponse> getAllOrders(
            @RequestParam(name = "pageNumber",defaultValue = AppConst.PAGE_NUMBER,required = false)Integer pageNumber,
            @RequestParam(name = "pageSize",defaultValue =AppConst.PAGE_SIZE,required = false)Integer pageSize,
            @RequestParam(name = "sortBy",defaultValue = AppConst.SORT_ORDER_BY,required = false)String sortBy,
            @RequestParam(name = "sortOrder",defaultValue = AppConst.SORT_DIR,required = false)String sortOrder)
    {

         OrderResponse orderResponse=orderService.getAllOrders(pageNumber,pageSize,sortBy,sortOrder);
         return new ResponseEntity<>(orderResponse,HttpStatus.OK);

    }
}
