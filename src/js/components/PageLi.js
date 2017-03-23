import React, {Component} from "react"
import {render} from 'react-dom'
import {Link, IndexLink} from 'react-router'
import {hashHistory} from 'react-router'
import CSSModules from 'react-css-modules';
import styles from '../../css/pageLi.less'
@CSSModules(styles, {
    allowMultiple: true
})
export default class PageLi extends Component {
    constructor(props) {
        super(props)
        this._alert = this.props.actions._alert
        this.validatePage = this.validatePage.bind(this)
    }

    swtichPage(i, type, len) {
        if (!this.validatePage(i, len, type)) {
            return
        }
        if (this.props.type == "index") {
            this.props.ajaxData(this.props.type, i)
            this.input.value = ""
            hashHistory.push({
                pathname: '/',
                query: {page: i}
            })
        } else if (this.props.type == "category") {
            this.props.ajaxData(this.props.type, i)
            this.input.value = ""
            hashHistory.push({
                pathname: '/',
                query: {page: i, category: this.props.query.category}
            })
        } else if (this.props.type == "search") {
            this.props.ajaxData(this.props.query.keyword, i)
            this.input.value = ""
            hashHistory.push({
                pathname: 'search',
                query: {page: i, keyword: this.props.query.keyword}
            })
        }
    }

    params(i) {
        if (this.props.type == "index") {
            return '/?page=' + i
        } else if (this.props.type == "category") {
            return '/?category=' + this.props.query.category + '&page=' + i
        } else if (this.props.type == "search") {
            return '/search?keyword=' + this.props.query.keyword + '&page=' + i
        }
    }

    validatePage(pageNum, pageSum, type) {
        let passValidate = true
        switch (type) {
            case 'jump':
                if (pageNum <= 0) {
                    this._alert("你输入的页码不正确，请重新输入")
                    passValidate = false
                }
                if (pageNum > pageSum) {
                    this._alert("你输入的页码超过最大页数，请重新输入")
                    passValidate = false
                }
                break
            case 'next':
                if (pageNum > pageSum) {
                    this._alert("已经是最后一页了")
                    passValidate = false
                }
                break
            case 'prev':
                if (pageNum < 1) {
                    this._alert("已经是第一页了")
                    passValidate = false
                }
                break
            default:
                break
        }
        return passValidate
    }

    render() {
        let pageTmp = [],
            pageList = this.props.pageList,
            len = pageList && Math.ceil(pageList.count / pageList.limitNum), //页码最大条数
            pageCurrent = this.props.query.page || 1, //当前处于第几页
            maxPage = 7, //页码最多展示几页
            edgePage = 4 || maxPage % 2 ? Math.floor(maxPage / 2) : maxPage / 2
        if (len <= 1) {
            return <div></div>
        }
        if (pageCurrent <= maxPage - edgePage) {
            if (len <= maxPage) {
                for (let i = 1; i <= len; i++) {
                    pageTmp.push(
                        < li key={ i }>
                            <Link className="page-btn" to={this.params(i) } activeClassName="active">{ i }</Link>
                        </li >
                    )
                }
            } else {
                for (let i = 1; i <= maxPage; i++) {
                    pageTmp.push(< li key={ i }>
                        <Link className="page-btn" to={this.params(i) } activeClassName="active">{ i }</Link></li >)
                }
            }
        } else if (pageCurrent > len) {
            console.error("页码错误")
        } else if (pageCurrent >= len - edgePage) {
            if (len <= maxPage - 1) {
                for (let i = 1; i <= pageCurrent; i++) {
                    pageTmp.push(< li key={ i }>
                        <Link to={this.params(i) } activeClassName="active">{ i }</Link></li >)
                }
            } else {
                for (let i = len - (maxPage - 1); i <= len; i++) {
                    pageTmp.push(< li key={ i }>
                        <Link to={this.params(i) } activeClassName="active">{ i }</Link></li >)
                }
            }
        } else {
            for (let i = pageCurrent - edgePage; i <= (Number(pageCurrent) + edgePage); i++) {
                pageTmp.push(< li key={ i }>
                    <Link to={  this.params(i) } activeClassName="active">{ i }</Link></li >)
            }
        }

        return (
            <div className="page-list">
                <ul className="page-container">
                    <li onClick={() => this.swtichPage(Number(pageCurrent) - 1, 'prev', len)}>
                        <a className="page-btn">上一页</a>
                    </li>
                    { pageTmp }
                    <li onClick={ () => this.swtichPage(Number(pageCurrent) + 1, 'next', len) }>
                        <a className="page-btn"> 下一页 </a></li>
                    <div className="search">
                        <div><input type="text" ref={ el => { this.input = el } }/></div>
                        <div className="page-btn" onClick={() => this.swtichPage(Number(this.input.value), 'jump', len)}>跳转</div>
                    </div>
                </ul>
            </div>
        )
    }
}