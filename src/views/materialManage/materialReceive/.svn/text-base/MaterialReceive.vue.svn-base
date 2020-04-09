<!--材料接收模块-->
<template>
	<div class="material_Batch_receive_container">
		<h4>材料接收</h4>
		<!--body-->
		<div class="material_body">
			<!--导航条-->
			<div class="title">
				<div class="left">
					<el-button type="primary" @click="receiveAdd">添加</el-button>
					<el-button type="primary" @click="receiveEidt">编辑</el-button>
					<el-button type="danger" @click="receiveDel">刪除 </el-button>
				</div>
				<div class="right">
					<el-input v-model="e01z204a" clearable placeholder="来件单位"></el-input>
					<el-input v-model="e01z207" clearable placeholder="接收人员"></el-input>
					<div class="block">
						<el-date-picker v-model="startDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="材料开始日期">
						</el-date-picker>
					</div>
					<div class="block">
						<el-date-picker v-model="endDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss" placeholder="材料结束日期">
						</el-date-picker>
					</div>
					<el-button type="primary" @click="search">查询</el-button>
				</div>
			</div>
			<!--表格-->
			<el-table class="material_table" highlight-current-row ref="table" :height="tableHeight" :data="receiveList" border style="width: 100%;" @row-click="clickRow">
				<el-table-column label="序号" align="center" width="60">
					<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="operation" label="操作" align="center" width="80">
					<template slot-scope="scope">
						<el-button type="text" @click="detail(scope.row,scope.$index)">详细</el-button>
						<!--TODO:二期做-->
						<el-button type="text" @click="receive">接收</el-button>
						<el-button type="text" @click="receive_back_popUp = true">退回</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="e01z204a" label="来件单位" show-overflow-tooltip align="center">
				</el-table-column>
				<el-table-column prop="e01z201" label="接收时间" align="center">
				</el-table-column>
				<el-table-column prop="e01z207" label="接收人员" align="center">
				</el-table-column>
				<el-table-column prop="archnames" label="档案人员" show-overflow-tooltip align="center">
				</el-table-column>
				<el-table-column prop="statusValue" label="状态" align="center">
				</el-table-column>
				<el-table-column prop="forwardTypeValue" label="接收方式" align="center">
				</el-table-column>
			</el-table>
			<!--分页-->
			<div class="material_page">
				<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
			</div>
		</div>
		<!--详细弹出层-->
		<el-dialog title="详情" :close-on-click-modal="false" width="80%" max-height="80%" :visible.sync="detail_receive_popUp" v-if='detail_receive_popUp'>
			<materialReceiveDetail :selectMaterial="selectDeceive" @back="getBack"></materialReceiveDetail>
		</el-dialog>
		<!--新增，编辑弹出层-->
		<el-dialog :title="dialogTitle" :close-on-click-modal="false" width="80%" max-height="80%" :visible.sync="add_receive_popUp" v-if='add_receive_popUp'>
			<mterialReceiveAddEidt :selectMaterial="selectDeceive" @backAdd="getAddBack"></mterialReceiveAddEidt>
		</el-dialog>
		<el-dialog title="退回" :close-on-click-modal="false" width="50%" height="200px" :visible.sync="receive_back_popUp" v-if='receive_back_popUp'>
			<receiveBack @backreceive="getBack"></receiveBack>
		</el-dialog>
	</div>
</template>

