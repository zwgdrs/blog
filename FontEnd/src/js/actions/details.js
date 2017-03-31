
/*留言
 @data 留言提交的数据
 @params 提交的URL路由
 */
export const commentsSubmit = (data, params) => {
    return (dispatch) => {
        fetch(requestAPI + "a/" + params.name + "/" + params.date + "/" + params.title, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            credentials: 'include',
            body: data
        })
            .then(function(response) {
                return response.json()
            })
            .then(function(data) {
                if (data.code === 1000) {
                    return _alertStore(dispatch, "留言成功", function() {
                        hashHistory.goBack()
                    })
                } else {
                    return _alertStore(dispatch, "留言失败", function() {
                        hashHistory.goBack()
                    })
                }
            })
            .catch(function(e) {
                console.error(e);
            });
    }
}