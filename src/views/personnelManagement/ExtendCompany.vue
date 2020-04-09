<template>
	<div class="company-con">
		<!--标题-->
		<div class="title">
			<div class="left">
				<el-button type="primary" @click="handleAdd">添加</el-button>
				<el-button type="primary" @click="handleDelete">删除</el-button>
			</div>
		</div>
		<!--表格-->
		<el-table ref="table" :height="tableHeight" @selection-change="handleSelectionChange" border :data="ExtendCompanyList" style="width: 100%">
			<el-table-column type="selection" width="100" align="center">
			</el-table-column>
			<el-table-column label="操作" align="center" fixed width="100">
				<template slot-scope="scope">
					<el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="a0201a" label="任职机构名称" show-overflow-tooltip width="200" align="center">
			</el-table-column>
			<el-table-column prop="a0201b" label="任职机构代码" show-overflow-tooltip width="220" align="center">
			</el-table-column>
			<el-table-column prop="jgszxzq" label="任职机构所在政区" show-overflow-tooltip width="220" align="center">
			</el-table-column>
			<el-table-column prop="dwjb" label="任职机构级别" show-overflow-tooltip width="180" align="center">
			</el-table-column>
			<el-table-column prop="zwmc" label="职务名称" show-overflow-tooltip width="150" align="center">
			</el-table-column>
			<el-table-column prop="a0243" label="任职日期" show-overflow-tooltip width="180" align="center">
			</el-table-column>
			<el-table-column prop="a0245" label="任职文号" show-overflow-tooltip  align="center">
			</el-table-column>
		</el-table>
		<!--分页-->
		<div class="material_page">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		</div>
		<!--新增弹出层-->
		<el-dialog :title="dialog_title" width="65%" height="350px" :visible.sync="ExtendCompany_add" v-if='ExtendCompany_add' append-to-body :close-on-click-modal="false">
			<ExtendCompanyAdd :selectDeceive="chioceObj" :addOrEdit="addOrEdit" @backCall="getExtendCompanyAddBack"></ExtendCompanyAdd>
		</el-dialog>
		<!--编辑弹出层-->
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import ExtendCompanyAdd from './ExtendCompanyAdd.vue';

	export default {
		name:'ExtendCompany',
		props: ['selectObj'],
		components: {
			Pagination, //分页组件
			ExtendCompanyAdd, //扩充-工作单位及职务-添加
		},
		data() {
			return {
				ExtendCompanyList: [], //扩充信息-工作单位及职务
				pageObj: { //分页
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				edit_add_personal: false, //添加
				chioceObj: {}, //选中
				addOrEdit: 'add', //判断添加还是修改
				ExtendCompany_add: false,//添加弹窗是否显示
				selectedId:'',//多选
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
			this.getExtendCompanyList();
		},
		methods: {
			PageTurning(page_obj) {//分页组件回调方法
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getExtendCompanyList();
			},
			getExtendCompanyList() { //扩充信息-工作单位及职务
				this.$axios({
					method: 'get',
					url: this.API.findA02InformationPage,
					params: {
						a0100: this.selectObj.a0100,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize,
					}
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data;
						this.ExtendCompanyList = resData.data.list;
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
				this.ExtendCompany_add = true;
				this.chioceObj = this.selectObj;
				this.addOrEdit = 'add',
				this.dialog_title='添加';
			},
			handleEdit(index, row) { //调动信息-编辑
				this.addOrEdit = 'edit';
				this.dialog_title = '编辑';
				if(this.chioceObj == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				} else {
					this.ExtendCompany_add = true
				}
				this.chioceObj = this.ExtendCompanyList[index]
			},
			/*
			 * 删除用户
			 */
			handleDelete() {
				let self = this;
				if(this.selectedId==''){
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}else{
					this.$confirm('确定要删除选中记录吗?', '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
						method: 'get',
						url: self.API.deleteA02,
						params: {
							'a0200': this.selectedId,
						}
					}).then((res) => {
						if(res.data.code == "1") {
							self.getExtendCompanyList();
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
			handleSelectionChange(val) {//批量删除
					let tempId = "";
					for(let i=0;i<val.length;i++){
						let str=val[i].a0200+',';
						tempId=str+tempId;
					}
					this.selectedId=tempId;
			},
			getExtendCompanyAddBack(reFresh){//弹框回调
				if(reFresh){
					this.getExtendCompanyList();
					this.ExtendCompany_add = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.company-con{
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