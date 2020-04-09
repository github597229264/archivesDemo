<template>
	<div class="authorizedfiles-page-container">
		<!--表格-->
		<el-table class="material_table" ref="table" highlight-current-row :data="authorizedfilesList" empty-text="暂无数据" @row-click="clickRow" border style="width: 100%;" height="350px">
			<el-table-column label="序号" align="center" width="50">
				<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
			</el-table-column>
			<el-table-column label="浏览" width="120px" align="center">
				<template slot-scope="scope">
					<el-button type="text" @click="browsePersonalOnclick(scope.$index, scope.row)">浏览</el-button>
					<el-button type="text"  @click="handleFile(scope.$index, scope.row)">数字档案</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="a0101" label="姓名" align="center" show-overflow-tooltip width="80">
			</el-table-column>
			<el-table-column prop="a0104a" label="性别" align="center" show-overflow-tooltip width="60">
			</el-table-column>
			<el-table-column prop="a0107" label="出生年月" align="center" show-overflow-tooltip width="80">
			</el-table-column>
			<el-table-column prop="a0111a" label="籍贯" align="center" show-overflow-tooltip width="60">
			</el-table-column>
			<el-table-column prop="a0117a" label="民族" align="center" show-overflow-tooltip width="80">
			</el-table-column>
			<el-table-column prop="a0134" label="参加工作日期" align="center" show-overflow-tooltip width="130">
			</el-table-column>
			<el-table-column prop="a0141a" label="政治面貌" align="center" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="a0144" label="参加组织日期" align="center" show-overflow-tooltip width="130">
			</el-table-column>
			<el-table-column prop="e1001" label="文化程度" align="center" show-overflow-tooltip>
			</el-table-column>
			<el-table-column prop="e10040" label="现职单位及职务" align="center" show-overflow-tooltip width="150">
			</el-table-column>
		</el-table>
		<!--分页-->
		<div class="material_page">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		</div>
		<!--浏览弹出层-->
		<el-dialog title="人员信息" width="100%" fullscreen :visible.sync="browse_personal" v-if='browse_personal' :close-on-click-modal="false" append-to-body>
			<browsePersonal :fourthShow='fourthShow' :selectDeceive="selectMetadata"></browsePersonal>
		</el-dialog>
		<!--数字档案-->
		<el-dialog fullscreen title="档案阅览" :visible.sync="readingArchivesVisible"  append-to-body v-if="readingArchivesVisible">
			<noTimerReadingArchivesList :fileObject="selectMetadata" ></noTimerReadingArchivesList>
		</el-dialog>
	</div>
</template>

<script>
	import pagination from '../../../components/Pagination.vue';
	import browsePersonal from '../../personnelManagement/BrowsePersonal.vue';
	import noTimerReadingArchivesList from '../../archivalBorrowing/NoTimerReadingArchivesList.vue';
	export default {
		name: "AuthorizedfilesPage", //授权档案
		components: {
			pagination,
			browsePersonal,
			noTimerReadingArchivesList
		},
		props: ['id'],
		data() {
			return {
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				authorizedfilesList: [], //授权列表
				selectMetadata:"",//选中的数据
				browse_personal: false, //浏览显示控件标志
				readingArchivesVisible:false,//阅读器弹窗是否显示
				fourthShow: 'hidden', //档案利用情况不显示
			}
		},
		created() {
			this.findAuthorizedfilesPage();
		},
		methods: {
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.findAuthorizedfilesPage();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.findAuthorizedfilesPage();
			},
			findAuthorizedfilesPage() { //（查看档案）档案授权结果列表
				this.$axios({
					method: 'get',
					url: this.API.findAuthorizedfilesPage,
					params: {
						'id': this.id,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.authorizedfilesList = resData.data.list;
						this.pageObj.total = resData.data.total;
					} else {
						this.$message({
							type: 'error',
							message: '查询失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("查询授权档案" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			browsePersonalOnclick(index, row) { //点击浏览
				this.browse_personal = true;
				this.chioceObj = this.cadreInformationList[index].a0100;
			},
			handleFile(index,row){//数字档案
				this.selectCadres = row;
				this.readingArchivesVisible = true;
			},
			clickRow(row) { //选中某一条数据
				this.selectMetadata = row;
			},
		}
	}
</script>

<style lang="scss">
	.authorizedfiles-page-container {
		.material_page {
			margin-top: 10px;
			text-align: right;
		}
		.el-table__body tr.current-row>td {
		        background: #DCEBFA !important;
		        color:#606266;
		}
	}
</style>