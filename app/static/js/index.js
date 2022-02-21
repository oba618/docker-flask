import { Const } from "./common/const.js";


$(window).load(function(){
    "use strict";

    const getAdageButton = document.getElementById("getAdageButton");
    const likePoints = document.getElementById("likePoints")
    
    let adage_list = [];
    let index_number = 0;

    function showAdage(adage) {
        /**
         * 格言を結果に追加
         */

        const item = {
            adageId: adage.adageId,
            title: adage.title,
            likePoints: adage.likePoints
        }

        vmAdageContainer.adages.push(item)
    }

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
            showAdage("error=" + jqXHR.statusText
                        + ", status=" + jqXHR.status);
        });

        return adage_list;
    }

    const fixTwitterShareButton = function fixTwitterShareButton(adageTitle) {
        /**
         * ツイートシェアボタンを修正
         */
        const twitterShareButton = document.getElementById('twitterShareButton' + index_number);
        console.log(twitterShareButton);
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
            console.log("error=" + jqXHR.statusText
                + ", status=" + jqXHR.status)
        });
    }

    function increaseLikePoints(suffix) {
        /**
         * いいねポイントを増やす
         */
        const likePoints = document.getElementsByName("likePoints" + suffix);
        let points = parseInt(likePoints.textContent, 10);
        points++;
        likePoints.innerText = points;
    }

    function getLikesIconId(index) {
        /**
         * いいねボタン: クリックイベントハンドラ
         */
        const adageId = document.getElementById('adageId' + index).textContent
        updateLikePoints(adageId)
        
        const likesIcon = document.getElementById("LikesIcon" + index);
        likesIcon.firstChild.className = 'fas fa-heart LikesIcon-fa-heart heart';
        setTimeout(function() {
            likesIcon.firstChild.className = 'far fa-heart LikesIcon-fa-heart';
        },1000);
    }

    const Demo = {
        data() {
            return {
                adages: []
            }
        },
        methods: {
            addAdage() {
                console.log('TEST IS OK')
                // 格言リスト取得
                if(!adage_list.length) {
                    adage_list = getAdage();
                }
        
                let adage = adage_list[index_number];
                if(adage_list.length > index_number) {
                    
                    const item = {
                        adageId: adage.adageId,
                        title: adage.title,
                        likePoints: adage.likePoints
                    };
                    this.adages.push(item);
                    setTimeout(fixTwitterShareButton, 1, adage.title);
                }
            }
        }
    }
    
    Vue.createApp(Demo).mount('#adageContainer')
})
