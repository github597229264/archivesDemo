<template>
	<div class="userRole">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>用户权限管理</el-breadcrumb-item>
				<el-breadcrumb-item>用户角色</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<el-form :inline="true" :model="searchForm" class="demo-form-inline">
				<el-form-item>
					<UserGroupTreeSelect v-model="searchForm.organizationIDS" :defaultOptions="searchForm.organizationIDS" @UserGroupTreeSelectCall="UserGroupTreeSelectCall"></UserGroupTreeSelect>
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
					<el-table id="userRoleTable" :data="tableData" border class="table" ref="multipleTable" height="400">
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
								<el-button type="text" @click="showRoleDialog(scope.$index, scope.row)">设置角色</el-button>
							</template>
						</el-table-column>
					</el-table>
					<div class="pagination">
						<Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
					</div>
				</el-col>
			</el-row>
		</div>
        <!--设置用户角色弹出框 -->
       	<el-dialog class="outDialog" title='设置用户角色' :visible.sync="setRolesVisible" width="43%" append-to-body v-if="setRolesVisible"  :close-on-click-modal="false">
       		<SetUserRole :chioceUserId="userObj.id" @SetUserRoleCallBack="SetUserRoleCallBack"></SetUserRole>
       	</el-dialog>
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import UserGroupTreeSelect from '../../components/UserGroupTreeSelect.vue';
	import SetUserRole from './SetUserRole.vue';
	export default {
		name: 'UserRole', //用户角色
		components: {
			Pagination, //分页组件
			UserGroupTreeSelect, //用户组下拉框
			SetUserRole//设置用户角色
		},
		data() {
			return {
				tableData: [], //列表数据
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				setRolesVisible:false,//设置用户角色弹框是否显示
				userObj: {},//需要重新设置角色的用户对象
				searchForm: {
					cn: '', //用户名称或拼音
					organizationIDS: '', //用户组id
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
			 * 用户组组件回调方法--子组件回传数据的方法
			 * @params {Object} returnObj 返回的对象
			 */
			UserGroupTreeSelectCall(returnObj) {
        		if(returnObj){
        			this.searchForm.organizationIDS = returnObj.id;	
        		}else{
        			this.searchForm.organizationIDS = '';	
        		}
			},
			/*
			 * 设置用户角色组件回调方法--子组件回传数据的方法
			 * @params {Boolean} isRefresh 是否刷新列表
			 */
			SetUserRoleCallBack(isRefresh) {
				this.setRolesVisible = false;
				if(isRefresh){
					this.getData();
				}
			},
			/**
			 * 获取列表数据
			 */
			getData() {
				this.$axios({
               		loading:{
            			isShow:true,
            			target:'.userRole'
            		},
					method: 'post',
					url: this.API.findUserListPage,
					data: {
						'organizationIDS':this.searchForm.organizationIDS,
						'cn': this.searchForm.cn,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
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
			 * 显示设置角色弹框
			 * @param {Number} index 当前数据下标 
			 * @param {Object} row 选中的数据
			 */
			showRoleDialog(index, row) {
				this.userObj = this.tableData[index];
				this.setRolesVisible = true;
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
	
	.userRole {
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