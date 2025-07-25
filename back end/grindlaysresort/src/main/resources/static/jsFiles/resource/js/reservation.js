var selectCustomerList ;
var selectedCustomer;
var addedRoomObjectArray = [];
var addedRoomDataObject = new Object();
var addedPackageObjectArray = [];
var addedPackageDataObject = new Object();
var addedServiceObjectArray = [];
var addedServiceDataObject = new Object();
addedRoomDataObject.data = addedRoomObjectArray;
addedPackageDataObject.data = addedPackageObjectArray;
addedServiceDataObject.data = addedServiceObjectArray;
var headcount = 0;
var domaiurl = 'http://localhost:8080/report/roomreport/roomlist?';
var checkinCheckoutSet = false;
var isEdit = false;
var isChange = false;

//2D array count [Service ID,count,operation]
var updateServiceDetails = [];
var updatePackageDetails = [];

userPrivilage = HTTPRequestService("GET",'http://localhost:8080/privilege/Employee?user=admin').data;
selectCustomerList = HTTPRequestService("GET",'http://localhost:8080/customers/getallnicmobilepassport');
roomTablePrivilage = {select: true, insert: false, update: true, delete: false};
roomViewTablePrivilage = {select: false, insert: false, update: false, delete: true};
window.addEventListener("load", () => {
    reservationFormPrivilageHandeling(userPrivilage);
    dataListCreate(selectCustomerList,nicDatalistOptions,'full_name','nic');
    dataListCreate(selectCustomerList,mobileDatalistOptions,'full_name','mobile');
    dataListCreate(selectCustomerList,passportDatalistOptions,'full_name','passport');
    dataListCreate(HTTPRequestService("GET",'http://localhost:8080/services'),serviceListOptions,'name','id');
    refreshRoomTable(HTTPRequestService("GET",'http://localhost:8080/report/roomreport/roomlist?roomstates_id=1'),roomTablePrivilage);
    viewTypeDropDownCreate(HTTPRequestService("GET",'http://localhost:8080/viewtypes'));
    roomTypeDropDownCreate(HTTPRequestService("GET",'http://localhost:8080/roomtypes'));
    packageTypeDropDownCreate(HTTPRequestService("GET",'http://localhost:8080/roompackages'));
    changingDataEditIcon();
    refreshReservationTable(HTTPRequestService("GET",'http://localhost:8080/reservation'));
});

refreshReservationTable = (dataList) => {

    //displaying data list for employee table
    const displayProperty = [
        { dataType: 'text', propertyName: "reservation_number" },
        { dataType: 'function', propertyName: customerNameFunction },
        { dataType: 'text', propertyName: "headcount" },
        { dataType: 'function', propertyName: roomListFunction },
        { dataType: 'function', propertyName: reservationStatusFunction },
        { dataType: 'function', propertyName: reservationPaymentStatusFunction },
    ];

    fillDataIntoTable(ReservationView, dataList, displayProperty, ReservationEditfunctionName, DeleteFunctionName, MoreFunctionName,deleteStatusFunction, true,userPrivilage);
    // fillDataIntoTable(tableod,datalist,editfunctionName,DeleteFunctionName,MoreFunctionName,button visibility);
    //fillDataIntoTable02(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
    //fillDataIntoTable03(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
    //fillDataIntoTable04(EmployeeView,employees,displayProperty,EditfunctionName,DeleteFunctionName,MoreFunctionName);
    $(document).ready(function () {
        $('#ReservationView').DataTable();
        $('.dataTables_length').addClass('bs-select');
        ReservationView_filter.classList.add('mb-3', 'pt-2');
        let searchInputDiv = ReservationView_filter.children[0].children[0];
        searchInputDiv.classList.add('form-control');
    });
}

// Reservation Edit Function
const ReservationEditfunctionName = (element,index) =>{
    console.log(element);
    this.isEdit = true;
    customerName.innerHTML = element.customer_id.full_name;
    selectedCustomer = selectCustomerList.data.find((ele) => ele.id == element.customer_id.id);
    customerName.innerHTML = selectedCustomer.full_name;
    headCountTxt.value = element.headcount;
    passportDtlTxt.value = element.passport;
    mobileDtlTxt.value = element.mobile;
    $('#reservationForm').modal('show');
    window['oldReservation'] = element;
    let roomsDataObjects = element.rooms;
    addedPackageDataObject.data = element.roomPackages;
    addedServiceDataObject.data = element.services_id;
    refreshPackageDetailsTable(addedPackageDataObject);
    refreshServiceDetailsTable(addedServiceDataObject);
    //refreshRoomDetailsTable(addedRoomDataObject);

    addedRoomObjectArray.length = 0;

    roomsDataObjects.map((element) => {
        var TempRoomObj = new Object();
        TempRoomObj =HTTPRequestService("GET",`http://localhost:8080/room/roomdetails?room_id=${element.id}`).data ;
        TempRoomObj.checkingdate = element.checkingdate;
        TempRoomObj.checkoutdate = element.checkingdate;
        addedRoomObjectArray.push(TempRoomObj);
    });
    addedRoomDataObject.data = addedRoomObjectArray;
}

