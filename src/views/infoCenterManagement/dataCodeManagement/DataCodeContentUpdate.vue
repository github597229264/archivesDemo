<template>
    <div class="container">
        <el-form ref="dataCodeContentFormRef" :rules="rules" :model="dataCodeContentForm" label-width="150px">
            <el-row>
                <el-col :span="11">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="dataCodeContentForm.name" type="text" maxlength='30' placeholder="请输入名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="编码" prop="code">
                        <el-input v-model="dataCodeContentForm.code" type="text" maxlength='30' placeholder="请输入编码"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="dataCodeContentForm.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 7}" maxLength="200" placeholder="请输入备注(0~200个字符)"></el-input>
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
        name: "DataCodeContentUpdate",   //添加修改数据代码项
        props:[
            'currentRow',
            'codeid',
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
                    remark: [{
                        required: false,
                        message: '请输入备注',
                        trigger: 'change'
                    },{
                        min: 0,
                        max: 200,
                        message: '备注在 0-200 个字符',
                        trigger: 'blur'
                    }]
                },
                dataCodeContentForm: {
                    id: "",
                    name: "", //名称
                    codeId: this.codeid, //父级id
                    code: "", //编码
                    remark: "" //备注
                }
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
                this.dataCodeContentForm.name = this.currentRow.name;
                this.dataCodeContentForm.id = this.currentRow.id;
                this.dataCodeContentForm.code = this.currentRow.code;
                this.dataCodeContentForm.remark = this.currentRow.remark;
            },
            /**
             * 保存
             */
            onsubmit(){
                this.$refs['dataCodeContentFormRef'].validate((valid) => {
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
                        url: this.API.addDataCodeContent,
                        data: {
                            'id': this.dataCodeContentForm.id,
                            'name': this.dataCodeContentForm.name,
                            'code': this.dataCodeContentForm.code,
                            'codeid': this.dataCodeContentForm.codeId,
                            'remark': this.dataCodeContentForm.remark
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
