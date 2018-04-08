const util = require("../../../utils/util.js");

Component({
    properties: {
        navigationData: {
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
        //跳转
        navigateTo: function(e) {
            const { target_type, target_url } = e.currentTarget.dataset;

            //跳转
            util.navigateTo(target_type, target_url);
        }
    }
});
