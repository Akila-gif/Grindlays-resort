package com.grindlaysresort.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.grindlaysresort.User;
import com.grindlaysresort.hotelpackages.RoomPackage;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "service")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Integer id;

    @Column(name = "name")
    String name;

    @Column(name = "peramount", precision = 10, scale = 2)
    BigDecimal peramount;

    @ManyToOne
    @JoinColumn(name = "servicecategory_id", referencedColumnName = "id")
    ServiceCategory servicecategory_id;

    @ManyToOne
    @JoinColumn(name = "serviceavaliability_id", referencedColumnName = "id")
    ServiceAvaliability serviceAvaliability_id;

    @JsonIgnore
    @ManyToMany(mappedBy = "serviceList")
    private List<RoomPackage> roomPackagesList;

}
