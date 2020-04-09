<!--散材料信息库-->
<template>
	<div class="deliver-pager-container">
		<!--标题条-->
		<div class="title">
			<div class="left">
				<el-input v-model="a0101" placeholder="请输入姓名" clearable></el-input>
				<el-button type="primary" @click="search">检索</el-button>
			</div>
			<div class="right">
				<el-button type="primary" @click="confirm">确定</el-button>
				<el-button type="primary" @click="cancle">关闭</el-button>
			</div>
		</div>
		<!--表格，数据展示-->
		<el-table class="material_table" ref="multipleTable" :data="pagerList" border style="width: 100%;" @selection-change="handleSelectionChange" height="300px">
			<el-table-column type="selection" width="55" align="center">
			</el-table-column>
			<el-table-column prop="a0101" label="档案人员姓名" align="center" show-overflow-tooltip width="130px">
			</el-table-column>
			<el-table-column prop="e01z211" label="材料类别" align="center">
			</el-table-column>
			<el-table-column prop="e01z211a" label="材料名称" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="e01z211b" label="材料编号" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="e01z227" label="接收时间" align="center">
			</el-table-column>
			<el-table-column prop="a0101" label="接收人" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="sourceType" label="来源类别" align="center">
			</el-table-column>
			<el-table-column prop="e01z237" label="材料处理状态" align="center" width="110px">
			</el-table-column>
			<el-table-column prop="valStatus" label="数据状态" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="e01z231" label="备注" align="center" show-overflow-tooltip>
			</el-table-column>
		</el-table>
		<!--分页-->
		<div class="material_page">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		</div>
	</div>
</template>

<script>
	import pagination from '../../../components/Pagination.vue';
	export default {
		name: "PagerList", //材料转递添加 散材料信息库
		data() {
			return {
				a0101: "", //人员姓名
				pagerList: [], //材料信息库中人员集合
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				multipleSelection: [], //选中的集合
			}
		},
		created() {
			this.queryAll();
		},
		methods: {
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.queryAll();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.queryAll();
			},
			queryAll() { //材料传递添加中 材料信息库中人员集合
				this.$axios({
					method: 'post',
					url: this.API.queryBulkMaterialInfo,
					data: {
						'a0101': this.a0101,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.pagerList = resData.data.list;
						this.pageObj.total = resData.data.total;
						console.log(this.pageObj.total);
					} else {
						this.$message({
							type: 'error',
							message: '获取数据失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			},
			search() { //检索
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.queryAll();
			},
			toggleSelection(rows) {
				if(rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			confirm() { //确认
				console.log("====");
				var chioceList = this.multipleSelection;
				if(chioceList.length < 1) {
					this.$message({
						message: '没有选中人员!',
						type: 'warning'
					});
					return;
				}
				let chioceObj = { //区分是否来自散材料信息库isPager true:是 false：不是
					"isPager": true,
					"data": chioceList
				}
				this.$emit("GetChiocePagers", chioceObj);
			},
			cancle() { //取消
				this.$emit("GetChiocePagers", "");
			}
		},
		components: {
			pagination
		}
	}
</script>

<style lang="scss" scoped>
	.deliver-pager-container {
		.title {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;
			.left {
				display: flex;
				.el-input {
					margin-right: 10px;
				}
			}
		}
		.material_table {
			overflow-y: auto;
			height: 300px;
		}
		.material_page {
			margin: 10px 0;
			text-align: right;
		}
	}
</style>