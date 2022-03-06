import { Const } from "../common/const.js";

$(window).load(function(){
    "use strict";
    
    const idToken = sessionStorage.getItem("idToken");
    const form = document.getElementById("adagePostForm");
    const inputTextTitle = document.getElementById("inputTextTitle");
    const inputTextEpisode = document.getElementById("inputTextEpisode");
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
            if(XHR.response.errorCode >= 400) {
                loginAlert.innerHTML = [
                    XHR.response.errorCode,
                    XHR.response.phrase,
                    XHR.response.message
                ].join("<br>")
                $("#loginAlert").fadeIn();
            }
            else {
                $("#thanksAlert").fadeIn();
                inputTextTitle.value = "";
                inputTextEpisode.value = "";
                setTimeout(hiddenAlert, 15*1000, "#thanksAlert");
            }
        });
    
        // 失敗の場合
        XHR.addEventListener("error", function(event) {
            alert(XHR.response);
        });

        // ゲストユーザ: リクエスト
        if(idToken === null) {
            XHR.responseType = "json";
            XHR.open("POST", Const.BASE_PATH + "/adage/guest");
            XHR.setRequestHeader( 'Content-Type', 'application/json' );
            XHR.send(JSON.stringify(formDataObj));
        }

        // ログインユーザ: リクエスト
        else {
            XHR.responseType = "json";
            XHR.open("POST", Const.BASE_PATH + "/adage");
            XHR.setRequestHeader( 'Content-Type', 'application/json' );
            XHR.setRequestHeader( 'Authorization', idToken );
            XHR.send(JSON.stringify(formDataObj));
        }
    });

    // idTokenが空の場合
    if(idToken === null) {
        $("#loginAlert").fadeIn()
    }
});