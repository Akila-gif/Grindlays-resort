var employee = new Object();
window.addEventListener("load", () => {

    refreshEmployeetable(HTTPRequestService("GET",'http://localhost:8082/empstatus'));
    EmployeedropDownCreate(HTTPRequestService("GET",'http://localhost:8080/designations'));
    EmployeeStatusDropDown(HTTPRequestService("GET",'http://localhost:8080/empstatus'));

}); 

refreshEmployeetable = (dataList) => {

    const displayProperty = [
        { dataType: 'int', propertyName: "idemployee" },
        { dataType: 'text', propertyName: "firt_name" },
        { dataType: 'text', propertyName: "last_name" },
        { dataType: 'text', propertyName: "full_name" },
        { dataType: 'text', propertyName: "nic_number" },
        { dataType: 'text', propertyName: "mobile_number" },
        { dataType: 'text', propertyName: "lan_number" },
        { dataType: 'text', propertyName: "email" },
        { dataType: 'function', propertyName: designationFunction },
        { dataType: 'function', propertyName: employeestatusFunction },
    ];


    // fillDataIntoTable(tableod,datalist,editfunctionName,DeleteFunctionName,MoreFunctionName,button visibility);
    fillDataIntoTable(EmployeeView, dataList, displayProperty, EditfunctionName, DeleteFunctionName, MoreFunctionName, true);
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

const EmployeedropDownCreate = (designation) =>{
    dropDownCrete(designation,TitleFormSelect,'name');
}
const EmployeeStatusDropDown = (StatusDataList) =>{
    dropDownCrete(StatusDataList,StatusFormSelect,'name');
}


/* table related Function */
const employeestatusFunction = (element) => {
    if (element.workingstatus_id.status === 'Add')
        return ('<p class="text-success"><i class="fa-solid fa-circle"></i> Add</p>');
    if (element.workingstatus_id.status === 'Resign')
        return ('<p class="text-warning"><i class="fa-solid fa-circle"></i> Resign</p>');
    if (element.workingstatus_id.status === 'Delete')
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
            HTTPRequestService("DELETE",'http://localhost:8082/empoloyees/'+element.idemployee);
            window.alert("Delete Successfull...");
        } else {
            window.alert("Delete not compleate error : " + deleteServerResponse);
        }
    }
}

const MoreFunctionName = (element, index) => {
    console.log(element, index);
}

                                                            /* form validation related Function */


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
        lastEmpNumber = HTTPRequestService("GET",'http://localhost:8082/empoloyees/maxemono');
        EmployeeObject['emp_number'] = "0000"+JSON.stringify(lastEmpNumber+1);
        if(confirm("Do you Want add ?")){
            console.log(HTTPRequestService("POST",'http://localhost:8082/empoloyees',JSON.stringify(EmployeeObject)));
            window.alert("Add Successfully ");
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
        lastEmpNumber = HTTPRequestService("GET",'http://localhost:8082/empoloyees/maxemono');
        EmployeeObject['emp_number'] = "0000"+JSON.stringify(lastEmpNumber);
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


/* Event Calling Functions */
TitleFormSelect.addEventListener('change',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm,TitleFormSelect);
});

FirstNameTxt.addEventListener('keyup',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm,FirstNameTxt);
});

LastNameTxt.addEventListener('keyup',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm,LastNameTxt);
});

FullNameTxt.addEventListener('keyup',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm,FullNameTxt);
});

MobileTxt.addEventListener('keyup',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm,MobileTxt);
});

landphoneTxt.addEventListener('keyup',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm,landphoneTxt);
});

NicTxt.addEventListener('keyup',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm,NicTxt);
});

EmailTxt.addEventListener('keyup',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm,EmailTxt);
});

BirthdayDate.addEventListener('change',()=>{
    validationResult = validationFunction(valdationFeildList, valdationDetailsListt, inputForm,BirthdayDate);
});

UnivercityTxt.addEventListener('keyup',()=>{
    validationResult = validationFunction(valdationFeildList, valdationDetailsListt, inputForm,UnivercityTxt);
});

UnivercityEndDate.addEventListener('change',()=>{
    validationResult = validationFunction(valdationFeildList, valdationDetailsListt, inputForm,UnivercityEndDate);
});
StatusFormSelect.addEventListener('change',()=>{
    validationFunction(valdationFeildList, valdationDetailsListt, inputForm,StatusFormSelect);
});


/* validation functions for input feild */
const MoreFunctionNames = (pattern,required,inputFeild)=>{
    console.log(pattern,required,inputFeild);
};
const birthDayvalidation = (pattern,required,inputFeild)=>{
    return true;
}
/* form validation data */
const valdationFeildList = [
    { id: 'TitleFormSelect', type: 'dropdown', validationStategy: 'selected', requird: true ,objectId: ['iddesignation']},
    { id: 'FirstNameTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'LastNameTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'FullNameTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'MobileTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'landphoneTxt', type: 'text', validationStategy: 'regexp', requird: false },
    { id: 'NicTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'EmailTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'BirthdayDate', type: 'date', validationStategy: 'function', requird: true },
    { id: 'UnivercityTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'UnivercityEndDate', type: 'date', validationStategy: 'function', requird: true },
    { id: 'StatusFormSelect', type: 'dropdown', validationStategy: 'selected', requird: true },
];

const valdationDetailsListt = {
    'FirstNameTxt': { pattern: '^[A-Z][A-z]{2,}$' },
    'LastNameTxt': { pattern: '^[A-Z][A-z]{2,}$' },
    'FullNameTxt': { pattern: /^[A-Za-z'-]+(?:\s+[A-Za-z'-]+)+$/ },
    'MobileTxt': { pattern: '^[0][7][1,2,4,5,6,7,8][0-9]{7}$', functions: MoreFunctionNames },
    'landphoneTxt': { pattern: '^[0][1,2,3,4,5,6,7,8][1,2,4,5,6,7,8][0-9]{7}$', functions: MoreFunctionNames },
    'NicTxt': { pattern: '^([0-9]{9}[x|X|v|V]|[0-9]{12})$', functions: MoreFunctionNames },
    'EmailTxt': { pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, functions: birthDayvalidation },
    'BirthdayDate': { pattern: '^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$', functions: birthDayvalidation },
    'UnivercityTxt': { pattern: '^[A-Z][A-z]{2,}$', functions: birthDayvalidation },
    'UnivercityEndDate': { pattern: '^[A-Z][A-z]{2,}$', functions: birthDayvalidation }
};
const comparisonStaregy = {
    'TitleFormSelect':{functions:TitleUpdateCompairFunction},
    'StatusFormSelect':{functions:statusUpdateCompairFunction}
};


//Modal close confermation
employeeFormClose.addEventListener('click', (e) => {
    if (confirm("Are you sure ?")){
        formCloser();
    }
})

const formCloser = ()=>{
    $('#employeeForm').modal('hide');
    formClear(valdationFeildList);
    inputForm.classList.remove('try-validated')
    refreshEmployeetable(HTTPRequestService("GET",'http://localhost:8082/empoloyees'));
}