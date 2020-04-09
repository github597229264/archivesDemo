<template>
	<div class="approveList">
		<el-form :inline="true" :model="searchForm" class="demo-form-inline">
			<el-form-item>
				<el-input v-model="searchForm.userName" placeholder="输入申请人" class="inputWidth120"></el-input>
			</el-form-item>
			<el-form-item>
			  	<el-date-picker
			  		style="width:170px;"
			      	v-model="searchForm.startDate"
			      	type="datetime"
			      	format="yyyy-MM-dd HH:mm"
			      	value-format="yyyy-MM-dd HH:mm"
			      	@change="startDateChange"
			      	placeholder="申请开始日期">
			    </el-date-picker>
			</el-form-item>
			<el-form-item>
			  	<el-date-picker 
			  		style="width:170px;"
			      	v-model="searchForm.endDate"
			      	type="datetime"
			      	format="yyyy-MM-dd HH:mm"
			      	value-format="yyyy-MM-dd HH:mm"
			      	@change="endDateChange"
			      	placeholder="申请结束日期">
			    </el-date-picker>
			</el-form-item>
			<el-form-item>
				<ReadReasonsSelect @ReadReasonsCall="ReadReasonsCall" class="inputWidth190"></ReadReasonsSelect>
			</el-form-item>
			<el-form-item>
				<ApplyScopeSelect  @ApplyScopeSelectCall="ApplyScopeCall" class="inputWidth150"></ApplyScopeSelect>
			</el-form-item>
			<!--<el-form-item>
				<el-input v-model="searchForm.describe" placeholder="输入详细描述(50个字符以内)" maxlength="50"></el-input>
			</el-form-item>-->
			<el-form-item>
				<el-button type="primary" icon="search" @click="search">查询</el-button>
			</el-form-item>
		</el-form>
		<el-row>
			<el-col :span="24">
				<el-table :data="tableData" border class="table" ref="multipleTable" height="350px">
					<el-table-column fixed label="操作" width="150" align="center">
						<template slot-scope="scope">
							<el-button type="text" @click="handleDetail(scope.$index, scope.row)">详细</el-button>
							<el-button type="text" v-if="tableType == 1"  @click="showApproveldialog(scope.$index, scope.row)">审批</el-button>
							<el-button type="text" @click="handleHistory(scope.$index, scope.row)">审批历史</el-button>
						</template>
					</el-table-column>
					</el-table-column>
					<el-table-column type="index" label="序号" align="center" width="50">
						<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
					</el-table-column>
					<el-table-column prop="userName" label="申请人" width="80" align="center"></el-table-column>
					<el-table-column prop="cyly" label="查借阅理由" sortable width="160" align="center"  show-overflow-tooltip></el-table-column>
					<el-table-column prop="u_createdate" label="申请时间" sortable width="120" align="center" :formatter="dateFormat"></el-table-column>
					<el-table-column prop="ssjg" label="档案所属机构" sortable width="160" align="center"></el-table-column>
					<el-table-column prop="aData" label="申请档案集合" min-width="140" align="center" show-overflow-tooltip></el-table-column>
					<el-table-column prop="rsName" label="档案类型" sortable width="100" align="center"></el-table-column>
					<el-table-column prop="name" label="状态" sortable width="100" align="center"></el-table-column>
					<el-table-column prop="describe" label="详细描述" min-width="100" align="center" show-overflow-tooltip></el-table-column>
				</el-table>
				<div class="pagination">
					<Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
				</div>
			</el-col>
		</el-row>
		<!--详细弹出框 -->
		<el-dialog class="outDialog" title='详细' :visible.sync="detailVisible" width="65%" append-to-body v-if="detailVisible" :close-on-click-modal="false">
			<ApplyFileDetail :chioceObj="applyObj"></ApplyFileDetail>
		</el-dialog>
		<!--审批历史弹出框 -->
		<el-dialog class="outDialog" title='审批历史' :visible.sync="approvelHistoryVisible" width="68%" append-to-body v-if="approvelHistoryVisible" :close-on-click-modal="false">
			<ApprovelHistoryList :applyId="applyObj.id"></ApprovelHistoryList>
		</el-dialog>
		<!--审批弹出框 -->
		<el-dialog title="审批" :visible.sync="approvelVisible" width="350px"  append-to-body v-if="approvelVisible" :close-on-click-modal="false">
		  <ApproveAlert :applyId="applyObj.id" @ApproveAlertCall="ApproveAlertCall"></ApproveAlert>
		</el-dialog>
	</div>
</template>

