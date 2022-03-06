import { Const } from "../common/const.js";

$(window).load(function(){
    "use strict";
    
    const idToken = sessionStorage.getItem("idToken");
    const form = document.getElementById("episodePostForm");
    const inputTextEpisode = document.getElementById("inputTextEpisode");
    const postEpisodeButton = document.getElementById("postEpisodeButton");

    function hiddenAlert(id) {
        $(id).fadeOut();
    }

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
                $("#thanksAlert").fadeIn();
                inputTextEpisode.value = "";
                setTimeout(hiddenAlert, 15*1000, "#thanksAlert");
            }
        });
    
        // 失敗の場合
        XHR.addEventListener("error", function(event) {
            alert(XHR.response);
        });

        // リクエスト
        XHR.responseType = "text";
        XHR.open("POST", Const.BASE_PATH + "/episode");
        XHR.setRequestHeader( 'Content-Type', 'application/json' );
        XHR.setRequestHeader( 'Authorization', idToken );
        XHR.send(JSON.stringify(formDataObj));
    });
    console.log(idToken);

    // idTokenが空の場合
    if(idToken === null) {
        $("#loginAlert").fadeIn();
        inputTextEpisode.disabled = true;
        postEpisodeButton.disabled = true;
    }
});