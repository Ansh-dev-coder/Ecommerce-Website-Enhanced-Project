package com.ecommerce.project.service;

import com.ecommerce.project.payload.CartDTO;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;


@Component
public interface CartService {

    CartDTO addProductToCart(Long productId, Integer quantity);
    List<CartDTO> getAllCarts();
    CartDTO getCart(String emailId,Long cartId);

    @Transactional
    CartDTO updateProductQuantity(Long productId, Integer quantity);

    String deleteProductFromCart(Long productId, Long cartId);


    void updateProductInCarts(Long cartId, Long productId);
}