<script>
	import ApplyScopeSelect from '../../components/ApplyScopeSelect.vue';
	import ReadReasonsSelect from '../../components/ReadReasonsSelect.vue';
	import Pagination from '../../components/Pagination.vue';
	import ApprovelHistoryList from './ApprovelHistoryList.vue';
	import ApplyFileDetail from './ApplyFileDetail.vue';
	import ApproveAlert from './ApproveAlert.vue';
	export default {
		name: 'ApproveList', //审批列表
		props:["tableType"],
		components: {
			Pagination, //分页组件
			ApplyScopeSelect, //查借阅范围下拉框
			ReadReasonsSelect, //查借阅理由
			ApprovelHistoryList,//审批历史列表
			ApplyFileDetail,//详细
			ApproveAlert//审批弹框
		},
		data() {
			return {
				authorizationType:this.tableType,//表格审批类型：档案审批=1 ; 快捷审批= 2;重新审批= 3
				tableData: [], //列表数据
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize:  this.API.constObj.pageSize, //页大小
				},
				applyObj: {},
				multipleSelection: [],
				approvelVisible:false,//审批弹窗是否显示
				detailVisible: false, //详细弹窗是否显示
				approvelHistoryVisible: false, //审批弹窗是否显示
				dialogTitle: '查借申请',
				searchForm: {
					userName: '', //申请人
					appointDate: '', //申请日期--日期控件专用
					startDate: '', //申请开始日期
					endDate: '', //申请结束日期
					applyStatus: '', //查借阅范围
					purpose: '', //查借阅理由
					describe:''//详细描述
				}
			}
		},
		created() {
			this.getData();
		},
		mounted() {
			
		},
		computed: {

		},
		methods: {
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
			 * 查借阅理由下拉框组件回调方法--子组件回调数据的方法
			 * @param {String} id 选中的id
			 */
			ReadReasonsCall(id) {
				this.searchForm.purpose = id;
			},
			/*
			 * 查借阅范围下拉框组件回调方法--子组件回调数据的方法
			 * @id {String} 选中的id
			 */
			ApplyScopeCall(id) {
				this.searchForm.applyStatus = id;
			},
			/*
			 * 审批弹框组件回调方法--子组件回调数据的方法
			 * @param {String} id 选中的id
			 */
			ApproveAlertCall(isRefs) {
				this.approvelVisible = false;
				if(isRefs){
					this.search();
				}
			},
	        /**
	         * 监听 申请结束日期的change事件
	         */
	        startDateChange(){
	        	let startTime = this.searchForm.startDate;
	        	let endTime = this.searchForm.endDate;
	        	if(startTime && startTime.length > 0 && endTime && endTime.length > 0){
	        		let startTimer = new Date(startTime).getTime();
	        		let endTimer = new Date(endTime).getTime();
	        		if(startTimer > endTimer){
	        			this.$message({
				            type: 'error',
				            message: '申请开始日期不能大于结束日期!'
			          	});
			          	this.searchForm.startDate ='';
	        		}
	        	}
	        },
	        /**
	         * 监听 申请结束日期的change事件
	         */
	        endDateChange(){
	        	let startTime = this.searchForm.startDate;
	        	let endTime = this.searchForm.endDate;
	        	if(startTime && startTime.length > 0 && endTime && endTime.length > 0){
	        		let startTimer = new Date(startTime).getTime();
	        		let endTimer = new Date(endTime).getTime();
	        		if(startTimer > endTimer){
	        			this.$message({
				            type: 'error',
				            message: '申请开始日期不能大于结束日期!'
			          	});
			          	this.searchForm.endDate ='';
	        		}
	        	}
	        },
			/**
			 * 获取列表数据
			 */
			getData() {
				this.$axios({
					loading:{
            			isShow:true,
            			target:'.approveList'
            		},
					method: 'post',
					url: this.API.approvals,
					data: {
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize,
						'type':this.searchForm.applyStatus,//查阅类型：外处室查阅、本处室查阅
						'userName': this.searchForm.userName,
						'startDate': this.searchForm.startDate,
						'endDate': this.searchForm.endDate,
						'purpose': this.searchForm.purpose,
						'describe': this.searchForm.describe,
						'aType':this.tableType//审批列表类型 1为待审批 2为已审批
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.tableData = resData.data.list;
						this.pageObj.total = resData.data.total;
					} else {
						this.$message({
							type: 'error',
							message: '查询失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("查询档案审批列表=" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
            /*
             * 日期格式化
             */
            dateFormat(row, column, cellValue, index) {
            	return this.commonFun.dateFormat(cellValue,"yyyy-MM-dd HH:mm");	
            },
			/*
			 * 查询
			 */
			search() {
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.getData();
			},
			/*
			 * 详细
			 */
			handleDetail(index, row) {
				this.applyObj = this.tableData[index];
				this.detailVisible = true;
			},
			/*
			 * 打开授权弹窗
			 */
			showApproveldialog(index, row) {
				this.applyObj = this.tableData[index];
				this.approvelVisible = true;
			},
			/*
			 * 历史
			 */
			handleHistory(index, row) {
				this.applyObj = this.tableData[index];
				this.approvelHistoryVisible = true;
			},
			/**
			 * 确定授权
			 */
			approvelRequest(){
				let self = this;
				this.$refs["approvelForm"].validate((valid) => {
					if(valid) {
						this.setApprovel(self);
					}
				});
			},
			/*
			 * 请求后台进行授权处理
			 * @self {Obj} this对象
			 */
			setApprovel(self) {
				self.$axios({
					loading:{
            			isShow:true,
            			target:'.approveList'
            		},
					method: 'post',
					url: self.API.approvaling,
					data: {
						id: self.applyObj.id,
						result:self.approvelForm.result,
						reason:self.approvelForm.reason
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						self.approvelForm={
							result:null,
							reason:""
						};
						this.approvelVisible = false;
						self.getData(); //重新获取数据
						self.$message({
							type: 'success',
							message: '审批处理成功!'
						});
					} else {
						self.$message({
							type: 'error',
							message: '审批处理失败，请刷新重试！'
						});
					}
				}).catch((err) =>{
					console.log("审批处理=" + err);
					self.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	el-dialog {
		.del-dialog-cnt {
			font-size: 16px;
			text-align: center
		}
	}
	
	.approveList {
		width: 100%;
		font-size: 14px;
		.inputWidth120{
			width:120px;
		}
		.inputWidth240{
			width:240px;
		}
		.inputWidth190{
			width:190px;
		}
		.inputWidth150{
			width:150px;
		}
	}
	
	.gray {
		color: #dcdfe6;
	}
	
	.red {
		color: #ff0000;
	}
	
</style>