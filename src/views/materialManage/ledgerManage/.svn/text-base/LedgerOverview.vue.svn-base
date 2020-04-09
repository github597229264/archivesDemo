<!--总览-->
<template>
	<div class="ledger-overview-container">
		<div class="title1">
			<div class="left">
				<div><span>档案人员</span>
					<el-input v-model="ledgerForm.a0101" clearable></el-input>
				</div>
				<div><span>来件人员</span>
					<el-input v-model="ledgerForm.e01z314" clearable></el-input>
				</div>
				<div><span>来件部门</span>
					<el-input v-model="ledgerForm.e01z204a" clearable></el-input>
				</div>
			</div>
			<el-button class="search" type="primary" @click="search">查询</el-button>
		</div>
		<div class="title2">
			<div><span>来源类型</span>
				<el-select v-model="ledgerForm.sourcetype" clearable placeholder="请选择" style="width:100%">
					<el-option v-for="item in materialTypes1" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div><span>处理状态</span>
				<el-select v-model="ledgerForm.e01z237" clearable placeholder="请选择" style="width:100%">
					<el-option v-for="item in materialTypes2" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div><span>数据状态</span>
				<el-select v-model="ledgerForm.valstatus" clearable placeholder="请选择" style="width:100%">
					<el-option v-for="item in materialTypes3" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
		</div>
		<!--表格-->
		<el-table class="material_table" ref="table" :height="tableHeight" empty-text="暂时没有数据！" :data="pagerList" border style="width: 100%;">
			<el-table-column label="序号" align="center" width="60">
				<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
			</el-table-column>
			<el-table-column prop="operation" label="操作" align="center" width="144">
				<template slot-scope="scope">
					<el-button type="text" :disabled='scope.row.flag' @click="deal(scope.row)">处理</el-button>
					<el-button type="text" :disabled='scope.row.archiveFlag' @click="archive(scope.row)">归档</el-button>
					<el-button type="text" :disabled='scope.row.undoFlag' @click="undo(scope.row)">撤销</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="a0101" label="档案人员姓名" width="120" align="center">
			</el-table-column>
			<el-table-column prop="e01z211a" label="材料名称" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="e01z211" label="材料类别" align="center">
			</el-table-column>
			<!--<el-table-column prop="e01z314" label="来件人员" show-overflow-tooltip align="center">
			</el-table-column>-->
			<el-table-column prop="e01z204a" label="来件部门" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="e01z201" label="接收时间" align="center">
			</el-table-column>
			<el-table-column prop="e01z207" label="接收人" show-overflow-tooltip align="center">
			</el-table-column>
			<el-table-column prop="e01z124" label="份数" align="center" width="60">
			</el-table-column>
			<el-table-column prop="sourcetypeValue" label="来源类型" align="center">
			</el-table-column>
			<el-table-column prop="e01z237Value" label="是否已处理" align="center" width="100">
			</el-table-column>
			<el-table-column prop="valstatusValue" label="数据状态" align="center" show-overflow-tooltip>
			</el-table-column>
		</el-table>
		<!--分页-->
		<div class="material_page">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		</div>
		<el-dialog width="60%" height="500px" title="添加人员" :visible.sync="innerVisible" append-to-body>
			<fileSelection @GetChioceFiles="getChioceFiles" :isledger="true"></fileSelection>
		</el-dialog>
	</div>

</template>

