package com.grindlaysresort.payment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationPaymentDao extends JpaRepository<ReservationPayment,Integer> {
}