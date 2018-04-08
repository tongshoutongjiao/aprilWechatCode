const util = require("../../../utils/util.js");

Component({
    properties: {
        themeData: {
            type: Object,
            value: {},
            observer: function (newVal, oldVal) { }
        }
    },
    data: {
        defaultWidth: util.getSystem().windowWidth,  // 微信浏览器宽
    },
    attached: function () {
        // console.log(this.data.themeData);
    },
    ready() {
        let type_ = Number(this.data.themeData.config.style_type);
        if (type_ == 0 || type_ == 1 || type_ == 3) {
            this.data.themeData.data = this.data.themeData.data.slice(0, type_ + 2);
            this.setData({
                themeData: this.data.themeData
            })
        }
        if (type_ == 2) {
            this.data.themeData.data = this.data.themeData.data.slice(0, type_);
            let data = [];
            data.push(this.data.themeData.data.slice(0, 1));
            data.push(this.data.themeData.data.slice(1));
            this.data.themeData.data = data;
            this.setData({
                themeData: this.data.themeData
            })
        }
        if (type_ == 4) {
            this.data.themeData.data = this.data.themeData.data.slice(0, type_);
            let data = [];
            data.push(this.data.themeData.data.slice(0, 2));
            data.push(this.data.themeData.data.slice(2));
            this.data.themeData.data = data;
            this.setData({
                themeData: this.data.themeData
            })
        }
        if (type_ == 5) {
            this.data.themeData.data = this.data.themeData.data.slice(0, type_);
            let data = [];
            data.push(this.data.themeData.data.slice(0, 2));
            data.push(this.data.themeData.data.slice(2,3));
            data.push(this.data.themeData.data.slice(3));
            this.data.themeData.data = data;
            this.setData({
                themeData: this.data.themeData
            })
        }
        if (type_ == 6) {
            this.data.themeData.data = this.data.themeData.data.slice(0, type_);
            let data = [];
            data.push(this.data.themeData.data.slice(0, 1));
            data.push(this.data.themeData.data.slice(1,3));
            data.push(this.data.themeData.data.slice(3,4));
            data.push(this.data.themeData.data.slice(4));
            this.data.themeData.data = data;
            this.setData({
                themeData: this.data.themeData
            })
        }
        if (type_ == 7) {
            this.data.themeData.data = this.data.themeData.data.slice(0, type_);
            let data = [];
            data.push(this.data.themeData.data.slice(0, 1));
            data.push(this.data.themeData.data.slice(1,3));
            data.push(this.data.themeData.data.slice(3,5));
            data.push(this.data.themeData.data.slice(5));
            this.data.themeData.data = data;
            this.setData({
                themeData: this.data.themeData
            })
        }
        if (type_ == 8) {
            this.data.themeData.data = this.data.themeData.data.slice(0, type_);
            let data = [];
            data.push(this.data.themeData.data.slice(0, 2));
            data.push(this.data.themeData.data.slice(2,4));
            data.push(this.data.themeData.data.slice(4,6));
            data.push(this.data.themeData.data.slice(6));
            this.data.themeData.data = data;
            this.setData({
                themeData: this.data.themeData
            })
        }
        if (type_ == 9) {
            this.data.themeData.data = this.data.themeData.data.slice(0, type_);
            let data = [];
            data.push(this.data.themeData.data.slice(0, 1));
            data.push(this.data.themeData.data.slice(1,2));
            data.push(this.data.themeData.data.slice(2,4));
            data.push(this.data.themeData.data.slice(4,5));
            data.push(this.data.themeData.data.slice(5,7));
            data.push(this.data.themeData.data.slice(7));
            this.data.themeData.data = data;
            this.setData({
                themeData: this.data.themeData
            })
        }
        if (type_ == 10) {
            this.data.themeData.data = this.data.themeData.data.slice(0, type_);
            let data = [];
            data.push(this.data.themeData.data.slice(0, 1));
            data.push(this.data.themeData.data.slice(1,3));
            data.push(this.data.themeData.data.slice(3,5));
            data.push(this.data.themeData.data.slice(5,6));
            data.push(this.data.themeData.data.slice(6,8));
            data.push(this.data.themeData.data.slice(8));
            this.data.themeData.data = data;
            this.setData({
                themeData: this.data.themeData
            })
        }
    },
    methods: {

    }
});

