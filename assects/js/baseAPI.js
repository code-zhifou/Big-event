//当使用jquery 提供的post get ajax 请求时会提前调用这个函数
//这个函数会自动帮我们把根路径拼接到请求的地址
$.ajaxPrefilter(function(option){
    option.url = 'http://www.liulongbin.top:3007'+ option.url


    //判断是否是 /my 目录下的接口 是则加上header参数
    //string.indexOf() 方法中，传递参数，判断字符串中是否包含查找的字符串，没有则为-1
    if(option.url.indexOf('/my/') !== -1){
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    //统一挂载complete回调函数
    //不管成功或失败都会调用的函数
    option.complete = function (res) {
        // 判断登陆状态是否失败
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 失败的话清空token并跳转到登录页面
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})