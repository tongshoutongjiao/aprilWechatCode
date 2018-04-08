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
    s=s.toFixed(2);
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
    s=s.toFixed(1);
    return s;
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
module.exports = {
    GetDistance: GetDistance,
    distanceByLnglat: distanceByLnglat,
    getSystem: getSystem
}
