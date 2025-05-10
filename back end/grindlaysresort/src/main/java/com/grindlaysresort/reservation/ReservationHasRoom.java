package com.grindlaysresort.reservation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reservation_has_room")
@Data
public class ReservationHasRoom {

    @Id
    @Column(name = "reservation_id")
    private Integer reservationId;

    @Id
    @Column(name = "room_id")
    private Integer roomId;

    @Column(name = "checkingdate")
    private LocalDate checkingDate;

    @Column(name = "checkoutdate")
    private LocalDate checkoutDate;

    @ManyToOne
    @JoinColumn(name = "reservation_id", referencedColumnName = "id", insertable = true, updatable = true)
    private ReservationRoomStatus reservationRoomStatus;
}
