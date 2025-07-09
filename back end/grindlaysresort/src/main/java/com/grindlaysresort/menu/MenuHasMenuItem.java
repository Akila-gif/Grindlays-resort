package com.grindlaysresort.menu;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Table(name = "menu_has_menuitem")
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class MenuHasMenuItem {

    @Column(name = "itemquentity")
    BigDecimal itemquentity;

    @Id
    @ManyToOne
    @JoinColumn(name = "menu_id", referencedColumnName = "id")
    @JsonIgnore
    Menu menu;

    @Id
    @ManyToOne
    @JoinColumn(name = "menuitem_id", referencedColumnName = "id")
    MenuItem menuitem;
}
