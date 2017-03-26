import React, {Component} from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, Link, IndexLink, browserHistory, hashHistory} from 'react-router'
import Index from '../components/index'
import Footer from '../components/Footer.js'
import MobBox from './../components/MobBox'
import Nav from '../components/nav'
import TipsBox from './../components/tipsBox'
import '../../css/App.less'
// import '../../css/font-awesome/less/font-awesome.less'
export default class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let WinH = document.documentElement.clientHeight
        let wrap = document.querySelector('.container')
        wrap.style.minHeight = (WinH - 270) + "px"
    }

    render() {
        const { children, location } = this.props
        return (
            <div className="page">
                <Nav />
                <div className="navBox">
                    <ul className="nav content">
                        <li className="content-home">
                            <IndexLink to="/" className="link">
                                <i className="menu-item-icon icon-next-home" aria-hidden="true"></i>
                                <div className="desc">首页</div>
                            </IndexLink>
                        </li>
                        <li className="content-publish">
                            <Link to="/publish" className="link">
                                <div>发布文章</div>
                            </Link>
                        </li>
                        <li className="content-about">
                            <Link to="/about" className="link">
                                <div>关于</div>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="container">{children || <Index query={ location.query }/>}</div>
                <MobBox />
                <TipsBox />
                <Footer />
            </div>
        )
    }
}