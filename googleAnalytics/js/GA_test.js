(function (window, document, undefined) {

    var googleAnalytics = window.googleAnalytics || (window.googleAnalytics = {});

    var $ = window.jQuery;

    googleAnalytics.handler = {

        //是否已載入GA
        isInitComplete: false,

        //追蹤碼 
        //正式機 UA-58228710-1
        //Mark 測試 UA-90161650-1
        trackingCode: "UA-90161650-1",

        //GA function
        ga: undefined,

        //userID
        userID:"123456789",

        //初始化 載入GA
        init: function () {

            if (googleAnalytics.handler.ga != undefined)
                return;

            //使用jquery 載入
            if ($.getScript != undefined) {

                $.getScript('//www.google-analytics.com/analytics.js', function (data, status, obj) {

                    if (status == 'success') {

                        googleAnalytics.handler.isInitComplete = true;

                        googleAnalytics.handler.ga = window.ga;

                        googleAnalytics.handler.getUserID();
                    }
                });
            } else {
            //使用 javaScript 載入
                var script = document.createElement('script');

                script.src = '//www.google-analytics.com/ga.js';

                document.getElementsByTagName('head')[0].appendChild(script);

                googleAnalytics.handler.isInitComplete = true;

                googleAnalytics.handler.ga = window.ga;
            }

        },

        //初始化 載入完成 (需寫入)
        initComplete : undefined,

        //建立追蹤 *進入該頁面時 初始化呼叫
        create: function(){

            googleAnalytics.handler.ga('create', googleAnalytics.handler.trackingCode, 'auto');

            googleAnalytics.handler.setUserID();

            googleAnalytics.handler.send();
        },

        //發送至 Google Analytics 開始追蹤
        send: function () {

            googleAnalytics.handler.ga('send', 'pageview');

        },

        // 設定 目前頁面 singlePage 使用 
        setPage: function (urlArr,title) {
            
            googleAnalytics.handler.setTitle(title);

            ga('set', 'page', urlArr[0]);

            if (urlArr.length > 1)
                googleAnalytics.handler.setCampaign(urlArr);

            googleAnalytics.handler.send();
        },

        // 設定 page 顯示標題
        setTitle : function(title){
            
            ga("set","title",title);

        },

        //設定 追蹤的 來源/媒介
        setCampaign: function (urlArr) {

            ga('set', { 'campaignSource': urlArr[1], 'campaignMedium': urlArr[2] });

        },

        //取得 userID
        getUserID: function () {

            $.ajax({

                url: 'https://analytics.prod.jpp.cnyes.cool/visitorid.php',

                xhrFields: { withCredentials: true },

                type: 'GET',

                dataType: 'json',

                success: function (rJson) {

                    console.log("userID :" + rJson.items.visitorId);

                    googleAnalytics.handler.userID = rJson.items.visitorId;
                }
            })

        },

        //向google analytics 設定 目前UseriD
        setUserID: function () {

            ga('set', 'userId', googleAnalytics.handler.userID);

        }

    }

    //執行初始化
    googleAnalytics.handler.init();


}(window, document));