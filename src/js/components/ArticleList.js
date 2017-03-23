import React, {Component} from "react"
import {render} from 'react-dom'
import { Link } from 'react-router'
import '../../css/articleList.less'
import { erilizeText } from '../utils/util'
import { markdown } from 'markdown'
export class ArticleList extends Component {

  componentWillMount() {
    console.log("componentWillMount,插入DOM前", this.props)
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

  componentDidMount() {
    console.log("componentDidMount,插入DOM后", this.props)
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps,收到新的参数", this.props, nextProps)
    if (nextProps.type == "index") {
      if (this.props.query.page != nextProps.query.page) {
        this.props.ajaxData(nextProps.type, nextProps.query.page)
      }
    } else if (nextProps.type == "category") {
      if (this.props.query.category != nextProps.query.category || (this.props.query.page != nextProps.query.page)) {
        this.props.ajaxData(nextProps.type, {'category': nextProps.query.category, 'page': nextProps.query.page})
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
        <ul className="article-list"> { articleTmp.length ? articleTmp : "暂无搜索结果" } </ul>
      </div>
    )
  }
}


const ArticleItem = ({data}) => {
  return (
      <li className="article-li">
        <a href={ "/#" + encodeURI(data.name) + "/" + encodeURI(data.time.day) + "/" + encodeURI(data.title) }>
          <div className="title">{erilizeText(data.title, 15)}</div>
        </a>
        <div className="info">
          作者： { data.name }&nbsp;&nbsp;
          阅读量：{ data.pv } &nbsp;&nbsp;
          发布时间：{ data.time.minute }&nbsp;&nbsp;
          分类: <Link className="category" to={{ pathname : '/',query : { category : data.category }}}>{ data.category == 1 ? "web开发" : "node开发"}</Link>
        </div>
        <a className="describe"href={ "/#" + encodeURI(data.name) + "/" + encodeURI(data.time.day) + "/" + encodeURI(data.title) }>
          <div dangerouslySetInnerHTML={{__html:data.content ? markdown.toHTML(data.content.substr(0, 300)) : ''}} />
        </a>

      </li>
  )
}
