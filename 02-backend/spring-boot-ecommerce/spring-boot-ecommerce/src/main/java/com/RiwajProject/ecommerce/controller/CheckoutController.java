package com.RiwajProject.ecommerce.controller;

import com.RiwajProject.ecommerce.dto.Purchase;
import com.RiwajProject.ecommerce.dto.PurchaseResponse;
import com.RiwajProject.ecommerce.service.CheckoutService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public ResponseEntity<PurchaseResponse> placeOrder(@RequestBody Purchase purchase) {
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);
        return ResponseEntity.ok(purchaseResponse);
    }
}