const util = require("../../../utils/util.js");

Component({
    properties: {
        productData: {
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
        goProductDetail(e){
            wx.navigateTo({
                url: `../../pages/product/index?detail_id=${e.currentTarget.dataset.item.id}`
            })
        }
    }
});
