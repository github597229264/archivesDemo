<template>
<div class="workCom-treeForm-add">
    <el-form ref="workComTreeForm" :model="workComTreeForm" :rules="rules" label-width="110px"
    class="demo-ruleForm" size="small">
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item prop="pid" label="上级分类：">
                    <workComTreeSelect :defaultOptions="defaultFormTree" @WorkComTreeSelectCall="WorkComTreeSelectCall"></workComTreeSelect>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="title" label="分类名称：">
                    <el-input v-model="workComTreeForm.title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item prop="content" label="内容：">
                    <el-input type="textarea" maxlength="1300" v-model="workComTreeForm.content"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <!-- 操作按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save('workComTreeForm')">保存</el-button>
      <el-button type="danger" @click="cancel">取 消</el-button>
    </div>
</div>
</template>

<script>
import workComTreeSelect from '../../../components/WorkComTreeSelect.vue'

export default {
    name:"workComtree", //左侧树弹窗表单
    //import引入的组件需要注入到对象中才能使用
    components: {workComTreeSelect},
    props:["workComObj","isEdit"],

    data() {
        return {
            workComTreeForm:{
                id:'',
                pid: '',
                title:'',
                content: '',
            },
            rules: {
                title:[
                    {required: true, message: "请输入分类名称", trigger: "change"},
                    {min: 0, max: 60, message: '长度必须在0到60位字符之间', trigger: 'blur' }
                ],
                content:[{min: 0, max: 1300, message:'长度必须在0到1300位字符之间', trigger: 'blur'}]
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
        WorkComTreeSelectCall(returnObj){ //下拉树形菜单子组件回调数据
            if(returnObj){
                this.workComTreeForm.pid = returnObj.id;
            };
        },
        save(formName){
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    return false;
                }
                this.addWorkComTreeToNet();
            });
        },
        addWorkComTreeToNet(){ //添加至服务器
            this.$axios({
                method: 'post',
                url: this.API.saveOrUpdateBusType,
                data:{
                    id:this.workComTreeForm.id,
                    pid: this.workComTreeForm.pid,
                    title: this.workComTreeForm.title,
                    typename: "Sys_ActiveFiles",
                    content: this.workComTreeForm.content
                }
            }).then((res) => {
                var resData = res.data;
                if (resData.code == "1") {
                    this.$message({
                        message: "添加数据成功！",
                        type: "success"
                    });
                    this.$emit("workComCall", true);
                } else {
                    this.$message({
                        type: "error",
                        message: "添加数据失败，请刷新重试！"
                    });
                }
            })
        },
        cancel(){ //取消
            this.resetForm('workComTreeForm');
            this.$emit("workComCall",false);
        },
        resetForm(formName) { //重置表单
            this.$refs[formName].resetFields();
        },
        
    },

    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        console.log(this.workComObj);
        if(this.isEdit){
            this.workComTreeForm.id = this.workComObj.id;
            this.workComTreeForm.content = this.workComObj.content;
            this.workComTreeForm.title = this.workComObj.title;
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
    .workCom-treeForm-add{
        .el-button{ margin-bottom:10px;}
        .dialog-footer{ margin-top: 10px; text-align: center;}
    }
</style>