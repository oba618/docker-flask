import { Const } from "../common/const.js";

$(window).load(function(){
    "use strict";

    const form = document.getElementById("userPostForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const XHR = new XMLHttpRequest();
        const FD  = new FormData(form);
        const formDataObj = Object.fromEntries(FD);

        // 成功の場合
        XHR.addEventListener("load", function(event) {

            // 異常レスポンスの場合
            if(XHR.response.errorCode >= 400) {
                loginAlert.innerHTML = [
                    XHR.response.errorCode,
                    XHR.response.phrase,
                    XHR.response.message
                ].join("<br>")
                $("#loginAlert").fadeIn();
            }

            else {
                sessionStorage.setItem('alertString', 'sendConfirmCode');
                window.location.href = '/user/confirm';
            }
        });
    
        // 失敗の場合
        XHR.addEventListener("error", function(event) {
            alert("エラーが発生しました");
        });

        // リクエスト
        XHR.responseType = "text";
        XHR.open("POST", Const.BASE_PATH + "/user");
        XHR.setRequestHeader( 'Content-Type', 'application/json' );
        XHR.send(JSON.stringify(formDataObj));
    });
});