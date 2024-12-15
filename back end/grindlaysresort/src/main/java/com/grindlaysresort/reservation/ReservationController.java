package com.grindlaysresort.reservation;

import com.grindlaysresort.hotelpackages.RoomPackage;
import com.grindlaysresort.menu.Menu;
import com.grindlaysresort.payment.Payment;
import com.grindlaysresort.roomModule.Room;
import com.grindlaysresort.service.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(path = "reservation")
@RequiredArgsConstructor
public class ReservationController {

    @Autowired
    ReservationDao reservationDao;


    @GetMapping("/sdas")
    public List<Reservation> getReservationDataList() {
        return reservationDao.findAll();
    }

    @GetMapping()
    public List<HashMap<String, Object>> getReservationData() {
        List<HashMap<String, Object>> reservationList = new ArrayList<>();

        for (Reservation reservation : reservationDao.findAll()) {
            HashMap<String, Object> map = new HashMap<>();

            map.put("id", reservation.getId());
            map.put("reservation_number", reservation.getReservation_number());
            map.put("headcount", reservation.getHeadcount());
            map.put("state_id", reservation.getState_id());

            //Build customer temporary object
            HashMap<String, Object> customerMap = new HashMap<>();
            customerMap.put("id", reservation.getCustomer_id().getId());
            customerMap.put("full_name", reservation.getCustomer_id().getFull_name());
            customerMap.put("title", reservation.getCustomer_id().getTitle());
            map.put("customer_id", customerMap);

            //create a list of services
            List<Service> serviceList = reservation.getServices_id();
            List<HashMap<String,Object>> serviceListMap = new ArrayList<>();
            serviceList.forEach(service -> {
                HashMap<String,Object> serviceMap = new HashMap<>();
                serviceMap.put("id",service.getId());
                serviceMap.put("service_name",service.getName());
                serviceMap.put("service_price",service.getPeramount());
                List<Object[]> serviceDataArray = reservationDao.findRawByReservationAndService(reservation.getId(),service.getId());
                serviceMap.put("amount",serviceDataArray.get(0)[2]);
                serviceMap.put("totalprice",serviceDataArray.get(0)[3]);
                serviceListMap.add(serviceMap);
            });
            map.put("services_id",serviceListMap);

            //create a list of menu
            List<Menu> menuList = reservation.getMenu_id();
            List<HashMap<String,Object>> menuListMap = new ArrayList<>();
            menuList.forEach(menu -> {
                HashMap<String,Object> menuMap = new HashMap<>();
                menuMap.put("id",menu.getId());
                menuMap.put("menu_name",menu.getName());
                menuMap.put("menu_price",menu.getPer_amount_price());
                List<Object[]> menuDataArray = reservationDao.findRawByReservationAndMenu(reservation.getId(),menu.getId());
                menuMap.put("quentity",menuDataArray.get(0)[2]);
                menuMap.put("totalprice",menuDataArray.get(0)[3]);
                menuListMap.add(menuMap);
            });
            map.put("menu_id",menuListMap);

            //create a list of package
            List<RoomPackage> roomPackageList = reservation.getRoomPackages();
            List<HashMap<String,Object>> packageListListMap = new ArrayList<>();
            roomPackageList.forEach(roomPackage -> {
                HashMap<String,Object> packageMap = new HashMap<>();
                packageMap.put("id",roomPackage.getId());
                packageMap.put("package_name",roomPackage.getPackagename());
                packageMap.put("package_price",roomPackage.getPrice());
                List<Object[]> roomPackageDataArray = reservationDao.findRawByReservationAndRoomPackage(reservation.getId(),roomPackage.getId());
                packageMap.put("quentity",roomPackageDataArray.get(0)[2]);
                packageMap.put("totalprice",roomPackageDataArray.get(0)[3]);
                packageListListMap.add(packageMap);
            });
            map.put("roomPackages",packageListListMap);

            //create a list of room
            List<Room> roomList = reservation.getRooms();
            List<HashMap<String,Object>> roomListListMap = new ArrayList<>();
            roomList.forEach(room -> {
                HashMap<String,Object> roomMap = new HashMap<>();
                roomMap.put("id",room.getId());
                roomMap.put("room_number",room.getNumber());
                roomMap.put("roomname",room.getRoomname());
                roomMap.put("room_price",room.getRoomprice());
                List<Object[]> roomDataArray = reservationDao.findRawByReservationAndRoom(reservation.getId(),room.getId());
                roomMap.put("checkingdate",roomDataArray.get(0)[2]);
                roomMap.put("checkoutdate",roomDataArray.get(0)[3]);
                roomListListMap.add(roomMap);
            });
            map.put("rooms",roomListListMap);

            //create a list of payment
            List<Payment> paymentList = reservation.getPayment_id();
            map.put("payment_id",paymentList.get(0));
            reservationList.add(map);
        }
        return reservationList;
    }
}