var ingredientsForm = new Object();

userPrivilage = HTTPRequestService("GET",'http://localhost:8080/privilege/Employee?user=admin').data;
window.addEventListener("load", () => {
    IngredientsFormFormPrivilageHandeling(userPrivilage);
    refreshIngredientsFormtable(HTTPRequestService("GET",'http://localhost:8080/ingredients'),userPrivilage);
    CategoryDropDownCreate(HTTPRequestService("GET",'http://localhost:8080/ingradientfoodcategory'));
});
refreshIngredientsFormtable = (dataList) => {

    console.log(dataList);
    //displaying data list for employee table
    const displayProperty = [
        { dataType: 'text', propertyName: "ingredientscode" },
        { dataType: 'text', propertyName: "name" },
        { dataType: 'text', propertyName: "price" },
        { dataType: 'text', propertyName: "count" },
        { dataType: 'function', propertyName: cagegoryFunction },
        { dataType: 'function', propertyName: ingredientsFormAvaliabilityStateFunction },
    ];
    fillDataIntoTable(ingredientsView, dataList, displayProperty, EditfunctionName, DeleteFunctionName, MoreFunctionName,deleteStatusFunction, true,userPrivilage);
    // fillDataIntoTable(tableod,datalist,editfunctionName,DeleteFunctionName,MoreFunctionName,button visibility);
    //fillDataIntoTable02(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
    //fillDataIntoTable03(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
    //fillDataIntoTable04(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
    $(document).ready(function () {
        $('#ingredientsView').DataTable();
        $('.dataTables_length').addClass('bs-select');

        ingredientsView_filter.classList.add('mb-3', 'pt-2');
        let searchInputDiv = ingredientsView_filter.children[0].children[0];
        searchInputDiv.classList.add('form-control');
    });
}
//form Privilage handeling
const IngredientsFormFormPrivilageHandeling = (userPrivilage) =>{
    if(userPrivilage.insert){
        $("#formOpenButton").css("visibility","visible");
    }
}

// Shoud pass as parameters (datalist,Id,nameof the field that display as the innre html)
const CategoryDropDownCreate = (CategoriesDataList) =>{
    dropDownCreate(CategoriesDataList,ingredientsCategoryFormSelect,'type');
}

const AvailabilityDropDownCreate = (AvailabilityDataList) =>{
    dropDownCreate(AvailabilityDataList,ingredientsFormAvaliabilityFormSelect,'status');
}

/* table related Function */

const cagegoryFunction = (element) => {
    return element.foodcategory_id.type;
}

const ingredientsFormAvaliabilityStateFunction = (element) => {
    return element.ingredientsstatus_id.quentityStatus;
}

const EditfunctionName = (element, index) => {
    $('#ingredientsFormForm').modal('show');
    console.log(    element);
    window['oldIngredientsForm'] = element;
    FormFill(element,valdationFeildList);
}

const deleteStatusFunction = (element) => {
/*    if (element.ingredientsFormAvaliability_id.status=="Available") return true;
    else return false;*/
    return true;
}

