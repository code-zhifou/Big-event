
$(function () {
    var layer = layui.layer


    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    //监听点击“上传”按钮事件 模拟点击上传文件框
    $('#chooseImage').on('click', function () {
        $('#file').click()
    });

    //监听文件上传点击事件
    $('#file').on('change', function (e) {
        var filelist = e.target.files
        // console.log(filelist[0]);
        if (filelist.length === 0) {
            layer.msg('请选择图片', { icon: 5 })
        }
        //获取用户上传的文件
        var file = e.target.files[0]
        //将文件转化为路径
        var imageurl = URL.createObjectURL(file)
        // console.log(imageurl);

        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imageurl)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    //给确定上传按钮添加点击事件
    $('#btnUpload').on('click', function () {
        //拿到用户裁剪后的图片并转化为base64格式
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            // console.log(dataURL);
        //调用上传图片接口
        $.ajax({
            type: "post",
            url: "/my/update/avatar",
            data: {avatar:dataURL},
            success: function (res) {
                if (res.status !== 0 ) {
                    layer.msg('res.message',{icon:5})
                }
                //成功后重新调用index上的获取用户信息函数
                window.parent.getUserInfo()
            }
        });


    })







    //入口函数结束
})