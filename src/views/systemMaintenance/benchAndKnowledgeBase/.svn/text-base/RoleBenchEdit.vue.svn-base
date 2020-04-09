<!-- template -->
<template>
    <div class="roleBench-edit-container">
        <el-form ref="roleBenEditForm" :rules="rules" :model="roleBenEditForm" label-width="110px">
            <el-form-item label="角色名称：" prop="name">
                <el-input v-model="roleBenEditForm.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="工作台：" prop="workbenchName">
                <!-- <roleBenchNameSelect :chioceOptionId="roleBenEditForm.id" @roleBenEditCall="roleBenEditCall"></roleBenchNameSelect> -->
                <roleBenchNameSelect :chioceOptionId="roleBenEditForm.workbenchid" @roleBenEditCall="roleBenEditCall"></roleBenchNameSelect>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="save('roleBenEditForm')">保存</el-button>
			<el-button type="danger" @click="cancel">取消</el-button>
		</div>
    </div>
</template>

<script>
import roleBenchNameSelect from '../../../components/RoleBenchNameSelect.vue';

export default {
    name:"roleBenchEdit",
    //import引入的组件需要注入到对象中才能使用
    components: {roleBenchNameSelect},
    props:["selectColumn"],

    data() {
        return {
            roleBenEditForm:{
                id: '', //id
                name:'', //角色名称
                workbenchName: '',//工作台
                workbenchid: '', //工作台id
            },
            rules:{
                workbenchName:[
                    {required: true,message:'请选择工作台',trigger:'change'}
                ]
            }
        };
    },

    //监听属性 类似于data概念
    computed: {},

    //监控data中的数据变化
    watch: {},

    //方法集合
    methods: {
        roleBenEditCall(returnObj){ //select下拉框的组件回调数据
            console.log(returnObj);
            // this.workbenchid = returnObj;
            this.roleBenEditForm.workbenchid = returnObj;
        },
        save(formName){ //保存
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    alert('error submit!');
                    return false;
                }
                this.updateToNet();
            });
        },
        updateToNet(){//编辑
            this.$axios({
                method: 'get',
                url: this.API.updateRoleWorkBench,
                params: {
                    id: this.selectColumn.id,
                    workbenchid: this.roleBenEditForm.workbenchid
                }
                }).then((res) => {
                var resData = res.data;
                if (resData.code == "1") {
                    this.$message({
                        message: '编辑数据成功！',
                        type: 'success'
                    });
                    this.$emit("roleBenchCallBack",true);
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
        cancel(){ //取消
            this.resetForm('roleBenEditForm');
            this.$emit("roleBenchCallBack",false)
        },
        resetForm(formName) { //重置表单
            this.$refs[formName].resetFields();
        },
    },

    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        if(this.selectColumn != ""){
            console.log(this.selectColumn);
            this.roleBenEditForm.workbenchid = this.selectColumn.workbenchid;
            this.roleBenEditForm.name = this.selectColumn.name;
            this.roleBenEditForm.workbenchName = this.selectColumn.workbenchName;
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
    .roleBench-edit-container{
        .dialog-footer{ padding-top: 15px; text-align: center;}
    }
</style>