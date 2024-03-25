const formObjectCreate = (validationFeildList,object)=>{
     validationFeildList.forEach((element)=>{
          elementID = document.getElementById(element.id);
          let inputElementID = document.getElementById(element.id);
          try {
               object[inputElementID.name] = JSON.parse(elementID.value);
          }catch (e){
               object[inputElementID.name] = elementID.value;
          }
     });
     window[object] = object;
     return object;
}