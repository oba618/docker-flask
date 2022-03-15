$(window).load(function(){
    "use strict";

    const alertSuccessText = document.getElementById("alertSuccessText");
    const alertString = sessionStorage.getItem("alertString");

    function hiddenAlert(id) {
        $(id).fadeOut();
    }

    function showHeaderAlert() {
        if(alertString == "logout") {
            alertSuccessText.innerText = "ログアウトしました";
        }
        else if(alertString == "login") {
            alertSuccessText.innerText = "ログインしました";
        }
        else if(alertString == "resetPasswordSuccess") {
            alertSuccessText.innerText = "パスワード設定が完了しました";
        }
        else if(alertString == "userPut") {
            alertSuccessText.innerText = "ユーザを更新しました";
        }
        else if(alertString == "userDelete") {
            alertSuccessText.innerText = "ユーザを削除しました";
        }
        else if(alertString == "sendConfirmCode") {
            alertSuccessText.innerText = "メールアドレスに認証コードを送信しました。";
        }
        else if(alertString == "userConfirmed") {
            alertSuccessText.innerText = "お疲れ様でした。ユーザ登録は完了しました。引き続き当サービスを宜しくお願い致します。";
        }
        else if(alertString == "episodePost" || alertString == 'adagePost') {
            alertSuccessText.innerText = "登録完了しました。共有ありがとうございます！";
        }
        else if(alertString == "episodeDelete") {
            alertSuccessText.innerText = "エピソードを削除しました";
        }

        $("#alertSuccess").fadeIn();
        sessionStorage.removeItem("alertString");
    }

    $("#alertSuccess").on("click", function() {
        hiddenAlert("#alertSuccess")
    });

    $("#alertDanger").on("click", function() {
        hiddenAlert("#alertDanger")
    });

    $("#alertWarningLogin").on("click", function() {
        hiddenAlert("#alertWarningLogin")
    });

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
