var employee = new Object();
var country = new Object();
window.addEventListener("load", () => {

    refreshEmployeetable(HTTPRequestService("GET",'http://localhost:8080/employees'));
    DesignationDropDownCreate(HTTPRequestService("GET",'http://localhost:8080/designations'));
    EmployeeStatusDropDown(HTTPRequestService("GET",'http://localhost:8080/empstatus'));

}); 

refreshEmployeetable = (dataList) => {

    //displaying data list for employee table
    const displayProperty = [
        { dataType: 'text', propertyName: "employeeid" },
        { dataType: 'text', propertyName: "full_name" },
        { dataType: 'function', propertyName: nicFunction },
        { dataType: 'function', propertyName: passportFunction },
        { dataType: 'function', propertyName: citizenshipFunction },
        { dataType: 'text', propertyName: "mobile" },
        { dataType: 'function', propertyName: employeeAgeCalculate },
        { dataType: 'function', propertyName: designationFunction },
        { dataType: 'function', propertyName: employeestatusFunction },
    ];

    fillDataIntoTable(EmployeeView, dataList, displayProperty, EditfunctionName, DeleteFunctionName, MoreFunctionName, true);
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

const DesignationDropDownCreate = (designation) =>{
    dropDownCreate(designation,designationFormSelect,'designation_name');
}
const EmployeeStatusDropDown = (StatusDataList) =>{
    dropDownCreate(StatusDataList,workingStatusFormSelect,'status');
}


/* table related Function */

const nicFunction = (element) => {
    if (element.nic==null) return ('<p class="text-warning">N/A</p>')
    else return (element.nic);
}
const citizenshipFunction = (element) => {
    if (!element.citizenship) return ('<p class="text-warning">non-resident</p>')
    else return ('<p class="text-success">Resident</p>');
}
const passportFunction = (element) => {
    if (element.passport==null) return ('<p class="text-warning">N/A</p>')
    else return (element.passport);
}
const employeeAgeCalculate = (element) => {
    return calculateAge(element.date_of_birth);
}
const employeestatusFunction = (element) => {
    if (element.workingstatus_id.status === 'Add')
        return ('<p class="text-success"><i class="fa-solid fa-circle"></i> Add</p>');
    if (element.workingstatus_id.status === 'Resign')
        return ('<p class="text-warning"><i class="fa-solid fa-circle"></i> Resign</p>');
    if (element.workingstatus_id.status === 'Remove')
        return ('<p class="text-danger "><i class="fa-solid fa-circle"></i> Delete</p>');
}
const designationFunction = (element)=>{
    return ('<p>' + element.designation_id.designation_name + '</p>');
}

const EditfunctionName = (element, index) => {
    FormFill(element,valdationFeildList);
    $('#employeeForm').modal('show');
    window['oldEmployee'] = element;
}

const DeleteFunctionName = (element, index, tableBody) => {

    let deleteConform = window.confirm("Are you sure ?\n"
        + "first Name " + element.firt_name
        + "\nFull Name " + element.full_name
        + "\nNIC " + element.nic_number
    );
    if (deleteConform) {
        const deleteServerResponse = 'OK';
        if (deleteServerResponse === 'OK') {
            tableBody.children[index].children[9].innerHTML = '<p class="text-danger "><i class="fa-solid fa-circle"></i> Delete</p>';
            console.log(element.idemployee);
            HTTPRequestService("DELETE",'http://localhost:8080/empoloyees/'+element.idemployee);
            window.alert("Delete Successfull...");
        } else {
            window.alert("Delete not compleate error : " + deleteServerResponse);
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
    validationResult = validationFunction(valdationFeildList, valdationDetailsListt, inputForm);

/*
    affer all thing are validate the this function is execure
    and return employee Object
 */
    if(validationResult) {
        EmployeeObject = formObjectCreate(valdationFeildList,employee);
        if(confirm("Do you Want to add "+EmployeeObject.full_name+"?")){
            let addedResponse = HTTPRequestService("POST",'http://localhost:8080/employees',JSON.stringify(EmployeeObject));
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
        EmployeeObject = formObjectCreate(valdationFeildList,employee);
        let changes = objectCompairFunction(window['oldEmployee'],EmployeeObject,valdationFeildList,comparisonStaregy);

        let empdtl ="\n";

        valdationFeildList.forEach(ele =>{
            var keyName = document.getElementById(ele.id).name;
            if (!(changes[keyName]===undefined)){
                empdtl+=keyName+" : "+ changes[keyName]+"\n";
            }
        });
        if(confirm("Do you Want update "+window['oldEmployee'].firt_name+"?"+empdtl)){
            HTTPRequestService("PUT",'http://localhost:8082/empoloyees/'+window['oldEmployee'].idemployee,JSON.stringify(EmployeeObject));
            formCloser();
            alertFunction("Update Successfully","More.......","success",displayUpdateEmpDetail(EmployeeObject,changes));
        }else {
            formCloser();
            alertFunction("Discarded update","More.......","warning");
        }
    }

});

TitleUpdateCompairFunction = (compairValueObj) =>{return compairValueObj.name}
statusUpdateCompairFunction = (compairValueObj) =>{return compairValueObj.name}
let displayUpdateEmpDetail = (empObj,chan) => {
    console.log(empObj);
    console.log(chan);
}

                                                            /* main form validation related Function */


countryAddButton.addEventListener('click', () => {
    /* have 4 parameters the 4th one is inputID the defalt value is set as feildID=null . if you need a validat specify input you should enter FeildID */
    //return true of false result of validation
    validationResult = validationFunction(countryValdationFeildList,countryValdationDetailsListt,countryInputForm);

/*
    affer all thing are validate the this function is execure
    and return employee Object
 */
    if(validationResult) {
        CountryObject = formObjectCreate(countryValdationFeildList,country);
        if(confirm("Do you Want to add "+CountryObject.countryName+"?")){
            let addedResponse = HTTPRequestService("POST",'http://localhost:8080/country',JSON.stringify(CountryObject));
            if(199<addedResponse.status && addedResponse.status<300){
                window.alert("Add Successfully");
                countryDtlTxt.value = CountryObject.countryCode;
                formSwitcher(CountryForm,employeeForm);
            }
            else if(399<addedResponse.status && addedResponse.status<500) DynamicvalidationFunctioion(addedResponse.errorMessage,valdationFeildList,inputForm);
            else window.alert("Add Failure "+addedResponse.status);
        }
    }
});

/* Event Calling Functions */
designationFormSelect.addEventListener('change',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm, designationFormSelect);
});

FullNameTxt.addEventListener('keyup',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm, FullNameTxt);
});