<script>
	import pagination from '../../../components/Pagination.vue';
	import materialReceiveDetail from './MaterialReceiveDetail.vue';
	import mterialReceiveAddEidt from './MaterialReceiveAddEidt.vue';
	import receiveBack from './ReceiveBack.vue';

	export default {
		name: "MaterialReceive", //
		data() {
			return {
				startDate: '', //开始时间
				endDate: '', //结束时间
				e01z204a: '', //来件单位
				e01z207: '', //来件人
				receiveList: [],
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				//				selectMaterialReceive: "", //选中的条目
				detail_receive_popUp: false, //详细的弹框
				add_receive_popUp: false, //新增和编辑的弹框
				receive_back_popUp: false, //退回的对话框
				selectDeceive: "", //选中的数据
				dialogTitle: "", //新增编辑
				status: "", //退回原因
				tableHeight: 0,//给table设置高度
				//				flag:false//false:已入台账，true未入台账
			}
		},
		watch: {
			receiveList: {
				handler: function(newVal) {
					this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 41;
				}
			}
		},
		created() {
			this.queryPageAll();
		},
		methods: {
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.queryPageAll();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.queryPageAll();
			},
			queryPageAll() { //获取材料接收列表
				this.$axios({
					loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.material_Batch_receive_container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},
					method: 'post',
					url: this.API.queryPageAll,
					data: {
						'comeUnit': this.e01z204a,
						'receiveName': this.e01z207,
						'startTime': this.startDate,
						'endTime': this.endDate,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.receiveList = resData.data.list;
						this.pageObj.total = resData.data.total;
						console.log(this.pageObj.total);
						this.receiveList.forEach(item => {
							if(item.statusValue == "未入台账") {
								item.flag = false;
							} else {
								item.flag = true;
							}
						})
						console.log(this.receiveList);
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
			search() { //查询
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.queryPageAll();
			},
			receiveAdd() { //添加
				this.dialogTitle = "新增";
				this.add_receive_popUp = true;
				this.selectDeceive = "";
			},
			receiveEidt() { //编辑
				if(this.selectDeceive == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				console.log("=selectDeceive=" + this.selectDeceive);
				this.dialogTitle = "编辑";
				this.add_receive_popUp = true;
			},
			receiveDel() { //删除
				if(this.selectDeceive == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				this.$confirm('您确认删除这条数据吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deleteDataFromS();
				}).catch(() => {
					this.selectDeceive = "";
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			deleteDataFromS() {
				this.$axios({
					method: 'get',
					url: this.API.deleteByIde01z200,
					params: {
						'id': this.selectDeceive.id
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.selectDeceive = "";
						this.$confirm('删除成功！', '提示', {
							confirmButtonText: '确定',
							showCancelButton: false,
							type: 'warning',
							center: true
						}).then(() => {
							this.queryPageAll();
						});
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
			detail(row, index) { //详细
				console.log("row" + row + "====index" + index);
				this.selectDeceive = Object.assign({}, row);
				this.detail_receive_popUp = true;
			},
			clickRow(row) { //选中某一条数据
				this.selectDeceive = row;
			},
			getAddBack(data) {
				this.add_receive_popUp = false;
				if(data == "cancle") return;
				this.queryPageAll();
			},
			receive() { //接收
				this.$confirm('确定要接收该材料？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.toRecive();
				}).catch(() => {
					this.selectDeceive = "";
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			toRecive() { //请求服务器接收材料
				this.$axios({
					method: 'post',
					url: this.API.changeStatus,
					data: {
						'id': this.selectDeceive.id,
						"status": this.status
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.selectDeceive = "";
						if(this.status == "") {
							this.$message('接收成功！');
						} else {
							this.$message('退回成功！');
						}
						this.queryPageAll();
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
			back() { //退回

			},
			getBack(data) { //退回界面返回的数据
				this.receive_back_popUp = false;
				if(data == "") return;
				this.status = data;
				this.toRecive();
			}
		},
		components: {
			pagination,
			materialReceiveDetail,
			mterialReceiveAddEidt,
			receiveBack
		}
	}
</script>

<style lang="scss">
	.material_Batch_receive_container {
		padding: 3px;
		background-color: #f5f5f5;
		h4 {
			font-size: 16px;
			line-height: 40px;
			margin-left: 15px;
			vertical-align: center;
			border-bottom: 1px solid #dfdfdf;
		}
		.material_body {
			height: 100%;
			background-color: #fff;
			padding: 10px;
			.title {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				margin-bottom: 10px;
				.el-button {
					size: small;
					color: white;
					text-align: center;
				}
				.left {}
				.right {
					display: flex;
					.el-input {
						padding-right: 5px;
						width: 150px;
					}
				}
			}
			.el-table__body tr.current-row>td {
				background: #DCEBFA !important;
				color: #606266;
			}
		}
		.material_page {
			margin-top: 10px;
			text-align: right;
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