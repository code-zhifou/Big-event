//当使用jquery 提供的post get ajax 请求时会提前调用这个函数
//这个函数会自动帮我们把根路径拼接到请求的地址
$.ajaxPrefiler(function(option){
    option.url = 'http://www.liulongbin.top:3007'+ option.url
})