const dataListCreate = (dataList, targetOptions, displayValue, valueoftheoption = null) => {
     const tableDropDownCreate = (datalist, targetOptions, displayValue, valueoftheoption) => {
          targetOptions.innerHTML = "";
          datalist.data.forEach(objects => {
               const dataListOption = document.createElement('option');

               // Handle nested properties for valueoftheoption
               if (valueoftheoption == null) {
                    dataListOption.value = JSON.stringify(objects);
               } else {
                    const nestedValue = getNestedProperty(objects, valueoftheoption);
                    dataListOption.value = nestedValue;
               }

               // Handle nested properties for displayValue
               const nestedDisplayValue = getNestedProperty(objects, displayValue);
               dataListOption.innerHTML = nestedDisplayValue;

               targetOptions.appendChild(dataListOption);
          });
     }

     if (dataList.errorMessage == null) {
          tableDropDownCreate(dataList, targetOptions, displayValue, valueoftheoption);
     } else {
          window.alert("Drop Down Create Error\n" + dataList.errorMessage);
     }
}

// Helper function to get nested property values
const getNestedProperty = (obj, path) => {
     return path.split('.').reduce((current, key) => {
          return current && current[key] !== undefined ? current[key] : '';
     }, obj);
}