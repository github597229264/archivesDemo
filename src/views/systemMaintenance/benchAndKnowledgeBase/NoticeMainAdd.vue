<template>
    <div class="notice-mainAdd-container">
         <el-form ref="noticeMainTable" :model="noticeMainTable" :rules="rules" label-width="110px"
        class="demo-ruleForm" size="small">
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item prop="title" label="标题：">
                    <el-input v-model="noticeMainTable.title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="ispublic" label="是否发布：">
                    <el-select v-model="noticeMainTable.ispublic" placeholder="请选择">
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
            <el-input type="textarea" v-model="noticeMainTable.comments"></el-input>
        </el-form-item>
        <!-- 富文本编辑框 -->
        <el-form-item prop="content" label="内容：">
            <div style="min-height: 450px;;">
                <quill-editor 
                    v-model="noticeMainTable.content" 
                    ref="myQuillEditor"
                    :options="editorOption" 
                    @change="onEditorChange($event)"
                    style="height:400px;">
                </quill-editor>
            </div>
        </el-form-item>
         </el-form>
         <!-- 操作按钮 -->
        <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save('noticeMainTable')">保存</el-button>
        <el-button type="danger" @click="cancel">取 消</el-button>
        </div>
    </div>
</template>

<script>

export default {
    name:"noticeMainAddContainer",
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props:["selectColumn"],

    data() {
        return {
            noticeMainTable: {
                id: '',
                title: '', //标题
                ispublic: 0, //是否发布
                comments: '', //简要说明
                content: '' //内容
            },
            rules:{
                title: [
                    { required: true, message: '请输入名称', trigger: 'change'},
                    { min: 1, max: 60, message: '长度必须在1到60位字符之间', trigger: 'blur' }
                ],
                comments:[
                    {required: true, message: '请输入简要说明', trigger: 'change'},
                    { min: 1, max: 15, message: '长度必须在1到15位字符之间', trigger: 'blur' }
                ],
                content:[
                    { min: 0, max: 700000000, message: '长度必须在0到700000000位字符之间', trigger: 'blur' }
                ]
            },
            options: [
                {value: 1,label: '是'},
                {value: 0,label: '否'}
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
            isEdit: false, //true为编辑，false为新增
        };
    },

    //监听属性 类似于data概念
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    },

    //监控data中的数据变化
    watch: {},

    //方法集合
    methods: {
        save(formName){
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    return false;
                }
                this.addNoticeMainToNet();
            });
        },
        addNoticeMainToNet(){ //添加至服务器
            this.$axios({
                method: "post",
                url: this.API.saveOrUpdateSysMessage,
                data: {
                    id: this.noticeMainTable.id,
                    title: this.noticeMainTable.title,
                    ispublic: this.noticeMainTable.ispublic,
                    comments: this.noticeMainTable.comments,
                    content: this.noticeMainTable.content
                }
            }).then(res => {
                console.log("返回的数据=" + res);
                var resData = res.data;
                if (resData.code == "1") {
                this.$message({
                    message: "添加数据成功！",
                    type: "success"
                });
                this.$emit("noticeMainCall",true);
                } else {
                this.$message({
                    type: "error",
                    message: "添加数据失败，请刷新重试！"
                });
                }
            }).catch((err) => {
                this.$message({
                    type: "error",
                    message: "请求异常，请检查网络！"
                });
            });
        },
        cancel(){ //取消
            this.resetForm('noticeMainTable');
            this.$emit("noticeMainCall",false);
        },
        resetForm(formName) { //重置表单
            this.$refs[formName].resetFields();
        },
        onEditorChange(){}, // 内容改变事件
    },

    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        if(this.selectColumn != ""){
            console.log(this.selectColumn);
          this.noticeMainTable.id = this.selectColumn.id;
          this.noticeMainTable.title = this.selectColumn.title;
          this.noticeMainTable.comments = this.selectColumn.comments;
          this.noticeMainTable.content = this.selectColumn.content;
          this.noticeMainTable.ispublic =  this.selectColumn.ispublic;
          this.isEdit = true
      }
    },

    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

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
    .notice-mainAdd-container{
        .dialog-footer{ margin-top: 10px; text-align: center;}
    }
</style>