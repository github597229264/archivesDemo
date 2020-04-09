<template>
	<div class="archives-receive-detail-container">
		<!--头部-->
		<el-form ref="receiveForm" :model="selectDeceive" label-width="110px">
			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="来件单位：" prop="e01z507a">
						<el-input v-model="selectDeceive.e01z507a" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="来件人员：" prop="e01z314">
						<el-input v-model="selectDeceive.e01z314" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="接收类型：" prop="typevalue">
						<el-input v-model="selectDeceive.typevalue" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="机要号：" prop="confidentialno">
						<el-input v-model="selectDeceive.confidentialno" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="正本卷总数：" prop="e01z511">
						<el-input v-model="selectDeceive.e01z511" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="收件日期：" prop="e01z501">
						<el-input v-model="selectDeceive.e01z501" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="审核人：" prop="e01z521">
						<el-input v-model="selectDeceive.e01z521" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="审核日期：" prop="e01z524">
						<el-input v-model="selectDeceive.e01z524" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="备注：" prop="e01z544">
						<el-input type="textarea" readonly :autosize="{ minRows: 2, maxRows: 4}" v-model="selectDeceive.e01z544"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!--表格-->
		<el-table empty-text="您还没有添加数据！" :data="archivesList" border style="width: 100%;">
			<el-table-column label="序号" align="center" width="60">
				<template slot-scope="scope"> {{scope.$index+1}} </template>
			</el-table-column>
			<el-table-column prop="a0101" label="档案人员" show-overflow-tooltip style="width: 15%;" align="center">
			</el-table-column>
			<el-table-column prop="a0104" label="性别" align="center" width="80">
			</el-table-column>
			<el-table-column prop="e10040" label="现职单位及职务" show-overflow-tooltip style="width: 15%;" align="center">
			</el-table-column>
			<el-table-column prop="a0117" label="民族" show-overflow-tooltip align="center" width="80">
			</el-table-column>
			<el-table-column prop="a0107" label="出生年月" align="center" style="width: 15%;">
			</el-table-column>
			<el-table-column prop="e01z511" label="正本卷数" show-overflow-tooltip style="width: 15%;" align="center">
			</el-table-column>
			<el-table-column prop="valstatusvalue" label="数据状态" style="width: 15%;" align="center">
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
		data() {
			return {
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				archivesList: [] //人员信息
			}
		},
		props: ['selectDeceive'],
		components: {
			pagination
		},
		created() {
			this.findE01Z500ById();
		},
		methods: {
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.findE01Z500ById();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.findE01Z500ById();
			},
			findE01Z500ById() {
				this.$axios({
					method: 'get',
					url: this.API.findE01Z500ById,
					params: {
						'id': this.selectDeceive.id,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.archivesList = resData.data.list;
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
			}

		}
	}
</script>

<style lang="scss" scoped>
	.archives-receive-detail-container {
		.receive_page {
			display: flex;
			justify-content: flex-end;
			margin: 10px 0;
		}
	}
</style>