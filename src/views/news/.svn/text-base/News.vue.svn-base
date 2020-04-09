<template>
	<div>
		<el-table id="newsTable" :data="tableData" style="width:100%" border>
			<el-table-column prop="operation" label="操作" width="120" align="center">
				<template slot-scope="scope">
					<el-button type="text" :disabled='scope.row.flag' @click="browsePersonal(scope.$index, scope.row)">{{scope.row.oppbtn}}</el-button>
					<el-button type="text" :disabled='scope.row.flag' @click="deletePersonal(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="title" label="标题" align="left" show-overflow-tooltip>
			</el-table-column>
		</el-table>
		<!--分页-->
		<div class="material_page">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		</div>
		<!--授权弹出框 -->
		<el-dialog class="outDialog" title='授权' :visible.sync="authorizationVisible" width="65%" append-to-body v-if="authorizationVisible" :close-on-click-modal="false">
			<personnelsAuthorization :applyId="authorizationId" :archivesType="type" @AuthorizationCallBack="authorizationCallBack"></personnelsAuthorization>
		</el-dialog>
		<!--审批弹出框 -->
		<el-dialog title="审批" :visible.sync="approvelVisible" width="350px"  append-to-body v-if="approvelVisible" :close-on-click-modal="false">
		  <approveAlert :applyId="authorizationId" @ApproveAlertCall="approveAlertCall"></approveAlert>
		</el-dialog>
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import personnelsAuthorization from '../archivalBorrowing/PersonnelsAuthorization.vue';
	import approveAlert from '../archivalBorrowing/ApproveAlert.vue';
	
	export default {
		name: 'News',
		components: {
			Pagination, //分页组件
			personnelsAuthorization,
			approveAlert
		},
		data() {
			return {
				tableData: [], //表格数据
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				oppbtn: "", //要操作的按钮，审批或者授权
				authorizationVisible: false, //授权弹窗的是否显示
				approvelVisible:false,//审批弹窗是否显示
				authorizationId: "", //授权id
				type: "", //授权类型
			}
		},
		created() {
			this.getToDoList(); //消息列表
		},
		methods: {
			//分页组件回调方法
			PageTurning(page_obj) {
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getToDoList(); //消息列表
			},
			getToDoList() { //消息列表
				this.$axios({
					loading:{
            			isShow:false,
            		},
					method: 'get',
					url: this.API.findmessageReminderPage,
					params: {
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.tableData = resData.data.list;
						if(this.tableData.length > 0) {
							this.tableData.forEach(item => {
								if(item.bustype === "纸质档案授权") {
									item.oppbtn = "授权";
									item.type = this.API.constObj.fileTypeList[1].id;
								} else if(item.bustype === "电子档案授权") {
									item.oppbtn = "授权";
									item.type = this.API.constObj.fileTypeList[0].id
								} else if(item.bustype === "纸质档案审批" || item.bustype === "电子档案审批") item.oppbtn = "审批"
							})
						}
						this.pageObj.total = resData.data.total;
						this.$emit('newsCall', resData.data.total);
					} else {
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
			deletePersonal(index, row) { //删除
				let selectObj = this.tableData[index];
				let self = this;
				this.$confirm('确定要删除选中记录?', '操作提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios({
						loading:{
	            			isShow:true,
	            			target:'#newsTable'
	            		},
						method: 'get',
						url: this.API.deleteMessageReminder,
						params: {
							'id': selectObj.id,
						}
					}).then((res) => {
						var resData = res.data;
						if(resData.code == "1") {
							this.getToDoList();

						} else {
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
				}).catch(() => {
					self.$message({
						type: 'info',
						message: '已取消删除用户操作'
					});
				});
			},
			browsePersonal(index, row) { //授权或者审批的处理
				let selectObj = this.tableData[index];
				this.authorizationId = selectObj.busid;
				this.type = row.type;
				this.oppbtn = row.oppbtn;
				if(this.oppbtn === "授权") this.authorizationVisible = true;
				else if(this.oppbtn === "审批")this.approvelVisible = true;
			},
			authorizationCallBack(){//授权的回调
				this.authorizationVisible = false;
				this.getToDoList();
			},
			approveAlertCall(isRefs) {//审批弹框组件回调方法--子组件回调数据的方法
				this.approvelVisible = false;
				if(isRefs){
					this.getToDoList();
				}
			},
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.el-table {
		max-height: 57vh;
		overflow: auto;
	}
	
	.material_page {
		margin-top: 10px;
		text-align: right;
	}
</style>