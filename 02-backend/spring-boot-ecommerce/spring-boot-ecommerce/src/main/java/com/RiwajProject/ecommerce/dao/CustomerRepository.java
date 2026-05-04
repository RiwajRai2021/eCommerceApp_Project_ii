package com.RiwajProject.ecommerce.dao;

import com.RiwajProject.ecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
