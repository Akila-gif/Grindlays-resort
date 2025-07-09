package com.grindlaysresort.menu;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.grindlaysresort.menu.ingredient.Ingredient;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Table(name = "menuitem_has_ingredients")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class MenuItemHasIngredient {

    @Column(name = "needquentity")
    BigDecimal needquentity;

    @Id
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "menuitem_id", referencedColumnName = "id")
    @JsonIgnore
    MenuItem menuItem;

    @Id
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ingredients_id", referencedColumnName = "id")
    Ingredient ingredients;
}