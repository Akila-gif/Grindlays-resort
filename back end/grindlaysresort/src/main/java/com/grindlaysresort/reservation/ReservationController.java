package com.grindlaysresort.reservation;

import com.grindlaysresort.customerModule.CustomerDao;
import com.grindlaysresort.hotelpackages.RoomPackage;
import com.grindlaysresort.hotelpackages.RoomPackageDao;
import com.grindlaysresort.menu.Menu;
import com.grindlaysresort.menu.ReservationHasMenu;
import com.grindlaysresort.payment.PaymentMethodDao;
import com.grindlaysresort.payment.ReservationPayment;
import com.grindlaysresort.payment.ReservationPaymentDao;
import com.grindlaysresort.roomModule.Room;
import com.grindlaysresort.roomModule.RoomDao;
import com.grindlaysresort.service.Service;
import com.grindlaysresort.service.ServiceDao;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

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
            map.put("addedDate", reservation.getAddedDate());

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
                serviceMap.put("name",service.getName());
                serviceMap.put("peramount",service.getPeramount());
                List<Object[]> serviceDataArray = reservationDao.findRawByReservationAndService(reservation.getId(),service.getId());
                serviceMap.put("serviceCount",serviceDataArray.get(0)[2]);
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
                packageMap.put("packagename",roomPackage.getPackagename());
                packageMap.put("price",roomPackage.getPrice());
                List<Object[]> roomPackageDataArray = reservationDao.findRawByReservationAndRoomPackage(reservation.getId(),roomPackage.getId());
                packageMap.put("packageCount",roomPackageDataArray.get(0)[2]);
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
                if (!roomDataArray.get(0)[4].equals(4)){
                    roomListListMap.add(roomMap);
                }
            });
            map.put("rooms",roomListListMap);

            //create a list of payment
            HashMap<String,Object> paymentMethodMap = new HashMap<>();

            paymentMethodMap.put("payment_id", reservation.getReservationtotalpayment());
            paymentMethodMap.put("discount", reservation.getDiscount());
            paymentMethodMap.put("totalpaidamount", reservation.getTotalpaidamount());

            List<HashMap<String,Object>> paymentList = new ArrayList<>();
            for (ReservationPayment reservationPayment : reservation.getPaymentList()) {
                HashMap<String,Object> paymentMap = new HashMap<>();
                paymentMap.put("id",reservationPayment.getId());
                paymentMap.put("paidamount",reservationPayment.getPaidamount());
                paymentMap.put("discription",reservationPayment.getDiscription());
                paymentMap.put("dateandtime",reservationPayment.getDateandtime());
                HashMap<String,Object> paymentMethod = new HashMap<>();
                paymentMethod.put("id",reservationPayment.getPayment_method_id().getId());
                paymentMethod.put("name",reservationPayment.getPayment_method_id().getMethod());
                paymentMap.put("payment_method_id",paymentMethod);
                paymentList.add(paymentMap);
            }
            paymentMethodMap.put("reservationpayment", paymentList);
            paymentMethodMap.put("paymentstatus", reservation.isPaymentstatus());
            map.put("reservationpaymentdetails", paymentMethodMap);
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
        reservation.setAddedDate(LocalDateTime.now());

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

    @PutMapping
    public HashMap<String,Object> updateReservation(@RequestBody HashMap<String,Object> reservationData){

        Reservation reservation = new Reservation();
        reservation.setId(Integer.parseInt(reservationData.get("reservation_id").toString()));
        reservation.setReservation_number(reservationDao.nextReservationNumber());
        reservation.setHeadcount(Integer.parseInt(reservationData.get("headcount").toString()));
        reservation.setState_id(reservationStateDao.getReferenceById(1));

        HashMap<String,Object> customerData = (HashMap<String, Object>) reservationData.get("customer_id");
        reservation.setCustomer_id(customerDao.getReferenceById(Integer.parseInt(customerData.get("id").toString())));

        Optional<Reservation> oldReservationData = reservationDao.findById(Integer.parseInt(reservationData.get("reservation_id").toString()));


        List<Room> OldRoomList = oldReservationData.get().getRooms();
        //checking chikeout date Assign to Hash map If room id is not in new room list

        HashMap<String,Object> roomReservationsData = new HashMap<>();

        OldRoomList.forEach(room -> {
            List<Object[]> roomDataArray = reservationDao.findRawByReservationAndRoom(reservation.getId(),room.getId());
            roomReservationsData.put(room.getNumber(),roomDataArray);
        });

        System.out.println("255old room list length"+OldRoomList.size());
        //map roompackage many-to-many relationship
        List<RoomPackage> roomPackageslList = new ArrayList<>();
        for(HashMap<String,Object> roompackageDetails : (List<HashMap<String,Object>>) reservationData.get("roomPackages")){
            roomPackageslList.add(roomPackageDao.getReferenceById((Integer) roompackageDetails.get("id")));
        }
        reservation.setRoomPackages(roomPackageslList);
        System.out.println("255old room list length"+OldRoomList.size());
        //map service many-to-many relationship
        List<Service> serviceList = new ArrayList<>();
        for (HashMap<String,Object> serviceDataList : (List<HashMap<String,Object>>) reservationData.get("services_id")){
            //service.setPeramount(service.getPeramount());
            serviceList.add(serviceDao.getReferenceById((Integer) serviceDataList.get("id")));
        }

        reservation.setServices_id(serviceList);
        System.out.println("255old room list length"+OldRoomList.size());
        //map menu many-to-many relationship
        //reservation.setMenu_id((List<Menu>) reservationData.get("menu_id"));

        BigDecimal reservationtotalpayment = new BigDecimal(String.valueOf(reservationData.get("reservationtotalpayment")));
        BigDecimal totalpaidamount = new BigDecimal(String.valueOf(reservationData.get("totalpaidamount")));
        BigDecimal discount = new BigDecimal(String.valueOf(reservationData.get("discount")));
        System.out.println("255old room list length"+OldRoomList.size());
        reservation.setReservationtotalpayment(reservationtotalpayment);
        reservation.setTotalpaidamount(totalpaidamount);
        reservation.setPaymentstatus(reservationtotalpayment.subtract(totalpaidamount.add(discount)).equals(new BigDecimal(0)));
        reservation.setDiscount(discount);
        System.out.println("255old room list length"+OldRoomList.size());
        HashMap<String,Object> reservationpayment = (HashMap<String, Object>) reservationData.get("reservationpayment");
        ReservationPayment reservationPayment = new ReservationPayment();
        reservationPayment.setPaidamount(new BigDecimal(String.valueOf(reservationpayment.get("paidamount"))));
        reservationPayment.setDiscription(String.valueOf(reservationpayment.get("discription")));
        System.out.println("255old room list length"+OldRoomList.size());
        HashMap<String,Object> paymentMethod = (HashMap<String, Object>) reservationpayment.get("payment_method_id");
        reservationPayment.setPayment_method_id(paymentMethodDao.getReferenceById((Integer) paymentMethod.get("id")));
        reservationPayment.setDateandtime(LocalDateTime.now());
        System.out.println(reservationpayment);

        //List<Object[]> roomDataArray = reservationDao.findRawByReservationAndRoom(reservation.getId(),room.getId());
        Reservation addedReservation = reservationDao.save(reservation);
        System.out.println("255old room list length"+OldRoomList.size());
        reservationPayment.setReservation(addedReservation);

        reservationPaymentDao.save(reservationPayment);

        for (HashMap<String,Object> roomDataList : (List<HashMap<String,Object>>) reservationData.get("rooms")){
            reservationDao.AddUpdateRoomReservationDetails(roomDataList.get("checkingdate").toString(), roomDataList.get("checkoutdate").toString(), (Integer) addedReservation.getId(), (Integer) roomDataList.get("id"), 3);
        }


        //old room Id not in new room list that add status as 4
        System.out.println("311 old room list length"+OldRoomList.size());
        for (Room room : OldRoomList){
            boolean isRoomExist = false;

            for (HashMap<String,Object> roomDataList : (List<HashMap<String,Object>>) reservationData.get("rooms")){
                System.out.println(roomDataList.get("id"));
                if (room.getId() == (Integer) roomDataList.get("id")){
                    isRoomExist = true;
                    System.out.println(room.getNumber());
                }
            }
            if (!isRoomExist){
                List<Object[]> roommDataArray = (List<Object[]>) roomReservationsData.get(room.getNumber());
                System.out.println(room.getNumber());
                System.out.println(room.getNumber());
                reservationDao.AddUpdateRoomReservationDetails(roommDataArray.get(0)[2].toString(), roommDataArray.get(0)[3].toString(), (Integer) addedReservation.getId(), (Integer) room.getId(), 4);
            }
        }

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

    @DeleteMapping("/reservatidelete/{reservation_id}")
    public void deleteReservation(@PathVariable("reservation_id") int reservationId){
        Optional<Reservation> OptionalReservation = reservationDao.findById(reservationId);
        if (OptionalReservation.isPresent() && OptionalReservation.get().getAddedDate().isBefore(LocalDateTime.now().minusDays(7))) {
            reservationDao.UpdateDeletedReservation(reservationId);
        }
    }

    @DeleteMapping("/reservationhasroom")
    public void deleteReservationRoom(@RequestParam("reservation_id") int reservationId,@RequestParam("room_id") int roomId){
        reservationDao.updateRoomReservationDetails(4,reservationId,roomId);
    }

    @DeleteMapping("/reservationhasservice")
    public void deleteReservationService(@RequestParam("reservation_id") int reservationId,@RequestParam("service_id") int service_id,@RequestParam("service_count") int service_count){
        Service service = serviceDao.getReferenceById(service_id);
        Optional<Reservation> reservation = reservationDao.findById(reservationId);
        BigDecimal totalPaymentAmount = reservation.get().getTotalpaidamount();

        totalPaymentAmount = totalPaymentAmount.subtract(service.getPeramount().multiply(new BigDecimal(service_count)));
        reservationDao.UpdateReservationPaymentDetails(reservationId, reservation.get().isPaymentstatus(), totalPaymentAmount, reservation.get().getReservationtotalpayment(), reservation.get().getDiscount());
    }

    @DeleteMapping("/reservationhaspackage")
    public void deleteReservationPackage(@RequestParam("reservation_id") int reservationId,@RequestParam("package_id") int package_id,@RequestParam("package_count") int package_count){
        RoomPackage roomPackage = roomPackageDao.getReferenceById(package_id);
        Optional<Reservation> reservation = reservationDao.findById(reservationId);
        BigDecimal totalPaymentAmount = reservation.get().getTotalpaidamount();

        totalPaymentAmount = totalPaymentAmount.subtract(roomPackage.getPrice().multiply(new BigDecimal(package_count)));
        reservationDao.UpdateReservationPaymentDetails(reservationId, reservation.get().isPaymentstatus(), totalPaymentAmount, reservation.get().getReservationtotalpayment(), reservation.get().getDiscount());
    }

    @PutMapping("/reservationhasservice")
    public void addReservationService(@RequestParam("reservation_id") int reservationId,@RequestParam("service_id") int service_id,@RequestParam("service_count") int service_count){
        Optional<Service> service = serviceDao.findById(service_id);
        Optional<Reservation> reservation = reservationDao.findById(reservationId);
        BigDecimal totalPaymentAmount = reservation.get().getTotalpaidamount();

        totalPaymentAmount = totalPaymentAmount.add(service.get().getPeramount().multiply(new BigDecimal(service_count)));
        System.out.println("totalPaymentAmount" + totalPaymentAmount);
        reservationDao.UpdateReservationPaymentDetails(reservationId, reservation.get().isPaymentstatus(), totalPaymentAmount, reservation.get().getReservationtotalpayment(), reservation.get().getDiscount());

    }

    @PutMapping("/reservationhaspackage")
    public void addReservationPackage(@RequestParam("reservation_id") int reservationId,@RequestParam("package_id") int package_id,@RequestParam("package_count") int package_count){
        Optional<RoomPackage> roomPackage = roomPackageDao.findById(package_id);
        Optional<Reservation> reservation = reservationDao.findById(reservationId);
        BigDecimal totalPaymentAmount = reservation.get().getTotalpaidamount();

        totalPaymentAmount = totalPaymentAmount.add(roomPackage.get().getPrice().multiply(new BigDecimal(package_count)));
        reservationDao.UpdateReservationPaymentDetails(reservationId, reservation.get().isPaymentstatus(), totalPaymentAmount, reservation.get().getReservationtotalpayment(), reservation.get().getDiscount());
    }

    @GetMapping("/getbyid/{reservation_number}")
    public Reservation getReservationHasMEnuById(@PathVariable("reservation_number") String reservationNumber) {
        Reservation optionalReservation = reservationDao.findByReservationNumber(reservationNumber);
        System.out.println("Reservation found: " + optionalReservation.getReservation_number());
        return optionalReservation;
    }


    @PutMapping("/reservationpayment/{reservation_number}")
    public void updateReservationPayment(@PathVariable("reservation_number") String reservationNumber, @RequestBody HashMap<String,Object> reservationPaymentData){

        Reservation reservation = reservationDao.findByReservationNumber(reservationNumber);
        if (reservation != null) {

            BigDecimal paidAmount = new BigDecimal(String.valueOf(reservationPaymentData.get("paidamount")));
            BigDecimal discount = new BigDecimal(String.valueOf(reservationPaymentData.get("discount")));
            //BigDecimal totalPaidAmount = reservation.getTotalpaidamount().add(paidAmount).subtract(discount);

            reservation.setTotalpaidamount(paidAmount.add(reservation.totalpaidamount));
            reservation.setPaymentstatus(reservation.getReservationtotalpayment().subtract(paidAmount).add(discount).compareTo(BigDecimal.ZERO)<0);
            reservation.setDiscount(discount);
            reservationDao.save(reservation);

            ReservationPayment reservationPayment = new ReservationPayment();
            reservationPayment.setPaidamount(paidAmount);
            reservationPayment.setDiscription(String.valueOf(reservationPaymentData.get("discription")));
            reservationPayment.setDateandtime(LocalDateTime.now());
            reservationPayment.setReservation(reservation);
            reservationPayment.setPayment_method_id(paymentMethodDao.getReferenceById((Integer) reservationPaymentData.get("payment_method_id")));

            reservationPaymentDao.save(reservationPayment);
        }

    }
}