const reservationFormPrivilageHandeling = (userPrivilage) =>{
    if(userPrivilage.insert){
        $("#formOpenButton").css("visibility","visible");
    }
}

const roomListFunction =  (element) => {
    var eleList = '<ol>';
    element.rooms.forEach((room) => {
        eleList += '<li class="text bg-danger text-center rounded-pill m-1 p-1" style="list-style-type: none;">'+'no : ' +room.room_number+' '+room.roomname+'</li>';
    });
    eleList += '</ol>';
    return eleList;
}

const customerNameFunction =  (element) => {
    return ('<p class="text">'+element.customer_id.full_name+'</p>');
}

const reservationStatusFunction =  (element) => {
    if (element.state_id.name === 'Pending') return ('<p class="text-warning">'+element.state_id.name+'</p>');
    if (element.state_id.name === 'available') return ('<p class="text-success text-center">'+element.state_id.name+'</p>');
    if (element.state_id.name === 'Canceled') return ('<p class="text-danger text-center">'+element.state_id.name+'</p>');
    if (element.state_id.name === 'Completed') return ('<p class="text-primary text-center">'+element.state_id.name+'</p>');
    if (element.state_id.name === 'CheckedIn') return ('<p class="text-info text-center">'+element.state_id.name+'</p>');
    if (element.state_id.name === 'CheckedOut') return ('<p class="text-secondary text-center">'+element.state_id.name+'</p>');
    return ('<p class="text">'+element.state_id.name+'</p>');
}

const reservationPaymentStatusFunction =  (element) => {;
    if (element.reservationpaymentdetails.paymentstatus) return ('<p class="text-success"><i class="fa-solid fa-circle"></i> Paid</p>');
    else return ('<p class="text-danger"><i class="fa-solid fa-circle"></i> not Total Paid</p>');
}


const viewTypeDropDownCreate = (viewType) =>{
    dropDownCreate(viewType,viewTypeFormSelect,'type');
}
const roomTypeDropDownCreate = (roomType) =>{
    dropDownCreate(roomType,roomTypeFormSelect,'name');
}
const packageTypeDropDownCreate = (packageType) =>{
    dropDownCreate(packageType,packageFormSelect,'packagename');
}

refreshRoomTable = (dataList) => {
    //displaying data list for employee table
    const displayProperty = [
        { dataType: 'text', propertyName: "number" },
        { dataType: 'text', propertyName: "roomname" },
        { dataType: 'text', propertyName: "maxheadcount" },
        { dataType: 'text', propertyName: "roomprice" },
        { dataType: 'function', propertyName: roomtypeFunction },
        { dataType: 'function', propertyName: viewtypeFunction },
    ];

    // deleteStatusFunction - this parameter use for define delete button visibility in the table (if the delete status is true then the delete button will be visibility)
    fillDataIntoTable(RoomDataView, dataList, displayProperty, EditfunctionName, DeleteFunctionName, MoreFunctionName,deleteStatusFunction, true,roomTablePrivilage);
    $(document).ready(function () {
        $('#RoomDataView').DataTable();
        $('.dataTables_length').addClass('bs-select');
    });
}


refreshRoomDetailsTable = (dataList) => {
    //displaying data list for employee table
    const displayProperty = [
        { dataType: 'text', propertyName: "number" },
        { dataType: 'text', propertyName: "roomname" },
        { dataType: 'text', propertyName: "maxheadcount" },
        { dataType: 'text', propertyName: "checkingdate" },
        { dataType: 'text', propertyName: "checkoutdate" },
        { dataType: 'text', propertyName: "roomprice" },
        { dataType: 'function', propertyName: roomtypeFunction },
        { dataType: 'function', propertyName: viewtypeFunction },
    ];

    // deleteStatusFunction - this parameter use for define delete button visibility in the table (if the delete status is true then the delete button will be visibility)
    fillDataIntoTable(RoomDataTableView, dataList, displayProperty, EditfunctionName, DeleteInnerRoomTableFunctionName, MoreFunctionName,deleteStatusFunction, true,roomViewTablePrivilage);
}
//Load  the Package Table
refreshPackageDetailsTable = (dataList) => {
    //displaying data list for employee table
    const displayProperty = [
        { dataType: 'text', propertyName: "packagename" },
        { dataType: 'text', propertyName: "price" },
        { dataType: 'text', propertyName: "packageCount" },
        { dataType: 'function', propertyName: packagePriceCalculation },
    ];

    // deleteStatusFunction - this parameter use for define delete button visibility in the table (if the delete status is true then the delete button will be visibility)
    fillDataIntoTable(packageView, dataList, displayProperty, EditfunctionName, DeletePackageFunctionName, MoreFunctionName,deleteStatusFunction, true,roomViewTablePrivilage);
}

