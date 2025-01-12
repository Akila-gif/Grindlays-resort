package com.grindlaysresort.payment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.grindlaysresort.reservation.Reservation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(
        name = "reservationpayment"
)
public class ReservationPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Integer id;

    @Column(name = "paidamount")
    BigDecimal paidamount;

    @Column(name = "dateandtime")
    LocalDateTime dateandtime;

    @Column(name = "discription")
    String discription;

    @ManyToOne
    @JoinColumn(name = "payment_method_id",referencedColumnName = "id")
    @JsonIgnore
    PaymentMethod payment_method_id;

    @ManyToOne
    @JoinColumn(name = "reservation_id", referencedColumnName = "id")
    @JsonIgnore
    private Reservation reservation;
}