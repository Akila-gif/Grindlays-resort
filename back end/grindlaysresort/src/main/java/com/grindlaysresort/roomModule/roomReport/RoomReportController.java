package com.grindlaysresort.roomModule.roomReport;

import com.grindlaysresort.customerModule.Customer;
import com.grindlaysresort.employeeModule.Employee;
import com.grindlaysresort.roomModule.Room;
import com.grindlaysresort.roomModule.RoomDao;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("report/roomreport")
public class RoomReportController {

    @Autowired
    RoomDao roomDao;

    @PersistenceContext
    EntityManager entityManager;

    @GetMapping("sda")
    public List<Room> getAllRoom(){
        return roomDao.findAll();
    }

    @GetMapping("/roomlist")
    public List<Employee> findCustomerByDynamicCriteria(@RequestParam(required = false)Integer roomstates_id, @RequestParam(required = false) Integer viewtype_id, @RequestParam(required = false)Integer roomtype_id, @RequestParam(required = false) Integer maxheadcount, @RequestParam(required = false) BigDecimal min_price, @RequestParam(required = false) BigDecimal max_price  , @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkinDate, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate  checkoutDate, @RequestParam(required = false) String orderbytype, @RequestParam(required = false) String asendordesend ) {
        // Start building the query string
        StringBuilder queryString = new StringBuilder("SELECT * FROM room r");

        // Track whether the "WHERE" clause has been added
        boolean whereAdded = false;

        // Add conditions dynamically based on non-null parameters
        if (roomstates_id != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            queryString.append(" r.roomstates_id = :roomstates_id");
            whereAdded = true;
        }
        if (viewtype_id != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            queryString.append(" r.viewtype_id = :viewtype_id");
            whereAdded = true;
        }
        if (roomtype_id != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            queryString.append(" r.roomtype_id = :roomtype_id");
            whereAdded = true;
        }
        if (maxheadcount != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            queryString.append(" r.maxheadcount <= :maxheadcount");
            whereAdded = true;
        }
        if (min_price != null || max_price != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            if (max_price == null) {
                queryString.append(" r.roomprice > :min_price");
            } else if (min_price == null) {
                queryString.append(" r.roomprice < :max_price");
            } else {
                queryString.append(" r.roomprice BETWEEN :min_price AND :max_price");
            }
            whereAdded = true;
        }
        if (checkinDate != null && checkoutDate != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            queryString.append(" r.id NOT IN (SELECT re.room_id FROM reservation_has_room re WHERE re.checkingdate BETWEEN :checkinDate AND :checkoutDate OR re.checkoutdate BETWEEN :checkinDate AND :checkoutDate OR :checkinDate  between re.checkingdate and re.checkoutdate AND re.reservation_room_status_id !=4 )");
        }
        if (orderbytype != null) {
            queryString.append(" ORDER by "+orderbytype);
            if (asendordesend != null) {
                queryString.append(" "+asendordesend);
            }
        }else {
            queryString.append(" ORDER BY r.id desc");
        }
        System.out.println(queryString);
        // Create the query
        Query query = entityManager.createNativeQuery(queryString.toString(), Room.class);

        // Set parameters if they are not null
        if (roomstates_id != null) {
            query.setParameter("roomstates_id", roomstates_id);
        }
        if (viewtype_id != null) {
            query.setParameter("viewtype_id", viewtype_id);
        }
        if (roomtype_id != null) {
            query.setParameter("roomtype_id", roomtype_id);
        }
        if (maxheadcount != null) {
            query.setParameter("maxheadcount", maxheadcount);
        }
        if (min_price != null) {
            query.setParameter("min_price", min_price);
        }
        if (max_price != null) {
            query.setParameter("max_price", max_price);
        }
        if (checkinDate != null && checkoutDate != null) {
            query.setParameter("checkinDate", checkinDate);
            query.setParameter("checkoutDate", checkoutDate);
        }

        return query.getResultList();
    }


/*

    //this is the original code for getting room list
    @GetMapping("/roomlist")
    public List<Employee> findCustomerByDynamicCriteria(@RequestParam(required = false)Integer roomstates_id, @RequestParam(required = false) Integer viewtype_id, @RequestParam(required = false)Integer roomtype_id, @RequestParam(required = false) Integer maxheadcount, @RequestParam(required = false) BigDecimal min_price, @RequestParam(required = false) BigDecimal max_price  , @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkinDate, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate  checkoutDate, @RequestParam(required = false) String orderbytype, @RequestParam(required = false) String asendordesend ) {
        // Start building the query string
        StringBuilder queryString = new StringBuilder("SELECT * FROM room r");

        // Track whether the "WHERE" clause has been added
        boolean whereAdded = false;

        // Add conditions dynamically based on non-null parameters
        if (roomstates_id != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            queryString.append(" r.roomstates_id = :roomstates_id");
            whereAdded = true;
        }
        if (viewtype_id != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            queryString.append(" r.viewtype_id = :viewtype_id");
            whereAdded = true;
        }
        if (roomtype_id != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            queryString.append(" r.roomtype_id = :roomtype_id");
            whereAdded = true;
        }
        if (maxheadcount != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            queryString.append(" r.maxheadcount <= :maxheadcount");
            whereAdded = true;
        }
        if (min_price != null || max_price != null) {
            queryString.append(whereAdded ? " AND" : " WHERE");
            if (max_price == null) {
                queryString.append(" r.roomprice > :min_price");
            } else if (min_price == null) {
                queryString.append(" r.roomprice < :max_price");
            } else {
                queryString.append(" r.roomprice BETWEEN :min_price AND :max_price");
            }
            whereAdded = true;
        }
        if (orderbytype != null) {
            queryString.append(" ORDER by "+orderbytype);
            if (asendordesend != null) {
                queryString.append(" "+asendordesend);
                System.out.println(queryString);
            }
        }else {
            queryString.append(" ORDER BY r.id desc");
        }

        // Create the query
        Query query = entityManager.createNativeQuery(queryString.toString(), Room.class);

        // Set parameters if they are not null
        if (roomstates_id != null) {
            query.setParameter("roomstates_id", roomstates_id);
        }
        if (viewtype_id != null) {
            query.setParameter("viewtype_id", viewtype_id);
        }
        if (roomtype_id != null) {
            query.setParameter("roomtype_id", roomtype_id);
        }
        if (maxheadcount != null) {
            query.setParameter("maxheadcount", maxheadcount);
        }
        if (min_price != null) {
            query.setParameter("min_price", min_price);
        }
        if (max_price != null) {
            query.setParameter("max_price", max_price);
        }

        return query.getResultList();
    }

*/

}
