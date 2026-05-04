package com.RiwajProject.ecommerce.dto;

import com.RiwajProject.ecommerce.entity.Address;
import com.RiwajProject.ecommerce.entity.Customer;
import com.RiwajProject.ecommerce.entity.Order;
import com.RiwajProject.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}