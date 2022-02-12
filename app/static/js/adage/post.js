import { Const } from "../common/const.js";

$(window).load(function(){
    "use strict";
    
    const idToken = sessionStorage.getItem("idToken");
    const form = document.getElementById("adagePostForm");

    // idTokenが空の場合
    if(idToken === null) {
        alert("格言登録はログイン後に可能です。ログインページに移動します。");
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
            alert("送信に成功しました! 共有ありがとうございます!");
            let inputTextTitle = document.getElementById("inputTextTitle");
            inputTextTitle.value = "";
        });
    
        // 失敗の場合
        XHR.addEventListener("error", function(event) {
            alert(XHR.response);
        });

        // リクエスト
        XHR.responseType = "text";
        XHR.open("POST", Const.BASE_PATH + "/adage");
        XHR.setRequestHeader( 'Content-Type', 'application/json' );
        XHR.setRequestHeader( 'Authorization', idToken );
        XHR.send(JSON.stringify(formDataObj));
    });
});