window.addEventListener("load", () => {
    "use strict";

    const navBars = document.getElementById("navBars");
    const navBarsList = document.getElementById("navBarsList");
    
    navBars.addEventListener("click", () => {
        if(navBarsList.style.display == "block") {
            navBarsList.style.display ="none";
        }
        else{
            navBarsList.style.display ="block";
        }
    })
});
