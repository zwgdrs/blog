webpackJsonp([1], {
    186: function (e, t, i) {
        "use strict";
        function n(e) {
            if (e && e.__esModule)return e;
            var t = {};
            if (null != e)for (var i in e)Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t.default = e, t
        }

        function o(e) {
            return e && e.__esModule ? e : {default: e}
        }

        function r(e, t) {
            if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
        }

        function l(e, t) {
            if (!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function a(e, t) {
            if ("function" != typeof t && null !== t)throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.PublishComponent = void 0;
        var s = function () {
            function e(e, t) {
                for (var i = 0; i < t.length; i++) {
                    var n = t[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                }
            }

            return function (t, i, n) {
                return i && e(t.prototype, i), n && e(t, n), t
            }
        }(), c = i(1), u = o(c), d = (i(7), i(12)), f = i(9), p = i(13), b = n(p), m = i(58);
        i(214);
        var h = t.PublishComponent = function (e) {
            function t(e) {
                r(this, t);
                var i = l(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                return i.title, i.content, i.file, i.form, i.category, i.editor = i.editor.bind(i), i
            }

            return a(t, e), s(t, [{
                key: "componentDidMount", value: function () {
                }
            }, {
                key: "handleSubmit", value: function () {
                    var e = this.props.actions._alert, t = this.title.value.trim(), i = this.edit.value.trim();
                    if (t.length < 5)return void e("标题最少5个字");
                    if (i.length < 20)return void e("内容最少20个字");
                    if (this.file.value) {
                        if (this.file.files[0].type.indexOf("image") == -1)return void e("只能上传图片");
                        if (this.file.files[0].size > 102400)return void e("图片大小不能超过100KB")
                    }
                    var n = new FormData(this.form);
                    this.props.actions.publishSubmit(n)
                }
            }, {
                key: "editor", value: function () {
                    this.update = function () {
                        this.preview.innerHTML = m.markdown.toHTML(this.edit.value)
                    }, this.edit.editor = this, this.update()
                }
            }, {
                key: "render", value: function () {
                    var e = this;
                    return u.default.createElement("form", {
                        className: "publish", ref: function (t) {
                            e.form = t
                        }
                    }, u.default.createElement("div", {className: "title"}, u.default.createElement("input", {
                        type: "text",
                        ref: function (t) {
                            e.title = t
                        },
                        name: "title",
                        placeholder: "标题: 当年逐日的夸父"
                    })), u.default.createElement("div", {className: "content"}, u.default.createElement("div", {className: "edit"}, u.default.createElement("textarea", {
                        id: "editText",
                        placeholder: "请输入文章内容",
                        ref: function (t) {
                            e.edit = t
                        },
                        rows: "10",
                        name: "content",
                        onInput: this.editor
                    })), u.default.createElement("div", {className: "preview"}, u.default.createElement("div", {
                        id: "previewText",
                        ref: function (t) {
                            e.preview = t
                        }
                    }))), u.default.createElement("div", {className: "bottom-container"}, u.default.createElement("div", {className: "upload"}, u.default.createElement("div", {className: "name"}, "上传封面："), u.default.createElement("div", {className: "inputDiv"}, u.default.createElement("input", {
                        type: "file",
                        name: "upload",
                        ref: function (t) {
                            return e.file = t
                        },
                        accept: "*.jpg"
                    }))), u.default.createElement("div", {className: "category"}, u.default.createElement("div", {className: "name"}, "文章分类："), u.default.createElement("div", {className: "inputDiv"}, u.default.createElement("select", {
                        name: "category",
                        ref: function (t) {
                            return e.category = t
                        }
                    }, u.default.createElement("option", {value: "1"}, "web开发"), u.default.createElement("option", {value: "2"}, "node开发")))), u.default.createElement("div", {
                        className: "btn",
                        onClick: function () {
                            return e.handleSubmit()
                        }
                    }, "发布文章")))
                }
            }]), t
        }(c.Component), x = function (e) {
            return {publish: e.container}
        }, w = function (e) {
            return {actions: (0, f.bindActionCreators)(b, e)}
        }, v = (0, d.connect)(x, w)(h);
        e.exports = v
    }, 197: function (e, t, i) {
        t = e.exports = i(103)(), t.push([e.id, ".publish{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.publish,.publish .title{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.publish .title{width:100%;height:50px;padding-left:10px;margin-bottom:5px;border-radius:3px;border:1px solid #eee}.publish .title>input{width:80%;border:0;outline:0}.publish .content{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;width:100%;height:500px}.publish .content>div{width:50%;height:100%;padding:10px}.publish .content .edit{border:1px solid #eee;border-radius:3px}.publish .content .preview{border-bottom:1px solid #eee;border-top:1px solid #eee;border-right:1px solid #eee;border-radius:3px;overflow:scroll;overflow-scrolling:touch;-webkit-overflow-scrolling:touch}.publish .content textarea{width:100%;height:100%;border:0}.publish .bottom-container{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;width:100%;height:50px;padding:5px;border:1px solid #eee}.publish .bottom-container,.publish .bottom-container .category,.publish .bottom-container .upload{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center}.publish .bottom-container .btn{width:80px;height:30px;color:#fff;text-align:center;line-height:30px;border-radius:3px;border:1px solid #24292e;background-color:#24292e;cursor:pointer;-webkit-transition:all .2s linear 0s;transition:all .2s linear 0s}.publish .bottom-container .btn:hover{color:#000;border-radius:2px;background-color:#fff;border:1px solid #24292e}", ""])
    }, 214: function (e, t, i) {
        var n = i(197);
        "string" == typeof n && (n = [[e.id, n, ""]]);
        i(178)(n, {});
        n.locals && (e.exports = n.locals)
    }
});