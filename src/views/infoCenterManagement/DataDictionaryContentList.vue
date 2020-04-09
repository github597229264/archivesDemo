<template>
    <div class="dictionaryCon">
        <div class="container">
            <div class="title">
                <div class="left">
                    <el-button type="primary" @click="addDictionaryContent">添加</el-button>
                    <el-button type="primary" @click="editDictionaryContent">编辑</el-button>
                    <el-button type="danger" @click="delDictionaryContent">删除</el-button>
                </div>
            </div>
            <el-row>
                <el-table :data="tableData" border ref="multipleTable" height="400"
                          row-key="id" default-expand-all class="table"
                          highlight-current-row @current-change="currentChange">
                    <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                    <el-table-column prop="name" label="字典名称" width="140"  align="left" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="code" label="字典代码" width="100"  align="center"></el-table-column>
                    <el-table-column prop="remark" label="备注" min-width="130" align="center"  show-overflow-tooltip></el-table-column>
                </el-table>
            </el-row>
            <!--新增、修改弹框-->
            <el-dialog :title="title"
                       width="60%"
                       :visible.sync="updateDictionaryConVisiable"
                       v-if='updateDictionaryConVisiable'
                       :close-on-click-modal="false">
                <data-dictionary-content-update :isEdit="isEdit" :currentRow="currentRow" :syscodeid="dictionaryObject.id" @addback="addBack"></data-dictionary-content-update>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import DataDictionaryContentUpdate from './dataDictionaryManagement/DataDictionaryContentUpdate.vue'

    export default {
        name: 'DataDictionaryContentList',//数据字典内容管理
	    components:{
            DataDictionaryContentUpdate //新增修改数据字典项
	    },
        data() {
            return {
                tableData: [],//列表数据
                dictionaryObject:{},//数据字典对象
                currentRow: "",
                updateDictionaryConVisiable: false,    //添加、修改数据字典项弹框标识
                title:'',     //操作标题
                isEdit: ''//true：编辑，false：添加
            }
        },
        created() {
        },
        mounted(){

        },
        computed: {

        },
        methods: {
            /**
             * 获取列表数据
             * @param {Object} chioceObj 选中对象
             */
            getData(chioceObj) {
                if(chioceObj){
                    this.dictionaryObject =chioceObj;
                }
                this.$axios({
                    loading:{
                        isShow:true,//是否显示loading遮罩层
                        target:'.table'//loading遮罩层 添加的dom选择器名称 如：.login or #center
                    },
            		method:'get',
                	url:this.API.QueryBySysCodeId, 
                	params:{
	                	id:this.dictionaryObject.id
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code === "1"){
                        //树形结构
                    	this.tableData = this.commonFun.toTreeDataNormal(resData.data, {
                            childKey: "id",
                            fatherKey: "pid"
                        });
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '查询失败，请刷新重试！'
			          	});     
                    }
                }).catch((err) => {
                	this.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
            },
            /**
             * 切换选择单元格事件
             */
            currentChange(row) {
                this.currentRow = row;
            },
            /**
             * 操作成功回调
             * flag 是否刷新页面 true 不刷新
             */
            addBack(flag){
                this.updateDictionaryConVisiable = false;
                //取消返回
                if (flag) { return; }
                this.getData();
                this.$refs.multipleTable.setCurrentRow("");
            },
            /**
             * 添加
             */
            addDictionaryContent(){
                this.title = "添加数据字典项";
                this.isEdit = false;
                this.updateDictionaryConVisiable = true;
            },
            /**
             * 修改
             */
            editDictionaryContent(){
                if(this.currentRow === null || this.currentRow === "") {
                    this.$confirm('请选择一条数据！', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'warning',
                        center: true
                    });
                    return;
                }
                this.title = "编辑数据字典项";
                this.isEdit = true;
                this.updateDictionaryConVisiable = true;
            },
            /**
             * 删除数据代码
             */
            delDictionaryContent(){
                if(this.currentRow === null || this.currentRow === "") {
                    this.$confirm('请选择一条数据！', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'warning',
                        center: true
                    });
                    return;
                }
                this.$confirm('您确认删除这条数据吗？子项也会被删除', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delDataConfirm();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            delDataConfirm(){
                this.$axios({
                    loading:{
                        isShow:true,//是否显示loading遮罩层
                        target:'.container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
                    },
                    method: 'post',
                    url: this.API.deleteDictionaryContent,
                    data: {
                        'id': this.currentRow.id
                    }
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code === "1") {
                        this.$message({
                            message: resData.message,
                            type: 'success'
                        });
                        this.getData();
                    } else {
                        this.$message({
                            type: 'error',
                            message: resData.message
                        });
                    }
                }).catch(function(err) {
                    console.log("连接错误" + err);
                })
            }
        }
    }

</script>
<style  lang="scss" scoped>
    .dictionaryCon /deep/ .el-table__expand-icon{
        margin-right: 10px;
        float: left;
    }
    .table /deep/ .el-table__body-wrapper{
        overflow-y: auto;
    }
    .dictionaryCon{
        width: 100%;
        font-size: 14px;
            .container{
                border: none;
                border-right: solid 1px #E4E7ED;
            }
            .title {
                display: flex;
                justify-content: space-between;
                padding-bottom: 10px;
                .left {
                    display: flex;
                }
                .right {
                    display: flex;
                    .el-button {
                        margin-left: 10px;
                    }
                }
            }
        }

    .gray{
        color: #dcdfe6;
    }
    .red{
        color: #ff0000;
    }
</style>
