<template>
    <div class="container">
        <el-form ref="checkStandardFormRef" :rules="rules" :model="checkStandardForm" label-width="150px">
            <el-row>
                <el-col :span="11">
                    <el-form-item label="评分分类" prop="archtype">
                        <el-select disabled v-model="checkStandardForm.archtype">
                            <el-option
                                v-for="item in archtypes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="是否单项否决" prop="isdictatorship">
                        <el-radio-group v-model="checkStandardForm.isdictatorship" @change="changeuIsdictatorship">
                            <el-radio disabled v-for="item in isdictatorshipList" :key="item.id" :label="item.id" :value="item.id">{{item.memo}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="评分项目及标准" prop="scoringitemsandstandards">
                        <el-input v-model="checkStandardForm.scoringitemsandstandards" type="textarea" :autosize="{ minRows: 2, maxRows: 7}" maxLength="500" placeholder="请输入评分标准"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="评分方法" prop="scoringmethod">
                        <el-input v-model="checkStandardForm.scoringmethod" type="textarea" :autosize="{ minRows: 2, maxRows: 7}" maxLength="200" placeholder="请输入评分方法"></el-input>
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
        name: "CheckStandardUpdate",    //修改档案审核标准
        props:[
            'currentRow',
            'isEdit'//true：编辑，false：添加
        ],
        data(){
            return {
                //表单验证
                rules: {
                    scoringitemsandstandards: [{
                        required: true,
                        message: '请输入名称',
                        trigger: 'change'
                    },{
                        min: 0,
                        max: 500,
                        message: '备注在 0-500 个字符',
                        trigger: 'change'
                    }],
                    scoringmethod: [{
                        required: true,
                        message: '请输入编码',
                        trigger: 'change'
                    },{
                        min: 0,
                        max: 200,
                        message: '备注在 0-200 个字符',
                        trigger: 'change'
                    }]
                },
                checkStandardForm: {
                    gradingstandardid: "",
                    archtype: "", //档案分类
                    isdictatorship: "", //是否单项否决
                    scoringitemsandstandards: "", //评分标准
                    scoringmethod: "", //评分方法
                },
                //是否单项否决
                isdictatorshipList: [{
                    id: true,
                    memo: "是"
                },{
                    id: false,
                    memo: "否"
                }],
                //档案类别
                archtypes: [{
                    value: this.API.constObj.fileTypeList2[0].id, //实体档案
                    label: '实体档案'
                },{
                    value: this.API.constObj.fileTypeList2[1].id, //电子档案
                    label: '电子档案'
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
                this.checkStandardForm.gradingstandardid = this.currentRow.gradingstandardid;
                this.checkStandardForm.archtype = this.currentRow.archtype;
                this.checkStandardForm.isdictatorship = this.currentRow.isdictatorship;
                this.checkStandardForm.scoringmethod = this.currentRow.scoringmethod;
                this.checkStandardForm.scoringitemsandstandards = this.currentRow.scoringitemsandstandards;
            },
            /**
             * 是否单项否决
             */
            changeuIsdictatorship(isdictatorship) {
                this.checkStandardForm.isdictatorship = isdictatorship;
            },
            /**
             * 保存
             */
            onsubmit(){
                this.$refs['checkStandardFormRef'].validate((valid) => {
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
                        url: this.API.addFileStandard,
                        data: {
                            'id': this.checkStandardForm.gradingstandardid,
                            'archtype': this.checkStandardForm.archtype,
                            'isdictatorship': this.checkStandardForm.isdictatorship,
                            'scoringmethod': this.checkStandardForm.scoringmethod,
                            'scoringitemsandstandards': this.checkStandardForm.scoringitemsandstandards,
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
