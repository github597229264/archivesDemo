<template>
	<div>
		<el-table :data="tableData" height="250" border style="width: 100%">
			<el-table-column label="序号" align="center" width="80">
				<template slot-scope="scope">{{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
			</el-table-column>
			<el-table-column prop="workFlowStage" label="流程阶段" width="220">
			</el-table-column>
			<el-table-column prop="applicant" label="申请人" width="220">
			</el-table-column>
			<el-table-column prop="approveDate" label="申请时间" width="220">
			</el-table-column>
			<el-table-column prop="describe" label="描述">
			</el-table-column>
		</el-table>
		<!--分页-->
		<div class="material_page">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		</div>
	</div>

</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	
	export default {
		name:'ArchivesDetailFlagList',
		props: ['selectDeceive', 'selectArchtypeId', 'selectFlagId'],
		components: {
			Pagination, //分页组件
		},
		data() {
			return {
				//activeName: '1', //菜单状态
				tableData: [], //档案申请、审核、授权列表
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
			}
		},
		mounted() {

		},
		created() {
			this.getdetailList();
		},
		methods: {
			//分页组件回调方法
			PageTurning(page_obj) {
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getdetailList();
			},
			getdetailList() { //档案申请、审核、授权列表
				this.$axios({
					method: 'get',
					url: this.API.getArchApplyInfo,
					params: {
						a0100: this.selectDeceive.a0100,
						archtype: this.selectArchtypeId,
						flag: this.selectFlagId,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize,
					}
				}).then((res) => {
					//console.log("档案申请、审核、授权列表" + res);
					if(res.data.code == "1") {
						let resData = res.data;
						this.tableData = resData.data.list;
						this.pageObj.total=resData.data.total;
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}

				}).catch(function(err) {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>