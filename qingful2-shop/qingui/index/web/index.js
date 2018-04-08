Component({
    properties: {
        webData: {
            type: Object,
            value: {
                config:{
                    url:'https://mp.weixin.qq.com/'
                }
            },
            observer: function (newVal, oldVal) { }
        }
    },
    data: {},
    attached: function () {
        // console.log(this);
    },
    methods: {
        
    }
});
