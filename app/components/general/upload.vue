

<template>

<input type="file" id="customfilename" style="opacity: 0; display: none;">

</template>

<script>

export default {
    components: {},
    props: {
        upid: {
            type: String
        }
    },
    data() {
        return {

        }
    },
    ready() {
        let _this = this;
        let jFile = $('#customfilename');
        let val = this.upid;
        //上传的元素节点
        let upload = [];
        $('.right_contain').unbind('click').on('click', val, function() {
            jFile.click();
            upload=$(this);
        });

        jFile.unbind('change').change(function() {
            let upLoadurl = "http://filecloud.beimai.com/upload/pic"; //"/upsinglefile.ashx?";

            let jFile = $('#customfilename');
            let folder = '/saas/';
            // let param = {
            //     ext: "jpg,gif,jpeg,png",
            //     sz: 102400,
            //     folder: encodeURIComponent(uploadParam.SaveFolder),
            //     objname: "objAspNetUpload",
            //     issmallimg: 1,
            //     valstr: uploadParam.ValStr,
            //     simg: uploadParam.SmallImgSizes
            // }
            // for (var item in param) {
            //     upLoadurl += `${item}=${param[item]}&`;
            // }
            var data = new FormData();
            data.append('fileName', jFile[0].files[0]);
            data.append('p', uploadParam.p);

            $.ajax({
                url: upLoadurl,
                type: 'POST',
                data: data,
                crossdomain: true,
                processData: false, // 告诉jQuery不要去处理发送的数据
                contentType: false // 告诉jQuery不要去设置Content-Type请求头
            }).done(function(res) {
                res.url=res.path;
                res.CurrentBtn = upload;
                _this.$dispatch('upload', res)
                if(res.status!="SUCCESS"){
                  console.error(res);
                }
            });
        })
    },
    watch: {

    },
    methods: {
        upload() {

        }
    }
}

</script>
