const util = require("../../../utils/util.js");

Component({
    properties: {
        tongxunluData: {
            type: Object,
            value: {},
            observer: function(newVal, oldVal) {

            }
        }
    },
    data: {
        defaultWidth: util.getSystem().windowWidth, // 微信浏览器宽
    },
    attached: function() {
        const tongxunluData = this.data.tongxunluData;

        const arr = tongxunluData.config.label ? JSON.parse(tongxunluData.config.label) : [];
        const { lng, lat } = tongxunluData.config;
        tongxunluData.config.distance = 0

        wx.getLocation({
            type: 'wgs84',
            success: (res) => {
                const latitude = res.latitude
                const longitude = res.longitude
                if (!lng || !lat) {
                    tongxunluData.config.distance = 0
                } else {
                    tongxunluData.config.distance = util.GetDistance(lng, lat, longitude, latitude);
                }

                tongxunluData.config.labelArr = arr;
                this.setData({ tongxunluData: tongxunluData });
            }
        })
    },
    methods: {
        //打开地图
        openLocation: (e) => {
            const { lat, lng, address } = e.currentTarget.dataset;
            if (lat && lng) {
                wx.openLocation({
                    latitude: parseFloat(lat),
                    longitude: parseFloat(lng),
                    scale: 18,
                    name: address,
                    success: function(res) {}
                });
            }
        },
        //拨打电话
        makePhoneCall: function(e) {
            const phone = e.currentTarget.dataset.phone;

            wx.makePhoneCall({
                phoneNumber: phone.toString() //仅为示例，并非真实的电话号码
            })
        }
    },
    ready() {

    }
});