package com.grindlaysresort.menu;

import com.grindlaysresort.reservation.Reservation;
import com.grindlaysresort.reservation.ReservationDao;
import jakarta.persistence.Id;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reservationhasmenu")
public class ReservationHasMenuController {

    @Autowired
    private ReservationHasMenuDao reservationHasMenuDao;

    @Autowired
    private ReservationDao reservationDao;

    @Autowired
    private MenuDao menuDao;

    @GetMapping
    public ResponseEntity<List<ReservationHasMenu>> getAllReservationHasMenu() {
        return ResponseEntity.ok(reservationHasMenuDao.findAll());
    }

    @GetMapping("/by-reservation/{id}")
    public ResponseEntity<List<ReservationHasMenu>> getMenusByReservationId(@PathVariable("id") Integer reservationId) {
        List<ReservationHasMenu> menus = reservationHasMenuDao.findAll().stream()
                .filter(menu -> menu.getReservation().getId().equals(reservationId))
                .collect(Collectors.toList());

        return ResponseEntity.ok(menus);
    }


    @PostMapping("adduserbuymenu/{reservationNumber}")
    public ResponseEntity<?> addMenusToReservation(@PathVariable String reservationNumber,@RequestBody List<Map<String, Object>> menuItemsRequest) {

        // Find the reservation
        Reservation reservation = reservationDao.findByReservationNumber(reservationNumber);
        if (reservation==null) {
            return new ResponseEntity<>("Reservation not found", HttpStatus.NOT_FOUND);
        }

        List<ReservationHasMenu> savedMenuItems = new ArrayList<>();

        for (Map<String, Object> menuItemRequest : menuItemsRequest) {
            ReservationHasMenu reservationHasMenu = new ReservationHasMenu();

            // Set quantity
            reservationHasMenu.setQuentity((Integer) menuItemRequest.get("itemquentity"));

            // Set total price
            String totalPriceStr = menuItemRequest.get("totalprice").toString();
            reservationHasMenu.setTotalprice(new BigDecimal(totalPriceStr));

            // Set date and time
            if (menuItemRequest.get("dateandtime") != null) {
                reservationHasMenu.setDateandtime(LocalDateTime.parse(menuItemRequest.get("dateandtime").toString()));
            } else {
                reservationHasMenu.setDateandtime(LocalDateTime.now());
            }

            // Set menu
            Map<String, Object> menuMap = (Map<String, Object>) menuItemRequest.get("menu");
            Integer menuId = (Integer) menuMap.get("id");
            Optional<Menu> optionalMenu = menuDao.findById(menuId);
            if (!optionalMenu.isPresent()) {
                continue; // Skip this item if menu not found
            }

            reservationHasMenu.setMenu(optionalMenu.get());
            reservationHasMenu.setReservation(reservation);

            // Save the menu item
            savedMenuItems.add(reservationHasMenuDao.save(reservationHasMenu));
        }
        return new ResponseEntity<>(savedMenuItems, HttpStatus.CREATED);
    }

    // Update menu quantity or price for a reservation
    @PutMapping("updateuserbuymenu/{reservationId}")
    public ResponseEntity<?> updateMenusToReservation(@PathVariable Integer reservationId,@RequestBody List<Map<String, Object>> menuItemsRequest) {

        try {
            // First, remove existing menu items for this reservation
            List<ReservationHasMenu> existingMenus = reservationHasMenuDao.findByReservationId(reservationId);
            reservationHasMenuDao.deleteAll(existingMenus);

            // Get the reservation
            Optional<Reservation> reservationOpt = reservationDao.findById(reservationId);
            if (!reservationOpt.isPresent()) {
                return ResponseEntity.badRequest().body("Reservation not found");
            }

            Reservation reservation = reservationOpt.get();

            // Add updated menu items
            for (Map<String, Object> menuItemRequest : menuItemsRequest) {
                Integer menuId = (Integer) menuItemRequest.get("menuId");
                Integer quantity = (Integer) menuItemRequest.get("quantity");
                BigDecimal totalPrice = new BigDecimal(menuItemRequest.get("totalPrice").toString());

                Optional<Menu> menuOpt = menuDao.findById(menuId);
                if (menuOpt.isPresent()) {
                    ReservationHasMenu reservationHasMenu = new ReservationHasMenu();
                    reservationHasMenu.setReservation(reservation);
                    reservationHasMenu.setMenu(menuOpt.get());
                    reservationHasMenu.setQuentity(quantity);
                    reservationHasMenu.setTotalprice(totalPrice);
                    reservationHasMenu.setDateandtime(LocalDateTime.now());

                    reservationHasMenuDao.save(reservationHasMenu);
                }
            }

            return ResponseEntity.ok("Menu items updated successfully");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating menu items: " + e.getMessage());
        }
    }
    // Delete a menu from a reservation
    @DeleteMapping("/{reservationId}/{menuId}")
    public ResponseEntity<HttpStatus> deleteReservationMenu(
            @PathVariable int reservationId,
            @PathVariable int menuId) {

        try {
            List<ReservationHasMenu> entries = reservationHasMenuDao.findByReservationId(reservationId);

            for (ReservationHasMenu entry : entries) {
                if (entry.getMenu().getId() == menuId) {
                    reservationHasMenuDao.delete(entry);
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                }
            }

            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}