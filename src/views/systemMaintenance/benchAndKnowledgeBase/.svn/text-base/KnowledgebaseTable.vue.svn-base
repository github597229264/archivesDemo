<template>
    <div class="knowledge-table-add">
        <el-form ref="knowledgeBaseTable" :model="knowledgeBaseTable" :rules="rules" label-width="110px"
        class="demo-ruleForm" size="small">
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item prop="title" label="标题：">
                    <el-input v-model="knowledgeBaseTable.title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="publiclevel" label="是否公开：">
                    <el-select v-model="knowledgeBaseTable.publiclevel" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item prop="comments" label="简要说明：">
            <el-input type="textarea" v-model="knowledgeBaseTable.comments"></el-input>
        </el-form-item>
        <!-- 富文本编辑框 -->
        <el-form-item prop="content" label="内容：">
            <div style="min-height: 450px;;">
                <quill-editor 
                    v-model="knowledgeBaseTable.content" 
                    ref="myQuillEditor"
                    :options="editorOption" 
                    @change="onEditorChange($event)"
                    style="height:400px;">
                </quill-editor>
            </div>
        </el-form-item>
        <el-form-item label="附件上传：">
            <el-upload
            ref="upload"
            :action="completeUrl"
            :name="uploadFileName"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            :headers="headers"
            :auto-upload="false"
            :on-change="handleChange"
            multiple>
                <el-button slot="trigger" size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
        </el-form>
        <!-- 操作按钮 -->
        <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save('knowledgeBaseTable')">保存</el-button>
        <el-button type="danger" @click="cancel">取 消</el-button>
        </div>
    </div>
</template>

<script>

