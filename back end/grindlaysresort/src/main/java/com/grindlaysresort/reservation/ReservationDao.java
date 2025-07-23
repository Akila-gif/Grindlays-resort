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

    @Query("SELECT r FROM Reservation r WHERE r.reservation_number = :reservationNumber")
    Reservation findByReservationNumber(@Param("reservationNumber") String reservationNumber);

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

    //Using when Update record when delete
    @Modifying
    @Transactional
    @Query(value = "UPDATE reservation_has_room set reservation_room_status_id = :reservationRoomStatus_id where reservation_id= :resId and room_id= :roomId", nativeQuery = true)
    void updateRoomReservationDetails(@Param("reservationRoomStatus_id") int status, @Param("resId") int resId, @Param("roomId") int roomId);

    //Using when Update record when delete
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO grindlays_resort.reservation_has_room (reservation_id, room_id, checkingdate, checkoutdate, reservation_room_status_id) VALUES (:resId, :roomId, :checkin, :checkout, :reservationRoomStatus_id)",nativeQuery = true)
    void AddUpdateRoomReservationDetails(@Param("checkin") String checkin, @Param("checkout") String checkout, @Param("resId") int resId, @Param("roomId") int roomId, @Param("reservationRoomStatus_id") int status);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO grindlays_resort.reservation_has_room (reservation_id, room_id, checkingdate, checkoutdate, reservation_room_status_id) VALUES (:resId, :roomId, :checkin, :checkout, :reservationRoomStatus_id)", nativeQuery = true)
    void addUpdateRoomReservationDetails(@Param("checkin") String checkin, @Param("checkout") String checkout, @Param("resId") int resId, @Param("roomId") int roomId, @Param("reservationRoomStatus_id") int status);

    @Modifying
    @Transactional
    @Query(value = "UPDATE reservation_has_roompackage set amount = :packageAmount,totalprice = :package_total_price where reservation_id= :resId and roompackage_id= :packageId",nativeQuery = true)
    void updatePackageReservationDetails(@Param("packageAmount") int packageAmount, @Param("package_total_price") BigDecimal package_total_price, @Param("resId") int resId, @Param("packageId") int packageId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE reservation_has_service set amount = :serviceAmount,totalprice = :service_total_price where reservation_id= :resId and service_id= :serviceId",nativeQuery = true)
    void updateServiceReservationDetails(@Param("serviceAmount") int serviceAmount, @Param("service_total_price") BigDecimal package_total_price, @Param("resId") int resId, @Param("serviceId") int serviceId);
/*
    @Modifying
    @Transactional
    @Query(value = "UPDATE reservation_has_menu set amount = :menuAmount,totalprice = :menu_total_price where reservation_id= :resId and menu_id= :menuId",nativeQuery = true)
    void updateMenuReservationDetails(@Param("menuAmount") int menuAmount, @Param("menu_total_price") BigDecimal menu_total_price, @Param("resId") int resId, @Param("menuId") int menuId);
*/


    @Modifying
    @Transactional
    @Query(value = "DELETE FROM reservation_has_room WHERE reservation_id = : reservation_id",nativeQuery = true)
    void deleteRoomReservationDetails(@Param("reservation_id") int reservation_id);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM reservation_has_service WHERE reservation_id = : reservation_id",nativeQuery = true)
    void deleteServiceReservationDetails(@Param("reservation_id") int reservation_id);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM reservation_has_menu WHERE reservation_id = : reservation_id",nativeQuery = true)
    void deleteMenuReservationDetails(@Param("reservation_id") int reservation_id);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM reservation_has_roompackage WHERE reservation_id = : reservation_id",nativeQuery = true)
    void deleteRoomPackageReservationDetails(@Param("reservation_id") int reservation_id);

    @Modifying
    @Query(value = "update Reservation r set r.reservationtotalpayment = :reservationtotalpayment, r.totalpaidamount = :totalpaidamount, r.paymentstatus = :paymentstatus, r.discount = :discount where r.id = :reservation_id")
    @Transactional
    void UpdateReservationPaymentDetails(@Param("reservation_id") int reservation_id, @Param("paymentstatus") boolean paymentstatus, @Param("totalpaidamount") BigDecimal totalpaidamount, @Param("reservationtotalpayment") BigDecimal reservationtotalpayment, @Param("discount") BigDecimal discount);

    @Modifying
    @Transactional
    @Query(value = "update Reservation r set r.state_id = 4 where r.id = :reservation_id", nativeQuery = true)
    void UpdateDeletedReservation(@Param("reservation_id") int reservation_id);
}
