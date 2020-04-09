<!--批量材料处理-添加-->
<template>
	<div class="material-batch-add">
		<el-form ref="materialForm" :rules="rules" :model="materialForm" label-width="110px">
			<el-row :gutter="24">
				<el-col :span="24">
					<el-form-item label="名册名称：">
						<el-input v-model="title"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="简要说明：">
						<el-input type="textarea" v-model="comments"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-table :data="conditionList" highlight-current-row height="180px" border style="width: 100%">
			<el-table-column prop="fieldname" label="字段名称" align="center" ></el-table-column>
			<el-table-column prop="operation" label="条件" align="center" ></el-table-column>
			<el-table-column prop="text" label="值显示内容" show-overflow-tooltip align="center" ></el-table-column>
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
		name: "MaterialBatchAdd", //材料批量接收 添加，编辑
		components: {
			pagination
		},
		props: ['selectDeceive'],
		data() {
			return {
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				conditionList: {
//					fieldname: '', //字段名称
//					value: '', //值显示内容
//					operation: "", //条件
				},
				title:'',//名册名称
				comments:'',//简要说明
			}
		},
		created() {
			this.getConditionList();
		},
		
		methods: {
			getConditionList() {
				this.$axios({
					method: 'get',
					url: this.API.getRosterConditionById,
					params: {
						'rosterid': this.selectDeceive.id
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.pageObj.total = resData.data.total;
						this.conditionList=resData.data.list;
						this.title=resData.data.list[0].title;
						this.comments=resData.data.list[0].comments;
					} else {
						this.$message({
							type: 'error',
							message: '获取数据失败，请刷新重试！'
						});
					}
				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
		},
		

	}
</script>

<style lang="scss">
	.material-batch-add {
		padding: 10px;
		h3 {
			font-size: 16px;
			color: #fff;
			background-color: #369FDD;
			line-height: 38px;
			text-indent: 1em;
		}
		.add {
			margin: 10px 0 10px 10px;
		}
		.el-table {
			margin-top: 10px;
		}
		.el-table__body tr.current-row>td {
			        background: #DCEBFA !important;
			        color:#606266;
			}
		.dialog-footer {
			padding-top: 15px;
			text-align: center;
		}
		.material_page {
			/*margin-top: 10px;*/
			text-align: right;
		}
	}
</style>