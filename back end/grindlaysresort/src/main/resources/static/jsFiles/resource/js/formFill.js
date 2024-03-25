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
                selectIndexing(Inputelement,'id',dropDownObject['id'])
            }
        }

        if (element.type==='text' || element.type==='date'){
            Inputelement.value = objectData[Inputelement.name];
        }
    })

}

const selectIndexing = (dropDownElement,objId,dropDownSelectedId) =>{
    let i;
    for (i=0;i<dropDownElement.children.length;i++){
        try {
            if (JSON.parse(dropDownElement.children[i].value)[objId] === dropDownSelectedId){
                break;
            }
        }catch (e){}
    }
    dropDownElement.selectedIndex = i;
}