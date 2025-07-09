package com.grindlaysresort.menu.ingredient;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "ingredientsstatus")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class IngredientStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Integer id;

    @Column(name = "quentity_status")
    String QuentityStatus ;
}
