package com.ecommerce.project.controller;



import com.ecommerce.project.config.AppConst;
import com.ecommerce.project.payload.CategoryDto;
import com.ecommerce.project.payload.CategoryResponse;
import com.ecommerce.project.service.CategoryService;
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


@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Tag(name = "Categories APIs",description = "APIs for managing Categories")
    @Operation(summary = "Getting all the categories",description = "Api to get all the categories")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "found Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
    @GetMapping("/public/categories")
    public ResponseEntity<CategoryResponse> getAllCategories(
            @RequestParam(value = "pageNumber",defaultValue = AppConst.PAGE_NUMBER , required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = AppConst.PAGE_SIZE,required = false) Integer pageSize,
            @RequestParam(value = "sortBy",defaultValue = AppConst.SORT_CATEGORIES_BY,required = false) String sortBy,
            @RequestParam(value = "sortOrder",defaultValue = AppConst.SORT_DIR,required = false) String sortOrder)
     {
        CategoryResponse  categoryResponse=categoryService.getAllCategories(pageNumber,pageSize,sortBy,sortOrder);
        return new ResponseEntity<>(categoryResponse, HttpStatus.OK);
    }

    @Tag(name = "Categories APIs",description = "APIs for managing Categories")
    @Operation(summary = "creating the category",description = "Api to create  the category")
    @ApiResponses({@ApiResponse(responseCode = "201",description = "Created Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
    @PostMapping("/public/categories")
    public ResponseEntity<CategoryDto> createCategory(@Valid @RequestBody CategoryDto categoryDto) {
       CategoryDto savedCategoryDto= categoryService.createCategory(categoryDto);
        return new  ResponseEntity<>(savedCategoryDto, HttpStatus.CREATED);
    }

    @Tag(name = "Categories APIs",description = "APIs for managing Categories")
    @Operation(summary = "Deleting  the category by id",description = "Api to delete the categories")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Deleted Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
    @DeleteMapping("/admin/categories/{categoryId}")
    public ResponseEntity<CategoryDto> deleteCategory(@PathVariable Long categoryId) {
            CategoryDto  categoryStatus=categoryService.deleteCategory(categoryId);
            return new ResponseEntity<>(categoryStatus, HttpStatus.OK);
    }

    @Tag(name = "Categories APIs",description = "APIs for managing Categories")
    @Operation(summary = "Updating the category",description = "Api to update the category")
    @ApiResponses({@ApiResponse(responseCode = "200",description = "Updated Successfully"),
            @ApiResponse(responseCode = "400",description = "Invalid Input",content = @Content),
            @ApiResponse(responseCode = "500",description = "Internal Server error",content = @Content)})
    @PutMapping("public/categories/{categoryId}")
    public ResponseEntity<CategoryDto> updateCategory(@Valid @RequestBody CategoryDto categoryDto,
                                                      @PathVariable Long categoryId) {
            CategoryDto savedCategory=categoryService.updateCategory(categoryDto,categoryId);
            return new ResponseEntity<>(savedCategory, HttpStatus.OK);
    }
}
