<!--材料批量接收模块-->
<template>
	<div class="material_Batch_receive_container">
		<h4>材料批量接收</h4>
		<!--body-->
		<div class="material_body">
			<!--导航条-->
			<div class="title">
				<div class="left">
					<el-button type="primary" @click="addMaterial">添加</el-button>
					<!--<el-button type="primary" @click=""></el-button>-->
					<el-button type="primary" @click="editMaterial" :material="selectMaterial">编辑</el-button>
				</div>
				<div class="right">
					<el-input v-model="e01z211a" placeholder="材料名称" clearable></el-input>
					<el-date-picker clearable v-model="startTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss" placeholder="材料开始日期">
					</el-date-picker>
					<el-date-picker clearable v-model="endTime" type="date" placeholder="材料结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
					<el-button type="primary" @click="search">查询</el-button>
				</div>
			</div>
			<!--表格-->
			<el-table class="material_table" highlight-current-row :close-on-click-modal="false" ref="table" :data="materialList" border style="width: 100%;" @row-click="clickRow" :height="tableHeight">
				<el-table-column label="序号" align="center" width="60">
					<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
				</el-table-column>
				<el-table-column prop="e01z211a" label="材料名称" show-overflow-tooltip align="center">
				</el-table-column>
				<el-table-column prop="e01z212" label="材料类号" align="center">
				</el-table-column>
				<el-table-column prop="e01z124" label="份数" align="center">
				</el-table-column>
				<el-table-column prop="e01z224" label="页数" align="center">
				</el-table-column>
				<el-table-column prop="e01z227" label="材料制成日期" align="center">
				</el-table-column>
				<el-table-column prop="e01z231" label="备注" show-overflow-tooltip align="center">
				</el-table-column>
			</el-table>
			<!--分页-->
			<div class="material_page">
				<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
			</div>
		</div>
		<!--新增弹出层-->
		<el-dialog :close-on-click-modal="false" :title="dailogTitleType" width="80%" :visible.sync="addmaterial_popUp" class="Popups" v-if='addmaterial_popUp'>
			<materialBatchAdd :selectMaterial="selectMaterial" @back="getBack"></materialBatchAdd>
		</el-dialog>
	</div>
</template>

<script>
	import pagination from '../../../components/Pagination.vue';
	import materialBatchAdd from './MaterialBatchAdd.vue';
	export default {
		name: "MaterialBatchReceive", //材料批量接收
		data() {
			return {
				flag: false, //true
				dailogTitleType: "", //新增，编辑标题
				dialogStatus: "", //新增和编辑弹框标题
				selectMaterial: "", //选中的一条数据
				addmaterial_popUp: false, //新增弹出层
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				materialList: [], //材料数据集合
				e01z211a: '', //材料名称
				startTime: '', //开始时间
				endTime: '', //结束时间
				tableHeight: 0,//给table设置高度
			}
		},
		created() {
			this.getMaterialList();
		},
		watch:{
			materialList:{
				handler:function(newVal){
					this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 41;
				}
			}
		},
		methods: {
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.getMaterialList();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getMaterialList();
			},
			getMaterialList() { //获取所有材料数据
				this.$axios({
					loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.material_Batch_receive_container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},
					method: 'post',
					url: this.API.GetPagerJson,
					data: {
						'startTime': this.startTime,
						'e01z211a': this.e01z211a,
						'endTime': this.endTime,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.materialList = resData.data.list;
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
			search() { //查询
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.getMaterialList();
			},
			addMaterial() { //新增
				this.dailogTitleType = "添加";
				this.selectMaterial = "";
				this.addmaterial_popUp = true;
				this.dialogStatus = "addEquipment";
			},
			editMaterial() { //编辑
				if(this.selectMaterial == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
				} else {
					this.dailogTitleType = "编辑";
					this.addmaterial_popUp = true;
					this.dialogStatus = "editEquipent"
				}
			},
			clickRow(row) { //tabel每条被选中
				this.selectMaterial = row;
				//				this.$refs.moviesTable.toggleRowSelection(row)
			},
			getBack(data) {
				let flag = false; //修改数据是true,新增是true
				this.selectMaterial = "";
				this.addmaterial_popUp = false;
				this.getMaterialList();
			}
		},
		components: {
			pagination,
			materialBatchAdd
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
		}
		.material_body {
			background-color: #fff;
			padding: 10px;
			margin-bottom: 10px;
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
			margin: 10px 0;
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