webpackJsonp([5], {
    180: function (t, e, n) {
        "use strict";
        function o(t) {
            if (t && t.__esModule)return t;
            var e = {};
            if (null != t)for (var n in t)Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e.default = t, e
        }

        function r(t) {
            return t && t.__esModule ? t : {default: t}
        }

        function u(t, e) {
            if (!(t instanceof e))throw new TypeError("Cannot call a class as a function")
        }

        function a(t, e) {
            if (!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function i(t, e) {
            if ("function" != typeof e && null !== e)throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }

        var c = function () {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }

            return function (e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }(), l = n(1), s = r(l), f = (n(7), n(12)), p = n(9), b = n(13), d = o(b), h = function (t) {
            function e(t) {
                u(this, e);
                var n = a(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
                return n.about, n
            }

            return i(e, t), c(e, [{
                key: "componentWillMount", value: function () {
                    console.log("About==>componentWillMount", this.props);
                    this.props.dispatch;
                    this.props.actions.ajaxData("about")
                }
            }, {
                key: "componentDidUpdate", value: function () {
                    console.log("About==>componentDidUpdate", this.props)
                }
            }, {
                key: "aboutSubmit", value: function () {
                    console.log(this.about.innerHTML), this.props.actions.SaveAbout(this.about.innerHTML)
                }
            }, {
                key: "render", value: function () {
                    var t = this, e = this.props.about.data;
                    return e = e ? e.neirong : "", s.default.createElement("div", null, s.default.createElement("div", {
                        className: "aboutContent",
                        ref: function (e) {
                            t.about = e
                        },
                        dangerouslySetInnerHTML: {__html: e}
                    }), s.default.createElement("div", {
                        className: "aboutBtn", onClick: function () {
                            t.aboutSubmit()
                        }, style: {display: "none"}
                    }, "更新"))
                }
            }]), e
        }(l.Component), y = function (t) {
            return {about: t.container}
        }, m = function (t) {
            return {actions: (0, p.bindActionCreators)(d, t)}
        }, v = (0, f.connect)(y, m)(h);
        t.exports = v
    }
});