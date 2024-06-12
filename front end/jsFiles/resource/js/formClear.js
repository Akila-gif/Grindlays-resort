const formClear = (fielddata,formId,defaultError)=>{

    fielddata.forEach(elementData=>{
        let element = document.getElementById(elementData.id)
        if (elementData.type==='dropdown'){
            element.disabled = false;
            element.selectedIndex = 0;
            if (formId.classList.contains('try-validated')){
                validationColorChange(element,defaultError);
            }
        }
        if (elementData.type==='text' || elementData.type==='date' || elementData.type==='datalist'){
            element.value = "";
            if (formId.classList.contains('try-validated')){
                validationColorChange(element,defaultError);
            }
        }
        if (elementData.type==='radioButton' || elementData.type==='checkbox'){
            element.checked = false;
            if (formId.classList.contains('try-validated')){
                validationColorChange(element,defaultError);
            }
        }
    });
}

const validationColorChange = (element,defaultError)=>{
    element.classList.remove('in-valid');
    element.classList.remove('valid');
    let parentNode = element.parentNode.parentNode;
    let indexOfChild = parentNode.children[3];
    indexOfChild.innerHTML = defaultError[element.id].pattern;
    indexOfChild.classList.add('hide');
}
;