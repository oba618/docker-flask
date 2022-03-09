import { Const } from "../common/const.js";
import { Util } from "../common/util.js";

$(window).load(function(){
    "use strict";

    const idToken = sessionStorage.getItem("idToken");
    const userId = sessionStorage.getItem("userId");
    const userName = document.getElementById("userName");
    const loginId = document.getElementById("loginId");
    const userIdP = document.getElementById("userIdP");
    const changeUserNameForm = document.getElementById("changeUserNameForm");
    const logout = document.getElementById("logout");
    const userDelete = document.getElementById("userDelete");
    const alertDangerText = document.getElementById("alertDangerText");

    logout.addEventListener("click", function(){
        /**
         * ログアウト処理
         */
        sessionStorage.clear();
        sessionStorage.setItem('alertString', 'logout');

        location.href = "/process/logout";
    });

    userDelete.addEventListener("click", function(){
        /**
         * ユーザ削除画面へ
         */
        location.href = "/user/delete";
    });

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
                Util.showAlertDanger(XHR.response);
            }

            // 正常レスポンスの場合
            else {
                sessionStorage.setItem("alertString", "userPut");
                location.href = "/process/user/name/" + XHR.response.userName;
            }
        });

        // 失敗の場合
        XHR.addEventListener("error", function(event) {
            Util.showAlertDanger(Const.MESSAGE_ERROR_REQUEST);
        });

        // リクエスト
        XHR.responseType = "json";
        XHR.open("PUT", Const.BASE_PATH + "/user");
        XHR.setRequestHeader( 'Content-Type', 'application/json' );
        XHR.setRequestHeader( 'Authorization', idToken );
        XHR.send(JSON.stringify(formDataObj));
    });

    const app = Vue.createApp({
        data() {
            return {
                episodeList: []
            }
        },
        methods: {
            /**
             * ユーザ情報参照
             */
            getUser() {
                const XHR = new XMLHttpRequest();
        
                // 成功の場合
                XHR.addEventListener("load", function(event) {
                    if(XHR.response.errorCode >= 400) {
                        Util.showAlertDanger(XHR.response);
                    }
                    else {
                        loginId.innerHTML = XHR.response.loginId;
                        userIdP.innerHTML = userId;
                        userName.value = XHR.response.userName;

                        const episodeList = XHR.response.episodeList;
                        for(var i in episodeList) {
                            const item = episodeList[i];
                            const pathAdage = "/adage/" + item['adageId'];
                            app.episodeList.push(
                                {
                                    title: item["title"],
                                    adageId: item["adageId"],
                                    episode: item["episode"],
                                }
                            );
                        }
        
                        $("#loadingSpinner").hide();
                        $("#profileContainer").fadeIn();
        
                    }
                });
            
                // 失敗の場合(idToken有効期限切れの場合)
                XHR.addEventListener("error", function(event) {
                    logout();
                });
        
                // リクエスト
                XHR.responseType = "json";
                XHR.open("GET", Const.BASE_PATH + "/user");
                XHR.setRequestHeader( 'Content-Type', 'application/json' );
                XHR.setRequestHeader( 'Authorization', idToken );
                XHR.send();
            },

            /**
             * エピソード編集画面へ
             * 
             * @param {string} adageId 
             * @param {string} title 
             */
            episodeEdit(adageId, title) {
                $.ajax({
                    type: "GET",
                    url: [
                        Const.BASE_PATH, "adage", adageId, "episode", userId,
                    ].join("/"),
                    headers: {'Authorization': idToken,},
                    dataType: "json",
                    cache: false,
                    timeout: 10000,
                    async : false,
                })
                // 成功
                .done(function (data, textStatus, jqXHR) {
                    location.href = [
                        "/adage/episode/post",
                        adageId,
                        title,
                        data.episode,
                    ].join("/");
                })
                // 失敗
                .fail(function (jqXHR, textStatus, errorThrown) {
                    Util.showAlertDanger(Const.MESSAGE_ERROR_REQUEST);
                });
            },

            /**
             * エピソード削除
             * 
             * @param {string} adageId 
             */
            episodeDelete(adageId) {
                if(confirm("このエピソードを削除します。よろしいですか？")) {
                    $.ajax({
                        type: "DELETE",
                        url: [Const.BASE_PATH, "episode"].join("/"),
                        headers: {'Authorization': idToken,},
                        data: JSON.stringify({
                            "adageId": adageId,
                            "userId": userId,
                        }),
                        dataType: "json",
                        cache: false,
                        timeout: 10000,
                        async : false,
                    })
                    // 成功
                    .done(function (data, textStatus, jqXHR) {
                        sessionStorage.setItem("alertString", "episodeDelete");
                        location.href = "/user/setting";
                    })
                    // 失敗
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        Util.showAlertDanger(Const.MESSAGE_ERROR_REQUEST);
                    });
                }
            }
        }
    }).mount("#postEpisodeList")

    // ユーザ参照
    app.getUser();
});
