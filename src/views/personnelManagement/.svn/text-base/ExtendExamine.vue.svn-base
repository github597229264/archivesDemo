<template>
	<div class="examine-con">
		<!--标题-->
		<div class="title">
			<div class="left" >
				<el-button type="primary" @click="handleAdd">添加</el-button>
				<el-button type="warning" @click="handleDelete">删除</el-button>
				<!--<el-button type="primary" @click="handleLook">查看</el-button>-->
				<el-button type="primary" @click="handleExport">导出</el-button>
			</div>
		</div>
		<!--表格-->
		<el-table ref="table" :height="tableHeight" @selection-change="handleSelectionChange" @row-click='rowClick' border :data="ExamineList" style="width: 100%">
			<el-table-column type="selection" width="80" align="center">
			</el-table-column>
			<el-table-column label="操作" fixed align="center" width='100'>
				<template slot-scope="scope">
					<el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="text" @click="handleLook(scope.$index, scope.row)">查看</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="uCreatedate" label="登记日期" show-overflow-tooltip width="300" align="center">
			</el-table-column>
			<el-table-column prop="positionandworkincharge" show-overflow-tooltip label="从事或分管工作 " width="300" align="center">
			</el-table-column>
			<el-table-column prop="personalsummary" show-overflow-tooltip label="个人总结"align="center">
			</el-table-column>

		</el-table>
		<!--分页-->
		<div class="material_page">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		</div>
		<!--新增弹出层-->
		<el-dialog :title="dialog_title" width="90%" fullscreen height="350px" :visible.sync="isShow" v-if='isShow' append-to-body :close-on-click-modal=false>
			<ExamineAdd :selectDeceive="chioceObj" :addOrEdit="addOrEdit" @backCall="getAddBack"></ExamineAdd>
		</el-dialog>
		<!--编辑弹出层-->
		
		<!--导出Excel-->
		<el-dialog title="导出Excel" width="70%"  height="500px" :visible.sync="isExcelShow" v-if='isExcelShow' append-to-body :close-on-click-modal=false>
			<excelTable :selectDeceive="moreChioceObj" :selectExcelId='selectedId' :selectPageSize='selectPageSize' @backCall="getAddBack"></excelTable>
		</el-dialog>
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import ExamineAdd from './ExamineAdd.vue';
	import excelTable from './excelTable.vue';

	export default {
		name: 'ExtendExamine',
		props: ['selectObj'],
		components: {
			Pagination, //分页组件
			ExamineAdd, //其他-年度考核表-添加
			excelTable,//导出Excel
		},
		data() {
			return {
				ExamineList: [], //其他类-年度考核
				pageObj: { //分页
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				edit_add_personal: false, //添加
				chioceObj: {}, //选中
				addOrEdit: 'add', //判断添加还是修改
				isShow: false,
				selectedId: '', //多选
				dialog_title: '添加', //弹框标题
				tableHeight: "",//table高度
				rowData:{},//选中行
				isExcelShow:false,//导出是否显示
				moreSelectedArr:[],//多选数组集合
				moreChioceObj:[],
				selectPageSize:this.API.constObj.pageSize,//选择的页大小
			}
		},
		mounted() {
			//this.$refs.table.$el.offsetTop + 10  ----table距最近的父元素顶部的高度
			//70   ---头部元素高度
			//52   ---分页元素高度
			this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52;
		},
		created() {
			this.getExamineList();

		},
		methods: {
			rowClick(row, column, event){
				this.rowData=row;
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getExamineList();
			},
			getExamineList() { //其他类-年度考核表列表查询
				this.$axios({
					method: 'get',
					url: this.API.findAnnualAppraisalInformationPage,
					params: {
						a0100: this.selectObj.a0100,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize,
					}
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data;
						this.ExamineList = resData.data.list;
						this.pageObj.total = resData.data.total;
					} else {
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}

				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			handleAdd() { //添加调动信息
				this.isShow = true;
				this.chioceObj = this.selectObj;
				this.addOrEdit = 'add';
				this.dialog_title = '添加';
			},
			handleEdit(index, row) { //调动信息-编辑
				this.addOrEdit = 'edit';
				this.dialog_title = '编辑';
				this.isShow = true;
				this.chioceObj = this.ExamineList[index]
			},
			handleLook(index, row){//查看
				this.addOrEdit = 'look';
				this.dialog_title = '年度考核登记';
				this.isShow = true;
				this.chioceObj = this.ExamineList[index];
			},
			handleExport(){//导出
				let self = this;
				if(this.selectedId == '') {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				} else {
					this.isExcelShow = true;
					this.moreChioceObj = this.moreSelectedArr;
					this.selectPageSize = this.pageObj.pageSize;
				}
			},
			/*
			 * 删除用户
			 */
			handleSelectionChange(val) {
				let choiceId = "";
				for(let i = 0; i < val.length; i++) {
					let str = val[i].id + ',';
					choiceId = str + choiceId;
				}
				this.selectedId = choiceId;
				this.moreSelectedArr=val;
			},
			handleDelete() {
				let self = this;
				if(this.selectedId == '') {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				} else {
					this.$confirm('确定要删除选中记录吗?', '操作提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						//self.delUser(item.id,self);//请求后台进行删除
						self.$axios({
							method: 'get',
							url: self.API.deleteAnnualAppraisal,
							params: {
								'id': this.selectedId,
							}
						}).then((res) => {
							if(res.data.code == "1") {
								this.getExamineList();
							} else {
								this.$message({
									type: 'error',
									message: '获取失败，请刷新！'
								});
							}
						}).catch((err)=> {
							this.$message({
								type: 'error',
								message: '请求异常，请检查网络！'
							});
						})
					}).catch(() => {

					});
				}

			},
			getAddBack(reFresh) {
				if(reFresh) {
					this.isShow = false;
					this.getExamineList();

				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.examine-con {
		width: 100%;
		height: 100%;
		.title {
			margin-bottom: 10px;
		}
		.el-table {}
		.material_page {
			text-align: right;
			margin-top: 10px
		}
	}
</style>