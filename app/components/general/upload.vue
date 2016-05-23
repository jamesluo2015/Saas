

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
            let upLoadurl = "/upsinglefile.ashx?";

            let jFile = $('#customfilename');
            let folder = '/saas/';
            let param = {
                ext: "jpg,gif,jpeg,png",
                sz: 102400,
                folder: encodeURIComponent(uploadParam.SaveFolder),
                objname: "objAspNetUpload",
                issmallimg: 1,
                valstr: uploadParam.ValStr,
                simg: uploadParam.SmallImgSizes
            }
            for (var item in param) {
                upLoadurl += `${item}=${param[item]}&`;
            }

            var data = new FormData();
            data.append('filedata', jFile[0].files[0]);
            $.ajax({
                url: upLoadurl,
                type: 'POST',
                data: data,
                processData: false, // 告诉jQuery不要去处理发送的数据
                contentType: false // 告诉jQuery不要去设置Content-Type请求头
            }).done(function(ret) {
                ret = ret.replace(/'/g, '"');
                ret = JSON.parse(ret);
                ret.msg.CurrentBtn = upload;
                _this.$dispatch('upload', ret.msg)
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
