const FormFill = (objectData,inputElementDetails) =>{

    inputElementDetails.forEach(element=>{
        var Inputelement =  document.getElementById(element.id);
        if (element.type==='dropdown'){
            let dropDownObject = objectData[Inputelement.name];
            if (element.hasOwnProperty('objectId')){
                var elementObject;
                element['objectId'].forEach(ids =>{
                    elementObject = ids;
                });
                selectIndexing(Inputelement,elementObject,dropDownObject[element.objectId])
            }else{
                if (element.hasOwnProperty('static')) {
                    selectIndexing(Inputelement,elementObject,dropDownObject)
                }
                else{selectIndexing(Inputelement,'id',dropDownObject['id'])}
            }
        }

        if (element.type==='text' || element.type==='date' || element.type==='datalist'){
            Inputelement.value = objectData[Inputelement.name];
        }

        if (element.type==='checkbox'){
            Inputelement.checked = objectData[Inputelement.name];
        }

        if (element.type==='radioButton'){
            radioAutofill(Inputelement.name,objectData[Inputelement.name]);
        }
    })

}

const selectIndexing = (dropDownElement,objId,dropDownSelectedId) =>{
    let i;
    for (i=0;i<dropDownElement.children.length;i++){
        try {
            if (typeof objId==='undefined'){
                if (dropDownElement.children[i].value.toString() === dropDownSelectedId.toString()){
                    break;
                }
            }
            else if (JSON.parse(dropDownElement.children[i].value)[objId] === dropDownSelectedId){
                break;
            }
        }catch (e){}
    }
    dropDownElement.selectedIndex = i;
}

const radioAutofill = (onjectName,valueOfField) => {
    var allElement = document.querySelectorAll("input[name='"+onjectName+"']");
    allElement.forEach((element) =>{
         if(element.value==valueOfField){
            console.log(element.value);
              element.checked = true;
         }
    })
};