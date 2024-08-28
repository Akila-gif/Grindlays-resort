package com.grindlaysresort.employeeModule.designation;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(
        name = "designation"
)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Designation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",unique = true)
    int id;

    @Column(name = "designation_name")
    @NotNull
    String designation_name ;
}
