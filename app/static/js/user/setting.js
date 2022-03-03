import { Const } from "../common/const.js";

$(window).load(function(){
    "use strict";

    const idToken = sessionStorage.getItem("idToken");
    const userName = document.getElementById("userName");
    const changeUserNameForm = document.getElementById("changeUserNameForm");

    function hiddenAlert(id) {
        $(id).fadeOut();
    }

    changeUserNameForm.addEventListener("submit", function (event) {
        /**
         * ユーザ名変更
         */
        event.preventDefault();

        const XHR = new XMLHttpRequest();
        const FD  = new FormData(changeUserNameForm);
        const formDataObj = Object.fromEntries(FD);

        // 成功の場合
        XHR.addEventListener("load", function(event) {

            // 異常レスポンスの場合
            if(XHR.response.errorCode >= 400) {

            }

            // 正常レスポンスの場合
            else {
                sessionStorage.setItem("alertString", "userPut");
                location.href = "/process/user/name/" + XHR.response.userName;
            }
        });

        // 失敗の場合
        XHR.addEventListener("error", function(event) {
            alert("エラーが発生しました");
        });

        // リクエスト
        XHR.responseType = "json";
        XHR.open("PUT", Const.BASE_PATH + "/user");
        XHR.setRequestHeader( 'Content-Type', 'application/json' );
        XHR.setRequestHeader( 'Authorization', idToken );
        XHR.send(JSON.stringify(formDataObj));
    });

    function getUser() {
        /**
         * ユーザを取得
         */
        const XHR = new XMLHttpRequest();

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
                console.log(XHR.response);
                userName.value = XHR.response.userName;
                $("#loadingSpinner").hide();
                $("#profileContainer").fadeIn();
            }
        });
    
        // 失敗の場合
        XHR.addEventListener("error", function(event) {
            alert(XHR.response);
        });

        // リクエスト
        XHR.responseType = "json";
        XHR.open("GET", Const.BASE_PATH + "/user");
        XHR.setRequestHeader( 'Content-Type', 'application/json' );
        XHR.setRequestHeader( 'Authorization', idToken );
        XHR.send();
    }


    $("#logout").click(function(){
        /**
         * ログアウト処理
         */
        sessionStorage.removeItem("idToken");
        sessionStorage.removeItem("accessToken");
        sessionStorage.setItem('alertString', 'logout');

        location.href = "/process/logout";
    });

    // ユーザ参照
    getUser();
});