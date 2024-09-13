var urlObject = new Object();
userPrivilage ={"select": true, "insert": false, "update": false, "delete": false};

window.addEventListener("load", () => {
    refreshEmployeetable(HTTPRequestService("GET",'http://localhost:8080/employees'),userPrivilage);
    DesignationDropDownCreate(HTTPRequestService("GET",'http://localhost:8080/designations'));
    EmployeeStatusDropDown(HTTPRequestService("GET",'http://localhost:8080/empstatus'));
    EmployeeCategoryDropDown(HTTPRequestService("GET",'http://localhost:8080/categories'));
    agerangechart();
    designationCount();
    esignationCount();
});
refreshEmployeetable = (dataList) => {
    //displaying data list for employee table
    const displayProperty = [
        { dataType: 'text', propertyName: "employeeid" },
        { dataType: 'text', propertyName: "full_name" },
        { dataType: 'function', propertyName: citizenshipFunction },
        { dataType: 'text', propertyName: "mobile" },
        { dataType: 'function', propertyName: employeeAgeCalculate },
        { dataType: 'function', propertyName: designationFunction },
        { dataType: 'function', propertyName: employeestatusFunction },
    ];
    fillDataIntoTable(EmployeeView, dataList, displayProperty, EditfunctionName, DeleteFunctionName, MoreFunctionName,deleteStatusFunction, true,userPrivilage);
    // fillDataIntoTable(tableod,datalist,editfunctionName,DeleteFunctionName,MoreFunctionName,button visibility);
    //fillDataIntoTable02(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
    //fillDataIntoTable03(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
    //fillDataIntoTable04(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
/*    $(document).ready(function () {
        $('#EmployeeView').DataTable();
        $('.dataTables_length').addClass('bs-select');

        EmployeeView_filter.classList.add('mb-3', 'pt-2');
        let searchInputDiv = EmployeeView_filter.children[0].children[0];
        searchInputDiv.classList.add('form-control');
    });
*/
}

const citizenshipFunction = (element) => {
    if (!element.citizenship) return ('<p class="text-warning">non-resident</p>')
    else return ('<p class="text-success">Resident</p>');
}

const designationFunction = (element)=>{
    return ('<p>' + element.designation_id.designation_name + '</p>');
}
const employeestatusFunction = (element) => {
    if (element.workingstatus_id.status === 'Add')
        return ('<p class="text-success"><i class="fa-solid fa-circle"></i> Add</p>');
    if (element.workingstatus_id.status === 'Resign')
        return ('<p class="text-warning"><i class="fa-solid fa-circle"></i> Resign</p>');
    if (element.workingstatus_id.status === 'Remove')
        return ('<p class="text-danger "><i class="fa-solid fa-circle"></i> Delete</p>');
}
const employeeAgeCalculate = (element) => {
    return calculateAge(element.date_of_birth);
}

const EditfunctionName = (element, index) => {
    $('#employeeForm').modal('show');
    element.country_id = element.country_id.countryCode;
    console.log(    element);
    window['oldEmployee'] = element;
    FormFill(element,valdationFeildList);
}

const deleteStatusFunction = (element) => {
    if (element.workingstatus_id.status=="Add") return true;
    else return false;
}

