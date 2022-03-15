import { Const } from "../common/const.js";
import { Util } from "../common/util.js";

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
            }

            // 正常レスポンスの場合
            else {
                sessionStorage.clear();
                sessionStorage.setItem('alertString', 'userDelete');
                location.href = '/user/delete/success';
            }
        });
        
        // 失敗の場合
        XHR.addEventListener("error", function(event) {
            Util.showAlertDanger(Const.MESSAGE_ERROR_REQUEST);
        });
        
        // リクエスト
        formDataObj.accessToken = accessToken;
        XHR.responseType = "json";
        XHR.open("DELETE", Const.BASE_PATH + "/user");
        XHR.setRequestHeader( 'Content-Type', 'application/json' );
        XHR.setRequestHeader( 'Authorization', idToken );
        XHR.send(JSON.stringify(formDataObj));
    });
});
