package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.ApiException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Cart;
import com.ecommerce.project.model.CartItem;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.model.User;
import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.payload.CartItemDTO;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.repositories.CartItemRepository;
import com.ecommerce.project.repositories.CartRepository;
import com.ecommerce.project.repositories.ProductRepository;
import com.ecommerce.project.util.AuthUtil;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@Service
public class CartServiceImpl implements CartService
{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
     private ProductRepository productRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private AuthUtil authUtil;
    @Override
    public CartDTO addProductToCart(Long productId, Integer quantity) {
        Cart cart=createCart();

        Product product=productRepository.findById(productId)
                .orElseThrow(()-> new ResourceNotFoundException("Product","productId",productId));
        
       CartItem cartItem= cartItemRepository.findCartItemByProductIdAndCartId(cart.getCartId(),productId);

       if(cartItem != null)
       {
           throw new ApiException("Product " + product.getProductName() + " is already present in the cart");
       }
       if (product.getQuantity()==0)
       {
           throw new ApiException( product.getProductName()  + "is not available");
       }
       if(product.getQuantity() < quantity)
       {
           throw new ApiException("Please make an order of the " + product.getProductName()  + "less then or equal to the quantity " + product.getQuantity());
       }

       CartItem newCartItem= new CartItem();
       newCartItem.setProduct(product);
       newCartItem.setCart(cart);
       newCartItem.setQuantity(quantity);
       newCartItem.setDiscount(product.getDiscount());
       newCartItem.setProductPrice(product.getSpecialPrice());

       cartItemRepository.save(newCartItem);

       product.setQuantity(product.getQuantity());

       cart.setTotalPrice(cart.getTotalPrice() + (product.getSpecialPrice() * quantity));

       cartRepository.save(cart);

       CartDTO cartDTO=mapper.map(cart,CartDTO.class);

        List<CartItem> cartItems=cart.getCartItem();

        Stream<ProductDTO> productStream=cartItems.stream().map(items->{
            ProductDTO map=mapper.map(items.getProduct(),ProductDTO.class);

            map.setQuantity(items.getQuantity());
            return map;
        });

        cartDTO.setProducts(productStream.toList());
        return cartDTO;
    }

    private Cart createCart()
    {
        Cart userCart=cartRepository.findCartByEmail(authUtil.loggedInEmail());
        if(userCart!=null)
        {
            return userCart;
        }
        Cart cart=new Cart();
        cart.setTotalPrice(0.0);
        cart.setUser(authUtil.loggedInUser());
        Cart newCart=cartRepository.save(cart);
        return newCart;
    }


    @Override
    public List<CartDTO> getAllCarts()
    {
        List<Cart> carts=cartRepository.findAll();

        if(carts.isEmpty())
        {
            throw  new ApiException("No cart is present");
        }
        List<CartDTO> cartDTOS=carts.stream().map(cart ->{
           CartDTO cartDTO= mapper.map(cart,CartDTO.class);
            List<ProductDTO> productDTOS=cart.getCartItem().stream()
                    .map(cartItem -> {ProductDTO productDTO=mapper.map(cartItem.getProduct(),ProductDTO.class);
                        productDTO.setQuantity(cartItem.getQuantity());
                        return productDTO;

                            }).toList();
            cartDTO.setProducts(productDTOS);
            return cartDTO;

        }).toList();
        return cartDTOS;
    }

    @Override
    public CartDTO getCart(String emailId, Long cartId) {


        Cart cart=cartRepository.findCartByEmailAndCartId(emailId,cartId);

        if(cart== null)
        {
            throw new ResourceNotFoundException("Cart","cartId",cartId);
        }

        cart.getCartItem().forEach(c->c.getProduct().setQuantity(c.getQuantity()));
        CartDTO cartDTO=mapper.map(cart,CartDTO.class);
        List<ProductDTO> productDTOS=cart.getCartItem().stream()
                .map(p->mapper.map(p.getProduct(),ProductDTO.class))
                .toList();
        cartDTO.setProducts(productDTOS);
        return cartDTO;
    }

