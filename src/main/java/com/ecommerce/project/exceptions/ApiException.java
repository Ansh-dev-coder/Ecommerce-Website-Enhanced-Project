package com.ecommerce.project.exceptions;

public class ApiException extends RuntimeException{

     public static final long serialVersionUID=1L;
    public ApiException(String message){
        super(message);
    }
    public ApiException(){};
}
