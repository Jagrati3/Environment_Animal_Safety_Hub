/* =========================
   PROFILE PAGE SCRIPT
========================= */

document.addEventListener("DOMContentLoaded", () => {

    setupTabs();
    setupEditProfile();

});


/* =========================
   TAB SWITCHING
========================= */

function setupTabs(){

    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabButtons.forEach(button => {

        button.addEventListener("click", () => {

            const target = button.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabPanes.forEach(pane => pane.classList.remove("active"));

            button.classList.add("active");
            document.getElementById(target).classList.add("active");

        });

    });

}


/* =========================
   EDIT PROFILE
========================= */

function setupEditProfile(){

    const editBtn = document.getElementById("editBtn");

    const usernameDisplay = document.getElementById("usernameDisplay");
    const emailDisplay = document.getElementById("emailDisplay");

    const usernameInput = document.getElementById("usernameInput");
    const emailInput = document.getElementById("emailInput");

    let editing = false;

    editBtn?.addEventListener("click", () => {

        if(!editing){

            usernameInput.value = usernameDisplay.textContent;
            emailInput.value = emailDisplay.textContent;

            usernameInput.style.display = "block";
            emailInput.style.display = "block";

            usernameDisplay.style.display = "none";
            emailDisplay.style.display = "none";

            editBtn.textContent = "Save Profile";

            editing = true;

        }else{

            usernameDisplay.textContent = usernameInput.value;
            emailDisplay.textContent = emailInput.value;

            usernameInput.style.display = "none";
            emailInput.style.display = "none";

            usernameDisplay.style.display = "block";
            emailDisplay.style.display = "block";

            editBtn.textContent = "Edit Profile";

            editing = false;

        }

    });

}