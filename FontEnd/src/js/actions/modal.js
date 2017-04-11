/*登录注册框
 @type 判断类型
 */
const mobBoxData = (type, data) => {
    switch (type) {
        case "loginShow":
            return {
                type: "loginShow",
                isShow: type
            }
        case "regShow":
            return {
                type: "regShow",
                isShow: type
            }
        case "mobBoxClose":
            return {
                type: "mobBoxClose",
                isShow: false
            }
        case "loginSubmit":
            return {
                type: "loginSubmit",
                data
            }
        case "regSubmit":
            return {
                type: "regSubmit",
                data
            }
            case "INPUT_IMG_SRC":
            return {
                type: "INPUT_IMG_SRC",
                data
            }
            case "INPUT_LINK_URL":
            return {
                type: "INPUT_LINK_URL",
                data
            }

    }
}

export {
    mobBoxData
}