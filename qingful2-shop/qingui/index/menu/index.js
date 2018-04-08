const util = require("../../../utils/util.js");

Component({
    properties: {
        menuData: {
            type: Object,
            value: {},
            observer: function (newVal, oldVal) { }
        }
    },
    data: {
        defaultWidth: util.getSystem().windowWidth,  // 微信浏览器宽
        menu_:{
            slideWidth:0,
            slideRatio:0,
            slideLeft:0
        }
    },
    attached: function () {
        let DATA = this.data.menuData;
        if (DATA.config) {
            let menu_num = [];   // 每行快捷菜单个数
            let data_ = DATA.data.length;
            for (let i = DATA.config.show_line; i > 0; i--) {
                if (i == DATA.config.show_line) {
                    let line = Math.ceil(data_ / i);
                    menu_num.push(line);
                    data_ -= line;
                } else if (i == 1) {
                    menu_num.push(data_);
                } else {
                    let line = Math.ceil(data_ / i);
                    if (line < menu_num[0]) {
                        line = menu_num[0];
                        data_ -= line;
                    }
                }
            }

            let data = [];
            let num_ = 0;
            menu_num.forEach(num => {
                data.push(DATA.data.slice(num_, num_ + num));
                num_ = num_ + num;
            });
            DATA.data = data;
            this.setData({
                menuData: DATA
            })
        }
    },
    ready(){
        let self = this;
        var interval = setInterval(function () {
            if (self.data.menuData.data.length) {
                // 计算快捷菜单滚动条比例
                self.getRatio();
                clearInterval(interval);
            }
        });
    },
    methods: {
        // 计算快捷菜单滚动条比例
        getRatio: function () {
            if (!this.data.menuData.data[this.data.menuData.data.length - 1] || this.data.menuData.data[this.data.menuData.data.length-1].length <= this.data.menuData.config.line_num) {
                this.data.menuData.config.show_scroll = 0;
                this.setData({
                    menuData: this.data.menuData
                });
            } else {
                let _totalLength = (this.data.defaultWidth / this.data.menuData.config.line_num) * this.data.menuData.data[0].length; // 分类列表总长度
                let _ratio = 200 / (750 / this.data.defaultWidth) / _totalLength; // 滚动列表长度与滑条长度比例
                let _showLength = this.data.defaultWidth / _totalLength * 200 / (750 / this.data.defaultWidth); // 当前显示红色滑条的长度
                this.data.menu_.slideWidth = _showLength;
                this.data.menu_.slideRatio = _ratio;
                this.setData({
                    menu_: this.data.menu_
                });
            }
        },
        // 快捷菜单滑块动态变化
        getleft: function (e) {
            this.data.menu_.slideLeft = e.detail.scrollLeft * this.data.menu_.slideRatio;
            console.log(this.data.menu_.slideLeft)
            this.setData({
                menu_: this.data.menu_
            });
        }
    }
});