<script>
	import pagination from '../../../components/Pagination.vue';
	import fileSelection from '../../../components/FileSelection.vue';
	export default {
		name: "LedgerOverview", //台账管理--总览
		data() {
			return {
				tableHeight: 0,//给tabale设置高度
				innerVisible: false, //人员添加
				name: '', //人员姓名
				ledgerForm: {
					a0101: "", //档案人员
					e01z314: '', //来件人员
					e01z204a: "", //来件部门
					sourcetype: "", //来源类型
					e01z237: "", //处理状态
					valstatus: "", //数据状态
				},
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				materialTypes1: [{ //来源类型
					value: '1',
					label: '接收'
				}, {
					value: '0',
					label: '手录'
				}],
				materialTypes2: [{ //处理状态
					value: '1',
					label: '已处理'
				}, {
					value: '0',
					label: '未处理'
				}],
				materialTypes3: [{ //数据状态
					value: '0',
					label: '已入散材料库'
				}, {
					value: '1',
					label: '未归档'
				}, {
					value: '2',
					label: '已归档'
				}, {
					value: '3',
					label: '已转出'
				}],
				pagerList: [], //列表集合
				chartData: { //饼图的数据
					totleNum: "", //接收材料总数
					processeNum: "", //处理材料总数
					guidangNum: "", //归档材料总数
					forwardNum: "", //转递材料总数
					returnNum: "", //退回材料总数
				},
				status: 1, //status
				data: [], //统计的数据
				selectLedger: "", //选中的数据
				a0100:"",//归档选择用户的id
			}
		},
		watch:{
			pagerList:{
				handler:function(newVal){
					this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 41 - 72;
				}
			}
		},
		created() {
			this.getPagerList();
		},
		methods: {
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.getPagerList();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getPagerList();
			},
			getPagerList() { //获取列表集合
				this.$axios({
					loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.ledger-overview-container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},
					method: 'post',
					url: this.API.queryAllByPage,
					data: {
						'startTime': "",
						'endTime': "",
						'a0101': this.ledgerForm.a0101,
						'e01z314': this.ledgerForm.e01z314,
						'e01z204a': this.ledgerForm.e01z204a,
						'sourcetype': this.ledgerForm.sourcetype,
						'e01z237': this.ledgerForm.e01z237,
						'valstatus': this.ledgerForm.valstatus,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.pagerList = resData.data.list;
						this.pagerList.forEach(item => {
							if(item.e01z237Value === "已处理" || item.valstatusValue == "已转出") item.flag = true;
							else item.flag = false;
							if(item.valstatusValue == "已归档") item.undoFlag = false;
							else item.undoFlag = true;
							if((item.valstatusValue == "未归档" || item.valstatusValue == "已入三材料库") && item.e01z237Value == "已处理") item.archiveFlag = false;
							else item.archiveFlag = false;
						})
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
			search() { //根据多个条件查询
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.getPagerList();
			},
			deal(row) { //处理 //0 撤销 1 处理钮传 2归档
				this.$confirm('您确定要处理该散材料吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.status = "1";
					this.selectLedger = Object.assign({}, row);
					this.doDeal();
				}).catch(() => {
					this.selectDeceive = "";
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			doDeal() { //处理散材料
				this.$axios({
					method: 'get',
					url: this.API.modifyTheState,
					params: {
						'id': this.selectLedger.id,
						'state': this.status, //0 撤销 1 处理钮传 2归档
						'a0101': this.name,
						'a0100':this.a0100
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						let msg = "";
						if(this.status == "1") msg = "处理成功！";
						else if(this.status == "0") msg = "撤销成功！";
						else if(this.status == "2") msg = "归档成功！";
						this.$message({
							message: msg,
							type: 'success'
						});
						this.getPagerList();
					} else {
						this.$message({
							type: 'error',
							message: '操作失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			},
			archive(row) { //归档,进入人员选择界面
				this.selectLedger = Object.assign({}, row);
				if((this.selectLedger.valstatusValue == "未归档" || this.selectLedger.valstatusValue == "已入散材料库") && this.selectLedger.e01z237Value == "已处理") {
					this.innerVisible = true;
				} else {
					this.$confirm('状态为已转出或者已归档的不能进行操作！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
			},
			getChioceFiles(data) { //从人员选择中过来了
				this.innerVisible = false;
				data = data[0];
				this.name = data.a0101;
				this.a0100 = data.a0100;
				if(this.selectLedger.a0101 != data.a0101) {
					this.$confirm('确定接收档案人员与归档档案人员不一致是否确认归档？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						center: true
					}).then(() => {
						this.status = "2";
						this.doDeal();
					}).catch(() => {
						this.selectDeceive = "";
						this.$message({
							type: 'info',
							message: '已取消'
						});
					});
					return;
				}
				this.$confirm('您确定要归档该散材料吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.status = "2";
					this.doDeal();
				}).catch(() => {
					this.selectDeceive = "";
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			undo(row) { //撤销
				this.selectLedger = Object.assign({}, row);
				this.name = this.selectLedger.a0101;
				this.$confirm('您确定要撤销吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.status = "0";
					this.doDeal();
				}).catch(() => {
					this.selectDeceive = "";
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			}
		},
		components: {
			pagination,
			fileSelection
		}
	}
</script>

<style lang="scss" scoped>
	.ledger-overview-container {
		font-size: 14px;
		.title1 {
			display: flex;
			justify-content: space-between;
			.left {
				display: flex;
				div {
					display: flex;
					width: 300px;
					margin-right: 20px;
					align-items: center;
					span {
						width: 78px;
						margin-right: 5px;
					}
				}
			}
			.search {
				text-align: center;
			}
		}
		.title2 {
			margin: 10px 0;
			display: flex;
			div {
				width: 300px;
				display: flex;
				margin-right: 20px;
				align-items: center;
				span {
					width: 78px;
					margin-right: 5px;
				}
			}
		}
		.material_page {
			margin: 10px 0;
			text-align: right;
		}
	}
</style>