package com.grindlaysresort.reservation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ReservationRoomStatusDao extends JpaRepository<ReservationRoomStatus,Integer> {
}
