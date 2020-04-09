<template>
    <div class="container">
        <el-form ref="dictionaryFormRef" :rules="rules" :model="dictionaryForm" label-width="150px">
            <el-row>
                <el-col :span="11">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="dictionaryForm.name" type="text" maxlength='30' placeholder="请输入名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="编码" prop="code">
                        <el-input v-model="dictionaryForm.code" type="text" maxlength='30' placeholder="请输入编码"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="所属菜单" prop="menuId">
                        <menu-tree-select v-model="dictionaryForm.menuId" :defaultOptions="dictionaryForm.menuId" @MenuTreeSelectCall="menuTreeSelectCall"></menu-tree-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="是否业务数据" prop="isBusiness">
                        <el-radio-group v-model="dictionaryForm.isBusiness" @change="changeuIssystem">
                            <el-radio v-for="item in isBusinessList" :key="item.id" :label="item.id" :value="item.id">{{item.memo}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="dictionaryForm.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 7}" maxLength="200" placeholder="请输入备注(0~200个字符)"></el-input>
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
    import MenuTreeSelect from '../../../components/MenuTreeSelect.vue';

    export default {
        name: "DataDictionaryUpdate",    //添加修改数据字典
        props:[
            'currentRow',
            'isEdit'//true：编辑，false：添加
        ],
        components: {
            MenuTreeSelect, //用户组下拉框
        },
        data(){
            return {
                //表单验证
                rules: {
                    name: [{
                        required: true,
                        message: '请输入名称',
                        trigger: 'change'
                    }],
                    code: [{
                        required: true,
                        message: '请输入编码',
                        trigger: 'change'
                    }],
                    menuId: [{
                        required: true,
                        message: '请选择菜单',
                        trigger: 'change'
                    }],
                    isBusiness: [{
                        required: true,
                        message: '请选择是否内置',
                        trigger: 'change'
                    }],
                    remark: [{
                        required: false,
                        message: '请输入备注',
                        trigger: 'change'
                    },{
                        min: 0,
                        max: 200,
                        message: '备注在 0-200 个字符',
                        trigger: 'change'
                    }]
                },
                dictionaryForm: {
                    id: "",
                    name: "", //名称
                    code: "", //编码
                    isBusiness: "", //是否是业务字典
                    menuId: "", //菜单id
                    remark: "" //备注
                },
                //是否内置
                isBusinessList: [{
                        id: true,
                        memo: "业务数据"
                    },{
                        id: false,
                        memo: "系统数据"
                    }
                ]
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
                    return;
                }
                this.dictionaryForm.name = this.currentRow.name;
                this.dictionaryForm.id = this.currentRow.id;
                this.dictionaryForm.code = this.currentRow.code;
                this.dictionaryForm.menuId = this.currentRow.menuid;
                this.dictionaryForm.isBusiness = this.currentRow.isbusiness;
                this.dictionaryForm.remark = this.currentRow.remark;
            },
            /**
             * 菜单选择
             */
            menuTreeSelectCall(returnObj){
                if(returnObj && returnObj.id){
                    this.dictionaryForm.menuId = returnObj.id;
                }
            },
            /**
             * 是否内置点击改变
             */
            changeuIssystem(uIssystem) {
                this.dictionaryForm.uIssystem = uIssystem;
            },
            /**
             * 保存
             */
            onsubmit(){
                this.$refs['dictionaryFormRef'].validate((valid) => {
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
                        url: this.API.addDictionary,
                        data: {
                            'id': this.dictionaryForm.id,
                            'name': this.dictionaryForm.name,
                            'code': this.dictionaryForm.code,
                            'menuid': this.dictionaryForm.menuId,
                            'isbusiness': this.dictionaryForm.isBusiness,
                            'remark': this.dictionaryForm.remark
                        }
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
        .footer {
            text-align: center;
            margin-top: 10px;
        }
    }
</style>
