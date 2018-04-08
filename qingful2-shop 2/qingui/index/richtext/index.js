const WxParse = require("../../../utils/wxParse/wxParse.js");
Component({
    properties: {
        richtextData: {
            type: Object,
            value: {},
            observer: function(newVal, oldVal) {
                this.init(newVal);
            }
        }
    },
    data: {},
    attached: function() {
        // console.log(this);
    },
    methods: {
        init: function(newVal) {
            const content = newVal.config.content;
            WxParse.wxParse(
                "richtext",
                "html",
                content,
                this
            );
        }
    }
});