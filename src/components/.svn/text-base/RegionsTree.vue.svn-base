<template>
	<div class="table">
		<el-form :inline="true" :model="searchForm" class="demo-form-inline">
			<el-form-item>
				<el-input v-model="searchForm.nameAndPinyin" placeholder="输入姓名或拼音"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="search" @click="search">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" border class="table" highlight-current-row ref="singleTable"  @row-click="clickRow" height="250px">
			<el-table-column type="index" label="序号" align="center" width="50">
				<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
			</el-table-column>
			<el-table-column prop="code" label="代码" width="80" align="center"></el-table-column>
			<el-table-column prop="name" label="名称"  align="center" show-overflow-tooltip></el-table-column>
		</el-table>
		<div class="pagination">
			<Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
		</div>

	</div>
</template>

<script>
	import Pagination from './Pagination.vue';
	//import OrganizationTreeSelect from './OrganizationTreeSelect.vue';
	export default {
		name: 'BirthPlaceFileSelection', //档案选择
		props:['isledger'],
		components: {
			Pagination, //分页组件
			//OrganizationTreeSelect//职能机构树形下拉框
		},
		data() {
			return {
				ledger:false,//是否从台账过来的
				tableData: [], //表格数据
				pageObj: {
					pageIndex: 1, //当前页码
					total: 0, //数据总数
					pageSize: 10, //页大小
				},
				multipleSelection: "", //选中的数据
				searchForm: {
					departmentID: '', //机构ID
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
			// 分页导航
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
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getData();
			},
			/*
			 * 获取表格档案信息的数据 
			 */
			getData() {
				this.$axios({
					loading:{
            			isShow:false
            		},
					method: 'post',
					url: this.API.getSysCadreCodeDetailsPage,
					data: {
						code:this.API.constObj.CadreCodeDetailsPage[2].id,//政区
						name:this.searchForm.nameAndPinyin,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize
					}
				}).then((res) => {
					console.log(res);

					var resData = res.data;
					if(resData.code == "1") {
						this.tableData = resData.data.list;
						this.pageObj.total = resData.data.total;
					} else {
						this.$message({
							type: 'error',
							message: '查询政区失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("政区列表=" + err);
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
				this.getData();
			},
			clickRow(row){
				this.$emit('GetChioceFiles', row);
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.table {
		width: 100%;
	}
</style>