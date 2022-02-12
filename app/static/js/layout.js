$(window).load(function(){
    "use strict";

    const idToken = sessionStorage.getItem("idToken");

    function changeNav() {
        /**
         * ログインリンクを変更
         */
        let navId = document.getElementById("navSession");
        navId.innerHTML = "Setting";

        let newHref = navId.getAttribute('href').replace('login', 'setting');
        navId.setAttribute('href', newHref);
    }

    function activeHeaderNav() {
        /**
         * ヘッダーナビをパスに合わせてアクティブ化
         */
        let navId = "";
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

    activeHeaderNav();
    if(idToken) {
        changeNav();
    }
});
