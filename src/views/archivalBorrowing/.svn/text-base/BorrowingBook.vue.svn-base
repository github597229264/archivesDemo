<template>
    <div class="borrowingBook">
        <div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>档案查借阅</el-breadcrumb-item>
			  <el-breadcrumb-item>现场查借阅</el-breadcrumb-item>
			  <el-breadcrumb-item>查借预约</el-breadcrumb-item>
			</el-breadcrumb>
        </div>
        <div class="container">
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
			  <el-form-item>
			    <el-button type="primary" icon="el-icon-edit" @click="book">预约</el-button>
			  </el-form-item>
			  <el-form-item>
			    <el-input v-model="searchForm.appointor" placeholder="输入预约人"></el-input>
			  </el-form-item>
			  <el-form-item>
			  	<el-date-picker
			  		style="width:180px;"
			      	v-model="searchForm.appointStartDate"
			      	type="date"
			      	value-format="yyyy-MM-dd"
			      	@change="startDateChange"
			      	placeholder="预约开始日期">
			    </el-date-picker>
			  </el-form-item>
			  <el-form-item>
			  	<el-date-picker 
			  		style="width:180px;"
			      	v-model="searchForm.appointEndDate"
			      	type="date"
			      	value-format="yyyy-MM-dd"
			      	@change="endDateChange"
			      	placeholder="预约结束日期">
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
                <el-table-column fixed label="操作" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button type="text"  v-if="scope.row.status == 2" class="gray">编辑</el-button>
                        <el-button type="text"  v-else  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text"  v-if="scope.row.status == 2" class="gray">登记处理</el-button>
                        <el-button type="text"  v-else  @click="handleBook(scope.$index, scope.row)">登记处理</el-button>
                    </template>
               	</el-table-column>
                <el-table-column type="index" label="序号" align="center" width="50">
					<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
				</el-table-column>
                <el-table-column prop="appointor" label="预约人" sortable min-width="100"  align="center"></el-table-column>
                <el-table-column prop="appointordep" label="预约人部门" min-width="180"  align="center"></el-table-column>
                <el-table-column prop="appointstartdate" label="预约开始时间" sortable width="130" align="center" :formatter="dateFormat" ></el-table-column>
                <el-table-column prop="appointenddate" label="预约结束时间" sortable width="130"  align="center" :formatter="dateFormat"></el-table-column>
                <el-table-column prop="applyType" label="查借阅类型" sortable width="120"  align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="contactway" label="联系方式" width="110"  align="center"></el-table-column>
                <el-table-column prop="idnumber" label="身份证号" width="170"  align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="describe" label="详细描述" min-width="170"  align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="archnames" label="档案名称集合"  min-width="160"  align="center" show-overflow-tooltip></el-table-column>
            </el-table>
            <Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
       	</div>
        <!--预约弹出框 -->
       	<el-dialog class="outDialog" :title='dialogTitle' :visible.sync="bookVisible" width="64%" append-to-body v-if="bookVisible"  :close-on-click-modal="false">
       		<Book :bookObj="editBook" @BookCallBack="BookCallBack"></Book>
       	</el-dialog>
    </div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import Book from './Book.vue';
	import ApplyTypeSelect from '../../components/ApplyTypeSelect.vue';
    export default {
        name: 'BorrowingBook',//查借预约
	    components:{
	        Pagination,//分页组件
	        Book,//预约
	        ApplyTypeSelect//查借阅类型下拉框
	    },
        data() {
            return {
            	tableHeight:'',//table高度
                tableData: [],//列表数据
                pageObj:{
	                pageIndex:this.API.constObj.pageIndex,//当前页码
	                total:0,//数据总数
	                pageSize:this.API.constObj.pageSize,//页大小
                },
                editBook:{},
                multipleSelection: [],
                bookVisible: false,//预约弹窗的是否显示
                dialogTitle: '查借预约',
                searchForm:{
                	appointor:'',//预约人
                	appointStartDate:'',//预约开始日期
                	appointEndDate:'',//预约结束日期
                	applyType:''//查借阅类型
                }
            }
        },
        created() {
        },
        mounted(){
        	this.tableHeight = window.innerHeight - this.$refs.multipleTable.$el.offsetTop - 70 - 52;
        	this.getData();
        },
        computed: {

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
	        PageTurning(page_obj){
	            console.log("分页组件传回的分页信息："+JSON.stringify(page_obj));
	            this.pageObj.pageIndex = page_obj.page_index;
	            this.pageObj.pageSize = page_obj.page_size;
				this.getData();
	        },
	        /*
	         * 预约组件回调方法--子组件回调数据的方法
	         * @isRefresh {Boolean} 是否需要刷新数据 true=刷新；false=不刷新
	         */
	        BookCallBack(isRefresh){
	            this.bookVisible = false;
				if(isRefresh){
					this.getData();	
				}
	        },
	        /*
	         * 查借阅类型下拉框组件回调方法--子组件回调数据的方法
	         * @id {String} 选中的id
	         */
	        ApplyTypeCall(id){
				this.searchForm.applyType = id;
	        },
	        /**
	         * 监听 预约结束日期的change事件
	         */
	        startDateChange(){
	        	let startTime = this.searchForm.appointStartDate;
	        	let endTime = this.searchForm.appointEndDate;
	        	if(startTime && startTime.length > 0 && endTime && endTime.length > 0){
	        		let startTimer = new Date(startTime).getTime();
	        		let endTimer = new Date(endTime).getTime();
	        		if(startTimer > endTimer){
	        			this.$message({
				            type: 'error',
				            message: '预约开始日期不能大于结束日期!'
			          	});
			          	this.searchForm.appointStartDate ='';
	        		}
	        	}
	        },
	        /**
	         * 监听 预约结束日期的change事件
	         */
	        endDateChange(){
	        	let startTime = this.searchForm.appointStartDate;
	        	let endTime = this.searchForm.appointEndDate;
	        	if(startTime && startTime.length > 0 && endTime && endTime.length > 0){
	        		let startTimer = new Date(startTime).getTime();
	        		let endTimer = new Date(endTime).getTime();
	        		if(startTimer > endTimer){
	        			this.$message({
				            type: 'error',
				            message: '预约开始日期不能大于结束日期!'
			          	});
			          	this.searchForm.appointEndDate ='';
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
            			target:'.borrowingBook'
            		},
            		method:'post',
                	url:this.API.getBorrowAndReadAppointList,
                	data:{
	                	appointor:this.searchForm.appointor,
						applyType:this.searchForm.applyType,
						appointStartDate:this.searchForm.appointStartDate,
						appointEndDate:this.searchForm.appointEndDate,
	                    pageIndex: this.pageObj.pageIndex,
	                    pageSize: this.pageObj.pageSize
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
                	console.log("查询查借预约列表="+err);
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
             * 预约 
             */
            book(){
            	this.editBook ={};
            	this.dialogTitle = "查借预约";
            	this.bookVisible=true;
            },
            /*
             * 编辑
             */
            handleEdit(index, row) {
            	this.editBook = this.tableData[index];
            	this.dialogTitle = "预约编辑";
            	this.bookVisible=true;
            },
            /*
             * 登记处理 
             */
            handleBook(index, row) {
                let item = this.tableData[index];
                let self = this;
				this.$confirm('确定要进行现场登记处理吗?', '操作提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          self.bookData(item.id,self);//请求后台进行登记处理
		        }).catch(() => {
		                
		        });
            },
            /*
             * 请求后台进行登记处理
             * @id {String} 需要操作的数据id
             * @self {Obj} this对象
             */
            bookData(id,self){
                self.$axios({
                	loading:{
            			isShow:true,
            			target:'.borrowingBook'
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
    .borrowingBook{
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
