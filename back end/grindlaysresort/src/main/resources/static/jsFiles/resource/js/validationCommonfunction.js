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
     if(ElimetOfValidateArray.validationStategy=="regexp" && ElimetOfValidateArray.requird){
          validationError = !regExpValidation(feildID,valdationDetailsList[ElimetOfValidateArray.id].pattern)
     }

     if(ElimetOfValidateArray.validationStategy=="function"){
          validationError = !valdationDetailsList[ElimetOfValidateArray.id].functions(valdationDetailsList[ElimetOfValidateArray.id].pattern,ElimetOfValidateArray.requird,feildID);
     }

     if(ElimetOfValidateArray.requird && feildID.value==""){
          validationError = true;
     }
     
     if(validationError){
          feildID.classList.add('in-valid');
          feildID.classList.remove('valid')
          let parentNode = feildID.parentNode.parentNode;
          let indexOfChild = parentNode.children[3];
          indexOfChild.classList.remove('hide');
     }else{
          validoperates++;
          feildID.classList.add('valid');
          feildID.classList.remove('in-valid');
          let parentNode = feildID.parentNode.parentNode;
          let indexOfChild = parentNode.children[3];
          indexOfChild.classList.add('hide');
     }
};
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
