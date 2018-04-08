function Rad(d) {
    return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
}
//计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度，得到公里
function GetDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137; // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000; //输出为公里
    s = s.toFixed(2);
    return s;
}
//计算距离，参数分别为第一点的经度，纬度；第二点的经度，纬度；得到米
function distanceByLnglat(lng1, lat1, lng2, lat2) {
    var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378137.0; // 取WGS84标准参考椭球中的地球长半径(单位:m)
    s = Math.round(s * 10000) / 10000;
    s = s.toFixed(1);
    return s;
}
/**
 * 使用循环的方式判断一个元素是否存在于一个数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
function isInArray(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
            return true;
        }
    }
    return false;
}

function isSet(name) {
    if (name != "" && name != undefined && name != "undefined") {
        return true;
    }
    return false;
}

function removeByValue(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}

function array_remove_repeat(a) { // 去重
    var r = [];
    for (var i = 0; i < a.length; i++) {
        var flag = true;
        var temp = a[i];
        for (var j = 0; j < r.length; j++) {
            if (temp == r[j]) {
                flag = false;
                break;
            }
        }
        if (flag) {
            r.push(temp);
        }
    }
    return r;
}

function array_intersection(a, b) { // 交集
    var result = [];
    for (var i = 0; i < b.length; i++) {
        var temp = b[i];
        for (var j = 0; j < a.length; j++) {
            if (temp === a[j]) {
                result.push(temp);
                break;
            }
        }
    }
    return array_remove_repeat(result);
}

function array_union(a, b) { // 并集
    return array_remove_repeat(a.concat(b));
}

function array_difference(a, b) { // 差集 a - b
    //clone = a
    var clone = a.slice(0);
    for (var i = 0; i < b.length; i++) {
        var temp = b[i];
        for (var j = 0; j < clone.length; j++) {
            if (temp === clone[j]) {
                //remove clone[j]
                clone.splice(j, 1);
            }
        }
    }
    return array_remove_repeat(clone);
}
// 获取微信浏览器数据
const getSystem = () => {
    let info = {};
    //判断 基础库版本
    if (!wx.getSystemInfo) {
        wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    }
    wx.getSystemInfo({
        success: res => {
            info = res;
        }
    });
    //微信版本信息
    wx.setStorageSync("systemInfo", info);
    return info;
}
//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

function getBytesLength(str) {
    // 在GBK编码里，除了ASCII字符，其它都占两个字符宽
    return str.replace(/[^\x00-\xff]/g, "xx").length;
}
//跳转
function navigateTo(target_type, target_url) {
    //跳转页面
    if (target_type == 'page') {
        let url = '';
        try {
            const target_page = wx.getStorageSync('target_page');
            if (target_page) {
                if (target_page == 'index') {
                    wx.setStorageSync('target_page', 'index2');
                    url = `/pages/index2/index?id=${target_url}`;
                } else {
                    wx.setStorageSync('target_page', 'index');
                    url = `/pages/index/index?id=${target_url}`;
                }
            } else {
                wx.setStorageSync('target_page', 'index2');
                url = `/pages/index2/index?id=${target_url}`;
            }
        } catch (e) {
            // Do something when catch error
        }
        wx.navigateTo({
            url: url
        })
    }
    //跳转小程序
    if (target_type == 'wxa') {
        wx.navigateToMiniProgram({
            appId: target_url,
            success(res) {
                // 打开成功
            },
            fail(err) {
                console.log(err)
            }
        })
    }
    //跳转集赞活动
    if (target_type == 'jizan') {
        let url = `/pages/plugin/jizan/index?id=${target_url}`;
        wx.navigateTo({
            url: url
        })
    }
    //跳转论坛
    if (target_type == 'bbs') {
        let url = `/pages/plugin/bbs/index/index`;
        wx.navigateTo({
            url: url
        })
    }
}

module.exports = {
    GetDistance: GetDistance,
    distanceByLnglat: distanceByLnglat,
    isInArray: isInArray,
    isSet: isSet,
    removeByValue: removeByValue,
    array_remove_repeat: array_remove_repeat,
    array_union: array_union,
    getSystem: getSystem,
    randomNum: randomNum,
    getBytesLength: getBytesLength,
    navigateTo: navigateTo
}