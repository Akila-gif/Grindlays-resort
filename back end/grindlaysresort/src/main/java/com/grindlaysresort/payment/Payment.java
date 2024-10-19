package com.grindlaysresort.payment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.grindlaysresort.reservation.Reservation;
import com.grindlaysresort.reservation.ReservationState;
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
        name = "payment"
)
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Integer id;

    @Column(name = "totalpayment")
    BigDecimal totalpayment;

    @Column(name = "paidamount")
    BigDecimal paidamount;

    @Column(name = "paymentstatus")
    boolean paymentstatus;

    @Column(name = "discount")
    BigDecimal discount;

    @ManyToMany(mappedBy = "Payment_id")
    @JsonIgnore
    List<Reservation> reservations;
}