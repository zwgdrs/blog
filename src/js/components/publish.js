import React, {Component} from "react"
import {render} from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions/index'
import {markdown} from 'markdown'
import '../../css/publish.less'

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
        let _alert = this.props.actions._alert,
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
        this.props.actions.publishSubmit(data)
    }

    editor() {
        this.update = function () {
            this.preview.innerHTML = markdown.toHTML(this.edit.value);
        }
        this.edit.editor = this;
        this.update();
    }

    render() {
        return <form className="publish" ref={el=>{this.form = el}}>
            <div className="title">
                <input type="text" ref={el=>{this.title = el}} name="title" placeholder="标题: 当年逐日的夸父" />
            </div>
            <div className="content">
                <div className="edit">
                    <textarea id="editText" placeholder="请输入文章内容" ref={el=>{this.edit = el}} rows="10" name="content"
                              onInput={this.editor} />
                </div>
                <div className="preview">
                    <div id="previewText" ref={el=>{this.preview = el}}/>
                </div>
            </div>
            <div className="bottom-container">
                <div className="upload">
                    <div className="name">上传封面：</div>
                    <div className="inputDiv">
                        <input type="file" name="upload" ref={el => this.file = el } accept="*.jpg" />
                    </div>
                </div>
                <div className="category">
                    <div className="name">文章分类：</div>
                    <div className="inputDiv">
                        <select name="category" ref={el => this.category = el }>
                            <option value="1">web开发</option>
                            <option value="2">node开发</option>
                        </select>
                    </div>
                </div>
                <div className="btn" onClick={() => this.handleSubmit()} >发布文章</div>
            </div>

        </form>
    }
}

const mapStateToProps = (state)=> {
    return {publish: state.container}
}
const mapDispatchToProps = (dispatch)=> {
    return {
        actions: bindActionCreators(actions, dispatch),
    }
}
const Publish = connect(
    mapStateToProps,
    mapDispatchToProps
)(PublishComponent)

module.exports = Publish
