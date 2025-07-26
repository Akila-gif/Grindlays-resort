var service = new Object();

userPrivilage = HTTPRequestService("GET",'http://localhost:8080/privilege/Service?user='+parent.window['logedUser']).data;
window.addEventListener("load", () => {
    ServiceFormPrivilageHandeling(userPrivilage);
    refreshServicetable(HTTPRequestService("GET",'http://localhost:8080/services'),userPrivilage);
    CategoryDropDownCreate(HTTPRequestService("GET",'http://localhost:8080/services/categories'));
    AvailabilityDropDownCreate(HTTPRequestService("GET",'http://localhost:8080/services/availability'));
});
refreshServicetable = (dataList) => {
    //displaying data list for employee table
    const displayProperty = [
        { dataType: 'text', propertyName: "name" },
        { dataType: 'text', propertyName: "peramount" },
        { dataType: 'function', propertyName: cagegoryFunction },
        { dataType: 'function', propertyName: serviceAvaliabilityFunction },
    ];
    fillDataIntoTable(EmployeeView, dataList, displayProperty, EditfunctionName, DeleteFunctionName, MoreFunctionName,deleteStatusFunction, true,userPrivilage);
    // fillDataIntoTable(tableod,datalist,editfunctionName,DeleteFunctionName,MoreFunctionName,button visibility);
    //fillDataIntoTable02(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
    //fillDataIntoTable03(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
    //fillDataIntoTable04(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
    $(document).ready(function () {
        $('#EmployeeView').DataTable();
        $('.dataTables_length').addClass('bs-select');

        EmployeeView_filter.classList.add('mb-3', 'pt-2');
        let searchInputDiv = EmployeeView_filter.children[0].children[0];
        searchInputDiv.classList.add('form-control');
    });
}
//form Privilage handeling
const ServiceFormPrivilageHandeling = (userPrivilage) =>{
    if(userPrivilage.insert){
        $("#formOpenButton").css("visibility","visible");
    }
}

// Shoud pass as parameters (datalist,Id,nameof the field that display as the innre html)
const CategoryDropDownCreate = (CategoriesDataList) =>{
    dropDownCreate(CategoriesDataList,serviceCategoryFormSelect,'category_name');
}

const AvailabilityDropDownCreate = (AvailabilityDataList) =>{
    dropDownCreate(AvailabilityDataList,serviceAvaliabilityFormSelect,'status');
}

/* table related Function */

const cagegoryFunction = (element) => {
    return element.servicecategory_id.category_name;
}

const serviceAvaliabilityFunction = (element) => {
    return element.serviceAvaliability_id.status;
}

const EditfunctionName = (element, index) => {
    $('#serviceForm').modal('show');
    console.log(    element);
    window['oldService'] = element;
    FormFill(element,valdationFeildList);
}

const deleteStatusFunction = (element) => {
    if (element.serviceAvaliability_id.status=="Available") return true;
    else return false;
}

const DeleteFunctionName = (element, index, tableBody) => {

    let deleteConform = window.confirm("Are you sure ?\n"
        + "Service name " + element.name
        + "\nFull Name " + element.full_name
        + "\nNIC " + element.nic_number
    );
    if (deleteConform) {
        const deleteServerResponse = 'OK';
        if (deleteServerResponse === 'OK') {
            let deleteResponse = HTTPRequestService("DELETE",'http://localhost:8080/services/'+element.id);
            if (199<deleteResponse.status && deleteResponse.status<300) {
                window.alert("Delete Successfull...");
                refreshServicetable(HTTPRequestService("GET",'http://localhost:8080/services'));
            } else {
                window.alert("Delete not compleate error "+deleteResponse.message);
            }
        } else {
            window.alert("Delete not compleate error ");
        }
    }
}

const MoreFunctionName = (element, index) => {
    console.log(element, index);
}

/* main form validation related Function */


