import React, {Component} from "react"
import {render} from 'react-dom'
import {Link} from 'react-router'
import {erilizeText} from '../utils/util'
import {markdown} from 'markdown'
import styles from '../../css/modules/articleItem.scss'
import CSSModules from 'react-css-modules'
@CSSModules(styles, {
    allowMultiple: true
})

export default class ArticleItem extends Component {

    render() {
        const { data } = this.props
        if (!data) {
            return null
        }
        return (
            <li styleName="article-li">
                <div styleName="title">{erilizeText(data.title, 15)}</div>
                <div styleName="info">
                    作者： { data.name }&nbsp;&nbsp;
                    阅读量：{ data.pv } &nbsp;&nbsp;
                    发布时间：{ data.time.minute }&nbsp;&nbsp;
                    分类: <Link to={{ pathname : '/',query : { category : data.category }}}>{ data.category == 1 ? "web开发" : "node开发"}</Link>
                </div>
                <div styleName="show-article"
                     dangerouslySetInnerHTML={{__html:data.content ? markdown.toHTML(data.content.substr(0, 300)) : ''}}/>
                <a styleName="spread-article"
                   href={ "/#" + encodeURI(data.name) + "/" + encodeURI(data.time.day) + "/" + encodeURI(data.title) }>
                    阅读全文 </a>
            </li>
        )
    }
}