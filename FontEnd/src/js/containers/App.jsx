import React, {Component} from 'react'
import {IndexLink} from 'react-router'
import Slide from './../components/Slide'
import Index from '../components/index'
import Footer from '../components/Footer.js'
import MobBox from './../components/MobBox'
import Nav from '../components/nav'
import TipsBox from './../components/tipsBox'
// import {scrollTop} from '../utils/util'
import styles from '../../css/modules/App.scss'
// import '../../css/font-awesome/less/font-awesome.'
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
        this.backToTop = {
            toTopTimer: null
        }
        this.speed = 10
        this.scrollTop = this.scrollTop.bind(this)
        this.onSlideShow = this.onSlideShow.bind(this)
        this.onScrollTop = this.onScrollTop.bind(this)
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
        this.onScrollTop(document)
        // window.scrollTo(0, 0)
    }

    onSlideShow() {
        this.setState({
            slideBar: !this.state.slideBar
        })

    }


    onScrollTop() {
        clearInterval(this.backToTop.toTopTimer);
        let scrollT = document.body.scrollTop || document.documentElement.scrollTop;
        this.speed = this.speed * 2;
        if (scrollT == 0 || scrollT < 0) {
            clearInterval(this.backToTop.toTopTimer);
            this.speed = 10;
        } else {
            scrollBy(0, -this.speed);
            this.backToTop.toTopTimer = setInterval(this.onScrollTop, 30);
        }
    }

    render() {
        const {children, location} = this.props
        let mainStyle = 'main'
        let floatIconStyle = 'float-icon'
        if (this.state.slideBar) {
            mainStyle = 'main main-go-left'
            floatIconStyle = 'float-icon icon-go-left'
        }
        const slideInfo = {
            userInfo: {
                img: 'http://i3.17173.itc.cn/2011/jsol/2011/12/31/0069_js_07.jpg',
                name: '剑月轩',
                desc: '随便描述点啥都行'
            },
            summaryInfo: {
                summary: {
                    article: 30,
                    tags: 10,
                },
                rss: 'url'
            },
            linkInfo: [
                {name: 'zhihu', url: ''},
                {name: 'github', url: ''},
                {name: 'zhihu', url: ''},
                {name: 'zhihu', url: ''},
                {name: 'zhihu', url: ''},
            ]
        }
        return (
            <div styleName="page" ref={(ref) => this.page = ref}>
                {this.state.slideBar && <Slide data={slideInfo}/>}
                <div styleName={mainStyle}>
                    <Nav />
                    <div styleName="nav-box">
                        <ul styleName="content">
                            {this.navigatorInfo.map((item, index) => {
                                return (
                                    <li key={index}>
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
                    <div styleName={floatIconStyle} ref={(ref) => {
                        this.floatIcon = ref
                    }}>
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