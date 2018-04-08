Component({
    properties: {
        audioData: {
            type: Object,
            value: {
                config: {
                    height: 72,
                    color: 'rgba(33, 33, 33, 0.4)',
                    top: 20,
                    right: 22,
                    size: 28,
                    left: 8,
                    icontop: 6
                }
            },
            observer: function(newVal, oldVal) {

            }
        }
    },
    data: {
        poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
        name: '此时此刻',
        author: '许巍',
        animationData: {},
        timerId: 0,
        src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'
    },
    attached: function() {
        // this.init();

        // var fage = true;
        // this.audioCtx = wx.createAudioContext('myAudio');
        // this.audioCtx.play();
        // var page = this;
        // var animation = wx.createAnimation({
        //     duration: "infinite"
        // })

        // this.animation = animation

        // this.setData({
        //     animationData: animation.export()
        // })
        // var n = 0;
        // //连续动画需要添加定时器,所传参数每次+1就行
        // var timer = setInterval(function() {
        //     n = n + 1;
        //     this.animation.rotate(10 * (n)).step()
        //     this.setData({
        //         animationData: this.animation.export()
        //     })
        // }.bind(this), 100);
        // page.setData({
        //     timerId: timer
        // })
    },
    methods: {
        init: function() {
            this.animation = wx.createAnimation({
                duration: 1400,
                timingFunction: 'linear', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
                delay: 0,
                transformOrigin: '50% 50% 0',
                success: function(res) {
                    console.log("res")
                }
            })
            let n = 0;
            const timer = setInterval(function() {
                n++;
                this.animation.rotate(10 * n).step()
                this.setData({
                    animationData: this.animation.export()
                })
            }.bind(this), 100);

            this.setData({
                timerId: timer
            })
        },
        audioPause: function() {
            // clearInterval(this.data.timerId);
            var page = this;
            if (fage) {
                clearInterval(this.data.timerId);
                this.audioCtx.pause();
                fage = false;
            } else {
                var n = 0;
                this.audioCtx.play();
                var timer = setInterval(function() {
                    n = n + 1;
                    this.animation.rotate(10 * (n)).step()
                    this.setData({
                        animationData: this.animation.export()
                    })
                }.bind(this), 100);
                page.setData({
                    timerId: timer
                })
                fage = true;
            }
        }
    }
});