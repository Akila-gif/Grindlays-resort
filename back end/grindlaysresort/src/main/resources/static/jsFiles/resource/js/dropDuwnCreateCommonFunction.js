const dropDownCrete = (dataArray,tar,displayValue)=>{
    dataArray.forEach(objects=>{
        const dropdownOption = document.createElement('option');
        dropdownOption.value = JSON.stringify(objects);
        dropdownOption.innerHTML = objects[displayValue];
        tar.appendChild(dropdownOption);
    })
}