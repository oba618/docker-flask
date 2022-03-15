import { Const } from "../common/const.js";
import { Util } from "../common/util.js";

$(window).load(function(){
    "use strict";
    
    const idToken = sessionStorage.getItem("idToken");
    const form = document.getElementById("adagePostForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const postAdageButton = document.getElementById("postAdageButton");
        postAdageButton.disabled = true;

        const XHR = new XMLHttpRequest();
        const FD  = new FormData(form);
        const formDataObj = Object.fromEntries(FD);

        // 成功の場合
        XHR.addEventListener("load", function(event) {
            if(XHR.response.errorCode >= 400) {
                Util.showAlertDanger(XHR.response);
            }
            else {
                sessionStorage.setItem("alertString", "adagePost");
                location.href = location.href;
            }
        });
    
        // 失敗の場合
        XHR.addEventListener("error", function(event) {
            Util.showAlertDanger(Const.MESSAGE_ERROR_REQUEST);
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

    // 未ログインの場合
    if(idToken === null) {
        $("#alertWarningLogin").fadeIn();
    }
});
