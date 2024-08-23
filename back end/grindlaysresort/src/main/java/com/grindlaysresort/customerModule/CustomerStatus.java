package com.grindlaysresort.customerModule;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "customerstatus")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerStatus {
    @Id
    @Column(name = "id", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column(name = "status")
    @NotNull
    String status ;
}
