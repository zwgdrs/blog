/**
 * 
 * @authors hechuanhua (you@example.org)
 * @date    2016-09-05 00:58:23
 * @version $Id$
 */
//import 'babel-polyfill'
import 'fetch-ie8';
import 'es5-shim';
import 'es5-shim/es5-sham'
import 'es6-shim';


import React, { Component } from 'react'
import { render } from 'react-dom'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { Provider } from 'react-redux'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { Router, hashHistory } from 'react-router'
import App from './containers/App.jsx'

const store = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)(rootReducer)
if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
        const nextReducer = require('./reducers').default
        store.replaceReducer(nextReducer)
    })
    const reporter = window.__webpack_hot_middleware_reporter__;
    const success = reporter.success;
    reporter.success = function () {
        document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
            const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`);
            link.href = nextStyleHref;
        });
        success();
    };
}
// const store = compose(
//   applyMiddleware(thunk),
//   window.devToolsExtension ? window.devToolsExtension() : f => f
// )(createStore)(rootReducer)
// if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('./reducers', () => {
//         const nextReducer = require('./reducers').default
//         store.replaceReducer(nextReducer)
//     })
import "../css/style.less"
// import '../form/css/form.css'
const About = {
    path: 'about',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            return cb(null, require('./components/about'))
        })
    }
}
const Search = {
    path: 'search',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            return cb(null, require('./components/search'))
        })
    }
}
const Details = {
    path: '/:name/:date/:title',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            return cb(null, require('./containers/Details'))
        })
    }
}
const Publish = {
    path: 'publish',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            return cb(null, require('./components/publish'))
        })
    }
}
// const ReactForm = {
//     path: 'ReactForm',
//     getComponent(nextState, cb) {
//         require.ensure([], (require) => {
//             return cb(null, require('../form/containers/App'))
//         })
//     }
// }
const Page404 = {
    path: '*',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            return cb(null, require('./components/page404'))
        })
    }
}

const rootRoute = {
    component: 'div',
    childRoutes: [{
        path: '/',
        component: App,
        childRoutes: [
            Publish,
            About,
            Search,
            Details,
            // ReactForm,
            Page404
        ]
    }]
}
render(( 
    <Provider store = { store }>
        <Router history = { hashHistory } routes = { rootRoute } />
    </Provider>
),document.getElementById("APP"))
