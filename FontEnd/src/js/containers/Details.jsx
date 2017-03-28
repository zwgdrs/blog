import React, {Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions/index'
import {markdown} from 'markdown'
// import '../../css/details.less'
import MessageItem from '../components/MessageItem.jsx'
import styles from '../../css/details.less'
import CSSModules from 'react-css-modules'
@CSSModules(styles, {
    allowMultiple: true
})
    
// const MessageItem = ({data})=> {
//     return <div styleName="messageItem">
//         <div styleName="messageAuthor"><span styleName="author">{data.name}：说</span></div>
//         <div styleName="messageContent">{data.message}</div>
//         <div styleName="messageTime"><span>{data.time}</span></div>
//     </div>
// }
export class DetailsComponent extends Component {
    constructor(props) {
        super(props)
        this.nameVlue = window.localStorage['commentInfo'] ? JSON.parse(window.localStorage['commentInfo']).name : ''
        this.emailValue = window.localStorage['commentInfo'] ? JSON.parse(window.localStorage['commentInfo']).email : ''
    }

    componentDidMount() {
        this.props.actions.ajaxData("details", this.props.params)
    }

    commentsSubmit() {
        let _alert = this.props.actions._alert,
            nameVlue = this.name.value.trim(),
            messageVlue = this.message.value.trim()
        if (nameVlue.length < 2) {
            _alert("姓名格式不正确")
            return
        }
        if (messageVlue.length == 0) {
            _alert("留言内容不能为空")
            return
        }

        let data = "name=" + nameVlue + "&email=" + this.email.value + "&message=" + messageVlue
        let json = {"name": this.name.value, "email": this.email.value}
        window.localStorage['commentInfo'] = JSON.stringify(json)
        this.props.actions.commentsSubmit(data, this.props.params)
    }

    render() {
        let data = this.props.details;
        let img = data.upload ? ("<img src=" + actions.requestAPI + data.upload + " />") : ""
        let messageItemTmp = []
        if (data.comments) {
            for (let len = data.comments.length, i = len - 1; i >= 0; i--) {
                messageItemTmp.push(<MessageItem key={i} data={data.comments[i]}/>)
            }
        } else {
            messageItemTmp = "暂无留言"
        }

        return (
            <div styleName="article-details">
                <h1>{data.title}</h1>
                <div>作者：{data.name}&nbsp;&nbsp;&nbsp;&nbsp;阅读量：{data.pv}&nbsp;&nbsp;&nbsp;&nbsp;
                    发布时间：{data.time ? data.time.minute : ""}</div>
                <div styleName="main">
                    <div dangerouslySetInnerHTML={{__html:img}}></div>
                    <div styleName="content"
                         dangerouslySetInnerHTML={{__html:data.content ? markdown.toHTML(data.content) : ''}}>
                    </div>
                </div>
                <div styleName="message-box">
                    {messageItemTmp}
                    <div styleName="send-message">
                        <textarea name="message" id="" cols="30" rows="5" placeholder="说点什么呢" ref={el=>{this.message=el}}></textarea>
                        <div styleName="btn" onClick={()=>{this.commentsSubmit()}}>提交</div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {details: state.container}
}
const mapDispatchToProps = (dispatch)=> {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}
const Details = connect(
    mapStateToProps,//只要 Redux store 发生改变，mapStateToProps 函数就会被调用。该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并,如果你省略了这个参数，你的组件将不会监听 Redux store。如果指定了该回调函数中的第二个参数 ownProps，则该参数的值为传递到组件的 props，而且只要组件接收到新的 props，mapStateToProps 也会被调用
    mapDispatchToProps//如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，而且这个对象会与 Redux store 绑定在一起，其中所定义的方法名将作为属性名，合并到组件的 props 中。如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起（提示：你也许会用到 Redux 的辅助函数 bindActionCreators()）。如果你省略这个 mapDispatchToProps 参数，默认情况下，dispatch 会注入到你的组件 props 中。如果指定了该回调函数中第二个参数 ownProps，该参数的值为传递到组件的 props，而且只要组件接收到新 props，mapDispatchToProps 也会被调用。
)(DetailsComponent)

module.exports = Details