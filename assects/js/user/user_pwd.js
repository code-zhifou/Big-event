$(function () {

    //定义表单预设
    var form = layui.form
    var layer = layui.layer



    form.verify({
        // pwd: function (value) {
        //     if ( value.length < 6 || value.length > 15) {
        //         return '用户密码为6-15个字符！'
        //     }

        // }
        samepwd:function(value){
            var data = form.val("userpwd")
            if (data.oldPwd == data.newPwd) {
                return "新密码不可以和原密码相同"
            }
        },
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格']
    })

    //监听重置按钮点击事件
    $('#resbtn').on('click', function (e) {
        //阻止表单默认提交行为
        e.preventDefault()
        //当点击重置按钮，调用获取用户信息函数，重置信息
        // console.log("ok");
        form.val("userpwd", {
            "oldPwd": '',
            "newPwd": '',
            "resPwd": ''
        })

    });



    //监听重置密码按钮点击事件
    $('#pwd_form').on('submit', function (e) {
        //阻止表单默认提交事件
        e.preventDefault()
        // console.log($(this).serialize());
        //判断两次输入密码相同不
        var data = form.val("userpwd")
        // console.log(data);
        if (data.newPwd !== data.resPwd) {
            layer.msg("两次输入密码不同！请重新输入", { icon: 5 })
        } else {
            $.ajax({
                type: "post",
                url: "/my/updatepwd",
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        layer.msg(res.message, { icon: 5 })
                    }
                    layer.msg(res.message, { icon: 6 })
                    $('#pwd_form')[0].reset()
                }
            });
        }

    });






    //入口函数结束
})