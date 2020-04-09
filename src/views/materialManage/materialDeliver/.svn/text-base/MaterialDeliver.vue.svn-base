<!--材料转递模块-->
<template>
	<div class="material-deliver-container">
		<h4>材料转递</h4>
		<div class="deliver_body">
			<!--导航条-->
			<div class="title">
				<div class="left">
					<el-button type="primary" @click="addDeliver">添加</el-button>
					<el-button type="primary" @click="deleteItem">删除</el-button>
				</div>
				<div class="right">
					<el-input v-model="e01z4103a" placeholder="转往单位" clearable></el-input>
					<el-date-picker v-model="startTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss" placeholder="材料开始日期">
					</el-date-picker>
					<el-date-picker v-model="endTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss" placeholder="材料结束日期">
					</el-date-picker>
					<el-button type="primary" @click="search">查询</el-button>
				</div>
			</div>
			<!--表格-->
			<el-table class="material_table" highlight-current-row :data="materialtransferList" @row-click="clickRow" ref="table" border style="width: 100%;" :height="tableHeight">
				<el-table-column label="序号" align="center" width="60px">
					<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
				</el-table-column>
				<el-table-column label="操作" width="80px" align="center">
					<template slot-scope="scope">
						<el-button type="text" @click="detail(scope.row,scope.$index)">详细</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="e01z4113" label="经办人员" show-overflow-tooltip style="width: 10%;" align="center">
				</el-table-column>
				<el-table-column prop="e01z4103a" label="转往单位" show-overflow-tooltip width="134" align="center">
				</el-table-column>
				<el-table-column prop="e01z4104" label="转出时间" style="width: 10%;" align="center">
				</el-table-column>
				<!--<el-table-column prop="e01z407" label="接收人员" show-overflow-tooltip width="154" align="center">
				</el-table-column>-->
				<el-table-column prop="archnames" label="档案人员" show-overflow-tooltip style="width: 10%;" align="center">
				</el-table-column>
				<el-table-column prop="transferouttypeValue" label="转递方式" style="width: 8%;" align="center">
				</el-table-column>
				<el-table-column prop="statusValue" label="状态" width="80px" align="center">
				</el-table-column>
				<!--<el-table-column prop="backcontent" label="反馈原因" show-overflow-tooltip style="width: 10%;" align="center">
				</el-table-column>-->
			</el-table>
			<!--分页-->
			<div class="material_page">
				<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
			</div>
		</div>
		<!--详细弹出层-->
		<el-dialog title="详情" :close-on-click-modal="false" width="80%" height="350px" :visible.sync="detail_deliver_popUp" class="Popups" v-if='detail_deliver_popUp'>
			<materialDeliverDetail :selectMaterial="selectMaterialDeliver" @back="getBack"></materialDeliverDetail>
		</el-dialog>
		<!--新增弹出层-->
		<el-dialog title="新增" :close-on-click-modal="false" width="80%" height="350px" :visible.sync="adddeliver_popUp" class="Popups" v-if='adddeliver_popUp'>
			<materialDeliverAdd @back="addBack"></materialDeliverAdd>
		</el-dialog>
	</div>
</template>

<script>
	import pagination from '../../../components/Pagination.vue';
	import materialDeliverDetail from './MaterialDeliverDetail.vue';
	import materialDeliverAdd from './MaterialDeliverAdd.vue';

	export default {
		name: "MaterialDeliver", //材料转递
		data() {
			return {
				delSelectMaterial: "", //删除选中某一条
				dailogTitleType: "", //弹框的标题
				selectMaterialDeliver: "", //选中的数据
				detail_deliver_popUp: false, //详细弹出框
				adddeliver_popUp: false, //详细弹出框
				materialtransferList: [], //所有材料转递集合（分页）
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				e01z4103a: "", //	转往单位名称
				startTime: "", //开始时间
				endTime: "", //结束时间
				tableHeight: 0,//给table设置高度
			};
		},
		watch:{
			materialtransferList:{
				handler:function(newVal){
					this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 41;
				}
			}
		},
		created() {
			this.delSelectMaterial = "";
			this.getMaterialtransferList();
		},
		methods: {
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.getMaterialtransferList();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getMaterialtransferList();
			},
			getMaterialtransferList() { //查询所有材料转递
				this.$axios({
					loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.material-deliver-container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},
					method: 'post',
					url: this.API.materialtransfer,
					data: {
						'e01z4103a': this.e01z4103a,
						'startTime': this.startTime,
						'endTime': this.endTime,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.materialtransferList = resData.data.list;
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
			search() { //根据条件查询
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.getMaterialtransferList();
			},
			detail(row, index) { //详细
				console.log("row" + row + "====index" + index);
				this.detail_deliver_popUp = true;
				this.selectMaterialDeliver = Object.assign({}, row);
			},
			getBack() {

			},
			addBack() { //从新增和详情界面回来
				this.adddeliver_popUp = false;
				this.getMaterialtransferList();
			},
			deleteItem() { //删除某一条
				console.log("this.delSelectMaterial" + this.delSelectMaterial);
				if(this.delSelectMaterial == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
				} else {
					this.$confirm('确定删除选中记录?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						center: true
					}).then(() => {
						this.deleteE01Z41Id();
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消'
						});
					});
				}
			},
			deleteE01Z41Id() {
				this.$axios({
					method: 'get',
					url: this.API.deleteE01Z41Id,
					params: {
						'id': this.delSelectMaterial.id
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getMaterialtransferList();
						this.delSelectMaterial = "";
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
			clickRow(row) { //tabel每条被选中
				console.log("this.delSelectMaterial====" + this.delSelectMaterial);
				this.delSelectMaterial = row;
			},
			addDeliver() { //新增
				this.adddeliver_popUp = true;
			}
		},
		components: {
			pagination,
			materialDeliverDetail,
			materialDeliverAdd
		}
	}
</script>

<style lang="scss">
	.material-deliver-container {
		padding: 3px;
		background-color: #f5f5f5;
		h4 {
			font-size: 16px;
			line-height: 40px;
			margin-left: 15px;
			vertical-align: center;
			border-bottom: 1px solid #dfdfdf;
		}
		.deliver_body {
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
			.material_page {
				margin: 10px 0;
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