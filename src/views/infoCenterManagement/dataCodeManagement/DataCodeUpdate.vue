<template>
    <div class="container">
        <el-form ref="dataCodeFormRef" :rules="rules" :model="dataCodeForm" label-width="150px">
            <el-row>
                <el-col :span="11">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="dataCodeForm.name" type="text" maxlength='30' placeholder="请输入名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="编码" prop="code">
                        <el-input v-model="dataCodeForm.code" type="text" maxlength='30' placeholder="请输入编码"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="系统内置" prop="uIssystem">
                        <el-radio-group v-model="dataCodeForm.uIssystem" @change="changeuIssystem">
                            <el-radio v-for="item in uIssystemList" :key="item.id" :label="item.id" :value="item.id">{{item.memo}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="dataCodeForm.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 7}" maxLength="200" placeholder="请输入备注(0~200个字符)"></el-input>
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
    export default {
        name: "DataCodeUpdate",    //添加修改数据代码
        props:[
            'currentRow',
            'isEdit'//true：编辑，false：添加
        ],
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
                    uIssystem: [{
                        required: true,
                        message: '请选择是否内置',
                        trigger: 'change'
                    }],
                    remark: [{
                        required: false,
                        message: '请输入备注',
                        trigger: 'change'
                    },
                        {
                            min: 0,
                            max: 100,
                            message: '备注在 0-100 个字符',
                            trigger: 'blur'
                        }
                    ]
                },
                dataCodeForm: {
                    id: "",
                    name: "", //名称
                    code: "", //编码
                    uIssystem: "", //是否内置
                    remark: "" //备注
                },
                //是否内置
                uIssystemList: [{
                    id: true,
                    memo: "是"
                },{
                    id: false,
                    memo: "否"
                }]
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
                this.dataCodeForm.name = this.currentRow.name;
                this.dataCodeForm.id = this.currentRow.id;
                this.dataCodeForm.code = this.currentRow.code;
                this.dataCodeForm.uIssystem = this.currentRow.uIssystem;
                this.dataCodeForm.remark = this.currentRow.remark;
            },
            /**
             * 是否内置点击改变
             */
            changeuIssystem(uIssystem) {
                this.dataCodeForm.uIssystem = uIssystem;
            },
            /**
             * 保存
             */
            onsubmit(){
                this.$refs['dataCodeFormRef'].validate((valid) => {
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
                        url: this.API.addDataCode,
                        data: {
                            'id': this.dataCodeForm.id,
                            'name': this.dataCodeForm.name,
                            'code': this.dataCodeForm.code,
                            'uIssystem': this.dataCodeForm.uIssystem,
                            'remark': this.dataCodeForm.remark
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
