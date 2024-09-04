package com.grindlaysresort.hotelpackages;

import com.grindlaysresort.service.Service;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "roompackage")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name = "id")
    Integer id;

    @Column(name = "packagename")
    String packagename;

    @Column(name = "price")
    BigDecimal price;

    @Column(name = "status")
    boolean status;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "service_has_roompackage",
            joinColumns = @JoinColumn(name = "roompackage_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    List<Service> serviceList;
}
