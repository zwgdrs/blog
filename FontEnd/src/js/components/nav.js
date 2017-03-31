import React, {Component} from "react"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as ajaxActions from '../actions/ajax'
import * as loginActions from '../actions/login'
import * as alertActions from '../actions/alert'
import NoLoginTop from '../components/noLoginTop'
import LoginIngTop from '../components/loginIngTop'
import {hashHistory} from 'react-router'
import styles from '../../css/nav.less'
import CSSModules from 'react-css-modules'
@CSSModules(styles, {
    allowMultiple: true
})
class Nav extends Component {
    constructor(props) {
        super(props)
        // this.keyword
    }

    componentWillMount() {
        this.props.loginActions.getUserInfo()
    }

    handleSubmit() {
        if (!this.keyword.value) {
            this.props.alertActions._alert("请输入关键字");
            return
        }
        let keyword = location.hash.match(/keyword=[^&]+/) ? location.hash.match(/keyword=[^&]+/)[0].match(/[^=]+$/g)[0] : ''
        if (keyword == this.keyword.value) {
            return
        }

        const path = "/search?keyword=" + this.keyword.value
        hashHistory.push(path)
        this.props.ajaxActions.ajaxData('search', {'keyword': this.keyword.value})
    }

    render() {
        let props = this.props, isLogin
        if (props.nav.isLogin) {
            isLogin = <LoginIngTop />
        } else {
            isLogin = <NoLoginTop />
        }
        return (
            <div styleName="head">
                <div styleName="content">
                    <a href="/" styleName="logo"> 剑月轩博客 </a>
                    <div styleName="search-form">
                        <input type="text" ref={el => {
                            this.keyword = el
                        }} name="keyword" placeholder="可以搜标题或者内容"/>
                        <div className="black-btn" onClick={() => {
                            this.handleSubmit()
                        }}> 提交
                        </div>
                    </div>
                    {isLogin}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {nav: state.nav}
}
const mapDispatchToProps = (dispatch) => {
    return {
        ajaxActions: bindActionCreators(ajaxActions, dispatch),
        loginActions: bindActionCreators(loginActions, dispatch),
        alertActions: bindActionCreators(alertActions, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Nav)
