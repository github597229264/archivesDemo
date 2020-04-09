<template>
    <div class="container">
        <el-form ref="archivesFormRef" :rules="rules" :model="archivesForm" label-width="150px">
            <el-row>
                <el-col :span="11">
                    <el-form-item label="编码" prop="code">
                        <el-input disabled v-model="archivesForm.code" type="text"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="编号" prop="codeno">
                        <el-input disabled v-model="archivesForm.codeno" type="text"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="archivesForm.name" maxLength="50" placeholder="请输入名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="排序码" prop="orderno">
                        <el-input disabled v-model="archivesForm.orderno"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="是否挂接目录" prop="ishitch">
                        <el-radio-group v-model="archivesForm.ishitch" @change="changeuIshitch">
                            <el-radio disabled v-for="item in ishitchList" :key="item.id" :label="item.id" :value="item.id">{{item.memo}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="具体描述" prop="describe">
                        <el-input v-model="archivesForm.describe" type="textarea" :autosize="{ minRows: 2, maxRows: 7}" maxLength="200" placeholder="请输入具体描述"></el-input>
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
        name: "ArchivesDataUpdate",    //修改档案分类
        props:[
            'currentRow'
        ],
        data(){
            return {
                //表单验证
                rules: {
                    name: [{
                        required: true,
                        message: '请输入名称',
                        trigger: 'change'
                    }]
                },
                archivesForm: {
                    id: "",
                    code: "", //编码
                    codeno: "", //编号
                    name: "", //名称
                    ishitch: "", //是否挂接目录
                    describe: "", //具体描述
                    orderno: "" //排序号
                },
                //是否挂接目录
                ishitchList: [{
                    id: true,
                    memo: "是"
                },{
                    id: false,
                    memo: "否"
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
                this.archivesForm.id = this.currentRow.id;
                this.archivesForm.code = this.currentRow.code;
                this.archivesForm.codeno = this.currentRow.codeno;
                this.archivesForm.name = this.currentRow.name;
                this.archivesForm.ishitch = this.currentRow.ishitch;
                this.archivesForm.describe = this.currentRow.describe;
                this.archivesForm.orderno = this.currentRow.orderno;
            },
            /**
             * 是否单项否决
             */
            changeuIshitch(ishitch) {
                this.archivesForm.ishitch = ishitch;
            },
            /**
             * 保存
             */
            onsubmit(){
                this.$refs['archivesFormRef'].validate((valid) => {
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
                        url: this.API.editArchivesData,
                        data: {
                            'id': this.archivesForm.id,
                            'code': this.archivesForm.code,
                            'codeno': this.archivesForm.codeno,
                            'name': this.archivesForm.name,
                            'ishitch': this.archivesForm.ishitch,
                            'describe': this.archivesForm.describe,
                            'orderno': this.archivesForm.orderno
                        }
                    }).then((res) => {
                        var resData = res.data;
                        if(resData.code === "1") {
                                this.$message({
                                    message: resData.message,
                                    type: 'success'
                                });
                                this.$emit("updateBack",false);
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
                this.$emit("updateBack", true);
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
