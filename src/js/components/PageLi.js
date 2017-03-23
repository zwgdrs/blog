import React, {Component} from "react"
import {render} from 'react-dom'
import {Link, IndexLink} from 'react-router'
import '../../css/pageLi.css'

export default class PageLi extends Component {
    constructor(props) {
        super(props)
        this._alert = this.props.actions._alert
    }

    swtichPage(i, type) {
        //this.props.query.page=i;
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
                    pageTmp.push(< li key={ i }>
                        <Link to={this.params(i) } activeClassName="active">{ i }</Link></li >)
                }
            } else {
                for (let i = 1; i <= maxPage; i++) {
                    pageTmp.push(< li key={ i }>
                        <Link to={this.params(i) } activeClassName="active">{ i }</Link></li >)
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
                <ul className="container">
                    <li onClick={ () => { if (pageCurrent <= 1) { this._alert("已经是第一页了"); return } this.swtichPage(Number(pageCurrent) - 1)} }>
                        <a className="page-btn">上一页</a></li>
                    { pageTmp }
                    <li onClick={ () => {
                    if (pageCurrent >= len) { this._alert("已经是最后一页了"); return };
                    this.swtichPage(Number(pageCurrent) + 1) } }>
                        <a className="page-btn"> 下一页 </a></li>
                    <li><input type="text" ref={ el => { this.input = el } }/></li>
                    <li onClick={ () => {
                    if (this.input.value <= 0) {
                        this._alert("你输入的页码不正确，请重新输入")
                        return
                    };
                    if (this.input.value > len) {
                        this._alert("你输入的页码超过最大页数，请重新输入")
                        return
                    }
                    this.swtichPage(Number(this.input.value), "jump")
                }
            }>
                        <a className="page-btn page-jump">跳转</a></li>
                </ul>
            </div>
        )
    }
}