//Load  the Service Table
refreshServiceDetailsTable = (dataList) => {
    //displaying data list for employee table
    const displayProperty = [
        { dataType: 'text', propertyName: "name" },
        { dataType: 'text', propertyName: "peramount" },
        { dataType: 'text', propertyName: "serviceCount" },
        { dataType: 'function', propertyName: servicePriceCalculation },
    ];

    // deleteStatusFunction - this parameter use for define delete button visibility in the table (if the delete status is true then the delete button will be visibility)
    fillDataIntoTable(FeaturesView, dataList, displayProperty, EditfunctionName, DeleteServiceFunctionName, MoreFunctionName,deleteStatusFunction, true,roomViewTablePrivilage);
}

const EditfunctionName = (elements, index) => {

    if(addedRoomObjectArray.find((element) => element.id === elements.id)){
        alertFunction("Add","Already Added","warning");
    }else {
        if(checkinCheckoutSet) {
            elements.checkingdate = preRoomCheckinDateTxt.value;
            elements.checkoutdate = preRoomCheckedoutDateTxt.value;
            addedRoomObjectArray.push(elements);
            updateNeededHeadCount();
            alertFunction("Add","Added Succusfully","success");
        }
        else
            alertFunction("Select Date","Please Select Checkin and Checkout Date","warning");
    }
}

//Main Table Delete Function
const DeleteFunctionName = (element, index, tableBody) => {
    window.alert("Delete");
    let deleteConform = window.confirm("Are you sure ?\n"
        + "\nRoom Name " + element.full_name
        + "\nNIC " + element.nic_number
    );
    if (deleteConform) {
        const deleteServerResponse = 'OK';
        if (deleteServerResponse === 'OK') {
            let deleteResponse = HTTPRequestService("DELETE",'http://localhost:8080/reservation/reservatidelete/'+element.id);
            if (199<deleteResponse.status && deleteResponse.status<300) {
                window.alert("Delete Successfull...");
                refreshRoomTable(HTTPRequestService("GET",'http://localhost:8080/reservation'));
            } else {
                window.alert("Delete not compleate error "+deleteResponse.message);
            }
        } else {
            window.alert("Delete not compleate error ");
        }
    }
}

//Service Table Delete Function
const DeleteServiceFunctionName = (element, index, tableBody) => {

    let deleteConform = window.confirm("Are you sure ?\n"
        + "\nService NAme" + element.full_name
        + "\nNIC " + element.nic_number
    );
    if (deleteConform) {
        if (isEdit){
            let deleteResponse = HTTPRequestService("DELETE",'http://localhost:8080/reservation/reservationhasservice?reservation_id='+ window['oldReservation'].id+'&service_id='+element.id+'&service_count='+element.serviceCount);
            if (199<deleteResponse.status && deleteResponse.status<300) {
                addedPackageDataObject.data.splice(index, 1);
                refreshPackageDetailsTable(addedPackageDataObject);
                updateServiceDetails.push([element.id,element.serviceCount,"DELETE"]);
                isChange = true;
                alertFunction("Delete","Delete Successfully","success");
            }else {
                alertFunction("Error","Not Delete Room","error");
            }
        }else {
            addedServiceDataObject.data.splice(index, 1);
            refreshServiceDetailsTable(addedServiceDataObject);
            alertFunction("Delete","Delete Successfully","success");
        }
    }
}
//Service Table Delete Function
const DeletePackageFunctionName = (element, index, tableBody) => {

    let deleteConform = window.confirm("Are you sure ?\n"
        + "\nService NAme" + element.full_name
        + "\nNIC " + element.nic_number
    );
    if (deleteConform) {
        if (isEdit){
            let deleteResponse = HTTPRequestService("DELETE",'http://localhost:8080/reservation/reservationhaspackage?reservation_id='+ window['oldReservation'].id+'&package_id='+element.id+'&package_count='+element.packageCount);
            if (199<deleteResponse.status && deleteResponse.status<300) {
                addedPackageDataObject.data.splice(index, 1);
                refreshPackageDetailsTable(addedPackageDataObject);
                updatePackageDetails.push([element.id,element.packageCount,"DELETE"]);
                isChange = true;
                alertFunction("Delete","Delete Successfully","success");
            }else {
                alertFunction("Error","Not Delete Room","error");
            }
        }else {
            addedPackageDataObject.data.splice(index, 1);
            refreshPackageDetailsTable(addedPackageDataObject);
            alertFunction("Delete","Delete Successfully","success");
        }
    }
}

