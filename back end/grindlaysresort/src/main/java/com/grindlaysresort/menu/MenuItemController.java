package com.grindlaysresort.menu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/menuitems")
public class MenuItemController {

    @Autowired
    MenuItemDao menuItemDao;

    @GetMapping(value = "/{id}")
    public MenuItem getAllMenuItem(@PathVariable("id") int id) {

        Optional<MenuItem> optionalMenuItem = menuItemDao.findById(1);
        System.out.println("findByID: " + id);
        return optionalMenuItem.get();
    }
}
