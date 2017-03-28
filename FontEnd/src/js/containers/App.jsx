import React, {Component} from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, Link, IndexLink, browserHistory, hashHistory} from 'react-router'
import Index from '../components/index'
import Footer from '../components/Footer.js'
import MobBox from './../components/MobBox'
import Nav from '../components/nav'
import TipsBox from './../components/tipsBox'
import styles from '../../css/App.less'
import CSSModules from 'react-css-modules'
@CSSModules(styles, {
    allowMultiple: true
})
export default class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // let WinH = document.documentElement.clientHeight
        // let wrap = document.querySelector('.container')
        // wrap.style.minHeight = (WinH - 270) + "px"
    }

    render() {
        const { children, location } = this.props
        console.log(children)
        return (
            <div styleName="page">
                <Nav />
                <div styleName="nav-box">
                    <ul styleName="content">
                        <li>
                            <IndexLink to="/" styleName="link">
                                <i className="menu-item-icon icon-next-home" aria-hidden="true"></i>
                                <div>首页</div>
                            </IndexLink>
                        </li>
                        <li>
                            <Link to="/publish" styleName="link">
                                <div>发布文章</div>
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" styleName="link">
                                <div>关于</div>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div styleName="container">{children || <Index query={ location.query }/>}</div>
                <MobBox />
                <TipsBox />
                <Footer />
            </div>
        )
    }
}