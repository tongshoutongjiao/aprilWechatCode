const util = require("../../../utils/util.js");

Component({
    properties: {
        historyData: {
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
        
    }
});
