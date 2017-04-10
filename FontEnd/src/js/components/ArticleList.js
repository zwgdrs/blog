import React, {Component} from "react"
import {render} from 'react-dom'
import {Link} from 'react-router'
import {erilizeText} from '../utils/util'
import {markdown} from 'markdown'
import ArticleItem from './ArticleItem.jsx'
import styles from '../../css/modules/articleList.scss'
import CSSModules from 'react-css-modules'
@CSSModules(styles, {
    allowMultiple: true
})

export class ArticleList extends Component {
    componentWillMount() {
        if (this.props.type == "index") {
            this.props.ajaxData(this.props.type, this.props.query.page)
        } else if (this.props.type == "search") {
            if (!this.props.query.keyword.trim()) {
                return false
            }
            this.props.ajaxData(this.props.type, {'keyword': this.props.query.keyword, 'page': this.props.query.page})
        } else if (this.props.type == "category") {
            this.props.ajaxData(this.props.type, {'category': this.props.query.category, 'page': this.props.query.page})
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.type == "index") {
            if (this.props.query.page != nextProps.query.page) {
                this.props.ajaxData(nextProps.type, nextProps.query.page)
            }
        } else if (nextProps.type == "category") {
            if (this.props.query.category != nextProps.query.category || (this.props.query.page != nextProps.query.page)) {
                this.props.ajaxData(nextProps.type, {
                    'category': nextProps.query.category,
                    'page': nextProps.query.page
                })
            }
        } else if (nextProps.type == "search") {
            if (this.props.query.keyword != nextProps.query.keyword || (this.props.query.page != nextProps.query.page)) {
                this.props.ajaxData(nextProps.type, {'keyword': nextProps.query.keyword, 'page': nextProps.query.page})
            }
        }
    }

    render() {
        let articleTmp = []
        let articleList = this.props.articleList
        if (articleList) {
            let data = articleList
            for (let i = 0; i < data.length; i++) {
                articleTmp.push(< ArticleItem key={ i } data={ data[i] }/>)
            }
        }
        return (
            <div>
                <ul styleName="article-list"> { articleTmp.length ? articleTmp : "暂无搜索结果" } </ul>
            </div>
        )
    }
}

