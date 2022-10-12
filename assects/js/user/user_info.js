$(function () {
    //定义表单预设
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '用户昵称不可大于六个字符！'
            }

        }

    })
    //调用获取用户信息函数
    getUserInfo()

    //获取用户信息
    function getUserInfo() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            // 这里不需要写header配置项，已经全局配置好了
            success: function (res) {
                // 将获取的信息填入表单中
                if (res.status !== 0) {
                    layer.msg(res.message, { icon: 5 });
                }
                //对layui表单进行快速赋值
                form.val("userInfo", res.data)
                //快速获取layui表单值
                // var data1 = form.val("userInfo");
                // console.log(data1);
            }
        });
    }


    // 监听重置按钮点击事件
    $('#resbtn').on('click', function (e) {
        //阻止表单默认提交行为
        e.preventDefault()
        //当点击重置按钮，调用获取用户信息函数，重置信息
        getUserInfo()

    });

    // 监听提交按钮点击事件
    $('.layui-form').on('submit', function (e) {
        //阻止表单默认提交行为
        e.preventDefault()
        // console.log($(this).serialize());
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message, { icon: 5 });
                }
                // console.log(res);
                // 成功后重新调用index页面的获取信息函数，更新用户信息
                //iframe在index页面里嵌套，相当于index是iframe的父元素
                window.parent.getUserInfo()
            }
        });
    });

    


    //入口函数结束标签
})