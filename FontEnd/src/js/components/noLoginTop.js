import React, {Component} from "react"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as modalActions from '../actions/modal'
import styles from '../../css/notLoginTop.less'
import CSSModules from 'react-css-modules'
@CSSModules(styles, {
    allowMultiple: true
})
class NoLoginTop extends Component {
    render() {
        return (
            <div styleName="not-login">
                <div className="white-btn" onClick={() => this.props.modalActions.mobBoxData("loginShow") }>登录</div>
                <div className="white-btn" onClick={() => this.props.modalActions.mobBoxData("regShow") }>注册</div>
            </div>
        )
    }
}
const mapStateToProps = (state)=> {
    return {nav: state.nav}
}
const mapDispatchToProps = (dispatch)=> {
    return {
        modalActions: bindActionCreators(modalActions, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoLoginTop)

