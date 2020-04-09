<template>
	<div class="applyFileDetail">
		<el-steps :active="activeStep" align-center process-status="finish">
			<el-step v-for="item in flowData" :title="item.name" :description="item.gw"></el-step>
		</el-steps>
		<el-form :model="chioceObj" ref="chioceObj" label-width="110px" class="demo-ruleForm" size="small">
			<el-row :gutter="15">
				<el-col :span="12">
					<el-form-item label="申请人">
						<el-input v-model="chioceObj.userName" placeholder="请输入申请人" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="查借阅理由">
						<el-input v-model="chioceObj.cyly" placeholder="请输入查借阅理由" readonly></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="查借开始时间">
						<el-date-picker readonly v-model="chioceObj.readingstarttime" type="date" placeholder="选择日期" format="yyyy-MM-dd HH:mm" class="autoForm">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="查借结束时间">
						<el-date-picker readonly v-model="chioceObj.readingendtime" type="date" placeholder="选择日期" format="yyyy-MM-dd HH:mm" class="autoForm">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="详细描述">
						<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" v-model="chioceObj.describe" readonly></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-table :data="tableData" border class="table" ref="multipleTable" @selection-change="handleSelectionChange" height="200px">
			<el-table-column type="index" label="序号" align="center" width="50">
				<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
			</el-table-column>
			<el-table-column prop="a0101" label="姓名" width="80" align="center"></el-table-column>
			<el-table-column prop="a0111a" label="籍贯" width="200" align="center" show-overflow-tooltip></el-table-column>
			<el-table-column prop="e10040" label="现职单位及职务" align="center" show-overflow-tooltip></el-table-column>
		</el-table>
		<div class="pagination">
			<Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
		</div>
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	export default {
		name: 'ApplyFileDetail', //申请的档案详细
		props: ['chioceObj'], //chioceObj选中的登记信息
		components: {
			Pagination //分页组件
		},
		data() {
			return {
				activeStep: 0,
				ledger: false, //是否从台账过来的
				tableData: [], //表格数据
				flowData: [], //流程数据
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				multipleSelection: [], //选中的数据
				searchForm: {
					departmentID: '', //机构ID
					nameAndPinyin: '' //拼音
				}
			}
		},
		created() {
			this.getData();
		},
		mounted() {},
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
			 * 职能机构树形下拉框组件回调方法--子组件回传数据的方法
			 * @param {String} val 选中项的值
			 */
			orgTreeSelectCall(val) {
				if(val) {
					this.searchForm.departmentID = val;
				} else {
					this.searchForm.departmentID = "";
				}
			},
			/*
			 * 获取详细按照id和档案类型 
			 */
			getData() {
				this.$axios({
                	loading:{
            			isShow:true,
            			target:'.applyFileDetail'
            		},
					method: 'get',
					url: this.API.details,
					params: {
						'id': this.chioceObj.id,
						'stype': this.commonFun.recognitionFileType(this.chioceObj.rstype),
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.tableData = resData.data.A01.list;
						this.flowData = resData.data.flow;
						this.flowData.push({
							"gw": "",
							"name": "完成"
						});
						this.activeStep = this.flowData.length;
						this.pageObj.total = resData.data.A01.total;
					} else {
						this.$message({
							type: 'error',
							message: '查询档案失败，请刷新重试！'
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
				if(this.ledger && chioceList.length > 1) { //从台账过来的只能选中一条数据
					this.$message({
						message: '请选择一条数据!',
						type: 'warning'
					});
					return;
				}
				//值传回给父组件
				this.$emit('GetChioceFiles', chioceList);
				this.$refs.multipleTable.clearSelection(); //清除所有选中项
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
	.applyFileDetail {
		width: 100%;
		.el-steps {
			margin-bottom: 20px;
		}
		.el-row {
			.el-col {
				.el-form-item {
					.autoForm {
						width: 100%;
					}
				}
			}
		}
	}
</style>