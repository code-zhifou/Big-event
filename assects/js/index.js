$(function () {

    // 调用获取信息函数
    getUserInfo()


    //实现退出登录功能
    //绑定 退出链接 点击事件
    $('#btnLogout').on('click', function () {
        //添加 layui  询问框
        layer.confirm('确定退出登录?', {icon: 3, title:'想好喽'}, function(index){
            //do something 当选择确定所执行的代码
            // 移除浏览器存储的token
            localStorage.removeItem('token')
            // 将页面跳转至登录页面
            location.href = '/login.html'
            //关闭询问窗口
            layer.close(index);
          });
    });
    





})

var layer = layui.layer

// 定义获取用户信息函数
function getUserInfo() { 
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function (res) {
            if (res.status !== 0) {
                layer.msg('获取用户信息失败', {icon: 5});
            }else{
                //调用函数渲染用户头像
                renderAvatar(res.data)
            }
        }
        
    });


    //定义渲染头像函数
    function renderAvatar(user) {
        //获取用户姓名
        var name = user.nickname || user.username
        // 设置用户名
        $('.welcome').html('欢迎&nbsp;&nbsp;'+ name)
        // 设置用户头像
        if (user.user_pic !==null) {
            //将用户头像显示，隐藏文本头像
            $('.layui-nav-img').attr('src',user.user_pic).show()
            $('.text-avater').hide()
        } else {
            //将用户头像隐藏，显示文本头像，并更换文本头像内容
            $('.layui-nav-img').hide()
            $('.text-avater').html(name[0].toUpperCase()).show()
        }
    }
}

