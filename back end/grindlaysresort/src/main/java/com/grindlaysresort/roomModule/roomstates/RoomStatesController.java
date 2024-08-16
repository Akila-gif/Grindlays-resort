package com.grindlaysresort.roomModule.roomstates;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/roomstatus")
public class RoomStatesController {

    @Autowired
    private RoomStatesDao roomStatesDao;

    @GetMapping
    public List<RoomStates> getAllRoomStatus(){
        return roomStatesDao.findAll();
    }
}
