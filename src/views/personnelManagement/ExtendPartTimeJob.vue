<template>
	<div class="part-con">
		<!--标题-->
		<div class="title">
			<div class="left">
				<el-button type="primary" @click="handleAdd">添加</el-button>
			</div>
		</div>
		<!--表格-->
		<el-table :data="PartTimeJobList" ref="table" :height="tableHeight" style="width: 100%" border>
			<el-table-column label="序号" align="center" width="80">
				<template slot-scope="scope">{{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
			</el-table-column>
			<el-table-column label="操作" fixed align="center" width='120'>
				<template slot-scope="scope">
					<el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="b0001" label="机构名称" show-overflow-tooltip width="700" align="center">
			</el-table-column>
			<el-table-column prop="b0002" label="机构编码 " show-overflow-tooltip width="200" align="center">
			</el-table-column>
			<el-table-column prop="sTypeName" label="机构类型" show-overflow-tooltip width="200" align="center">
			</el-table-column>
			<el-table-column prop="ismain" label="主要" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.ismain==false">否</span>
					<span v-else-if='scope.row.ismain==true'>是</span>
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
			<PartTimeJobAdd :selectDeceive="chioceObj" :addOrEdit="addOrEdit" @backCall="getAddBack"></PartTimeJobAdd>
		</el-dialog>
		<!--编辑弹出层-->
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import PartTimeJobAdd from './PartTimeJobAdd.vue';

	export default {
		name: 'ExtendPartTimeJob',
		props: ['selectObj'],
		components: {
			Pagination, //分页组件
			PartTimeJobAdd, //其他-兼职管理-添加
		},
		data() {
			return {
				PartTimeJobList: [], //其他类-兼职管理
				pageObj: { //分页
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				edit_add_personal: false, //添加
				chioceObj: {}, //选中
				addOrEdit: 'add', //判断添加还是修改
				isShow: false,
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
			this.getPartTimeJobList();
		},
		methods: {
			//分页组件回调方法
			PageTurning(page_obj) {
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getPartTimeJobList();
			},
			getPartTimeJobList() { //其他类-兼职管理
				this.$axios({
					method: 'get',
					url: this.API.findB01A01InformationPage,
					params: {
						a0100: this.selectObj.a0100,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize,
					}
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data;
						this.PartTimeJobList = resData.data.list;
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
				this.chioceObj = this.PartTimeJobList[index]
				if(this.chioceObj == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				} else {
					this.isShow = true
				}

			},
			Transfer_clickRow(row, column, event) { //调动信息-删除
				console.log(row, column, event)
			},
			/*
			 * 删除用户
			 */
			handleDelete(index, row) {
				let item = this.PartTimeJobList[index];
				let self = this;
				this.$confirm('确定要删除选中记录吗?', '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//self.delUser(item.id,self);//请求后台进行删除
					this.$axios({
						method: 'get',
						url: this.API.deleteB01A01,
						params: {
							'id': item.id,
						}
					}).then((res) => {

						if(res.data.code == "1") {
							console.log("删除" + res)
							this.getPartTimeJobList();
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
			},
			getAddBack(reFresh) {
				if(reFresh) {
					this.isShow = false;
					this.getPartTimeJobList();

				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.part-con {
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