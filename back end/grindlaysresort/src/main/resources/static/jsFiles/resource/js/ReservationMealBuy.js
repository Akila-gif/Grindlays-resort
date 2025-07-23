var reservationMealBuy = new Object();
var bedDetails = [];
var featuresDetails = [];
var bedDetailsObject = new Object();
var featuresDetailsObject = new Object();
let ItemSuggestionPrice = 0;
userPrivilage = HTTPRequestService("GET",'http://localhost:8080/privilege/Employee?user=admin').data;
MenuItemdetailsPrivilage = {select: false, insert: false, update: false, delete: true};
selectCustomerList = HTTPRequestService("GET",'http://localhost:8080/customers/getallnicmobilepassport');
reservationDetails = HTTPRequestService("GET",'http://localhost:8080/reservation');
window.addEventListener("load", () => {
    addingFormPrivilageHandeling(userPrivilage);
    dataListCreate(reservationDetails,ReservationDatalistOptions,'customer_id.full_name','reservation_number');
    refreshReservationMealTable(reservationDetails,userPrivilage);
});

const MenuItemFeatureDataList = (dataList) =>{
    addOptionToDatalist(dataList,MenuItemFeaturesListOptions,'feature','id');
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
refreshReservationMealTable = (dataList) => {

    // Filter out records where menu_id is null or undefined
    dataList.data = dataList.data.filter(objects => {
        return !objects.menu_id.length==0;
    });
    console.log(dataList.data);
    const displayProperty = [
        { dataType: 'text', propertyName: "reservation_number" },
        { dataType: 'function', propertyName: customerNameDetailsTableFunction },
        { dataType: 'function', propertyName: MenuDetailsTableFunction },
        { dataType: 'function', propertyName: TotalDetailsTableFunction }
    ];

    // deleteStatusFunction - this parameter use for define delete button visibility in the table (if the delete status is true then the delete button will be visibility)
    fillDataIntoTable(MenuView, dataList, displayProperty, EditfunctionName, DeleteFunctionName, MoreFunctionName,deleteStatusFunction, true,userPrivilage);   $(document).ready(function () {
        $('#MenuView').DataTable();
        $('.dataTables_length').addClass('bs-select');

        MenuView_filter.classList.add('mb-3', 'pt-2');
        let searchInputDiv = MenuView_filter.children[0].children[0];
        searchInputDiv.classList.add('form-control');
    });
}

//Main table function
// Main Table Edit Function
const EditfunctionName = (element, index) => {
    $('#MenuItemViewForm').modal('show');
    window['oldMenuItemView'] = element;
    featuresDetailsObject.data = element.featuresList;
    bedDetails = HTTPRequestService("GET",'http://localhost:8080/MenuItemView/detailsbedcountinMenuItem?MenuItem_id='+element.id).data;
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
    refreshInnerBedDetailsTable(bedDetailsObject,MenuItemdetailsPrivilage);
    refreshInnerFeaturesDetailsTable(featuresDetailsObject,MenuItemdetailsPrivilage);
    FormFill(element,valdationFeildList);
}

//Main Thable Delete Function
const DeleteFunctionName = (element, index, tableBody) => {

    let deleteConform = window.confirm("Are you sure ?\n"
        + "\nMenuItem Name " + element.full_name
        + "\nNIC " + element.nic_number
    );
    if (deleteConform) {
        const deleteServerResponse = 'OK';
        if (deleteServerResponse === 'OK') {
            let deleteResponse = HTTPRequestService("DELETE",'http://localhost:8080/MenuItem/'+element.id);
            if (199<deleteResponse.status && deleteResponse.status<300) {
                window.alert("Delete Successfull...");
                refreshMenuItemTable(HTTPRequestService("GET",'http://localhost:8080/MenuItem'));
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
    $('#MenuItemDetails').modal('show');
}

// this function use for define delete button visibility in the table (if the delete status is true then the delete button will be visibility)
const deleteStatusFunction = (element) => {
    return true;
}

//table function
// this function use for display the Ingredients details in the table
const customerNameDetailsTableFunction = (element) => {
    return ('<p class="text">'+element.customer_id.full_name+'</p>');
}
const MenuDetailsTableFunction = (element) => {
    var totalAmount = 0;
    element.menu_id.forEach((MenuDetails) => {
        totalAmount += MenuDetails.totalprice;
    });
    return ('<p class="text">'+totalAmount+'</p>');;
}

const TotalDetailsTableFunction = (element) => {
    var eleList = '<ol>';
    element.menu_id.forEach((MenuDetails) => {
        eleList += '<li class="text  bg-success  text-center rounded-pill m-1 p-1" style="list-style-type: none;">'
            + 'Menu Item : ' + MenuDetails.menu_name + ' ' + MenuDetails.quentity + '</li>';
    });
    eleList += '</ol>';
    return eleList;
}



// employee form privilage handeling for adding new MenuItem
const addingFormPrivilageHandeling = (userPrivilage) =>{
    if(userPrivilage.insert){
        $("#formOpenButton").css("visibility","visible");
    }
}


refreshInnerManuDetailsTable = (dataList) => {
    //displaying data list for employee table
    console.log(dataList);
    ItemSuggestionPrice = 0;
    const MenuIteminnerdisplayProperty = [
        { dataType: 'function', propertyName: MenuNameViewFunction},
        { dataType: 'function', propertyName: IncludedMenuItemViewFunction },
        { dataType: 'function', propertyName: IncludedMenuPriceFunction },
        { dataType: 'text', propertyName: "itemquentity" },
        { dataType: 'function', propertyName: TotalMenuPriceViewFunction }
    ];

    dataList.data.length === 0 ? SelectedMenuView.style.visibility = "hidden" : SelectedMenuView.style.visibility = "visible";
    // deleteStatusFunction - this parameter use for define delete button visibility in the table (if the delete status is true then the delete button will be visibility)
    fillDataIntoTable(SelectedMenuView, dataList, MenuIteminnerdisplayProperty, innerIngredientFormEditfunctionName,innerIngredientFormDeleteFunction, innerIngredientFormMoreFunctionName, innerIngredientFormdeleteStatusFunction ,true,MenuItemdetailsPrivilage);
    $(document).ready(function () {
        $('#SelectedMenuView').DataTable();
        $('.dataTables_length').addClass('bs-select');

        SelectedMenuView_filter.classList.add('mb-3', 'pt-2');
        let searchInputDiv = SelectedMenuView_filter.children[0].children[0];
        searchInputDiv.classList.add('form-control');
    });
}

refreshInnerFeaturesDetailsTable = (dataList) => {
    //displaying data list for employee table
    const featuresinnerdisplayProperty = [
        { dataType: 'text', propertyName: "feature" },
    ];
    featuresDetails.length === 0 ? FeaturesView.style.visibility = "hidden" : FeaturesView.style.visibility = "visible";
    // deleteStatusFunction - this parameter use for define delete button visibility in the table (if the delete status is true then the delete button will be visibility)
    fillDataIntoTable(FeaturesView, dataList, featuresinnerdisplayProperty,  innerFeaturesFormEditfunctionName,innerFeaturesFormDeleteFunction, innerFeaturesFormMoreFunctionName, innerFeaturesFormdeleteStatusFunction , true,MenuItemdetailsPrivilage);
    $(document).ready(function () {
        $('#bedTypesView').DataTable();
        $('.dataTables_length').addClass('bs-select');

        bedTypesView_filter.classList.add('mb-3', 'pt-2');
        let searchInputDiv = bedTypesView_filter.children[0].children[0];
        searchInputDiv.classList.add('form-control');
    });
}


// Shoud pass as parameters (datalist,Id,nameof the field that display as the innre html)
/*const menuDropDownCreate = (MenuItem) =>{
    console.log(MenuItem);
    dropDownCreate(MenuItem,menuItemFormSelect,'itemName');
}*/
const categoryDropDown = (MenuItemTypeList) =>{
    dropDownCreate(MenuItemTypeList,MenuCategoryFormSelect,'category');
}

//MenuItemView More View Display Property
/*
const viewDisplayProperty = [
    { dataType: 'text', propertyName: "number" ,  tablehead : "Number" },
    { dataType: 'text', propertyName: "MenuItemViewname" , tablehead : "MenuItemView Name" },
    { dataType: 'text', propertyName: "maxheadcount" , tablehead : "Maximum Head Count" },
    { dataType: 'text', propertyName: "MenuItemViewprice" , tablehead : "Price" },
    { dataType: 'function', propertyName: MenuItemViewstatesFunction , tablehead : "MenuItemView Status" },
    { dataType: 'function', propertyName: MenuItemViewtypeFunction , tablehead : "MenuItemView Type" },
    { dataType: 'function', propertyName: viewtypeFunction , tablehead : "View Type" },
    { dataType: 'function', propertyName: bedDetailsViewFunction , tablehead : "Bed Details" },
];
*/

// bed inner table edit function for the inner table
const innerIngredientFormEditfunctionName = (element, index) => {
    console.log("innerform Edit Funtion");
}

// bed inner table Delete function for the inner table
const innerIngredientFormDeleteFunction = (element, index, tableBody) => {
    bedDetails.splice(index, 1);
    bedDetailsObject.data = bedDetails;
    refreshInnerBedDetailsTable(bedDetailsObject,MenuItemViewdetailsPrivilage);
}

// bed inner table More function for the inner table
const innerIngredientFormMoreFunctionName = (element, index) => {
    console.log("innerform More Funtion");
}

// this function use for define delete button visibility in the table (if the delete status is true then the delete button will be visibility)
const innerIngredientFormdeleteStatusFunction = (element) => {
    return true;
}

// Features inner table edit function for the inner table
const innerFeaturesFormEditfunctionName = (element, index) => {
    console.log("innerform Edit Funtion");
}

// Features inner table Delete function for the inner table
const innerFeaturesFormDeleteFunction = (element, index, tableBody) => {
    featuresDetailsObject.data.splice(index, 1);
    refreshInnerFeaturesDetailsTable(featuresDetailsObject,MenuItemViewdetailsPrivilage);
}

// Features inner table More function for the inner table
const innerFeaturesFormMoreFunctionName = (element, index) => {
    console.log("innerform More Funtion");
}

// this function use for define delete button visibility in the table (if the delete status is true then the delete button will be visibility)
const innerFeaturesFormdeleteStatusFunction = (element) => {
    return true;
}

//Ingredients details table
let MenuNameViewFunction = (element) =>{
    return ('<p class="text">'+element.menu.name+'</p>');
}

let IncludedMenuItemViewFunction = (element) =>{
    var eleList = '<ol>';
    element.menu.menuHasMenuItems.forEach((MenuItemDetails) => {

        console.log(MenuItemDetails);
        eleList += '<li class="text  bg-success  text-center rounded-pill m-1 p-1" style="list-style-type: none;">'
            + 'Menu Item : ' + MenuItemDetails.menuitem.itemName + ' ' + MenuItemDetails.itemquentity + '</li>';
    });
    eleList += '</ol>';
    return eleList;
}

let IncludedMenuPriceFunction = (element) =>{
    return ('<p class="text">'+element.menu.per_amount_price+'</p>');
}

let TotalMenuPriceViewFunction = (element) =>{
    ItemSuggestionPrice+= element.menu.per_amount_price * element.itemquentity;
    return ('<p class="text">'+element.menu.per_amount_price * element.itemquentity+'</p>');
}

/*
featureaddBtn.addEventListener('click', () => {
    if (MenuItemViewFeaturesTxt.value!==""){
        newFeatureDetails = HTTPRequestService("GET",'http://localhost:8080/feature/'+MenuItemViewFeaturesTxt.value).data;
        featuresDetails.map(element => element.id).find(element => element === newFeatureDetails.id) ? alertFunction("Already added","This feature is already added","error") :featuresDetails.push(newFeatureDetails);
        //newFeatureDetails.map(element => element.id).find(element => element === featuresDetails.map(element => element.id)) ? alertFunction("Already added","This feature is already added","error") :featuresDetails.push(newFeatureDetails);
        refreshInnerFeaturesDetailsTable(featuresDetailsObject,MenuItemViewdetailsPrivilage);
        bedTypeFormSelect.selectedIndex = 0;
    }
});
*/

bedTypeAdd.addEventListener('click', () => {

    if (menuFormSelect.value!=="" && menuCountTxt.value!==""){
        let menuDeatailsDropDown = JSON.parse(menuFormSelect.value);

        let menuHasBuyerViewDetails = {menu: menuDeatailsDropDown, itemquentity: parseFloat(menuCountTxt.value),totalprice: parseFloat(menuDeatailsDropDown.per_amount_price) * parseFloat(menuCountTxt.value)};
        if (menuHasBuyerViewDetails.menu.id === bedDetails.map(element => element.menu.id).find(element => element === menuHasBuyerViewDetails.menu.id)){
            alertFunction("Ingredient Added","Do you want to add again ? <br><p type=\"button\" class=\"btn btn-outline-dark btn-sm mt-2\">Yes</p>","warning",()=>{
                //get index of the element
                let index = bedDetails.map(element => element.menu.id).findIndex(element => element === menuHasBuyerViewDetails.menu.id);
                bedDetails[index].needquentity = parseInt(bedDetails[index].itemquentity) + parseInt(menuHasBuyerViewDetails.itemquentity);
                bedDetails[index].headcount = parseInt(bedDetails[index].itemquentity) + parseInt(menuHasBuyerViewDetails.itemquentity);
                refreshInnerManuDetailsTable(bedDetailsObject,MenuItemdetailsPrivilage);

            });
        }else {bedDetails.push(menuHasBuyerViewDetails);bedDetailsObject.data = bedDetails;refreshInnerManuDetailsTable(bedDetailsObject,MenuItemdetailsPrivilage);}
        menuFormSelect.selectedIndex = 0;
        menuCountTxt.value = "";
    }
});

bedDetailsObject.data = bedDetails;
featuresDetailsObject.data = featuresDetails;






/*
MenuItemViewPriceTxt.addEventListener('keyup',()=>{
    validationFunction(valdationFeildList, valdationDetailsList, inputForm, MenuItemViewPriceTxt);
});
*/
const valdationFeildList = [
    { id: 'ReservationDtlTxt', type: 'text', validationStategy: 'nothing', requird: true}
];
const valdationDetailsList = {
    'ReservationDtlTxt': { pattern: '^[1-9][0-9]*(\\.[0-9]{1,2})?$'},
};


ValidationButton.addEventListener('click', () => {
    /*
        have 4 parameters the 4th one is inputID the defalt value is set as feildID=null . if you need a validat specify input you should enter FeildID
    */
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

const formDataAddingFunction = () =>{
    reservationMealBuy = bedDetails;
    //reservationMealBuy.maxheadcount = maxMenuItemViewHeadCount;
    reservationMealBuy.featuresList = featuresDetails;
    //let MenuItemViewObject = formObjectCreate(valdationFeildList, MenuItemView);
    console.log(reservationMealBuy);
    console.log(JSON.stringify(reservationMealBuy));
    let addedResponse = HTTPRequestService("POST", 'http://localhost:8080/reservationhasmenu/adduserbuymenu/'+ReservationDtlTxt.value, JSON.stringify(reservationMealBuy));
    if (199 < addedResponse.status && addedResponse.status < 300) {
        window.alert("Add Successfully" + addedResponse.status);
        reservationDetails = HTTPRequestService("GET",'http://localhost:8080/reservation');
    } else if (399 < addedResponse.status && addedResponse.status < 500) {
        DynamicvalidationFunctioion(addedResponse.errorMessage, valdationFeildList, inputForm);
    } else window.alert("Add Failure " + addedResponse.status);
}

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



console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");



// Function to load and populate menu dropdown
const loadCategoryMenuDropdown = () => {

    $.ajax({
        url: 'http://localhost:8080/menu',
        type: 'GET',
        dataType: 'json',
        success: function(menuData) {
            populateCategorizeMenuDropdown(menuData);
        },
        error: function(xhr, status, error) {
            console.error('Error loading menu data:', error);
            showNotification('Error loading menu data', 'error');
        }
    });
};

// Function to populate dropdown with categorized options
const populateCategorizeMenuDropdown = (menuData) => {
    const dropdown = $('#menuFormSelect');

    // Clear existing options except the first one
    dropdown.find('option:not(:first)').remove();

    // Group menus by category
    const categorizedMenus = {};

    menuData.forEach(menu => {
        const category = menu.menuCategory.category;
        if (!categorizedMenus[category]) {
            categorizedMenus[category] = [];
        }

        // Calculate available quantity for this menu
        const availableQuantity = calculateMenuAvailableQuantity(menu);
        menu.availableQuantity = availableQuantity; // Store for later use

        categorizedMenus[category].push(menu);
    });

    // Add optgroups for each category
    Object.keys(categorizedMenus).forEach(category => {
        const optgroup = $('<optgroup>').attr('label', category);

        categorizedMenus[category].forEach(menu => {
            const availableQty = menu.availableQuantity;
            const statusText = availableQty > 0 ? `(Available: ${availableQty})` : '(Out of Stock)';
            const isDisabled = availableQty === 0;

            const option = $('<option>')
                .val(JSON.stringify(menu))
                .text(`${menu.name} - Rs.${menu.per_amount_price.toFixed(2)} ${statusText}`)
                .data('menu-data', menu)
                .prop('disabled', isDisabled);

            // Add styling for out of stock items
            if (isDisabled) {
                option.css('color', '#dc3545'); // Bootstrap danger color
            }

            optgroup.append(option);
        });

        dropdown.append(optgroup);
    });
};
const calculateMenuAvailableQuantity = (menu) => {
    let minAvailableQuantity = Infinity;

    menu.menuHasMenuItems.forEach(menuHasItem => {
        const menuItemCount = parseInt(menuHasItem.menuitem.count);
        const requiredQuantity = parseFloat(menuHasItem.itemquentity);

        // Calculate how many times this menu can be made with this menu item
        const availableForThisItem = Math.floor(menuItemCount / requiredQuantity);

        // Take the minimum across all menu items
        minAvailableQuantity = Math.min(minAvailableQuantity, availableForThisItem);
    });

    // If no menu items found, return 0
    return minAvailableQuantity === Infinity ? 0 : minAvailableQuantity;
};

// Function to get selected menu data
const getSelectedCategorizeMenuData = () => {
    const selectedOption = $('#menuFormSelect option:selected');
    return selectedOption.data('menu-data');
};


// Call this function when the page loads
$(document).ready(function() {
    loadCategoryMenuDropdown();
});

console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

MenuItemViewFormClose.addEventListener('click',(event)=>{
    if (confirm("Are you sure ?")){
        formCloser();
    }
});

/*
const formDataAddingFunction = () =>{
    MenuItemView.bedTypes = bedDetails;
    MenuItemView.maxheadcount = maxMenuItemViewHeadCount;
    MenuItemView.featuresList = featuresDetails;
    let MenuItemViewObject = formObjectCreate(valdationFeildList, MenuItemView);
    console.log(MenuItemView);
    console.log(JSON.stringify(MenuItemViewObject));
    let addedResponse = HTTPRequestService("POST", 'http://localhost:8080/MenuItemViewww', JSON.stringify(MenuItemViewObject));
    if (199 < addedResponse.status && addedResponse.status < 300) {
        window.alert("Add Successfully" + addedResponse.status);
        refreshMenuItemViewTable(HTTPRequestService("GET", 'http://localhost:8080/MenuItemView'));
    } else if (399 < addedResponse.status && addedResponse.status < 500) {
        DynamicvalidationFunctioion(addedResponse.errorMessage, valdationFeildList, inputForm);
    } else window.alert("Add Failure " + addedResponse.status);
}
*/

const formDataUpdateFunction = () =>{
    MenuItemView.bedTypes = bedDetails;
    MenuItemView.maxheadcount = maxMenuItemViewHeadCount;
    MenuItemView.featuresList = featuresDetails;
    let MenuItemViewObject = formObjectCreate(valdationFeildList, MenuItemView);
    console.log(MenuItemViewObject);
    console.log(JSON.stringify(MenuItemViewObject));
    let addedResponse = HTTPRequestService("PUT", 'http://localhost:8080/MenuItemView?MenuItemView_id='+window['oldMenuItemView'].id, JSON.stringify(MenuItemViewObject));
    if (199 < addedResponse.status && addedResponse.status < 300) {
        window.alert("Add Successfully " + addedResponse.status);
        refreshMenuItemViewTable(HTTPRequestService("GET", 'http://localhost:8080/MenuItemView'));
        formCloser();
    } else if (399 < addedResponse.status && addedResponse.status < 500) {
        DynamicvalidationFunctioion(addedResponse.errorMessage, valdationFeildList, inputForm);
    } else window.alert("Add Failure " + addedResponse.status);
}

const MenuItemViewDetailsButtonEnable = () =>{
    bedTypeFormSelect.value !=="" && bedCountTxt.value > 0 ? bedTypeAdd.classList.remove('disabled') : bedTypeAdd.classList.add('disabled');

    // if (bedTypeFormSelect.value !=="" && bedCountTxt.value > 0){ bedTypeAdd.classList.remove('disabled') ; console.log("remove disabled");}
    // else {bedTypeAdd.classList.add('disabled');console.log("add disabled");}
}



const defaulTextError = {
    'designationFormSelect': { pattern: "please select your designation!"},
    'FullNameTxt': {  pattern: "please enter valid full name!"}
};

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

const dataListMatchingCheck = (event,targetButton) =>{
    var inputText = event.target.value.toLowerCase();
    var datalistOptions = document.getElementById('MenuItemViewFeaturesListOptions').getElementsByTagName('option');
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
    $('#MenuItemViewForm').modal('hide');
    formClear(valdationFeildList,inputForm,defaulTextError);
    featuresDetails.splice(0, featuresDetails.length);
    bedDetails.splice(0, bedDetails.length);

    //set this featuresDetailsObject and bedDetailsObject to null
    featuresDetailsObject.data = featuresDetails;
    bedDetailsObject.data = bedDetails;
    refreshInnerBedDetailsTable(bedDetailsObject,MenuItemViewdetailsPrivilage);
    refreshInnerFeaturesDetailsTable(featuresDetailsObject,MenuItemViewdetailsPrivilage);
    bedTypeFormSelect.selectedIndex = 0;
    bedCountTxt.value = "";
    MenuItemViewFeaturesTxt.value = "";
    inputForm.classList.remove('try-validated');
    refreshMenuItemViewTable(HTTPRequestService("GET",'http://localhost:8080/MenuItemView'),userPrivilage);
}