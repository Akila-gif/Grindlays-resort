package com.grindlaysresort.menu.ingredient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.grindlaysresort.menu.MenuItemHasIngredient;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Table(name = "ingredients")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "ingredientscode")
    String ingredientscode;

    @Column(name = "name")
    String name;

    @Column(name = "price")
    BigDecimal price;

    @Column(name = "count")
    int count;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ingredientsstatus_id", referencedColumnName = "id")
    IngredientStatus ingredientsstatus_id;

    @ManyToOne( fetch = FetchType.EAGER)
    @JoinColumn(name = "foodcategory_id", referencedColumnName = "id")
    FoodCategory foodcategory_id;

    @OneToMany(mappedBy = "ingredients")
    @JsonIgnore
    List<MenuItemHasIngredient> menuItemHasIngredients;
}