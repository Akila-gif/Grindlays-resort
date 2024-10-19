package com.grindlaysresort.reservation;

import com.grindlaysresort.service.Service;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;


@Table(name = "reservation_has_service")
@Data
@NoArgsConstructor
@AllArgsConstructor
@org.springframework.stereotype.Service
public class ReservationHasService {


    @ManyToOne
    @JoinColumn(name = "reservation_id", referencedColumnName = "id")
    Reservation reservation_id;

    @ManyToOne
    @JoinColumn(name = "service_id", referencedColumnName = "id")
    Service service_id;

    @Column(name = "amount")
    int amount;

    @Column(name = "totalprice")
    BigDecimal totalprice;
}
