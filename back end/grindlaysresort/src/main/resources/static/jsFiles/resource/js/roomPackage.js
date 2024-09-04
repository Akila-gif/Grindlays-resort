var serviceDetails = [];
let totalPriceTxt = 0;
var serviceDetailsObject = new Object();
var roomPackage = new Object();
userPrivilage = HTTPRequestService("GET",'http://localhost:8080/privilege/Employee?user=admin').data;
servicedetailsPrivilage = {select: false, insert: false, update: false, delete: true};
window.addEventListener("load", () => {
    addingFormPrivilageHandeling(userPrivilage);
    refreshPackageTable(HTTPRequestService("GET",'http://localhost:8080/roompackages'),userPrivilage);
    crateAccordion(roomService,"roomServiceAccordion",HTTPRequestService("GET",'http://localhost:8080/services/categories').data,accordionBodyDataListfunction,serviceInnerDataListfunction);

    //refreshInnerBedDetailsTable(bedDetailsObject,roomdetailsPrivilage);
    //refreshInnerFeaturesDetailsTable(featuresDetailsObject,roomdetailsPrivilage);

});

const refreshPackageTable = (dataList) => {
    //displaying data list for employee table
    const displayProperty = [
        { dataType: 'text', propertyName: "packagename" },
        { dataType: 'text', propertyName: "price" },
        { dataType: 'function', propertyName: packagestatesFunction},
    ];

    // deleteStatusFunction - this parameter use for define delete button visibility in the table (if the delete status is true then the delete button will be visibility)
    fillDataIntoTable(RoomView, dataList, displayProperty, EditfunctionName, DeleteFunctionName, MoreFunctionName,deleteStatusFunction, true,userPrivilage);
    $(document).ready(function () {
        $('#RoomView').DataTable();
        $('.dataTables_length').addClass('bs-select');

        RoomView_filter.classList.add('mb-3', 'pt-2');
        let searchInputDiv = RoomView_filter.children[0].children[0];
        searchInputDiv.classList.add('form-control');
    });
}

//Main table function
// Main Table Edit Function
const EditfunctionName = (element, index) => {
    $('#roomPackageForm').modal('show');
    window['oldPackage'] = element;
    serviceDetailsObject.data = element.serviceList;
    console.log(element);
    serviceDetails = serviceDetailsObject.data;
    refreshInnerServiceDetailsTable(serviceDetailsObject,servicedetailsPrivilage);
    FormFill(element,valdationFeildList);
}

//Main Thable Delete Function
const DeleteFunctionName = (element, index, tableBody) => {

    let deleteConform = window.confirm("Are you sure ?\n"
        + "\nPackage Name " + element.packagename
    );
    if (deleteConform) {
        const deleteServerResponse = 'OK';
        if (deleteServerResponse === 'OK') {
            let deleteResponse = HTTPRequestService("DELETE",'http://localhost:8080/roompackages/'+element.id);
            if (199<deleteResponse.status && deleteResponse.status<300) {
                window.alert("Delete Successfull...");
                refreshPackageTable(HTTPRequestService("GET",'http://localhost:8080/roompackages'));
            } else {
                window.alert("Delete not compleate error "+deleteResponse.message);
            }
        } else {
            window.alert("Delete not compleate error ");
        }
    }
}

//Main Table More Function
const MoreFunctionName = (element, index) => {
    console.log(element, index);
    moreReviewTable(moreViewTableBody,viewDisplayProperty,element);
    $('#RoomDetails').modal('show');
}

// this function use for define delete button visibility in the table (if the delete status is true then the delete button will be visibility)
const deleteStatusFunction = (element) => {
    return element.status;
}
//table function
// table table status selection function
const packagestatesFunction = (element) => {
    if (element.status) return ('<p class="text-success"><i class="fa-solid fa-circle"></i> Avalilable</p>');
    else return ('<p class="text-danger "><i class="fa-solid fa-circle"></i> Unavailable</p>');
}

