/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-09-05 12:55:47
 * @version $Id$
 */
import {combineReducers,createStore,applyMiddleware} from "redux"
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
const mobBoxData = (state = {isShow:false,data:{}}, action) => {
  switch (action.type) {
    case 'loginShow':
      return Object.assign({},state,{isShow:action.isShow})
    case 'loginSubmit':
      return Object.assign({},state,{data:action.data})
    case 'regShow':
      return Object.assign({},state,{isShow:action.isShow})
    case 'regSubmit':
      return Object.assign({},state,{data:action.data})
    case 'mobBoxClose':
      return Object.assign({},state,{isShow:false})
    default:
      return state
  }
}
const isLogin = (state={isLogin:false},action)=>{
  switch(action.type){
    case "loginIn":
      return Object.assign({},state,{isLogin:true,info:action.data.info})
    case "loginOut":
      return Object.assign({},state,{isLogin:false})
    default :
      return state
  }
}
const tips=(state={messgage:""},action)=>{
  switch(action.type){
    case "showTips":
      return Object.assign({},state,{messgage:action.messgage})
    case "hideTips":
      return Object.assign({},state,{messgage:action.messgage})
    default :
      return state
  }
}

/*ReactDiyForm
------------------
*/

const textinitState={"type":"text","title":"单行文字","default":"单行文字默认值","tis":"单行文字提示","required":false,"readonly":true,"minValue":"","maxValue":""}
const textareainitState={"type":"textarea","title":"多行文字","default":"多行文字默认值","tis":"多行文字提示","required":false,"readonly":true,"minValue":"","maxValue":""}
const radioinitState={"type":"radio","title":"单项选择","choices":[{"checked":false,"value":""},{"checked":true,"value":""},{"checked":false,"value":""}],"required":false,"minValue":"","maxValue":"","line_row":"1"};
const checkboxinitState={"type":"checkbox","title":"多项选择","choices":[{"checked":false,"value":""},{"checked":true,"value":""},{"checked":false,"value":""}],"required":false,"minValue":"","maxValue":"","line_row":"1"};
const selectinitState={"type":"select","title":"下拉框","choices":[{"checked":false,"value":""},{"checked":true,"value":""},{"checked":false,"value":""}],"required":false,"minValue":"","maxValue":"","line_row":"1"};
const numberinitState={"type":"number","title":"数字","default":"","tis":"","required":false,"readonly":true,"minValue":"","maxValue":""}
const iphoneinitState={"type":"iphone","title":"电话","default":"","tis":"分隔请用-或空格，国际电话请加+","required":false,}
const emailinitState={"type":"email","title":"邮箱","default":"","tis":"","required":false,"readonly":true,"minValue":"","maxValue":""}
const positioninitState={"type":"position","title":"地理位置","default":"","tis":"","required":false,"readonly":true,"minValue":"","maxValue":""}
const timeinitState={"type":"time","title":"时间","default":"","tis":"","required":false,"readonly":true,"minValue":"","maxValue":""}
const wxinitState={"type":"wx","title":"微信扫码","default":"","tis":"","required":false,"readonly":true,"minValue":"","maxValue":""}
const mobileinitState={"type":"mobile","title":"手机","default":"","tis":"","required":false}
const psinitState={"type":"ps","title":"说明","default":"","tis":"","required":false}
const fenjieinitState={"type":"fenjie","title":"分节"}
const picinitState={"type":"pic","title":"图片","required":false}
const fujianinitState={"type":"fujian","title":"附件","required":false}
const jssinitState={"type":"jss","title":"计算式","tis":"计算式填写 [数字] 类型字段的标题加运算符，运算符支持+-*/()。例：单价*数量-折扣","readonly":true,"fixed":"","default":""}
const pingfeninitState={"type":"pingfen","title":"评分","required":false,"manfen":5,"curren":"xingxing"}
const cityinitState={"type":"city","title":"省市区","required":false}

