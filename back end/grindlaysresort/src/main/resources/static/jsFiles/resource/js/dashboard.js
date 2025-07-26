/* Created by Tivotal */

let btn = document.querySelector(".fa-bars");
let sidebar = document.querySelector(".sidebar");

btn.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

let arrows = document.querySelectorAll(".arrow");
for (var i = 0; i < arrows.length; i++) {
    arrows[i].addEventListener("click", (e) => {
        let arrowParent = e.target.parentElement.parentElement;

        arrowParent.classList.toggle("show");
    });
}

document.getElementById('toggle-icon').addEventListener('click', function() {
    const icon = this;
    if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-arrow-left');
    } else {
        icon.classList.remove('fa-arrow-left');
        icon.classList.add('fa-bars');
    }
});
logoutBtn.addEventListener("click", (e) => {
   if(window.confirm("Are you sure you want to logout?")){
       window.location.href='http://localhost:8080/logout'
   }
});

function loademployee(urlstr){
    viewIframId.src = urlstr;
}

console.log(userNameField.value);

// Use fetch properly with Promise chain
console.log()
window['logedUser'] = userNameField.value;


if (userNameField.value!="admin"){
    fetch("http://localhost:8080/privilege/gettingAllPrivilageOfLogedUser/"+userNameField.value)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json(); // Parse the JSON from the response
        })
        .then(userPrivileges => {
            console.log('User privileges:', userPrivileges);

            // Now we can use forEach because userPrivileges is an array
            userPrivileges.forEach(element => {
                let menuElement = document.getElementById(element.moduleName+"Menu");
                if (menuElement) {
                    if (element.privilage.select || element.privilage.update || element.privilage.delete || element.privilage.insert) {
                        menuElement.style.display = "block";
                        if (element.moduleName+"Menu" === "EmployeeMenu" || 
                            element.moduleName+"Menu" === "UserMenu" || 
                            element.moduleName+"Menu" === "PrivilegeMenu") {
                            document.getElementById("AdministrateMenu").style.display = "block";
                        }
                        if (element.moduleName+"Menu" === "MenuMenu" ||
                            element.moduleName+"Menu" === "MenuItemMenu" ||
                            element.moduleName+"Menu" === "IngredientMenu") {
                            document.getElementById("KitchenMenu").style.display = "block";
                        }
                    } else {
                        menuElement.style.display = "none";
                    }
                } else {
                    console.warn(`Menu element not found for ${element.moduleName}Menu`);
                }
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });


}
else {
    document.getElementById("AdministrateMenu").style.display = "block";
    document.getElementById("KitchenMenu").style.display = "block";
}
console.log(window['logedUser'] = userNameField.value);