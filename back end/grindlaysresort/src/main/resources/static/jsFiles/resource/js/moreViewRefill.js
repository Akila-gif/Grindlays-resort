//add to data to the table
let moreReviewTable = (moreViewTableBody,viewDisplayProperty,elementObject) =>{
    moreViewTableBody.innerHTML = "";
    viewDisplayProperty.forEach(dataelement => {
        const trElement = document.createElement('tr');
        const thElement = document.createElement('th');
        const tdElement = document.createElement('td');
        thElement.innerHTML = dataelement.tablehead;
        thElement.setAttribute("scope", "row");
        if (dataelement.dataType === 'text') {tdElement.innerHTML = elementObject[dataelement.propertyName];}
        else if (dataelement.dataType === 'function') {
            console.log(elementObject);
            let returndataOfFunction = dataelement.propertyName(elementObject);
            typeof returndataOfFunction === 'object' ? tdElement.appendChild(returndataOfFunction) : tdElement.innerHTML = returndataOfFunction;
        }
        trElement.appendChild(thElement);
        trElement.appendChild(tdElement);
        console.log(trElement);
        moreViewTableBody.appendChild(trElement);
    });
}