//innertable Function
refreshInnerServiceDetailsTable = (dataList) => {
    //displaying data list for employee table
    const serviceinnerdisplayProperty = [
        { dataType: 'text', propertyName: "name" },
        { dataType: 'text', propertyName: "peramount" },
    ];

    dataList.data.length === 0 ? SelectedServiceView.style.visibility = "hidden" : SelectedServiceView.style.visibility = "visible";
    // deleteStatusFunction - this parameter use for define delete button visibility in the table (if the delete status is true then the delete button will be visibility)
    fillDataIntoTable(SelectedServiceView, dataList, serviceinnerdisplayProperty, innerServiceFormEditfunctionName,innerServiceFormDeleteFunction, innerServiceFormMoreFunctionName, innerServiceFormdeleteStatusFunction ,true,servicedetailsPrivilage);
    $(document).ready(function () {
        $('#SelectedServiceView').DataTable();
        $('.dataTables_length').addClass('bs-select');

        SelectedServiceView_filter.classList.add('mb-3', 'pt-2');
        let searchInputDiv = SelectedServiceView_filter.children[0].children[0];
        searchInputDiv.classList.add('form-control');
    });
    totalPriceTxt = 0;
    dataList.data.forEach((servicedtls)=>{
        totalPriceTxt+=servicedtls.peramount;
    })
    totalPriceCount.innerHTML = totalPriceTxt;
}
//inner room Function
const innerServiceFormEditfunctionName = (element, index) => {
    console.log("innerform Edit Funtion");
}

// bed inner table Delete function for the inner table
const innerServiceFormDeleteFunction = (element, index, tableBody) => {
    serviceDetails.splice(index, 1);
    serviceDetailsObject.data = serviceDetails;
    refreshInnerServiceDetailsTable(serviceDetailsObject,servicedetailsPrivilage);
}

// bed inner table More function for the inner table
const innerServiceFormMoreFunctionName = (element, index) => {
    console.log("innerform More Funtion");
}

// this function use for define delete button visibility in the table (if the delete status is true then the delete button will be visibility)
const innerServiceFormdeleteStatusFunction = (element) => {
    return true;
}

// employee form privilage handeling for adding new Room
const addingFormPrivilageHandeling = (userPrivilage) =>{
    if(userPrivilage.insert){
        $("#formOpenButton").css("visibility","visible");
    }
}

packageNameTxt.addEventListener('keyup',()=>{
    validationFunction(valdationFeildList, valdationDetailsList, inputForm, packageNameTxt);
});

packageAvailabilityTypeFormSelect.addEventListener('change',()=>{
    validationFunction(valdationFeildList, valdationDetailsList, inputForm, packageAvailabilityTypeFormSelect);
});

packagePriceTxt.addEventListener('keyup',()=>{
    validationFunction(valdationFeildList, valdationDetailsList, inputForm, packagePriceTxt);
});

ValidationButton.addEventListener('click', () => {
    /* have 4 parameters the 4th one is inputID the defalt value is set as feildID=null . if you need a validat specify input you should enter FeildID */
    //return true of false result of validation
    validationResult = validationFunction(valdationFeildList, valdationDetailsList, inputForm);
    if (validationResult) {
        if (serviceDetails.length == 0){
            alertFunction("Service details not added","Do You want to add ? <br><p type=\"button\" class=\"btn btn-outline-dark btn-sm mt-2\">click me</p>","warning",()=>{
                if (confirm("Are you sure?")) {
                    formDataAddingFunction();
                }
            },"50000");
        }else {
            if (confirm("Do you Want to add?")) {
                formDataAddingFunction();
            }
        }
    }

    /*
        affer all thing are validate the this function is execure
        and return employee Object
    */
});

UpdateButton.addEventListener('click', () => {
    /* have 4 parameters the 4th one is inputID the defalt value is set as feildID=null . if you need a validat specify input you should enter FeildID */
    //return true of false result of validation
    validationResult = validationFunction(valdationFeildList, valdationDetailsList, inputForm);
    if (validationResult) {
        if (serviceDetails.length == 0){
            alertFunction("Service details not added","Do You want to add ? <br><p type=\"button\" class=\"btn btn-outline-dark btn-sm mt-2\">click me</p>","warning",()=>{
                if (confirm("Are you sure?")) {
                    formDataUpdateFunction();
                }
            },"50000");
        }else {
            if (confirm("Do you Want to add?")) {
                formDataUpdateFunction();
            }
        }
    }

    /*
        affer all thing are validate the this function is execure
        and return employee Object
    */
});

packageFormClose.addEventListener('click',(event)=>{
    if (confirm("Are you sure ?")){
        formCloser();
    }
});

