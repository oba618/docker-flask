import { Const } from "../common/const.js";
import { Util } from "../common/util.js";

$(window).load(function(){
    "use strict";
    
    const idToken = sessionStorage.getItem("idToken");
    const userId = sessionStorage.getItem("userId");
    const form = document.getElementById("episodePostForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const XHR = new XMLHttpRequest();
        const FD  = new FormData(form);
        const formDataObj = Object.fromEntries(FD);

        // 成功の場合
        XHR.addEventListener("load", function(event) {
            if(XHR.response.errorCode >= 400) {
                Util.showAlertDanger(XHR.response);
            }
            else {
                sessionStorage.setItem("alertString", "episodePost");
                location.href = location.href;
            }
        });
    
        // 失敗の場合
        XHR.addEventListener("error", function(event) {
            Util.showAlertDanger(Const.MESSAGE_ERROR_REQUEST);
        });

        // リクエスト
        if(idToken) {
            formDataObj.userId = userId;
        }
        else {
            formDataObj.userId = 'guest';
        }
        XHR.responseType = "json";
        XHR.open("POST", Const.BASE_PATH + "/episode");
        XHR.setRequestHeader( 'Content-Type', 'application/json' );
        XHR.send(JSON.stringify(formDataObj));
    });

    // 未ログインの場合
    if(idToken === null) {
        $("#alertWarningLogin").fadeIn();
    }
});
