<!--台账中的处理材料-->
<template>
	<div class="legder-deal-container">
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
			<el-table-column prop="e01z227" label="形成时间" align="center">
			</el-table-column>
			<el-table-column prop="e01z124" label="份数" align="center">
			</el-table-column>
			<el-table-column prop="e01z224" label="页数" align="center">
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
		name: "LedgerDeal", //处理材料和归档材料
		data() {
			return {
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				pagerList: [] //处理数据
			}
		},
		created() {
			this.getPagerList();
			console.log("flagDeal" + this.flagDeal);
		},
		props: ['flagDeal', 'time'],
		methods: {
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.getPagerList();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getPagerList();
			},
			getPagerList() { //材料详情列表
				console.log("===");
				this.$axios({
					method: 'post',
					url: this.API.GetAllHandelandArchive,
					data: {
						'status': this.flagDeal, //1 处理  2 归档材料
						'startTime': this.time.startTime,
						'endTime': this.time.endTime,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.pagerList = resData.data.list;
						this.pageObj.total = resData.data.total;
					} else {
						this.$message({
							type: 'error',
							message: '查询列表失败，请刷新重试！'
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
	.legder-deal-container {
		.receive_page {
			display: flex;
			justify-content: flex-end;
			margin: 10px 0;
		}
	}
</style>