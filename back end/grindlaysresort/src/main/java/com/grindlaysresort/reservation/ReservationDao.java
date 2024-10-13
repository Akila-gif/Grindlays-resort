package com.grindlaysresort.reservation;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationDao extends JpaRepository<Reservation,Integer> {
}
