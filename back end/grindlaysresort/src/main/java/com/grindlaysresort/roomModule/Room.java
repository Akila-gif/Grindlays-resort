package com.grindlaysresort.roomModule;

import com.grindlaysresort.roomModule.bedtype.BedType;
import com.grindlaysresort.roomModule.feature.Features;
import com.grindlaysresort.roomModule.roomstates.RoomStates;
import com.grindlaysresort.roomModule.roomtype.RoomType;
import com.grindlaysresort.roomModule.viewtype.ViewType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "room")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    int id;

    @Column(name = "number")
    String number;

    @Column(name = "maxheadcount")
    int maxheadcount;

    @ManyToOne
    @JoinColumn (name = "roomstates_id" , referencedColumnName = "id")
    RoomStates roomstates_id;

    @Column(name = "roomname")
    String roomname;

    @ManyToOne
    @JoinColumn (name = "roomtype_id" , referencedColumnName = "id")
    RoomType roomtype_id;

    @ManyToOne
    @JoinColumn (name = "viewtype_id", referencedColumnName = "id")
    ViewType viewtype_id;

    @Column(name = "roomprice")
    BigDecimal roomprice;

    @ManyToMany
    @JoinTable(
            name = "room_has_bedtype",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "bedtype_id")
    )
    List<BedType> bedTypes;

    @ManyToMany ()
    @JoinTable(
            name = "room_has_features",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "features_id")
    )
    List<Features> featuresList;
}
