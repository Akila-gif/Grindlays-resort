const objectCompairFunction = (oldObject,newObject,comparisonKey,comparisonStaregyfunction) => {
    let unmatched = new Object();

    comparisonKey.forEach(element=>{
        let ElementName = document.getElementById(element.id).name;
        console.log();
        try {
            if (!(JSON.stringify(oldObject[ElementName])===JSON.stringify(newObject[ElementName]))){
                if (comparisonStaregyfunction[element.id]===undefined) {
                    unmatched[ElementName] = newObject[ElementName];
                }
                else
                    unmatched[ElementName] = comparisonStaregyfunction[element.id].functions(newObject[ElementName]);
            }
        }catch (e) {}
    });
    return unmatched;
}