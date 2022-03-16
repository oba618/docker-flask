import { Const } from "../common/const.js";
import { Util } from "../common/util.js";

$(window).load(function(){
    "use strict";

    const form = document.getElementById("userConfirmForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const submitButton = document.getElementById("submitButton");
        submitButton.disabled = true;

        const XHR = new XMLHttpRequest();
        const FD  = new FormData(form);
        const formDataObj = Object.fromEntries(FD);

        // 成功の場合
        XHR.addEventListener("load", function(event) {

            // 異常レスポンスの場合
            if(XHR.response.errorCode >= 400) {
                Util.showAlertDanger(XHR.response);
                submitButton.disabled = false;
            }

            else {
                sessionStorage.setItem('alertString', 'userConfirmed');
                window.location.href = '/user/login';
            }
        });
    
        // 失敗の場合
        XHR.addEventListener("error", function(event) {
            Util.showAlertDanger(Const.MESSAGE_ERROR_REQUEST);
            submitButton.disabled = false;
        });

        // リクエスト
        XHR.responseType = "json";
        XHR.open("POST", Const.BASE_PATH + "/user/confirm");
        XHR.setRequestHeader( 'Content-Type', 'application/json' );
        XHR.send(JSON.stringify(formDataObj));
    });
});
