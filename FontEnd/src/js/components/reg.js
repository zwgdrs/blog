import React, {Component} from "react"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions/index'
import SystemModal from './systemModal'
export class Reg extends Component {
    constructor(props) {
        super(props)
        this.userName
        this.password
        this.repassword
    }

    submitReg(self) {
        let _alert = self.props.actions._alert
        if (self.userName.value.length < 2) {
            _alert("用户名长度为2-10位数")
            return
        }
        if ((/\s/ig).test(self.userName.value)) {
            _alert("用户名不能有空格")
            return
        }
        if (self.password.value.length < 6) {
            _alert("密码长度为6-16位数")
            return
        }
        if ((/\s/ig).test(self.password.value)) {
            _alert("密码不能有空格")
            return
        }
        if (self.password.value !== self.repassword.value) {
            _alert("两次输入的密码不一致")
            return
        }
        let data = "userName=" + self.userName.value + "&password=" + self.password.value;
        self.props.actions.loginSubmit("regSubmit", data)
    }

    render() {
        const data = {
            onSubmit: this.submitReg,
            self: this,
            title: {
                text: '欢迎注册',
                desc: '开启你的博客生涯'
            },
            footer: '注册'
        }
        return (
            <SystemModal data={data}>
                <div>
                    <input type="text" name="userName" ref={el=>{this.userName = el}} maxLength="10"
                           placeholder="用户名 长度为2-10"/>
                </div>
                <div>
                    <input type="password" name="password" ref={el=>{this.password = el}} maxLength="16"
                           placeholder="密码 长度为6-16"/>
                </div>
                <div>
                    <input type="password" name="password" maxLength="16" ref={el=>{this.repassword = el}}
                           placeholder="重复输入密码 长度为6-16"/>
                </div>
            </SystemModal>
        )
    }
}

const mapStateToProps = (state)=> {
    return {reg: state.reg}
}
const mapDispatchToProps = (dispatch)=> {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Reg)

