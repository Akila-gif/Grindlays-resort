package com.grindlaysresort.menu;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Table(name = "menuitem")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Integer id;

    @Column(name = "itemname")
    String ItemName;

    @Column(name = "count")
    String count;

    @Column(name = "unitprice")
    String UnitPrice;

    @OneToMany(mappedBy = "menuItem")
    List<MenuItemHasIngredient> menuItemHasIngredients;


}
