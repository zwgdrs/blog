// Android find
if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this == null) {
            throw new TypeError('Array.prototype.find called on null or undefined')
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function')
        }
        var list = Object(this)
        var length = list.length >>> 0
        var thisArg = arguments[1]
        var value

        for (var i = 0; i < length; i++) {
            value = list[i]
            if (predicate.call(thisArg, value, i, list)) {
                return value
            }
        }
        return undefined
    }
}

export const isAndroid = navigator.userAgent.match(/android/ig)
export const isIos = navigator.userAgent.match(/iphone|ipod|ipad/ig)


/** *******************
 * desc: 判断是否是线上环境,若是线上环境,则将url进行转换,同时支持c.m和c.3g两种线上地址
 * params url: 待转换的url type: 有两个值,1和2,1代表各种后台接口的转换 2代表各种实际页面(类似分享页面的url更改)
 * return 经过转换的url
 **********************/

export function changeUrl(url, type) {
    let finalUrl = url
    const onLineBool = window.location.href.match(/t\.c\.m/i)
    if (!onLineBool) {
        if (type === 1) {
            finalUrl = url.replace(/t\.c\.m/, 'c.m')
        } else {
            finalUrl = url.replace(/t\.c\.m\.163\.com/, 'c.m.163.com/nc/qa')
        }
    }
    if (window.location.href.match(/c\.3g/i)) {
        finalUrl = finalUrl.replace(/c\.m/i, 'c.3g')
    }
    return finalUrl
}


/** *******************
 * desc:将url的search转换成键值对格式
 * params: url:待解析的url
 * return search的键值对
 **********************/

export function erilizeUrl(url) {
    let result = {}
    let urlArray = url.split('?')
    for (let urlIndex = 1; urlIndex < urlArray.length; urlIndex++) {
        let map = urlArray[urlIndex].split('&')
        for (let i = 0, len = map.length; i < len; i++) {
            result[map[i].split('=')[0]] = map[i].split('=')[1]
        }
    }
    return result
}


/** *******************
 * desc:截取文本
 * params: text: 待截取的文本 len: 需要限制的长度,多余的字数用...表示
 * return 处理好的文本
 **********************/

export function erilizeText(text, len) {
    if (text && text.length > len) {
        return (text.slice(0, len) + '...')
    }
    return text
}


/** *******************
 * desc:用于调试,在移动端上可以打印对象
 * params: obj:待打印的对象
 **********************/

// export function writeObj(obj) {
//   let description = ''
//   for (let i in obj) {
//     let property = obj[i]
//     description += i + ' = ' + property + '\n'
//   }
//   alert(description)
// }


/** *******************
 * desc: 将开始时间与结束时间转换成字符串
 * params: begin 开始时间,单位为毫秒数 end 结束时间,单位为毫秒数
 **********************/

export function limitTime(begin, end) {
    const beginTime = new Date(begin)
    const endTime = new Date(end - 1000 * 60 * 60 * 24)
    const limit = `${beginTime.getMonth() + 1}.${beginTime.getDate()} - ${endTime.getMonth() + 1}.${endTime.getDate()}`
    return limit
}


export function editor() {
    this.update = function () {
        this.preview.innerHTML = markdown.toHTML(this.edit.value);
    }
    this.edit.editor = this;
    this.update();
}


/** *******************
 * desc:
 * params:
 **********************/

export function getSelect(textarea) {
    let userSelection;
    if (window.getSelection) { //现代浏览器
        userSelection = window.getSelection();
    } else if (document.selection) { //IE浏览器 考虑到Opera，应该放在后面
        userSelection = document.selection.createRange();
    }

    const getRangeIndex = function (selectionObject) {
        if (window.getSelection)
            return [textarea.selectionStart, textarea.selectionEnd];
        else { // 较老版本Safari!
            let range = document.selection.createRange();             //对选择的文字create Range
            // var selectText          = range.text;                                //选中的文字
            const selectTextLength = range.text.length;                            //选中文字长度
            textarea.select();                                                      //textarea全选
            //StartToStart、StartToEnd、EndToStart、EndToEnd
            range.setEndPoint("StartToStart", document.selection.createRange());    //指针移动到选中文字开始
            const selectTextPosition = range.text.length;                            //选中文字的结束位置
            range.collapse(false);                                                  //将插入点移动到当前范围的开始
            range.moveEnd("character", -selectTextLength);   //更改范围的结束位置，减去长度，字符开始位置，character不能改
            range.moveEnd("character", selectTextLength);   //再更改范围的结束位置，到字符结束位置
            range.select();                                                         //然后选中字符

            //返回字符的开始和结束位置
            return [selectTextPosition - selectTextLength, selectTextPosition];
        }
    }

    const rangeIndex = getRangeIndex(userSelection);
    // selectionStart = rangeIndex[0];
    // selectionEnd = rangeIndex[1];
    return rangeIndex
}