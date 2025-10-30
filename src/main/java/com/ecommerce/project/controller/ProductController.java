package com.ecommerce.project.controller;


import com.ecommerce.project.config.AppConst;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.payload.ProductResponse;
import com.ecommerce.project.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping("admin/categories/{categoryId}/product")
    public ResponseEntity<ProductDTO> addProduct(@Valid @RequestBody ProductDTO productDTO,
                                                 @PathVariable Long categoryId) {
        ProductDTO addProduct = productService.addProduct(categoryId, productDTO);
        return new ResponseEntity<>(addProduct, HttpStatus.CREATED);
    }
    @GetMapping("public/products")
    public ResponseEntity<ProductResponse> getAllProducts(@RequestParam(name = "pageNumber",defaultValue = AppConst.PAGE_NUMBER,required = false)Integer pageNumber,
                                                          @RequestParam(name = "pageSize",defaultValue = AppConst.PAGE_SIZE,required = false)Integer pageSize,
                                                          @RequestParam(name = "sortBy",defaultValue = AppConst.SORT_PRODUCT_BY,required = false)String sortBy,
                                                          @RequestParam(name = "sortOrder",defaultValue = AppConst.SORT_DIR,required = false)String sortOrder)
    {
        ProductResponse productResponse = productService.getAllProducts(pageNumber,pageSize,sortBy,sortOrder);
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }
    @GetMapping("public/categories/{categoryId}/products")
    public ResponseEntity<ProductResponse> getProductsByCategory(@PathVariable Long categoryId,
                                                                 @RequestParam(name = "pageNumber",defaultValue = AppConst.PAGE_NUMBER,required = false)Integer pageNumber,
                                                                 @RequestParam(name = "pageSize",defaultValue = AppConst.PAGE_SIZE,required = false)Integer pageSize,
                                                                 @RequestParam(name = "sortBy",defaultValue = AppConst.SORT_PRODUCT_BY,required = false)String sortBy,
                                                                 @RequestParam(name = "sortOrder",defaultValue = AppConst.SORT_DIR,required = false)String sortOrder)
    {
        ProductResponse productResponse=productService.searchByCategories(categoryId,pageNumber,pageSize,sortBy,sortOrder);
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }
    @GetMapping("public/products/keyword/{keyword}")
    public ResponseEntity<ProductResponse> getProductByKeyword(@PathVariable String keyword,
                                                               @RequestParam(name = "pageNumber",defaultValue = AppConst.PAGE_NUMBER,required = false)Integer pageNumber,
                                                               @RequestParam(name = "pageSize",defaultValue = AppConst.PAGE_SIZE,required = false)Integer pageSize,
                                                               @RequestParam(name = "sortBy",defaultValue = AppConst.SORT_PRODUCT_BY,required = false)String sortBy,
                                                               @RequestParam(name = "sortOrder",defaultValue = AppConst.SORT_DIR,required = false)String sortOrder)
    {
        ProductResponse productResponse=productService.getProductByKeyword(keyword,pageNumber,pageSize,sortBy,sortOrder);
        return new ResponseEntity<>(productResponse,HttpStatus.FOUND);
    }
    @PutMapping("admin/products/{productId}")
    public ResponseEntity<ProductDTO> updateProduct(@Valid @RequestBody ProductDTO productDTO,@PathVariable Long productId)
    {
        ProductDTO updateProduct=productService.updateProduct(productId,productDTO);
        return new ResponseEntity<>(updateProduct,HttpStatus.OK);
    }
    @PutMapping("products/{productId}/image")
    public ResponseEntity<ProductDTO> updateProductImage(@PathVariable Long productId,
                                                         @RequestParam("image") MultipartFile image) throws IOException {
        ProductDTO updateProduct=productService.updateProductImage(productId,image);
        return new ResponseEntity<>(updateProduct, HttpStatus.OK);
    }
    @DeleteMapping("admin/products/{productId}")
    public ResponseEntity<ProductDTO> deleteProduct(@PathVariable Long productId)
    {
        ProductDTO deleteProduct=productService.deleteProduct(productId);
        return  new ResponseEntity<>(deleteProduct,HttpStatus.OK);
    }
}
