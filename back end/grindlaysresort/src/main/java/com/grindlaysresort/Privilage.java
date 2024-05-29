package com.grindlaysresort;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "privilage")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Privilage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Integer id;

    @Column(name = "insert")
    Boolean insert;

    @Column(name ="delete")
    Boolean delete;

    @Column(name = "select")
    Boolean select;

    @Column(name = "update")
    Boolean update;
/*
    @Column(name = "")
    List<Role> role_id;
    List<Module> module_id;
*/
}
