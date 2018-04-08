const util = require("../../../utils/util.js");

Component({
    properties: {
        searchData: {
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
        goAddress(){
            wx.navigateTo({
                url: '../../pages/plugin/address/index'
            })
        },
        goSearch(){
            wx.navigateTo({
                url: '../../pages/plugin/search/index'
            })
        }
    }
});