//Inner Room Display Table Delete Function
const DeleteInnerRoomTableFunctionName = (element, index, tableBody) => {
    let deleteConform = window.confirm("Are you sure ?\n"
        + "\nService NAme" + element.full_name
        + "\nNIC " + element.nic_number
    );
    if (deleteConform) {
        if(this.isEdit){
            let deleteResponse = HTTPRequestService("DELETE",'http://localhost:8080/reservation/reservationhasroom?reservation_id='+ window['oldReservation'].id+'&room_id='+element.id);
            if (199<deleteResponse.status && deleteResponse.status<300) {
                addedRoomObjectArray.splice(index, 1);
                addedRoomDataObject.data = addedRoomObjectArray;
                refreshRoomDetailsTable(addedRoomDataObject);
                isChange = true;
                alertFunction("Delete","Delete Successfully","success");

            } else {
                alertFunction("Error","Not Delete Room","error");
            }
        }else {
            addedRoomObjectArray.splice(index, 1);
            addedRoomDataObject.data = addedRoomObjectArray;
            refreshRoomDetailsTable(addedRoomDataObject);
            alertFunction("Delete","Delete Successfully","success");
        }
    }else {
        alertFunction("Delete","Not Delete Room","error");
    }
}

//Main Table More Function
const MoreFunctionName = (element, index) => {
    console.log(element, index);
    moreReviewTable(moreViewTableBody,viewDisplayProperty,element);
    $('#RoomDetails').modal('show');
}

const deleteStatusFunction = (element) => {
    return true;
    // if (element.roomstates_id.status==="Avalilable") {return true ;}
    // else return false;
}

// table room type selection function
const roomtypeFunction = (element) => {
    return ('<p class="text">'+element.roomtype_id.name+'</p>');
}

// table view type selection function
const viewtypeFunction = (element) => {
    return ('<p class="text">'+element.viewtype_id.type+'</p>');
}

//Package table view type selection function
const packagePriceCalculation = (element) => {
    return ('<p class="text">'+(element.price)*(element.packageCount)+'</p>');
}
const servicePriceCalculation = (element) => {
    return ('<p class="text">'+(element.peramount)*(element.serviceCount)+'</p>');
}

const changingDataEditIcon = () =>{
    classforselect = '.fa-pen.fa-beat-fade[aria-hidden="true"]';
    //get elimnet that include the class
    console.log(document.querySelectorAll(classforselect));
    const allEditQuerySelecter = document.querySelectorAll(classforselect);
    allEditQuerySelecter.forEach((element) => {
        element.parentNode.InnerHTML = '<i class="fa-regular fa-square-plus" style="color: #ffffff;"></i>';
        element.parentNode.InnerHTML = '';
    });
}

nicDtlTxt.addEventListener('keyup', (event) => {
    dataListMatchingCheck(event,BtnAddByNic,'nicDatalistOptions','^([0-9]{9}[x|X|v|V]|[0-9]{12})$');
    BtnAddByMobile.classList.add('disabled');
    mobileDtlTxt.value = '';
    BtnAddByPassport.classList.add('disabled');
    passportDtlTxt.value = '';
});

mobileDtlTxt.addEventListener('keyup', (event) => {
    dataListMatchingCheck(event,BtnAddByMobile,'mobileDatalistOptions','^[0][7][1,2,4,5,6,7,8][0-9]{7}$');
    BtnAddByNic.classList.add('disabled');
    nicDtlTxt.value = '';
    BtnAddByPassport.classList.add('disabled');
    passportDtlTxt.value = '';
});

passportDtlTxt.addEventListener('keyup', (event) => {
    dataListMatchingCheck(event,BtnAddByPassport,'passportDatalistOptions','^(?!^0+$)[a-zA-Z0-9]{3,20}$');
    BtnAddByNic.classList.add('disabled');
    nicDtlTxt.value = '';
    BtnAddByMobile.classList.add('disabled');
    mobileDtlTxt.value = '';
});

packageaddBtn.addEventListener('click', (event) => {
    tempPackageObj = JSON.parse(packageFormSelect.value);
    findPackageObjectIndex = addedPackageDataObject.data.findIndex((element) => element.id === tempPackageObj.id);
    if (findPackageObjectIndex !== -1) {
        alertFunction("All ready add","Do you want to Update count ? <br><p type=\"button\" class=\"btn btn-outline-dark btn-sm mt-2\">Yes</p>","warning",()=>{
            if (isEdit){
                let deleteResponse = HTTPRequestService("PUT",'http://localhost:8080/reservation/reservationhaspackage?reservation_id='+ window['oldReservation'].id+'&package_id='+addedPackageDataObject.data[findPackageObjectIndex].id+'&package_count='+addedPackageDataObject.data[findPackageObjectIndex].packageCount);

                if (199<deleteResponse.status && deleteResponse.status<300) {
                    addedPackageDataObject.data[findPackageObjectIndex].packageCount += parseInt(packageCountTxt.value);
                    refreshPackageDetailsTable(addedPackageDataObject);
                    isChange = true;
                    updatePackageDetails.push([addedPackageDataObject.data[findPackageObjectIndex].id,addedPackageDataObject.data[findPackageObjectIndex].packageCount,"ADD"]);
                    alertFunction("Update","Added Successfully","success");
                } else {
                    alertFunction("Error","Not Update Package","error");
                }
            }else {
                addedPackageDataObject.data[findPackageObjectIndex].packageCount += parseInt(packageCountTxt.value);
                refreshPackageDetailsTable(addedPackageDataObject);
                alertFunction("Update","Added Successfully","success");
            }
        });
    }else{
        if (isEdit){
            let deleteResponse = HTTPRequestService("PUT",'http://localhost:8080/reservation/reservationhaspackage?reservation_id='+ window['oldReservation'].id+'&package_id='+tempPackageObj.id+'&package_count='+packageCountTxt.value);
            if (199<deleteResponse.status && deleteResponse.status<300) {
                tempPackageObj.packageCount = parseInt(packageCountTxt.value);
                addedPackageDataObject.data.push(tempPackageObj);
                isChange = true;
                updatePackageDetails.push([tempPackageObj.id,packageCountTxt.value,"ADD"])
                alertFunction("Update","Added Successfully","success");
            } else {
                alertFunction("Error","Not Update Package","error");
            }

        }else {
            tempPackageObj.packageCount = parseInt(packageCountTxt.value);
            addedPackageDataObject.data.push(tempPackageObj);
        }

    }
    refreshPackageDetailsTable(addedPackageDataObject);
})

