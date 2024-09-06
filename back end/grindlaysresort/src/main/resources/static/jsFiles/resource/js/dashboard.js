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
