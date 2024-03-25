var employee = new Object();
window.addEventListener("load", () => {

    refreshEmployeetable(HTTPRequestService("GET",'http://localhost:8080/empoloyees/userwithoutaccout'));
    EmployeedropDownCreate(HTTPRequestService("GET",'http://localhost:8080/empoloyees/userwithoutaccout'));
    EmployeeStatusDropDown(HTTPRequestService("GET",'http://localhost:8080/empstatus'));

});

refreshEmployeetable = (dataList) => {

    const displayProperty = [
        { dataType: 'int', propertyName: "firt_name" },
        { dataType: 'text', propertyName: "last_name" },
        { dataType: 'text', propertyName: "password" },
        { dataType: 'text', propertyName: "email" },
        { dataType: 'text', propertyName: statusDefineFunction },
        { dataType: 'text', propertyName: "addeddatetime" },
        { dataType: 'text', propertyName: "photopath" },
    ];


    // fillDataIntoTable(tableod,datalist,editfunctionName,DeleteFunctionName,MoreFunctionName,button visibility);
    fillDataIntoTable(UserView, dataList, displayProperty, EditfunctionName, DeleteFunctionName, MoreFunctionName, true);
    //fillDataIntoTable02(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
    //fillDataIntoTable03(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
    //fillDataIntoTable04(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
    $(document).ready(function () {
        $('#UserView').DataTable();
        $('.dataTables_length').addClass('bs-select');

        UserView_filter.classList.add('mb-3', 'pt-2');
        let searchInputDiv =UserView_filter.children[0].children[0];
        searchInputDiv.classList.add('form-control');
    });
}

const EmployeedropDownCreate = (employeelist) =>{
    dropDownCrete(employeelist,EmployeeTitleSelect,'firt_name');
}
const EmployeeStatusDropDown = (StatusDataList) =>{
    dropDownCrete(StatusDataList,StatusFormSelect,'name');
}


/* table related Function */
const employeestatusFunction = (element) => {
    if (element.employeestatus_id.name === 'Add')
        return ('<p class="text-success"><i class="fa-solid fa-circle"></i> Add</p>');
    if (element.employeestatus_id.name === 'Resign')
        return ('<p class="text-warning"><i class="fa-solid fa-circle"></i> Resign</p>');
    if (element.employeestatus_id.name === 'Delete')
        return ('<p class="text-danger "><i class="fa-solid fa-circle"></i> Delete</p>');
}
const statusDefineFunction = (element)=>{
    return ('<p><i className="fa-solid fa-circle"></i>' + statusDefineFunction.status + '</p>');
}

const EditfunctionName = (element, index) => {
    console.log(element, index);
}

const DeleteFunctionName = (element, index, tableBody) => {
    console.log(element);
    let deleteConform = window.confirm("Are you sure ?\n"
        + "first Name " + element.firt_name
        + "\nFull Name " + element.full_name
        + "\nNIC " + element.nic_number
    );
    if (deleteConform) {
        const deleteServerResponse = 'OK';
        if (deleteServerResponse === 'OK') {
            tableBody.children[index].children[9].innerHTML = '<p class="text-danger "><i class="fa-solid fa-circle"></i> Delete</p>';
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
        console.log(HTTPRequestService("POST",'http://localhost:8082/empoloyees',JSON.stringify(EmployeeObject)));
        window.alert("Add Successfully ")
    }
});

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
const RepasswordFunctionNames = (pattern,required,inputFeild)=>{
    return true;
}


/* form validation data */
const valdationFeildList = [
    { id: 'EmployeeTitleSelect', type: 'dropdown', validationStategy: 'selected', requird: true },
    { id: 'UsernNameTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'PasswordPwd', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'RePasswordPwd', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'RoleSelect', type: 'dropdown', validationStategy: 'regexp', requird: true },
    { id: 'ActivityCheckTxtError', type: 'checkbox', validationStategy: 'regexp', requird: false },
];

const valdationDetailsListt = {
    'UsernNameTxt': { pattern: '^[A-Z][A-z]{2,}$' },
    'PasswordPwd': { pattern: '^[A-Z][A-z]{2,}$' },
    'RePasswordPwd': { pattern: /^[A-Za-z'-]+(?:\s+[A-Za-z'-]+)+$/,functions: RepasswordFunctionNames },
    'MobileTxt': { pattern: '^[0][7][1,2,4,5,6,7,8][0-9]{7}$', functions: MoreFunctionNames },
    'landphoneTxt': { pattern: '^[0][1,2,3,4,5,6,7,8][1,2,4,5,6,7,8][0-9]{7}$', functions: MoreFunctionNames },
    'NicTxt': { pattern: '^([0-9]{9}[x|X|v|V]|[0-9]{12})$', functions: MoreFunctionNames },
    'EmailTxt': { pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, functions: birthDayvalidation },
    'BirthdayDate': { pattern: '^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$', functions: birthDayvalidation },
    'UnivercityTxt': { pattern: '^[A-Z][A-z]{2,}$', functions: birthDayvalidation },
    'UnivercityEndDate': { pattern: '^[A-Z][A-z]{2,}$', functions: birthDayvalidation }
};