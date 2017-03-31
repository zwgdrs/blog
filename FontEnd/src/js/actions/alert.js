/*component里面执行的提示弹出框
 @messgage 提示文字
 */


const tipsBox = (messgage, type) => {
    switch (type) {
        case "showTips":
            return {
                type: "showTips",
                messgage
            }
        case "hideTips":
            return {
                type: "hideTips",
                messgage: ""
            }
        default:
            return {
                type: "showTips",
                messgage
            }
    }

}

const _alert = (messgage) => {
    return (dispatch, getState) => {
        dispatch(tipsBox(messgage, "showTips"))
        setTimeout(function() {
            dispatch(tipsBox(messgage, "hideTips"))
        }, 5000)
    }
}


/*Store里面执行的提示弹出框
 @dispatch 默认
 @messgage 提示文字
 @fn 提示框消失的回调
 */
const _alertStore = (dispatch, messgage, fn) => {
    dispatch(tipsBox(messgage, "showTips"))
    setTimeout(function() {
        dispatch(tipsBox(messgage, "hideTips"))
        fn && fn()
    }, 1000)
}

export {
    _alert,
    _alertStore
}