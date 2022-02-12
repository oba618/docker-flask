import { Const } from "../common/const.js";

$(window).load(function(){
    "use strict";

    const form = document.getElementById("sendResetPasswordCodeForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const XHR = new XMLHttpRequest();
        const FD  = new FormData(form);
        const formDataObj = Object.fromEntries(FD);

        // 成功の場合
        XHR.addEventListener("load", function(event) {
            alert("メールアドレスに再設定コードを送信しました。");
            if(confirm) {
                window.location.href = '/user/resetPassword';
            }
        });
    
        // 失敗の場合
        XHR.addEventListener("error", function(event) {
            alert(XHR.response);
        });

        // リクエスト
        XHR.responseType = "text";
        XHR.open("POST", Const.BASE_PATH + "/user/sendResetPasswordCode");
        XHR.setRequestHeader( 'Content-Type', 'application/json' );
        XHR.send(JSON.stringify(formDataObj));
    });
});