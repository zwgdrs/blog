import React, {Component} from "react"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as publishActions from '../actions/publish'
import * as alertActions from '../actions/alert'
import * as modalActions from '../actions/modal'
import {markdown} from 'markdown'
import styles from '../../css/modules/publish.scss'
import FloatModal from '../components/floatModal.jsx'
import CSSModules from 'react-css-modules'
import { getSelect } from '../utils/util'
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
        this.editIcon
        this.textValue
        this.textPara
        this.action
        this.state = {
            edit: true,
            inputUrl: false
        }
        this.onPreview = this.onPreview.bind(this)
        this.exchangeView = this.exchangeView.bind(this)
        this.onSubmitUrl = this.onSubmitUrl.bind(this)
        this.onInputUrl = this.onInputUrl.bind(this)
    }

    editIcon = [
        {
            key: 'preview',
            name: '预览'
        },
        {
            key: 'bold',
            name: '粗体'
        },
        {
            key: 'italic',
            name: '斜体'
        },
        {
            key: 'img',
            name: '图片'
        },
        {
            key: 'url',
            name: '链接'
        },
        {
            key: 'quote',
            name: '引用'
        },
        {
            key: 'undo',
            name: '撤销'
        },
        {
            key: 'redo',
            name: '重做'
        }
    ]

    componentDidMount() {
        this.list.addEventListener('mouseover', (e) => {
            const target = e.target
            const floatIcon = target.querySelector('div')
            floatIcon && target.nodeName === 'LI' ? floatIcon.style.display = 'block' : null
        }, false)
        this.list.addEventListener('mouseout', (e) => {
            const target = e.target
            const floatIcon = target.querySelector('div')
            floatIcon ? floatIcon.style.display = 'none' : null
        }, false)
    }

    handleSubmit() {
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

    onPreview(value) {
        this.update = function () {
            this.preview.innerHTML = markdown.toHTML(value);
        }
        this.update();
    }

    exchangeView(e) {
        const name = e.target.dataset.name
        let selectorValue
        if (name !== '预览') {
            this.textValue = this.edit.value
            selectorValue = getSelect(this.edit)
            this.textPara = [
                this.textValue.substring(0, selectorValue[0]),
                this.textValue.substring(selectorValue[0], selectorValue[1]),
                this.textValue.substring(selectorValue[1])
            ]
        }
        switch (name) {
            case '预览':
                if (this.state.edit) {
                    const text = this.edit.value
                    this.setState({edit: !this.state.edit}, () => {
                        this.onPreview(text)
                    })
                } else {
                    this.setState({edit: !this.state.edit})
                }
                break
            case '粗体':
                this.edit.value = `${this.textPara[0]}**${this.textPara[1]}**${this.textPara[2]}`
                break
            case '斜体':
                this.edit.value = `${this.textPara[0]}*${this.textPara[1]}*${this.textPara[2]}`
                break
            case '图片':
                this.action = 'img'
                this.setState({inputUrl: !this.state.inputUrl})
                break
            case '链接':
                this.action = 'link'
                this.setState({inputUrl: !this.state.inputUrl})
                break
            case '引用':
                this.edit.value = `${this.textPara[0]}> ${this.textPara[1]}${this.textPara[2]}`
                break
            case '撤销':
                break
            case '重做':
                break
        }
    }

    onSubmitUrl() {

    }

    onInputUrl(textArea, type, textPara, editUrl) {
        this.setState({inputUrl: !this.state.inputUrl})
        if (type === 'img') {
            textArea.value = `${textArea.value}![](${editUrl.value})`
        } else {
            textArea.value = `${textPara[0]}[${textPara[1]}](${editUrl.value})${textPara[2]}`
        }

    }

    render() {
        return (
            <form styleName="publish" ref={el => this.form = el}>
                {
                    this.state.inputUrl && <div styleName="dialog">
                        <span>地址：</span>
                        <input type="text" ref={el => this.editUrl = el}/>
                        <div styleName="white-btn" onClick={() => this.onInputUrl(this.edit, this.action, this.textPara, this.editUrl) }>确定</div>
                    </div>
                }
                <div styleName="title">
                    <input type="text" ref={el => {
                        this.title = el
                    }} name="title" placeholder="标题: 当年逐日的夸父"/>
                </div>
                <div styleName="inner">
                    <div styleName="func">
                        <ul styleName="list" ref={el => this.list = el} onClick={this.exchangeView}>
                            {
                                this.editIcon.map((item) => {
                                    return (
                                        <li key={item.key} data-name={item.name} styleName='li'>
                                            <FloatModal text={item.name}/>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div styleName="content">
                        <div styleName="edit" className={this.state.edit ? '' : 'hide'}>
                            <textarea id="editText" placeholder="请输入文章内容" ref={el => {
                                this.edit = el
                            }} rows="10" name="content"/>
                        </div>
                        <div styleName="preview" className={this.state.edit ? 'hide' : ''}>
                            <div id="previewText" ref={el => {
                                this.preview = el
                            }}/>
                        </div>
                    </div>
                    <div styleName="bottom-container">
                        <div>
                            <div>上传封面：</div>
                            <div>
                                <input type="file" name="upload" ref={el => this.file = el } accept="*.jpg"/>
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
                        <div styleName="btn" onClick={() => this.handleSubmit()}>发布文章</div>
                    </div>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {publish: state.container}
}
const mapDispatchToProps = (dispatch) => {
    return {
        publishActions: bindActionCreators(publishActions, dispatch),
        alertActions: bindActionCreators(alertActions, dispatch),
        modalActions: bindActionCreators(modalActions, dispatch),
    }
}
const Publish = connect(
    mapStateToProps,
    mapDispatchToProps
)(PublishComponent)

module.exports = Publish
