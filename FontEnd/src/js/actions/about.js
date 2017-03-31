/*修改关于网站的信息
 @data  关于网站的内容
 */
const saveAbout = (data) => {
    return (dispatch) => {
        fetch(requestAPI + "about", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            credentials: 'include',
            body: "neirong=" + data
        })
            .then(function(response) {
                return response.json()
            })
            .then(function(data) {
                if (data.code === 1000) {
                    return _alertStore(dispatch, data.messgage)
                } else {
                    return _alertStore(dispatch, data.messgage)
                }
            })
            .catch(function(e) {
                console.error(e);
            });
    }
}

export {
    saveAbout
}