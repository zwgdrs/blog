import React, {Component} from "react"
import {render} from 'react-dom'

const MessageItem = ({data})=> {
    return <div styleName="messageItem">
        <div styleName="messageAuthor"><span styleName="author">{data.name}：说</span></div>
        <div styleName="messageContent">{data.message}</div>
        <div styleName="messageTime"><span>{data.time}</span></div>
    </div>
}