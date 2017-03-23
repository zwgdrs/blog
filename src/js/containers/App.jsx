import React, {Component} from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, Link, IndexLink, browserHistory, hashHistory} from 'react-router'
import Index from '../components/index'
import Footer from '../components/Footer.js'
import MobBox from './MobBox'
import Nav from './nav'
import TipsBox from './tipsBox'
import '../../css/App.less'
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
                        <li className="content-home"><IndexLink to="/">首页</IndexLink></li>
                        <li className="content-publish"><Link to="/publish">发布文章</Link></li>
                        <li className="content-about"><Link to="/about">关于</Link></li>
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