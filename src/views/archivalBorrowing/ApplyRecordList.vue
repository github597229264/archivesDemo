<template>
	<div class="applyRecordList">
		<el-form :inline="true" :model="searchForm" class="demo-form-inline">
			<el-form-item>
			  	<el-date-picker
			  		style="width:150px;"
			      	v-model="searchForm.startDate"
			      	type="date"
			      	value-format="yyyy-MM-dd"
			      	@change="startDateChange"
			      	placeholder="申请开始日期">
			    </el-date-picker>
			</el-form-item>
			<el-form-item>
			  	<el-date-picker 
			  		style="width:150px;"
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
			<el-form-item v-if="tableType == 2">
				<ApplyStatusSelect  @ApplyStatusCall="ApplyStatusCall"  class="inputWidth150"></ApplyStatusSelect>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="search" @click="search">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" border class="table" ref="multipleTable" :height="tableHeight">
			<el-table-column fixed label="操作" width="180" align="center">
				<template slot-scope="scope">
					<el-button type="text" @click="handleDetail(scope.$index, scope.row)">详细</el-button>
					<el-button type="text" @click="handleApprovelHistory(scope.$index, scope.row)">审批历史</el-button>
					<!--纸质档案 显示 "可查阅" rstype=纸质档案+authorizationType=全部申请+status:申请状态=已授权  -->
					<el-button type="text" v-if="scope.row.rstype==API.constObj.fileTypeList[1].id && authorizationType==2 && scope.row.status == API.constObj.fileStatusList[2].id" class="gray">可查阅</el-button>
					<!-- 电子档案 显示 "查阅" rstype=电子档案+authorizationType=可查阅申请+status:申请状态=已授权-->
					<el-button type="text" v-if="scope.row.rstype==API.constObj.fileTypeList[0].id && authorizationType==1 && scope.row.status == API.constObj.fileStatusList[2].id" @click="handleReading(scope.$index, scope.row)">查阅</el-button>
					<!-- 终止 authorizationType=全部申请+(status:申请状态=已提交 || status:申请状态=已完成) -->
					<el-button type="text" v-if="authorizationType==2 && scope.row.status == API.constObj.fileStatusList[1].id || scope.row.status == API.constObj.fileStatusList[3].id" @click="stopReading(scope.$index, scope.row)">终止</el-button>
				</template>
			</el-table-column>
			<el-table-column type="index" label="序号" align="center" width="50">
				<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
			</el-table-column>
			<el-table-column prop="userName" label="申请人" width="80" align="center"></el-table-column>
			<el-table-column prop="cyly" label="查借阅理由" width="160" align="center"  show-overflow-tooltip></el-table-column>
			<el-table-column prop="querycode" label="查询码" width="60" align="center"></el-table-column>
			<el-table-column prop="u_createdate" label="申请时间" sortable width="120" align="center" :formatter="dateFormat"></el-table-column>
			<el-table-column prop="impowerstarttime" label="授权开始时间" sortable width="140" align="center" :formatter="dateFormat"></el-table-column>
			<el-table-column prop="impowerendtime" label="授权结束时间" sortable width="140" align="center" :formatter="dateFormat"></el-table-column>
			<el-table-column prop="ssjg" label="档案所属机构" sortable width="160" align="center"></el-table-column>
			<el-table-column prop="aData" label="申请档案集合"  width="160"  align="center" show-overflow-tooltip></el-table-column>
			<el-table-column prop="rsName" label="档案类型" width="100" align="center"></el-table-column>
			<el-table-column prop="name" label="状态" width="100" sortable align="center" show-overflow-tooltip></el-table-column>
		</el-table>
		<Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
		<!--详细弹出框 -->
		<el-dialog v-if="detailVisible" :visible.sync="detailVisible" class="outDialog" title='详细' width="65%" append-to-body :close-on-click-modal="false">
			<ApplyFileDetail :chioceObj="applyObj"></ApplyFileDetail>
		</el-dialog>
		<!--审批历史弹出框 -->
		<el-dialog v-if="approvelHistoryVisible" :visible.sync="approvelHistoryVisible" class="outDialog" title='审批历史' width="65%" append-to-body :close-on-click-modal="false">
			<ApprovelHistoryList :applyId="applyObj.id"></ApprovelHistoryList>
		</el-dialog>
		<!--查阅弹出框 -->
		<el-dialog v-if="readingVisible" :visible.sync="readingVisible" class="outDialog" title='查阅' width="75%" append-to-body :close-on-click-modal="false">
			<NormalReadingFile :applyObj="applyObj"></NormalReadingFile>
		</el-dialog>
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import ApprovelHistoryList from './ApprovelHistoryList.vue';
	import ApplyFileDetail from './ApplyFileDetail.vue';
	import NormalReadingFile from './NormalReadingFile.vue';
	import ApplyStatusSelect from '../../components/ApplyStatusSelect.vue';
	import ReadReasonsSelect from '../../components/ReadReasonsSelect.vue';
	export default {
		name: 'ApplyRecordList', //申请记录列表
		props:[
			"tableType",//申请类型
			"mainHeight"//main标签高度
		],
		components: {
			Pagination, //分页组件
			ApplyStatusSelect, //查借阅类型下拉框
			ReadReasonsSelect, //查借阅理由
			ApplyFileDetail,//详细
			ApprovelHistoryList,//审批历史
			NormalReadingFile//申请档案阅览--标准版
		},
		data() {
			return {
				tableHeight:'',//table高度
				authorizationType:this.tableType,//表格申请记录列表类型：可查阅申请=1 ;全部申请= 2; 已过期申请= 3;
				tableData: [], //列表数据
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				applyObj: {},
				multipleSelection: [],
				detailVisible: false, //详细弹窗是否显示
				approvelHistoryVisible: false, //审批历史弹窗是否显示
				readingVisible: false, //查阅弹窗是否显示
				searchForm: {
					startDate: '', //申请开始日期
					endDate: '', //申请结束日期
					applyStatus: '', //查借阅类型
					purpose: '' //查借阅理由
				}
			}
		},
		created() {
			this.getData();//获取列表数据
		},
		mounted() {
			this.tableHeight = this.mainHeight-75-this.$refs.multipleTable.$el.offsetHeight*1 - 52;
		},
		computed: {

		},
		watch:{
			/**
			 * 监听 readingVisible 的值
			 */
			readingVisible(newVal,oldVal){
				if(!newVal){
					this.getData();//获取列表数据
				}
			},
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
			 * 分页导航
			 * @val {Number} 当前页下标
			 */
			handleCurrentChange(val) {
				this.pageObj.pageIndex = val;
				this.getData();
			},
			/*
			 * 分页组件回调方法--子组件回传数据的方法
			 * @page_obj {Object} 分页信息
			 * page_obj.page_index 当前页下标
			 * page_obj.page_size 页大小
			 */
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
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
			 * 查借阅类型下拉框组件回调方法--子组件回调数据的方法
			 * @id {String} 选中的id
			 */
			ApplyStatusCall(id) {
				this.searchForm.applyStatus = id;
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
            			target:'.applyRecordList'
            		},
					method: 'get',
					url: this.API.applicationRecord,
					params: {
						'sType':this.authorizationType,
						'status': this.searchForm.applyStatus,
						'startDate': this.searchForm.startDate,
						'endDate': this.searchForm.endDate,
						'purpose': this.searchForm.purpose,
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
				this.applyObj = row;
				this.detailVisible = true;
			},
			/**
			 * 终止阅档
			 */
			stopReading(index, row){
				this.$confirm('点击终止后将无法继续查阅该人员档案，确定继续终止操作吗?', '操作提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.overReading(row.id);//请求后台进行终止阅档处理
		        }).catch(() => {       
		        });
			},
			/*
			 * 监听 审批历史 点击事件
			 */
			handleApprovelHistory(index, row) {
				this.applyObj = row;
				this.approvelHistoryVisible = true;
			},
			/*
			 * 监听 查阅 点击事件
			 */
			handleReading(index, row) {
				this.applyObj = row;
				this.readingVisible = true;
			},
			
			/**
			 * 请求终止阅档
			 */
			overReading(id){
				var self = this;
				this.$axios({
					loading:{
            			isShow:true,
            			target:'.applyRecordList'
            		},
					method: 'get',
					url: this.API.termination,
					params: {
						id: id, //申请单id
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						self.$message({
							type: 'success',
							message: '终止操作成功！'
						});
						self.getData();//重新获取数据
					}else{
						self.$message({
							type: 'error',
							message: '终止操作失败，请刷新重试！'
						});
					}
				}).catch((err) => {
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
	
	.applyRecordList {
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