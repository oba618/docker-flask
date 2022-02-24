$(window).load(function(){
    "use strict";
    
    $("#logout").click(function(){

        sessionStorage.removeItem("idToken");
        sessionStorage.removeItem("accessToken");
        sessionStorage.setItem('alertString', 'logout');

        location.href = "/process/logout";
    });
});