const DeleteFunctionName = (element, index, tableBody) => {

    let deleteConform = window.confirm("Are you sure ?\n"
        + "Employee number " + element.employeeid
        + "\nFull Name " + element.full_name
        + "\nNIC " + element.nic_number
    );
    if (deleteConform) {
        const deleteServerResponse = 'OK';
        if (deleteServerResponse === 'OK') {
            let deleteResponse = HTTPRequestService("DELETE",'http://localhost:8080/employees/'+element.id);
            if (199<deleteResponse.status && deleteResponse.status<300) {
                window.alert("Delete Successfull...");
                refreshEmployeetable(HTTPRequestService("GET",'http://localhost:8080/employees'));
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
const DesignationDropDownCreate = (designation) =>{
    dropDownCreate(designation,designationFormSelect,'designation_name');
}
const EmployeeStatusDropDown = (StatusDataList) =>{
    dropDownCreate(StatusDataList,workingstatusFormSelect,'status');
}
const EmployeeCategoryDropDown = (CategoriesDataList) =>{
    dropDownCreate(CategoriesDataList,categoryFormSelect,'category_name');
}
var minmaxagevalidation = (obj) => {

    obj = JSON.parse(obj);
    console.log(obj);
    return 'min_age='+obj.min_age+'&max_age='+obj.max_age;
}

const valdationFeildList = [
    { id: 'citizenshipFormSelect', type: 'dropdown', validationStategy: 'selected'},
    { id: 'workingstatusFormSelect', type: 'dropdown', validationStategy: 'selected'},
    { id: 'designationFormSelect', type: 'dropdown', validationStategy: 'selected'},
    { id: 'categoryFormSelect', type: 'dropdown', validationStategy: 'selected'},
    { id: 'ageFormSelect', type: 'dropdown', validationStategy: 'function'},
    { id: 'civilStatusFormSelect', type: 'dropdown', validationStategy: 'selected'}
];
const valigationStrategylist = {
    'ageFormSelect': {functions: minmaxagevalidation},
}

var domaiurl = 'http://localhost:8080/report/employeereport/employeelist?';

var urlcreatefunction = (drl,FeildList,validatinStrategy) =>{
    var firststateadd = false;
    var domainurl = drl;
    FeildList.forEach(element => {
        var getelement = document.getElementById(element.id);
        var getvalueofelement = getelement.value;
        if (element.type === 'dropdown') {
            if (element.validationStategy === 'selected') {
                if (getvalueofelement != "") {
                    try {
                        if (typeof JSON.parse(getvalueofelement) === 'object') {
                            console.log(getvalueofelement);
                            firststateadd ? domainurl += '&' + getelement.name + '=' + JSON.parse(getvalueofelement).id : domainurl += getelement.name + '=' + JSON.parse(getvalueofelement).id;
                        } else {
                            console.log(getvalueofelement);
                            firststateadd ? domainurl += '&' + getelement.name + '=' + getvalueofelement : domainurl += getelement.name + '=' + getvalueofelement;
                        }
                    }catch (e){
                        firststateadd ? domainurl += '&' + getelement.name + '=' + getvalueofelement : domainurl += getelement.name + '=' + getvalueofelement;
                    }
                    firststateadd = true;
                }
            }else if (element.validationStategy === 'function'){
                if (getvalueofelement != "") {
                    firststateadd ? domainurl += '&' + validatinStrategy[element.id].functions(getvalueofelement) : domainurl += validatinStrategy[element.id].functions(getvalueofelement);
                    firststateadd = true;
                }
            }
        }
    });
    return domainurl;
}
citizenshipFormSelect.addEventListener('change',()=>{
    refreshEmployeetable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,valigationStrategylist)),userPrivilage);
    console.log(urlcreatefunction(domaiurl,valdationFeildList,valigationStrategylist));
});

workingstatusFormSelect.addEventListener('change',()=>{
    refreshEmployeetable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,valigationStrategylist)),userPrivilage);
    console.log(urlcreatefunction(domaiurl,valdationFeildList,valigationStrategylist));
});

designationFormSelect.addEventListener('change',()=>{
    refreshEmployeetable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,valigationStrategylist)),userPrivilage);
    console.log(urlcreatefunction(domaiurl,valdationFeildList,valigationStrategylist));
});

categoryFormSelect.addEventListener('change',()=>{
    refreshEmployeetable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,valigationStrategylist)),userPrivilage);
    console.log(urlcreatefunction(domaiurl,valdationFeildList,valigationStrategylist));
});

ageFormSelect.addEventListener('change',()=>{
    refreshEmployeetable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,valigationStrategylist)),userPrivilage);
    console.log(urlcreatefunction(domaiurl,valdationFeildList,valigationStrategylist));
});

civilStatusFormSelect.addEventListener('change',()=>{
    refreshEmployeetable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,valigationStrategylist)),userPrivilage);
    console.log(urlcreatefunction(domaiurl,valdationFeildList,valigationStrategylist));
});

