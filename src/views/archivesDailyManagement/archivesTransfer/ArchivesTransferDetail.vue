<template>
	<div class="archives-transfer-detail-container">
		<!--头部-->
		<el-form ref="receiveForm" :model="selectArchives" label-width="110px">
			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="经办人员：" prop="e01z717">
						<el-input v-model="selectArchives.e01z717" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="转递原因：" prop="e01z721">
						<el-input v-model="selectArchives.e01z721" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="转往单位名称：" prop="e01z704a">
						<el-input v-model="selectArchives.e01z704a" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="转递日期：" prop="e01z701">
						<el-input v-model="selectArchives.e01z701" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="转出正本数：" prop="e01z711">
						<el-input v-model="selectArchives.e01z711" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="转出副本数：" prop="e01z714">
						<el-input v-model="selectArchives.e01z714" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="备注：" prop="e01z731">
						<el-input type="textarea" readonly :autosize="{ minRows: 2, maxRows: 4}" v-model="selectArchives.e01z731"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!--表格-->
		<el-table empty-text="您还没有添加数据！" :data="pagerlList" border style="width: 100%;">
			<el-table-column label="序号" align="center" width="60">
				<template slot-scope="scope"> {{scope.$index+1}} </template>
			</el-table-column>
			<el-table-column prop="a0101" label="档案人员" style="width: 15%;" align="center">
			</el-table-column>
			<el-table-column prop="a0104" label="性别" align="center" width="80">
			</el-table-column>
			<el-table-column prop="e10040" label="现职单位及职务" show-overflow-tooltip style="width: 15%;" align="center">
			</el-table-column>
			<el-table-column prop="a0117" label="民族" align="center" width="80">
			</el-table-column>
			<el-table-column prop="a0107" label="出生年月" align="center" style="width: 15%;">
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
		props: ['selectArchives'],
		components: {
			pagination
		},
		data() {
			return {
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				pagerlList: [] //人员信息
			}
		},
		created() {
			this.findByE01Z700Id();
		},
		methods: {
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.findByE01Z700Id();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.findByE01Z700Id();
			},
			findByE01Z700Id() {
				console.log("=====");
				this.$axios({
					method: 'get',
					url: this.API.findByE01Z700Id,
					params: {
						'id': this.selectArchives.id,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.pagerlList = resData.data.list;
						this.pageObj.total = resData.data.total;
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
	.archives-transfer-detail-container {
		.receive_page {
			display: flex;
			justify-content: flex-end;
			margin: 10px 0;
		}
	}
</style>