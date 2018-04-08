// pages/itemList/itemList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topicData:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getBbsPlate();
    },
    //获取帖子分类-话题
    getBbsPlate: function () {
        const url = '/2.0/class/api/function/getBbsPlate';
        wx.BaaS.fetch(url).then(res => {
            if (res && res.data.code && res.data.data) {
                const Data = res.data.data;
                console.log(Data);
                this.setData({
                    topicData: res.data.data
                });
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    navigatorItemIndex: function () {
        wx.navigateTo({
            url: '/pages/plugin/bbs/itemIndex/itemIndex'
        })

    }
})