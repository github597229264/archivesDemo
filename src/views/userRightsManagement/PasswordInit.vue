<template>
	<div class="passwordInit">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>用户权限管理</el-breadcrumb-item>
				<el-breadcrumb-item>密码初始化</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<el-form :inline="true" :model="searchForm" class="demo-form-inline">
				<el-form-item>
					<UserGroupTreeSelect v-model="searchForm.organizationIDS" :defaultOptions="searchForm.organizationIDS" @UserGroupTreeSelectCall = "UserGroupTreeSelectCall"></UserGroupTreeSelect>
				</el-form-item>
				<el-form-item>
					<el-input v-model="searchForm.cn" placeholder="输入姓名或账户"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="search" @click="search">查询</el-button>
				</el-form-item>
			</el-form>
			<el-row>
				<el-col :span="24">
					<el-table :data="tableData" id="passwordInit" border class="table" ref="multipleTable" height="400">
						</el-table-column>
						<el-table-column type="index" label="序号" align="center" width="50">
							<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
						</el-table-column>
						<el-table-column prop="cn" label="姓名" width="150" align="center"></el-table-column>
						<el-table-column prop="uid" label="账户" width="150" align="center"></el-table-column>
						<el-table-column prop="stationName" label="岗位" sortable min-width="130" align="center"></el-table-column>
						<el-table-column prop="roleNames" label="所属角色" min-width="130" align="center" show-overflow-tooltip></el-table-column>
						<el-table-column label="操作" width="120" align="center">
							<template slot-scope="scope">
								<el-button type="text" @click="initPassword(scope.$index, scope.row)">初始化密码</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="pagination">
						<Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
					</div>
				</el-col>
			</el-row>
	</div>
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import UserGroupTreeSelect from '../../components/UserGroupTreeSelect.vue';
	export default {
		name: 'PasswordInit', //密码初始化
		components: {
			Pagination, //分页组件
			UserGroupTreeSelect //用户组下拉框
		},
		data() {
			return {
				tableData: [], //列表数据
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				multipleSelection: [],
				searchForm: {
					cn: '', //用户名称或拼音
					organizationIDS:'',//用户组id
				}
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
			 * @params {Object} returnObj 返回的对象
			 */
        	UserGroupTreeSelectCall(returnObj){
        		if(returnObj){
        			this.searchForm.organizationIDS = returnObj.id;	
        		}else{
        			this.searchForm.organizationIDS = '';	
        		}
        	},
			/**
			 * 获取列表数据
			 */
			getData() {
				this.$axios({
               		loading:{
            			isShow:true,
            			target:'.passwordInit'
            		},
					method: 'post',
					url: this.API.findUserListPage,
					data: {
						cn: this.searchForm.cn,
						organizationIDS:this.searchForm.organizationIDS,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.tableData = resData.data.list;
						this.pageObj.total = resData.data.total;
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
			/*
			 * 密码初始化
			 */
			initPassword(index, row) {
				let self = this;
				this.$confirm('确定要对该用户进行密码初始化操作吗?', '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					self.initUserPassword(row.id, self); //请求后台进行删除
				}).catch(() => {

				});
			},
			/*
			 * 请求后台进行删除操作
			 * @id {String} 需要操作的数据id
			 * @self {Obj} this对象
			 */
			initUserPassword(id, self) {
				self.$axios({
               		loading:{
            			isShow:true,
            			target:'.passwordInit'
            		},
					method: 'get',
					url: self.API.initializationPassword,
					params: {
						id: id
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						
						self.$alert('<p style="font-size:16px;">密码初始化成功,请记录新密码：<strong style="color:#67C23A;font-weight:bold;font-size:20px;">'+resData.data+'</strong></p>', '操作提示', {
				          dangerouslyUseHTMLString: true,
				          confirmButtonText: '确定',
				          callback: action => {}
				        });
					} else {
						self.$message({
							type: 'error',
							message: '密码初始化失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					self.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	el-dialog {
		.del-dialog-cnt {
			font-size: 16px;
			text-align: center
		}
	}
	
	.passwordInit {
		width: 100%;
		font-size: 14px;
	}
	
	.gray {
		color: #dcdfe6;
	}
	
	.red {
		color: #ff0000;
	}
</style>