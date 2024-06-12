const formObjectCreate = (validationFeildList,object)=>{
     validationFeildList.forEach((element)=>{
          //elementID = document.getElementById(element.id);

          let inputElementID = document.getElementById(element.id);
          if(element.type =="checkbox"){
               console.log("checkbox");
               console.log(inputElementID.checked);
               object[inputElementID.name] = inputElementID.checked;
          }else if(element.type =="datalist"){
               object[inputElementID.name] = inputElementID.value;
               if (element.hasOwnProperty("url")) object[inputElementID.name] = HTTPRequestService("GET",element.url+inputElementID.value).data;  
          }else if(element.type =="radioButton"){
               if (inputElementID.checked) object[inputElementID.name] = inputElementID.value;
          }
          else if(inputElementID.hasAttribute('name')){
               try {
                    object[inputElementID.name] = JSON.parse(inputElementID.value);
               }catch (e){
                    if(inputElementID.value == "")object[inputElementID.name] = null;
                    else object[inputElementID.name] = inputElementID.value;
               }
          }
     });
     window[object] = object;
     return object;
}