package com.grindlaysresort.reservation;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationStateDao extends JpaRepository<ReservationState,Integer> {
}
