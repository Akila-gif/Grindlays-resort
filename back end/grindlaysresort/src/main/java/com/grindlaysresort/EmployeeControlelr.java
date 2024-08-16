package com.grindlaysresort;

import com.grindlaysresort.exception.ConflictException;
import com.grindlaysresort.exception.ObjectNotFoundException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping({"/employees"})
public class EmployeeControlelr {
    @Autowired
    private EmployeeDao employeeDao;

    @Autowired
    private WorkingStatusDao workingStatusDao;

    private static final Sort Default_Sort = Sort.by(Sort.Direction.DESC,"id");

    @GetMapping
    public List<Employee> getAllEmployee(){
        return  employeeDao.findAll(Default_Sort);
    }

    @GetMapping("/getemployeewithoutaccount")
    public List<Employee> getEmployeeNotHaveUserAccount(){return  employeeDao.findEmployeeNotHaveUserAccount();}

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Employee addNewEmployee(@RequestBody Employee employee){
        System.out.println(employee.getCategory_id());
        employee.setEmployeeid(employeeDao.nextEmployeeID());
        HashMap<String, String> errorSet = validationError(employee);

        if (errorSet.isEmpty()){
            employee.setAdd_date(LocalDateTime.now());
            //return employeeDao.save(employee);
            return employee;
        }else {
            JSONObject jsonObject = new JSONObject(errorSet);
            String orgJsonData = jsonObject.toString();
            throw new ConflictException(orgJsonData);
        }
    }

    @GetMapping("/getemployeebyemployeeid")
    public Employee getEmployeeByEmployeeId(@RequestParam("id") String employeeId){
        Employee employeee = employeeDao.findEmployeeByEmployeeid(employeeId);
        if(employeee==null){
            HashMap<String,String> employeeNotFoundError = new HashMap<>();
            employeeNotFoundError.put("employeee","Employee Not found");
            throw new ObjectNotFoundException(employeeNotFoundError);
        }else {
            return employeee;
        }
    }

    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable("id") int id,@RequestBody Employee employee){
        Optional<Employee> empForUpdate = employeeDao.findById(id);
        HashMap<String, String> errorSet = new HashMap<>();
        employee.setId(id);
        //fdsfsfdsf
        if (empForUpdate.isPresent()){
            employee.setEmployeeid(empForUpdate.get().getEmployeeid());
            errorSet = validationError(employee);

            if (errorSet.isEmpty()){
                employee.setEdit_date(LocalDateTime.now());
                employee.setAdd_date(empForUpdate.get().add_date);
                return employeeDao.save(employee);
            }else {
                JSONObject jsonObject = new JSONObject(errorSet);
                String orgJsonData = jsonObject.toString();
                throw new ConflictException(orgJsonData);
            }

        }else {
            errorSet.put("employee","Employee is not found");
            throw new ObjectNotFoundException(errorSet);

        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "{id}")
    public Employee deleteEmployee(@PathVariable("id") int id){
        Optional<Employee> empForUpdate = employeeDao.findById(id);
        HashMap<String, String> errorSet = new HashMap<>();

        if (empForUpdate.isPresent()){
            Employee employee = empForUpdate.get();
            System.out.println(employee);
            employee.setDelete_date(LocalDateTime.now());
            Optional<WorkingStatus> removeWorkingStatus = workingStatusDao.findById(2);
            if (removeWorkingStatus.isPresent()){
                employee.setWorkingstatus_id(removeWorkingStatus.get());
                return employeeDao.save(employee);
            }else {
                errorSet.put("state","State is not found");
                throw new ObjectNotFoundException(errorSet);
            }

        }else {
            errorSet.put("employee","Employee is not found");
            throw new ObjectNotFoundException(errorSet);
        }
    }

    public HashMap<String, String> validationError(Employee employee){
        HashMap<String, String> errorSets = new HashMap<>();
        Optional<Employee> EmployeeidExistingEmployee = Optional.ofNullable(employeeDao.findEmployeeByEmployeeid(employee.getEmployeeid()));

        Optional<Employee> nicExistingEmployee = Optional.empty();
        if (employee.getNic()!=null) nicExistingEmployee = Optional.ofNullable(employeeDao.findEmployeeByNic(employee.getNic()));

        Optional<Employee> passportExistingEmployee = Optional.empty();
        if (employee.getPassport()!=null) passportExistingEmployee =  Optional.ofNullable(employeeDao.findEmployeeByPassport(employee.getPassport()));

        Optional<Employee> mobileExistingEmployee = Optional.ofNullable(employeeDao.findEmployeeByMobile(employee.getMobile()));
        Optional<Employee> emailExistingEmployee = Optional.ofNullable(employeeDao.findEmployeeByEmail(employee.getEmail()));
        //if (nicExistingEmployee.isPresent() && nicExistingEmployee.get().getId()!=employee.getId())

        // null validation
        if(employee.getEmployeeid().isEmpty())errorSets.put("EmployeeNumber","Emp Number IS required");
        if(employee.getFull_name().isEmpty())errorSets.put("Full Name","Full Name IS required");
        //if(employee.get)errorSets.put("Employee Number","Emp Number IS required");
        if(employee.getPassport()==null && employee.getNic()==null)errorSets.put("Passport or NIC","Passport or Nic IS required");
        if(employee.getGender()==null)errorSets.put("Gender","Gender IS required");
        if(employee.getEmail()==null)errorSets.put("Email","Email IS required");
        if(employee.getAddress()==null)errorSets.put("Address","Address IS required");
        if(employee.getDate_of_birth()==null)errorSets.put("date_of_birth","date Of birth IS required");
        else if ((Period.between(employee.getDate_of_birth(), LocalDate.now()).getYears())<18)errorSets.put("date_of_birth","Age must be greater than 18");
        if(employee.getCivil_status()==null)errorSets.put("civil_status","civil_status IS required");

        //Existing validation (Unique Validation)
        if (EmployeeidExistingEmployee.isPresent()  && EmployeeidExistingEmployee.get().getId() != employee.getId()){System.out.println();errorSets.put("empno","This Emp No Number is already Existing");}
        if (nicExistingEmployee.isPresent()  && nicExistingEmployee.get().getId() != employee.getId()){errorSets.put("nic","This NIc Number is already Existing");}
        if (passportExistingEmployee.isPresent()  && passportExistingEmployee.get().getId() != employee.getId()){errorSets.put("passport","This passport Number is already Existing");}
        if (mobileExistingEmployee.isPresent()  && mobileExistingEmployee.get().getId() != employee.getId()){errorSets.put("mobile","This mobile Number is already Existing");}
        if (emailExistingEmployee.isPresent()  && emailExistingEmployee.get().getId() != employee.getId()){errorSets.put("email","This email Number is already Existing");}


        return  errorSets;
    }
}