featureaddBtn.addEventListener('click', (event) => {
    HTTPRequestService("GET",'http://localhost:8080/services/servicegetid/'+serviceDtlTxt.value);
    tempServiceObj = HTTPRequestService("GET",'http://localhost:8080/services/servicegetid/'+serviceDtlTxt.value).data;

    findServiceObjectIndex = addedServiceDataObject.data.findIndex((element) => element.id === tempServiceObj.id);
    if (findServiceObjectIndex !== -1) {
        if (isEdit){
            let deleteResponse = HTTPRequestService("PUT",'http://localhost:8080/reservation/reservationhasservice?reservation_id='+ window['oldReservation'].id+'&service_id='+addedServiceDataObject.data[findServiceObjectIndex].id+'&service_count='+addedServiceDataObject.data[findServiceObjectIndex].serviceCount);
            if (199<deleteResponse.status && deleteResponse.status<300) {
                alertFunction("All ready add","Do you want to Update count ? <br><p type=\"button\" class=\"btn btn-outline-dark btn-sm mt-2\">Yes</p>","warning",()=>{
                    addedServiceDataObject.data[findServiceObjectIndex].serviceCount += parseInt(serviceCountTxt.value);
                    refreshServiceDetailsTable(addedServiceDataObject);
                    updateServiceDetails.push([addedServiceDataObject.data[findServiceObjectIndex].id,addedServiceDataObject.data[findServiceObjectIndex].serviceCount,"ADD"]);
                    isChange = true;
                    alertFunction("Update","Added Successfully","success");
                });
            }
            else {
                alertFunction("Error","Not Update Service","error");
            }
        }else {
            alertFunction("All ready add","Do you want to Update count ? <br><p type=\"button\" class=\"btn btn-outline-dark btn-sm mt-2\">Yes</p>","warning",()=>{
                addedServiceDataObject.data[findServiceObjectIndex].serviceCount += parseInt(serviceCountTxt.value);
                refreshServiceDetailsTable(addedServiceDataObject);
                alertFunction("Update","Added Successfully","success");
            });
        }

    }else{
        if (isEdit){
            let deleteResponse = HTTPRequestService("PUT",'http://localhost:8080/reservation/reservationhasservice?reservation_id='+ window['oldReservation'].id+'&service_id='+tempServiceObj.id+'&service_count='+serviceCountTxt.value);
            if (199<deleteResponse.status && deleteResponse.status<300) {
                tempServiceObj.serviceCount = parseInt(serviceCountTxt.value);
                addedServiceDataObject.data.push(tempServiceObj);
                updateServiceDetails.push([tempServiceObj.id,serviceCountTxt.value,"ADD"]);
                isChange = true;
                alertFunction("Update","Added Successfully","success");
            } else {
                alertFunction("Error","Not Update Service","error");
            }
        }else {
            tempServiceObj.serviceCount = parseInt(serviceCountTxt.value);
            addedServiceDataObject.data.push(tempServiceObj);
            alertFunction("Update","Added Successfully","success");
        }
    }
    refreshServiceDetailsTable(addedServiceDataObject);
});

BtnAddByNic.addEventListener('click',()=>{
    selectedCustomer = selectCustomerList.data.find((element) => element.nic == nicDtlTxt.value);
    customerName.innerHTML = selectedCustomer.full_name;
});

BtnAddByMobile.addEventListener('click',()=>{
    selectedCustomer = selectCustomerList.data.find((element) => element.mobile == mobileDtlTxt.value);
    customerName.innerHTML = selectedCustomer.full_name;
});

BtnAddByPassport.addEventListener('click',()=>{
    selectedCustomer = selectCustomerList.data.find((element) => element.passport == passportDtlTxt.value);
    customerName.innerHTML = selectedCustomer.full_name;
});

btnOpenRoomModule.addEventListener('click',()=>{
    headcount = headCountTxt.value;
    $('#reservationForm').modal('hide');
    $('#RoomSelectionForm').modal('show');
});

