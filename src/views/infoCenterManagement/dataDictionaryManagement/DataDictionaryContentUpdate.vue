<template>
    <div class="container">
        <el-form ref="dictionaryContentFormRef" :rules="rules" :model="dictionaryContentForm" label-width="150px">
            <el-row>
                <el-col :span="11">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="dictionaryContentForm.name" type="text" maxlength='30' placeholder="请输入名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="编码" prop="code">
                        <el-input v-model="dictionaryContentForm.code" type="text" maxlength='30' placeholder="请输入编码"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="上级字典项节点" prop="pid">
                        <dictionary-destail-tree-select
                            :defaultOptions="dictionaryContentForm.pid"
                            :syscodeid="syscodeid"
                            @TreeSelectCall="treeSelectCall">
                        </dictionary-destail-tree-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="dictionaryContentForm.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 7}" maxLength="200" placeholder="请输入备注(0~200个字符)"></el-input>
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
    import DictionaryDestailTreeSelect from '../../../components/DictionaryDestailTreeSelect.vue';

    export default {
        name: "DataDictionaryUpdate",    //添加修改数据字典
        props:[
            'currentRow',
            'syscodeid',
            'isEdit'//true：编辑，false：添加
        ],
        components: {
            DictionaryDestailTreeSelect, //用户组下拉框
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
                    pid: [{
                        required: false,
                        message: '请父级节点',
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
                dictionaryContentForm: {
                    id: "",
                    name: "", //名称
                    code: "", //编码
                    pid: "", //菜单id
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
                this.dictionaryContentForm.name = this.currentRow.name;
                this.dictionaryContentForm.id = this.currentRow.id;
                this.dictionaryContentForm.code = this.currentRow.code;
                this.dictionaryContentForm.pid = this.currentRow.pid;
                this.dictionaryContentForm.remark = this.currentRow.remark;
            },
            /**
             * 菜单选择
             */
            treeSelectCall(returnObj){
                if(returnObj && returnObj.id){
                    this.dictionaryContentForm.pid = returnObj.id;
                }
            },
            /**
             * 保存
             */
            onsubmit(){
                this.$refs['dictionaryContentFormRef'].validate((valid) => {
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
                        url: this.API.addDictionaryContent,
                        data: {
                            'id': this.dictionaryContentForm.id,
                            'name': this.dictionaryContentForm.name,
                            'syscodeid': this.syscodeid,
                            'code': this.dictionaryContentForm.code,
                            'pid': this.dictionaryContentForm.pid,
                            'remark': this.dictionaryContentForm.remark
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
