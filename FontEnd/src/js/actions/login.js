/*登录注册
 @type 注册or登录or退出登录
 @data 注册数据or登录数据
 */
import { _alertStore } from './alert'
import { mobBoxData } from './modal'
const requestAPI = "http://localhost:8080/"
const submitCallback = (dispatch, params, type, data) => {
    fetch(requestAPI + params, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    }).then(function(res) {
        return res.json()
    }).then(function(data) {
        return dispatch(mobBoxData(type, data))
    }).then(function(req) {
        let data = req.data
        if (data.code === 1000) {
            /*登录成功*/
            dispatch(mobBoxData("mobBoxClose"))
            if (type == "loginSubmit") {
                return dispatch(loginTop("loginIn", data))
            }
            if (type == "regSubmit") {
                return _alertStore(dispatch, data.messgage)
            }
        } else {
            return _alertStore(dispatch, data.messgage)
        }
    })
        .catch(function(e) {
            console.error(e)
        });
}

const loginOutSubmit = (dispatch) => {
    fetch(requestAPI + "loginOut", {
        credentials: 'include'
    }).then(function(res) {
        return res.json()
    }).then(function(data) {
        dispatch(loginTop("loginOut"))
        return _alertStore(dispatch, "退出成功", function() {
            hashHistory.push('/')
        })
    }).catch(function(e) {
        console.error(e)
    })
}


/*登录切换上面欢迎条
 @type 登录or退出登录
 */
export const loginTop = (type, data) => {
    switch (type) {
        case "loginIn":
            return {
                type: "loginIn",
                data
            }
        case "loginOut":
            return {
                type: "loginOut"
            }
    }
}

const loginSubmit = (type, data) => {
    return (dispatch, getState) => {
        switch (type) {
            case "loginSubmit":
                return submitCallback(dispatch, "login", type, data)
            case "regSubmit":
                return submitCallback(dispatch, "reg", type, data)
            case "loginOut":
                return loginOutSubmit(dispatch)
            default:
                return
        }

    }
}

/*获取用户登录信息*/
const getUserInfo = () => {
    return (dispatch) => {
        fetch(requestAPI + "getUserInfo", {
            credentials: 'include'
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.code === 1000) { //已登录
                    return dispatch(loginTop("loginIn", data))
                }
                if (data.code === 1001) {
                    return dispatch(loginTop("loginOut", data))
                }
            })
            .catch(function(e) {
                console.error(e);
            });
    }
}

export {
    loginSubmit,
    getUserInfo
}