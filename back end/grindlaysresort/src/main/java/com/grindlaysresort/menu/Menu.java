package com.grindlaysresort.menu;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(
        name = "menu"
)
public class Menu {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "name")
    String name;

    @Column(name = "per_amount_price")
    BigDecimal per_amount_price;


    @OneToMany(mappedBy = "menu")
    List<MenuHasMenuItem> menuHasMenuItems;

    @ManyToOne
    @JoinColumn(name = "menu_category_id", referencedColumnName = "id")
    MenuCategory menuCategory;

}
