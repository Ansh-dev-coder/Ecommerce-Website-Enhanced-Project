package com.ecommerce.project.payload;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
public class OrderStatusUpdateDTO {
    private String status;
}
