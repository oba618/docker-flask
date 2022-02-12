import { Const } from "../common/const.js";

$(window).load(function(){
    "use strict";
    
    const idToken = sessionStorage.getItem("idToken");
    const accessToken = sessionStorage.getItem("accessToken");
    const form = document.getElementById("userDeleteForm");

    // idTokenが空の場合
    if(idToken === null) {
        alert("ユーザ削除はログイン後に可能です。ログインページに移動します。");
        if(confirm) {
            window.location.href = '/user/login';
        }
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const XHR = new XMLHttpRequest();
        const FD  = new FormData(form);
        const formDataObj = Object.fromEntries(FD);
        
        // 成功の場合
        XHR.addEventListener("load", function(event) {
            alert("ユーザを削除しました。ご利用頂きありがとうございました。");
            sessionStorage.removeItem('idToken');
            sessionStorage.removeItem('accessToken');
            if(confirm) {
                window.location.href = '/';
            }
        });
        
        // 失敗の場合
        XHR.addEventListener("error", function(event) {
            alert(XHR.response);
        });
        
        // リクエスト
        formDataObj.accessToken = accessToken;
        XHR.responseType = "text";
        XHR.open("DELETE", Const.BASE_PATH + "/user");
        XHR.setRequestHeader( 'Content-Type', 'application/json' );
        XHR.setRequestHeader( 'Authorization', idToken );
        XHR.send(JSON.stringify(formDataObj));
    });
});