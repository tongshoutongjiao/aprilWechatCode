// pages/uploadImg/uploadImg.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topic: [],
        topicTitle: '',
        address: '',
        img_list: [],
        shop: {},
        uploadData: {
            type: Object, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: {
                name: 'upload',
                config: {
                    style_type: 1 //样式1样式2
                }
            },
            observer: function (newVal, oldVal) {
            }
        },
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.getBbsPlate();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    //  获取帖子分类-话题
    getBbsPlate: function () {
        const url = '/2.0/class/api/function/getBbsPlate';
        wx.BaaS.fetch(url).then(res => {
            if (res && res.data.code && res.data.data) {
                res.data.data.forEach(function (item, index) {
                    item.index = index;
                });
                this.setData({
                    topic: res.data.data
                });
            }
        });
    },

    //  选择位置信息
    chooseShopMap: function () {
        const that = this;
        console.log('获取经纬度');
        wx.chooseLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success: function (res) {
                console.log('选取店铺位置', res);
                let shop = that.data.shop;
                shop.position = res.address;
                shop.latitude = res.latitude;
                shop.longitude = res.longitude;
                that.setData({
                    shop
                })
            }
        })
    },

    //  点击上传话题图片
    bindUpLoadImg: function () {
        let that = this;
        wx.chooseImage({
            count: 6,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success: function (res) {
                const pushData = imgs => {
                    that.data.img_list.push.apply(that.data.img_list, imgs);
                    let len = that.data.img_list.length;
                    if (len > 6) {
                        that.data.img_list = that.data.img_list.splice(len - 6, 6);
                    }
                    that.setData({
                        img_list: that.data.img_list
                    });
                    const uploadData = that.data.uploadData;
                    uploadData.img_list = that.data.img_list;
                    /*  that.triggerEvent('upload-event', {
                          pIndex: that.data.pIndex,
                          data: uploadData
                      });*/
                };
                if (res.tempFilePaths.length) {
                    console.log('上传图片');
                    console.log(res.tempFilePaths);

                      that.uploadImage(res.tempFilePaths, pushData);
                } else {
                    pushData([]);
                }
            }
        });

    },

    //上传图片
    uploadImage: function (paths, callback, imgs) {
        const that = this;
        console.log(paths);
        const path = paths.shift();
        imgs = imgs || [];

        wx.BaaS.upload({
            url: "/2.0/class/api/image/upload",
            name: "file",
            filePath: path,
            success: function (res) {
                console.log('1');
                res.data = JSON.parse(res.data);
                console.log("上传成功", res);
                imgs.push(`http://img1.qingful.com/${res.data.data}`);
                console.log(imgs);
                if (paths.length) {
                    that.uploadImage(paths, callback, imgs);
                } else {
                    callback.apply(this, [imgs]);
                }
            }
        })
    },

    //发布帖子
    addBbsPost: function (data) {
        wx.BaaS.fetch("/2.0/class/auth_api/function/addBbsPost", {
            method: "post",
            data: data,
        })
            .then(res => {
                if (res && res.data.code && res.data.data) {
                    wx.showModal({
                        title: '提示',
                        content: '提交成功',
                        showCancel: false,
                        success: function (res) {
                            console.log('用户点击确定')
                        }
                    })
                }
            });
    },

    //删除图片
    deleteImage(e) {
        let that = this;
        let index = e.currentTarget.dataset.index;
        wx.showModal({
            title: "是否要删除图片",
            showCancel: true,
            success: function (res) {
                if (res.confirm) {
                    that.data.img_list.splice(index, 1);
                    that.setData({
                        img_list: that.data.img_list
                    });

                    const uploadData = that.data.uploadData;
                    uploadData.img_list = that.data.img_list;
                    /* that.triggerEvent('upload-event', {
                         pIndex: that.data.pIndex,
                         data: uploadData
                     });*/
                }
            }
        });
    },

    // 获取话题
    getTopic: function (e) {
        this.setData({
            topicTitle: e.detail.value
        })
    },

    // 获取帖子描述内容
    getDescription: function (e) {
        this.setData({
            desc: e.detail.value
        });
        console.log(e)
    },

    // 获取电话号码
    getPhoneNumber: function (e) {
        console.log('获取用户的电话号码');
        console.log(e);
        this.setData({
            phoneNumber: e.detail.value
        })
    },

    // 选择标签
    selectedTag: function (e) {
        let index = e.currentTarget.dataset.index,
            data = this.data.topic[index];
        data.selected = !data.selected;
        this.setData({
            [`topic[${index}]`]: data
        });
    },

    // 点击按钮发布话题
    publishTopic: function () {
        let topicData = {}, selectData = [], imgList;
        let {topicTitle, desc, phoneNumber, topic, img_list, shop} = this.data;
        topic.forEach(function (item, index) {
            item.selected ? selectData.push(item.id) : '';
        });
        imgList = JSON.stringify(img_list);
        topicData = {
            title: topicTitle,
            content: desc,
            phone: phoneNumber,
            address: shop.position,
            lng: shop.longitude,
            lat: shop.latitude,
            plate: selectData,
            img: imgList
        };

         this.addBbsPost(topicData);
    }

});