import { Const } from "../common/const.js";

$(window).load(function(){
    "use strict";

    const form = document.getElementById("userConfirmForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const XHR = new XMLHttpRequest();
        const FD  = new FormData(form);
        const formDataObj = Object.fromEntries(FD);

        // 成功の場合
        XHR.addEventListener("load", function(event) {
            alert("お疲れ様でした。ユーザ登録は完了しました。引き続き当サービスを宜しくお願い致します。");
            if(confirm) {
                window.location.href = '/user/login';
            }
        });
    
        // 失敗の場合
        XHR.addEventListener("error", function(event) {
            alert(XHR.response);
        });

        // リクエスト
        XHR.responseType = "text";
        XHR.open("POST", Const.BASE_PATH + "/user/confirm");
        XHR.setRequestHeader( 'Content-Type', 'application/json' );
        XHR.send(JSON.stringify(formDataObj));
    });
});