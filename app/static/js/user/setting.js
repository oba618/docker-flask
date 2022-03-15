import { Const } from "../common/const.js";
import { Util } from "../common/util.js";

$(window).load(function(){
    "use strict";

    const idToken = sessionStorage.getItem("idToken");
    const userId = sessionStorage.getItem("userId");

    function removeDbLikePointsHistory(key) {
        const XHR = new XMLHttpRequest();

        // 成功の場合
        XHR.addEventListener("load", function(event) {

            // 異常レスポンスの場合
            if(XHR.response.errorCode >= 400) {
                Util.showAlertDanger(XHR.response);
            }

            // 正常レスポンスの場合
            else {
                console.log("DELETE HEART HISTORY");
            }
        });

        // 失敗の場合
        XHR.addEventListener("error", function(event) {
            Util.showAlertDanger(Const.MESSAGE_ERROR_REQUEST);
        });

        // リクエスト
        const body = JSON.stringify({
            key: key,
        });
        console.log(body);
        XHR.responseType = "json";
        XHR.open("DELETE", [Const.BASE_PATH, "heart"].join("/"));
        XHR.setRequestHeader( 'Content-Type', 'application/json' );
        XHR.setRequestHeader( 'Authorization', idToken );
        XHR.send(body);
    }

    const app = Vue.createApp({
        data() {
            return {
                userId: "",
                loginId: "",
                userName: "",
                likePoints: 0,
                episodeList: [],
                pointList: []
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
                        app.userId = XHR.response.userId;
                        app.loginId = XHR.response.loginId;
                        app.userName = XHR.response.userName;
                        app.likePoints = XHR.response.likePoints;

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

                        const pointList = XHR.response.pointList;
                        for(var i in pointList) {
                            const item = pointList[i];
                            app.pointList.push(
                                {
                                    senderId: item['senderId'],
                                    senderName: item['senderName'],
                                    key: item['key'],
                                    dateTime: item['dateTime'],
                                    point: item['point'],
                                    reason: item['reason']
                                }
                            )
                        }
        
                        $("#loadingSpinner").hide();
                        $("#profileContainer").fadeIn();
        
                    }
                });
            
                // 失敗の場合(idToken有効期限切れの場合)
                XHR.addEventListener("error", function(event) {
                    alert("認証有効期限が切れたためログアウトします")
                    app.logout();
                });
        
                // リクエスト
                XHR.responseType = "json";
                XHR.open("GET", Const.BASE_PATH + "/user");
                XHR.setRequestHeader( 'Content-Type', 'application/json' );
                XHR.setRequestHeader( 'Authorization', idToken );
                XHR.send();
            },

            putUserName: function() {
                const changeUserNameForm = document.getElementById("changeUserNameForm");

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
                    const XHR = new XMLHttpRequest();

                    // 成功の場合
                    XHR.addEventListener("load", function(event) {

                        // 異常レスポンスの場合
                        if(XHR.response.errorCode >= 400) {
                            Util.showAlertDanger(XHR.response);
                        }

                        // 正常レスポンスの場合
                        else {
                            sessionStorage.setItem("alertString", "episodeDelete");
                            location.href = "/user/setting";
                        }
                    });

                    // 失敗の場合
                    XHR.addEventListener("error", function(event) {
                        Util.showAlertDanger(Const.MESSAGE_ERROR_REQUEST);
                    });
    
                    // リクエスト
                    const path = [
                        Const.BASE_PATH,
                        "episode",
                        adageId,
                    ].join("/")
                    XHR.responseType = "json";
                    XHR.open("DELETE", path);
                    XHR.setRequestHeader( 'Content-Type', 'application/json' );
                    XHR.setRequestHeader( 'Authorization', idToken );
                    XHR.send();
                }
            },

            /**
             * ログアウト処理
             */
            logout() {
                sessionStorage.clear();
                sessionStorage.setItem('alertString', 'logout');
        
                location.href = "/process/logout";
            },

            /**
             * ユーザ削除画面へ
             */
            userDelete() {
                location.href = "/user/delete";
            },

            /**
             * ハート履歴削除
             * @param {string} key 
             * @param {int} index 
             */
            removeHeart(key, index) {
                const target = document.getElementById(key);
                const likesIcon = document.getElementById("heart#" + key);
                likesIcon.firstChild.className = 'fas fa-heart LikesIcon-fa-heart heart';
                
                // ハート削除
                setTimeout(function() {
                    target.classList.add("fadeout");
                    
                    // DynamoDBのlikePoints履歴削除
                    setTimeout(function(){
                        console.log(key);
                        removeDbLikePointsHistory(key);
                        target.remove();
                    }, 1000)
                },1000);
            }
        }
    }).mount("#profileContainer")

    // ユーザ参照
    app.getUser();
});
