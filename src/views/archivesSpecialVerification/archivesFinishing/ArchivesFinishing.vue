<template>
	<el-container class="archives-finishing-container">
		<el-header style="height: 45px;">档案整理</el-header>
		<el-main>
			<!--标题-->
			<div class="archives-finishing-title">
				<div class="left">
					<el-button type="primary" @click="addFinishing">添加</el-button>
					<el-button type="primary" @click="eidtFinishing">编辑</el-button>
					<el-button type="danger" @click="delFinishing">删除</el-button>
				</div>
				<div class="right">
					<el-date-picker v-model="startTime" type="date" placeholder="开始整理日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
					<el-date-picker v-model="endTime" type="date" placeholder="截止整理日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
					<el-input v-model="a0101" placeholder="档案人员姓名"></el-input>
					<el-button type="primary" @click="search">查询</el-button>
				</div>
			</div>
			<div class="archives-finishing-content">
				<!--表格-->
				<el-table :data="archivesFinishingList" highlight-current-row @row-click="clickRow" ref="table" border style="width: 100%;" :height="tableHeight">
					<el-table-column label="序号" align="center" width="60px">
						<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
					</el-table-column>
					<el-table-column prop="a0101" label="档案人员" align="center" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="e01z601" label="整理日期" width="134" align="center">
					</el-table-column>
					<el-table-column prop="e01z604" label="正本书" align="center" width="100">
					</el-table-column>
					<el-table-column prop="e01z607" label="副本数" width="100" align="center">
					</el-table-column>
					<el-table-column prop="e01z611" label="整理人" align="center" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="e01z614" label="审核人" align="center" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="e01z617" label="备注" width="120px" align="center" show-overflow-tooltip>
					</el-table-column>
				</el-table>
				<!--分页-->
				<div class="finishing_page">
					<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
				</div>
			</div>
		</el-main>
		<!--新增弹出层-->
		<el-dialog title="添加" width="60%" :close-on-click-modal="false" :visible.sync="add_finishing_popUp" v-if='add_finishing_popUp'>
			<archivesFinishingAdd :selectFinishing="selectFinishing" @addback="getAddBack"></archivesFinishingAdd>
		</el-dialog>
		<!--编辑弹出层-->
		<el-dialog title="编辑" width="60%" :close-on-click-modal="false" :visible.sync="edit_finishing_popUp" v-if='edit_finishing_popUp'>
			<archivesFinishingAdd :selectFinishing="selectFinishing" @addback="getAddBack"></archivesFinishingAdd>
		</el-dialog>
	</el-container>
</template>

<script>
	import pagination from '../../../components/Pagination.vue';
	import archivesFinishingAdd from './ArchivesFinishingAdd.vue';
	export default {
		name: "ArchivesFinishing", //档案整理
		components: {
			pagination,
			archivesFinishingAdd
		},
		data() {
			return {
				startTime: "", //开始整理日期
				endTime: "", //截止整理日期
				a0101: "", //档案人员姓名
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				archivesFinishingList: [], //档案整理列表
				selectFinishing: "", //选中的数据
				add_finishing_popUp: false, //控制新增是否显示
				edit_finishing_popUp: false, //控制编辑是否显示
				tableHeight: 0,//给tabale设置高度
			}
		},
		watch:{
			archivesFinishingList:{
				handler:function(newVal){
					this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 41;
				}
			}
		},
		created() {
			this.getData();
		},
		methods: {
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.getData();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getData();
			},
			getData() { //获取列表数据
				this.$axios({
					loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.archives-finishing-container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},
					method: 'post',
					url: this.API.queryByPageList,
					data: {
						'a0101': this.a0101,
						'startTime': this.startTime,
						'endTime': this.endTime,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.archivesFinishingList = resData.data.list;
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
			clickRow(row) { //选中某一条数据
				this.selectFinishing = row;
			},
			addFinishing() { //新增
				this.selectFinishing = "";
				this.add_finishing_popUp = true;
			},
			eidtFinishing() { //编辑
				if(this.selectFinishing == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				this.edit_finishing_popUp = true;
			},
			delFinishing() { //删除
				if(this.selectFinishing == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				this.$confirm('确定删除选中记录?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.deleteFromNet();
				}).catch(() => {
					this.selectFinishing = "";
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			deleteFromNet() {
				this.$axios({
					method: 'get',
					url: this.API.deleteFileClearUp,
					params: {
						'id': this.selectFinishing.e01z600
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.selectFinishing = "";
						this.$message("删除成功");
						this.getData();
					} else {
						this.$message({
							type: 'error',
							message: '删除失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			},
			search() { //查询
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.getData();
			},
			getAddBack(data, data2) {
				this.selectFinishing = "";
				if(data2 == "success") this.getData();
				if(data == "edit") this.edit_finishing_popUp = false;
				else this.add_finishing_popUp = false;
			}
		}
	}
</script>

<style lang="scss">
	.archives-finishing-container {
		position: relative;
		.el-header {
			padding-top: 15px;
		}
		.el-main {
			background-color: #fff;
			height: 100%;
			.archives-finishing-title {
				display: flex;
				justify-content: space-between;
				.left {
					display: flex;
				}
				.right {
					display: flex;
					.el-date-picker {
						margin-right: 10px;
					}
					.el-input {
						width: 150px;
						margin-right: 10px;
					}
				}
			}
			.archives-finishing-content {
				margin-top: 10px;
				.finishing_page {
					margin-top: 10px;
					text-align: right;
				}
				.el-table__body tr.current-row>td {
					background: #DCEBFA !important;
					color: #606266;
				}
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