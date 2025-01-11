package com.grindlaysresort.reservation;

import com.grindlaysresort.service.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;

@EnableJpaRepositories
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

    @Query(value = "select concat('RES', (SELECT SUBSTRING((SELECT max(reservation_number) FROM grindlays_resort.reservation ), 4))+1) as next_reservation_number;", nativeQuery = true)
    String nextReservationNumber();

    @Modifying
    @Transactional
    @Query(value = "UPDATE reservation_has_room set checkingdate = :checkin ,checkoutdate= :checkout where reservation_id= :resId and room_id= :roomId",nativeQuery = true)
    void updateRoomReservationDetails(@Param("checkin") String checkin, @Param("checkout") String checkout, @Param("resId") int resId, @Param("roomId") int roomId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE reservation_has_roompackage set amount = :packageAmount,totalprice = :package_total_price where reservation_id= :resId and roompackage_id= :packageId",nativeQuery = true)
    void updatePackageReservationDetails(@Param("packageAmount") int packageAmount, @Param("package_total_price") BigDecimal package_total_price, @Param("resId") int resId, @Param("packageId") int packageId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE reservation_has_service set amount = :serviceAmount,totalprice = :service_total_price where reservation_id= :resId and service_id= :serviceId",nativeQuery = true)
    void updateServiceReservationDetails(@Param("serviceAmount") int serviceAmount, @Param("service_total_price") BigDecimal package_total_price, @Param("resId") int resId, @Param("serviceId") int serviceId);

}
