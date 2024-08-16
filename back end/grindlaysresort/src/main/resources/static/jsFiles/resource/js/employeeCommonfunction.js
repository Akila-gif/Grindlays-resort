const fillDataIntoTable = (
     Tableid,
     datalist,
     displayProperty,
     editFunction,
     deleteFunction,
     printFunction,
     deleteStatusFunction,
     buttonVisibility = true,
     userPrivilage = null
) => {
     if (datalist.errorMessage == null)
          fillRowDataIntoTable(
               Tableid,
               datalist,
               displayProperty,
               editFunction,
               deleteFunction,
               printFunction,
               deleteStatusFunction,
               (buttonVisibility = true),
               userPrivilage
          );
     else window.alert("Table loding Error\n" + datalist.errorMessage);
};
const fillRowDataIntoTable = (
     Tableid,
     datalist,
     displayProperty,
     editFunction,
     deleteFunction,
     printFunction,
     deleteStatusFunction,
     buttonVisibility = true,
     userPrivilage
) => {
     const tableBody = Tableid.children[1];
     tableBody.innerHTML = "";

     datalist.data.forEach((element, index) => {
          const trElement = document.createElement("tr");

          const tdIndex = document.createElement("td");
          tdIndex.innerHTML = index + 1;
          trElement.appendChild(tdIndex);
          displayProperty.forEach((dataelement, index) => {
               const td = document.createElement("td");
               if (dataelement.dataType == "text") {
                    td.innerHTML = element[dataelement.propertyName];
                    trElement.appendChild(td);
               }
               if (dataelement.dataType == "function") {
                    let retunInnerElemnt = dataelement.propertyName(element);
                    if (typeof retunInnerElemnt != "object") {
                         td.innerHTML = retunInnerElemnt;
                    } else {
                         td.appendChild(retunInnerElemnt);
                    }
                    trElement.appendChild(td);
               }
          });

          const tdButton = document.createElement("td");

          if (userPrivilage.update) {
               const EditButton = document.createElement("p");
               EditButton.className = "btn btn-warning mx-1";
               EditButton.innerHTML = '<i class="fa fa-pen" aria-hidden="true"></i>';
               EditButton.addEventListener("mouseover", () => {
                    EditButton.innerHTML = '<i class="fa-solid fa-pen fa-beat-fade"></i>';
               });
               EditButton.addEventListener("mouseout", () => {
                    EditButton.innerHTML = '<i class="fa fa-pen" aria-hidden="true"></i>';
               });

               EditButton.addEventListener("click", () => {
                    console.log("Edit button click");
                    editFunction(element, index);
               });
               tdButton.appendChild(EditButton);
          }

          if (userPrivilage.delete) {
               const DeleteButton = document.createElement("p");
               DeleteButton.className = "btn btn-danger mx-1";
               DeleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
               if (!deleteStatusFunction(element)) {
                    DeleteButton.classList.add("disabled");
                    DeleteButton.style.cursor = "not-allowed";

               }
               DeleteButton.addEventListener("mouseover", () => {
                    DeleteButton.innerHTML = '<i class="fa-solid fa-trash fa-shake"></i>';
               });
               DeleteButton.addEventListener("mouseout", () => {
                    DeleteButton.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
               });

               DeleteButton.addEventListener("click", () => {
                    console.log("Delete button click");
                    deleteFunction(element, index, tableBody);
               });
               tdButton.appendChild(DeleteButton);
          }

          if (userPrivilage.select) {
               const PrintButton = document.createElement("p");
               PrintButton.className = "btn btn-primary mx-1";
               PrintButton.innerHTML = '<i class="fa fa-print" aria-hidden="true"></i>';
               PrintButton.addEventListener("mouseover", () => {
                    PrintButton.innerHTML = '<i class="fa-solid fa-print fa-beat"></i>';
               });
               PrintButton.addEventListener("mouseout", () => {
                    PrintButton.innerHTML = '<i class="fa fa-print" aria-hidden="true"></i>';
               });

               PrintButton.addEventListener("click", () => {
                    console.log(element);
                    printFunction(element, index);
               });
               tdButton.appendChild(PrintButton);
          }
          const MoreButton = document.createElement("button");
/*
          MoreButton.className = "btn btn-dark mx-1";
          MoreButton.setAttribute("data-bs-toggle", "dropdown");
          MoreButton.setAttribute("aria-expanded", "false");

          MoreButton.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';

          tdButton.appendChild(MoreButton);
*/

          if (buttonVisibility) trElement.appendChild(tdButton);

          tableBody.appendChild(trElement);
     });
};