const formDataAddingFunction = () =>{

    roomPackage.serviceList = serviceDetails;
    let packageObject = formObjectCreate(valdationFeildList, roomPackage);
    console.log(packageObject);
    console.log(JSON.stringify(packageObject));
    let addedResponse = HTTPRequestService("POST", 'http://localhost:8080/roompackages', JSON.stringify(packageObject));
    if (199 < addedResponse.status && addedResponse.status < 300) {
        window.alert("Add Successfully" + addedResponse.status);
        refreshPackageTable(HTTPRequestService("GET", 'http://localhost:8080/roompackages'));
        alertFunction("Add Successfully","Room Adding is successfully","success");
        formCloser();
    } else if (399 < addedResponse.status && addedResponse.status < 500) {
        DynamicvalidationFunctioion(addedResponse.errorMessage, valdationFeildList, inputForm);
    } else window.alert("Add Failure " + addedResponse.status);
}


const formDataUpdateFunction = () =>{

    roomPackage.serviceList = serviceDetails;
    let packageObject = formObjectCreate(valdationFeildList, roomPackage);
    console.log(packageObject);
    console.log(JSON.stringify(packageObject));
    let addedResponse = HTTPRequestService("PUT", 'http://localhost:8080/roompackages/'+window['oldPackage'].id, JSON.stringify(packageObject));
    if (199 < addedResponse.status && addedResponse.status < 300) {
        window.alert("Add Successfully" + addedResponse.status);
        refreshPackageTable(HTTPRequestService("GET", 'http://localhost:8080/roompackages'));
        alertFunction("Add Successfully","Room Adding is successfully","success");
        formCloser();
    } else if (399 < addedResponse.status && addedResponse.status < 500) {
        DynamicvalidationFunctioion(addedResponse.errorMessage, valdationFeildList, inputForm);
    } else window.alert("Add Failure " + addedResponse.status);
}

//function related to Accordion
const accordionBodyDataListfunction = (element) =>{
    return HTTPRequestService("GET",'http://localhost:8080/services/categories/'+element.id).data;
}
serviceDetailsObject.data = serviceDetails;
const serviceInnerDataListfunction = (serviceElement) =>{
    serviceDetails.map(element => element.id).find(element => element === serviceElement.id) ? alertFunction("Already added","This Service is already added","error") :serviceDetails.push(serviceElement);;
    refreshInnerServiceDetailsTable(serviceDetailsObject,servicedetailsPrivilage);
}
packagePriceTxt.addEventListener('blur',()=>{
    alertFunction("Total Price Calcuation","Do you Add service price with enterd price ? <br><p type=\"button\" class=\"btn btn-outline-dark btn-sm mt-2\">Yes</p>","warning",()=>{
        //convert to interger value and add the total price
        packagePriceTxt.value = parseInt(packagePriceTxt.value) + totalPriceTxt;
    });
});

const valdationFeildList = [
    { id: 'packageNameTxt', type: 'text', validationStategy: 'nothing', requird: true },
    { id: 'packageAvailabilityTypeFormSelect', type: 'dropdown', validationStategy: 'selected', requird: true, static: true },
    { id: 'packagePriceTxt', type: 'text', validationStategy: 'regexp', requird: true },
];

const valdationDetailsList = {
    'packagePriceTxt': { pattern: '^[1-9][0-9]*(\\.[0-9]{1,2})?$'},
};
const defaulTextError = {
    'packageNameTxt': { pattern: "please select your designation!"},
    'packageAvailabilityTypeFormSelect': {  pattern: "please enter valid full name!"},
    'packagePriceTxt': {  pattern: "please enter valid full name!"},
};

const formCloser = ()=>{
    $('#roomPackageForm').modal('hide');
    formClear(valdationFeildList,inputForm,defaulTextError);
    serviceDetails.splice(0, serviceDetails.length);

    //set this featuresDetailsObject and bedDetailsObject to null
    serviceDetailsObject.data = serviceDetails;
    refreshInnerServiceDetailsTable(serviceDetailsObject,servicedetailsPrivilage);
/*    bedTypeFormSelect.selectedIndex = 0;
    bedCountTxt.value = "";
    roomFeaturesTxt.value = "";*/
    inputForm.classList.remove('try-validated');
    refreshPackageTable(HTTPRequestService("GET",'http://localhost:8080/roompackages'),userPrivilage);
}