const util = require("../../../utils/util.js");
Component({
    properties: {
        slideData: {
            type: Object, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: {},
            observer: function(newVal, oldVal) {}
        }
    },
    data: {},
    attached: function() {
        // console.log(this.data.slideData);
    },
    methods: {
        changeSlide: function(e) {
            this.data.slideData.config.current = e.detail.current;
            this.setData({
                slideData: this.data.slideData
            });
        },
        //跳转
        navigateTo: function(e) {
            const target_type = e.currentTarget.dataset.target_type;
            const target_url = e.currentTarget.dataset.target_url;

            //跳转
            util.navigateTo(target_type,target_url);
        }
    }
});