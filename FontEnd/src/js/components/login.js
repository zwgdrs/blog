import React, {Component} from "react"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as alertActions from '../actions/alert'
import * as loginActions from '../actions/login'
import SystemModal from './systemModal.jsx'

export class Login extends Component {
    constructor(props) {
        super(props)
        this.userName
        this.password
    }

    submitLogin(self) {
        let _alert = self.props.alertActions._alert
        if (self.userName.value.length < 2) {
            _alert("用户名格式不正确")
            return
        }
        if (self.password.value.length < 6) {
            _alert("密码格式不正确")
            return
        }
        let data = "userName=" + self.userName.value + "&password=" + self.password.value;
        self.props.loginActions.loginSubmit("loginSubmit", data)
    }

    render() {
        const data = {
            onSubmit: this.submitLogin,
            self: this,
            title: {
                text: '登陆博客',
                desc: '与猿类分享你的心得与智慧'
            },
            footer: '登陆'
        }
        return (
            <SystemModal data={data}>
                <div>
                    <input type="text" name="userName" ref={el=> {this.userName = el}} maxLength="10" placeholder="用户名"/>
                </div>
                <div>
                    <input type="password" name="password" ref={el=> {this.password = el}} maxLength="16" placeholder="密码"/>
                </div>
            </SystemModal>
        )
    }
}

const mapStateToProps = (state)=> {
    return {login: state.mobBoxData}
}
const mapDispatchToProps = (dispatch)=> {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
        alertActions: bindActionCreators(alertActions, dispatch),
    }
}
export default connect(
    mapStateToProps,//只要 Redux store 发生改变，mapStateToProps 函数就会被调用。该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并,如果你省略了这个参数，你的组件将不会监听 Redux store。如果指定了该回调函数中的第二个参数 ownProps，则该参数的值为传递到组件的 props，而且只要组件接收到新的 props，mapStateToProps 也会被调用
    mapDispatchToProps//如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，而且这个对象会与 Redux store 绑定在一起，其中所定义的方法名将作为属性名，合并到组件的 props 中。如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起（提示：你也许会用到 Redux 的辅助函数 bindActionCreators()）。如果你省略这个 mapDispatchToProps 参数，默认情况下，dispatch 会注入到你的组件 props 中。如果指定了该回调函数中第二个参数 ownProps，该参数的值为传递到组件的 props，而且只要组件接收到新 props，mapDispatchToProps 也会被调用。
)(Login)

