package com.grindlaysresort.menu;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.grindlaysresort.reservation.Reservation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Table(name = "reservation_has_menu")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@IdClass(ReservationHasMenuId.class)
public class ReservationHasMenu {

    @Column(name = "quentity")
    Integer quentity;

    @Column(name = "totalprice")
    BigDecimal totalprice;

    @Column(name = "dateandtime")
    LocalDateTime dateandtime;

    @Id
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "reservation_id", referencedColumnName = "id")
    Reservation reservation;

    @Id
    @ManyToOne
    @JoinColumn(name = "menu_id", referencedColumnName = "id")
    Menu menu;

}
