$(window).load(function(){
    "use strict";

    const alertHeader = document.getElementById("header-alert");
    const alertString = sessionStorage.getItem("alertString");

    function hiddenAlert(id) {
        $(id).fadeOut();
    }

    function showHeaderAlert() {
        if(alertString == "logout") {
            alertHeader.innerText = "ログアウトしました";
            alertHeader.className = "alert alert-success fixed-top";
        }
        else if(alertString == "login") {
            alertHeader.innerText = "ログインしました";
            alertHeader.className = "alert alert-success fixed-top";
        }
        else if(alertString == "userPut") {
            alertHeader.innerText = "ユーザを更新しました";
            alertHeader.className = "alert alert-success fixed-top";
        }
        else if(alertString == "userDelete") {
            alertHeader.innerText = "ユーザを削除しました";
            alertHeader.className = "alert alert-success fixed-top";
        }
        else if(alertString == "sendConfirmCode") {
            alertHeader.innerText = "メールアドレスに認証コードを送信しました。";
            alertHeader.className = "alert alert-success fixed-top";
        }
        else if(alertString == "userConfirmed") {
            alertHeader.innerText = "お疲れ様でした。ユーザ登録は完了しました。引き続き当サービスを宜しくお願い致します。";
            alertHeader.className = "alert alert-success fixed-top";
        }
        
        $("#header-alert").fadeIn();
        setTimeout(hiddenAlert, 5*1000, "#header-alert");
        sessionStorage.removeItem("alertString");
    }

    function activeHeaderNav() {
        /**
         * ヘッダーナビをパスに合わせてアクティブ化
         */
        let navId;
        const path_name = location.pathname;

        if(path_name == "/") {
            navId = document.getElementById("navGet");
        }
        else if(path_name == "/adage/post") {
            navId = document.getElementById("navPost");
        }
        else if(path_name == "/user/login") {
            navId = document.getElementById("navSession");
        }
        else if(path_name == "/user/setting") {
            navId = document.getElementById("navSession");
        }
        else return;
        navId.classList.add("active");
    }

    activeHeaderNav()

    if(alertString) {
        showHeaderAlert();
    }
});
