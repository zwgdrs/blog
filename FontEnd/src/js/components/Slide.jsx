import React, {Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions/index'
import SystemModal from './systemModal.jsx'
import styles from '../../css/slide.less'
import CSSModules from 'react-css-modules'
@CSSModules(styles, {
    allowMultiple: true
})
export default class Slide extends Component {
    constructor(props) {
        super(props)
    }

    componentWillUpdate() {
        console.log("Login=>componentWillUpdate", this.props)
    }

    render() {
        const { data } = this.props
        const { userInfo, summaryInfo, linkInfo } = data
        return (
            <div styleName="main">
                <div styleName="header">
                    <img styleName="avatar" src={userInfo.img} alt="头像" />
                    <div styleName="name">{userInfo.name}</div>
                    <div styleName="desc">{userInfo.desc}</div>
                </div>
                <div styleName="content">
                    <div styleName="summary">
                        <div styleName="item">
                            <span>{summaryInfo.summary.article}</span>
                            <span>日志</span>
                        </div>
                        <div styleName="item">
                            <span>{summaryInfo.summary.tags}</span>
                            <span>标签</span>
                        </div>
                    </div>
                    <div styleName="rss">{summaryInfo.rss}</div>
                </div>
                <div styleName="footer">
                    {
                        linkInfo.map((item, index) => {
                            return (
                                <a key={index} styleName="link" src={item.url}>{item.name}</a>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