residentCheck.addEventListener('change',(event)=>{
    countryEnableFunction(event,countryDtlTxt);
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm, residentCheck);
});

countryDtlTxt.addEventListener('keyup',(event)=>{
    dataListMatchingCheck(event,addNewCountry)
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm, countryDtlTxt);
});

genderMaleRadioBtn.addEventListener('change',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm, genderMaleRadioBtn);
});

genderFemaleRadioBtn.addEventListener('change',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm, genderFemaleRadioBtn);
});

dateOfBirth.addEventListener('change',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm, dateOfBirth);
});

nicTxt.addEventListener('keyup',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm, nicTxt);
});

passportTxt.addEventListener('keyup',()=>{
    validationResult = validationFunction(valdationFeildList, valdationDetailsListt, inputForm, passportTxt);
});

mobileNumberTxt.addEventListener('keyup',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm, mobileNumberTxt);
});

emailTxt.addEventListener('keyup',()=>{
    validationResult = validationFunction(valdationFeildList, valdationDetailsListt, inputForm, emailTxt);
});

civilStatusFormSelect.addEventListener('change',()=>{
    validationResult = validationFunction(valdationFeildList, valdationDetailsListt, inputForm, civilStatusFormSelect);
});

workingStatusFormSelect.addEventListener('change',()=>{ 
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm, workingStatusFormSelect);
});

