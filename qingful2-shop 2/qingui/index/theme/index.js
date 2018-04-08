const util = require("../../../utils/util.js");

Component({
    properties: {
        themeData: {
            type: Object,
            value: {},
            observer: function (newVal, oldVal) {
                this.init(newVal);
            }
        }
    },
    data: {
        defaultWidth: util.getSystem().windowWidth,  // 微信浏览器宽
    },
    attached: function () {
        // console.log(this.data.themeData);
    },
    ready() {
        
    },
    methods: {
        //初始化
        init: function (newVal) {
            let type_ = Number(newVal.config.style_type);
            if (type_ == 0 || type_ == 1 || type_ == 3) {
                newVal.data = newVal.data.slice(0, type_ + 2);
                this.setData({
                    themeData: newVal
                })
            }
            if (type_ == 2) {
                newVal.data = newVal.data.slice(0, type_);
                let data = [];
                data.push(newVal.data.slice(0, 1));
                data.push(newVal.data.slice(1));
                newVal.data = data;
                this.setData({
                    themeData: newVal
                })
            }
            if (type_ == 4) {
                newVal.data = newVal.data.slice(0, type_);
                let data = [];
                data.push(newVal.data.slice(0, 2));
                data.push(newVal.data.slice(2));
                newVal.data = data;
                this.setData({
                    themeData: newVal
                })
            }
            if (type_ == 5) {
                newVal.data = newVal.data.slice(0, type_);
                let data = [];
                data.push(newVal.data.slice(0, 2));
                data.push(newVal.data.slice(2,3));
                data.push(newVal.data.slice(3));
                newVal.data = data;
                this.setData({
                    themeData: newVal
                })
            }
            if (type_ == 6) {
                newVal.data = newVal.data.slice(0, type_);
                let data = [];
                data.push(newVal.data.slice(0, 1));
                data.push(newVal.data.slice(1,3));
                data.push(newVal.data.slice(3,4));
                data.push(newVal.data.slice(4));
                newVal.data = data;
                this.setData({
                    themeData: newVal
                })
            }
            if (type_ == 7) {
                newVal.data = newVal.data.slice(0, type_);
                let data = [];
                data.push(newVal.data.slice(0, 1));
                data.push(newVal.data.slice(1,3));
                data.push(newVal.data.slice(3,5));
                data.push(newVal.data.slice(5));
                newVal.data = data;
                this.setData({
                    themeData: newVal
                })
            }
            if (type_ == 8) {
                newVal.data = newVal.data.slice(0, type_);
                let data = [];
                data.push(newVal.data.slice(0, 2));
                data.push(newVal.data.slice(2,4));
                data.push(newVal.data.slice(4,6));
                data.push(newVal.data.slice(6));
                newVal.data = data;
                this.setData({
                    themeData: newVal
                })
            }
            if (type_ == 9) {
                newVal.data = newVal.data.slice(0, type_);
                let data = [];
                data.push(newVal.data.slice(0, 1));
                data.push(newVal.data.slice(1,2));
                data.push(newVal.data.slice(2,4));
                data.push(newVal.data.slice(4,5));
                data.push(newVal.data.slice(5,7));
                data.push(newVal.data.slice(7));
                newVal.data = data;
                this.setData({
                    themeData: newVal
                })
            }
            if (type_ == 10) {
                newVal.data = newVal.data.slice(0, type_);
                let data = [];
                data.push(newVal.data.slice(0, 1));
                data.push(newVal.data.slice(1,3));
                data.push(newVal.data.slice(3,5));
                data.push(newVal.data.slice(5,6));
                data.push(newVal.data.slice(6,8));
                data.push(newVal.data.slice(8));
                newVal.data = data;
                this.setData({
                    themeData: newVal
                })
            }
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

