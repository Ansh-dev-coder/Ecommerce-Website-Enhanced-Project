package com.ecommerce.project.service;

import com.ecommerce.project.payload.AnalyticsResponse;
import org.springframework.stereotype.Component;

@Component
public interface AnalyticsService {
    AnalyticsResponse getAnalyticsData();
}
