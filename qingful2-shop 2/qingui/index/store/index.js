const util = require("../../../utils/util.js");

Component({
    properties: {
        storeData: {
            type: Object,
            value: {},
            observer: function(newVal, oldVal) {}
        }
    },
    data: {
        defaultWidth: util.getSystem().windowWidth, // 微信浏览器宽
    },
    attached: function() {
        // console.log(this.data.storeData);
    },
    methods: {
        call: (e) => {
            const { phone } = e.currentTarget.dataset;
            wx.makePhoneCall({
                phoneNumber: phone.toString() //仅为示例，并非真实的电话号码
            })
        },
        openAddress: (e) => {

            const { lat, lng, address } = e.currentTarget.dataset;

            if (lat && lng) {
                wx.openLocation({
                    latitude: parseFloat(lat),
                    longitude: parseFloat(lng),
                    scale: 18,
                    name: address,
                    success: function(res) {}
                })
            }
        }
    }
});