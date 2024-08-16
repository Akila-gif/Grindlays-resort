let validationError = false;
const validationFunction = (valdationFeildList,valdationDetailsList,formID,feildID=null) => {
     validoperates =0;
     if (feildID == null) {

          formID.classList.add("try-validated");
          valdationFeildList.forEach(element => {

               let inputfield =  document.getElementById(element.id);
               
               Validationfunction(element,valdationDetailsList,inputfield);
          });
     } else if(feildID != null && formID.classList.contains('try-validated')){

          let ElimetOfValidateArray;
          valdationFeildList.map(idCatchFunction);
          function idCatchFunction(el){
               if(el.id==feildID.id){
                    ElimetOfValidateArray =  el;
               }  
          }

          Validationfunction(ElimetOfValidateArray,valdationDetailsList,feildID);
     }
     if (valdationFeildList.length==validoperates) {
          return true;
     }
     return false;
}    
const Validationfunction =(ElimetOfValidateArray,valdationDetailsList,feildID) => {
     validationError = false;   
     
     if(ElimetOfValidateArray.type=="radioButton" && ElimetOfValidateArray.requird){
          validationError = !radioButtonValidation(feildID,feildID.name);
     }

     else if(ElimetOfValidateArray.validationStategy=="regexp" && ElimetOfValidateArray.requird){
          validationError = !regExpValidation(feildID,valdationDetailsList[ElimetOfValidateArray.id].pattern);
     }

     else if(ElimetOfValidateArray.validationStategy=="function"){
          validationError = !valdationDetailsList[ElimetOfValidateArray.id].functions(valdationDetailsList[ElimetOfValidateArray.id].pattern,ElimetOfValidateArray.requird,feildID);
     }

     else if(ElimetOfValidateArray.requird && feildID.value==""){
          validationError = true;
          console.log(ElimetOfValidateArray);
     }
     
     if(validationError){
          if(ElimetOfValidateArray.type!="radioButton"){
               feildID.classList.add('in-valid');
               feildID.classList.remove('valid')
          }
          let parentNode = feildID.parentNode.parentNode;
          let indexOfChild = parentNode.children[3];
          indexOfChild.classList.remove('hide');
     }else{
          validoperates++;
          if(ElimetOfValidateArray.type!="radioButton"){
               feildID.classList.add('valid');
               feildID.classList.remove('in-valid');
          }
          let parentNode = feildID.parentNode.parentNode;
          let indexOfChild = parentNode.children[3];
          indexOfChild.classList.add('hide');
     }
};

const DynamicvalidationFunctioion = (responseErroeList,valdationFeildList,formId) =>{
     if(responseErroeList!=null) {
          valdationFeildList.forEach(element =>{
               let getInputId = document.getElementById(element.id);
               if(responseErroeList.hasOwnProperty(getInputId.name)) {
                    console.log(responseErroeList[getInputId.name]);
                    getInputId.classList.add('in-valid');
                    getInputId.classList.remove('valid')
                    let parentNode = getInputId.parentNode.parentNode;
                    let indexOfChild = parentNode.children[3];
                    indexOfChild.innerHTML = responseErroeList[getInputId.name];
                    indexOfChild.classList.remove('hide');
               }
          });
     }
}

let regExpValidation = (inputID,regexpPatton) =>{ 
     
     /* 
     if patton is equalto value or patton is empty return value as true 
     if not return false
     */
     
     if (regexpPatton!="") {
          regObject = new RegExp(regexpPatton);
          return (regObject.test(inputID.value));
     } else {
          return true;
     }
     
}

let radioButtonValidation = (inputID,name) =>{
     validationResult = false;
     var allElement = document.querySelectorAll("input[name='gender']");
     allElement.forEach((element) =>{
          if(element.checked){
               validationResult = true;
          }
     });

     return validationResult;
}

