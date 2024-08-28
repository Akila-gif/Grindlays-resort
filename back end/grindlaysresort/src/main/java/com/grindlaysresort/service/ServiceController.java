package com.grindlaysresort.service;

import com.grindlaysresort.WorkingStatus;
import com.grindlaysresort.employeeModule.Employee;
import com.grindlaysresort.exception.ConflictException;
import com.grindlaysresort.exception.ObjectNotFoundException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping({"/services"})
public class ServiceController {

    @Autowired
    ServiceDao serviceDao;

    @Autowired
    ServiceCagegoryDao serviceCagegoryDao;

    @Autowired
    ServiceAvaliabilityDao serviceAvaliabilityDao;

    @GetMapping
    public List<Service> getAllServices(){
        return serviceDao.findAll();
    }

    @GetMapping("/categories")
    public List<ServiceCategory> getServiceCategoryById(){
        return serviceCagegoryDao.findAll();
    }

    @GetMapping("/availability")
    public List<ServiceAvaliability> getServiceAvalilability(){
        return serviceAvaliabilityDao.findAll();
    }

    @PostMapping()
    public Service addNewServices(@RequestBody Service service){
        HashMap<String, String> errorSet = validationError(service);

        if (errorSet.isEmpty()){
            return serviceDao.save(service);
        }else {
            JSONObject jsonObject = new JSONObject(errorSet);
            String orgJsonData = jsonObject.toString();
            throw new ConflictException(orgJsonData);
        }
    }

    @PutMapping("/{id}")
    public Service updateService(@RequestBody Service service, @PathVariable("id") int id){
        System.out.println(id);
        HashMap<String, String> errorSet = validationError(service);
        if (errorSet.isEmpty()){
            service.setId(id);
            return serviceDao.save(service);
        }else {
            JSONObject jsonObject = new JSONObject(errorSet);
            String orgJsonData = jsonObject.toString();
            throw new ConflictException(orgJsonData);
        }
    }

    @DeleteMapping("/{id}")
    public Service deleteService(@PathVariable("id") int id){
        Optional<Service> serviceForUpdate = serviceDao.findById(id);
        HashMap<String, String> errorSet = new HashMap<>();

        if (serviceForUpdate.isPresent()){
            Service service = serviceForUpdate.get();
            System.out.println(service);
            Optional<ServiceAvaliability> serviceAvaliability = serviceAvaliabilityDao.findById(2);
            if (serviceAvaliability.isPresent()){
                service.setServiceAvaliability_id(serviceAvaliability.get());
                return serviceDao.save(service);
            }else {
                System.out.println(serviceAvaliability);
                errorSet.put("state","State is not found");
                throw new ObjectNotFoundException(errorSet);
            }

        }else {
            errorSet.put("employee","Employee is not found");
            throw new ObjectNotFoundException(errorSet);
        }
    }

    public HashMap<String, String> validationError(Service service){

        HashMap<String, String> errorSets = new HashMap<>();
        // null validation
        if(service.getName().isEmpty())errorSets.put("peramount","Emp Number IS required");
        if(service.getServicecategory_id().canEqual(0))errorSets.put("servicecategory_id","Emp Number IS required");
        if(service.getServiceAvaliability_id().canEqual(0))errorSets.put("serviceAvaliability_id","Emp Service IS required");
        if(BigDecimal.ZERO.equals(service.getPeramount()))errorSets.put("peramount","Full Name IS required");

        return  errorSets;
    }
}