export default {
    name:"knowledgeBaseTable",
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props:["selectColumn","isEditTable","knowledgeBaseObj"],
    data() {
        return {
            knowledgeBaseTable:{
                id:'',
                title: '', //标题
                comments: '', //说明
                publiclevel: 0, //公开程度
                content:"", //文本编辑 内容
            },
            rules:{
                title: [
                    { required: true, message: '请输入名称', trigger: 'change'},
                    {min: 1, max: 60, message: '长度必须在1到60位字符之间', trigger: 'blur' }
                ],
                comments:[
                    {required: true, message: '请输入简要说明', trigger: 'change'},
                    {min: 1, max: 15, message: '长度必须在1到15位字符之间', trigger: 'blur'}
                ],
                content:[
                    {min: 0, max: 715827882, message: '长度必须在0到715827882位字符之间', trigger: 'blur' }
                ],

            },
            options: [
                {value: 1,label: '公开'},
                {value: 0,label: '不公开'}
            ],
            editorOption:{ //编辑框配置
                placeholder:"请输入...",
                modules:{
                    toolbar:[
                        ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
                        ['blockquote', 'code-block','link'],     //引用，代码块
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
                        [{ 'align': [] }],    //对齐方式
                        ['image','link'] //上传图片、链接
                    ]
                },
            },
            completeUrl: '', //上传地址
            fileList: [], //上传的文件列表
            fileIds:[], //附件的ids
            uploadFileName: 'uploadFile', //上传附件参数名
            isFileLength:0, //
        };
    },

    //监听属性 类似于data概念
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
        headers(){
            let stateObj = window.vm.$store.state;
            if(stateObj.user && stateObj.user.token) {
                //token 转码
                let submitToken = encodeURIComponent(stateObj.user.token);
                let selectmenuid=this.$axios.defaults.headers.selectmenuid;
                let token = encodeURIComponent(submitToken);
                if(stateObj.menuObj && stateObj.menuObj.id) {//传递菜单id
                    selectmenuid = stateObj.menuObj.id;
                }
                return {
                    token: token,
                    selectmenuid:selectmenuid
                };
            }else{
                //清除登录信息并跳转到登录页面
                window.vm.commonFun.againLogin(true);
                return {}
            }
        }
    },

    //监控data中的数据变化
    watch: {},

    //方法集合
    methods: {
        // 上传文件之前的钩子，限制上传文件size
        beforeUpload(file){
           const isLt2M = file.size / 1024 / 1024 < 1
           if(!isLt2M){
               this.$message({
                   type: 'error',
                   message: '上传文件大小不得超过1M！'
               })
               return false;
           }
        },
        handleRemove(file, fileList) {//文件列表移除文件时的钩子
            this.$axios({
                method: 'get',
                url: this.API.deleteAttaById,
                params:{
                    id: file.id
                }
            }).then(res => {
                // console.log(res.data);
                let resData = res.data;
                if(resData.code == '1'){
                    this.$message({
                        type: 'success',
                        message: '移除附件成功！'
                    })
                }else{
                   this.$message({
                        type: 'error',
                        message: '操作失败，请刷新重试！'
                    }) 
                }
            }).catch( err => {
                console.log(err);
                this.$message({
                    type: 'error',
                    message: '请求异常，请检查网络！'
                })
            })
        },
        handleChange(file, fileList){
            this.fileList = fileList;
        },
        handleSuccess(res,file,fileList){//文件上传成功时的钩子 
            if(res.code === '1') {
                this.isFileLength++;
                this.fileIds.push(res.data.id);
                if(this.isFileLength === this.fileList.length){
                    this.updateToNet();
                }
            } else if(res.code === '3') {
                this.$message({
                    type: 'error',
                    message: '登录信息过期，请重新登录!'
                });
                // 清除token信息并跳转到登录页面
                this.commonFun.againLogin(true);
            } else {
                this.$message({
                    type: 'error',
                    message: '上传文件失败，请重新上传！'
                });
            }
        },
        save(formName){
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    return false;
                }
                 if(this.fileList.length === 0){
                    this.updateToNet();
                }else{
                    this.$refs.upload.submit(); //上传附件
                }
            });
        },
        // 添加至服务器
        updateToNet(){
            let url = '';
            if(this.isEditTable){
                url = this.API.updateArchKnowledge
            }else{
                url = this.API.saveArchKnowledge
            }
            this.$axios({
                method: 'post',
                url: url,
                data: {
                    id: this.knowledgeBaseTable.id,
                    businesstypeid: this.knowledgeBaseObj.id,
                    title:this.knowledgeBaseTable.title,
                    comments:this.knowledgeBaseTable.comments,
                    content:this.knowledgeBaseTable.content,
                    publiclevel: this.knowledgeBaseTable.publiclevel,
                    businesstype:'Sys_ArchivesKnowledge',
                    fileids: this.fileIds.join(',').toString(),
                }
                }).then((res) => {
                var resData = res.data;
                if (resData.code == "1") {
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                    this.$emit("knowledgebaseTableCall",true);
                } else {
                    this.$message({
                        type: 'error',
                        message: '操作失败，请刷新重试！'
                    });
                }
            }).catch((err) => {
                console.log("连接错误" + err);
                this.$message({
                    type: 'error',
                    message: '请求异常，请检查网络！'
                });
            })
        },
        // 编辑回显附件列表
        getData(){
            this.$axios({
                method: 'post',
                url: this.API.editArchKnowledge,
                data: {
                    id: this.selectColumn.id,
                }
                }).then((res) => {
                var resData = res.data;
                if (resData.code == "1") {
                    let fileItem = resData.data.list;
                    // console.log(fileItem);
                    fileItem.forEach( item => {
                        this.fileList.push({
                            'name': item.satitle,
                            'url': '',
                            'id':item.fileid
                        });
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '操作失败，请刷新重试！'
                    });
                }
            }).catch((err) => {
                this.$message({
                    type: 'error',
                    message: '请求异常，请检查网络！'
                });
            })
        },
        cancel(){ //取消
            this.resetForm('knowledgeBaseTable');
            this.$emit("knowledgebaseTableCall",false);
        },
        resetForm(formName) { //重置表单
            this.$refs[formName].resetFields();
        },
        onEditorChange(){}, // 内容改变事件
        },

    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        if(this.selectColumn != ""){
            // console.log(this.selectColumn);
            this.knowledgeBaseTable.id = this.selectColumn.id;
            this.knowledgeBaseTable.title = this.selectColumn.title;
            this.knowledgeBaseTable.comments = this.selectColumn.comments;
            this.knowledgeBaseTable.content = this.selectColumn.content;
            this.knowledgeBaseTable.publiclevel =  this.selectColumn.publiclevel;
            this.getData();
            this.isEdit = true
        }
    },

    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.completeUrl = this.API.baseURL + this.API.uploadFileImageandExcel;
    },

    beforeCreate() {}, //生命周期 - 创建之前

    beforeMount() {}, //生命周期 - 挂载之前

    beforeUpdate() {}, //生命周期 - 更新之前

    updated() {}, //生命周期 - 更新之后

    beforeDestroy() {}, //生命周期 - 销毁之前

    destroyed() {}, //生命周期 - 销毁完成

    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发

}

</script>

<style lang="scss" scoped>
.knowledge-table-add /deep/.el-upload--text{ text-align: left; border:none;}
.knowledge-table-add /deep/.el-upload{text-align: left;}
.knowledge-table-add{
    .dialog-footer{ margin-top: 10px; text-align: center;}
}
</style>