agerangechart = () => {

    var dd = HTTPRequestService("GET",'http://localhost:8080/report/employeereport/agelist').data;

    var rone = 0;
    var rtow = 0;
    var rthree = 0;
    var rfour = 0;
    var rfive = 0;
    var rsix = 0;
    var rseven = 0;

    dd.forEach((element) => {
        if (element >= 18 && element < 23) rone++;
        if (element >= 23 && element < 28) rtow++;
        if (element >= 28 && element < 33) rthree++;
        if (element >= 33 && element < 38) rfour++;
        if (element >= 38 && element < 43) rfive++;
        if (element >= 43 && element < 48) rsix++;
        if (element >= 48 && element < 53) rseven++;
    });

    var chart_datalist = [rone, rtow, rthree, rfour, rfive, rsix, rseven];

    var chart_lables = ["18-23", "23-28", "28-33", "33-38", "38-43", "43-48", "48-53"];

    var backgroundColors = [
        "rgba(1, 120, 233, 0.79)",
        "rgba(1, 107, 205, 0.79)",
        "rgba(1, 97, 187, 0.79)",
        "rgba(1, 84, 161, 0.79)",
        "rgba(1, 71, 135, 0.79)",
        "rgba(1, 58, 110, 0.79)",
        "rgba(1, 49, 92, 0.79)"
    ]
    var borderColors = [
        "rgba(1, 120, 233, 0.79)",
        "rgba(1, 107, 205, 0.79)",
        "rgba(1, 97, 187, 0.79)",
        "rgba(1, 84, 161, 0.79)",
        "rgba(1, 71, 135, 0.79)",
        "rgba(1, 58, 110, 0.79)",
        "rgba(1, 49, 92, 0.79)"
    ]
    generatebarchart("agerangechartcanvas",chart_lables,chart_datalist,"Your X-Axis Label","Your y-Axis Label","this is the chart title",backgroundColors,borderColors);
}

designationCount  = () =>{
    var chart_datalist = HTTPRequestService("GET",'http://localhost:8080/report/employeereport/getemployeecount').data;
    var chart_lables = HTTPRequestService("GET",'http://localhost:8080/report/employeereport/getemployeeDesignationlist').data;
    var chartname = "Designation Count";
    var dataset_move_name =  "Employee category analysis";

    generatedoughnutchart("mydnChart",chart_datalist,chart_lables,chartname,dataset_move_name);
}

esignationCount  = () =>{

    var dd = HTTPRequestService("GET",'http://localhost:8080/report/employeereport/agelist').data;

    var rone = 0;
    var rtow = 0;
    var rthree = 0;
    var rfour = 0;
    var rfive = 0;
    var rsix = 0;
    var rseven = 0;

    dd.forEach((element) => {
        if (element >= 18 && element < 23) rone++;
        if (element >= 23 && element < 28) rtow++;
        if (element >= 28 && element < 33) rthree++;
        if (element >= 33 && element < 38) rfour++;
        if (element >= 38 && element < 43) rfive++;
        if (element >= 43 && element < 48) rsix++;
        if (element >= 48 && element < 53) rseven++;
    });

    var chart_datalist = [rone, rtow, rthree, rfour, rfive, rsix, rseven];

    var chart_lables = ["18-23", "23-28", "28-33", "33-38", "38-43", "43-48", "48-53"];

    var backgroundColors = [
        "rgba(1, 120, 233, 0.79)",
        "rgba(1, 107, 205, 0.79)",
        "rgba(1, 97, 187, 0.79)",
        "rgba(1, 84, 161, 0.79)",
        "rgba(1, 71, 135, 0.79)",
        "rgba(1, 58, 110, 0.79)",
        "rgba(1, 49, 92, 0.79)"
    ]
    var borderColors = [
        "rgba(1, 120, 233, 0.79)",
        "rgba(1, 107, 205, 0.79)",
        "rgba(1, 97, 187, 0.79)",
        "rgba(1, 84, 161, 0.79)",
        "rgba(1, 71, 135, 0.79)",
        "rgba(1, 58, 110, 0.79)",
        "rgba(1, 49, 92, 0.79)"
    ]
    generatelinechart("mylinehart",chart_lables,chart_datalist,"Your X-Axis Label","Your y-Axis Label","this is the chart title",false,backgroundColors,borderColors);

}