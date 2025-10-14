package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.ApiException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Category;
import com.ecommerce.project.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class CategoryServiceImpl implements CategoryService {


    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getCategories() {
        List<Category> categories = categoryRepository.findAll();
        if(categories.isEmpty())
            throw new ApiException("Categories List is Empty");
        return categories;
    }

    @Override
    public void createCategory(Category category) {
        Category savedCategory= categoryRepository.findByCategoryName(category.getCategoryName());
        if(savedCategory!=null){
            throw new ApiException("Category name " + category.getCategoryName() + " already exists");
        }
        categoryRepository.save(category);

    }
    @Override
    public String deleteCategory(Long categoryId) {
        Category category=categoryRepository.findById(categoryId)
                .orElseThrow(()-> new ResourceNotFoundException("category","categoryId",categoryId));
       categoryRepository.delete(category);
       return "Category deleted successfully";

    }

    @Override
    public Category updateCategory(Category category, Long categoryId) {
        Category savedCategory=categoryRepository.findById(categoryId)
                .orElseThrow(()-> new ResourceNotFoundException("category","categoryId",categoryId));
        category.setCategoryId(categoryId);
        savedCategory=categoryRepository.save(category);
        return savedCategory;

    }


}