const DeleteFunctionName = (element, index, tableBody) => {

    let deleteConform = window.confirm("Are you sure ?\n"
        + "IngredientsForm name " + element.name
        + "\nFull Name " + element.full_name
        + "\nNIC " + element.nic_number
    );
    if (deleteConform) {
        const deleteServerResponse = 'OK';
        if (deleteServerResponse === 'OK') {
            let deleteResponse = HTTPRequestIngredientsForm("DELETE",'http://localhost:8080/ingredientsForms/'+element.id);
            if (199<deleteResponse.status && deleteResponse.status<300) {
                window.alert("Delete Successfull...");
                refreshIngredientsFormtable(HTTPRequestIngredientsForm("GET",'http://localhost:8080/ingredientsForms'));
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
        ingredientsFormObject = formObjectCreate(valdationFeildList,ingredientsForm);
        if(confirm("Do you Want to add "+ingredientsFormObject.name+"?")){
            let addedResponse = HTTPRequestIngredientsForm("POST",'http://localhost:8080/ingredientsForms',JSON.stringify(ingredientsFormObject));
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
        IngredientsFormObject = formObjectCreate(valdationFeildList,ingredientsForm);
        let changes = objectCompairFunction(window['oldIngredientsForm'],IngredientsFormObject,valdationFeildList,comparisonStaregy);

        let empdtl ="\n";

        valdationFeildList.forEach(ele =>{
            var keyName = document.getElementById(ele.id).name;
            if (!(changes[keyName]===undefined)){
                empdtl+=keyName+" : "+ changes[keyName]+"\n";
            }
        });
        if(confirm("Do you Want update "+window['oldIngredientsForm'].firt_name+"?"+empdtl)){
            console.log(window['oldIngredientsForm']);
            serverResponseData = HTTPRequestIngredientsForm("PUT",'http://localhost:8080/ingredientsForms/'+window['oldIngredientsForm'].id,JSON.stringify(IngredientsFormObject));
            if(199<serverResponseData.status && serverResponseData.status<300){
                formCloser();
                alertFunction("Update Successfully","More.......","success",displayUpdateIngredientsFormDetail(IngredientsFormObject,changes));
            }else if(399<serverResponseData.status && serverResponseData.status<500) alertFunction("Update Successfully","More.......","error",displayUpdateEmpDetail(EmployeeObject,changes));
            else window.alert("Add Failure "+addedResponse.status);
        }else {
            formCloser();
            alertFunction("Discarded update","More.......","warning");
        }
    }

});
$("#formOpenButton").click(() => {
    ingredientsCategoryFormSelect.selectedIndex = 1;
    ingredientsCategoryFormSelect.disabled = false;
});

/* main form validation related Function */
IngredientsFormCategoryFormSelectFunction = (compairValueObj) =>{return compairValueObj.name}

const comparisonStaregy = {
    'ingredientsFormCategoryFormSelect':{functions:IngredientsFormCategoryFormSelectFunction}
};
let displayUpdateIngredientsFormDetail = (empObj,chan) => {
    console.log(empObj);
    console.log(chan);
}


/* Event Calling Functions */
ingredientsCategoryFormSelect.addEventListener('change',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm, ingredientsCategoryFormSelect);
});

IngredientsNameTxt.addEventListener('keyup',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm, IngredientsNameTxt);
});

unitPriceTxt.addEventListener('keyup',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm, unitPriceTxt);
});

AvailableQuantityTxt.addEventListener('keyup',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm, AvailableQuantityTxt);
});


/* validation functions for input feild */


/* main form validation data */
const valdationFeildList = [
    { id: 'ingredientsCategoryFormSelect', type: 'dropdown', validationStategy: 'selected', requird: true },
    { id: 'IngredientsNameTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'unitPriceTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'AvailableQuantityTxt', type: 'text', validationStategy: 'nothing', requird: true },
];

const valdationDetailsListt = {
    'IngredientsNameTxt': { pattern: /^[A-Za-z]+(?: [A-Za-z]+)*$/},
    'unitPriceTxt': { pattern: '^[1-9][0-9]*(\\.[0-9]{1,2})?$' },
};

const defaulTextError = {
    'ingredientsCategoryFormSelect': { pattern: "please select your designation!"},
    'IngredientsNameTxt': {  pattern: "please enter valid full name!"},
    'unitPriceTxt': { pattern: "please enter resident!"},
    'AvailableQuantityTxt': { pattern: "please enter resident!"},
};

//Modal close confermation
ingredientsFormClose.addEventListener('click', (e) => {
    if (confirm("Are you sure ?")){
        formCloser();
    }
});

const formCloser = ()=>{
    $('#ingredientsForm').modal('hide');
    formClear(valdationFeildList,inputForm,defaulTextError);
    inputForm.classList.remove('try-validated');
    refreshIngredientsFormtable(HTTPRequestService("GET",'http://localhost:8080/ingredients'));
}

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