roomsAddButton.addEventListener('click', ()=>{
    $('#RoomSelectionForm').modal('hide');
    $('#reservationForm').modal('show');
});
backtoPrimary.addEventListener('click', ()=>{
    $('#RoomSelectionForm').modal('hide');
    $('#reservationForm').modal('show');
});
moreModalOpen.addEventListener('click',()=>{
    refreshRoomDetailsTable(addedRoomDataObject);
    $('#RoomSelectionForm').modal('hide');
    $('#RoomaddedForm').modal('show');
    console.log(addedRoomDataObject);
});
backtoRoomAddedPrimary.addEventListener('click',()=>{
    $('#RoomaddedForm').modal('hide');
    $('#RoomSelectionForm').modal('show');
});
reservationFormClose.addEventListener('click', (e) => {
    if (confirm("Are you sure ?")){
        if (isChange){
            if (confirm("Do you want to save changes ?")){
                fullReservationUpdateFunction();
            }else{

                //Update package rallback function
                updatePackageDetails.forEach((element) => {
                    if (element[2] === "ADD"){
                        let deleteResponse = HTTPRequestService("DELETE",'http://localhost:8080/reservation/reservationhaspackage?reservation_id='+ window['oldReservation'].id+'&package_id='+element[0]+'&package_count='+element[1]);
                        if (199<deleteResponse.status && deleteResponse.status<300) {
                            alertFunction("Update","Added Successfully","success");
                        } else {
                            alertFunction("Error","Not Update Package","error");
                        }
                    }else if (element[2] === "DELETE"){
                        let deleteResponse = HTTPRequestService("PUT",'http://localhost:8080/reservation/reservationhaspackage?reservation_id='+ window['oldReservation'].id+'&package_id='+element[0]+'&package_count='+element[1]);
                        if (199<deleteResponse.status && deleteResponse.status<300) {
                            alertFunction("Update","Added Successfully","success");
                        } else {
                            alertFunction("Error","Not Update Package","error");
                        }
                    }
                });
                //Update service rallback function
                updateServiceDetails.forEach((element) => {
                    if (element[2] === "ADD"){
                        let deleteResponse = HTTPRequestService("DELETE",'http://localhost:8080/reservation/reservationhasservice?reservation_id='+ window['oldReservation'].id+'&service_id='+element[0]+'&service_count='+element[1]);
                        if (199<deleteResponse.status && deleteResponse.status<300) {
                            alertFunction("Update","Added Successfully","success");
                        } else {
                            alertFunction("Error","Not Update Service","error");
                        }
                    }else if (element[2] === "DELETE"){
                        let deleteResponse = HTTPRequestService("PUT",'http://localhost:8080/reservation/reservationhasservice?reservation_id='+ window['oldReservation'].id+'&service_id='+element[0]+'&service_count='+element[1]);
                        if (199<deleteResponse.status && deleteResponse.status<300) {
                            alertFunction("Update","Added Successfully","success");
                        } else {
                            alertFunction("Error","Not Update Service","error");
                        }
                    }
                });
            }

        }
        formCloser();
    }
});

var domainUrlCreateFunction= (maindomain,checkin,checkout) => {
    domaiurl = maindomain + 'checkinDate=' + checkin + '&checkoutDate=' + checkout;
    checkinCheckoutSet = true;
}

preRoomCheckinDateTxt.addEventListener('change', ()=>{
    preRoomCheckedoutDateTxt.hasAttributes("disabled") ? preRoomCheckedoutDateTxt.removeAttribute('disabled') : null;
    if(checkinCheckoutSet)
        refreshRoomTable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,validationStrategyList)+'&roomstates_id=1'),roomTablePrivilage);
    else
        alertFunction("Select Date","Please Select Checkin and Checkout Date","warning");
});

preRoomCheckedoutDateTxt.addEventListener('change', ()=>{
    checkinCheckoutSet.value != "" && preRoomCheckedoutDateTxt.value != "" ? domainUrlCreateFunction(domaiurl,preRoomCheckinDateTxt.value,preRoomCheckedoutDateTxt.value) : null;
    refreshRoomTable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,validationStrategyList)+'&roomstates_id=1'),roomTablePrivilage);
});

viewTypeFormSelect.addEventListener('change', ()=>{
    if(checkinCheckoutSet)
        refreshRoomTable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,validationStrategyList)+'&roomstates_id=1'),roomTablePrivilage);
    else
        alertFunction("Select Date","Please Select Checkin and Checkout Date","warning");
});

roomTypeFormSelect.addEventListener('change', ()=>{
    if(checkinCheckoutSet)
        refreshRoomTable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,validationStrategyList)+'&roomstates_id=1'),roomTablePrivilage);
    else
        alertFunction("Select Date","Please Select Checkin and Checkout Date","warning");
});

