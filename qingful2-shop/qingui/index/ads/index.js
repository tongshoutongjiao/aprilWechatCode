const util = require("../../../utils/util.js");

Component({
    properties: {
        adsData: {
            type: Object,
            value: {},
            observer: function (newVal, oldVal) { }
        }
    },
    data: {
        defaultWidth: util.getSystem().windowWidth,  // 微信浏览器宽
    },
    attached: function () {
        // console.log(this);
    },
    methods: {
        jumpAds(){
            wx.showModal({
                title: '提示',
                content: '这是广告组件',
                showCancel:false
            })
        }
    }
});
