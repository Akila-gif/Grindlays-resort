package com.grindlaysresort;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    @Column(name = "`insert`")
    Boolean insert;

    @Column(name ="`delete`")
    Boolean delete;

    @Column(name = "`select`")
    Boolean select;

    @Column(name = "`update`")
    Boolean update;

    @ManyToOne
    @JoinColumn(name = "module_id", referencedColumnName = "id")
    Module module_id;

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    Role role_id;
}
