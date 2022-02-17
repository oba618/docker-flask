import { Const } from "./common/const.js";

$(window).load(function(){
    "use strict";
    
    let first_view = document.getElementById("firstView");
    let adage_list = [];
    let index_number = 0;

    function showAdage(adage) {
        /**
         * 格言を結果に追加
         */
        $("#adageId").text(adage.adageId);
        $("#adageTitle").text('"' + adage.title + '"');
        $("#likePoints").text(adage.likePoints);
    }

    function getAdage() {
        /**
         * 格言を取得
         * return {any} 格言
         */
        let adage;

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

    function fixTwitterShareButton(twitterShareButton, adageTitle) {
        /**
         * ツイートシェアボタンを修正
         */

        // ボタン削除
        while(twitterShareButton.lastChild){
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

    function increaseLikePoints() {
        /**
         * いいねポイントを増やす
         */
        var likePoints = parseInt(
            document.getElementById('likePoints').textContent, 10);
        likePoints++;
        $("#likePoints").text(likePoints);
    }

    $("#getAdageButton").click(function (e) {
        /**
         * 格言取得ボタン: クリックイベントハンドラ
         */
        if(first_view.hidden == true) {
            first_view.hidden = false;
        }

        $("#adageTitle").text("Now Loading ...");

        // 格言リスト取得
        if(!adage_list.length) {
            adage_list = getAdage();
        }

        let adage = adage_list[index_number];
        index_number++;
        if(adage_list.length == index_number) {
            index_number = 0;
        }

        showAdage(adage);
        fixTwitterShareButton(document.getElementById('twitterShareButton'), adage.title);
    });

    $('.LikesIcon').click(function() {
        /**
         * いいねボタン: クリックイベントハンドラ
         */
        let $btn = $(this);
        let adageId = document.getElementById('adageId').textContent

        $btn.children("i").attr('class', 'fas fa-heart LikesIcon-fa-heart heart');

        updateLikePoints(adageId)
        increaseLikePoints()

        setTimeout(function() {
            $btn.children("i").attr('class', 'far fa-heart LikesIcon-fa-heart');
        },1000);
    })
})
