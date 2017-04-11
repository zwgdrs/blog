import React, {Component} from "react"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as loginSubmit from '../actions/login'
import styles from '../../css/modules/loginIngTop.scss'
import CSSModules from 'react-css-modules'
@CSSModules(styles, {
  allowMultiple: true
})

class LoginIngTop extends Component {
    render() {
        return (
            <div styleName="loginIn-top">{this.props.nav.info.name} 欢迎您的到来
                <div styleName="btn" onClick={() => this.props.loginSubmit.loginSubmit("loginOut") }>退出登录</div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {nav: state.nav}
}
const mapDispatchToProps = (dispatch) => {
    return {
        loginSubmit: bindActionCreators(loginSubmit, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginIngTop)

