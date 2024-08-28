package com.grindlaysresort.service;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

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
}
