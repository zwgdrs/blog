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
        return (
            <div styleName="main">
                <div styleName="header"></div>
                <div styleName="content"></div>
                <div styleName="footer"></div>
            </div>
        )
    }
}

