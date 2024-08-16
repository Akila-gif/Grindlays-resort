var privilege = new Object();
window.addEventListener("load", () => {
     refreshPrivilage(HTTPRequestService("GET", "http://localhost:8080/privilege"));
     RoleSelectecterCreate(HTTPRequestService("GET", "http://localhost:8080/roles"));
     ModuleSelectecterCreate(HTTPRequestService("GET", "http://localhost:8080/module"));
});
refreshPrivilage = (dataList) => {
     //displaying data list for employee table
     const displayProperty = [
          { dataType: "function", propertyName: roleFunction },
          { dataType: "function", propertyName: moduleFunction },
          { dataType: "function", propertyName: privilageFunction },
     ];

     fillDataIntoTable(PrivilageView, dataList, displayProperty, EditfunctionName, DeleteFunctionName, MoreFunctionName, true);
     // fillDataIntoTable(tableod,datalist,editfunctionName,DeleteFunctionName,MoreFunctionName,button visibility);
     //fillDataIntoTable02(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
     //fillDataIntoTable03(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
     //fillDataIntoTable04(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
     $(document).ready(function () {
          $("#PrivilageView").DataTable();
          $(".dataTables_length").addClass("bs-select");

          PrivilageView_filter.classList.add("mb-3", "pt-2");
          let searchInputDiv = PrivilageView_filter.children[0].children[0];
          searchInputDiv.classList.add("form-control");
     });
};

/* table related Function */

const roleFunction = (element) => {
     return element.role_id.name;
};
const moduleFunction = (element) => {
     return element.module_id.name;
};
const privilageFunction = (element) => {
     let privilageTr = document.createElement("div");
     let txtInnseItem = "";
     if (element.insert) {
          txtInnseItem +=
               '<div style="padding: 8px 0px; border-bottom: 1px solid rgb(114, 114, 105);">' +
               '<i class="fa-solid fa-square-check" style="color: #003df5;"></i>' +
               '<label style="padding: 0px 8px;">Insert</label></div>';
     } else {
          txtInnseItem +=
               '<div style="padding: 8px 0px; border-bottom: 1px solid rgb(114, 114, 105);">' +
               '<i class="fa-regular fa-square" style="color: #828282;"></i>' +
               '<label style="padding: 0px 8px;">Insert</label></div>';
     }
     if (element.delete) {
          txtInnseItem +=
               '<div style="padding: 8px 0px; border-bottom: 1px solid rgb(114, 114, 105);">' +
               '<i class="fa-solid fa-square-check" style="color: #003df5;"></i>' +
               '<label style="padding: 0px 8px;">Delete</label></div>';
     } else {
          txtInnseItem +=
               '<div style="padding: 8px 0px; border-bottom: 1px solid rgb(114, 114, 105);">' +
               '<i class="fa-regular fa-square" style="color: #828282;"></i>' +
               '<label style="padding: 0px 8px;">Delete</label></div>';
     }
     if (element.select) {
          txtInnseItem +=
               '<div style="padding: 8px 0px; border-bottom: 1px solid rgb(114, 114, 105);">' +
               '<i class="fa-solid fa-square-check" style="color: #003df5;"></i>' +
               '<label style="padding: 0px 8px;">Select</label></div>';
     } else {
          txtInnseItem +=
               '<div style="padding: 8px 0px; border-bottom: 1px solid rgb(114, 114, 105);">' +
               '<i class="fa-regular fa-square" style="color: #828282;"></i>' +
               '<label style="padding: 0px 8px;">Select</label></div>';
     }
     if (element.update) {
          txtInnseItem +=
               '<div style="padding: 8px 0px; border-bottom: 1px solid rgb(114, 114, 105);">' +
               '<i class="fa-solid fa-square-check" style="color: #003df5;"></i>' +
               '<label style="padding: 0px 8px;">Update</label></div>';
     } else {
          txtInnseItem +=
               '<div style="padding: 8px 0px; border-bottom: 1px solid rgb(114, 114, 105);">' +
               '<i class="fa-regular fa-square" style="color: #828282;"></i>' +
               '<label style="padding: 0px 8px;">Update</label></div>';
     }

     privilageTr.innerHTML = txtInnseItem;
     return privilageTr;
};

const EditfunctionName = (element, index) => {
     FormFill(element, valdationFeildList);
     $("#employeeForm").modal("show");
     window["oldEmployee"] = element;
};

const DeleteFunctionName = (element, index, tableBody) => {
     let deleteConform = window.confirm(
          "Are you sure ?\n" + "Employee number " + element.employeeid + "\nFull Name " + element.full_name + "\nNIC " + element.nic_number
     );
     if (deleteConform) {
          const deleteServerResponse = "OK";
          if (deleteServerResponse === "OK") {
               let deleteResponse = HTTPRequestService("DELETE", "http://localhost:8080/employees/" + element.id);
               if (199 < deleteResponse.status && deleteResponse.status < 300) {
                    tableBody.children[index].children[9].innerHTML = '<p class="text-danger "><i class="fa-solid fa-circle"></i> Delete</p>';
                    console.log(element.id);
                    window.alert("Delete Successfull...");
               } else {
                    window.alert("Delete not compleate error " + deleteResponse.message);
               }
          } else {
               window.alert("Delete not compleate error ");
          }
     }
};

