<template>
<div class="mailList-tree-add">
    <el-form ref="mailListTreeForm" :model="mailListTreeForm" :rules="rules" label-width="110px"
    class="demo-ruleForm" size="small">
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item prop="pid" label="上级分类：">
                    <mailListTreeSelect :defaultOptions="defaultFormTree" @mailListTreeSelectCall="mailListTreeSelectCall"></mailListTreeSelect>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="title" label="分类名称：">
                    <el-input v-model="mailListTreeForm.title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item prop="content" label="内容：">
                    <el-input type="textarea" v-model="mailListTreeForm.content"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <!-- 操作按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save('mailListTreeForm')">保存</el-button>
      <el-button type="danger" @click="cancel">取 消</el-button>
    </div>
</div>
</template>

<script>
import mailListTreeSelect from '../../../components/mailListTreeSelect.vue';

export default {
    name:"mailListTreeAdd", //左侧树弹窗表单
    //import引入的组件需要注入到对象中才能使用
    components: {
        mailListTreeSelect
    },
    props:["mailListTypeObj","isEdit"],

    data() {
        return {
            mailListTreeForm:{
                id:'',
                pid:'', //父级id 
                title:'', //分类名称 
                content: '', //内容
            },
            rules: {
                title:[
                    {required: true, message: "请输入分类名称", trigger: "change"},
                    {min: 1, max: 60, message: '长度必须在1到60位字符之间', trigger: 'blur' }
                ],
                content:[
                    {min: 0, max: 1300, message: '长度必须在0到1300位字符之间', trigger: 'blur' }
                ]
            },
            defaultFormTree: [], //默认菜单树选中项
        };
    },

    //监听属性 类似于data概念
    computed: {},

    //监控data中的数据变化
    watch: { },

    //方法集合
    methods: {
        mailListTreeSelectCall(returnObj){ //下拉树形菜单子组件回调数据
            if(returnObj){
                this.mailListTreeForm.pid = returnObj.id
            }
        },
        save(formName){
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    return false;
                }
                this.addKnowledgeTreeToNet();
            });
        },
        addKnowledgeTreeToNet(){ //添加至服务器
            this.$axios({
                method: 'post',
                url: this.API.saveOrUpdateBusType,
                data:{
                    id:this.mailListTreeForm.id,
                    pid: this.mailListTreeForm.pid,
                    title: this.mailListTreeForm.title,
                    typename: "Sys_AddressList",
                    content: this.mailListTreeForm.content
                }
            }).then((res) => {
                var resData = res.data;
                if (resData.code == "1") {
                    this.$message({
                        message: "添加数据成功！",
                        type: "success"
                    });
                    this.$emit("mailListTreeFormCall", true);
                } else {
                    this.$message({
                        type: "error",
                        message: "添加数据失败，请刷新重试！"
                    });
                }
            }).catch((err) => {
                this.$message({
                    type: "error",
                    message: '请求异常，请检查网络！'
                });
            })
        },
        cancel(){ //取消
            this.resetForm('mailListTreeForm');
            this.$emit("mailListTreeFormCall",false);
        },
        resetForm(formName) { //重置表单
            this.$refs[formName].resetFields();
        },
        
    },

    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        if(this.isEdit){
            console.log(this.mailListTypeObj);
            this.mailListTreeForm.id = this.mailListTypeObj.id;
            this.mailListTreeForm.pid = this.mailListTypeObj.pid;
            this.mailListTreeForm.title = this.mailListTypeObj.title;
            this.mailListTreeForm.content = this.mailListTypeObj.content;
        }  
    },

    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},

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
    .mailList-tree-add{
        .el-button{ margin-bottom:10px;}
        .dialog-footer{ margin-top: 10px; text-align: center;}
    }
</style>