package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.ApiException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Category;
import com.ecommerce.project.payload.CategoryDto;
import com.ecommerce.project.payload.CategoryResponse;
import com.ecommerce.project.repositories.CategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
public class CategoryServiceImpl implements CategoryService {


    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CategoryResponse getAllCategories(Integer pageNumber, Integer pageSize,String sortBy,String sortOrder) {
        Sort sortByAndOrder=sortOrder.equalsIgnoreCase("asc")
                ?Sort.by(sortBy).ascending()
                :Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber,pageSize,sortByAndOrder);
        Page<Category> categoryPage=categoryRepository.findAll(pageDetails);

        List<Category> categories =     categoryPage.getContent();
        if(categories.isEmpty())
            throw new ApiException("Categories List is Empty");
        List<CategoryDto> categoryDtos=categories.stream()
                .map(category -> modelMapper.map(category, CategoryDto.class))
                .toList();
        CategoryResponse categoryResponse=new CategoryResponse();
        categoryResponse.setContent(categoryDtos);
        categoryResponse.setPageNumber(categoryPage.getNumber());
        categoryResponse.setPageSize(categoryPage.getSize());
        categoryResponse.setTotalElements(categoryPage.getTotalElements());
        categoryResponse.setTotalPages(categoryPage.getTotalPages());
        categoryResponse.setLastPage(categoryPage.isLast());
        return categoryResponse;
    }

    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {
        Category category=modelMapper.map(categoryDto, Category.class);
        if(category.getCategoryName()==null||category.getCategoryName().trim().isEmpty())
        {
            throw new ApiException("Category name cannot be null or empty");
        }
        if(category.getCategoryName().length()<=4) {
            throw new ApiException("Category name must be greater than 4");
        }
        Category categoryFromDB=categoryRepository.findByCategoryName(category.getCategoryName());

        if(categoryFromDB!=null){
            throw new ApiException("Category name " + category.getCategoryName() + " already exists");
        }
        Category savedCategory=categoryRepository.save(category);
        return modelMapper.map(savedCategory,CategoryDto.class);
    }
    @Override
    public CategoryDto deleteCategory(Long categoryId) {
        Category category=categoryRepository.findById(categoryId)
                .orElseThrow(()-> new ResourceNotFoundException("category","categoryId",categoryId));
       categoryRepository.delete(category);
       return modelMapper.map(category,CategoryDto.class);

    }

    @Override
    public CategoryDto updateCategory(CategoryDto categoryDto, Long categoryId) {

        Category category= modelMapper.map(categoryDto, Category.class);
        Category savedCategoryFromDb=categoryRepository.findById(categoryId)
                .orElseThrow(()-> new ResourceNotFoundException("category","categoryId",categoryId));
        savedCategoryFromDb.setCategoryName(category.getCategoryName());
        Category categoryFromDB=categoryRepository.findByCategoryName(category.getCategoryName());
        if(category.getCategoryName()==null||category.getCategoryName().trim().isEmpty())
        {
            throw new ApiException("Category name cannot be null or empty");
        }
        if(category.getCategoryName().length()<=4)
        {
            throw new ApiException("Category name must be greater than 4");
        }
        if (categoryFromDB!=null)
        {
            throw new ApiException("Category name exist please try with different name");
        }
        category.setCategoryId(categoryId);
       Category  savedCategory=categoryRepository.save(category);
        return modelMapper.map(savedCategory,CategoryDto.class);
    }


}
