package com.grindlaysresort;

import com.grindlaysresort.exception.PivelageNotGrant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/privilege")
public class PrivilageController {

    @Autowired
    PrivilageDao privilageDao;

    @Autowired
    RoleDao roleDao;

    @Autowired
    ModuleController moduleController;

    @GetMapping
    public List<Privilage> getAllPrivilage(){
        return privilageDao.findAll();
    }

    @GetMapping("/gettingAllPrivilageOfLogedUser/{userName}")
    public List <HashMap<String,Object>> getAllPrivilageOfLogedUser(@PathVariable("userName") String userName){
        List<Module> moduleList = moduleController.getAllModule();

        List <HashMap<String,Object>> previlagelist = new java.util.ArrayList<>();

        moduleList.forEach(module -> {

            HashMap<String,Object> module1 =new HashMap<>();
            module1.put("moduleName", module.getName());
            module1.put("privilage", getPrivilageOfUserForModule(module.getName(), userName));
            previlagelist.add(module1);
        });
        return previlagelist;
    }

    @PostMapping
    public Privilage createPrivilage(@RequestBody Privilage privilage){
        System.out.println(privilage);
        //privilage.setRole_id(roleDao.getReferenceById(privilage.getRole_id().getId()));
        return privilageDao.save(privilage);
    }

    @DeleteMapping("/{id}")
    public void deletePrivilage(@PathVariable("id") Integer id){
        HashMap<String,Boolean> deleteUsertprivilage = getPrivilageOfUserForModule("User","admin");
        if (deleteUsertprivilage.get("insert")) {privilageDao.deleteById(id);}
        else {
            HashMap<String,String> errorSet  = new HashMap<>();
            errorSet.put("message", "Don't have Privilage not deleted!");
            throw new PivelageNotGrant(errorSet);
        }
    }

    @GetMapping("/{module}")
    public HashMap<String,Boolean> getUserPrivilageRegardingUserModule(@PathVariable("module") String module,@RequestParam("user") String UserName){
        return  getPrivilageOfUserForModule(module,UserName);
    }

    public HashMap<String,Boolean> getPrivilageOfUserForModule(String moduleName, String userName){
        String [] privilageArray = privilageDao.getPrivilageByUserAndModule(moduleName, userName).split(",");
        HashMap<String,Boolean> crudPrivilage = new HashMap<>();
        crudPrivilage.put("insert",privilageArray[0].equals("1"));
        crudPrivilage.put("select",privilageArray[1].equals("1"));
        crudPrivilage.put("delete",privilageArray[2].equals("1"));
        crudPrivilage.put("update",privilageArray[3].equals("1"));
        return crudPrivilage;
    }
}
