import React, {Component} from "react"
import {connect} from 'react-redux'
import Login from './login'
import Reg from './reg'
import styles from '../../css/modules/mobBox.scss'
import CSSModules from 'react-css-modules'
@CSSModules(styles, {
  allowMultiple: true
})
export class MobBox extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let type = this.props.mobBoxData.isShow
    type = type ? (type == "loginShow" ? <Login /> : <Reg />) : type
    return (
      type && <div styleName="mobBox">
        {type}
      </div>
    )
  }
}

const mapStateToProps = (state)=> {
  return {mobBoxData: state.mobBoxData}
}

export default connect(
  mapStateToProps
)(MobBox)

