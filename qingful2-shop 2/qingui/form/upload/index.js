Component({
    behaviors: ['wx://form-field'],
    properties: {
        uploadData: {
            type: Object, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: {
                name: 'upload',
                config: {
                    style_type: 1 //样式1样式2
                }
            },
            observer: function(newVal, oldVal) {}
        },
        pIndex: {
            type: Number,
            value: 0,
            observer: function(newVal, oldVal) {}
        }
    },
    data: {
        // 这里是一些组件内部数据
        img_list: []
    },
    methods: {
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
                            that.data.img_list = that.data.img_list.splice(len - 6, 6);
                        }
                        that.setData({
                            img_list: that.data.img_list
                        });

                        const uploadData = that.data.uploadData;
                        uploadData.img_list = that.data.img_list;
                        that.triggerEvent('upload-event', {
                            pIndex: that.data.pIndex,
                            data: uploadData
                        });
                    };
                    if (res.tempFilePaths.length) {
                        that.uploadImage(res.tempFilePaths, pushData);
                    } else {
                        pushData([]);
                    }
                }
            });
        },
        //删除图片
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
                        that.triggerEvent('upload-event', {
                            pIndex: that.data.pIndex,
                            data: uploadData
                        });
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
            })
        },
    }
})