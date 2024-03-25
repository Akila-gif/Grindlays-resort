package com.grindlaysresort;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/empstatus")
public class WorkingStatusController {

    @Autowired
    private WorkingStatusDao WorkingStatusDao;

    //Get All Status
    //http://localhost:8082/empstatus
    @GetMapping()
    public List<WorkingStatus> getAllStatus(){
        return WorkingStatusDao.findAll();
    }

    //Insert A Staste
/*    http://localhost:8082/empstatus
    {
        "id": 3,
            "name": "Delete"
    }
*/
    @PostMapping()
    public void addNewStatus(@RequestBody WorkingStatus WorkingStatus){
        WorkingStatusDao.save(WorkingStatus);
    }

    //http://localhost:8082/empstatus/3
    @GetMapping(value = "/{id}")
    public Optional<WorkingStatus> getStatus(@PathVariable("id") int id){
        return WorkingStatusDao.findById(id);
    }

    //Delete primary key
    //http://localhost:8082/empstatus/2
    @DeleteMapping(value = "/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void deteleEmployee(@PathVariable("id") int id){
        WorkingStatusDao.deleteById(id);
    }

    //Update Details
/*
    http://localhost:8082/empstatus/2
    {
        "name": "Resign"
    }
*/

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping(value = "{id}")
    public void updateEmployee(@RequestBody WorkingStatus WorkingStatus,@PathVariable("id") int id){
        Optional<WorkingStatus> WorkingStatus1 = WorkingStatusDao.findById(id);

        if (WorkingStatus1.isPresent()){
            WorkingStatus.setId(id);
            WorkingStatusDao.save(WorkingStatus);
        }
    }

/*
    //http://localhost:8082/empstatus?id=dasdas
    @GetMapping()
    public List<WorkingStatus> getAllStatus(@RequestParam("id") String p){
        System.out.println(p);
        return WorkingStatusDao.findAll();
    }
*/

/*
    //http://localhost:8082/empstatus/sada
    @GetMapping(value = "/{id}")
    public List<WorkingStatus> getAllStatus(@PathVariable("id") String id){
        System.out.println(id);
        return WorkingStatusDao.findAll();
    }*/
}
