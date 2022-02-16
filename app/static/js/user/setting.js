$(window).load(function(){
    "use strict";
    
    $("#logout").click(function(){

        sessionStorage.removeItem("idToken");
        sessionStorage.removeItem("accessToken");
        sessionStorage.setItem("nowLogout", "true");

        location.href = "/process/logout";
    });
});