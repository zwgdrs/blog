import React, {Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions/index'
import * as publishActions from '../actions/publish'
import * as alertActions from '../actions/alert'
import {markdown} from 'markdown'
import styles from '../../css/publish.less'
import CSSModules from 'react-css-modules'
@CSSModules(styles, {
    allowMultiple: true
})

export class PublishComponent extends Component {
    constructor(props) {
        super(props)
        this.title
        this.content
        this.file
        this.form
        this.category
        this.editor = this.editor.bind(this)
    }

    componentDidMount() {
    }

    handleSubmit() {
        //let data="title="+this.title.value+"&content="+this.content.value+"&upload="+this.file.value
        let _alert = this.props.alertActions._alert,
            titleValue = this.title.value.trim(),
            contentValue = this.edit.value.trim()
        if (titleValue.length < 5) {
            _alert("标题最少5个字")
            return
        }
        if (contentValue.length < 20) {
            _alert("内容最少20个字")
            return
        }
        if (this.file.value) {
            if (this.file.files[0].type.indexOf("image") == -1) {
                _alert("只能上传图片")
                return
            }
            if (this.file.files[0].size > 100 * 1024) {
                _alert("图片大小不能超过100KB")
                return
            }
        }
        let data = new FormData(this.form);
        this.props.publishActions.publishSubmit(data)
    }

    editor() {
        this.update = function () {
            this.preview.innerHTML = markdown.toHTML(this.edit.value);
        }
        this.edit.editor = this;
        this.update();
    }

    render() {
        return <form styleName="publish" ref={el=>{this.form = el}}>
            <div styleName="title">
                <input type="text" ref={el=>{this.title = el}} name="title" placeholder="标题: 当年逐日的夸父" />
            </div>
            <div styleName="content">
                <div styleName="edit">
                    <textarea id="editText" placeholder="请输入文章内容" ref={el=>{this.edit = el}} rows="10" name="content"
                              onInput={this.editor} />
                </div>
                <div styleName="preview">
                    <div id="previewText" ref={el=>{this.preview = el}}/>
                </div>
            </div>
            <div styleName="bottom-container">
                <div>
                    <div>上传封面：</div>
                    <div>
                        <input type="file" name="upload" ref={el => this.file = el } accept="*.jpg" />
                    </div>
                </div>
                <div styleName="category">
                    <div>文章分类：</div>
                    <div>
                        <select name="category" ref={el => this.category = el }>
                            <option value="1">web开发</option>
                            <option value="2">node开发</option>
                        </select>
                    </div>
                </div>
                <div styleName="btn" onClick={() => this.handleSubmit()} >发布文章</div>
            </div>

        </form>
    }
}

const mapStateToProps = (state)=> {
    return {publish: state.container}
}
const mapDispatchToProps = (dispatch)=> {
    return {
        publishActions: bindActionCreators(publishActions, dispatch),
        alertActions: bindActionCreators(alertActions, dispatch)
    }
}
const Publish = connect(
    mapStateToProps,
    mapDispatchToProps
)(PublishComponent)

module.exports = Publish
