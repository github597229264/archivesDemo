<template>
    <div class="siteRegister">
        <div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>档案查借阅</el-breadcrumb-item>
			  <el-breadcrumb-item>现场查借阅</el-breadcrumb-item>
			  <el-breadcrumb-item>现场登记</el-breadcrumb-item>
			</el-breadcrumb>
        </div>
        <div class="container">
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
			  <el-form-item>
			    <el-button type="primary" icon="el-icon-edit" @click="register">登记</el-button>
			  </el-form-item>
			  <el-form-item>
			    <el-input v-model="searchForm.applyManName" placeholder="输入查阅人姓名"></el-input>
			  </el-form-item>
			  <el-form-item>
			  	<el-date-picker
			  		style="width:160px;"
			      	v-model="searchForm.readingStartTime"
			      	type="date"
			      	value-format="yyyy-MM-dd"
			      	@change="startDateChange"
			      	placeholder="查借阅开始日期">
			    </el-date-picker>
			  </el-form-item>
			  <el-form-item>
			  	<el-date-picker 
			  		style="width:160px;"
			      	v-model="searchForm.readingEndTime"
			      	type="date"
			      	value-format="yyyy-MM-dd"
			      	@change="endDateChange"
			      	placeholder="查借阅结束日期">
			    </el-date-picker>
			  </el-form-item>
			  <el-form-item>
			  	<div class="applyTypeSelect">
	                <ApplyTypeSelect  @ApplyTypeCall="ApplyTypeCall"></ApplyTypeSelect>
	            </div>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" icon="search" @click="search" >查询</el-button>
			  </el-form-item>
			</el-form>
            <el-table :data="tableData" border class="table" ref="multipleTable" :height="tableHeight">
                <el-table-column fixed label="操作" width="140" align="center">
                    <template slot-scope="scope">
                        <el-button type="text"  @click="handleRead(scope.$index, scope.row)">查看</el-button>
                        <el-button type="text"  v-if="scope.row.status == '已归还'" class="gray">编辑</el-button>
                        <el-button type="text"  v-else  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text"  v-if="scope.row.status == '已归还'" class="gray">归还</el-button>
                        <el-button type="text"  v-else @click="handleReturn(scope.$index, scope.row)">归还</el-button>
                    </template>
               	</el-table-column>
                <el-table-column type="index" label="序号" align="center" width="50">
					<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
				</el-table-column>
                <el-table-column prop="applymanname" label="查阅人" sortable width="100"  align="center"></el-table-column>
                <el-table-column prop="applymanorg" label="查阅人单位" width="180"  align="center"></el-table-column>
                <el-table-column prop="readingstarttime" label="开始时间" sortable width="110" align="center" :formatter="dateFormat" ></el-table-column>
                <el-table-column prop="readingendtime" label="结束时间" sortable width="110"  align="center" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="applyType" label="查借阅类型" sortable width="120"  align="center"></el-table-column>
                <el-table-column prop="purpose" label="查阅目的" width="200"  align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="contactway" label="联系方式" width="110"  align="center"></el-table-column>
                <el-table-column prop="idnumber" label="身份证号" width="170"  align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="describe" label="详细描述" min-width="170"  align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="status" label="状态" sortable width="100"  align="center" fixed="right">
                	<template slot-scope="scope">
				        <el-tag
				          :type="scope.row.status === '未归还' ? 'warning' : 'success'"
				          disable-transitions>{{scope.row.status}}</el-tag>
				    </template>
                </el-table-column>
            </el-table>
	        <Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
       	</div>
        <!--登记和编辑弹出框 -->
       	<el-dialog class="outDialog" :title='dialogTitle' :visible.sync="registerVisible" width="64%" append-to-body v-if="registerVisible" :close-on-click-modal="false">
       		<Register :registerObj="selectedData" @RegisterCallBack="RegisterCallBack"></Register>
       	</el-dialog>
        <!--归还弹出框 -->
       	<el-dialog class="outDialog" title='归还' :visible.sync="returnVisible" width="64%" append-to-body v-if="returnVisible" :close-on-click-modal="false">
       		<RegisterReturn :registerObj="selectedData" @RegisterReturnCallBack="RegisterCallBack"></RegisterReturn>
       	</el-dialog>
		<!--查看弹出框 -->
       	<el-dialog class="outDialog" title='查看' :visible.sync="readVisible" width="64%" append-to-body v-if="readVisible" :close-on-click-modal="false">
       		<RegisterFileList :registerId="selectedData.id"></RegisterFileList>
       	</el-dialog>
    </div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import Register from './Register.vue';
	import RegisterReturn from './RegisterReturn.vue';
	import RegisterFileList from './RegisterFileList.vue';
	import ApplyTypeSelect from '../../components/ApplyTypeSelect.vue';
    export default {
        name: 'SiteRegister',//现场登记
	    components:{
	        Pagination,//分页组件
	        ApplyTypeSelect,//查借阅类型下拉框
	        Register,//登记
	        RegisterReturn,//登记归还
	        RegisterFileList//查看
	    },
        data() {
            return {
            	tableHeight:'',//table高度
                tableData: [],//列表数据
                pageObj:{
	                pageIndex: this.API.constObj.pageIndex,//当前页码
	                total:0,//数据总数
	                pageSize:this.API.constObj.pageSize,//页大小
                },
                selectedData:{},//选中的数据项
                multipleSelection: [],
                registerVisible: false,//登记弹窗的是否显示
                returnVisible: false,//归还弹窗的是否显示
                readVisible: false,//查看弹窗的是否显示
                dialogTitle: '现场登记',
                searchForm:{
                	applyManName:'',//登记人
                	readingStartTime:'',//查借阅开始日期
                	readingEndTime:'',//查借阅结束日期
                	applyType:''//查借阅类型
                }
            }
        },
        created() {
        },
        mounted(){
        	this.tableHeight = window.innerHeight - (this.$refs.multipleTable.$el.offsetTop) - 70 - 52;
        	this.getData();
        },
        computed: {

        },
        methods: {
	        /*
	         * 分页组件回调方法--子组件回传数据的方法
	         * @param page_obj {Object} 分页信息
	         * page_obj.page_index 当前页下标
	         * page_obj.page_size 页大小
	         */
	        PageTurning(page_obj){
	            this.pageObj.pageIndex = page_obj.page_index;
	            this.pageObj.pageSize = page_obj.page_size;
				this.getData();
	        },
	        /*
	         * 登记组件回调方法--子组件回调数据的方法
	         * @param isRefresh {Boolean} 是否需要刷新数据 true=刷新；false=不刷新
	         */
	        RegisterCallBack(isRefresh){
	            this.registerVisible = false;
	            this.returnVisible = false;
				if(isRefresh){
					this.getData();	
				}
	        },
	        /*
	         * 查借阅类型下拉框组件回调方法--子组件回调数据的方法
	         * @param id {String} 选中的id
	         */
	        ApplyTypeCall(id){
				this.searchForm.applyType = id;
	        },
	        /**
	         * 监听 查借阅开始日期的change事件
	         */
	        startDateChange(){
	        	let startTime = this.searchForm.readingStartTime;
	        	let endTime = this.searchForm.readingEndTime;
	        	if(startTime && startTime.length > 0 && endTime && endTime.length > 0){
	        		let startTimer = new Date(startTime).getTime();
	        		let endTimer = new Date(endTime).getTime();
	        		if(startTimer > endTimer){
	        			this.$message({
				            type: 'error',
				            message: '查借阅开始日期不能大于结束日期!'
			          	});
			          	this.searchForm.readingStartTime ='';
	        		}
	        	}
	        },
	        /**
	         * 监听 查借阅结束日期的change事件
	         */
	        endDateChange(){
	        	let startTime = this.searchForm.readingStartTime;
	        	let endTime = this.searchForm.readingEndTime;
	        	if(startTime && startTime.length > 0 && endTime && endTime.length > 0){
	        		let startTimer = new Date(startTime).getTime();
	        		let endTimer = new Date(endTime).getTime();
	        		if(startTimer > endTimer){
	        			this.$message({
				            type: 'error',
				            message: '查借阅开始日期不能大于结束日期!'
			          	});  
			          	this.searchForm.readingEndTime ='';
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
            			target:'.siteRegister'
            		},
            		method:'post',
                	url:this.API.getBorrowAndReadSite, 
                	data:{
	                	'applyManName':this.searchForm.applyManName,
						'applyType':this.searchForm.applyType,
						'readingStartTime':this.searchForm.readingStartTime,
						'readingEndTime':this.searchForm.readingEndTime,
	                    'pageIndex': this.pageObj.pageIndex,
	                    'pageSize': this.pageObj.pageSize
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.tableData = resData.data.list;
                    	this.pageObj.total= resData.data.total;
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '查询失败，请刷新重试！'
			          	});     
                    }
                }).catch((err) => {
                	console.log("查询查借登记列表="+err);
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
            	return this.commonFun.dateFormat(cellValue,"yyyy-MM-dd");	
            },
            /*
             * 查询
             */
            search() {
            	this.pageObj.pageIndex = this.API.constObj.pageIndex;
                this.getData();
            },
            /*
             * 登记 
             */
            register(){
            	this.selectedData ={};
            	this.dialogTitle = "查借登记";
            	this.registerVisible=true;
            },
            /*
             * 查看
             * @param index {Number} 选中项的index
             * @param row {Object} 选中数据对象
             */
            handleRead(index, row) {
            	this.selectedData = this.tableData[index];
            	this.readVisible=true;
            },
            /*
             * 编辑
             * @param index {Number} 选中项的index
             * @param row {Object} 选中数据对象
             */
            handleEdit(index, row) {
            	this.selectedData = this.tableData[index];
            	this.dialogTitle = "登记编辑";
            	this.registerVisible=true;
            },
            /*
             * 归还
             * @param index {Number} 选中项的index
             * @param row {Object} 选中数据对象
             */
            handleReturn(index, row) {
            	this.selectedData = this.tableData[index];
            	this.returnVisible=true;
            },

            /*
             * @param
             * 请求后台进行登记处理
             * @params id {String} 需要操作的数据id
             * @self {Obj} this对象
             */
            registerData(id,self){
                self.$axios({
                	loading:{
            			isShow:true,
            			target:'.siteRegister'
            		},
            		method:'post',
                	url:self.API.borrowAndReadRegister, 
                	data:{
                		id:id
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	self.$message({
				            type: 'success',
				            message: '登记处理成功!'
				        });
				        self.getData();//重新获取数据
                    }else{
			          	self.$message({
				            type: 'error',
				            message: '登记处理失败，请刷新重试！'
			          	});
                    }
                }).catch((err) => {
                	console.log("登记处理="+err);
                	self.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
            }
        }
    }

</script>
<style  lang="scss" scoped type="text/css">
	el-dialog{
	    .del-dialog-cnt{
	        font-size: 16px;
	        text-align: center
	    }
	}
    .siteRegister{
        width: 100%;
        font-size: 14px;
    }
    .gray{
        color: #dcdfe6;
    }
    .red{
        color: #ff0000;
    }
</style>