const Clone=(obj)=>{//深拷贝
    var objClone;
    if (obj.constructor == Object){
        objClone = {}; 
    }else{
        objClone = new obj.constructor(obj.valueOf); 
        
    }
    for(var key in obj){
        if ( objClone[key] != obj[key] ){ 
            if ( typeof(obj[key]) == 'object' ){ 
                objClone[key] = Clone(obj[key]);
            }else{
                objClone[key] = obj[key];
            }
        }
    }
    return objClone; 
} 
const addState=(state=[],action)=>{
    switch(action.type){
        case "TEXT":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            return [
                 ...newstate,
                 Object.assign({},textinitState,{id:state.length},{active:true})
            ]
        case "TEXTAREA":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            return [
                 ...newstate,
                 Object.assign({},textareainitState,{id:state.length},{active:true})
            ]
        case "RADIO":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            return [
                 ...newstate,
                 Object.assign({},radioinitState,{id:state.length},{active:true})
            ]
        case "SELECT":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            return [
                 ...newstate,
                 Object.assign({},selectinitState,{id:state.length},{active:true})
            ]
        case "CHECKBOX":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            return [
                 ...newstate,
                 Object.assign({},checkboxinitState,{id:state.length},{active:true})
            ]
        case "NUMBER":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            return [
                 ...newstate,
                 Object.assign({},numberinitState,{id:state.length},{active:true})
            ]
        case "IPHONE":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            return [
                 ...newstate,
                 Object.assign({},iphoneinitState,{id:state.length},{active:true})
            ]
        case "EMAIL":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            return [
                 ...newstate,
                 Object.assign({},emailinitState,{id:state.length},{active:true})
            ]
        case "POSITION":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            return [
                 ...newstate,
                 Object.assign({},positioninitState,{id:state.length},{active:true})
            ]
        case "TIME":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            return [
                 ...newstate,
                 Object.assign({},timeinitState,{id:state.length},{active:true})
            ]
        case "WX":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            return [
                 ...newstate,
                 Object.assign({},wxinitState,{id:state.length},{active:true})
            ]
        case "MOBILE":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            return [
                 ...newstate,
                 Object.assign({},mobileinitState,{id:state.length},{active:true})
            ]
        case "PS":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            return [
                 ...newstate,
                 Object.assign({},psinitState,{id:state.length},{active:true})
            ]
        case "FENJIE":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            return [
                 ...newstate,
                 Object.assign({},fenjieinitState,{id:state.length},{active:true})
            ]
        case "PIC":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            return [
                 ...newstate,
                 Object.assign({},picinitState,{id:state.length},{active:true})
            ]
        case "FUJIAN":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            return [
                 ...newstate,
                 Object.assign({},fujianinitState,{id:state.length},{active:true})
            ]
        case "JSS":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            return [
                 ...newstate,
                 Object.assign({},jssinitState,{id:state.length},{active:true})
            ]
        case "PINGFEN":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            return [
                 ...newstate,
                 Object.assign({},pingfeninitState,{id:state.length},{active:true})
            ]
        case "CITY":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            return [
                 ...newstate,
                 Object.assign({},cityinitState,{id:state.length},{active:true})
            ]
        case "TITLE":
            return state.map(el=>
                el.id===action.id?Object.assign({},el,{title:action.title}):el
            )
        case "DEFAULT":
            return state.map(el=>
                el.id===action.id?Object.assign({},el,{default:action.default}):el
            )
        case "TIS":
            return state.map(el=>
                el.id===action.id?Object.assign({},el,{tis:action.tis}):el
            )
        case "MANFEN":
            return state.map(el=>
                el.id===action.id?Object.assign({},el,{manfen:action.manfen}):el
            )
        case "PINGFENTYPE":
            return state.map(el=>
                el.id===action.id?Object.assign({},el,{curren:action.curren}):el
            )
        case "MINVALUE":
            return state.map(el=>
                el.id===action.id?Object.assign({},el,{minValue:action.minValue}):el
            )
        case "MAXVALUE":
            return state.map(el=>
                el.id===action.id?Object.assign({},el,{maxValue:action.maxValue}):el
            )
        case "REQUIRED":
            return state.map(el=>
               el.id===action.id?Object.assign({},el,{required:action.required}):el
            )
        case "READONLY":
            return state.map(el=>
                el.id===action.id?Object.assign({},el,{readonly:action.readonly}):el
            )
        case "CLICK":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            return newstate.map(el=>
                el.id===action.id?Object.assign({},el,{active:true}):el
            )
        case "COPY":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            var newstate=[...newstate.slice(0,action.id+1),
                Object.assign({},newstate[action.id],{active:true}),
                 ...newstate.slice(action.id+1)
            ]
            return newstate.map((el,i)=>
                Object.assign({},el,el.id=i)
            )
        case "DELETE":
            var newstate=state.map(el=>Object.assign({},el,{active:false}))
            newstate=[...newstate.slice(0,action.id),
                ...newstate.slice(action.id+1)
            ]
            if(action.id===0){//如果是第一个就把后面一个设为active
                newstate=newstate.map((el,i)=>
                    el.id===1?Object.assign({},el,{active:true},{id:i}):Object.assign({},el,{id:i})
                )    
            }else{//否则吧前面一个设为active
               newstate=newstate.map((el,i)=>
                    el.id===(action.id-1)?Object.assign({},el,{active:true},{id:i}):Object.assign({},el,{id:i})
                )
               console.log(newstate)
            }
            console.log(state)
            return newstate
        case "CHOICESCHECKED":
            var newstate=state.map(el=>{
                if(el.id===action.id){
                    var choices=Clone(el.choices);
                    if(action.inputType!="checkbox"){
                        choices.map(el=>{el.checked=false})
                    }
                    choices[action.index].checked=action.choices;
                    return Object.assign({},el,{choices:choices})
                }else{
                    return el
                }
            })
            return newstate;
        case "CHOICESINPUT":
            var newstate=state.map(el=>{
                if(el.id===action.id){
                    var choices=Clone(el.choices);
                    choices[action.index].value=action.choices;
                    return Object.assign({},el,{choices:choices})
                }else{
                    return el
                }
            })
            return newstate;
        case "ADDITEM":
            var newstate=state.map(el=>{
                if(el.id===action.id){
                    var choices=Clone(el.choices);
                    var itemJson={"checked":false,"value":""};
                    choices.splice(action.index+1,0,itemJson)
                    return Object.assign({},el,{choices:choices})
                }else{
                    return el
                }
            })
            return newstate
        case "DELITEM":
            var newstate=state.map(el=>{
                if(el.id===action.id){
                    var choices=Clone(el.choices);
                    choices=choices.filter((el,i)=>{
                        return action.index!==i
                    })
                    return Object.assign({},el,{choices:choices})
                }else{
                    return el
                }
            })
            return newstate
        case "SUBMITDATE":
            let arr= action.value.split(/\n/);
            let trimValue=[];
            for(let i=0,len=arr.length;i<len;i++){
                if(arr[i]!=0) trimValue[trimValue.length]=arr[i];
            };
            let newstate=state.map(el=>{
                if(el.active){
                    let choices=Clone(el.choices);
                    choices.length=trimValue.length;
                    for(var i=0;i<choices.length;i++){
                        if(!choices[i]){
                            choices[i]={"checked":false,"value":""}
                        }
                       choices[i].value=trimValue[i]
                    };
                    return Object.assign({},el,{choices:choices})
                }else{
                    return el
                }
            });
            return newstate
        default :
            return state
    }
}
const ModalBoxIsNone=(state=false,action)=>{
    if(action.type==="isNone"){
        return !state
    }else{
        return state
    }
}
const ModalBoxData=(state=[],action)=>{
    switch(action.type){
        case "BATCHEDIT":
            return action.data
        default :
            return state
    }
}
/*const stores = combineReducers({//合成reducers
  data:addState,
  ModalBoxIsNone:ModalBoxIsNone,
  ModalBoxData:ModalBoxData
})
export default stores */


const stores = combineReducers({//合成reducers
  nav:isLogin,
  container:switchNews,
  mobBoxData:mobBoxData,
  tips:tips,
  data:addState,
  ModalBoxIsNone:ModalBoxIsNone,
  ModalBoxData:ModalBoxData
})
export default stores