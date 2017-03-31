/*搜索文章请求
 @keyword 搜索关键字
 @params 如果有代表页码切换
 */

const SwitchTab = (type, data) => {
    return {
        type: "containers",
        data
    }
}

const searchSubmit = (keyword, params) => {
    return (dispatch, getState) => {
        var name = keyword
        if (params) { //页码查询
            name = keyword + "&page=" + params
        }
        fetch(requestAPI + "search?keyword=" + name, {
            credentials: 'include'
        })
            .then(function(response) {
                return response.json();
            }).then(function(data) {
            return dispatch(SwitchTab("search", data))
        }).catch(function(e) {
            console.error(e);
        });
    }
}

export {
    searchSubmit,
    SwitchTab
}
