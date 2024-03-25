const formClear = (fielddata)=>{

    fielddata.forEach(elementData=>{
        let element = document.getElementById(elementData.id)
        if (elementData.type==='dropdown'){
            element.selectedIndex = 0;
            if (inputForm.classList.contains('try-validated')){
                validationColorChange(element);
            }
        }
        if (elementData.type==='text' || elementData.type==='date'){
            element.value = "";
            if (inputForm.classList.contains('try-validated')){
                validationColorChange(element);
            }
        }
    });
}

const validationColorChange = (element)=>{
    element.classList.remove('in-valid');
    element.classList.remove('valid');
    let parentNode = element.parentNode.parentNode;
    let indexOfChild = parentNode.children[3];
    indexOfChild.classList.add('hide');
}
;