import { Const } from "../common/const.js";

$(window).load(function(){
    "use strict";

    const form = document.getElementById("userLoginForm");
    const loginAlert = document.getElementById("loginAlert");

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
                sessionStorage.setItem('idToken', XHR.response.idToken);
                sessionStorage.setItem('accessToken', XHR.response.accessToken);
                sessionStorage.setItem('userName', XHR.response.userName);
                sessionStorage.setItem('nowLogin', 'true');
                location.href = '/process/login/' + XHR.response.userName;
            }
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