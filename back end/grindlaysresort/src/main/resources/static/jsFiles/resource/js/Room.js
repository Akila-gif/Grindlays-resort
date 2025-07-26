var room = new Object();
var bedDetails = [];
var featuresDetails = [];
var bedDetailsObject = new Object();
var featuresDetailsObject = new Object();
let headCountTxt = 0;
var maxRoomHeadCount = 0;
userPrivilage = HTTPRequestService("GET",'http://localhost:8080/privilege/Room?user='+parent.window['logedUser']).data;
roomdetailsPrivilage = {select: false, insert: false, update: false, delete: true};
window.addEventListener("load", () => {
    addingFormPrivilageHandeling(userPrivilage);
    refreshRoomTable(HTTPRequestService("GET",'http://localhost:8080/room'),userPrivilage);
    refreshInnerBedDetailsTable(bedDetailsObject,roomdetailsPrivilage);
    refreshInnerFeaturesDetailsTable(featuresDetailsObject,roomdetailsPrivilage);
    viewtypesDropDownCreate(HTTPRequestService("GET",'http://localhost:8080/viewtypes'));
    roomTypeDropDown(HTTPRequestService("GET",'http://localhost:8080/roomtypes'));
    bedTypeDropDown(HTTPRequestService("GET",'http://localhost:8080/bedtypes'));
    roomStatusDropDown(HTTPRequestService("GET",'http://localhost:8080/roomstatus'));
    roomFeatureDataList(HTTPRequestService("GET",'http://localhost:8080/feature'));
});

const roomFeatureDataList = (dataList) =>{
    addOptionToDatalist(dataList,roomFeaturesListOptions,'feature','id');
}

