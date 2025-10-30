package com.ecommerce.project.service;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public interface FileService {
    String uploadImage(String path, MultipartFile file) throws IOException;
}
