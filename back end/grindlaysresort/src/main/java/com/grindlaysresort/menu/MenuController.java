package com.grindlaysresort.menu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/menu")
public class MenuController {

    @Autowired
    MenuDao menuDao;

    @Autowired
    MenuCategoryDao menuCategoryDao;

    @GetMapping(value = "/{id}")
    public Menu getMenuById(@PathVariable("id") int id){
        Optional<Menu> optionalMenu = menuDao.findById(id);
        return optionalMenu.get();
    }

    @GetMapping()
    public List<Menu> getAllMenu(){
        return menuDao.findAll();
    }

    @GetMapping("/category")
    public List<MenuCategory> getAllMenuCategories() {
        return menuCategoryDao.findAll();
    }
}
