<template>
	<div class="inquiry-con">
		<!--标题-->
		<div class="title">
			<div class="left">
				<el-button type="primary" @click="handleAdd">添加</el-button>
				<el-button type="primary" @click="handleDelete">删除</el-button>

			</div>
		</div>
		<!--表格-->
		<el-table ref="table" :height="tableHeight" @selection-change="handleSelectionChange" border :data="InquiryRankList" style="width: 100%">
			<el-table-column type="selection" width="100" align="center">
			</el-table-column>
			<el-table-column label="操作" fixed align="center" width="150">
				<template slot-scope="scope">
					<el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="a0501a" label="职级" show-overflow-tooltip width="150" align="center">
			</el-table-column>
			<el-table-column prop="a0507a" label="批准机关 " show-overflow-tooltip width="150" align="center">
			</el-table-column>
			<el-table-column prop="a0511" label="批准文号" show-overflow-tooltip width="200" align="center">
			</el-table-column>
			<el-table-column prop="a0504" label="批准日期" show-overflow-tooltip width="150" align="center">
			</el-table-column>
			<el-table-column prop="a0517" label="终止日期" show-overflow-tooltip width="150" align="center">
			</el-table-column>
			<el-table-column prop="a0521" label="批准时所在单位及职务" show-overflow-tooltip width="300" align="center">
			</el-table-column>
			<el-table-column prop="a0524" label="现行标识" show-overflow-tooltip align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.a0524=='0'">非现行</span>
					<span v-else-if="scope.row.a0524=='1'">现行</span>
					<span v-else></span>
				</template>
			</el-table-column>

		</el-table>
		<!--分页-->
		<div class="material_page">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		</div>
		<!--新增弹出层-->
		<el-dialog :title="dialog_title" width="65%" height="350px" :visible.sync="isShow" v-if='isShow' append-to-body :close-on-click-modal="false">
			<InquiryRankAdd :selectDeceive="chioceObj" :addOrEdit="addOrEdit" @backCall="getAddBack"></InquiryRankAdd>
		</el-dialog>
		<!--编辑弹出层-->
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import InquiryRankAdd from './InquiryRankAdd.vue';

	export default {
		name: 'ExtendInquiryRank',
		props: ['selectObj'],
		components: {
			Pagination, //分页组件
			InquiryRankAdd, //扩充-职级变动-添加

		},
		data() {
			return {
				InquiryRankList: [], //扩充信息-查询职级信息列表
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
				tableHeight: "",
			}
		},
		mounted() {
			//this.$refs.table.$el.offsetTop + 10  ----table距最近的父元素顶部的高度
			//70   ---头部元素高度
			//52   ---分页元素高度
			this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52;
		},
		created() {
			this.getInquiryRankList();
		},
		methods: {
			//分页组件回调方法
			PageTurning(page_obj) {
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getInquiryRankList();
			},
			getInquiryRankList() { //扩充信息-查询职级信息列表
				this.$axios({
					method: 'get',
					url: this.API.findA05InformationPage,
					params: {
						a0100: this.selectObj.a0100,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize,
					}
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data;
						this.InquiryRankList = resData.data.list;
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
				this.chioceObj = this.InquiryRankList[index]
			},
			/*
			 * 删除用户
			 */
			handleSelectionChange(val) {
				let choiceId = "";
				for(let i = 0; i < val.length; i++) {
					let str = val[i].a0500 + ',';
					choiceId = str + choiceId;
				}
				this.selectedId = choiceId;

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
						this.$axios({
							method: 'get',
							url: this.API.deleteA05,
							params: {
								'a0500': this.selectedId,
							}
						}).then((res) => {
							if(res.data.code == "1") {
								this.getInquiryRankList();
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
					this.getInquiryRankList();

				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.inquiry-con {
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