package com.grindlaysresort.reservation;

import com.grindlaysresort.customerModule.Customer;
import com.grindlaysresort.hotelpackages.RoomPackage;
import com.grindlaysresort.menu.Menu;
import com.grindlaysresort.payment.ReservationPayment;
import com.grindlaysresort.roomModule.Room;
import com.grindlaysresort.service.Service;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(
        name = "reservation"
)
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Integer id;

    @Column(name = "reservation_number")
    String reservation_number;

    @Column(name = "Headcount")
    int Headcount;

    @ManyToOne
    @JoinColumn(name = "state_id", referencedColumnName = "id")
    ReservationState state_id;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    Customer customer_id;

    @Column(name = "reservationtotalpayment")
    BigDecimal reservationtotalpayment;

    @Column(name = "totalpaidamount")
    BigDecimal totalpaidamount;

    @Column(name = "paymentstatus")
    boolean paymentstatus;

    @Column(name = "discount")
    BigDecimal discount;

    @OneToMany(mappedBy = "reservation", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<ReservationPayment> paymentList;

    @ManyToMany
    @JoinTable(
            name = "reservation_has_menu",
            joinColumns = @JoinColumn(name = "reservation_id"),
            inverseJoinColumns = @JoinColumn(name = "menu_id")
    )
    List<Menu> menu_id;

    @ManyToMany
    @JoinTable(
            name = "reservation_has_service",
            joinColumns = @JoinColumn(name = "reservation_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    List<Service> services_id;

    @ManyToMany
    @JoinTable(
            name = "reservation_has_roompackage",
            joinColumns = @JoinColumn(name = "reservation_id"),
            inverseJoinColumns = @JoinColumn(name = "roompackage_id")
    )
    List<RoomPackage> roomPackages;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.PERSIST})
    @JoinTable(
            name = "reservation_has_room",
            joinColumns = @JoinColumn(name = "reservation_id"),
            inverseJoinColumns = @JoinColumn(name = "room_id")
    )
    List<Room> rooms;

    public Reservation(Integer id, String reservation_number, ReservationState state_id) {
        this.id = id;
        this.reservation_number = reservation_number;
        this.state_id = state_id;
    }

    public Reservation(Integer integer) {
    }
}