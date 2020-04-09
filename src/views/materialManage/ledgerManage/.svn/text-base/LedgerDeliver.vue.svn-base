<template>
	<div class="ledger-deliver-container">
		<!--表格-->
		<el-table class="material_table" :data="pagerList" border style="width: 100%;height: 100%;">
			<el-table-column label="序号" align="center" width="80">
				<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
			</el-table-column>
			<el-table-column prop="a0101" label="人员姓名" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="e01z211" label="材料类别" align="center">
			</el-table-column>
			<el-table-column prop="e01z211a" label="材料名称" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="e01z227" label="材料制成日期" align="center">
			</el-table-column>
			<el-table-column prop="e01z124" label="份数" align="center">
			</el-table-column>
			<el-table-column prop="e01z224" label="页数" align="center">
			</el-table-column>
			<el-table-column prop="selectTypeValue" label="材料来源" align="center">
			</el-table-column>
		</el-table>
		<!--分页-->
		<div class="receive_page">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		</div>
	</div>
</template>

<script>
	import pagination from '../../../components/Pagination.vue';
	export default {
		name: "LedgerDeliver", //转递材料和退回材料
		data() {
			return {
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				pagerList: [] //转递集合
			}
		},
		props: ['flagDeliver'],
		created() {
			this.getPagerList();
		},
		methods: {
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.getPagerList();
			},
			PageTurning(page_obj) { //分页组件回调方法
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getPagerList();
			},
			getPagerList() { //材料详情列表
				this.$axios({
					method: 'post',
					url: this.API.GetAllReturnOrTransferMaterialList,
					data: {
						'status': this.flagDeliver, //status 0与退回  1 转递
						'startTime': "",
						'endTime': "",
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.pagerList = resData.data.list;
						this.pageObj.total = resData.data.total;
					} else {
						this.$message({
							type: 'error',
							message: '查询数据失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			}
		},
		components: {
			pagination
		}
	}
</script>

<style lang="scss" scoped>
	.ledger-deliver-container {
		.receive_page {
			display: flex;
			justify-content: flex-end;
			margin: 10px 0;
		}
	}
</style>