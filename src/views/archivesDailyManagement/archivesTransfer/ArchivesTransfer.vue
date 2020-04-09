<!--档案转递-->
<template>
	<div class="archiver-transfer-container">
		<div class="top">档案转递</div>
		<div class="content">
			<!--标题-->
			<div class="title">
				<el-button type="primary" @click="archivesVisible=true">添加</el-button>
				<div class="right">
					<el-input v-model="transferUnit" clearable placeholder="请输入转往单位名称">查询</el-input>
					<el-button type="primary" @click="search">查询</el-button>
				</div>
			</div>
			<!--表格-->
			<el-table ref="table" :height="tableHeight" :data="archivesTransferList" border style="width: 100%;height: 100%;">
				<el-table-column label="序号" align="center" width="60">
					<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="operation" label="操作" align="center" width="100">
					<template slot-scope="scope">
						<el-button type="text" @click="detail(scope.row,scope.$index)">详细</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="e01z717" label="经办人员" style="width: 10%;" align="center">
				</el-table-column>
				<el-table-column prop="e01z704a" label="转往单位" align="center" width="154">
				</el-table-column>
				<el-table-column prop="e01z701" label="转递日期" width="140" align="center">
				</el-table-column>
				<el-table-column prop="archnames" label="档案人员" show-overflow-tooltip style="width: 10%;" align="center">
				</el-table-column>
				<el-table-column prop="e01z724" label="回执人员" style="width: 10%;" align="center">
				</el-table-column>
				<el-table-column prop="e01z727" label="回执日期" align="center" width="140">
				</el-table-column>
				<el-table-column prop="valstatusvalue" label="状态" align="center" style="width: 10%;">
				</el-table-column>
			</el-table>
			<!--分页-->
			<div class="material_page">
				<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
			</div>
		</div>
		<!--添加的对话框-->
		<el-dialog width="80%" :close-on-click-modal="false" title="添加" :visible.sync="archivesVisible" v-if="archivesVisible">
			<addArchivesTransfer @back="getBack"></addArchivesTransfer>
		</el-dialog>
		<!--详细的对话框-->
		<el-dialog width="70%" :close-on-click-modal="false" title="详细" :visible.sync="detailVisible" v-if="detailVisible">
			<archivesTransferDetail :selectArchives="selectArchives" @back="getBack"></archivesTransferDetail>
		</el-dialog>
	</div>
</template>
<script>
	import pagination from '../../../components/Pagination.vue';
	import addArchivesTransfer from './AddArchivesTransfer.vue';
	import archivesTransferDetail from './ArchivesTransferDetail.vue';
	export default {
		data() {
			return {
				transferUnit: "", //转往单位名称
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				archivesTransferList: [], //档案转递集合
				archivesVisible: false, //添加对话框是否显示
				detailVisible: false, //详情对话框是否显示
				selectArchives: "", //选择的数据
				tableHeight: 0,//给tabale设置高度
			}
		},
		watch:{
			archivesTransferList:{
				handler:function(newVal){
					this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 30;
				}
			}
		},
		components: {
			pagination,
			addArchivesTransfer,
			archivesTransferDetail
		},
		created() {
			this.getPagerE01Z700Json();
		},
		methods: {
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.getPagerE01Z700Json();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getPagerE01Z700Json();
			},
			getPagerE01Z700Json() { //获取列表数据
				this.$axios({
					loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.archiver-transfer-container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},
					method: 'get',
					url: this.API.filetransfer,
					params: {
						'transferUnit': this.transferUnit,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.archivesTransferList = resData.data.list;
						this.pageObj.total = resData.data.total;
						console.log(this.pageObj.total);
					} else {
						this.$message({
							type: 'error',
							message: '获取数据失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			},
			search() { //更加转往单位进行搜索
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.getPagerE01Z700Json();
			},
			getBack(data) {
				this.archivesVisible = false;
				if(data == "success") this.getPagerE01Z700Json();
			},
			detail(row, index) { //详细
				console.log("row" + row + "====index" + index);
				this.selectArchives = Object.assign({}, row);
				this.detailVisible = true;
			}
		}
	}
</script>

<style lang="scss">
	.archiver-transfer-container {
		.top {
			padding: 10px;
		}
		.content {
			background-color: #fff;
			.title {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10px;
				.right {
					display: flex;
					.el-button {
						margin-left: 10px;
					}
				}
			}
			.material_page {
				margin-top: 10px;
				text-align: right;
			}
		}
		.el-dialog {
			position: absolute;
			top: 50%;
			left: 50%;
			margin: 0 !important;
			transform: translate(-50%, -50%);
			max-height: calc(100% - 30px);
			max-width: calc(100% - 30px);
			display: flex;
			flex-direction: column;
			background-color: #fff;
			.el-dialog__body {
				overflow: auto;
			}
		}
	}
</style>