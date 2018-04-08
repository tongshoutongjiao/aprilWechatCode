Page({
    data: {
        status: 0, //弹框默认不显示
        topic: [],
        img_list: [],
        uploadData: {
            type: Object, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: {
                name: "upload",
                config: {
                    style_type: 1 //样式1样式2
                }
            },
            observer: function(newVal, oldVal) {}
        },
        color: wx.getExtConfigSync().color
    },
    onLoad: function(options) {
        this.getLocation();
        this.getBbsPlate();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    // 添加话题弹框
    addTopic() {
        const status = this.data.status ? 0 : 1;
        this.setData({
            status: status
        });
    },
    // 经纬度获取位置
    getLocation(e) {
        const that = this;
        const location = wx.getStorageSync("location");
        wx.BaaS
            .fetch(
                `http://restapi.amap.com/v3/geocode/regeo?key=1b12ed5c6ec522ea783ad87bd4ce0bf2&location=${location.lng},${location.lat}`
            )
            .then(res => {
                const address = res.data.regeocode.formatted_address;
                that.setData({
                    address: address,
                    location: location
                });
            });
    },
    //获取帖子分类-话题
    getBbsPlate: function() {
        const url = "/2.0/class/api/function/getBbsPlate";
        wx.BaaS.fetch(url).then(res => {
            if (res && res.data.code && res.data.data) {
                this.setData({
                    topic: res.data.data
                });
            }
        });
    },
    // 选择标签
    selectTap(e) {
        const plate = Array();
        const id = e.currentTarget.dataset.id;
        const topic = this.data.topic;
        for (const item of topic) {
            if (id == item.id) {
                item.select = item.select ? 0 : 1;
                plate.push(item.id);
            }
        }
        this.setData({
            plate: plate,
            topic: topic
        });
    },
    //选择位置信息
    chooseShopMap: function() {
        const that = this;
        wx.chooseLocation({
            type: "gcj02", //返回可以用于wx.openLocation的经纬度
            success: function(res) {
                that.setData({
                    address: res.name,
                    lat: res.latitude,
                    lng: res.longitude
                });
            }
        });
    },
    // 选择图片
    chooseImage: function() {
        var that = this;
        wx.chooseImage({
            count: 6,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"],
            success: function(res) {
                const pushData = imgs => {
                    that.data.img_list.push.apply(that.data.img_list, imgs);
                    var len = that.data.img_list.length;
                    if (len > 6) {
                        that.data.img_list = that.data.img_list.splice(
                            len - 6,
                            6
                        );
                    }
                    that.setData({
                        img_list: that.data.img_list
                    });
                    const uploadData = that.data.uploadData;
                    uploadData.img_list = that.data.img_list;
                    // that.triggerEvent("upload-event", {
                    //     pIndex: that.data.pIndex,
                    //     data: uploadData
                    // });
                };
                if (res.tempFilePaths.length) {
                    that.uploadImage(res.tempFilePaths, pushData);
                } else {
                    pushData([]);
                }
            }
        });
    },
    //长按图片删除图片
    deleteImage(e) {
        var that = this;
        var index = e.currentTarget.dataset.index;
        wx.showModal({
            title: "是否要删除图片",
            showCancel: true,
            success: function(res) {
                if (res.confirm) {
                    that.data.img_list.splice(index, 1);
                    that.setData({
                        img_list: that.data.img_list
                    });

                    const uploadData = that.data.uploadData;
                    uploadData.img_list = that.data.img_list;
                    // that.triggerEvent("upload-event", {
                    //     pIndex: that.data.pIndex,
                    //     data: uploadData
                    // });
                }
            }
        });
    },
    //上传图片
    uploadImage: function(paths, callback, imgs) {
        const that = this;
        const path = paths.shift();
        imgs = imgs || [];
        wx.BaaS.upload({
            url: "/2.0/class/api/image/upload",
            name: "file",
            filePath: path,
            success: function(res) {
                res.data = JSON.parse(res.data);
                console.log("上传成功", res);
                imgs.push(`http://img1.qingful.com/${res.data.data}`);
                if (paths.length) {
                    that.uploadImage(paths, callback, imgs);
                } else {
                    callback.apply(this, [imgs]);
                }
            }
        });
    },
    // 监听帖子内容
    contentInput(e) {
        const content = e.detail.value;
        this.setData({
            content: content
        });
    },
    // 监听标题
    titleInput(e) {
        const title = e.detail.value;
        this.setData({
            title: title
        });
    },
    // 监听手机号码输入
    phoneInput(e) {
        const phone = e.detail.value;
        this.setData({
            phone: phone
        });
    },
    //发布帖子
    addBbsPost: function() {
        const phone = this.data.phone;
        const plate = this.data.plate;
        const title = this.data.title;
        const content = this.data.content;
        const img_list = this.data.img_list;
        // 验证手机号
        let reg = /^1[34578]\d{9}$/;
        if (!reg.test(phone)) {
            wx.showModal({
                title: "提示",
                showCancel: false,
                content: "手机号不正确"
            });
            return;
        }
        wx.BaaS
            .fetch("/2.0/class/auth_api/function/addBbsPost", {
                method: "post",
                data: {
                    title: title,
                    content: content,
                    img: JSON.stringify(img_list),
                    address: this.data.address,
                    lng: this.data.location.lng,
                    lat: this.data.location.lat,
                    phone: phone,
                    plate: plate
                }
            })
            .then(res => {
                if (res && res.data.code && res.data.data) {
                    wx.showModal({
                        title: "提示",
                        content: "提交成功",
                        showCancel: false,
                        success: function(res) {
                            console.log("用户点击确定");
                        }
                    });
                    setTimeout(function() {
                        wx.navigateBack();
                    }, 1000);
                }
            });
    }
});
