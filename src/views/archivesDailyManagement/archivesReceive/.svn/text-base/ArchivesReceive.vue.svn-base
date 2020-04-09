<!--档案接收-->
<template>
	<div class="archives-receive-container">
		<div class="top">档案接收</div>
		<div class="content">
			<!--标题-->
			<div class="title">
				<div class="left">
					<el-button type="primary" @click="add_receive_popUp=true">添加</el-button>
					<el-button type="danger" @click="deleteDeceive">删除</el-button>
				</div>
				<div class="right">
					<el-input v-model="comeunit" clearable placeholder="请输入来件单位"></el-input>
					<el-button type="primary" @click="search">查询</el-button>
				</div>
			</div>
			<!--表格-->
			<el-table ref="table" :height="tableHeight" highlight-current-row :data="archivesReceiveList" border style="width: 100%;height: 100%;" @row-click="clickRow">
				<el-table-column label="序号" align="center" width="80">
					<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="operation" label="操作" align="center" width="160">
					<template slot-scope="scope">
						<el-button type="text" @click="detail(scope.row,scope.$index)">详细</el-button>
						<el-button type="text" :disabled='scope.row.flag' @click="deal(scope.row,scope.$index)">处理</el-button>
						<el-button type="text" :disabled='scope.row.flag' @click="goBack(scope.row,scope.$index)">退回</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="e01z314" label="来件人员" align="center">
				</el-table-column>
				<el-table-column prop="e01z507a" label="来件单位" show-overflow-tooltip align="center">
				</el-table-column>
				<el-table-column prop="e01z501" label="接收时间" align="center">
				</el-table-column>
				<el-table-column prop="archnames" label="档案人员" show-overflow-tooltip align="center">
				</el-table-column>
				<el-table-column prop="e01z511" label="正本卷总数" align="center">
				</el-table-column>
				<el-table-column prop="valstatusvalue" label="状态" align="center">
				</el-table-column>
				<el-table-column prop="typevalue" label="接收类型" align="center">
				</el-table-column>
			</el-table>
			<!--分页-->
			<div class="material_page">
				<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
			</div>
			<!--详细弹出层-->
			<el-dialog title="详细" :close-on-click-modal="false" width="80%" height="350px" :visible.sync="detail_receive_popUp" v-if='detail_receive_popUp'>
				<archivesReceiveDetail :selectDeceive="selectDeceive"></archivesReceiveDetail>
			</el-dialog>
			<!--新增弹出层-->
			<el-dialog title="档案新增" :close-on-click-modal="false" width="90%" height="350px" :visible.sync="add_receive_popUp" v-if='add_receive_popUp'>
				<archivesReceiveAdd :selectDeceive="selectDeceive" @addback="getAddBack"></archivesReceiveAdd>
			</el-dialog>
			<!--退回弹出层-->
			<el-dialog title="拒绝原因" class="back" :close-on-click-modal="false" width="60%"  :visible.sync="receive_back_popUp" v-if='receive_back_popUp'>
				<archivesReceiveBack class="backBody" :selectDeceive="selectDeceive" @getback="back"></archivesReceiveBack>
			</el-dialog>
			<!--处理弹出层-->
			<el-dialog title="处理" :close-on-click-modal="false" width="80%" height="200px" :visible.sync="receive_deal_popUp" v-if='receive_deal_popUp'>
				<archivesReceiveDeal :selectDeceive="selectDeceive" @dealBack="dealBack"></archivesReceiveDeal>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import pagination from '../../../components/Pagination.vue';
	import archivesReceiveDetail from './ArchivesReceiveDetail.vue';
	import archivesReceiveAdd from './ArchivesReceiveAdd.vue';
	import archivesReceiveBack from './ArchivesReceiveBack.vue';
	import archivesReceiveDeal from './ArchivesReceiveDeal.vue';
	export default {
		name: "ArchivesReceive", //档案接收
		components: {
			pagination,
			archivesReceiveDetail,
			archivesReceiveAdd,
			archivesReceiveBack,
			archivesReceiveDeal
		},
		data() {
			return {
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				comeunit: "", //转往单位
				archivesReceiveList: [], //档案接收集合
				selectDeceive: "", //选中的某行数据
				detail_receive_popUp: false, //详情显示控制标志
				add_receive_popUp: false, //新增显示控制标志
				receive_back_popUp: false, //退回
				receive_deal_popUp: false,//处理
				tableHeight: 0,//给tabale设置高度
			}
		},
		watch:{
			archivesReceiveList:{
				handler:function(newVal){
					this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 41;
				}
			}
		},
		created() {
			this.getPagerE01Z500Json();
		},
		methods: {
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.getPagerE01Z500Json();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getPagerE01Z500Json();
			},
			getPagerE01Z500Json() {
				this.$axios({
					loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.archives-receive-container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},
					method: 'post',
					url: this.API.findAllByPage,
					data: {
						'comeunit': this.comeunit,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.archivesReceiveList = resData.data.list;
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
			search() { //按条件查询
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.getPagerE01Z500Json();
			},
			clickRow(row) { //选中某一条数据
				this.selectDeceive = row;
			},
			deleteDeceive() {
				if(this.selectDeceive == "") {
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
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});

			},
			deleteFromNet() { //请求服务器删除数据
				this.$axios({
					method: 'get',
					url: this.API.deleteFileReceive,
					params: {
						'id': this.selectDeceive.id
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.selectDeceive = "";
						this.$message({
							message: '删除成功！',
							type: 'success'
						});
						this.getPagerE01Z500Json();
					} else {
						this.$message({
							type: 'error',
							message: '删除数据失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			},
			detail(row, index) { //详细
				this.selectDeceive = Object.assign({}, row);
				this.detail_receive_popUp = true;
			},
			deal(row, index) { //处理
				console.log("===");
				this.selectDeceive = Object.assign({}, row);
				this.receive_deal_popUp = true;
			},
			goBack(row, index) { //退回
				this.selectDeceive = Object.assign({}, row);
				this.receive_back_popUp = true;
			},
			getAddBack(data) { //从添加回来的
				this.add_receive_popUp = false;
				if(data == "success") this.getPagerE01Z500Json();
			},
			dealBack() {
				this.receive_deal_popUp = false;
				this.getPagerE01Z500Json();
			},
			back(data) { //从退回回来的
				this.receive_back_popUp = false;
				if(data == "success") this.getPagerE01Z500Json();
			}

		}
	}
</script>

<style lang="scss">
	.archives-receive-container {
		position: relative;
		.top {
			margin: 10px;
		}
		.content {
			background-color: #fff;
			.title {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10px;
				.left {
					display: flex;
				}
				.right {
					display: flex;
					.el-button {
						margin-left: 10px;
					}
				}
			}
			.el-table__body tr.current-row>td {
				background: #DCEBFA !important;
				color: #606266;
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
	}
</style>