package com.ecommerce.project.controller;



import com.ecommerce.project.config.AppConst;
import com.ecommerce.project.payload.CategoryDto;
import com.ecommerce.project.payload.CategoryResponse;
import com.ecommerce.project.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class CategoryController {

    private CategoryService categoryService;

    public CategoryController(CategoryService categoryService)
    {
        this.categoryService=categoryService;
    }

    @GetMapping("/public/categories")
    public ResponseEntity<CategoryResponse> getAllCategories(
            @RequestParam(value = "pageNumber",defaultValue = AppConst.PAGE_NUMBER , required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", defaultValue = AppConst.PAGE_SIZE,required = false) Integer pageSize
            )
     {
        CategoryResponse  categoryResponse=categoryService.getAllCategories(pageNumber,pageSize);
        return new ResponseEntity<>(categoryResponse, HttpStatus.OK);
    }

    @PostMapping("/public/categories")
    public ResponseEntity<CategoryDto> createCategory(@Valid @RequestBody CategoryDto categoryDto) {

       CategoryDto savedCategoryDto= categoryService.createCategory(categoryDto);
        return new  ResponseEntity<>(savedCategoryDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/categories/{categoryId}")
    public ResponseEntity<CategoryDto> deleteCategory(@PathVariable Long categoryId) {
            CategoryDto  categoryStatus=categoryService.deleteCategory(categoryId);
            return new ResponseEntity<>(categoryStatus, HttpStatus.OK);
    }

    @PutMapping("public/categories/{categoryId}")
    public ResponseEntity<CategoryDto> updateCategory(@Valid @RequestBody CategoryDto categoryDto,@PathVariable Long categoryId) {
            CategoryDto savedCategory=categoryService.updateCategory(categoryDto,categoryId);
            return new ResponseEntity<>(savedCategory, HttpStatus.OK);
    }
}
