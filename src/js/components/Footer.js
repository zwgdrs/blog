import React, {Component} from "react"
import {render} from 'react-dom'
import {bindActionCreators} from 'redux'
import '../../css/footer.less'

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="top">©   2017 - the end of the earth  剑月轩</div>
                <div className="bottom">由React全家桶 + Node.js强力驱动 | 技术至上</div>
            </div>
        )
    }
}
