import { Const } from "./common/const.js";
import { Util } from "./common/util.js";

$(window).load(function(){
    "use strict";

    $("#loadingSpinner").hide();
    $("#adageContainer").fadeIn();

    let index_number = 0;

    const fixTwitterShareButton = function fixTwitterShareButton(adageTitle) {
        /**
         * ツイートシェアボタンを修正
         */
        const twitterShareButton = document.getElementById('twitterShareButton' + index_number);

        // ボタン削除
        if(twitterShareButton.lastChild){
            twitterShareButton.removeChild(twitterShareButton.lastChild);
        }

        // ボタン追加
        let a = document.createElement('a');
        let script = document.createElement('script');
        a.setAttribute("href", Const.TWITTER_SHARE_URL);
        a.setAttribute("class", "twitter-share-button");
        a.setAttribute("data-show-count", "false");
        a.setAttribute("data-text", '"' + adageTitle + '"');
        a.setAttribute("data-url", location.href);
        a.setAttribute("data-hashtags", "格言共有");
        a.setAttribute("data-related", "oba618");
        a.setAttribute("data-size", "large");
        script.setAttribute("src", Const.TWITTER_WIDGETS_URL);
        twitterShareButton.appendChild(a);
        twitterShareButton.appendChild(script);

        index_number++;
    }

    function updateLikePoints(adageId) {
        /**
         * いいねポイントを更新
         */
        const XHR = new XMLHttpRequest();
        
        // 成功の場合
        XHR.addEventListener("load", function(event) {

            // 異常レスポンスの場合
            if(XHR.response.errorCode >= 400) {
                Util.showAlertDanger(XHR.response);
            }

            // 正常レスポンスの場合
            else {
                console.log(XHR.response);
            }
        });
        
        // 失敗の場合
        XHR.addEventListener("error", function(event) {
            Util.showAlertDanger(Const.MESSAGE_ERROR_REQUEST);
        });
        
        // リクエスト
        XHR.responseType = "json";
        XHR.open("PATCH", [Const.BASE_PATH, "adage", adageId].join("/"));
        XHR.setRequestHeader( 'Content-Type', 'application/json' );
        XHR.send();
    }

    const app = Vue.createApp({
        data() {
            return {
                adage_list: [],
                adages: []
            }
        },
        methods: {

            getAdage() {
                const XHR = new XMLHttpRequest();
        
                // 成功の場合
                XHR.addEventListener("load", function(event) {
        
                    // 異常レスポンスの場合
                    if(XHR.response.errorCode >= 400) {
                        Util.showAlertDanger(XHR.response);
                    }
        
                    // 正常レスポンスの場合
                    else {
                        app.adage_list = XHR.response;
                    }
                });
                
                // 失敗の場合
                XHR.addEventListener("error", function(event) {
                    Util.showAlertDanger(Const.MESSAGE_ERROR_REQUEST);
                });
                
                // リクエスト
                XHR.responseType = "json";
                XHR.open("GET", Const.BASE_PATH + "/adage");
                XHR.setRequestHeader( 'Content-Type', 'application/json' );
                XHR.send();
            },

            addAdage() {
                let adage = this.adage_list[index_number];

                if(this.adage_list.length > index_number) {

                    this.adages.push(
                        {
                            adageId: adage.adageId,
                            title: adage.title,
                            likePoints: adage.likePoints,
                            episode: adage.episode
                        }
                    );
                    setTimeout(fixTwitterShareButton, 1, adage.title);
                }
            },

            increasePoints(adage, index) {
                const adageId = document.getElementById('adageId' + index).textContent
                updateLikePoints(adageId)
                
                const likesIcon = document.getElementById("LikesIcon" + index);
                likesIcon.firstChild.className = 'fas fa-heart LikesIcon-fa-heart heart';
                setTimeout(function() {
                    likesIcon.firstChild.className = 'far fa-heart LikesIcon-fa-heart';
                },1000);

                adage.likePoints++;
            },

            addEpisode(adageId, adageTitle) {
                location.href = [
                    "adage/episode/post",
                    adageId,
                    adageTitle,
                ].join("/");
            }
        }
    }).mount('#adageContainer')

    app.getAdage();
})