addressTxt.addEventListener('keyup',()=>{
    validationResult = validationFunction(valdationFeildList, valdationDetailsListt, inputForm, addressTxt);
});

noteTxt.addEventListener('keyup',()=>{
    validationResult = validationFunction(valdationFeildList, valdationDetailsListt, inputForm, noteTxt);
});

//country form event
countryNameTxt.addEventListener('keyup',()=>{
    validationResult = validationFunction(countryValdationFeildList, countryValdationDetailsListt, countryInputForm, countryNameTxt);
});

countryCodeTxt.addEventListener('keyup',()=>{
    validationResult = validationFunction(countryValdationFeildList, countryValdationDetailsListt, countryInputForm, countryCodeTxt);
});


/* validation functions for input feild */
const MoreFunctionNames = (pattern,required,inputFeild)=>{
    return true;    
};
const birthDayvalidation = (pattern,required,inputFeild)=>{
    return true;
}
/* main form validation data */
const valdationFeildList = [
    { id: 'designationFormSelect', type: 'dropdown', validationStategy: 'selected', requird: true },
    { id: 'FullNameTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'residentCheck', type: 'checkbox', validationStategy: 'function', requird: true },
    { id: 'countryDtlTxt', type: 'datalist', validationStategy: 'function', requird: false ,url:'http://localhost:8080/country/'},
    { id: 'genderMaleRadioBtn', type: 'radioButton', validationStategy: null, requird: true },
    { id: 'genderFemaleRadioBtn', type: 'radioButton', validationStategy: null, requird: true },
    { id: 'dateOfBirth', type: 'date', validationStategy: 'function', requird: true },
    { id: 'nicTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'passportTxt', type: 'text', validationStategy: 'function', requird: false },
    { id: 'mobileNumberTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'emailTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'civilStatusFormSelect', type: 'dropdown', validationStategy: 'selected', requird: true,static: true },
    { id: 'workingStatusFormSelect', type: 'dropdown', validationStategy: 'selected', requird: true },
    { id: 'dateOfRecruitment', type: 'date', validationStategy: 'function', requird: true },
    { id: 'epfNumberTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'etfNumberTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'addressTxt', type: 'text', validationStategy: 'nothing', requird: false },
    { id: 'noteTxt', type: 'text', validationStategy: 'nothing', requird: false },
];

const valdationDetailsListt = {
    'FullNameTxt': { pattern: /^[A-Za-z'-]+(?:\s+[A-Za-z'-]+)+$/ },
    'residentCheck': {  pattern: null ,functions: MoreFunctionNames },
    'countryDtlTxt': { pattern: '^[0][7][1,2,4,5,6,7,8][0-9]{7}$', functions: MoreFunctionNames },
    'dateOfBirth': { pattern: null, functions: birthDayvalidation },
    'nicTxt': { pattern: '^([0-9]{9}[x|X|v|V]|[0-9]{12})$', functions: MoreFunctionNames },
    'passportTxt': { pattern: '^(?!^0+$)[a-zA-Z0-9]{3,20}$', functions: MoreFunctionNames },
    'mobileNumberTxt': { pattern: '^[0][7][1,2,4,5,6,7,8][0-9]{7}$', functions: birthDayvalidation },
    'emailTxt': { pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, functions: birthDayvalidation },
    'dateOfRecruitment': { pattern: null, functions: birthDayvalidation },
    'epfNumberTxt': { pattern: '^([0-9]{9}[x|X|v|V]|[0-9]{12})$' },
    'etfNumberTxt': { pattern: '^([0-9]{9}[x|X|v|V]|[0-9]{12})$' },
};

const defaulTextError = {
    'designationFormSelect': { pattern: "please select your designation!"},
    'FullNameTxt': {  pattern: "please enter valid full name!"},
    'residentCheck': { pattern: "please enter resident!"},
    'countryDtlTxt': { pattern: "If you are not resident please select enter your country!"},
    'genderMaleRadioBtn': { pattern: "please select gender!"},
    'genderFemaleRadioBtn': { pattern: "please select gender!"},
    'dateOfBirth': { pattern: "please enter Date of Birth"},
    'nicTxt': { pattern: "please enter valid nic number!"},
    'passportTxt': { pattern: "please enter your Passport number!"},
    'mobileNumberTxt': { pattern: "please enter your mobile"},
    'emailTxt': { pattern: "please eneter your email!"},
    'civilStatusFormSelect': { pattern: "please select your civil status!"},
    'workingStatusFormSelect': { pattern: "please select your working states!"},
    'addressTxt': { pattern: "please Enter your Address!"},
    'noteTxt': { pattern: "please enter your note!"}
};

const comparisonStaregy = {
    'TitleFormSelect':{functions:TitleUpdateCompairFunction},
    'StatusFormSelect':{functions:statusUpdateCompairFunction}
};

// country form default error message
const countryFormdefaulTextError = {
    'countryNameTxt': { pattern: "plese eneter your Country"},
    'countryCodeTxt': {  pattern: "plese eneter your CountryCode"}
};


/* COuntry form validation data */
const countryValdationFeildList = [
    { id: 'countryNameTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'countryCodeTxt', type: 'text', validationStategy: 'regexp', requird: true }
];

const countryValdationDetailsListt = {
    'countryNameTxt': { pattern: '^[A-Z][A-z]{2,}$' },
    'countryCodeTxt': {  pattern: '^[+][0-9]{1,3}$' ,functions: MoreFunctionNames },
};

//Modal close confermation
employeeFormClose.addEventListener('click', (e) => {
    if (confirm("Are you sure ?")){
        formCloser();
    }
});

addNewCountry.addEventListener('click', (e) => {
    formSwitcher(employeeForm,CountryForm);
});

addNewCountry.addEventListener('click', (e) => {
    formSwitcher(employeeForm,CountryForm);
});

backtoPrimary.addEventListener('click', (e) => {
    //formClear(valdationFeildList);
    formSwitcher(CountryForm,employeeForm);
});
const formCloser = ()=>{
    $('#employeeForm').modal('hide');
    formClear(valdationFeildList,inputForm,defaulTextError);
    inputForm.classList.remove('try-validated');
    refreshEmployeetable(HTTPRequestService("GET",'http://localhost:8080/employees'));
}

const formSwitcher = (currentForm,TargetForm)=>{
    $(currentForm).modal('hide');
    $(TargetForm).modal('show');
}

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl)); 

const dataListMatchingCheck = (event,targetButton) =>{
    var inputText = event.target.value.toLowerCase();
    var datalistOptions = document.getElementById('countryDatalistOptions').getElementsByTagName('option');
    var matchFound = false;
    for (var i = 0; i < datalistOptions.length; i++) {
           var optionValue = datalistOptions[i].innerText;
        if (optionValue.toLowerCase().replace(/\s+/g,'').trim().includes(inputText.replace(/\s+/g,'').trim())) {
            matchFound = true;
            break;
        }
    }
    for (var i = 0; i < datalistOptions.length; i++) {
           var optionValue = datalistOptions[i].value;
        if (optionValue.toLowerCase().replace(/\s+/g,'').trim().includes(inputText.replace(/\s+/g,'').trim())) {
            matchFound = true;
            break;
        }
    }
    if (matchFound) {
        targetButton.classList.add('disabled');
    } else {
        targetButton.classList.remove('disabled');
    }
}
const countryEnableFunction = (event,targetElement)=>{
    if(event.target.checked){targetElement.disabled = true;targetElement.value = "+94"}
    else {targetElement.disabled = false;targetElement.value = null}
}