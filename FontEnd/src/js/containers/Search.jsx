import React, { Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ajaxActions from '../actions/ajax'
import { ArticleList } from '../components/ArticleList'
import PageLi from '../components/PageLi'
import styles from '../../css/search.less'
import CSSModules from 'react-css-modules'
@CSSModules(styles, {
    allowMultiple: true
})

export class SearchComponent extends Component {
    render() {
        console.log(this.props.ajaxActions)
        let data = this.props.search;
        return <div styleName="search">
            <ArticleList articleList = { data.data } ajaxData = { this.props.ajaxActions.ajaxData } type = "search" query = { this.props.location.query } />
            <PageLi pageList = { data.page } ajaxData = { this.props.ajaxActions.ajaxData } type = "search" query = { this.props.location.query } />
            </div>
    }
}

const mapStateToProps = (state) => {
    return { search: state.container }
}
const mapDispatchToProps = (dispatch) => {
    return {
        alertActions: bindActionCreators(alertActions, dispatch),
        ajaxActions: bindActionCreators(ajaxActions, dispatch),
    }
}
const Search = connect(
    mapStateToProps, 
    mapDispatchToProps 
)(SearchComponent)
module.exports = Search
