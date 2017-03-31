import React, {Component} from "react"
import {connect} from 'react-redux'
import WarnDialog from './warnDialog.jsx'

export class TipsBox extends Component {
  constructor(props) {
    super(props)
  }

  render() {
      const data = {
          onSubmit: this.submitLogin,
          self: this,
          title: {
              text: this.props.tips.title,
              desc: this.props.tips.messgage
          },
          footer: '确定'
      }
    return (
        this.props.tips.messgage ? <WarnDialog data={data} /> : <div style={{display: 'none'}}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {tips: state.tips}
}

export default connect(
  mapStateToProps,
)(TipsBox)
