const config = require('../config');

const formatNumber = n => {
    n = n.toString();
    return n[1] ? n : '0' + n
};
exports.formatTime = date => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

/**
 * extend
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;

exports.extend = function () {
    const target = {};
    for (let i = 0; i < arguments.length; i++) {
        __extend(target, arguments[i]);
    }
    return target;
};

function __extend(target, source) {
    for (let key in source) {
        if (!hasOwnProperty.call(source, key)) break;
        if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
            target[key] = typeof target[key] === 'object' ? target[key] : {};
            __extend(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
}


/**
 *  rpx 转 px
 * @param num
 * @returns {number}
 */
exports.rpxToPx = function (num) {
    return app.data.system.windowWidth * num / 750;
};


/**
 * json to param
 * @param json
 * @returns {string}
 */
exports.jsonToParam = function (json) {
    let param = [];
    for (let i in json) {
        param.push(i + '=' + (typeof json[i] === 'object' ? JSON.stringify(json[i]) : json[i]));
    }
    return param.join('&');
};

/**
 * json to array
 * @param json
 * @returns {string}
 */
exports.jsonToArray = function (json, keyName, valueName) {
    let arr = [];
    for (let i in json) {
        let obj = {};
        obj[keyName || 'key'] = i;
        obj[valueName || 'value'] = json[i];
        arr.push(obj);
    }
    return arr;
};

/**
 * trim
 */
exports.trim = function (a) {
    var regStart = /^\s+/, regEnd = /\s+$/;
    return a.replace(regStart, '').replace(regEnd, '');
};

/**
 * @function 解码
 * @param text
 * @returns {*}
 */
exports.decodeContent = function (text) {
    if (!config.debug) return text;
    try {
        text = decodeURIComponent(decodeURIComponent(text));
    } catch (e) {
        text = '';
    }
    return text;
};

// 随机切换背景颜色
exports.getRandomColor = function () {
    let defaultColor = ['#DDC4C4', '#C1BE88', '#D58D8D', '#A2C3AA', '#BAC4D6', '#A9A6D4'];
    return defaultColor[Math.round(Math.random() * 5)];
};

module.exports = exports;
