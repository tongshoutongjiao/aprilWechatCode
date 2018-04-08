const util = require("../../../utils/util.js");

Component({
    properties: {
        addressData: {
            type: Object,
            value: {},
            observer: function (newVal, oldVal) { }
        },
        address: Array,
        sign: Array,
        is_selected: {
            type:String,
            value:0
        }
    },
    data: {
        defaultWidth: util.getSystem().windowWidth,  // 微信浏览器宽
        defaultHeight: util.getSystem().windowHeight,  // 微信浏览器高
        color:"#08b8fd"
    },
    attached: function () {
        // console.log(this);
    },
    methods: {

    }
});
