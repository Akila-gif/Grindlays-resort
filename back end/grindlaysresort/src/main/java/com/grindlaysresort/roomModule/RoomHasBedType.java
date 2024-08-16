package com.grindlaysresort.roomModule;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.grindlaysresort.roomModule.bedtype.BedType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "room_has_bedtype")
@Data
@NoArgsConstructor
public class RoomHasBedType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    
    @ManyToOne
    @JoinColumn(name = "bedtype_id", referencedColumnName = "id")
    BedType bedType;

    @ManyToOne(cascade = CascadeType.ALL , fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    @JsonIgnore
    Room room;

    @Column(name = "bed_count")
    int bed_count;

}
