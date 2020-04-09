<template>
	<div class="container readingFile">
		<el-header v-if="readForm.uAreaname">{{readForm.uAreaname}}</el-header>
		<el-main class="firstStep">
			<el-form :model="readForm"  ref="readForm" label-width="120px" class="demo-ruleForm" size="small">
				<el-row :gutter="15">
					<el-col :span="12">
						<el-form-item label="查阅目的">
							<el-input v-model="readForm.cyly" readonly></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="查阅时限(分钟)">
							<el-input v-model="readForm.readingtime" readonly></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="查阅开始时间">
							<el-input v-model="readForm.readingstarttime" readonly></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="查阅结束时间">
							<el-input v-model="readForm.readingendtime" readonly></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="详细描述" >
							<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" v-model="readForm.describe" readonly></el-input>
						</el-form-item>
					</el-col>
					<!--纸质档案-->
					<el-col :span="24" v-if="readForm.rstype ==API.constObj.fileTypeList[1].id">
						<el-form-item label="授权说明" >
							<el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" v-model="readForm.powerDescribe" readonly></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<el-row>
				<el-col :span="24">
					<el-table :data="tableData" class="chioceFileTable" empty-text="暂无数据，请先选择档案" border height="190px">
						<el-table-column type="index" label="序号" align="center" width="50">
							<template slot-scope="scope"> {{scope.$index+1}} </template>
						</el-table-column>
						<el-table-column prop="a0101" label="姓名" width="100"></el-table-column>
						<el-table-column prop="a0104" label="姓别" width="80"></el-table-column>
						<el-table-column prop="a0107" label="出生日期" width="100"></el-table-column>
						<el-table-column prop="a0117" label="民族" width="180"></el-table-column>
						<el-table-column prop="a0111a" label="籍贯"></el-table-column>
						<el-table-column prop="isImpower" label="状态" width="100">
							<template slot-scope="scope">
								<span v-if="scope.row.isImpower===true">已授权</span>
								<span v-else-if='scope.row.isImpower===false'>已拒绝</span>
								<span v-else>处理中</span>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="80" align="center" v-if="readForm.rstype ==API.constObj.fileTypeList[0].id">
							<template slot-scope="scope">
								<el-button type="text" v-if="scope.row.isImpower === true" @click="lookFile(scope.$index, scope.row)">查阅</el-button>
							</template>
						</el-table-column>
					</el-table>
            		<Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
				</el-col>
			</el-row>
		</el-main>
        <!--阅览档案列表弹出框 -->
       	<el-dialog class="outDialog" title='阅览档案' :visible.sync="readingArchivesVisible" width="95%" append-to-body v-if="readingArchivesVisible"  :close-on-click-modal="false" fullscreen :before-close="dialogBeforeClose">
       		<ReadingArchivesList :id="chioceObj.id" ref="readingArchivesListChild" @ReadingArchivesListBack="ReadingArchivesListBack"></ReadingArchivesList>
       	</el-dialog>
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import ReadingArchivesList from './ReadingArchivesList.vue';
	export default {
		name: 'ReadingFile', //查看档案信息
		props:['applyObj'],//选中申请单数据
		components: {
			Pagination,//分页组件
			ReadingArchivesList//查阅十大类档案列表
		},
		data() {
			return {
				readingArchivesVisible:false,//是否显示查阅十大类档案列表
                pageObj:{
	                pageIndex: this.API.constObj.pageIndex,//当前页码
	                total:0,//数据总数
	                pageSize:this.API.constObj.pageSize,//页大小
                },
                chioceObj:{},//表格选中的信息
				readForm: {},//申请单信息
				tableData: [], //选中的档案人员数据
			}
		},
		created() {
			if(this.applyObj){
				this.readForm = this.applyObj;
			}else{
				this.readForm = this.$route.params;	
			}
			this.getFilesById();//根据预约id获取档案人员信息列表
		},
		mounted() {

		},
		computed: {

		},
		methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.pageObj.pageIndex = val;
                this.getFilesById();
            },
	        /*
	         * 分页组件回调方法--子组件回传数据的方法
	         * @param page_obj {Object} 分页信息
	         * page_obj.page_index 当前页下标
	         * page_obj.page_size 页大小
	         */
	        PageTurning(page_obj){
	            this.pageObj.pageIndex = page_obj.page_index;
	            this.pageObj.pageSize = page_obj.page_size;
				this.getFilesById();
	        },
	        /*
	         * 查阅十大类档案列表回调方法--子组件回传数据的方法
	         */
	        ReadingArchivesListBack(){
	        	this.readingArchivesVisible = false;
	        	this.$refs.readingArchivesListChild.clearTimer();
				this.getFilesById();
	        },
	        /**
	         * 弹框关闭前事件
	         */
	        dialogBeforeClose(done){
	        	this.$refs.readingArchivesListChild.clearTimer();
	        	this.readingArchivesVisible = false;
	        },
			/**
			 * 根据预约id获取档案人员信息列表
			 */
			getFilesById(){
                this.$axios({
                	loading:{
            			isShow:true,
            			target:'.readingFile'
            		},
            		method:'get',
                	url:this.API.getA01s, 
                	params:{
	                    id: this.readForm.borrowandreadid,//查借阅单id
	                    stype:this.commonFun.recognitionFileType(this.readForm.rstype),
	                    pageIndex:this.pageObj.pageIndex,
	                    pageSize:this.pageObj.pageSize
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.tableData = resData.data.list;
                    	this.pageObj.total = resData.data.total;
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '查询档案信息失败，请刷新重试！'
			          	});     
                    }
                }).catch((err) =>{
                	console.log("查询档案人员信息列表="+err);
                	this.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
			},
			/**
			 * 查阅 选中的档案
			 * @param index {Number} 选中的列表行号
			 * @param row {Object} 选中行的数据对象
			 */
			lookFile(index,row){
				this.chioceObj = row;
				this.readingArchivesVisible = true;
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.readingFile {
		padding-top:0;
		.el-header, .el-footer {
			background-color: #E9EEF3;
		    color: #333;
		    text-align: center;
		    height: 60px;
		    line-height: 60px;
		    font-size:26px;
		}
		.el-row {
			.el-col {
				.chioceFileTable {
					margin: 10px 0 10px 0;
				}
			}
		}
	}
</style>