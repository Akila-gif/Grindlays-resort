var employee = new Object();
var user = new Object();
var EmployeeWithOutUserAccoutFoundStatus = false;
userPrivilage = HTTPRequestService("GET",'http://localhost:8080/privilege/User?user='+parent.window['logedUser']).data;
console.log(userPrivilage);
window.addEventListener("load", () => {
    if(!userPrivilage.insert){
        formOpenButton.style.visibility = "hidden";
    }
    refreshUserTable(HTTPRequestService("GET",'http://localhost:8080/user/withoutpassword'),userPrivilage);
    NoUserAccountEmployeedropDownCreate(HTTPRequestService("GET",'http://localhost:8080/employees/getemployeewithoutaccount'));
    RoleTransferObject(HTTPRequestService("GET",'http://localhost:8080/roles'));
});

refreshUserTable = (dataList) => {
    const displayProperty = [
        { dataType: 'function', propertyName: empIdFunction },
        { dataType: 'function', propertyName: fullNameFunction },
        { dataType: 'text', propertyName: "username" },
        { dataType: 'function', propertyName: userStatusDefineFunction },
        { dataType: 'function', propertyName: roleFunction },
        { dataType: 'text', propertyName: "addeddate" },
    ];
    // fillDataIntoTable(tableod,datalist,editfunctionName,DeleteFunctionName,MoreFunctionName,button visibility);
    fillDataIntoTable(UserView, dataList, displayProperty, EditfunctionName, DeleteFunctionName, MoreFunctionName,deleteStatusFunction, true,userPrivilage);
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

const NoUserAccountEmployeedropDownCreate = (employeelist) =>{
    dataListCreate(employeelist,userDatalistOptions,'full_name','employeeid');
}

const RoleTransferObject = (roleList) =>{
    //roleTranferListDefine(dataList,checkedRole,uncleckedRole);
    roleTranferListDefine(roleList,null,roleUncheckedList);
}
// list transfer controller

$("body").on("click", "li", function () {
    $(this).toggleClass("selected");
});
$("#move_left").click(function () {
    $(".list1").append($(".list2 .selected").removeClass("selected"));
});
$("#move_right").click(function () {
    $(".list2").prepend($(".list1 .selected").removeClass("selected"));
});

//Modal close confermation
userFormClose.addEventListener('click', (e) => {
    if (confirm("Are you sure ?")){
        formCloser();
    }
});
const formCloser = ()=>{
    $('#userForm').modal('hide');
    //formClear(valdationFeildList,inputForm,defaulTextError);
    inputForm.classList.remove('try-validated');
    console.log("Confirmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
    refreshUserTable(HTTPRequestService("GET",'http://localhost:8080/user/withoutpassword'));
}


/* table related Function */

const EditfunctionName = (element, index) => {
    console.log(element, index);
}

const DeleteFunctionName = (element, index, tableBody) => {
    console.log(element);
    let deleteConform = window.confirm("Are you sure ?\n"
        + "user name " + element.username
        + "\nFull Name " + element.employee_id.full_name
        + "\nEmployee Number " + element.employee_id.employeeid
    );
    if (deleteConform) {
        const deleteServerResponse = 'OK';
        if (deleteServerResponse === 'OK') {
            let deleteResponse = HTTPRequestService("DELETE",'http://localhost:8080/user?id='+element.id);
            if (199<deleteResponse.status && deleteResponse.status<300) {
                tableBody.children[index].children[4].innerHTML = '<p class="text-danger "><i class="fa-solid fa-circle"></i> Delete</p>';
                console.log(element.id);
                window.alert("Delete Successfull...");
            } else {
                window.alert("Delete not compleate error "+deleteResponse.message);
            }
        } else {
            window.alert("Delete not compleate error ");
        }
    }
}
const deleteStatusFunction = (element) => {
    return element.status;
}
const MoreFunctionName = (element, index) => {
    console.log(element, index);
}

const empIdFunction = (element, index) =>   {
    return ('<p>'+element.employee_id.employeeid+'</p>')
};

const fullNameFunction = (element, index) =>   {
    return ('<p>'+element.employee_id.full_name+'</p>')
};

const userStatusDefineFunction = (element) => {
    if (element.status)
        return ('<p class="text-success"><i class="fa-solid fa-circle"></i> Add</p>');
    else
        return ('<p class="text-danger"><i class="fa-solid fa-circle"></i> Delete</p>');
}

const roleFunction = (element, index) => {
    let divEle = document.createElement('div');
    divEle.setAttribute("style", "height: 75px; overflow-y: scroll;");
    element.roleList.forEach(role => {
        let liRoleElement = document.createElement('li');
        liRoleElement.innerHTML = role.name;
        divEle.appendChild(liRoleElement);
    });
    return (divEle)
};


/* form validation related Function */

ValidationButton.addEventListener('click', () => {
    /* have 4 parameters the 4th one is inputID the defalt value is set as feildID=null . if you need a validat specify input you should enter FeildID */
    //return true of false result of validation

    validationResult = validationFunction(valdationFeildList, valdationDetailsList, inputForm);

    /*
        affer all thing are validate the this function is execure
        and return employee Object
     */
    if(validationResult) {
        UserObject = formObjectCreate(valdationFeildList,user);
        UserObject.employee_id = employee;
        let roleList = new Array();
        Array.from(rolecheckedList.children).forEach((liChildElement) => {
            //console.log(liChildElement);
            //console.log(HTTPRequestService("GET",'http://localhost:8080/roles/findroleusingid?id='+liChildElement.value).data);
            roleList.push(HTTPRequestService("GET",'http://localhost:8080/roles/findroleusingid?id='+liChildElement.value).data)
        });
        UserObject['roleList'] = roleList;
        if(confirm("Do you Want to add "+UserObject.username+"?")){
            let addedResponse = HTTPRequestService("POST",'http://localhost:8080/user',JSON.stringify(UserObject));
            if(199<addedResponse.status && addedResponse.status<300)window.alert("Add Successfully"+addedResponse.status);
            else if(399<addedResponse.status && addedResponse.status<500) DynamicvalidationFunctioion(addedResponse.errorMessage,valdationFeildList,inputForm);
            else window.alert("Add Failure "+addedResponse.status);
        }
        //EmployeeObject = formObjectCreate(valdationFeildList,employee);
    }
});


/* Event Calling Functions */

userDtlTxt.addEventListener('keyup',(event)=>{
    dataListMatchingCheck(event,addNewEmployee);

    // below function eka user karala thiyenne hari create employee respose eka awama eka name eka aragena set karanna 
    let responseEmployeeById = HTTPRequestService("GET",'http://localhost:8080/employees/getemployeebyemployeeid?id='+userDtlTxt.value);
    if (responseEmployeeById.status===200) {
        nameParaTxt.style.display = 'block';
        nameParaTxt.innerHTML = responseEmployeeById.data.full_name;
        employee = responseEmployeeById.data;
        EmployeeWithOutUserAccoutFoundStatus = true;
        validationFunction(valdationFeildList, valdationDetailsList, inputForm,userDtlTxt);

    } else {
        nameParaTxt.style.display = 'none';
        nameParaTxt.innerHTML = "";
        EmployeeWithOutUserAccoutFoundStatus = false;
        validationFunction(valdationFeildList, valdationDetailsList, inputForm,userDtlTxt);
    }
});
usernameTxt.addEventListener('keyup', ()=>{
    validationFunction(valdationFeildList, valdationDetailsList, inputForm,usernameTxt);
});

PasswordPwd.addEventListener('keyup', ()=>{
    validationFunction(valdationFeildList, valdationDetailsList, inputForm,PasswordPwd);
    validationFunction(valdationFeildList, valdationDetailsList, inputForm,RePasswordPwd);
});

RePasswordPwd.addEventListener('keyup', ()=>{
    validationFunction(valdationFeildList, valdationDetailsList, inputForm,RePasswordPwd);
});

employeeStatusSelect.addEventListener('change', ()=>{
    validationFunction(valdationFeildList, valdationDetailsList, inputForm,employeeStatusSelect);
});


/* validation functions for input feild */
const employeeSelectionsFunction = (pattern,required,inputFeild)=>{
    return EmployeeWithOutUserAccoutFoundStatus;
};

const PasswordFunctionNames = (pattern,required,inputFeild)=>{
    regObject = new RegExp(pattern);
    PasswordValidation = inputFeild.value != "" && regObject.test(inputFeild.value);
    return PasswordValidation;
}
let PasswordValidation = false;

const RepasswordFunctionNames = (pattern,required,inputFeild)=>{
    return PasswordPwd.value==inputFeild.value && inputFeild.value != "" && PasswordValidation;
}


/* form validation data */
const valdationFeildList = [
    { id: 'userDtlTxt', type: 'datalist', validationStategy: 'function', requird: true },
    { id: 'usernameTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'PasswordPwd', type: 'text', validationStategy: 'function', requird: true },
    { id: 'RePasswordPwd', type: 'text', validationStategy: 'function', requird: true },
    { id: 'employeeStatusSelect', type: 'dropdown', validationStategy: 'selected', requird: true,static: true },
    { id: 'noteTxt', type: 'text', validationStategy: 'nothing', requird: false},
];

const valdationDetailsList = {
    'userDtlTxt': { pattern: '^[A-Z][A-z]{2,}$', functions: employeeSelectionsFunction},
    'usernameTxt': { pattern: '^[A-Z][A-z]{2,}$' },
    'PasswordPwd': { pattern: '^.{3,}$',functions: PasswordFunctionNames },
    'RePasswordPwd': { pattern: /^.{3,}$/,functions: RepasswordFunctionNames },
};

const dataListMatchingCheck = (event,targetButton) =>{
    var inputText = event.target.value.toLowerCase();
    var datalistOptions = document.getElementById('userDatalistOptions').getElementsByTagName('option');
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