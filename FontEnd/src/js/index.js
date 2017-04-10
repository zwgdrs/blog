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
import { Router, hashHistory, Route } from 'react-router'
import App from './containers/App.jsx'
import About from './containers/About.jsx'
import Details from './containers/Details.jsx'
import Page404 from './containers/Page404.jsx'
import Publish from './containers/Publish.jsx'
import Search from './containers/Search.jsx'

import "../css/modules/style.scss"

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

// const About = {
//     path: 'about',
//     getComponent(nextState, cb) {
//         require.ensure([], (require) => {
//             return cb(null, require('./containers/About'))
//         })
//     }
// }
//
// const Search = {
//     path: 'search',
//     getComponent(nextState, cb) {
//         require.ensure([], (require) => {
//             return cb(null, require('./containers/Search'))
//         })
//     }
// }
//
// const Details = {
//     path: '/:name/:date/:title',
//     getComponent(nextState, cb) {
//         require.ensure([], (require) => {
//             return cb(null, require('./containers/Details'))
//         })
//     }
// }
//
// const Publish = {
//     path: 'publish',
//     getComponent(nextState, cb) {
//         require.ensure([], (require) => {
//             return cb(null, require('./containers/Publish'))
//         })
//     }
// }
//
// const Page404 = {
//     path: '*',
//     getComponent(nextState, cb) {
//         require.ensure([], (require) => {
//             return cb(null, require('./containers/Page404'))
//         })
//     }
// }
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
            Page404
        ]
    }]
}

render(( 
    <Provider store = { store }>
        <Router history = { hashHistory }>
            <Route path="/" component={App}>
                <Route path="about" component={About} />
                <Route path="search" component={Search} />
                <Route path="publish" component={Publish} />
                <Route path=":name/:date/:title" component={Details} />
            </Route>
        </Router>
    </Provider>
),document.getElementById("APP"))