const MoreFunctionName = (element, index) => {
     console.log(element, index);
};
// form submition function
ValidationButton.addEventListener('click', () => {
    /* have 4 parameters the 4th one is inputID the defalt value is set as feildID=null . if you need a validat specify input you should enter FeildID */
    //return true of false result of validation
    role_idValidationResult = getElementsByInputType('role_id');
    module_idValidationResult = getElementsByInputType('module_id');
    
    insertPrivilageValidationResult = insertCheck.checked;
    deletePrivilageValidationResult = deleteCheck.checked;
    selectPrivilageValidationResult = selectCheck.checked;
    updatePrivilageValidationResult = updateCheck.checked;

    privilege['insert'] = insertPrivilageValidationResult;
    privilege['delete'] = deletePrivilageValidationResult;
    privilege['select'] = selectPrivilageValidationResult;
    privilege['update'] = updatePrivilageValidationResult;
/*
    affer all thing are validate the this function is execure
    and return employee Object
 */
     if(!(insertPrivilageValidationResult || deletePrivilageValidationResult || selectPrivilageValidationResult || updatePrivilageValidationResult)) window.alert("Please add suitable privilages");

    if(role_idValidationResult && module_idValidationResult && (insertPrivilageValidationResult || deletePrivilageValidationResult || selectPrivilageValidationResult || updatePrivilageValidationResult)) {
        console.log(privilege);
        if(confirm("Do you Want set privlages for "+privilege.role_id.name+" ?")){
            let addedResponse = HTTPRequestService("POST",'http://localhost:8080/privilege',JSON.stringify(privilege));
            if(199<addedResponse.status && addedResponse.status<300)window.alert("Add Successfully"+addedResponse.status);
            else if(399<addedResponse.status && addedResponse.status<500) window.alert("Add Failure "+addedResponse.status);
            else window.alert("Add Failure ");
        }
    }
});

clearButton.addEventListener('click', () => {
     formClear();
})

// form Related Function

let RoleSelectecterCreate = (dataList) => {SelectecterCreate(dataList,roleSelector,"role_id")}
let ModuleSelectecterCreate = (dataList) => {SelectecterCreate(dataList,ModuleSelector,"module_id")}

// form closer
privilageFormClose.addEventListener('click', (e) => {
     if (confirm("Are you sure ?")){
         formCloser();
     }
});
let formCloser = () => {
     formClear();
     $('#privilageForm').modal('hide');
     refreshPrivilage(HTTPRequestService("GET", "http://localhost:8080/privilege"));
}

const SelectecterCreate = (dataList,elementID,nameRadio,checkedRadio=null) => {

     var roleSelectorDiv = elementID;
     roleSelectorDiv.innerHTML = "";

     let CreateRadioButton = (element,checkedStats) => {
          var input = document.createElement("input");
          input.type = "radio";
          input.className = "btn-check";
          input.name = nameRadio;
          input.value = JSON.stringify(element);
          input.id = element.name+"_Radio";
          input.autocomplete = "off";
          if (checkedStats) {input.checked = checked;}
     
          // Create the label element
          var label = document.createElement("label");
          label.className = ('btn btn-outline-secondary btn-lg');
          label.htmlFor = input.id;
          label.innerHTML = element.name;
     
          // Create a container div
          
          var div = document.createElement("div");
          
          // Append the input and label to the container div
          div.appendChild(input);
          div.appendChild(label);
          
          roleSelectorDiv.appendChild(div);
     }
     
     if (checkedRadio==null) {
          dataList.data.forEach(element => {
               CreateRadioButton(element,false);
          });
     } else {
          CreateRadioButton(dataList.data,true);
     }

};

let getElementsByInputType = (inputType) => {
     try{
          const selectedRole = document.querySelector('input[name="'+inputType+'"]:checked').value;
          console.log(selectedRole);
          if (selectedRole) {
               privilege[inputType] = JSON.parse(selectedRole);
               return true;
          }
     }catch(e){
          alert('Please selecte '+inputType);
          return false;
     }
}

let formClear = () => {
     let radioSelect = document.querySelector('input[name="role_id"]:checked');
     if (radioSelect) radioSelect.checked = false;
     radioSelect = document.querySelector('input[name="module_id"]:checked');
     if (radioSelect) radioSelect.checked = false;
     insertCheck.checked = false;
     deleteCheck.checked = false;
     selectCheck.checked = false;
     updateCheck.checked = false;
}
