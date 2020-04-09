<template>
	<div class="dataDictionaryList">
		<div class="container">
            <div class="title">
                <div class="left">
                    <el-button type="primary" @click="addDictionary">添加</el-button>
                    <el-button type="primary" @click="editDictionary">编辑</el-button>
                    <el-button type="danger" @click="delDictionary">删除</el-button>
                </div>
                <div class="right">
                    <MenuTreeSelect v-model="searchForm.menuId" defaultOptions="" @MenuTreeSelectCall="menuTreeSelectCall"></MenuTreeSelect>
                    <el-input style="width:180px;margin-left:20px" v-model="searchForm.nameorcode" placeholder="输入字典名称或代码"></el-input>
                    <el-button type="primary" icon="search" @click="search">查询</el-button>
                </div>
            </div>
			<el-row>
				<el-col :span="24">
					<el-table :data="tableData" border class="table" ref="singleTable" height="350" highlight-current-row  @current-change="currentChange">
						<el-table-column type="index" label="序号" align="center" width="50">
							<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
						</el-table-column>
						<el-table-column prop="name" label="名称" width="130" align="center"  show-overflow-tooltip></el-table-column>
						<el-table-column prop="code" label="字典代码" width="80" align="center"></el-table-column>
						<el-table-column prop="menuname" label="所属菜单" sortable min-width="130" align="center"  show-overflow-tooltip></el-table-column>
						<el-table-column prop="Business" label="数据类型" sortable width="100" align="center"></el-table-column>
						<el-table-column prop="remark" label="备注" min-width="130" align="center" show-overflow-tooltip></el-table-column>
					</el-table>
					<div class="pagination">
						<Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
					</div>
                    <!--新增、修改弹框-->
                    <el-dialog :title="title"
                               width="60%"
                               :visible.sync="updateDictionaryVisiable"
                               v-if='updateDictionaryVisiable'
                               :close-on-click-modal="false">
                        <data-dictionary-update :isEdit="isEdit" :currentRow="currentRow" @addback="addBack"></data-dictionary-update>
                    </el-dialog>
				</el-col>
			</el-row>
	    </div>
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import MenuTreeSelect from '../../components/MenuTreeSelect.vue';
	import DataDictionaryUpdate from './dataDictionaryManagement/DataDictionaryUpdate.vue'

	export default {
		name: 'DataDictionaryList', //数据字典列表
		components: {
			Pagination, //分页组件
			MenuTreeSelect, //用户组下拉框
            DataDictionaryUpdate //数据字典新增修改
		},
		data() {
			return {
				tableData: [], //列表数据
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				currentRow: {},//选中行数据
				searchForm: {
					nameorcode: '', //字典名称或代码
					menuId:'',//菜单id
				},
                updateDictionaryVisiable: false,    //添加、修改数据代码弹框标识
                title:'',     //操作标题
                isEdit: ''//true：编辑，false：添加
			}
		},
		created() {},
		mounted() {
			this.getData();
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
			/*
			 * 分页组件回调方法--子组件回传数据的方法
			 * @params {Object} returnObj 选中数据对象
			 */
            menuTreeSelectCall(returnObj){
        		if(returnObj && returnObj.id){
        			this.searchForm.menuId = returnObj.id;	
        		}else{
        			this.searchForm.menuId = '';
        		}
        	 	
        	},
			/**
			 * 获取列表数据
			 */
			getData() {
				this.$axios({
                    loading:{
                        isShow:true,//是否显示loading遮罩层
                        target:'.table'//loading遮罩层 添加的dom选择器名称 如：.login or #center
                    },
					method: 'post',
					url: this.API.queryByPageLists,
					data: {
						menuid:this.searchForm.menuId,
						nameorcode: this.searchForm.nameorcode,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.tableData = resData.data.list;
						this.pageObj.total = resData.data.total;
						let returnObject = this.tableData[0];
						if(this.tableData.length > 0){
							this.$refs.singleTable.setCurrentRow(returnObject);
						}else{
							returnObject = {};
						}
					} else {
						this.$message({
							type: 'error',
							message: '获取用户列表失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			/*
			 * 查询
			 */
			search() {
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.getData();
			},
			/**
			 * 切换选择单元格事件
			 */
			currentChange(currentRow, oldCurrentRow) {
        		this.currentRow = currentRow;
        		this.$emit("DataDictionaryListCall",currentRow);
      		},
            /**
             * 操作成功回调
             * flag true 不刷新页面
             */
            addBack(flag){
                this.updateDictionaryVisiable = false;
                //取消返回
                if (flag) { return; }
                this.getData();
            },
            /**
             * 添加
             */
            addDictionary(){
                this.title = "添加数据字典";
                this.isEdit = false;
                this.updateDictionaryVisiable = true;
            },
            /**
             * 修改
             */
            editDictionary(){
                if(this.currentRow === null || this.currentRow === "") {
                    this.$confirm('请选择一条数据！', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'warning',
                        center: true
                    });
                    return;
                }
                this.title = "编辑数据字典";
                this.isEdit = true;
                this.updateDictionaryVisiable = true;
            },
            /**
             * 删除数据代码
             */
            delDictionary(){
                if(this.currentRow === null || this.currentRow === "") {
                    this.$confirm('请选择一条数据！', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'warning',
                        center: true
                    });
                    return;
                }
                if(!this.currentRow.isbusiness) {
                    this.$confirm('系统数据不能删除！', '提示', {
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
                    url: this.API.deleteDictionary,
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
            }		}
	}
</script>
<style lang="scss" scoped>
	.dataDictionaryList {
		width: 100%;
		font-size: 14px;
        .container{
            border: none;
            border-right: solid 1px #E4E7ED;
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
    }
	.gray {
		color: #dcdfe6;
	}
	
	.red {
		color: #ff0000;
	}
</style>
