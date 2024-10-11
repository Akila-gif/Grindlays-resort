var selectCustomerList ;
var selectedCustomer;
var addedRoomObjectArray = [];
var addedRoomDataObject = new Object();
addedRoomDataObject.data =addedRoomObjectArray;
var headcount = 0;

userPrivilage = HTTPRequestService("GET",'http://localhost:8080/privilege/Employee?user=admin').data;
selectCustomerList = HTTPRequestService("GET",'http://localhost:8080/customers/getallnicmobilepassport');
roomTablePrivilage = {select: true, insert: false, update: true, delete: false};
roomViewTablePrivilage = {select: false, insert: false, update: false, delete: true};
window.addEventListener("load", () => {
    employeeFormPrivilageHandeling(userPrivilage);
    dataListCreate(selectCustomerList,nicDatalistOptions,'full_name','nic');
    dataListCreate(selectCustomerList,mobileDatalistOptions,'full_name','mobile');
    dataListCreate(selectCustomerList,passportDatalistOptions,'full_name','passport');
    refreshRoomTable(HTTPRequestService("GET",'http://localhost:8080/report/roomreport/roomlist?roomstates_id=1'),roomTablePrivilage);
    viewTypeDropDownCreate(HTTPRequestService("GET",'http://localhost:8080/viewtypes'));
    roomTypeDropDownCreate(HTTPRequestService("GET",'http://localhost:8080/roomtypes'));
    changingDataEditIcon();
});

const employeeFormPrivilageHandeling = (userPrivilage) =>{
    if(userPrivilage.insert){
        $("#formOpenButton").css("visibility","visible");
    }
}

const viewTypeDropDownCreate = (viewType) =>{
    dropDownCreate(viewType,viewTypeFormSelect,'type');
}
const roomTypeDropDownCreate = (roomType) =>{
    dropDownCreate(roomType,roomTypeFormSelect,'name');
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
        { dataType: 'text', propertyName: "roomprice" },
        { dataType: 'function', propertyName: roomtypeFunction },
        { dataType: 'function', propertyName: viewtypeFunction },
    ];

    // deleteStatusFunction - this parameter use for define delete button visibility in the table (if the delete status is true then the delete button will be visibility)
    fillDataIntoTable(RoomDataTableView, dataList, displayProperty, EditfunctionName, DeleteFunctionName, MoreFunctionName,deleteStatusFunction, true,roomViewTablePrivilage);
}

const EditfunctionName = (elements, index) => {

    if(addedRoomObjectArray.find((element) => element.id === elements.id)){
        alertFunction("Add","Already Added","warning");
    }else {
        addedRoomObjectArray.push(elements);
        updateNeededHeadCount();
        alertFunction("Add","Added Succusfully","success");
    }
}

//Main Thable Delete Function
const DeleteFunctionName = (element, index, tableBody) => {

    let deleteConform = window.confirm("Are you sure ?\n"
        + "\nRoom Name " + element.full_name
        + "\nNIC " + element.nic_number
    );
    if (deleteConform) {
        const deleteServerResponse = 'OK';
        if (deleteServerResponse === 'OK') {
            let deleteResponse = HTTPRequestService("DELETE",'http://localhost:8080/room/'+element.id);
            if (199<deleteResponse.status && deleteResponse.status<300) {
                window.alert("Delete Successfull...");
                refreshRoomTable(HTTPRequestService("GET",'http://localhost:8080/room'));
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

const deleteStatusFunction = (element) => {
    if (element.roomstates_id.status==="Avalilable") {return true ;}
    else return false;
}
//table function
// table room status selection function
const roomstatesFunction = (element) => {
    if (element.roomstates_id.status === 'Avalilable')
        return ('<p class="text-success"><i class="fa-solid fa-circle"></i> Avalilable</p>');
    if (element.roomstates_id.status === 'Received')
        return ('<p class="text-warning"><i class="fa-solid fa-circle"></i> Received</p>');
    if (element.roomstates_id.status === 'unavailable')
        return ('<p class="text-danger "><i class="fa-solid fa-circle"></i> Unavailable</p>');
}

// table room type selection function
const roomtypeFunction = (element) => {
    return ('<p class="text">'+element.roomtype_id.name+'</p>')
}

// table view type selection function
const viewtypeFunction = (element) => {
    return ('<p class="text">'+element.viewtype_id.type+'</p>')
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
    $('#roomForm').modal('hide');
    $('#RoomSelectionForm').modal('show');
});

roomsAddButton.addEventListener('click', ()=>{
    $('#RoomSelectionForm').modal('hide');
    $('#roomForm').modal('show');
});
backtoPrimary.addEventListener('click', ()=>{
    $('#RoomSelectionForm').modal('hide');
    $('#roomForm').modal('show');
});
moreModalOpen.addEventListener('click',()=>{
    refreshRoomDetailsTable(addedRoomDataObject);
    $('#RoomSelectionForm').modal('hide');
    $('#RoomaddedForm').modal('show');
});
backtoRoomAddedPrimary.addEventListener('click',()=>{
    $('#RoomaddedForm').modal('hide');
    $('#RoomSelectionForm').modal('show');
});

viewTypeFormSelect.addEventListener('change', ()=>{
    refreshRoomTable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,validationStrategyList)+'&roomstates_id=1'),roomTablePrivilage);
});

roomTypeFormSelect.addEventListener('change', ()=>{
    refreshRoomTable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,validationStrategyList)+'&roomstates_id=1'),roomTablePrivilage);
});

headCountFilterTxt.addEventListener('keyup', ()=>{
    refreshRoomTable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,validationStrategyList)+'&roomstates_id=1'),roomTablePrivilage);
});

minPriceTxt.addEventListener('keyup', ()=>{
    refreshRoomTable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,validationStrategyList)+'&roomstates_id=1'),roomTablePrivilage);
});

maxPriceTxt.addEventListener('keyup', ()=>{
    refreshRoomTable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,validationStrategyList)+'&roomstates_id=1'),roomTablePrivilage);
});

sortTypeFormSelect.addEventListener('change', ()=>{
    refreshRoomTable(HTTPRequestService("GET",urlcreatefunction(domaiurl,valdationFeildList,validationStrategyList)+'&roomstates_id=1'),roomTablePrivilage);
});

var sortedselectfunction = (obj) => {
    obj = JSON.parse(obj);
    return 'orderbytype='+obj.orderbytype+'&asendordesend='+obj.order;
}

const valdationFeildList = [
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

var domaiurl = 'http://localhost:8080/report/roomreport/roomlist?';

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