/**
 *
 * @authors Your Name (you@example.org)
 * @date    2016-09-05 12:55:47
 * @version $Id$
 */
import {combineReducers, createStore, applyMiddleware} from "redux"
import thunkMiddleware from 'redux-thunk'

/*切换菜单栏*/
const switchNews = (state = [], action) => {
    switch (action.type) {
        case 'containers':
            return action.data
        default:
            return state
    }
}
/*登录注册框显示隐藏*/
const mobBoxData = (state = {isShow: false, data: {}}, action) => {
    switch (action.type) {
        case 'loginShow':
            return Object.assign({}, state, {isShow: action.isShow})
        case 'loginSubmit':
            return Object.assign({}, state, {data: action.data})
        case 'regShow':
            return Object.assign({}, state, {isShow: action.isShow})
        case 'regSubmit':
            return Object.assign({}, state, {data: action.data})
        case 'mobBoxClose':
            return Object.assign({}, state, {isShow: false})
        case 'INPUT_IMG_SRC':
            return Object.assign({}, state, {data: action.data})
        case 'INPUT_LINK_URL':
            return Object.assign({}, state, {data: action.data})
        default:
            return state
    }
}
const isLogin = (state = {isLogin: false}, action) => {
    switch (action.type) {
        case "loginIn":
            return Object.assign({}, state, {isLogin: true, info: action.data.info})
        case "loginOut":
            return Object.assign({}, state, {isLogin: false})
        default :
            return state
    }
}
const tips = (state = {messgage: ""}, action) => {
    switch (action.type) {
        case "showTips":
            return Object.assign({}, state, {messgage: action.messgage})
        case "hideTips":
            return Object.assign({}, state, {messgage: action.messgage})
        default :
            return state
    }
}

const Clone = (obj) => {//深拷贝
    var objClone;
    if (obj.constructor == Object) {
        objClone = {};
    } else {
        objClone = new obj.constructor(obj.valueOf);

    }
    for (var key in obj) {
        if (objClone[key] != obj[key]) {
            if (typeof(obj[key]) == 'object') {
                objClone[key] = Clone(obj[key]);
            } else {
                objClone[key] = obj[key];
            }
        }
    }
    return objClone;
}
const addState = (state = [], action) => {
    switch (action.type) {
        case "TITLE":
            return state.map(el =>
                el.id === action.id ? Object.assign({}, el, {title: action.title}) : el
            )
        case "DEFAULT":
            return state.map(el =>
                el.id === action.id ? Object.assign({}, el, {default: action.default}) : el
            )
        case "TIS":
            return state.map(el =>
                el.id === action.id ? Object.assign({}, el, {tis: action.tis}) : el
            )
        case "MANFEN":
            return state.map(el =>
                el.id === action.id ? Object.assign({}, el, {manfen: action.manfen}) : el
            )
        case "PINGFENTYPE":
            return state.map(el =>
                el.id === action.id ? Object.assign({}, el, {curren: action.curren}) : el
            )
        case "MINVALUE":
            return state.map(el =>
                el.id === action.id ? Object.assign({}, el, {minValue: action.minValue}) : el
            )
        case "MAXVALUE":
            return state.map(el =>
                el.id === action.id ? Object.assign({}, el, {maxValue: action.maxValue}) : el
            )
        case "REQUIRED":
            return state.map(el =>
                el.id === action.id ? Object.assign({}, el, {required: action.required}) : el
            )
        case "READONLY":
            return state.map(el =>
                el.id === action.id ? Object.assign({}, el, {readonly: action.readonly}) : el
            )
        case "CLICK":
            var newstate = state.map(el => Object.assign({}, el, {active: false}))
            return newstate.map(el =>
                el.id === action.id ? Object.assign({}, el, {active: true}) : el
            )
        case "COPY":
            var newstate = state.map(el => Object.assign({}, el, {active: false}))
            var newstate = [...newstate.slice(0, action.id + 1),
                Object.assign({}, newstate[action.id], {active: true}),
                ...newstate.slice(action.id + 1)
            ]
            return newstate.map((el, i) =>
                Object.assign({}, el, el.id = i)
            )
        case "DELETE":
            var newstate = state.map(el => Object.assign({}, el, {active: false}))
            newstate = [...newstate.slice(0, action.id),
                ...newstate.slice(action.id + 1)
            ]
            if (action.id === 0) {//如果是第一个就把后面一个设为active
                newstate = newstate.map((el, i) =>
                    el.id === 1 ? Object.assign({}, el, {active: true}, {id: i}) : Object.assign({}, el, {id: i})
                )
            } else {//否则吧前面一个设为active
                newstate = newstate.map((el, i) =>
                    el.id === (action.id - 1) ? Object.assign({}, el, {active: true}, {id: i}) : Object.assign({}, el, {id: i})
                )
                console.log(newstate)
            }
            console.log(state)
            return newstate
        case "CHOICESCHECKED":
            var newstate = state.map(el => {
                if (el.id === action.id) {
                    var choices = Clone(el.choices);
                    if (action.inputType != "checkbox") {
                        choices.map(el => {
                            el.checked = false
                        })
                    }
                    choices[action.index].checked = action.choices;
                    return Object.assign({}, el, {choices: choices})
                } else {
                    return el
                }
            })
            return newstate;
        case "CHOICESINPUT":
            var newstate = state.map(el => {
                if (el.id === action.id) {
                    var choices = Clone(el.choices);
                    choices[action.index].value = action.choices;
                    return Object.assign({}, el, {choices: choices})
                } else {
                    return el
                }
            })
            return newstate;
        case "ADDITEM":
            var newstate = state.map(el => {
                if (el.id === action.id) {
                    var choices = Clone(el.choices);
                    var itemJson = {"checked": false, "value": ""};
                    choices.splice(action.index + 1, 0, itemJson)
                    return Object.assign({}, el, {choices: choices})
                } else {
                    return el
                }
            })
            return newstate
        case "DELITEM":
            var newstate = state.map(el => {
                if (el.id === action.id) {
                    var choices = Clone(el.choices);
                    choices = choices.filter((el, i) => {
                        return action.index !== i
                    })
                    return Object.assign({}, el, {choices: choices})
                } else {
                    return el
                }
            })
            return newstate
        case "SUBMITDATE":
            let arr = action.value.split(/\n/);
            let trimValue = [];
            for (let i = 0, len = arr.length; i < len; i++) {
                if (arr[i] != 0) trimValue[trimValue.length] = arr[i];
            }
            ;
            let newstate = state.map(el => {
                if (el.active) {
                    let choices = Clone(el.choices);
                    choices.length = trimValue.length;
                    for (var i = 0; i < choices.length; i++) {
                        if (!choices[i]) {
                            choices[i] = {"checked": false, "value": ""}
                        }
                        choices[i].value = trimValue[i]
                    }
                    ;
                    return Object.assign({}, el, {choices: choices})
                } else {
                    return el
                }
            });
            return newstate
        default :
            return state
    }
}
const ModalBoxIsNone = (state = false, action) => {
    if (action.type === "isNone") {
        return !state
    } else {
        return state
    }
}
const ModalBoxData = (state = [], action) => {
    switch (action.type) {
        case "BATCHEDIT":
            return action.data
        default :
            return state
    }
}


const stores = combineReducers({//合成reducers
    nav: isLogin,
    container: switchNews,
    mobBoxData: mobBoxData,
    tips: tips,
    data: addState,
    ModalBoxIsNone: ModalBoxIsNone,
    ModalBoxData: ModalBoxData
})
export default stores