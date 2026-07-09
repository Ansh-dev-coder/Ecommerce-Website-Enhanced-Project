package com.ecommerce.project.controller;

import com.ecommerce.project.exceptions.ApiException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Cart;
import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.payload.CartItemDTO;
import com.ecommerce.project.repositories.CartRepository;
import com.ecommerce.project.service.CartService;
import com.ecommerce.project.util.AuthUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private AuthUtil authUtil;

    @Autowired
    private CartRepository cartRepository;

    @PostMapping("cart/create")
    public ResponseEntity<String> createOrUpdateCartWithItems(@RequestBody List<CartItemDTO> cartItemDTO){
        String response= cartService.createOrUpdateCartWithItems(cartItemDTO);
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

    @Tag(name = "Cart APIs",description = "APIs for managing Cart")
    @Operation(summary = "Adding product to cart",description = "Api to adding the product to the cart")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Added Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})

    @PostMapping("carts/products/{productId}/quantity/{quantity}")
    public ResponseEntity<CartDTO> addProductToCart(@PathVariable Long productId,
                                                    @PathVariable Integer quantity)
    {
        CartDTO cartDTO=cartService.addProductToCart(productId,quantity);
        return new ResponseEntity<CartDTO>(cartDTO, HttpStatus.OK);
    }

    @Tag(name = "Cart APIs",description = "APIs for managing Cart")
    @Operation(summary = "getting all carts ",description = "Api to get the carts")
    @ApiResponses({@ApiResponse(responseCode = "302",description = " Found Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})

    @GetMapping("/carts")
    public ResponseEntity<List<CartDTO>> getCarts()
    {
        List<CartDTO> cartDTOS=cartService.getAllCarts();
        return new ResponseEntity<>(cartDTOS,HttpStatus.FOUND);
    }


    @Tag(name = "Cart APIs",description = "APIs for managing Cart")
    @Operation(summary = "get the cart by id",description = "Api to get the cart by id")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Found  Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})

    @GetMapping("/carts/users/carts")
    public ResponseEntity<CartDTO> getCartById()
    {
        String emailId=authUtil.loggedInEmail();
        Cart cart=cartRepository.findCartByEmail(emailId);
        if(cart==null)
        {
            throw new ApiException("there is no cart ");
        }
        Long cartId=cart.getCartId();

        CartDTO cartDTO=cartService.getCart(emailId,cartId);

        return new ResponseEntity<>(cartDTO,HttpStatus.OK);
    }

    @Tag(name = "Cart APIs",description = "APIs for managing Cart")
    @Operation(summary = "updating the product present in the cart",description = "Api to update the product into the cart")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "updated Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})

    @PutMapping("/cart/products/{productId}/quantity/{operation}")
    public ResponseEntity<CartDTO> updateCartProduct(@PathVariable Long productId,
                                                     @PathVariable String operation)
    {
        CartDTO cartDTO=cartService.updateProductQuantity(productId,operation.
                equalsIgnoreCase("delete") ?-1:1);

        return new ResponseEntity<>(cartDTO,HttpStatus.OK);
    }


    @Tag(name = "Cart APIs",description = "APIs for managing Cart")
    @Operation(summary = "Deleting the  product from the cart",description = "Api to deleting the product from the cart")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Deleted Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
    @DeleteMapping("/carts/{cartId}/product/{productId}")
    public ResponseEntity<String> deleteProductFromCart(@PathVariable Long cartId,
                                                        @PathVariable Long productId)
    {

        String status=cartService.deleteProductFromCart(productId,cartId);
        return new ResponseEntity<>(status,HttpStatus.OK);
    }


}