//add option for the datalist
const addOptionToDatalist = (datalist, targetOptions,displayValue,valueoftheoption = null) => {

    const tableDropDownCreate = (datalist,targetOptions,displayValue,valueoftheoption)=>{
        targetOptions.innerHTML = "";
        datalist.data.forEach(objects=>{
            const dataListOption = document.createElement('option');
            valueoftheoption==null ? dataListOption.value = JSON.stringify(objects ): dataListOption.value = objects[valueoftheoption];
            dataListOption.innerHTML = objects[displayValue];
            targetOptions.appendChild(dataListOption);
        })
    }
    if (datalist.errorMessage==null) tableDropDownCreate(datalist,targetOptions,displayValue,valueoftheoption);
    else window.alert("Drop Down Create Error\n"+datalist.errorMessage);
}
refreshRoomTable = (dataList) => {
    //displaying data list for employee table
    const displayProperty = [
        { dataType: 'text', propertyName: "number" },
        { dataType: 'text', propertyName: "roomname" },
        { dataType: 'text', propertyName: "maxheadcount" },
        { dataType: 'text', propertyName: "roomprice" },
        { dataType: 'function', propertyName: roomstatesFunction},
        { dataType: 'function', propertyName: roomtypeFunction },
        { dataType: 'function', propertyName: viewtypeFunction },
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
    $('#roomForm').modal('show');
    window['oldRoom'] = element;
    featuresDetailsObject.data = element.featuresList;
    bedDetails = HTTPRequestService("GET",'http://localhost:8080/room/detailsbedcountinroom?room_id='+element.id).data;
    bedDetailsObject.data = bedDetails.map((bed)=>{

        let beadheadcount = 0;
        if (bed.bedType.type === 'Single') beadheadcount = 1;
        if (bed.bedType.type === 'Double') beadheadcount = 2;
        if (bed.bedType.type === 'Queen') beadheadcount = 2;
        if (bed.bedType.type === 'King') beadheadcount = 3;

        bed.headcount = beadheadcount*bed.bed_count;
        return bed;
    });
    featuresDetails = featuresDetailsObject.data;
    refreshInnerBedDetailsTable(bedDetailsObject,roomdetailsPrivilage);
    refreshInnerFeaturesDetailsTable(featuresDetailsObject,roomdetailsPrivilage);
    FormFill(element,valdationFeildList);
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

// this function use for define delete button visibility in the table (if the delete status is true then the delete button will be visibility)
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

// employee form privilage handeling for adding new Room
const addingFormPrivilageHandeling = (userPrivilage) =>{
    if(userPrivilage.insert){
        $("#formOpenButton").css("visibility","visible");
    }
}


refreshInnerBedDetailsTable = (dataList) => {
    //displaying data list for employee table
    const roominnerdisplayProperty = [
        { dataType: 'function', propertyName: roomBedTypeFunction},
        { dataType: 'text', propertyName: "bed_count" },
        { dataType: 'text', propertyName: "headcount" },
    ];

    dataList.data.length === 0 ? bedTypesView.style.visibility = "hidden" : bedTypesView.style.visibility = "visible";
    // deleteStatusFunction - this parameter use for define delete button visibility in the table (if the delete status is true then the delete button will be visibility)
    fillDataIntoTable(bedTypesView, dataList, roominnerdisplayProperty, innerBedFormEditfunctionName,innerBedFormDeleteFunction, innerBedFormMoreFunctionName, innerBedFormdeleteStatusFunction ,true,roomdetailsPrivilage);
    $(document).ready(function () {
        $('#bedTypesView').DataTable();
        $('.dataTables_length').addClass('bs-select');

        bedTypesView_filter.classList.add('mb-3', 'pt-2');
        let searchInputDiv = bedTypesView_filter.children[0].children[0];
        searchInputDiv.classList.add('form-control');
    });
    maxRoomHeadCount = 0;
    dataList.data.forEach((roomdtls)=>{
        maxRoomHeadCount+=roomdtls.headcount;
    })
    totalHeadcount.innerHTML = maxRoomHeadCount;
}

refreshInnerFeaturesDetailsTable = (dataList) => {
    //displaying data list for employee table
    const featuresinnerdisplayProperty = [
        { dataType: 'text', propertyName: "feature" },
    ];
    featuresDetails.length === 0 ? FeaturesView.style.visibility = "hidden" : FeaturesView.style.visibility = "visible";
    // deleteStatusFunction - this parameter use for define delete button visibility in the table (if the delete status is true then the delete button will be visibility)
    fillDataIntoTable(FeaturesView, dataList, featuresinnerdisplayProperty,  innerFeaturesFormEditfunctionName,innerFeaturesFormDeleteFunction, innerFeaturesFormMoreFunctionName, innerFeaturesFormdeleteStatusFunction , true,roomdetailsPrivilage);
    $(document).ready(function () {
        $('#bedTypesView').DataTable();
        $('.dataTables_length').addClass('bs-select');

        bedTypesView_filter.classList.add('mb-3', 'pt-2');
        let searchInputDiv = bedTypesView_filter.children[0].children[0];
        searchInputDiv.classList.add('form-control');
    });
}



// Shoud pass as parameters (datalist,Id,nameof the field that display as the innre html)
const viewtypesDropDownCreate = (viewtypeslist) =>{
    dropDownCreate(viewtypeslist,viewTypeFormSelect,'type');
}
const roomTypeDropDown = (roomTypeList) =>{
    dropDownCreate(roomTypeList,roomTypeFormSelect,'name');
}
const bedTypeDropDown = (bedTypeList) =>{
    dropDownCreate(bedTypeList,bedTypeFormSelect,'type');
}
const roomStatusDropDown = (roomStatusList) =>{
    dropDownCreate(roomStatusList,roomStatusFormSelect,'status');
}



//Only for the bed function
let bedDetailsViewFunction = (element) =>{
    let roomRequestData = HTTPRequestService("GET", 'http://localhost:8080/room/detailsbedcountinroom?room_id=' + element.id).data;
    let mainDiv = document.createElement('div');
    roomRequestData.forEach(elementOfBedDetails => {
        const innerDiv = document.createElement('div');
        innerDiv.classList.add('d-flex', 'align-items-center');

        const innerSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        innerSvg.setAttribute('version', '1.1');
        innerSvg.setAttribute('viewBox', '0 0 2048 2048');
        innerSvg.setAttribute('width', '50');
        innerSvg.setAttribute('height', '50');
        innerSvg.classList.add('col-3');

        const innerPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        innerSvg.appendChild(innerPath);
        innerDiv.appendChild(innerSvg);
        if (elementOfBedDetails.bedType.type === 'Single') {
            innerPath.setAttribute('transform', 'translate(549,393)');
            innerPath.setAttribute('d', 'm0 0h947l20 2 21 5 20 8 15 8 17 12 13 12 8 8 10 13 8 13 8 15 6 16 5 21 2 23v394h32l28 1 24 3 25 6 20 7 25 12 19 12 12 9 10 8v2l4 2 14 14 9 11 9 12 10 16 10 19 8 20 6 20 4 20 2 18v182l-4 18-5 12-6 11-11 14-11 10-15 9-15 6-13 3-18 2h-13v129l-1 25-4 17-8 17-12 16-11 10-15 9-15 6-14 3-8 1h-19l-18-3-14-5-16-9-12-11-10-11-9-16-6-18-2-19-1-141h-1181l-1 151-3 15-6 16-9 14-8 10-11 9-11 7-15 6-16 4-9 1h-18l-14-2-16-5-17-9-15-13-10-13-6-10-5-13-3-13-1-9v-147l-2 1h-16l-19-3-13-4-16-8-11-8-9-8-10-13-6-10-6-15-3-15-1-11v-163l2-22 4-22 5-17 6-17 7-15 9-17 10-15 10-13 2-3h2l2-4 20-20 17-13 15-10 18-10 19-8 21-7 25-5 16-2 25-1h36v-354l1-49 3-20 4-15 6-16 10-19 11-16 10-11 1-2h2v-2l8-7 17-13 16-9 15-7 19-6 17-3zm3 65-15 2-15 5-15 8-10 8-13 13-10 16-6 15-3 12-1 7v400h225l1-165 3-18 6-17 9-15 9-11 10-9 14-9 14-6 19-4h498l17 3 15 6 12 7 10 8 3 1 2 4 9 10 9 16 5 13 3 15 1 27v139l1 5h225v-395l-2-16-5-16-7-14-8-11-7-8-16-12-16-8-17-5-9-1zm460 295-233 1-8 3-8 6-6 9-2 6-1 20v142l1 4h538v-165l-4-11-7-8-9-5-4-1zm-672 256-20 3-20 6-15 6-22 13-11 9-10 9-10 10-10 13-11 18-7 15-7 21-3 17-2 28v147l2 12 6 10 6 5 7 4 12 2h1580l25-1 10-4 8-6 4-6 3-10v-170l-3-22-7-24-9-20-10-16-7-9-9-10-11-11-16-12-15-9-15-7-18-6-12-3-18-2zm-34 412-2 2v142l3 10 4 6 8 6 5 2 7 1h11l8-2 8-5 6-7 3-8v-147zm1436 0-61 1-1 43v95l2 12 3 6 4 5 6 4 6 2 7 1h10l8-2 9-5 6-8 2-6v-148z');
        }

        if (elementOfBedDetails.bedType.type === 'Double') {
            innerPath.setAttribute('transform', 'translate(485,335)');
            innerPath.setAttribute('d', 'm0 0h1077l28 2 16 3 17 5 16 7 16 9 13 10 11 9 7 7 9 11 9 13 8 14 7 17 6 20 2 13 1 12 1 36v42l-1 186h32l32 2 27 4 23 6 18 6 24 10 19 10 19 12 19 14 13 12 8 7 10 10 7 8 13 16 12 18 10 17 8 16 8 19 8 24 6 25 2 12h2v489h-63v222l-1 2h-160l-1-2v-222h-1598v222l-1 2h-160l-1-1v-223h-63v-481l2-7 5-27 7-25 10-25 9-19 12-20 9-13 10-13 9-11 21-21 8-7 10-8 18-13 20-12 22-11 26-10 27-7 22-4 19-2 21-1h32v-255l3-31 7-24 7-16 10-18 13-16 7-8 7-7 14-11 11-7 12-7 15-6 20-6 23-3zm-3 65-21 2-15 4-16 8-13 10-10 10-7 9-6 11-6 15-3 18-1 16v248l92 1 3-1 1-126 2-20 5-17 7-14 9-12 9-10 14-10 16-8 15-4 22-2h277l26 2 15 4 16 8 9 6 8 7h2l2 4 7 8 8 13 5 11 4 15 1 9 1 136 124 1 3-1 1-126 2-20 5-17 7-14 9-12 8-9 13-10 16-8 17-5 22-2h277l26 2 15 4 16 8 9 6 11 9 8 10 8 13 5 11 4 15 1 9 1 136 92 1 3-1v-261l-2-16-6-18-9-16-12-13-10-9-14-8-12-5-12-3-24-2zm96 192-13 2-10 6-7 9-3 10-1 10v122l349 1 2-1v-132l-4-11-4-6-8-6-9-3-8-1zm608 0-13 2-10 6-7 9-3 10-1 10v122l348 1 3-1v-132l-4-11-4-6-8-6-9-3-8-1zm-900 224-20 1-26 4-25 7-15 6-19 9-21 13-22 18-18 18-11 14-9 13-9 15-11 23-7 21-5 20-3 25-1 23v153l6 1h1911l2-1v-176l-3-23-6-25-8-22-11-23-12-19-11-14-9-10-6-7-8-7-12-10-17-12-18-10-21-10-22-7-22-5-19-2-22-1zm-221 448-1 19v140l4 1h1912l3-1v-159zm64 224-1 23v136h31v-159zm1760 0-1 24v135h31v-159z');
        }

        if (elementOfBedDetails.bedType.type === 'Queen') {
            innerPath.setAttribute('transform', 'translate(372,204)');
            innerPath.setAttribute('d', 'm0 0h73l18 2 10 5 6 7 3 10 1 12v20l1088-1 1-1 1-25 3-14 6-8 8-4 8-2 12-1h75l38 1 9 3 8 7 5 9 1 4 1 582 8 11 13 18 11 15 10 14 13 18 14 19 52 72 14 19 26 36 11 15 39 54 14 19 10 14 13 18 14 19 10 14 13 18 12 17 4 7v599l-4 4-6 7-10 5-7 1h-267l-11-4-9-9-4-10-1-134h-1410l-1 132-3 10-6 8-8 5-13 2h-264l-9-3-6-4-6-7-3-5v-598l11-16 16-21 14-19 12-16 14-19 12-16 14-19 13-17 8-11 12-16 8-11 24-32 14-19 12-16 14-19 16-21 28-38 10-13 13-18 10-13 14-19 9-12 7-9 4-6 1-581 3-9 6-8 7-5 6-2zm-6 56v531h61v-531zm1263 0-1 24v506l1 1h60l1-1v-530zm-1146 55v476h65l1-116 2-19 6-23 9-21 10-16 8-10 1-3h2l7-8 10-9 16-11 19-10 18-6 20-4 12-1h175l21 2 18 4 20 8 18 10 13 10 13 12 8 9 9 13 9 16 8 21 4 17 2 22 1 113h40l1-120 3-21 6-20 7-16 8-14 10-13 9-10 8-8 15-11 16-9 13-6 21-6 12-2 12-1h175l21 2 17 4 16 6 16 8 12 8 10 8 12 11 12 15 9 15 6 12 8 24 3 18 1 68v57l1 1h64l1-1v-475zm200 274-14 3-15 6-11 7-10 8-8 8-7 10-8 15-5 17-1 6v108h348v-96l-2-20-5-16-9-17-9-11-11-10-13-8-11-5-14-4-7-1zm500 0-14 3-15 6-11 7-13 11-10 12-10 19-4 14-2 12v104h348v-104l-3-17-5-14-8-14-8-10-8-8-13-9-12-6-12-4-12-2zm-831 257-8 10-14 19-12 16-14 19-9 12-14 19-24 32-8 11-9 12-10 13-8 11-6 8-14 19-10 13-14 19-16 21-28 38-21 28-14 19-8 10-8 11v1h1882l-2-5-14-19-39-54-14-19-13-18-14-19-12-17-14-19-26-36-14-19-39-54-14-19-26-36-14-19-6-8zm-297 417v74h1937l1-1v-73zm0 130v108h1936l2-1v-107zm0 162v74h1938v-74zm0 130v103h204l3-1v-102zm1731 0-1 6v96l1 1h206l1-1v-102z');
        }

        if (elementOfBedDetails.bedType.type === 'King') {
            innerPath.setAttribute('transform', 'translate(1009)');
            innerPath.setAttribute('d', 'm0 0h34l1 2 16 6 12 7 14 12 18 18v2h2l7 8 61 61v2h2l7 8 48 48 8-1 64-16 54-14 45-11 16-2 17 1 11 3 12 5 11 7 10 9 8 9 8 14 5 13 2 10v22l-7 33-15 66-16 70-18 79-16 70-1 4h202l24 1 20 3 15 4 20 8 19 10 14 10 14 12 9 9 11 14 10 15 11 23 6 18 4 20 1 11 1 28v428l45 1 26 3 18 4 25 9 22 11 18 12 11 9 11 10 12 12 11 14 12 18 8 16 5 11 7 21 5 21 2-1v502h-2l-5 16-8 16-9 12-13 13-15 10-16 7-20 5-14 1v43l-3 17-4 12-8 16-9 12-7 8-14 11-14 8-16 6-10 3h-104l-26-9-14-8-11-9-10-10-8-11-10-19-5-19-1-8-1-43h-1295v39l-2 16-5 16-8 16-6 9-9 10-5 5-13 10-16 8-21 7h-105l-20-7-16-8-12-9-5-4-7-8-9-12-8-16-5-16-2-11v-45l-15-1-17-4-16-7-14-9-12-11-8-9-9-14-7-16-4-14v-489l9-36 8-21 11-21 8-12 10-13 9-10 7-8 10-9 13-10 17-11 19-10 21-8 25-6 13-2 13-1 45-1v-448l2-21 5-22 7-19 8-16 6-10 8-11 11-13 12-12 17-13 19-11 16-7 15-5 19-4 27-2h208l-4-20-15-66-23-101-25-110-5-24-1-8v-9l4-20 7-16 9-12 7-8 12-9 14-7 14-4 8-1h14l25 5 66 17 64 16 29 7 2-4 25-25 6-7 82-82 5-6h2l2-4 27-27 14-10 14-6 11-3zm11 68-11 10v2l-4 2v2h-2l-7 8-56 56v2h-2v2h-2v2h-2v2h-2l-6 7-67 67v2h-2v2h-2v2l-4 2-8 6-9 3h-15l-64-16-127-32-6 1-5 4-2 5v7l12 54 30 132 2 7h729l4-12 16-71 25-110v-7l-3-6-7-4-16 3-158 40-21 5h-15l-10-4-12-11-62-62-1-2h-2l-2-4-46-46-7-8-41-41-3-1zm-345 410 2 11 12 53 1 3 75 1h578l14-1 3-8 13-57v-2zm-277 137-16 3-12 4-15 8-12 9-12 12-9 13-8 16-5 18-1 6-1 450 1 6h72l-1-8-3-17-1-59v-100l1-65 3-16 5-15 7-13 8-11 10-11 12-9 12-7 16-6 16-3h435l15 3 12 4 17 9 10 8 10 9 11 15 8 17 4 13 2 11v228l-4 18-1 5h79l-2-11-2-10-1-14v-206l2-17 4-15 6-14 10-15 13-14 14-10 16-8 13-4 11-2h435l20 4 18 8 12 8 8 7h2l2 4 9 10 10 17 6 17 2 10 1 12v211l-1 14-4 18h73v-452l-2-14-6-18-9-17-8-10-11-11-13-9-16-8-17-5-7-1zm73 273-10 4-9 7-5 8-3 12v210l2 9 5 9 9 8 9 4 5 1h416l9-2 9-5 5-4 6-10 2-10v-212l-3-10-6-9-8-6-10-4zm683 0-9 3-9 7-4 5-4 8-1 5v217l4 10 6 8 10 6 9 3h417l9-2 10-6 7-8 4-10 1-11v-56l-1-154-7-14-9-7-11-4zm-957 341-18 2-19 5-16 7-14 8-12 9-13 12-9 11-10 15-8 17-6 18-3 21v461l3 10 8 10 11 6 12 2h1834l16-1 10-4 10-9 4-8 2-8v-457l-3-21-6-20-8-17-10-15-11-13-12-11-14-10-17-9-21-7-15-3-15-1zm-26 683v38l3 10 8 11 10 6 8 2h77l13-4 10-9 4-7 2-6 1-14v-27zm1570 0v35l2 10 4 8 5 5 8 6 10 3h76l12-3 8-6 7-8 3-9 1-26v-15z');
        }

        const innerDivDetails = document.createElement('div');
        innerDivDetails.classList.add('col-5', 'mx-2');
        innerDivDetails.innerHTML = elementOfBedDetails.bedType.type + ' X ' + elementOfBedDetails.bed_count + ' (' + elementOfBedDetails.bedType.type + ' Bed)';
        innerDiv.appendChild(innerDivDetails);
        mainDiv.appendChild(innerDiv);
    });
    console.log(mainDiv);
    return mainDiv;
}

//Room More View Display Property
const viewDisplayProperty = [
    { dataType: 'text', propertyName: "number" ,  tablehead : "Number" },
    { dataType: 'text', propertyName: "roomname" , tablehead : "Room Name" },
    { dataType: 'text', propertyName: "maxheadcount" , tablehead : "Maximum Head Count" },
    { dataType: 'text', propertyName: "roomprice" , tablehead : "Price" },
    { dataType: 'function', propertyName: roomstatesFunction , tablehead : "Room Status" },
    { dataType: 'function', propertyName: roomtypeFunction , tablehead : "Room Type" },
    { dataType: 'function', propertyName: viewtypeFunction , tablehead : "View Type" },
    { dataType: 'function', propertyName: bedDetailsViewFunction , tablehead : "Bed Details" },
];

// bed inner table edit function for the inner table
const innerBedFormEditfunctionName = (element, index) => {
    console.log("innerform Edit Funtion");
}

// bed inner table Delete function for the inner table
const innerBedFormDeleteFunction = (element, index, tableBody) => {
    bedDetails.splice(index, 1);
    bedDetailsObject.data = bedDetails;
    refreshInnerBedDetailsTable(bedDetailsObject,roomdetailsPrivilage);
}

// bed inner table More function for the inner table
const innerBedFormMoreFunctionName = (element, index) => {
    console.log("innerform More Funtion");
}

// this function use for define delete button visibility in the table (if the delete status is true then the delete button will be visibility)
const innerBedFormdeleteStatusFunction = (element) => {
return true;
}

// Features inner table edit function for the inner table
const innerFeaturesFormEditfunctionName = (element, index) => {
    console.log("innerform Edit Funtion");
}

// Features inner table Delete function for the inner table
const innerFeaturesFormDeleteFunction = (element, index, tableBody) => {
    featuresDetailsObject.data.splice(index, 1);
    refreshInnerFeaturesDetailsTable(featuresDetailsObject,roomdetailsPrivilage);
}

// Features inner table More function for the inner table
const innerFeaturesFormMoreFunctionName = (element, index) => {
    console.log("innerform More Funtion");
}

// this function use for define delete button visibility in the table (if the delete status is true then the delete button will be visibility)
const innerFeaturesFormdeleteStatusFunction = (element) => {
    return true;
}

//Bed details table
let roomBedTypeFunction = (element) =>{
    console.log(element);
    return ('<p class="text">'+element.bedType.type+'</p>');
}

featureaddBtn.addEventListener('click', () => {
    if (roomFeaturesTxt.value!==""){
        newFeatureDetails = HTTPRequestService("GET",'http://localhost:8080/feature/'+roomFeaturesTxt.value).data;
        featuresDetails.map(element => element.id).find(element => element === newFeatureDetails.id) ? alertFunction("Already added","This feature is already added","error") :featuresDetails.push(newFeatureDetails);
        //newFeatureDetails.map(element => element.id).find(element => element === featuresDetails.map(element => element.id)) ? alertFunction("Already added","This feature is already added","error") :featuresDetails.push(newFeatureDetails);
        refreshInnerFeaturesDetailsTable(featuresDetailsObject,roomdetailsPrivilage);
        bedTypeFormSelect.selectedIndex = 0;
    }
});

bedTypeAdd.addEventListener('click', () => {

    if (bedTypeFormSelect.value!=="" && bedCountTxt.value!==""){
        let betDeatailsDropDown = JSON.parse(bedTypeFormSelect.value);

        let beadheadcount = 0;
        if (betDeatailsDropDown.type === 'Single') beadheadcount = 1;
        if (betDeatailsDropDown.type === 'Double') beadheadcount = 2;
        if (betDeatailsDropDown.type === 'Queen') beadheadcount = 2;
        if (betDeatailsDropDown.type === 'King') beadheadcount = 3;

        let roomDetails = {bedType: betDeatailsDropDown, bed_count: bedCountTxt.value, headcount: beadheadcount*bedCountTxt.value};
        if (roomDetails.bedType.id=== bedDetails.map(element => element.bedType.id).find(element => element === roomDetails.bedType.id)){
            alertFunction("Bed Type Already Added","Do you want to add again ? <br><p type=\"button\" class=\"btn btn-outline-dark btn-sm mt-2\">Yes</p>","warning",()=>{
                //get index of the element
                let index = bedDetails.map(element => element.bedType.id).findIndex(element => element === roomDetails.bedType.id);
                bedDetails[index].bed_count = parseInt(bedDetails[index].bed_count) + parseInt(roomDetails.bed_count);
                bedDetails[index].headcount = parseInt(bedDetails[index].headcount) + parseInt(roomDetails.headcount);
                refreshInnerBedDetailsTable(bedDetailsObject,roomdetailsPrivilage);
                roomNamegenerationFunction();
            });
        }else {bedDetails.push(roomDetails);bedDetailsObject.data = bedDetails;refreshInnerBedDetailsTable(bedDetailsObject,roomdetailsPrivilage);roomNamegenerationFunction();}
        bedTypeFormSelect.selectedIndex = 0;
        bedCountTxt.value = "";

    }
});

bedDetailsObject.data = bedDetails;
featuresDetailsObject.data = featuresDetails;

viewTypeFormSelect.addEventListener('change',()=>{
    validationFunction(valdationFeildList, valdationDetailsList, inputForm, viewTypeFormSelect);
    validationFunction(valdationFeildList, valdationDetailsList, inputForm, roomNameTxt);
    roomNamegenerationFunction();
});

roomTypeFormSelect.addEventListener('change',()=>{
    validationFunction(valdationFeildList, valdationDetailsList, inputForm, roomTypeFormSelect);
    validationFunction(valdationFeildList, valdationDetailsList, inputForm, roomNameTxt);
    roomNamegenerationFunction();
});

roomTypeFormSelect.addEventListener('change',()=>{
    validationFunction(valdationFeildList, valdationDetailsList, inputForm, roomTypeFormSelect);
    validationFunction(valdationFeildList, valdationDetailsList, inputForm, roomNameTxt);
    roomNamegenerationFunction();
});

roomStatusFormSelect.addEventListener('change',()=>{
    validationFunction(valdationFeildList, valdationDetailsList, inputForm, roomStatusFormSelect);
});

roomPriceTxt.addEventListener('keyup',()=>{
    validationFunction(valdationFeildList, valdationDetailsList, inputForm, roomPriceTxt);
});

bedTypeFormSelect.addEventListener('change',()=>{
    roomDetailsButtonEnable();
});

bedCountTxt.addEventListener('keyup',()=>{
    roomDetailsButtonEnable();
});

ValidationButton.addEventListener('click', () => {
    /* have 4 parameters the 4th one is inputID the defalt value is set as feildID=null . if you need a validat specify input you should enter FeildID */
    //return true of false result of validation
    validationResult = validationFunction(valdationFeildList, valdationDetailsList, inputForm);
    if (validationResult) {
        if (bedDetails.length === 0){
            alertFunction("BedDetails should be need","Please add details of bed","error");
        }else if (bedDetails.length !== 0 && featuresDetails.length === 0){
            alertFunction("Features details not added","Do You want to add ? <br><p type=\"button\" class=\"btn btn-outline-dark btn-sm mt-2\">click me</p>","warning",()=>{
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
        if (bedDetails.length === 0){
            alertFunction("BedDetails should be need","Please add details of bed","error");
        }else if (bedDetails.length !== 0 && featuresDetails.length === 0){
            alertFunction("Features details not added","Do You want to add ? <br><p type=\"button\" class=\"btn btn-outline-dark btn-sm mt-2\">click me</p>","warning",()=>{
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

roomFeaturesTxt.addEventListener('keyup',(event)=>{
    dataListMatchingCheck(event,featureaddBtn);
});

roomFormClose.addEventListener('click',(event)=>{
    if (confirm("Are you sure ?")){
        formCloser();
    }
});

const formDataAddingFunction = () =>{
    room.bedTypes = bedDetails;
    room.maxheadcount = maxRoomHeadCount;
    room.featuresList = featuresDetails;
    let roomObject = formObjectCreate(valdationFeildList, room);
    console.log(roomObject);
    console.log(JSON.stringify(roomObject));
    let addedResponse = HTTPRequestService("POST", 'http://localhost:8080/room', JSON.stringify(roomObject));
    if (199 < addedResponse.status && addedResponse.status < 300) {
        window.alert("Add Successfully" + addedResponse.status);
        refreshRoomTable(HTTPRequestService("GET", 'http://localhost:8080/room'));
    } else if (399 < addedResponse.status && addedResponse.status < 500) {
        DynamicvalidationFunctioion(addedResponse.errorMessage, valdationFeildList, inputForm);
    } else window.alert("Add Failure " + addedResponse.status);
}

const formDataUpdateFunction = () =>{
    room.bedTypes = bedDetails;
    room.maxheadcount = maxRoomHeadCount;
    room.featuresList = featuresDetails;
    let roomObject = formObjectCreate(valdationFeildList, room);
    console.log(roomObject);
    console.log(JSON.stringify(roomObject));
    let addedResponse = HTTPRequestService("PUT", 'http://localhost:8080/room?room_id='+window['oldRoom'].id, JSON.stringify(roomObject));
    if (199 < addedResponse.status && addedResponse.status < 300) {
        window.alert("Add Successfully " + addedResponse.status);
        refreshRoomTable(HTTPRequestService("GET", 'http://localhost:8080/room'));
        formCloser();
    } else if (399 < addedResponse.status && addedResponse.status < 500) {
        DynamicvalidationFunctioion(addedResponse.errorMessage, valdationFeildList, inputForm);
    } else window.alert("Add Failure " + addedResponse.status);
}

const roomNamegenerationFunction = () => {
    if (viewTypeFormSelect.value !== "" && roomTypeFormSelect.value !== "") {
        let viewtype = JSON.parse(viewTypeFormSelect.value);
        let roomtype = JSON.parse(roomTypeFormSelect.value);
        roomNameTxt.value = viewtype.type + ' ' + roomtype.name + ' ' + maxRoomHeadCount + ' person';
    }
}
const roomDetailsButtonEnable = () =>{
    bedTypeFormSelect.value !=="" && bedCountTxt.value > 0 ? bedTypeAdd.classList.remove('disabled') : bedTypeAdd.classList.add('disabled');

    // if (bedTypeFormSelect.value !=="" && bedCountTxt.value > 0){ bedTypeAdd.classList.remove('disabled') ; console.log("remove disabled");}
    // else {bedTypeAdd.classList.add('disabled');console.log("add disabled");}
}

const valdationFeildList = [
    { id: 'viewTypeFormSelect', type: 'dropdown', validationStategy: 'selected', requird: true },
    { id: 'roomTypeFormSelect', type: 'dropdown', validationStategy: 'selected', requird: true },
    { id: 'roomNameTxt', type: 'text', validationStategy: 'nothing', requird: true },
    { id: 'roomPriceTxt', type: 'text', validationStategy: 'regexp', requird: true },
    { id: 'roomStatusFormSelect', type: 'dropdown', validationStategy: 'selected', requird: true },
];

const valdationDetailsList = {
    'roomPriceTxt': { pattern: '^[1-9][0-9]*(\\.[0-9]{1,2})?$'},
};

const defaulTextError = {
    'designationFormSelect': { pattern: "please select your designation!"},
    'FullNameTxt': {  pattern: "please enter valid full name!"}
};

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

const dataListMatchingCheck = (event,targetButton) =>{
    var inputText = event.target.value.toLowerCase();
    var datalistOptions = document.getElementById('roomFeaturesListOptions').getElementsByTagName('option');
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
    if (!matchFound) {
        targetButton.classList.add('disabled');
    } else {
        targetButton.classList.remove('disabled');
    }
}

const formCloser = ()=>{
    $('#roomForm').modal('hide');
    formClear(valdationFeildList,inputForm,defaulTextError);
    featuresDetails.splice(0, featuresDetails.length);
    bedDetails.splice(0, bedDetails.length);

    //set this featuresDetailsObject and bedDetailsObject to null
    featuresDetailsObject.data = featuresDetails;
    bedDetailsObject.data = bedDetails;
    refreshInnerBedDetailsTable(bedDetailsObject,roomdetailsPrivilage);
    refreshInnerFeaturesDetailsTable(featuresDetailsObject,roomdetailsPrivilage);
    bedTypeFormSelect.selectedIndex = 0;
    bedCountTxt.value = "";
    roomFeaturesTxt.value = "";
    inputForm.classList.remove('try-validated');
    refreshRoomTable(HTTPRequestService("GET",'http://localhost:8080/room'),userPrivilage);
}
