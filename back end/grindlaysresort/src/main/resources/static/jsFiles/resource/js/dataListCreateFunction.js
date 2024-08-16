const dataListCreate = (datalist,tar,displayValue,value) => {
     if (datalist.errorMessage==null) listDropDownCreate(datalist,tar,displayValue,value);
     else window.alert("Drop Down Create Error\n"+datalist.errorMessage);
}

const listDropDownCreate = (datalist,tar,displayValue,value) => {
     tar.innerHTML = "";
     datalist.data.forEach(element => {
          let optionElemet = document.createElement("option");
          optionElemet.innerText = element[displayValue];
          optionElemet.value = element[value];
          tar.appendChild(optionElemet);
     });

}