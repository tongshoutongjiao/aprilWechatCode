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
        }
    }
});