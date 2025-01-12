package com.grindlaysresort.reservation;

import com.grindlaysresort.customerModule.CustomerDao;
import com.grindlaysresort.hotelpackages.RoomPackage;
import com.grindlaysresort.hotelpackages.RoomPackageDao;
import com.grindlaysresort.menu.Menu;
import com.grindlaysresort.payment.PaymentMethodDao;
import com.grindlaysresort.payment.ReservationPayment;
import com.grindlaysresort.payment.ReservationPaymentDao;
import com.grindlaysresort.roomModule.Room;
import com.grindlaysresort.roomModule.RoomDao;
import com.grindlaysresort.service.Service;
import com.grindlaysresort.service.ServiceDao;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(path = "reservation")
@RequiredArgsConstructor
public class ReservationController {

    @Autowired
    ReservationDao reservationDao;

    @Autowired
    ReservationStateDao reservationStateDao;

    @Autowired
    RoomPackageDao roomPackageDao;

    @Autowired
    CustomerDao customerDao;

    @Autowired
    RoomDao roomDao;

    @Autowired
    ReservationPaymentDao reservationPaymentDao;

    @Autowired
    PaymentMethodDao paymentMethodDao;

    @Autowired
    private ServiceDao serviceDao;

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
            map.put("payment_id", reservation.getReservationtotalpayment());
            reservationList.add(map);
        }
        return reservationList;
    }

    @PostMapping()
    public HashMap<String,Object> addNewReservation(@RequestBody HashMap<String,Object> reservationData){

        Reservation reservation = new Reservation();
        reservation.setReservation_number(reservationDao.nextReservationNumber());
        reservation.setHeadcount(Integer.parseInt(reservationData.get("headcount").toString()));
        reservation.setState_id(reservationStateDao.getReferenceById(1));

        HashMap<String,Object> customerData = (HashMap<String, Object>) reservationData.get("customer_id");
        reservation.setCustomer_id(customerDao.getReferenceById(Integer.parseInt(customerData.get("id").toString())));

        //map room many-to-many relationship
        List<Room> roomList = new ArrayList<>();
        for (HashMap<String,Object> roomDataList : (List<HashMap<String,Object>>) reservationData.get("rooms")){
            roomList.add(roomDao.getReferenceById((Integer) roomDataList.get("id")));
        }
        reservation.setRooms(roomList);

        //map roompackage many-to-many relationship
        List<RoomPackage> roomPackageslList = new ArrayList<>();
        for(HashMap<String,Object> roompackageDetails : (List<HashMap<String,Object>>) reservationData.get("roomPackages")){
            roomPackageslList.add(roomPackageDao.getReferenceById((Integer) roompackageDetails.get("id")));
        }
        reservation.setRoomPackages(roomPackageslList);

        //map service many-to-many relationship
        List<Service> serviceList = new ArrayList<>();
        for (HashMap<String,Object> serviceDataList : (List<HashMap<String,Object>>) reservationData.get("services_id")){
            //service.setPeramount(service.getPeramount());
            serviceList.add(serviceDao.getReferenceById((Integer) serviceDataList.get("id")));
        }

        reservation.setServices_id(serviceList);

        //map menu many-to-many relationship
        //reservation.setMenu_id((List<Menu>) reservationData.get("menu_id"));

        BigDecimal reservationtotalpayment = new BigDecimal(String.valueOf(reservationData.get("reservationtotalpayment")));
        BigDecimal totalpaidamount = new BigDecimal(String.valueOf(reservationData.get("totalpaidamount")));
        BigDecimal discount = new BigDecimal(String.valueOf(reservationData.get("discount")));

        reservation.setReservationtotalpayment(reservationtotalpayment);
        reservation.setTotalpaidamount(totalpaidamount);
        reservation.setPaymentstatus(reservationtotalpayment.subtract(totalpaidamount.add(discount)).equals(new BigDecimal(0)));
        reservation.setDiscount(discount);

        HashMap<String,Object> reservationpayment = (HashMap<String, Object>) reservationData.get("reservationpayment");
        ReservationPayment reservationPayment = new ReservationPayment();
        reservationPayment.setPaidamount(new BigDecimal(String.valueOf(reservationpayment.get("paidamount"))));
        reservationPayment.setDiscription(String.valueOf(reservationpayment.get("discription")));

        HashMap<String,Object> paymentMethod = (HashMap<String, Object>) reservationpayment.get("payment_method_id");
        reservationPayment.setPayment_method_id(paymentMethodDao.getReferenceById((Integer) paymentMethod.get("id")));
        reservationPayment.setDateandtime(LocalDateTime.now());
        Reservation addedReservation = reservationDao.save(reservation);
        reservationPayment.setReservation(addedReservation);

        reservationPaymentDao.save(reservationPayment);

        for (HashMap<String,Object> roomDataList : (List<HashMap<String,Object>>) reservationData.get("rooms")){
            reservationDao.updateRoomReservationDetails(roomDataList.get("checkingdate").toString(),roomDataList.get("checkoutdate").toString(),addedReservation.getId(),(Integer) roomDataList.get("id"));
        }

        for (HashMap<String,Object> packageDataList : (List<HashMap<String,Object>>) reservationData.get("roomPackages")){
            reservationDao.updatePackageReservationDetails((Integer) packageDataList.get("packageCount"), new BigDecimal(String.valueOf(packageDataList.get("price"))),addedReservation.getId(),(Integer) packageDataList.get("id"));
        }

        for (HashMap<String,Object> packageDataList : (List<HashMap<String,Object>>) reservationData.get("services_id")){

            BigDecimal perAmount = new BigDecimal(String.valueOf(packageDataList.get("peramount")));
            BigDecimal serviceCount = new BigDecimal(String.valueOf(packageDataList.get("serviceCount")));
            BigDecimal totalAmount = perAmount.multiply(serviceCount);

            reservationDao.updateServiceReservationDetails
                    ((Integer) packageDataList.get("serviceCount"), totalAmount,addedReservation.getId(),(Integer) packageDataList.get("id"));
        }

        return reservationData;
    }
}