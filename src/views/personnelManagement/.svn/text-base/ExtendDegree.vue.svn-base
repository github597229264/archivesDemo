<template>
	<div class="degree-con">
		<!--标题-->
		<div class="title">
			<div class="left">
				<el-button type="primary" @click="handleAdd">添加</el-button>
				<el-button type="primary" @click="handleDelete">删除</el-button>
			</div>
		</div>
		<!--表格-->
		<el-table :height="tableHeight" ref="table" @selection-change="handleSelectionChange" border :data="DegreeList" style="width: 100%">
			<el-table-column type="selection" width="100" align="center">
			</el-table-column>
			<el-table-column label="操作" fixed align="center">
				<template slot-scope="scope">
					<el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

				</template>
			</el-table-column>
			<el-table-column prop="a0901a" label="学位名称" show-overflow-tooltip width="350" align="center">
			</el-table-column>
			<el-table-column prop="a0904" label="学位授予日期 " show-overflow-tooltip width="350" align="center">
			</el-table-column>
			<el-table-column prop="a0907" label="学位授予单位" show-overflow-tooltip width="350" align="center">
			</el-table-column>
			<el-table-column prop="a0914" label="最高学位标识" show-overflow-tooltip width="300" align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.a0914=='0'">否</span>
					<span v-else-if="scope.row.a0914=='1'">是</span>
					<span v-else></span>
				</template>
			</el-table-column>
			
		</el-table>
		<!--分页-->
		<div class="material_page">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		</div>
		<!--新增弹出层-->
		<el-dialog :title="title_dialog" width="65%" height="350px" :visible.sync="isShow" v-if='isShow' append-to-body :close-on-click-modal="false">
			<DegreeAdd :selectDeceive="chioceObj" :addOrEdit="addOrEdit" @backCall="backCallFuc"></DegreeAdd>
		</el-dialog>
		<!--编辑弹出层-->
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import DegreeAdd from './DegreeAdd.vue';

	export default {
		name:'ExtendDegree',
		props: ['selectObj'],
		components: {
			Pagination, //分页组件
			DegreeAdd, //扩充-学位信息-添加
		},

		data() {
			return {
				DegreeList: [], //扩充信息-学位
				pageObj: { //分页
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				edit_add_personal: false, //添加
				chioceObj: {}, //选中
				addOrEdit: 'add', //判断添加还是修改
				isShow: false,
				selectedId:'',//多选
				title_dialog:'添加',////弹框标题
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
			this.getDegreeList();
		},
		methods: {
			//分页组件回调方法
			PageTurning(page_obj) {
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getDegreeList();
			},
			getDegreeList() { //扩充信息-学位信息查询列表页
				this.$axios({
					method: 'get',
					url: this.API.findA09InformationPage,
					params: {
						a0100: this.selectObj.a0100,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize,
					}
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data;
						this.DegreeList = resData.data.list;
						this.pageObj.total = res.data.data.total;
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
				this.title_dialog='添加';
			},
			handleEdit(index, row) { //调动信息-编辑
				this.addOrEdit = 'edit';
				this.title_dialog='编辑';				
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
				this.chioceObj = this.DegreeList[index]
			},
			/*
			 * 删除用户
			 */
			handleSelectionChange(val) {//多选删除的数据
					let choiceId = "";
					for(let i=0;i<val.length;i++){
						let str=val[i].a0900+',';
						choiceId=str+choiceId;
					}
					this.selectedId=choiceId;
			},
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
							url: this.API.deleteA09,
							params: {
								'a0900': this.selectedId,
							}
						}).then((res) => {
							if(res.data.code == "1") {
								this.getDegreeList();
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
			backCallFuc(reFresh) {
				if(reFresh) {
					this.getDegreeList();
					this.isShow = false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.degree-con{
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