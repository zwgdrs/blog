import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import * as modalActions from '../actions/modal'
import {bindActionCreators} from 'redux'
import {Router, Route, IndexRoute, Link, IndexLink, browserHistory, hashHistory} from 'react-router'
import styles from '../../css/modules/SystemModal.scss'
import CSSModules from 'react-css-modules'
@CSSModules(styles, {
    allowMultiple: true
})

class SystemModel extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        const { data } = this.props
        return (
            <div styleName="container">
                <i styleName="close" onClick={()=>{this.props.modalActions.mobBoxData("mobBoxClose")}}>x</i>
                <div styleName="title">
                    <div styleName="top">{data.title.text}</div>
                    <div styleName="bottom">{data.title.desc}</div>
                </div>
                <div styleName="content">{this.props.children}</div>
                <div styleName="footer">
                    <div className="modal-btn" onClick={ () => data.onSubmit(data.self) }>{data.footer}</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {login: state.mobBoxData}
}
const mapDispatchToProps = (dispatch)=> {
    return {
        modalActions: bindActionCreators(modalActions, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SystemModel)