    @Override
    @Transactional
    public CartDTO updateProductQuantity(Long productId, Integer quantity) {

        String email=authUtil.loggedInEmail();
        Cart userCart=cartRepository.findCartByEmail(email);
        Long cartId=userCart.getCartId();

        Cart cart=cartRepository.findById(cartId).orElseThrow(()->new ResourceNotFoundException("Cart","cartId",cartId));

        Product product=productRepository.findById(productId)
                .orElseThrow(()->new ResourceNotFoundException("Product","productId",productId));

        if(product.getQuantity()==0)
        {
            throw new ApiException( product.getProductName() + "stock is not available");
        }

        if(product.getQuantity() < quantity)
        {
            throw new ApiException("Please make the order of " + product.getQuantity() + "in the existing quantity : " + product.getQuantity());
        }

        CartItem cartItem=cartItemRepository
                .findCartItemByProductIdAndCartId(cartId,productId);
        if(cartItem==null)
        {
            throw new ApiException("Product " + product.getProductName() + "does not exist in the cart");
        }
        int newQuantity=cartItem.getQuantity()+quantity;
        if (newQuantity<0)
        {
            throw new ApiException("the resulting quantity cannot be negative");
        }
        if(newQuantity > product.getQuantity())
        {
            throw new ApiException("Please enter the quantity in the available product quantity");
        }
        if(newQuantity==0)
        {
            deleteProductFromCart(productId,cartId);
        }else {

            cartItem.setProductPrice(product.getSpecialPrice());
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            cartItem.setDiscount(product.getDiscount());
            cart.setTotalPrice(cart.getTotalPrice() + (cartItem.getProductPrice() * quantity));
            cartRepository.save(cart);
        }
        CartItem updateCartItem=cartItemRepository.save(cartItem);
        if(updateCartItem.getQuantity() == 0)
        {
            cartItemRepository.deleteById(updateCartItem.getCartItemId());
        }
        CartDTO cartDTO=mapper.map(cart,CartDTO.class);
        List<CartItem> cartItems=cart.getCartItem();
        Stream<ProductDTO> productDTOStream=cartItems.stream().map(p ->{
            ProductDTO productDTO=mapper.map(p.getProduct(), ProductDTO.class);
            productDTO.setQuantity(p.getQuantity());
            return productDTO;
        });

        cartDTO.setProducts(productDTOStream.toList());


        return cartDTO;
    }

    @Override
    public String deleteProductFromCart(Long productId, Long cartId) {
        Cart cart=cartRepository.findById(cartId)
                .orElseThrow(()->new ResourceNotFoundException("Cart","cartId",cartId));

       CartItem cartItem=cartItemRepository.findCartItemByProductIdAndCartId(cartId,productId);
       if(cartItem==null)
       {
           throw new ResourceNotFoundException("Product","productId",productId);
       }
       cart.setTotalPrice(cart.getTotalPrice()-(cartItem.getProductPrice() * cartItem.getQuantity()));

       cartItemRepository.deleteCartItemByProductIdAndCartId(cartId,productId);

        return "Product" + cartItem.getProduct().getProductName() + "deleted successfully" ;
    }

    @Override
    public void updateProductInCarts(Long cartId, Long productId) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "cartId", cartId));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));
        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(cartId, productId);

        if (cartItem == null) {
            throw new ApiException("Product" + product.getProductName() + "is not available in the cart");
        }
        double cartPrice = cart.getTotalPrice()
                - (cartItem.getProductPrice() * cartItem.getQuantity());
        cartItem.setProductPrice(product.getSpecialPrice());

        cart.setTotalPrice(cartPrice +
                (cartItem.getProductPrice() * cartItem.getQuantity()));

        cartItem=cartItemRepository.save(cartItem);
    }

    @Transactional
    @Override
    public String createOrUpdateCartWithItems(List<CartItemDTO> cartItemDTO) {

        User user=authUtil.loggedInUser();
       String email= user.getEmail();
       Cart existingCart=cartRepository.findCartByEmail(email);

        if(existingCart!=null ){
            cartItemRepository.deleteAllByCartId(existingCart.getCartId());
        }else {
             existingCart=new Cart();
             existingCart.setTotalPrice(0.0);
             existingCart.setUser(user);
             existingCart=cartRepository.save(existingCart);
        }

         Double totalPrice=0.0;

        for(CartItemDTO cartItemDTo : cartItemDTO){
            Long productId=cartItemDTo.getProductId();
            Integer quantity=cartItemDTo.getQuantity();
            Product product=productRepository.findById(productId)
                    .orElseThrow(()->new ResourceNotFoundException("product","productId",productId));
            //product.setQuantity(product.getQuantity()-quantity);
            totalPrice+=product.getSpecialPrice()*quantity;

          CartItem cartItem=new CartItem();
          cartItem.setProduct(product);
          cartItem.setQuantity(quantity);
          cartItem.setCart(existingCart);
          cartItem.setProductPrice(product.getSpecialPrice());
          cartItem.setDiscount(product.getDiscount());
          cartItemRepository.save(cartItem);
        }

        existingCart.setTotalPrice(totalPrice);
        cartRepository.save(existingCart);
        return "Cart created or updated with the new items successfully";
    }


}

