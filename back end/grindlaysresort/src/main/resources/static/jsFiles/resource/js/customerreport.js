userPrivilage ={"select": true, "insert": false, "update": false, "delete": false};

window.addEventListener("load", () => {
    refreshCustomertable(HTTPRequestService("GET",'http://localhost:8080/customers'),userPrivilage);
    CustomerStatusDropDown(HTTPRequestService("GET",'http://localhost:8080/customerStatus'));
    CountryDropDown(HTTPRequestService("GET",'http://localhost:8080/country'));
    refreshCustomerCountryTable(HTTPRequestService("GET",'http://localhost:8080/report/customerreport/customercountryandcountlist'),userPrivilage);
    agerangechart();
    /*
    designationCount();
    esignationCount();
*/
});

refreshCustomertable = (dataList) => {

    //displaying data list for employee table
    const displayProperty = [
        { dataType: 'text', propertyName: "customernumber" },
        { dataType: 'text', propertyName: "full_name" },
        { dataType: 'function', propertyName: citizenshipFunction },
        { dataType: 'function', propertyName: customerAgeCalculate },
        { dataType: 'function', propertyName: customerstatusFunction },
    ];

    fillDataIntoTable(CustomerView, dataList, displayProperty, EditfunctionName, DeleteFunctionName, MoreFunctionName,deleteStatusFunction, true,userPrivilage);
    // fillDataIntoTable(tableod,datalist,editfunctionName,DeleteFunctionName,MoreFunctionName,button visibility);
    //fillDataIntoTable02(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
    //fillDataIntoTable03(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
    //fillDataIntoTable04(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
}

refreshCustomerCountryTable = (dataList) => {

    //displaying data list for employee table
    const displayProperty = [
        { dataType: 'text', propertyName: "country" },
        { dataType: 'text', propertyName: "count" }
    ];

    fillDataIntoTable(customerCountryReportView, dataList, displayProperty, EditfunctionName, DeleteFunctionName, MoreFunctionName,deleteStatusFunction, false,{"select": false, "insert": false, "update": false, "delete": false});
    // fillDataIntoTable(tableod,datalist,editfunctionName,DeleteFunctionName,MoreFunctionName,button visibility);
    //fillDataIntoTable02(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
    //fillDataIntoTable03(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
    //fillDataIntoTable04(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
}

const CustomerStatusDropDown = (StatusDataList) =>{
    dropDownCreate(StatusDataList,customerstatusFormSelect,'status');
}

const CountryDropDown = (StatusDataList) =>{
    dropDownCreate(StatusDataList,countryFormSelect,'countryName');
}
var minmaxagevalidation = (obj) => {

    obj = JSON.parse(obj);
    return 'min_age='+obj.min_age+'&max_age='+obj.max_age;
}

const valdationFeildList = [
    { id: 'citizenshipFormSelect', type: 'dropdown', validationStategy: 'selected'},
    { id: 'customerstatusFormSelect', type: 'dropdown', validationStategy: 'selected'},
    { id: 'countryFormSelect', type: 'dropdown', validationStategy: 'selected'},
    { id: 'ageFormSelect', type: 'dropdown', validationStategy: 'function'},
    { id: 'civilStatusFormSelect', type: 'dropdown', validationStategy: 'selected'}
];
const valigationStrategylist = {
    'ageFormSelect': {functions: minmaxagevalidation},
}

var domaiurl = 'http://localhost:8080/report/customerreport/customerlist?';

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
    refreshCustomertable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,valigationStrategylist)),userPrivilage);
});

customerstatusFormSelect.addEventListener('change',()=>{
    refreshCustomertable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,valigationStrategylist)),userPrivilage);
});

countryFormSelect.addEventListener('change',()=>{
    refreshCustomertable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,valigationStrategylist)),userPrivilage);
});

ageFormSelect.addEventListener('change',()=>{
    refreshCustomertable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,valigationStrategylist)),userPrivilage);
});

civilStatusFormSelect.addEventListener('change',()=>{
    refreshCustomertable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,valigationStrategylist)),userPrivilage);
});

const citizenshipFunction = (element) => {
    if (!element.citizenship) return ('<p class="text-warning">non-resident</p>')
    else return ('<p class="text-success">Resident</p>');
}
const customerAgeCalculate = (element) => {
    return calculateAge(element.date_of_birth);
}
const customerstatusFunction = (element) => {
    if (element.customerstatus_id.status === 'checking')
        return ('<p class="text-success"><i class="fa-solid fa-circle"></i> Checkin</p>');
    if (element.customerstatus_id.status === 'checkedout')
        return ('<p class="text-warning"><i class="fa-solid fa-circle"></i> Checked out</p>');
    if (element.customerstatus_id.status === 'inactive')
        return ('<p class="text-warning "><i class="fa-solid fa-circle"></i> Inactive</p>');
    if (element.customerstatus_id.status === 'delete')
        return ('<p class="text-danger "><i class="fa-solid fa-circle"></i> Delete</p>');
}
const EditfunctionName = (element, index) => {
    console.log(element);
}

const deleteStatusFunction = (element) => {
    return false;
}

const DeleteFunctionName = (element, index, tableBody) => {
    console.log();
}

const MoreFunctionName = (element, index) => {
    console.log(element, index);
}
agerangechart = () => {

    var dd = HTTPRequestService("GET",'http://localhost:8080/report/customerreport/agelist').data;

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

    var chart_lables = ["18-23", "23-28", "28-33", "33-38", "38-43", "43-48", "48-53", "53-58", "58-63", "63-68", "68-73", "73-78"];

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
    generatebarchart("customerAgeChart",chart_lables,chart_datalist,"Your X-Axis Label","Your y-Axis Label","this is the chart title",backgroundColors,borderColors);

}
//Heat Map Function


