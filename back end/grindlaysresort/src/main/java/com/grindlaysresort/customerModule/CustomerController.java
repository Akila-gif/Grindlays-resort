package com.grindlaysresort.customerModule;

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
@RequestMapping({"/customers"})
public class CustomerController {

    @Autowired
    private CustomerDao customerDao;

    @Autowired
    private CustomerStatusDao customerStatusDao;

    private static final Sort Default_Sort = Sort.by(Sort.Direction.DESC,"id");

    @GetMapping
    public List<Customer> getAllCustomer(){
        return  customerDao.findAll(Default_Sort);
    }


    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "{id}")
    public Customer deleteCustomer(@PathVariable("id") int id){
        Optional<Customer> customerForUpdate = customerDao.findById(id);
        HashMap<String, String> errorSet = new HashMap<>();

        if (customerForUpdate.isPresent()){
            Customer customer = customerForUpdate.get();
            customer.setDeletedatetime(LocalDateTime.now());
            Optional<CustomerStatus> removeStatus = customerStatusDao.findById(4);
            if (removeStatus.isPresent()){
                customer.setCustomerstatus_id(removeStatus.get());
                return customerDao.save(customer);
            }else {
                errorSet.put("state","State is not found");
                throw new ObjectNotFoundException(errorSet);
            }

        }else {
            errorSet.put("customer","Customer is not found");
            throw new ObjectNotFoundException(errorSet);
        }
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Customer addNewCustomer(@RequestBody Customer customer){
        //Optional<CustomerStatus> customerStatus = customerStatusDao.findById(3);
        customer.setCustomerstatus_id(customerStatusDao.findById(3).orElse(null));
        customer.setCustomernumber(customerDao.nextCustomerNumber());
        HashMap<String, String> errorSet = validationError(customer);

        if (errorSet.isEmpty()){
            customer.setAddeddatetime(LocalDateTime.now());
            return customerDao.save(customer);
        }else {
            JSONObject jsonObject = new JSONObject(errorSet);
            String orgJsonData = jsonObject.toString();
            throw new ConflictException(orgJsonData);
        }
    }


    @ResponseStatus(HttpStatus.ACCEPTED)
    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable("id") int id,@RequestBody Customer customer){
        Optional<Customer> empForUpdate = customerDao.findById(id);
        HashMap<String, String> errorSet = new HashMap<>();
        customer.setId(id);
        //fdsfsfdsf
        if (empForUpdate.isPresent()){
            customer.setCustomernumber(empForUpdate.get().getCustomernumber());
            errorSet = validationError(customer);

            if (errorSet.isEmpty()){
                customer.setEditdatetime(LocalDateTime.now());
                customer.setAddeddatetime(empForUpdate.get().getAddeddatetime());
                return customerDao.save(customer);
            }else {
                JSONObject jsonObject = new JSONObject(errorSet);
                String orgJsonData = jsonObject.toString();
                throw new ConflictException(orgJsonData);
            }

        }else {
            errorSet.put("customer","Customer is not found");
            throw new ObjectNotFoundException(errorSet);

        }
    }


    public HashMap<String, String> validationError(Customer customer){
        HashMap<String, String> errorSets = new HashMap<>();
        Optional<Customer> CustomeridExistingCustomer =  customerDao.findById(customer.getId());

        Optional<Customer> nicExistingCustomer = Optional.empty();
        if (customer.getNic()!=null) nicExistingCustomer = Optional.ofNullable(customerDao.findCustomerByNic(customer.getNic()));

        Optional<Customer> passportExistingCustomer = Optional.empty();
        if (customer.getPassport()!=null) passportExistingCustomer =  Optional.ofNullable(customerDao.findCustomerByPassport(customer.getPassport()));

        Optional<Customer> mobileExistingCustomer = Optional.ofNullable(customerDao.findCustomerByMobile(customer.getMobile()));
        Optional<Customer> emailExistingCustomer = Optional.ofNullable(customerDao.findCustomerByEmail(customer.getEmail()));
        //if (nicExistingCustomer.isPresent() && nicExistingCustomer.get().getId()!=customer.getId())

        // null validation
        if(customer.getCustomernumber().isEmpty())errorSets.put("CustomerNumber","Emp Number IS required");
        if(customer.getFull_name().isEmpty())errorSets.put("Full Name","Full Name IS required");
        //if(customer.get)errorSets.put("Customer Number","Emp Number IS required");
        if(customer.getPassport()==null && customer.getNic()==null)errorSets.put("Passport or NIC","Passport or Nic IS required");
        if(customer.getGender()==null)errorSets.put("Gender","Gender IS required");
        if(customer.getEmail()==null)errorSets.put("Email","Email IS required");
        if(customer.getAddress()==null)errorSets.put("Address","Address IS required");
        if(customer.getDate_of_birth()==null)errorSets.put("dob","date Of birth IS required");
        else if ((Period.between(customer.getDate_of_birth(), LocalDate.now()).getYears())<18)errorSets.put("dob","Age must be greater than 18");
        if(customer.getCivil_status()==null)errorSets.put("civil_status","civil_status IS required");

        //Existing validation (Unique Validation)
        if (CustomeridExistingCustomer.isPresent()  && CustomeridExistingCustomer.get().getId() != customer.getId()){System.out.println();errorSets.put("empno","This Emp No Number is already Existing");}
        if (nicExistingCustomer.isPresent()  && nicExistingCustomer.get().getId() != customer.getId()){errorSets.put("nic","This NIc Number is already Existing");}
        if (passportExistingCustomer.isPresent()  && passportExistingCustomer.get().getId() != customer.getId()){errorSets.put("passport","This passport Number is already Existing");}
        if (mobileExistingCustomer.isPresent()  && mobileExistingCustomer.get().getId() != customer.getId()){errorSets.put("mobile","This mobile Number is already Existing");}
        if (emailExistingCustomer.isPresent()  && emailExistingCustomer.get().getId() != customer.getId()){errorSets.put("email","This email Number is already Existing");}


        return  errorSets;
    }
}
