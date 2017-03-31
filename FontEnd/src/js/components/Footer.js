import React, {Component} from "react"
import styles from '../../css/footer.less'
import CSSModules from 'react-css-modules'
@CSSModules(styles, {
    allowMultiple: true
})
export default class Footer extends Component {
    render() {
        return (
            <div styleName="main">
                <div styleName="inner">
                    <div>©   2017 - the end of the earth  剑月轩</div>
                    <div>由React全家桶 + Node.js强力驱动 | 技术至上</div>
                </div>
            </div>
        )
    }
}
