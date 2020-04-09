<template>
    <div class="container">
        <el-form ref="managementArchFormRef" :rules="rules" :model="managementArchForm" label-width="150px">
            <el-row>
                <el-col :span="22">
                    <el-form-item label="管档单位" prop="title">
                        <el-input v-model="managementArchForm.title" type="text" maxlength='15' placeholder="请输入管档单位"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="上级菜单" prop="parentid">
                        <management-arch-tree-select
                            :defaultOptions="managementArchForm.parentid"
                            @TreeSelectCall="treeSelectCall">
                        </management-arch-tree-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="编码" prop="code">
                        <el-input v-model="managementArchForm.code" type="text" maxlength='10' placeholder="请输入编码"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="是否启用" prop="isenable">
                        <el-select v-model="managementArchForm.isenable">
                            <el-option
                                v-for="item in isenable"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="地图url" prop="mapurl">
                        <el-input placeholder="请选择地图url" v-model="managementArchForm.mapurl">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="footer">
                <el-button type="primary" @click="onsubmit">保存</el-button>
                <el-button type="danger" @click="cancle">取消</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    import ManagementArchTreeSelect from '../../../components/ManagementArchTreeSelect.vue'
    export default {
        name: "UpdateManagementArch",    //新增或者修改管档单位
        props:[
            'currentRow',
            'isEdit'//true：编辑，false：添加
        ],
        components: {
            ManagementArchTreeSelect, //上级菜单下拉框
        },
        data(){
            return {
                //表单验证
                rules: {
                    title: [{
                        required: true,
                        message: '请输入名称',
                        trigger: 'change'
                    }],
                    code: [{
                        required: true,
                        message: '请输入编码',
                        trigger: 'change'
                    }],
                    isenable: [{
                        required: true,
                        message: '请选择是否启用',
                        trigger: 'change'
                    }]
                },
                managementArchForm: {
                    id: "",
                    title: "", //管档单位
                    code: "", //编码
                    parentid: "", //上级菜单id
                    isenable: "", //是否启用
                    mapurl: "", //地图url
                    mapareaid: "", //地图区域id
                    level: 1  //级别
                },
                //档案类别
                isenable: [{
                    value: true, //实体档案
                    label: '是'
                },{
                    value: false, //电子档案
                    label: '否'
                }],
            }
        },
        created(){
            this.initForm();
        },
        methods:{
            /**
             * 初始化form
             */
            initForm(){
                if(!this.isEdit) {
                    if(this.currentRow === null || this.currentRow === "") {
                        this.managementArchForm.level = 1;
                        this.managementArchForm.parentid = "";
                    }else{
                        this.managementArchForm.level = this.currentRow.level +1 ;
                        this.managementArchForm.parentid = this.currentRow.id;
                    }
                    return;
                }
                this.managementArchForm.id = this.currentRow.id;
                this.managementArchForm.title = this.currentRow.title;
                this.managementArchForm.parentid = this.currentRow.parentid;
                this.managementArchForm.code = this.currentRow.code;
                this.managementArchForm.isenable = this.currentRow.isenable;
                this.managementArchForm.mapurl = this.currentRow.mapurl;
                this.managementArchForm.mapareaid = this.currentRow.mapareaid;
                this.managementArchForm.level = this.currentRow.level;
            },
            /**
             * 上级菜单选择
             */
            treeSelectCall(returnObj){
                if(returnObj && returnObj.id){
                    this.managementArchForm.parentid = returnObj.id;
                    this.managementArchForm.level = returnObj.level + 1;
                }
            },
            /**
             * 保存
             */
            onsubmit(){
                this.$refs['managementArchFormRef'].validate((valid) => {
                    if(!valid) {
                        return false;
                    }
                    //保存数据
                    this.$axios({
                        loading:{
                            isShow:true,//是否显示loading遮罩层
                            target:'.container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
                        },
                        method: 'post',
                        url: this.API.addOrUpdateOrganization,
                        data: this.managementArchForm
                    }).then((res) => {
                        var resData = res.data;
                        if(resData.code === "1") {
                            this.$message({
                                message: resData.message,
                                type: 'success'
                            });
                            this.$emit("addback",false);
                        } else {
                            this.$message({
                                type: 'error',
                                message: resData.message
                            });
                        }
                    }).catch(function(err) {
                        console.log("连接错误" + err);
                    })
                })
            },
            //取消
            cancle() {
                this.$emit("addback", true);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        border: none;
        .footer {
            text-align: center;
            margin-top: 10px;
        }
    }
</style>
