package com.grindlaysresort.menu;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservationHasMenuDao extends JpaRepository<ReservationHasMenu, Integer> {
    List<ReservationHasMenu> findByReservationId(Integer reservationId);
}