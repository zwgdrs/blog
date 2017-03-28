import React, {Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions/index'
import SystemModal from './systemModal.jsx'

export class TipsBox extends Component {
  constructor(props) {
    super(props)
  }

  componentWillUpdate() {
    console.log("Login=>componentWillUpdate", this.props)
  }
// <div styleName="tips-box" style={{ "display": this.props.tips.messgage ? "none" : "block" } }>
// <div styleName="tips-bg">测试title</div>
// <div styleName="main">
// <span styleName="text">{this.props.tips.messgage || '测试'}</span></div>
// </div>
  render() {
    console.log(this.props.tips)
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
        this.props.tips.messgage ? <SystemModal data={data} /> : <div style={{display: 'none'}}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {tips: state.tips}
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}
export default connect(
  mapStateToProps, //只要 Redux store 发生改变，mapStateToProps 函数就会被调用。该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并,如果你省略了这个参数，你的组件将不会监听 Redux store。如果指定了该回调函数中的第二个参数 ownProps，则该参数的值为传递到组件的 props，而且只要组件接收到新的 props，mapStateToProps 也会被调用
  mapDispatchToProps //如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，而且这个对象会与 Redux store 绑定在一起，其中所定义的方法名将作为属性名，合并到组件的 props 中。如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起（提示：你也许会用到 Redux 的辅助函数 bindActionCreators()）。如果你省略这个 mapDispatchToProps 参数，默认情况下，dispatch 会注入到你的组件 props 中。如果指定了该回调函数中第二个参数 ownProps，该参数的值为传递到组件的 props，而且只要组件接收到新 props，mapDispatchToProps 也会被调用。
)(TipsBox)
