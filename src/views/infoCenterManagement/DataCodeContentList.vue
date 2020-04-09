<template>
    <div class="userManagement">
        <div class="container">
            <div class="title">
                <div class="left">
                    <el-button type="primary" @click="addDataCodeContent">添加</el-button>
                    <el-button type="primary" @click="editDataCodeContent">编辑</el-button>
                    <el-button type="danger" @click="delDataCodeContent">删除</el-button>
                </div>
                <div class="right">
                    <el-input v-model="searchForm.nameorcode" placeholder="输入代码名称或代码"></el-input>
                    <el-button type="primary" icon="search" @click="search">查询</el-button>
                </div>
            </div>
            <el-row>
                <el-table :data="tableData" border class="table" ref="multipleTable" height="350" @current-change="currentChange" highlight-current-row>
                    <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                    <el-table-column prop="code" label="编码" width="60"  align="center"></el-table-column>
                    <el-table-column prop="name" label="名称" width="150"  align="center"  show-overflow-tooltip></el-table-column>
                    <el-table-column prop="remark" label="备注" min-width="130" align="center"  show-overflow-tooltip></el-table-column>
                </el-table>
                <div class="pagination">
                    <Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
                </div>
                <!--新增、修改弹框-->
                <el-dialog :title="title"
                           width="60%"
                           :visible.sync="updateDataCodeConVisiable"
                           v-if='updateDataCodeConVisiable'
                           :close-on-click-modal="false">
                    <datacode-content-update :isEdit="isEdit" :currentRow="currentRow" :codeid="codeObject.id" @addback="addBack"></datacode-content-update>
                </el-dialog>
            </el-row>
        </div>
    </div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import datacodeContentUpdate from './dataCodeManagement/DataCodeContentUpdate'
//	import AddOrEditUsers from './AddOrEditUsers.vue';
    export default {
        name: 'DataCodeContentList',//数据代码内容管理
	    components:{
	    	Pagination, //分页组件
//	        ,AddOrEditUsers//用户新增或者编辑组件
            datacodeContentUpdate //新增修改数据代码项
	    },
        data() {
            return {
                tableData: [],//列表数据
                currentRow: {},//选中行数据
                codeObject: {},
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				searchForm: {
					nameorcode: '' //代码名称或代码
				},
                updateDataCodeConVisiable: false,    //添加、修改数据代码项弹框标识
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
			/*
			 * 分页导航
			 * @val {Number} 当前页下标
			 */
			handleCurrentChange(val) {
				this.pageObj.pageIndex = val;
				this.getData();
			},
			/*
			 * 分页组件回调方法--子组件回传数据的方法
			 * @page_obj {Object} 分页信息
			 * page_obj.page_index 当前页下标
			 * page_obj.page_size 页大小
			 */
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getData();
			},
            /**
             * 获取列表数据
             * @param {Object} chioceObj 选中对象
             */
            getData(chioceObj) {
            	if(chioceObj){
            		this.codeObject =chioceObj;	
            	}
                this.$axios({
                    loading:{
                        isShow:true,//是否显示loading遮罩层
                        target:'.table'//loading遮罩层 添加的dom选择器名称 如：.login or #center
                    },
            		method:'post',
                	url:this.API.getListsByCodeId, 
                	data:{
	                	id:this.codeObject.id,
						nameorcode: this.searchForm.nameorcode,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.tableData = resData.data.list;
                    	this.pageObj.total = resData.data.total;
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
            currentChange(currentRow, oldCurrentRow) {
                this.currentRow = currentRow;
            },
			/*
			 * 查询
			 */
			search() {
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.getData();
			},
            /**
             * 操作成功回调
             * flag 取消操作
             */
            addBack(flag){
                this.updateDataCodeConVisiable=false;
                //取消返回
                if (flag) { return; }
                this.getData();
            },
            /**
             * 添加
             */
            addDataCodeContent(){
                this.title = "添加数据代码项";
                this.isEdit = false;
                this.updateDataCodeConVisiable = true;
            },
            /**
             * 修改
             */
            editDataCodeContent(){
                if(this.currentRow === null || this.currentRow === "") {
                    this.$confirm('请选择一条数据！', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'warning',
                        center: true
                    });
                    return;
                }
                this.title = "编辑数据代码项";
                this.isEdit = true;
                this.updateDataCodeConVisiable = true;
            },
            /**
             * 删除数据代码
             */
            delDataCodeContent(){
                if(this.currentRow === null || this.currentRow === "") {
                    this.$confirm('请选择一条数据！', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'warning',
                        center: true
                    });
                    return;
                }
                this.$confirm('您确认删除这条数据吗？', '提示', {
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
                    url: this.API.deleteDataCodeContent,
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
    .userManagement{
        width: 100%;
        font-size: 14px;
        .container{
            margin: 0;
            border: none;
            border-right: solid 1px #E4E7ED;
        }
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
    .gray{
        color: #dcdfe6;
    }
    .red{
        color: #ff0000;
    }
</style>
