<template>
	<div class="family-con">
		<!--标题-->
		<div class="title">
			<div class="left">
				<el-button type="primary" @click="handleAdd">添加</el-button>
				<el-button type="primary" @click="handleDelete">删除</el-button>

			</div>
		</div>
		<!--表格-->
		<el-table ref="table" :height="tableHeight" border @selection-change="handleSelectionChange" :data="FamilyAndSocietyList" style="width: 100%">
			<el-table-column type="selection" width="100" align="center">
			</el-table-column>
			<el-table-column label="操作" fixed align="center">
				<template slot-scope="scope">
					<el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="a3601" label="姓名" width="100" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="a3604a" label="称谓 " width="100" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="a3607" label="出生年月" width="150" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="gj" label="国籍" width="120" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="mz" label="民族" width="120" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="xl" label="学历" width="120" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="zzmm" label="政治面貌" width="120" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="rysf" label="身份" width="140" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="a3611" label="工作单位及职务" show-overflow-tooltip width="200" align="center">
			</el-table-column>
			<el-table-column prop="a3644" label="备注" width="180" show-overflow-tooltip align="center">
			</el-table-column>
			
		</el-table>
		<!--分页-->
		<div class="material_page">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		</div>
		<!--新增弹出层-->
		<el-dialog :title="dialog_title" width="65%" height="350px" :visible.sync="isShow" v-if='isShow' append-to-body :close-on-click-modal="false">
			<FamilyAndSocietyAdd :selectDeceive="chioceObj" :addOrEdit="addOrEdit" @backCall="getAddBack"></FamilyAndSocietyAdd>
		</el-dialog>
		<!--编辑弹出层-->
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import FamilyAndSocietyAdd from './FamilyAndSocietyAdd.vue';

	export default {
		name:'ExtendFamilyAndSociety',
		props: ['selectObj'],
		components: {
			Pagination, //分页组件
			FamilyAndSocietyAdd, //扩充-家庭成员及社会关系-添加

		},
		data() {
			return {
				FamilyAndSocietyList: [], //扩充信息-家庭成员及社会关系列表
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
				dialog_title:'添加',//弹框标题
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
			this.getFamilyAndSocietyList();
		},
		methods: {
			//分页组件回调方法
			PageTurning(page_obj) {
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getFamilyAndSocietyList();
			},
			getFamilyAndSocietyList() { //扩充信息-家庭成员及社会关系列表
				this.$axios({
					method: 'get',
					url: this.API.findA36InformationPage,
					params: {
						a0100: this.selectObj.a0100,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize,
					}
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data;
						this.FamilyAndSocietyList = resData.data.list;
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
				this.isShow = true
				this.chioceObj = this.FamilyAndSocietyList[index]
			},
			/*
			 * 删除用户
			 */
			handleSelectionChange(val) {
					let choiceId = "";
					for(let i = 0; i < val.length; i++) {
						let str = val[i].a3600 + ',';
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
						//self.delUser(item.id,self);//请求后台进行删除
						this.$axios({
							method: 'get',
							url: this.API.deleteA36,
							params: {
								'a3600': this.selectedId,
							}
						}).then((res) => {
							if(res.data.code == "1") {
								this.getFamilyAndSocietyList();
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
					this.isShow = false;
					this.getFamilyAndSocietyList();

				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.family-con{
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