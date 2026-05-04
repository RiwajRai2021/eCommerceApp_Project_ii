package com.RiwajProject.ecommerce.service;

import com.RiwajProject.ecommerce.dto.Purchase;
import com.RiwajProject.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}