headCountFilterTxt.addEventListener('keyup', ()=>{
    if(checkinCheckoutSet)
        refreshRoomTable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,validationStrategyList)+'&roomstates_id=1'),roomTablePrivilage);
    else
        alertFunction("Select Date","Please Select Checkin and Checkout Date","warning");
});

minPriceTxt.addEventListener('keyup', ()=>{
    if(checkinCheckoutSet)
        refreshRoomTable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,validationStrategyList)+'&roomstates_id=1'),roomTablePrivilage);
    else
        alertFunction("Select Date","Please Select Checkin and Checkout Date","warning");
});

maxPriceTxt.addEventListener('keyup', ()=>{
    if(checkinCheckoutSet)
        refreshRoomTable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,validationStrategyList)+'&roomstates_id=1'),roomTablePrivilage);
    else
        alertFunction("Select Date","Please Select Checkin and Checkout Date","warning");
});

sortTypeFormSelect.addEventListener('change', ()=>{
    if(checkinCheckoutSet)
        refreshRoomTable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,validationStrategyList)+'&roomstates_id=1'),roomTablePrivilage);
    else
        alertFunction("Select Date","Please Select Checkin and Checkout Date","warning");
});

// Return value as that was concatenate with the url
var sortedselectfunction = (obj) => {
    obj = JSON.parse(obj);
    return 'orderbytype='+obj.orderbytype+'&asendordesend='+obj.order;
}

const valdationFeildList = [
    { id: 'preRoomCheckinDateTxt', type: 'date', validationStategy: 'function'},
    { id: 'preRoomCheckedoutDateTxt', type: 'date', validationStategy: 'function'},
    { id: 'viewTypeFormSelect', type: 'dropdown', validationStategy: 'selected'},
    { id: 'roomTypeFormSelect', type: 'dropdown', validationStategy: 'selected'},
    { id: 'headCountFilterTxt', type: 'text', validationStategy: 'nothing'},
    { id: 'minPriceTxt', type: 'text', validationStategy: 'nothing'},
    { id: 'maxPriceTxt', type: 'text', validationStategy: 'nothing'},
    { id: 'sortTypeFormSelect', type: 'dropdown', validationStategy: 'function'}
];

const validationStrategyList = {
    'sortTypeFormSelect': {functions: sortedselectfunction},
}

ValidationButton.addEventListener('click', ()=>{
    window.alert("Akila Weerasinghe");
    var newReservation = new Object();
    var newReservationpayment = new Object();
    newReservationpayment.paidamount = "1000.00"
    newReservationpayment.discription = "pay for thing"
    newReservationpayment.payment_method_id = {
        id : 1,
        method : 'Card Payment'
    };

    newReservation.reservationtotalpayment = 10000;
    newReservation.totalpaidamount = "1200";
    newReservation.discount = 100;
    newReservation.customer_id = selectedCustomer;
    newReservation.headcount = (parseInt(headcount));
    newReservation.services_id = addedServiceDataObject.data;
    newReservation.rooms = addedRoomObjectArray;
    newReservation.roomPackages = addedPackageDataObject.data;
    newReservation.reservationpayment = newReservationpayment;

    if(confirm("Do you Want to add ?")){
        let addedResponse = HTTPRequestService("POST",'http://localhost:8080/reservation',JSON.stringify(newReservation));
        if(199<addedResponse.status && addedResponse.status<300)alertFunction("Select Date","Reservation add Successfully","success");
        else if(399<addedResponse.status && addedResponse.status<500) DynamicvalidationFunctioion(addedResponse.errorMessage,valdationFeildList,inputForm);
        else window.alert("Add Failure "+addedResponse.status);
    }
});

const fullReservationUpdateFunction = () => {
    window.alert("Update Button is clicked");
    var newReservation = new Object();
    var newReservationpayment = new Object();
    newReservation.reservation_id = window['oldReservation'].id;
    newReservationpayment.paidamount = "1000.00"
    newReservationpayment.discription = "pay for thing"
    newReservationpayment.payment_method_id = {
        id : 1,
        method : 'Card Payment'
    };

    newReservation.reservationtotalpayment = 10000;
    newReservation.totalpaidamount = "1200";
    newReservation.discount = 100;
    newReservation.customer_id = selectedCustomer;
    newReservation.headcount = (parseInt(headcount));
    newReservation.services_id = addedServiceDataObject.data;
    newReservation.rooms = addedRoomObjectArray;
    newReservation.roomPackages = addedPackageDataObject.data;
    newReservation.reservationpayment = newReservationpayment;

    if(confirm("Do you Want to add ?")){
        let addedResponse = HTTPRequestService("PUT",'http://localhost:8080/reservation',JSON.stringify(newReservation));
        if(199<addedResponse.status && addedResponse.status<300)alertFunction("Select Date","Reservation add Successfully","success");
        else if(399<addedResponse.status && addedResponse.status<500) DynamicvalidationFunctioion(addedResponse.errorMessage,valdationFeildList,inputForm);
        else window.alert("Add Failure "+addedResponse.status);
    }
}

