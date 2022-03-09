import { Const } from "./common/const.js";
import { Util } from "./common/util.js";

$(window).load(function(){
    "use strict";

    $("#loadingSpinner").hide();
    $("#adageContainer").fadeIn();

    let adage_list = [];
    let index_number = 0;

    function getAdage() {
        /**
         * 格言を取得
         * return {any} 格言
         */
        $.ajax({
            type: "GET",
            url: [Const.BASE_PATH, "adage"].join("/"),
            dataType: "json",
            cache: false,
            timeout: 10000,
            async : false,
        })
        // 成功
        .done(function (data, textStatus, jqXHR) {
            adage_list = data;
        })
        // 失敗
        .fail(function (jqXHR, textStatus, errorThrown) {
            Util.showAlertDanger(Const.MESSAGE_ERROR_REQUEST);
        });

        return adage_list;
    }

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
        $.ajax({
            type: "PATCH",
            url: [Const.BASE_PATH, "adage", adageId].join("/"),
            dataType: "json",
            cache: false,
            timeout: 10000
        })
        // 成功
        .done(function (data, textStatus, jqXHR) {
            console.log(data);
        })
        // 失敗
        .fail(function (jqXHR, textStatus, errorThrown) {
            Util.showAlertDanger(Const.MESSAGE_ERROR_REQUEST);
        });
    }

    Vue.createApp({
        data() {
            return {
                adage_list: getAdage(),
                adages: []
            }
        },
        methods: {
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
})
