import { Const } from "../common/const.js";

$(window).load(function(){
    "use strict";

    const form = document.getElementById("userLoginForm");
    const loginAlert = document.getElementById("loginAlert");
    const returnPath = document.getElementById("returnPath")

    form.addEventListener("submit", function (event) {
        /**
         * 格言送信
         */
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

            // 正常レスポンスの場合
            else {
                sessionStorage.setItem('idToken', XHR.response.idToken);
                sessionStorage.setItem('accessToken', XHR.response.accessToken);
                sessionStorage.setItem('userId', XHR.response.userId);
                sessionStorage.setItem('userName', XHR.response.userName);
                sessionStorage.setItem('alertString', 'login');

                if(returnPath) {
                    location.href = [
                        "/process/login",
                        XHR.response.userName,
                        returnPath.innerText,
                    ].join("/");
                }
                else {
                    location.href = '/process/login/' + XHR.response.userName;
                }
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