<template>
	<div class="registerFileList">
		<el-table id="registerFileTable" :data="tableData" border class="table" height="250px">
            <el-table-column fixed label="操作" width="120" align="center">
                <template slot-scope="scope">
                    <el-button type="text"  @click="handleRead(scope.$index, scope.row)">浏览</el-button>
                    <el-button type="text"  @click="handleFile(scope.$index, scope.row)">数字档案</el-button>
                </template>
           	</el-table-column>
			<el-table-column type="index" label="序号" align="center" width="50">
				<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
			</el-table-column>
			<el-table-column prop="a0101" label="姓名" width="80" align="center"></el-table-column>
			<el-table-column prop="e01za01a" label="档案正副卷类型" width="120" align="center" show-overflow-tooltip></el-table-column>
			<el-table-column prop="e01za01" label="档案卷本号" width="100" align="center"></el-table-column>
			<el-table-column prop="e01za01c" label="档案卷册号" width="100" align="center"></el-table-column>
			<el-table-column prop="e01za07" label="档案柜号" width="80" align="center"></el-table-column>
			<el-table-column prop="e01za10" label="档案层号" width="80" align="center"></el-table-column>
			<el-table-column prop="e01za13" label="档案序号" align="center"></el-table-column>
		</el-table>
		<div class="pagination">
			<Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
		</div>
		<el-dialog fullscreen title="档案阅览" :visible.sync="readingArchivesVisible"  append-to-body v-if="readingArchivesVisible">
			<NoTimerReadingArchivesList :fileObject="fileObject" ></NoTimerReadingArchivesList>
		</el-dialog>
		<el-dialog fullscreen title="人员信息" :visible.sync="browsePersonalVisible"  append-to-body v-if="browsePersonalVisible">
			<BrowsePersonal :selectDeceive="fileObject" fourthShow="hidden" ></BrowsePersonal>
		</el-dialog>
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import NoTimerReadingArchivesList from './NoTimerReadingArchivesList.vue';
	import BrowsePersonal from '../personnelManagement/BrowsePersonal.vue';
	export default {
		name: 'RegisterFileList', //登记档案列表
		components: {
			Pagination, //分页组件
			NoTimerReadingArchivesList,//阅览档案--无倒计时无查询
			BrowsePersonal//档案人员基本信息
		},
		props:["registerId"],
		data() {
			return {
				fileObject:{},//档案对象
				tableData: [], //表格数据
				readingArchivesVisible:false,//阅读器弹窗是否显示
				browsePersonalVisible:false,//档案人员基本信息组件是否显示
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				}
			}
		},
		created() {
		},
		mounted() {
			this.getData();
		},
		computed: {

		},
		methods: {
			// 分页导航
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
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getData();
			},
			/**
			 * 浏览
			 */
			handleRead(index,row){
				this.fileObject = row;
				this.browsePersonalVisible = true;
			},
			/**
			 * 数字档案
			 */
			handleFile(index,row){
				this.fileObject = row;
				this.readingArchivesVisible = true;
			},
			/*
			 * 获取表格档案信息的数据 
			 */
			getData() {
				this.$axios({
                	loading:{
            			isShow:true,
            			target:'#registerFileTable'
            		},
					method: 'get',
					url: this.API.seeSite,
					params: {
						id:this.registerId,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.tableData = resData.data.list;
						this.pageObj.total = resData.data.total;
					} else {
						this.$message({
							type: 'error',
							message: '查询人员档案信息失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("查询人员档案信息列表=" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.registerFileList {
		width: 100%;
	}
</style>