package com.ecommerce.project.controller;


import com.ecommerce.project.config.AppConst;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.payload.ProductResponse;
import com.ecommerce.project.service.ProductService;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private ProductService productService;


    @Tag(name = "Product APIs",description = "APIs for managing Products")
    @Operation(summary = "Adding the products",description = "Api to add the product")
    @ApiResponses({@ApiResponse(responseCode = "201",description = "Created Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
    @PostMapping("admin/categories/{categoryId}/product")
    public ResponseEntity<ProductDTO> addProduct(@Valid @RequestBody ProductDTO productDTO,
                                                 @PathVariable Long categoryId) {
        ProductDTO addProduct = productService.addProduct(categoryId, productDTO);
        return new ResponseEntity<>(addProduct, HttpStatus.CREATED);
    }

    @Tag(name = "Product APIs",description = "APIs for managing Products")
    @Operation(summary = "Getting all the products",description = "Api to get all the product")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Get Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
    @GetMapping("public/products")
    public ResponseEntity<ProductResponse> getAllProducts(
                                                          @RequestParam(name = "pageNumber",defaultValue = AppConst.PAGE_NUMBER,required = false)Integer pageNumber,
                                                          @RequestParam(name = "pageSize",defaultValue = AppConst.PAGE_SIZE,required = false)Integer pageSize,
                                                          @RequestParam(name = "sortBy",defaultValue = AppConst.SORT_PRODUCT_BY,required = false)String sortBy,
                                                          @RequestParam(name = "sortOrder",defaultValue = AppConst.SORT_DIR,required = false)String sortOrder,
                                                          @RequestParam(name = "keyword",required = false)String keyword,
                                                          @RequestParam(name = "category" , required = false)String category)
    {
        ProductResponse productResponse = productService.getAllProducts(pageNumber,pageSize,sortBy,sortOrder,keyword,category);
        return new ResponseEntity<>(productResponse, HttpStatus.OK);
    }

    @Tag(name = "Product APIs",description = "APIs for managing Products")
    @Operation(summary = "Get the product by category",description = "Api to get the product by category")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Get Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
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

    @Tag(name = "Product APIs",description = "APIs for managing Products")
    @Operation(summary = "Get the product by Keyword",description = "Api to get the product by keyword")
    @ApiResponses({@ApiResponse(responseCode = "302",description = "Found Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
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

    @Tag(name = "Product APIs",description = "APIs for managing Products")
    @Operation(summary = "Updating the product",description = "Api to update the product")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Updated Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
    @PutMapping("admin/products/{productId}")
    public ResponseEntity<ProductDTO> updateProduct(@Valid @RequestBody ProductDTO productDTO,@PathVariable Long productId)
    {
        ProductDTO updateProduct=productService.updateProduct(productId,productDTO);
        return new ResponseEntity<>(updateProduct,HttpStatus.OK);
    }

    @Tag(name = "Product APIs",description = "APIs for managing Products")
    @Operation(summary = "Updating products image",description = "Api to update the product")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Image updated Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
    @PutMapping("products/{productId}/image")
    public ResponseEntity<ProductDTO> updateProductImage(@PathVariable Long productId,
                                                         @RequestParam("image") MultipartFile image) throws IOException {
        ProductDTO updateProduct=productService.updateProductImage(productId,image);
        return new ResponseEntity<>(updateProduct, HttpStatus.OK);
    }

    @Tag(name = "Product APIs",description = "APIs for managing Products")
    @Operation(summary = "Deleting the products",description = "Api to delete the product")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Deleted Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
    @DeleteMapping("admin/products/{productId}")
    public ResponseEntity<ProductDTO> deleteProduct(@PathVariable Long productId)
    {
        ProductDTO deleteProduct=productService.deleteProduct(productId);
        return  new ResponseEntity<>(deleteProduct,HttpStatus.OK);
    }
}
