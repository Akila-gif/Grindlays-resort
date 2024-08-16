package com.grindlaysresort.roomModule.bedtype;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.grindlaysresort.roomModule.RoomHasBedType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "bedtype")
@Data
@NoArgsConstructor
public class BedType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "type")
    private String type;

    @OneToMany(mappedBy = "bedType", cascade = CascadeType.ALL)
    @JsonIgnore
    List<RoomHasBedType> roomHasBedTypes;
}
