<template>
	<div class="appoint-con">
		<!--标题-->
		<div class="title">
			<div class="left">
				<el-button type="primary" @click="AddFunc">添加</el-button>
			</div>
		</div>
		<!--表格-->
		<el-table :data="appointAndRemoveList" ref="table" :height="tableHeight" style="width: 100%" border>
			<el-table-column label="操作" fixed width="120" align="center">
				<template slot-scope="scope">
					<el-button type="text" v-if="scope.row.status == 2" class="gray">编辑</el-button>
					<el-button type="text" v-else @click="AppointAndRemoveEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="text" v-if="scope.row.status == 2" class="gray">删除</el-button>
					<el-button type="text" v-else @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="administrativeorgandate" label="拟任免日期" show-overflow-tooltip width="100" align="center">
			</el-table-column>
			<el-table-column prop="presentoccupation" label="现任职务 " show-overflow-tooltip width="400" align="center">
			</el-table-column>
			<el-table-column prop="designatedposition" label="拟任职务" show-overflow-tooltip width="400" align="center">
			</el-table-column>
			<el-table-column prop="tofreepost" label="拟免职务" show-overflow-tooltip width="400" align="center">
			</el-table-column>
			<el-table-column prop="appstatus" label="现状标识" show-overflow-tooltip align="center">
			</el-table-column>
			
		</el-table>
		<!--分页-->
		<div class="material_page">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		</div>
		<!--新增弹出层-->
		<el-dialog :title='dialog_title' width="90%" height="350px" fullscreen :visible.sync="isShow" v-if='isShow' append-to-body :close-on-click-modal=false>
			<AppointAndRemoveAdd :selectDeceive="OptionObj" :addOrEdit="showAddOrEdit" @AddBack="AddBack"></AppointAndRemoveAdd>
		</el-dialog>
		<!--编辑弹出层-->
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import AppointAndRemoveAdd from './AppointAndRemoveAdd.vue';

	export default {
		name:'ExtendAppointAndRemove',
		props: ['selectObj'],
		components: {
			Pagination, //分页组件
			AppointAndRemoveAdd,//其他-任免信息-添加
		},
		data() {
			return {
				appointAndRemoveList: [], //其他类-任免信息
				pageObj: { //分页
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				edit_add_personal: false, //添加
				chioceObj: {}, //选中
				showAddOrEdit: 'add', //判断添加还是修改
				isShow: false,//弹框是否显示
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
			this.getappointAndRemoveList();

		},
		methods: {
			//分页组件回调方法
			PageTurning(page_obj) {
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getappointAndRemoveList();
			},
			getappointAndRemoveList() { //其他类-任免信息
				this.$axios({
					method: 'get',
					url: this.API.findBadaInformationPage,
					params: {
						a0100: this.selectObj.a0100,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize,
					}
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data;
						let list=resData.data.list;
						if(list.length>0){
							list[0].appstatus='是'
						}
						this.appointAndRemoveList = list;
						this.pageObj.total=resData.data.total;
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
			AddFunc(){//其他类-任免信息-添加
				this.OptionObj=this.selectObj;
				this.dialog_title='添加';
            	this.isShow=true;
            	this.showAddOrEdit='add'
			},
			AppointAndRemoveEdit(index,row){//编辑
				let OptionObj=this.appointAndRemoveList[index];
				this.showAddOrEdit='edit';
				this.dialog_title = '编辑';
				 this.$axios({
            		method:'get',
                	url:this.API.editBada, 
                	params:{
	                	'id':OptionObj.id,
	                    'a0100': this.selectObj.a0100,
	                    'uAreacode': ''
                	}
               }).then((res) => {
                    if(res.data.code=1){
	                    this.OptionObj=res.data.data;
	                    this.dialogTitle = "编辑信息";
	            		this.isShow=true;
                    }else{
                    	this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
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
			 * 删除用户
			 */
			handleDelete(index, row) {
				let item = this.appointAndRemoveList[index];
				let self = this;
				this.$confirm('确定要删除选中记录吗?', '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
						method: 'get',
						url: this.API.deleteBada,
						params: {
							'id': item.id,
						}
					}).then((res) => {
						if(res.data.code == "1") {
							this.getappointAndRemoveList();
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
			},
			AddBack(isRefresh){//其他类-任免信息-添加-回调
				this.isShow=false;
				if(isRefresh){
					this.getappointAndRemoveList()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.appoint-con{
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