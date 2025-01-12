package com.grindlaysresort.payment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentMethodDao extends JpaRepository<PaymentMethod,Integer> {
}