UpdateButton.addEventListener('click', ()=>{
    fullReservationUpdateFunction();
})

const dataListMatchingCheck = (event,targetButton,datalist,regPattern) =>{
    var inputText = event.target.value.toLowerCase();
    var datalistOptions = document.getElementById(datalist).getElementsByTagName('option');
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
        if (inputText.match(regPattern)) {
            targetButton.classList.remove('disabled');
        } else {
            targetButton.classList.add('disabled');
        }
    } else {
        targetButton.classList.add('disabled');
    }
}

var urlcreatefunction = (drl,FeildList,validatinStrategy) =>{
    var firststateadd = true;
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
        }else if(element.type === 'text'){
            if (element.validationStategy === 'nothing') {
                if (getvalueofelement != "") {
                    firststateadd ? domainurl += '&' + getelement.name + '=' + getvalueofelement : domainurl += getelement.name + '=' + getvalueofelement;
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

// Total Price calculation
var calculateTotalPrice = () => {
    let totalRoomPrice = 0;
    let totalPackagePrice = 0;
    let totalServicePrice = 0;
    let TotalPrice;

    // Calculate Total Room Price
    addedRoomObjectArray.forEach(room => {
        if (room && room.roomprice) {
            totalRoomPrice += room.roomprice;
        }
    });

    // Calculate Total Package Price
    addedPackageDataObject.data.forEach(package => {
        if (package && package.price) {
            totalPackagePrice += (package.price*package.packageCount);
        }
    });

    // Calculate Total Service Price
    addedServiceDataObject.data.forEach(service => {
        if (service && service.peramount) {
            totalServicePrice += (service.peramount * service.serviceCount);;
        }
    });

    // Update Total Price in the DOM
    const totalPrice = totalRoomPrice + totalPackagePrice + totalServicePrice;
    document.getElementById("totalRoomPrice").innerHTML = totalRoomPrice.toFixed(2);
    document.getElementById("totalPackagePrice").innerHTML = totalPackagePrice.toFixed(2);
    document.getElementById("totalServicePrice").innerHTML = totalServicePrice.toFixed(2);
    document.getElementById("totalPrice").innerHTML = totalPrice.toFixed(2);
};

TotalPriceCalculationButton.addEventListener('click',()=>{
    calculateTotalPrice();
});


BtnAddByNic.addEventListener('click',()=>{
    selectedCustomer = selectCustomerList.data.find((element) => element.nic == nicDtlTxt.value);
    customerName.innerHTML = selectedCustomer.full_name;
});

var updateNeededHeadCount = () =>{

    if (headcount !== 0) {
        var  AddedRoomHeadCount= 0;
        addedRoomObjectArray.find((element) => {AddedRoomHeadCount += element.maxheadcount;});
        console.log(AddedRoomHeadCount);
        document.getElementById("totalRoomCount").innerHTML = addedRoomObjectArray.length;
        document.getElementById("AssignHeadCount").innerHTML = AddedRoomHeadCount;
        headcount-AddedRoomHeadCount>=0 ? document.getElementById("HeadCountLeft").innerHTML = headcount-AddedRoomHeadCount : document.getElementById("HeadCountLeft").innerHTML = 0;
    }
}
reservationFormInputList = [
    { id: 'nicDtlTxt', type: 'text', validationStategy: 'nothing'},
    { id: 'mobileDtlTxt', type: 'text', validationStategy: 'nothing'},
    { id: 'passportDtlTxt', type: 'text', validationStategy: 'nothing'},
    { id: 'headCountTxt', type: 'text', validationStategy: 'nothing'},
    { id: 'packageFormSelect', type: 'dropdown', validationStategy: 'nothing'},
    { id: 'packageCountTxt', type: 'text', validationStategy: 'nothing'},
    { id: 'serviceDtlTxt', type: 'text', validationStategy: 'nothing'},
    { id: 'serviceCountTxt', type: 'text', validationStategy: 'nothing'}
];
const formCloser = ()=>{
    $('#reservationForm').modal('hide');
    this.isEdit = false;
    this.isChange = false;
    formClear(reservationFormInputList,inputForm);
    document.getElementById('customerName').innerHTML = "";
    selectedCustomer = "";
    addedPackageObjectArray.length = 0;
    addedServiceObjectArray.length = 0;
    addedRoomObjectArray.length = 0;
    addedServiceDataObject.data.length = 0;
    addedPackageDataObject.data.length = 0;
    addedRoomDataObject.data.length = 0;
    refreshReservationTable(HTTPRequestService("GET",'http://localhost:8080/reservation'));
    refreshPackageDetailsTable(addedPackageDataObject);
    refreshServiceDetailsTable(addedServiceDataObject);
    refreshRoomDetailsTable(addedRoomDataObject);
    var headcount = 0;
    totalPackagePrice.innerHTML = "0.00";
    totalRoomPrice.innerHTML = "0.00";
    totalServicePrice.innerHTML = "0.00";
    totalPrice.innerHTML = "0.00";
}