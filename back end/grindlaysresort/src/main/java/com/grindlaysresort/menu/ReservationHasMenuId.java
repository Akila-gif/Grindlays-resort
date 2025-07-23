package com.grindlaysresort.menu;

import java.io.Serializable;
import java.util.Objects;

public class ReservationHasMenuId implements Serializable {
    private Integer reservation;
    private Integer menu;

    public ReservationHasMenuId() {}

    public ReservationHasMenuId(Integer reservation, Integer menu) {
        this.reservation = reservation;
        this.menu = menu;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReservationHasMenuId that = (ReservationHasMenuId) o;
        return Objects.equals(reservation, that.reservation) &&
                Objects.equals(menu, that.menu);
    }

    @Override
    public int hashCode() {
        return Objects.hash(reservation, menu);
    }
}