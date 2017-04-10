import React, {Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
// import * as actions from '../actions/index'
import * as detailsActions from '../actions/details'
import * as alertActions from '../actions/alert'
import * as ajaxActions from '../actions/ajax'
import {markdown} from 'markdown'
import MessageItem from '../components/MessageItem.jsx'
import styles from '../../css/modules/details.scss'
import CSSModules from 'react-css-modules'
@CSSModules(styles, {
    allowMultiple: true
})

export class DetailsComponent extends Component {
    constructor(props) {
        super(props)
        this.nameVlue = window.localStorage['commentInfo'] ? JSON.parse(window.localStorage['commentInfo']).name : ''
        this.emailValue = window.localStorage['commentInfo'] ? JSON.parse(window.localStorage['commentInfo']).email : ''
    }

    componentDidMount() {
        this.props.ajaxActions.ajaxData("details", this.props.params)
    }

    commentsSubmit() {
        let _alert = this.props.alertActions._alert,
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
        this.props.detailsActions.commentsSubmit(data, this.props.params)
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
        // actions: bindActionCreators(actions, dispatch),
        detailsActions: bindActionCreators(detailsActions, dispatch),
        ajaxActions: bindActionCreators(ajaxActions, dispatch),
        alertActions: bindActionCreators(alertActions, dispatch),
    }
}
const Details = connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailsComponent)

module.exports = Details