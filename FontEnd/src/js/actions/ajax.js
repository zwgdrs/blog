/*文章请求
 @type 列表or文章详情
 @params 如果有代表文章页码切换
 */
const SwitchTab = (type, data) => {
    return {
        type: "containers",
        data
    }
}
const requestAPI = "http://localhost:8080/"
const ajaxData = (type, params) => {
    return (dispatch, getState) => {
        var name = ""
        switch (type) {
            case "index":
                if (params) { name = "newsList?page=" + params } else { name = "newsList" };
                break;
            case "category":
                if (params) { name = "newsList?category="+params.category+( params.page?"&page=" + params.page:"" )} else { name = "newsList?category" };
                break;
            case "search":
                if (params) { name = "search?keyword="+params.keyword+( params.page?"&page=" + params.page:"" )}
                break;
            case "details":
                name = "a/" + encodeURI(params.name) + "/" + params.date + "/" + encodeURI(params.title);
                break;
            case "about":
                name = "about";
                break;
            default:
                return {};
        }
        fetch(requestAPI + name, {
            credentials: 'include'
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                return dispatch(SwitchTab(type, data))
            })
            .catch(function(e) {
                console.error(e);
            });

    }
}

export {
    SwitchTab,
    requestAPI,
    ajaxData
}