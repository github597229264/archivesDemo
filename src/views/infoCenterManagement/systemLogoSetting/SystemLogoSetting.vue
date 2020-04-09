<template>
    <div class="uploadSystemLogo">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>信息中心管理</el-breadcrumb-item>
                <el-breadcrumb-item>系统logo设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-container>
            <el-main>
                <img alt="系统logo" v-if="imageUrl" :src="imageUrl" class="imgLogo">
                <el-upload
                    class="uploadLogo"
                    align="center"
                    ref="upload"
                    :action="uploadUrl"
                    multiple
                    :name="uploadFileName"
                    :headers="headers"
                    :show-file-list="false"
                    :auto-upload="false"
                    :limit="1"
                    :data="uploadData"
                    :accept="acceptType"
                    :on-change="logoChange"
                    :before-upload="beforeUpload"
                    :on-success="uploadSuccess">
                    <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                    <el-button size="small" type="primary" @click="submitUpload">上传到服务器</el-button>
                    <div slot="tip">只能上传jpg/png文件，且不超过1MB</div>
                </el-upload>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "SystemLogoSetting",
        data() {
            return {
                uploadUrl: '',  //上传链接
                uploadFileName: 'uploadFile', //上传文件名字
                imageUrl:'',   //图片链接
                acceptType: 'image/png,image/jpg,image/jpeg', //接受的文件类型
                //上传数据
                uploadData: {
                    id: ''
                }
            }
        },
        created() {
            this.getData();
        },
        mounted() {
            this.uploadUrl = this.API.devBaseURL + this.API.uploadSystemLogo;
        },
        computed: {
            headers() {
                let stateObj = window.vm.$store.state;
                if(stateObj.user && stateObj.user.token) {
                    //token 转码
                    let submitToken = encodeURIComponent(stateObj.user.token);
                    let selectmenuid = this.$axios.defaults.headers.selectmenuid;
                    let token = encodeURIComponent(submitToken);
                    if(stateObj.menuObj && stateObj.menuObj.id) { //传递菜单id
                        selectmenuid = stateObj.menuObj.id;
                    }
                    return {
                        token: token,
                        selectmenuid: selectmenuid
                    };
                } else {
                    //清除登录信息并跳转到登录页面
                    window.vm.commonFun.againLogin(true);
                    return {}
                }
            }
        },
        methods: {
            /**
             * 获取初始化数据
             */
            getData(){
                this.$axios({
                    loading:{
                        isShow:true,//是否显示loading遮罩层
                        target:'.container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
                    },
                    method: 'get',
                    url: this.API.getSystemLogo
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code === "1") {
                        this.uploadData.id = resData.data.id;
                        this.imageUrl = resData.data.imagefile;
                    } else {
                        this.$message({
                            type: 'error',
                            message: "获取失败"
                        });
                    }
                }).catch(function(err) {
                    console.log("连接错误" + err);
                })
            },
            /**
             * 上传成功
             */
            uploadSuccess(res){
                if(res.code === '1') {
                    this.uploadData.id = res.data.id;
                    this.imageUrl = res.data.imgBase64;
                    this.$message({
                        type: 'success',
                        message: "上传成功"
                    });
                } else if(res.code === '3') {
                    this.$message({
                        type: 'error',
                        message: '登录信息过期，请重新登录!'
                    });
                    //清除token信息并跳转到登录页面
                    this.commonFun.againLogin(true);
                } else {
                    this.$message({
                        type: 'error',
                        message: '上传图片失败，请重新上传！'
                    });
                }
            },
            /**
             * 图片改变
             */
            logoChange(file){
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            /**
             * 上传
             */
            submitUpload() {
                this.$refs.upload.submit();
            },
            /**
             * 上传之前
             */
            beforeUpload(file){
                let isImage = file.type.indexOf('image') !== -1;
                let isLt1M = file.size / 1024 / 1024 < 1;
                if (!isLt1M) {
                    this.$message({
                        type: 'error',
                        message: '上传图片不能超过 1 MB!'
                    });
                    self.$refs.upload.uploadFiles = [];
                    return isLt1M;
                }
                if(!isImage){
                    this.$message({
                        type: 'error',
                        message: '请选择图片上传!'
                    });
                    self.$refs.upload.uploadFiles = [];
                    return isImage;
                }

            },
        }
    }
</script>

<style lang="scss" scoped>
    .uploadSystemLogo {
        width: 100%;
        font-size: 14px;
        .el-container{
            background-color: #fff;
            padding: 30px;
            height: 515px;
            .imgLogo {
                width: 400px;
                height: 50px;
            }
        }
        .uploadLogo{
            margin: 20px;
            display: block;
             /deep/ .el-upload--text{
                border: none;
                width: 7%;
                display: inline-flex;
            }
        }
    }
    .el-main{
        text-align: center;
    }
</style>
