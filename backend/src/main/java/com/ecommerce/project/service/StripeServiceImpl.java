package com.ecommerce.project.service;

import com.ecommerce.project.payload.StripePaymentDTO;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeServiceImpl implements StripeService{

    @Value("${STRIPE_SECRET_KEY}")
    private String StripeApiKey;

    public PaymentIntent paymentIntent(StripePaymentDTO stripePaymentDTO){


        return null;
    }


}
