import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as modalActions from '../actions/modal'
import {bindActionCreators} from 'redux'
import styles from '../../css/modules/warnDialog.scss'
import CSSModules from 'react-css-modules'
@CSSModules(styles, {
    allowMultiple: true
})

class WarnDialog extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {data} = this.props
        return (
            <div styleName="container" ref={ (e) => this.container = e }>
                <div styleName="inner">
                    <div styleName="content">{data.title.desc}</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {login: state.mobBoxData}
}
const mapDispatchToProps = (dispatch) => {
    return {
        modalActions: bindActionCreators(modalActions, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WarnDialog)