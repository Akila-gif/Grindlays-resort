package com.grindlaysresort.hotelpackages;

import com.grindlaysresort.WorkingStatus;
import com.grindlaysresort.employeeModule.Employee;
import com.grindlaysresort.exception.ConflictException;
import com.grindlaysresort.exception.ObjectNotFoundException;
import com.grindlaysresort.roomModule.Room;
import com.grindlaysresort.roomModule.RoomHasBedType;
import com.grindlaysresort.roomModule.bedtype.BedType;
import com.grindlaysresort.roomModule.feature.Features;
import com.grindlaysresort.roomModule.roomstates.RoomStates;
import com.grindlaysresort.roomModule.roomtype.RoomType;
import com.grindlaysresort.roomModule.viewtype.ViewType;
import com.grindlaysresort.service.Service;
import com.grindlaysresort.service.ServiceDao;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/roompackages")
public class RoomPackageController {

    @Autowired
    RoomPackageDao roomPackagedao;

    @Autowired
    ServiceDao serviceDao;

    @GetMapping
    public List<RoomPackage> getRoomPackages() {
        return roomPackagedao.findAll();
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public RoomPackage addNewPackage(@RequestBody RoomPackage roomPackage){

        System.out.println(roomPackage.getServiceList());
        for(Service service:roomPackage.getServiceList()){
            System.out.println(service.getName());
        }

        List<Service> services = roomPackage.getServiceList();

        List<Service> managedServices = serviceDao.findAllById(
                services.stream().map(Service::getId).collect(Collectors.toList())
        );

        roomPackage.setServiceList(managedServices);
        HashMap<String, String> errorSet = validationError(roomPackage);

        if (errorSet.isEmpty()){
            return roomPackagedao.save(roomPackage);
        }else {
            JSONObject jsonObject = new JSONObject(errorSet);
            String orgJsonData = jsonObject.toString();
            throw new ConflictException(orgJsonData);
        }
    }

    @DeleteMapping(path = "{id}")
    public RoomPackage deletePackage(@PathVariable("id") int id){
        Optional<RoomPackage> OptionalroomPackageforUpdate = roomPackagedao.findById(id);
        HashMap<String, String> errorSet = new HashMap<>();

        if (OptionalroomPackageforUpdate.isPresent()){
            RoomPackage roomPackageforUpdate = OptionalroomPackageforUpdate.get();
            roomPackageforUpdate.setStatus(false);
            return roomPackagedao.save(roomPackageforUpdate);
        }else {
            errorSet.put("employee","Employee is not found");
            throw new ObjectNotFoundException(errorSet);
        }
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PutMapping("/{id}")
    public RoomPackage updateNewPackage(@PathVariable("id") int id, @RequestBody RoomPackage roomPackage){

        Optional<RoomPackage> OptionalroomPackageforUpdate = roomPackagedao.findById(id);

        if (OptionalroomPackageforUpdate.isEmpty()){
            HashMap<String, String> errorSet = new HashMap<>();
            errorSet.put("roomPackage","RoomPackage is not found");
            throw new ObjectNotFoundException(errorSet);
        }else {

            roomPackage.setId(id);
            List<Service> services = roomPackage.getServiceList();

            List<Service> managedServices = serviceDao.findAllById(
                    services.stream().map(Service::getId).collect(Collectors.toList())
            );

            roomPackage.setServiceList(managedServices);
            HashMap<String, String> errorSet = validationError(roomPackage);

            if (errorSet.isEmpty()){
                return roomPackagedao.save(roomPackage);
            }else {
                JSONObject jsonObject = new JSONObject(errorSet);
                String orgJsonData = jsonObject.toString();
                throw new ConflictException(orgJsonData);
            }
        }
    }

    public HashMap<String, String> validationError(RoomPackage roomPackage){
        HashMap<String, String> errorSets = new HashMap<>();

        //if (nicExistingEmployee.isPresent() && nicExistingEmployee.get().getId()!=employee.getId())
        // null validation
        if(roomPackage.getPackagename().isEmpty())errorSets.put("packagename","Packagename IS required");
        if(roomPackage.getPrice()==null)errorSets.put("price","price or Nic IS required");
        return  errorSets;
    }

}
