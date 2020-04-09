<template>
	<div class="selectUser">
		<el-form :inline="true" :model="searchForm" class="demo-form-inline">
			<el-form-item>
				<el-button type="primary" icon="el-icon-check" @click="confirmChioce">确定</el-button>
			</el-form-item>
			<el-form-item>
				<UserGroupTreeSelect v-model="searchForm.userGroupId" :defaultOptions="searchForm.userGroupId" @UserGroupTreeSelectCall="UserGroupTreeSelectCall"></UserGroupTreeSelect>
			</el-form-item>
			<el-form-item>
				<el-input v-model="searchForm.nameAndPinyin" placeholder="输入姓名或拼音"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="search" @click="search">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange" height="250px">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column type="index" label="序号" align="center" width="50">
				<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
			</el-table-column>
			<el-table-column prop="cn" label="姓名" width="100" align="center"></el-table-column>
			<el-table-column prop="uid" label="账户" width="150" align="center" show-overflow-tooltip></el-table-column>
			<el-table-column prop="stationName" label="岗位" min-width="150" align="center" show-overflow-tooltip></el-table-column>
		</el-table>
		<div class="pagination">
			<Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
		</div>

	</div>
</template>

<script>
	import UserGroupTreeSelect from './UserGroupTreeSelect.vue';
	import Pagination from './Pagination.vue';
	export default {
		name: 'SelectUser', //用户列表(选择按照用户组筛选用户)
		props:['roleInfo'],//角色信息
		components: {
			UserGroupTreeSelect, //用户组下拉框
			Pagination //分页组件
		},
		data() {
			return {
				tableData: [], //表格数据
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				multipleSelection: [], //选中的数据
				searchForm: {
					userGroupId:'',//用户组id
					nameAndPinyin: '' //拼音
				}
			}
		},
		created() {

		},
		mounted() {
			this.getData();
		},
		computed: {

		},
		methods: {
			/*
			 * 分页组件回调方法--子组件回传数据的方法
			 * @page_obj {Object} 分页信息
			 * page_obj.page_index 当前页下标
			 * page_obj.page_size 页大小
			 */
			PageTurning(page_obj) {
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getData();
			},
			/*
			 * 用户组组件回调方法--子组件回传数据的方法
			 * @params {Object} returnObj 返回的对象
			 */
			UserGroupTreeSelectCall(returnObj) {
        		if(returnObj && returnObj.id){
        			this.searchForm.userGroupId = returnObj.id;	
        		}else{
        			this.searchForm.userGroupId = '';	
        		}
			},
			/*
			 * 获取未被分配用户分页数据 
			 */
			getData() {
				this.$axios({
					method: 'post',
					url: this.API.findUserListByRoleIdPage,
					data: {
						'id':this.roleInfo.id,//角色id
						'organizationIDS':this.searchForm.userGroupId,
						'cn': this.searchForm.nameAndPinyin,
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
							message: '查询用户列表失败，请刷新重试！'
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
			 * 确定选择的数据 
			 */
			confirmChioce() {
				var chioceList = this.multipleSelection;
				if(chioceList.length < 1) {
					this.$message({
						message: '请至少选中一条数据!',
						type: 'warning'
					});
					return;
				}
				//值传回给父组件
				this.$emit('SelectUserCall', chioceList);
				this.$refs.multipleTable.clearSelection();//清除所有选中项
			},
			/*
			 * 表格选中切换赋值 
			 */
			handleSelectionChange(val) {
				this.multipleSelection = val;
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.selectUser {
		width: 100%;
	}
</style>