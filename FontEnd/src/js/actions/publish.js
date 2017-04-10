/*发布作品请求
 @data 发布作品的数据
 */
import { hashHistory } from 'react-router'
import { _alertStore } from './alert'
const requestAPI = "http://localhost:8080/"
export const publishSubmit = (data) => {
    return (dispatch, getState) => {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", requestAPI + "publish", true);
        xmlHttp.withCredentials = true;
        xmlHttp.send(data);
        xmlHttp.onreadystatechange = function(oEvent) {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    //console.log("发送成功");
                    let data = JSON.parse(xmlHttp.response)
                    if (data.code === 1000) {
                        _alertStore(dispatch, "发布成功", function() {
                            hashHistory.push('/')
                        })
                    } else {
                        _alertStore(dispatch, data.messgage)
                    }
                } else {
                    console.log("发送失败");
                }
            }
        };
        /*fetch发送FormData有问题，只能改成AJAX*/
        /*var myInit = { method: "POST",
         headers: {"Content-Type": "multipart/form-data"},
         mode: 'cors',
         cache: 'default',
         credentials: 'include',//可以带cookie
         body:data
         };
         fetch("http://localhost:3001/publish",myInit)
         .then(function(response) {
         return response.json();
         })
         .then(function(data) {
         console.log(data);
         if(data.code===1000){
         _alertStore(dispatch,"发布成功")
         }else{
         _alertStore(dispatch,data.messgage)
         }
         })
         .catch(function(e) {
         console.log("请求失败");
         });*/
    }
}