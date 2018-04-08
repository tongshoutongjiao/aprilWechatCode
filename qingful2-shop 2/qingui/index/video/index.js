Component({
    properties: {
        videoData: {
            type: Object,
            value: {
                name:'video',
                config:{
                    w_margin: 10,
                    h_margin: 5,
                    src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
                    poster: 'http://www.qingful.com/public/uploads/2017-10-09/ff2d8130-ace5-11e7-8943-41d03e0a131f.jpg'
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
