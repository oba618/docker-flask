import { Const } from "../common/const.js";

$(window).load(function(){
    "use strict";
    
    const idToken = sessionStorage.getItem("idToken");
    const form = document.getElementById("adagePostForm");
    const inputTextTitle = document.getElementById("inputTextTitle");
    const postAdageButton = document.getElementById("postAdageButton");

    function hiddenAlert(id) {
        $(id).fadeOut();
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const XHR = new XMLHttpRequest();
        const FD  = new FormData(form);
        const formDataObj = Object.fromEntries(FD);

        // 成功の場合
        XHR.addEventListener("load", function(event) {
            $("#thanksAlert").fadeIn();
            inputTextTitle.value = "";
            setTimeout(hiddenAlert, 15*1000, "#thanksAlert");
        });
    
        // 失敗の場合
        XHR.addEventListener("error", function(event) {
            alert(XHR.response);
        });

        // リクエスト
        XHR.responseType = "text";
        XHR.open("POST", Const.BASE_PATH + "/adage");
        XHR.setRequestHeader( 'Content-Type', 'application/json' );
        XHR.setRequestHeader( 'Authorization', idToken );
        XHR.send(JSON.stringify(formDataObj));
    });
    console.log(idToken);

    // idTokenが空の場合
    if(idToken === null) {
        $("#loginAlert").fadeIn();
        inputTextTitle.disabled = true;
        postAdageButton.disabled = true;
    }

    // ログインした場合
    if(sessionStorage.getItem("nowLogin")) {
        sessionStorage.removeItem("nowLogin");
        $("#nowLoginAlert").fadeIn()
        setTimeout(hiddenAlert, 15*1000, "#nowLoginAlert")
    }
});