package com.grindlaysresort.reservation;

import com.grindlaysresort.service.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;

@Repository
public interface ReservationDao extends JpaRepository<Reservation,Integer> {

    @Query("SELECT new Reservation (r.id,r.reservation_number,r.state_id) FROM Reservation r")
    List<Reservation> findAllLegasyLord();
//
//    @Query(value = "select * from reservation_has_service rhs where rhs.reservation_id=1 and rhs.service_id=6", nativeQuery = true)
//    ReservationHasService findByUsingREservationandService();
    @org.springframework.transaction.annotation.Transactional
    @Query(value = "select rhs.* from reservation_has_service rhs where rhs.reservation_id = :reservationId and rhs.service_id = :serviceId", nativeQuery = true)
    List<Object[]> findRawByReservationAndService(@Param("reservationId") int reservationId, @Param("serviceId") int serviceId);

    @Transactional
    @Query(value = "select rhm.* from reservation_has_menu rhm where rhm.reservation_id = :reservationId and  rhm.menu_id = :menuId", nativeQuery = true)
    List<Object[]> findRawByReservationAndMenu(@Param("reservationId") int reservationId, @Param("menuId") int menuId);

    @Transactional
    @Query(value = "select rhr.* from reservation_has_roompackage rhr where rhr.reservation_id = :reservationId and  rhr.roompackage_id = :packageId", nativeQuery = true)
    List<Object[]> findRawByReservationAndRoomPackage(@Param("reservationId") int reservationId, @Param("packageId") int roomPackage);

    @Transactional
    @Query(value = "select r.* from reservation_has_room r where r.reservation_id = :reservationId and  r.room_id = :roomId", nativeQuery = true)
    List<Object[]> findRawByReservationAndRoom(@Param("reservationId") int reservationId, @Param("roomId") int roomPackage);

}
