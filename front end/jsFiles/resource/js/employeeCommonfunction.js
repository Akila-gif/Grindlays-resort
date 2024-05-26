const fillDataIntoTable = (Tableid,datalist,displayProperty,editFunction,deleteFunction,printFunction,buttonVisibility = true)=>{
    if (datalist.errorMessage==null) fillRowDataIntoTable(Tableid,datalist,displayProperty,editFunction,deleteFunction,printFunction,buttonVisibility = true);
    else window.alert("Table loding Error\n"+datalist.errorMessage);
}
const fillRowDataIntoTable = (Tableid,datalist,displayProperty,editFunction,deleteFunction,printFunction,buttonVisibility = true)=>{
 
     const tableBody = Tableid.children[1];
     tableBody.innerHTML = '';
     
     datalist.data.forEach((element,index) => {
     const trElement = document.createElement('tr');

     const tdIndex = document.createElement('td');
     tdIndex.innerHTML = index+1;
     trElement.appendChild(tdIndex);
     displayProperty.forEach((dataelement,index) =>{
          const td = document.createElement('td');
          if (dataelement.dataType=='text') {
               td.innerHTML = element[dataelement.propertyName];
               trElement.appendChild(td);
          }
          if (dataelement.dataType=='function') {
                let retunInnerElemnt = dataelement.propertyName(element);
                if (typeof(retunInnerElemnt)!="object"){                    
                    td.innerHTML = retunInnerElemnt;
                } else{
                    td.appendChild(retunInnerElemnt);
                }
               trElement.appendChild(td);
          }
     });

     const tdButton = document.createElement('td');
     const EditButton = document.createElement('button');
     const DeleteButton = document.createElement('button');
     const PrintButton = document.createElement('button');
     const MoreButton = document.createElement('button');
     
     
     EditButton.className = "btn btn-warning mx-1";
     DeleteButton.className = "btn btn-danger mx-1"
     PrintButton.className = "btn btn-primary mx-1"
     MoreButton.className = "btn btn-dark mx-1"
     MoreButton.setAttribute("data-bs-toggle","dropdown");
     MoreButton.setAttribute("aria-expanded","false");
     
     
     EditButton.innerHTML = '<i class="fa fa-pen" aria-hidden="true"></i>';
     DeleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
     PrintButton.innerHTML = '<i class="fa fa-print" aria-hidden="true"></i>';
     MoreButton.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
     
     EditButton.addEventListener('mouseover', () => {
         EditButton.innerHTML = '<i class="fa-solid fa-pen fa-beat-fade"></i>';
     });
     EditButton.addEventListener('mouseout', () => {
         EditButton.innerHTML = '<i class="fa fa-pen" aria-hidden="true"></i>';
     });
     
     EditButton.addEventListener('click', () => {
         console.log("Edit button click");
         editFunction(element,index);
     });
     
     DeleteButton.addEventListener('mouseover', () => {
         DeleteButton.innerHTML = '<i class="fa-solid fa-trash fa-shake"></i>';
     });
     DeleteButton.addEventListener('mouseout', () => {
         DeleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
     });

     DeleteButton.addEventListener('click', () => {
         console.log("Delete button click");
         deleteFunction(element,index,tableBody);
     });
     
     PrintButton.addEventListener('mouseover', () => {
         PrintButton.innerHTML = '<i class="fa-solid fa-print fa-beat"></i>';
     });
     PrintButton.addEventListener('mouseout', () => {
         PrintButton.innerHTML = '<i class="fa fa-print" aria-hidden="true"></i>';
     });

     PrintButton.addEventListener('click', () => {
         console.log(element);
         printFunction(element,index);
     });

     
     tdButton.appendChild(EditButton);
     tdButton.appendChild(DeleteButton);
     tdButton.appendChild(PrintButton);
     tdButton.appendChild(MoreButton);
     
     if (buttonVisibility)
        trElement.appendChild(tdButton);
     
     tableBody.appendChild(trElement);
     
     });
}

