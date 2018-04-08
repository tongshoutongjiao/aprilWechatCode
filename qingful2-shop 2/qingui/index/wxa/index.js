const util = require("../../../utils/util.js");

Component({
    properties: {
        wxaData: {
            type: Object,
            value: {},
            observer: function(newVal, oldVal) {}
        }
    },
    data: {
        defaultWidth: util.getSystem().windowWidth, // 微信浏览器宽
    },
    attached: function() {
        // console.log(this);
    },
    methods: {
        //跳转小程序
        navigateTo: function(e) {
            const { appid } = e.currentTarget.dataset;
            wx.navigateToMiniProgram({
                appId: appid,
                success(res) {
                    // 打开成功
                },
                fail(err) {
                    console.log(err)
                }
            })
        }
    }
});