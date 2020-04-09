<template>
	<div class="material-deliver-add">
		<!--转递材料详细信息内容-->
		<el-form ref="materialForm" :model="materialForm" label-width="110px">
			<el-row :gutter="24">
				<el-col :span="11">
					<el-form-item label="转往单位名称：" prop="e01z4103a">
						<el-input v-model="materialForm.e01z4103a" :readonly="readonly"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="转递方式：" prop="transferouttypeValue">
						<el-input v-model="materialForm.transferouttypeValue" :readonly="readonly"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="转出日期：" prop="e01z4104">
						<el-date-picker v-model="materialForm.e01z4104" :readonly="readonly" type="date" placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="经办人员：" prop="e01z4113">
						<el-input v-model="materialForm.e01z4113" :readonly="readonly"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="转递类型：" prop="modelValue">
						<el-input v-model="materialForm.modelValue" :readonly="readonly"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="机要号：" prop="confidentialno">
						<el-input v-model="materialForm.confidentialno" :readonly="readonly"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="备注：" prop="e01z4114">
						<el-input type="textarea" :readonly="readonly" :autosize="{ minRows: 2, maxRows: 4}" v-model="materialForm.e01z4114"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!--转递材料人员table-->
		<el-table class="material_table" :data="pagerList" border style="width: 100%;height: 100%;" ref="personTable">
			<el-table-column label="序号" align="center" width="80px">
				<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
			</el-table-column>
			<el-table-column prop="a0101" label="人员姓名" align="center">
			</el-table-column>
			<el-table-column prop="e01z211" label="材料类别" align="center">
			</el-table-column>
			<el-table-column prop="e01z211a" label="材料名称" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="e01z227" label="材料制成日期" align="center">
			</el-table-column>
			<el-table-column prop="e01z124" label="分数" align="center">
			</el-table-column>
			<el-table-column prop="e01z224" label="页数" align="center">
			</el-table-column>
			<el-table-column prop="selecttypeValue" label="材料来源" align="center">
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
		name: "MaterialDeliverDetail", //材料转递 详情
		data() {
			return {
				readonly: false,
				materialForm: {
					e01z4103a: '', //转往单位
					transferouttype: '', //转递方式
					e01z4104: "", //转出日期
					e01z4113: 1, //经办人员
					mode: "", //转递类型
					confidentialno: "", //来件人员
					e01z4114: "" //备注
				},
				pagerList: [],
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
			}
		},
		created() {
			console.log("this.selectMaterial" + this.selectMaterial);
			this.materialForm = this.selectMaterial;
			if(this.selectMaterial != "") {
				this.readonly = true;
			}
			this.findE01Z41sById();
		},
		methods: {
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.findE01Z41sById();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.findE01Z41sById();
			},
			findE01Z41sById() {
				this.$axios({
					method: 'get',
					url: this.API.findE01Z41sById,
					params: {
						'id': this.materialForm.id,
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
			}
		},
		props: ['selectMaterial'],
		components: {
			pagination
		}
	}
</script>

<style lang="scss" scoped>
	.material_page {
		margin: 10px 0;
		text-align: right;
	}
</style>