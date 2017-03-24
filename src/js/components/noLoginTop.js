import React, {Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions/index'
import '../../css/notLoginTop.less'
class NoLoginTop extends Component {
    render() {
        return (
            <div className="not-login">
                <div className="btn" onClick={() => this.props.actions.mobBoxData("loginShow") }>登录</div>
                <div className="btn" onClick={() => this.props.actions.mobBoxData("regShow") }>注册</div>
            </div>
        )
    }
}
const mapStateToProps = (state)=> {
    return {nav: state.nav}
}
const mapDispatchToProps = (dispatch)=> {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoLoginTop)

