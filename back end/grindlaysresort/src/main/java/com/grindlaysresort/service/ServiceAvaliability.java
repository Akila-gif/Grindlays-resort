package com.grindlaysresort.service;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "serviceavaliability")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceAvaliability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Integer id;

    @Column(name = "status")
    String status;
}
