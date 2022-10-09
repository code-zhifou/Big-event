$(function () {
    //创建切换面板事件
    $('#login-tip').on('click', function () {
        $('.tip-login').hide();
        $('.tip-reg').show();
    })

    $('#reg-tip').on('click', function () {
        $('.tip-login').show();
        $('.tip-reg').hide();
    })

    //定义请求根路径
    // var url = "http://www.liulongbin.top:3007"
    //自定义校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.tip-reg [name=password]').val()
            // console.log(pwd);
            // console.log(value);
            if (pwd !== value) {
                return '两次输入密码不正确'
            }
        }
    })


    // 监听注册表单的提交事件
    $('#reg-form').on('submit', function (e) {
        e.preventDefault();
        var username = $('#reg-form [name=username]').val();
        var password = $('#reg-form [name=password]').val();
        var repassword = $('#reg-form [name=repassword]').val();
        var data = {
            username: username,
            password: password
        }
        $.post("/api/reguser", data,
            function (res) {
                console.log(res);
                if (res.status !== 0) {
                    layer.msg(res.message, { icon: 5 });
                    // console.log(res.message);
                } else {
                    layer.msg(res.message, { icon: 6 });
                    $('#reg-form [name=username]').val("");
                    $('#reg-form [name=password]').val("");
                    $('#reg-form [name=repassword]').val("");
                    $('#reg-tip').click()

                }
            }
        );

    });

    // 监听登录表单的登录事件
    $('#login-form').on('submit',function (e) {
        e.preventDefault();
        // console.log($(this));
        // var data = {
        //     username: $('#login-form [name=username]').val(),
        //     password: $('#login-form [name=password').val()
        // }
        var data = $(this).serialize()
        // console.log(data);
        $.ajax({
            type: "post",
            url: "/api/login",
            data: data,
            // data:$(this).serialize(),
            // dataType: "dataType",
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    layer.msg(res.message, { icon: 5 });
                } else {
                    layer.msg(res.message, { icon: 6 });
                    $('#login-form [name=username]').val("")
                    $('#login-form [name=password').val("")
                    // console.log(res.token);
                    //将获取来的token值存储与localStorage中
                    localStorage.token = res.token
                    location.href = '/index.html'
                }
            }
        });
    });


})