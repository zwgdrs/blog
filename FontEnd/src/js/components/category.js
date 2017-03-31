import React, { Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as searchActions from '../actions/search'
import { ArticleList,PageLi } from './ArticleList'
import PageLi from './PageLi'
export class CategoryComponent extends Component {
    render() {
        let data = this.props.category;
        return <div styleName = "search">
            <ArticleList articleList = { data.data } ajaxData = { this.props.searchActions.searchSubmit } type = "search" query = { this.props.location.query } />
            <PageLi pageList = { data.page } ajaxData = { this.props.searchActions.searchSubmit } type = "search" query = {this.props.location.query} />
            </div>
    }
}

const mapStateToProps = (state) => {
    return { search: state.container }
}
const mapDispatchToProps = (dispatch) => {
    return {
        searchActions: bindActionCreators(searchActions, dispatch),
    }
}
const Category = connect(
    mapStateToProps, 
    mapDispatchToProps 
)(CategoryComponent)
module.exports = Category
