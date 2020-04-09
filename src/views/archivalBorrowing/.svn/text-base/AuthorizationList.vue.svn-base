<template>
	<div class="authorizationList">
		<el-form :inline="true" :model="searchForm" class="demo-form-inline">
			<el-form-item>
				<el-input v-model="searchForm.userName" placeholder="输入申请人"  class="inputWidth120"></el-input>
			</el-form-item>
		    <el-form-item>
			  	<el-date-picker
			  		style="width:140px;"
			      	v-model="searchForm.startDate"
			      	type="date"
			      	value-format="yyyy-MM-dd"
			      	@change="startDateChange"
			      	placeholder="申请开始日期">
			    </el-date-picker>
			</el-form-item>
		  	<el-form-item>
			  	<el-date-picker 
			  		style="width:140px;"
			      	v-model="searchForm.endDate"
			      	type="date"
			      	value-format="yyyy-MM-dd"
			      	@change="endDateChange"
			      	placeholder="申请结束日期">
			    </el-date-picker>
			</el-form-item>
			<el-form-item>
				<ReadReasonsSelect @ReadReasonsCall="ReadReasonsCall"  class="inputWidth190"></ReadReasonsSelect>
			</el-form-item>
			<el-form-item>
				<ApplyStatusSelect  @ApplyStatusCall="ApplyStatusCall"  class="inputWidth150"></ApplyStatusSelect>
			</el-form-item>
			<!--<el-form-item>
				<el-input v-model="searchForm.describe" placeholder="输入详细描述" class="inputWidth150"></el-input>
			</el-form-item>-->
			<el-form-item>
				<el-button type="primary" icon="search" @click="search">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" border class="table" ref="multipleTable" :height="tableHeight">
			<el-table-column fixed label="操作" width="120" align="center">
				<template slot-scope="scope">
					<el-button type="text" @click="handleDetail(scope.$index, scope.row)">详细</el-button>
					<el-button type="text" v-if="scope.row.name === '流程完成'" class="gray">授权</el-button>
					<el-button type="text" v-else @click="handleEdit(scope.$index, scope.row)">授权</el-button>
				</template>
			</el-table-column>
			</el-table-column>
			<el-table-column type="index" label="序号" align="center" width="50">
				<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
			</el-table-column>
			<el-table-column prop="userName" label="申请人" width="80" align="center"></el-table-column>
			<el-table-column prop="cyly" label="查借阅理由" width="160" align="center"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="querycode" label="查询码" width="60" align="center"></el-table-column>
			<el-table-column prop="u_createdate" label="申请时间" sortable width="120" align="center" :formatter="dateFormat"></el-table-column>
			<el-table-column prop="ssjg" label="档案所属机构" sortable width="160" align="center"></el-table-column>
			<el-table-column prop="aData" label="申请档案集合" min-width="160" align="center" show-overflow-tooltip></el-table-column>
			<el-table-column prop="rsName" label="档案类型" width="100" align="center"></el-table-column>
			<el-table-column prop="describe" label="详细描述" min-width="170"  align="center" show-overflow-tooltip></el-table-column>
			<el-table-column prop="name" label="状态" width="100" align="center" show-overflow-tooltip  fixed="right"></el-table-column>
		</el-table>
		<Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
		<!--详细弹出框 -->
		<el-dialog class="outDialog" title='详细' :visible.sync="detailVisible" width="65%" append-to-body v-if="detailVisible" :close-on-click-modal="false">
			<ApplyFileDetail :chioceObj="editBook"></ApplyFileDetail>
		</el-dialog>
		<!--授权弹出框 -->
		<el-dialog class="outDialog" title='授权' :visible.sync="authorizationVisible" width="65%" append-to-body v-if="authorizationVisible" :close-on-click-modal="false">
			<PersonnelsAuthorization :applyId="editBook.id" :archivesType="editBook.rstype" @AuthorizationCallBack="AuthorizationCallBack"></PersonnelsAuthorization>
		</el-dialog>
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import PersonnelsAuthorization from './PersonnelsAuthorization.vue';
	import ApplyFileDetail from './ApplyFileDetail.vue';
	import ApplyStatusSelect from '../../components/ApplyStatusSelect.vue';
	import ReadReasonsSelect from '../../components/ReadReasonsSelect.vue';
	export default {
		name: 'AuthorizationList', //档案授权列表
		props:["tableType","mainHeight"],
		components: {
			Pagination, //分页组件
			ApplyStatusSelect, //查借阅类型下拉框
			ReadReasonsSelect, //查借阅理由
			PersonnelsAuthorization,//人员授权
			ApplyFileDetail//详细
		},
		data() {
			return {
				tableHeight:'',//table高度
				authorizationType:this.tableType,//表格授权类型：档案授权=1 ; 快捷授权= 2;重新授权= 3
				tableData: [], //列表数据
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				editBook: {},
				multipleSelection: [],
				detailVisible: false, //详细弹窗的是否显示
				authorizationVisible: false, //授权弹窗的是否显示
				dialogTitle: '查借申请',
				searchForm: {
					userName: '', //申请人
					startDate: '', //申请开始日期
					endDate: '', //申请结束日期
					applyStatus: '', //查借阅类型
					purpose: '', //查借阅理由
					describe:''//详细描述
				}
			}
		},
		created() {
			this.getData();
		},
		mounted() {
			this.tableHeight = this.mainHeight-75-this.$refs.multipleTable.$el.offsetHeight*1 - 52;
		},
		computed: {

		},
		watch:{
        	/**
        	 * 监听 defaultTables 参数值
        	 */
        	mainHeight(newVal,oldVal){
        		this.mainHeight = newVal;
        		this.tableHeight = this.mainHeight-75-this.$refs.multipleTable.$el.offsetHeight*1 - 52;
        	}
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
			 * 档案授权组件回调方法--子组件回调数据的方法
			 */
			AuthorizationCallBack() {
				this.authorizationVisible = false;
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
			 * 查借阅类型下拉框组件回调方法--子组件回调数据的方法
			 * @id {String} 选中的id
			 */
			ApplyStatusCall(id) {
				this.searchForm.applyStatus = id;
			},
			/**
			 * 获取列表数据
			 */
			getData() {
				this.$axios({
					loading:{
            			isShow:true,
            			target:'.authorizationList'
            		},
					method: 'post',
					url: this.API.recordAccredit,
					data: {
						'stype':this.authorizationType,
						'userName': this.searchForm.userName,
						'status': this.searchForm.applyStatus,
						'startDate': this.searchForm.startDate,
						'endDate': this.searchForm.endDate,
						'purpose': this.searchForm.purpose,
						'describe': this.searchForm.describe,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
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
					console.log("查询档案授权列表=" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
	        /**
	         * 监听 查借阅开始日期的change事件
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
	         * 监听 查借阅结束日期的change事件
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
				this.editBook = this.tableData[index];
				this.detailVisible = true;
			},
			/*
			 * 编辑
			 */
			handleEdit(index, row) {
				this.editBook = this.tableData[index];
				this.authorizationVisible = true;
			},
			/*
			 * 请求后台进行登记处理
			 * @id {String} 需要操作的数据id
			 * @self {Obj} this对象
			 */
			bookData(id, self) {
				self.$axios({
					loading:{
            			isShow:true,
            			target:'.authorizationList'
            		},
					method: 'post',
					url: self.API.borrowAndReadRegister,
					data: {
						id: id
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						self.$message({
							type: 'success',
							message: '登记处理成功!'
						});
						self.getData(); //重新获取数据
					} else {
						self.$message({
							type: 'error',
							message: '登记处理失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("登记处理=" + err);
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
	
	.authorizationList {
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