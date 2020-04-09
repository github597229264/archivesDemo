<template>
	<div class="education-con">
		<!--标题-->
		<div class="title">
			<div class="left">
				<el-button type="primary" @click="handleAdd">添加</el-button>
				<el-button type="primary" @click="handleDelete">删除</el-button>

			</div>
		</div>
		<!--表格-->
		<el-table :height="tableHeight" ref="table" @selection-change="handleSelectionChange" border :data="EducationList" style="width: 100%">
			<el-table-column type="selection" width="100" align="center">
			</el-table-column>
			<el-table-column label="操作" fixed align="center">
				<template slot-scope="scope">
					<el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="a0801a" show-overflow-tooltip label="学历名称" width="100" align="center">
			</el-table-column>
			<el-table-column prop="jylb" label="教育类别 " show-overflow-tooltip width="100" align="center">
			</el-table-column>
			<el-table-column prop="a0804" label="入学日期" show-overflow-tooltip width="150" align="center">
			</el-table-column>
			<el-table-column prop="a0807" label="毕业日期" show-overflow-tooltip width="150" align="center">
			</el-table-column>
			<el-table-column prop="xzmc" label="学制" show-overflow-tooltip  align="center">
			</el-table-column>
			<el-table-column prop="a0814" label="学校(单位)名称" show-overflow-tooltip width="150" align="center">
			</el-table-column>
			<el-table-column prop="zymc" label="专业名称" show-overflow-tooltip width="150" align="center">
			</el-table-column>
			<el-table-column prop="zylb" label="专业类别" show-overflow-tooltip width="150" align="center">
			</el-table-column>
			<el-table-column prop="wcqk" label="学习完成情况" show-overflow-tooltip width="150" align="center">
			</el-table-column>
			<el-table-column prop="a0834" label="最高学历标识" width="100" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.a0834=='0'">否</span>
					<span v-else-if="scope.row.a0834=='1'">是</span>
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
			<EducationAdd :selectDeceive="chioceObj" :addOrEdit="addOrEdit" @backCall="getAddBack"></EducationAdd>
		</el-dialog>
		<!--编辑弹出层-->
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import EducationAdd from './EducationAdd.vue';

	export default {
		name:'ExtendEducation',
		props: ['selectObj'],
		components: {
			Pagination, //分页组件
			EducationAdd, //扩充-学历信息-添加

		},

		data() {
			return {
				EducationList: [], //扩充信息-学历
				pageObj: { //分页
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				chioceObj: {}, //选中
				addOrEdit: 'add', //判断添加还是修改
				isShow: false,
				selectedId: '', //多选
				dialog_title:'添加',//弹框标题
				tableHeight:'',
			}
		},
		mounted() {
			//this.$refs.table.$el.offsetTop + 10  ----table距最近的父元素顶部的高度
			//70   ---头部元素高度
			//52   ---分页元素高度
			this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52;
		},
		created() {
			this.getEducationList();

		},
		methods: {
			//分页组件回调方法
			PageTurning(page_obj) {
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getEducationList();
			},
			getEducationList() { //扩充信息-学历信息查询列表页
				this.$axios({
					method: 'get',
					url: this.API.findA08InformationPage,
					params: {
						a0100: this.selectObj.a0100,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize,
					}
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data;
						this.EducationList = resData.data.list;
						this.pageObj.total = resData.data.total;
					}else{
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
				this.dialog_title='添加';
			},
			handleEdit(index, row) { //调动信息-编辑
				this.addOrEdit = 'edit';
				this.dialog_title='编辑';
				if(this.chioceObj == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				} else {
					this.isShow = true;
					this.chioceObj = this.EducationList[index]

				}

			},
			/*
			 * 删除用户
			 */
			handleSelectionChange(val) {
					let choiceId = "";
					for(let i = 0; i < val.length; i++) {
						let str = val[i].a0800 + ',';
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
						self.$axios({
							method: 'get',
							url: self.API.deleteA08,
							params: {
								'a0800': this.selectedId,
							}
						}).then((res) => {

							if(res.data.code == "1") {
								this.getEducationList();
							}else{
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
					this.getEducationList();
					this.isShow = false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.education-con{
		width:100%;
		height:100%;
		.title{
			margin-bottom: 10px;
		}
		.el-table{
			
		}
		.material_page{
			text-align: right;
			margin-top:10px
		}
	}
</style>