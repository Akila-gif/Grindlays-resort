package com.grindlaysresort.roomModule.roomtype;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/roomtypes")
public class RoomTypeController {

    @Autowired
    private RoomTypeDao roomTypeDao;

    @GetMapping
    public List<RoomType> getAllRoomType(){
        return roomTypeDao.findAll();
    }
}
