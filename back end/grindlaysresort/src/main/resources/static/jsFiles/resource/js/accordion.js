 
const crateAccordion = (parentsID,elementId,accordionItemDataList,accordionBodyDataList,clickingEventfuntion=null) =>{
    parentsID.innerHTML = '';
    let accordionDiv = document.createElement('div');
    accordionDiv.classList.add('accordion','accordion-flush');
    accordionDiv.id = elementId;

    accordionItemDataList.forEach((item,index)=>{
        let accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item');

        let accordionHeader = document.createElement('h2');
        accordionHeader.classList.add('accordion-header');

        let accordionButton = document.createElement('button');
        accordionButton.classList.add('accordion-button','collapsed');
        accordionButton.type = 'button';
        accordionButton.setAttribute('data-bs-toggle','collapse');
        accordionButton.setAttribute('data-bs-target',`#collapse${index}`);
        accordionButton.setAttribute('aria-expanded','true');
        accordionButton.setAttribute('aria-controls',`collapse${index}`);
        accordionButton.innerHTML = item.category_name;
        accordionHeader.appendChild(accordionButton);
        accordionItem.appendChild(accordionHeader);

        let accordionBody = document.createElement('div');
        accordionBody.id = `collapse${index}`;
        accordionBody.classList.add('accordion-collapse','collapse');
        accordionBody.setAttribute('data-bs-parent',`#${elementId}`);

        let accordionBodyContainer = document.createElement('div');
        accordionBodyContainer.classList.add('accordion-body');
        accordionBodyContainer.style.display = 'flex';
        accordionBodyContainer.style.flexWrap = 'wrap';
        accordionBodyContainer.style.gap = '2px';

        accordionBodyDataList(item).forEach((bodyItem,bodyIndex)=>{
            let colorArrange = ['text-bg-primary','text-bg-secondary','text-bg-success','text-bg-danger','text-bg-warning','text-bg-info','text-bg-dark'];
            let bodyDiv = document.createElement('h5');
            bodyDiv.classList.add('btn','badge','rounded-pill','text-bg-primary','p-3','fs-5');
            bodyDiv.classList.add(colorArrange[bodyIndex%colorArrange.length]);
            bodyDiv.setAttribute('value',JSON.stringify(bodyItem));
            //if (clickingEvent!=null)bodyDiv.addEventListener('click',clickingEvent(bodyItem));
            if (clickingEventfuntion!=null)bodyDiv.addEventListener('click',()=>{clickingEventfuntion(bodyItem)});
            bodyDiv.innerHTML = bodyItem.name;
            accordionBodyContainer.appendChild(bodyDiv);
        });

        accordionBody.appendChild(accordionBodyContainer);
        accordionItem.appendChild(accordionBody);
        accordionDiv.appendChild(accordionItem);
        parentsID.appendChild(accordionDiv);
    });
}