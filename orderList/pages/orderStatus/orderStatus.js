// pages/orderList/orderList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectedTab: 0,
        listData: [],
        winHeight: "",// 窗口高度

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //   高度自适应
        wx.getSystemInfo({
            success: res => {
                console.log(res);
                let clientHeight = res.windowHeight,
                    clientWidth = res.windowWidth,
                    rpxR = 750 / clientWidth;
                console.log('rpxR=' + rpxR);
                let calc = clientHeight * rpxR - 100;
                console.log(calc);
                this.setData({
                    winHeight: calc
                })

            }
        })


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    selectTap:function (e) {
        console.log('事件源'+e);
        let cur=e.currentTarget.dataset.id;
        console.log(cur);
        if(this.data.selectedTab==cur){return false;}
        else {
            this.setData({
                selectedTab: cur
            })
        }
    },
    //  滚动切换标签样式
    switchTab:function(e){
        this.setData({
            selectedTab:e.detail.current
        });
        this.checkCor();
    },
//    判断当前滚动超过一屏时，设置tab标签滚动条
    checkCor:function(){
        if (this.data.selectedTab>3){
            this.setData({
                scrollLeft:300
            })
        }else{
            this.setData({
                scrollLeft:0
            })
        }
    },




});