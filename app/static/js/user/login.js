import { Const } from "../common/const.js";

$(window).load(function(){
    "use strict";

    const form = document.getElementById("userLoginForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const XHR = new XMLHttpRequest();
        const FD  = new FormData(form);
        const formDataObj = Object.fromEntries(FD);

        // 成功の場合
        XHR.addEventListener("load", function(event) {
            alert("ログイン完了しました")
            sessionStorage.setItem('idToken', XHR.response.idToken);
            sessionStorage.setItem('accessToken', XHR.response.accessToken);
            window.location.href = '/adage/post';
        });
    
        // 失敗の場合
        XHR.addEventListener("error", function(event) {
            alert("エラーが発生しました");
        });

        // リクエスト
        XHR.responseType = "json";
        XHR.open("POST", Const.BASE_PATH + "/user/login");
        XHR.setRequestHeader( 'Content-Type', 'application/json' );
        
        XHR.send(JSON.stringify(formDataObj));
    });
});