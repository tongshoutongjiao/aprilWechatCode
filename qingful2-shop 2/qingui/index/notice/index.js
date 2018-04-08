const util = require("../../../utils/util.js");

Component({
    properties: {
        noticeData: {
            type: Object,
            value: {},
            observer: function (newVal, oldVal) { }
        }
    },
    data: {
        defaultWidth: util.getSystem().windowWidth,  // 微信浏览器宽
    },
    attached: function () {
        // console.log(this.data.noticeData);
    },
    methods: {
        //跳转
        navigateTo: function(e) {
            const target_type = e.currentTarget.dataset.target_type;
            const target_url = e.currentTarget.dataset.target_url;
            
            //跳转
            util.navigateTo(target_type,target_url);
        }
    }
});

