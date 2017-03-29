import React, {Component} from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, Link, IndexLink, browserHistory, hashHistory} from 'react-router'
import Slide from './../components/Slide'
import Index from '../components/index'
import Footer from '../components/Footer.js'
import MobBox from './../components/MobBox'
import Nav from '../components/nav'
import TipsBox from './../components/tipsBox'
import styles from '../../css/App.less'
import '../../css/font-awesome/less/font-awesome.less'
import CSSModules from 'react-css-modules'
@CSSModules(styles, {
    allowMultiple: true
})
export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slideBar: false
        }
        this.navigatorInfo
        this.scrollTop = this.scrollTop.bind(this)
        this.onSlideShow = this.onSlideShow.bind(this)
    }

    navigatorInfo = [
        {
            url: '/',
            icon: 'fa fa-home',
            desc: '首页'
        },
        {
            url: '/publish',
            icon: 'fa fa-pencil-square-o',
            desc: '发布文章'
        },
        {
            url: '/tages',
            icon: 'fa fa-tags',
            desc: '标签'
        },
        {
            url: '/list',
            icon: 'fa fa-list-alt',
            desc: '榜单'
        },
        {
            url: '/about',
            icon: 'fa fa-flag',
            desc: '关于'
        },
    ]

    componentDidMount() {
        // let WinH = document.documentElement.clientHeight
        // let wrap = document.querySelector('.container')
        // wrap.style.minHeight = (WinH - 270) + "px"
    }

    scrollTop() {
        window.scrollTo(0, 0)
    }

    onSlideShow() {
        this.setState({
            slideBar: !this.state.slideBar
        })

    }

    render() {
        const {children, location} = this.props
        let mainStyle = 'main'
        let floatIconStyle = 'float-icon'
        if (this.state.slideBar) {
            mainStyle = 'main main-go-left'
            floatIconStyle = 'float-icon icon-go-left'
        }
        return (
            <div styleName="page" ref={(ref) => {this.page = ref}}>
                {this.state.slideBar && <Slide />}
                <div styleName={mainStyle}>
                    <Nav />
                    <div styleName="nav-box">
                        <ul styleName="content">
                            {this.navigatorInfo.map((item) => {
                                return (
                                    <li>
                                        <IndexLink to={item.url} styleName="link">
                                            <i className={item.icon} aria-hidden="true"></i>
                                            <div>{item.desc}</div>
                                        </IndexLink>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div styleName="container">{children || <Index query={ location.query }/>}</div>
                    <MobBox />
                    <TipsBox />
                    <Footer />
                    <div styleName={floatIconStyle} ref={(ref) => {this.floatIcon = ref}}>
                        <div styleName="item" onClick={this.onSlideShow}>
                            <i className="fa fa-sliders" aria-hidden="true"></i>
                        </div>
                        <div styleName="item" onClick={this.scrollTop}>
                            <i className="fa fa-arrow-up" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}