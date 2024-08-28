package com.grindlaysresort.employeeModule.designation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value ="/designations" )
public class DesignationController {

    @Autowired
    private DesignationDao designationDao;

    //Get All Status
    //http://localhost:8082/designations
    @GetMapping()
    public List<Designation> getAllStatus(){
        return designationDao.findAll();
    }

    //Insert A Staste
/*    http://localhost:8082/designations
    {
        "id": 3,
            "name": "Delete"
    }
*/
    @PostMapping()
    public void addNewStatus(@RequestBody Designation Designation){
        designationDao.save(Designation);
    }

    //http://localhost:8082/designations/3
    @GetMapping(value = "/{id}")
    public Optional<Designation> getStatus(@PathVariable("id") int id){
        return designationDao.findById(id);
    }

    //Delete primary key
    //http://localhost:8082/designations/2
    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deteleEmployee(@PathVariable("id") int id){
        designationDao.deleteById(id);
    }

    //Update Details
/*
    http://localhost:8082/designations/2
    {
        "name": "Resign"
    }
*/

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping(value = "{id}")
    public void updateEmployee(@RequestBody Designation Designation,@PathVariable("id") int id){
        Optional<Designation> Designation1 = designationDao.findById(id);

        if (Designation1.isPresent()){
            Designation.setId(id);
            designationDao.save(Designation);
        }
    }

}