ValidationButton.addEventListener('click', () => {
    /* have 4 parameters the 4th one is inputID the defalt value is set as feildID=null . if you need a validat specify input you should enter FeildID */
    //return true of false result of validation
    console.log(inputForm);
    validationResult = validationFunction(valdationFeildList, valdationDetailsListt, inputForm);

    /*
        affer all thing are validate the this function is execure
        and return employee Object
     */
    if(validationResult) {
        serviceObject = formObjectCreate(valdationFeildList,service);
        if(confirm("Do you Want to add "+serviceObject.name+"?")){
            let addedResponse = HTTPRequestService("POST",'http://localhost:8080/services',JSON.stringify(serviceObject));
            if(199<addedResponse.status && addedResponse.status<300)window.alert("Add Successfully"+addedResponse.status);
            else if(399<addedResponse.status && addedResponse.status<500) DynamicvalidationFunctioion(addedResponse.errorMessage,valdationFeildList,inputForm);
            else window.alert("Add Failure "+addedResponse.status);
        }
    }
});

UpdateButton.addEventListener('click',()=>{
    validationResult = validationFunction(valdationFeildList, valdationDetailsListt, inputForm);

    /*
        affer all thing are validate the this function is execure
        and return employee Object
     */
    if(validationResult) {
        ServiceObject = formObjectCreate(valdationFeildList,service);
        let changes = objectCompairFunction(window['oldService'],ServiceObject,valdationFeildList,comparisonStaregy);

        let empdtl ="\n";

        valdationFeildList.forEach(ele =>{
            var keyName = document.getElementById(ele.id).name;
            if (!(changes[keyName]===undefined)){
                empdtl+=keyName+" : "+ changes[keyName]+"\n";
            }
        });
        if(confirm("Do you Want update "+window['oldService'].firt_name+"?"+empdtl)){
            console.log(window['oldService']);
            serverResponseData = HTTPRequestService("PUT",'http://localhost:8080/services/'+window['oldService'].id,JSON.stringify(ServiceObject));
            if(199<serverResponseData.status && serverResponseData.status<300){
                formCloser();
                alertFunction("Update Successfully","More.......","success",displayUpdateServiceDetail(ServiceObject,changes));
            }else if(399<serverResponseData.status && serverResponseData.status<500) alertFunction("Update Successfully","More.......","error",displayUpdateEmpDetail(EmployeeObject,changes));
            else window.alert("Add Failure "+addedResponse.status);
        }else {
            formCloser();
            alertFunction("Discarded update","More.......","warning");
        }
    }

});
$("#formOpenButton").click(() => {
    serviceAvaliabilityFormSelect.selectedIndex = 1;
    serviceAvaliabilityFormSelect.disabled = true;
});

/* main form validation related Function */
ServiceCategoryFormSelectFunction = (compairValueObj) =>{return compairValueObj.name}

const comparisonStaregy = {
    'serviceCategoryFormSelect':{functions:ServiceCategoryFormSelectFunction}
};
let displayUpdateServiceDetail = (empObj,chan) => {
    console.log(empObj);
    console.log(chan);
}


/* Event Calling Functions */
serviceCategoryFormSelect.addEventListener('change',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm, serviceCategoryFormSelect);
});

NameTxt.addEventListener('keyup',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm, NameTxt);
});

priceTxt.addEventListener('keyup',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm, priceTxt);
});

serviceAvaliabilityFormSelect.addEventListener('change',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm, serviceAvaliabilityFormSelect);
});


/* validation functions for input feild */


/* main form validation data */
const valdationFeildList = [
    { id: 'serviceCategoryFormSelect', type: 'dropdown', validationStategy: 'selected', requird: true },
    { id: 'NameTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'priceTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'serviceAvaliabilityFormSelect', type: 'dropdown', validationStategy: 'selected', requird: true },
];

const valdationDetailsListt = {
    'NameTxt': { pattern: /^[A-Za-z]+(?: [A-Za-z]+)*$/},
    'priceTxt': { pattern: '^[1-9][0-9]*(\\.[0-9]{1,2})?$' },
};

const defaulTextError = {
    'serviceCategoryFormSelect': { pattern: "please select your designation!"},
    'NameTxt': {  pattern: "please enter valid full name!"},
    'priceTxt': { pattern: "please enter resident!"},
    'serviceAvaliabilityFormSelect': { pattern: "please enter resident!"},
};

//Modal close confermation
serviceFormClose.addEventListener('click', (e) => {
    if (confirm("Are you sure ?")){
        formCloser();
    }
});

const formCloser = ()=>{
    $('#serviceForm').modal('hide');
    formClear(valdationFeildList,inputForm,defaulTextError);
    inputForm.classList.remove('try-validated');
    refreshServicetable(HTTPRequestService("GET",'http://localhost:8080/services'));
}

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
