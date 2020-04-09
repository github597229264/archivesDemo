<template>
	<el-container class="archives-check-container">
		<el-header class="my-header" style="height: 45px;">档案查缺</el-header>
		<el-main>
			<div class="title">
				<div class="left">
					<el-button type="primary" @click="addCheck">添加</el-button>
					<el-button type="primary" @click="eidtCheck">编辑</el-button>
					<el-button type="danger" @click="delCheck">删除</el-button>
					<el-button type="primary" @click="dealCheck">处理</el-button>
				</div>
				<div class="right">
					<el-date-picker v-model="startTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="开始登记日期">
					</el-date-picker>
					<el-date-picker v-model="endTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="截止登记日期">
					</el-date-picker>
					<el-input v-model="e01z0001" placeholder="材料形成单位"></el-input>
					<el-input v-model="a0101" placeholder="档案人员"></el-input>
					<el-button type="primary" @click="search">查询</el-button>
				</div>
			</div>
			<!--表格-->
			<el-table :data="checkList" highlight-current-row @row-click="clickRow" ref="table" border style="width: 100%;" :height="tableHeight">
				<el-table-column label="序号" align="center" width="60px">
					<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
				</el-table-column>
				<el-table-column prop="a0101" label="档案人员" align="center" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="e10040" label="现职单位及职务" show-overflow-tooltip width="124" align="center">
				</el-table-column>
				<el-table-column prop="e01z401a" label="材料名称" show-overflow-tooltip align="center">
				</el-table-column>
				<el-table-column prop="e01z401b" label="材料名称代码" width="100" show-overflow-tooltip align="center">
				</el-table-column>
				<el-table-column prop="e01z211" label="材料类型" align="center" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="e01z404" label="登记日期" align="center">
				</el-table-column>
				<el-table-column prop="e01z407" label="份数" align="center">
				</el-table-column>
				<el-table-column prop="e01z411" label="经办人" align="center" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="e01z414" label="备注" show-overflow-tooltip width="80px" align="center">
				</el-table-column>
				<el-table-column prop="e01z0001" label="材料形成单位" align="center" width="100" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="e01z0003value" label="处理结果" align="center" show-overflow-tooltip>
				</el-table-column>
			</el-table>
			<!--分页-->
			<div class="finishing_page">
				<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
			</div>
			<!--新增弹出层-->
			<el-dialog :title="title" :close-on-click-modal="false" width="60%" :visible.sync="add_check_popUp" v-if='add_check_popUp'>
				<archivesCheckAdd :selectCheck="selectCheck" @addback="getAddBack"></archivesCheckAdd>
			</el-dialog>
			<!--编辑弹出层-->
			<el-dialog :title="title" :close-on-click-modal="false" width="60%" :visible.sync="edit_check_popUp" v-if='edit_check_popUp'>
				<archivesCheckAdd :selectCheck="selectCheck" @addback="getAddBack"></archivesCheckAdd>
			</el-dialog>
		</el-main>
	</el-container>
</template>

<script>
	import pagination from '../../../components/Pagination.vue';
	import archivesCheckAdd from './ArchivesCheckAdd.vue';
	export default {
		name: "ArchivesCheck", //档案查缺
		components: {
			pagination,
			archivesCheckAdd
		},
		data() {
			return {
				startTime: "", //开始时间
				endTime: "", //结束时间
				e01z0001: "", //材料形成单位
				a0101: "", //档案人员
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				checkList: [], //列表数组
				selectCheck: "", //选中的数据
				add_check_popUp: false, //新增是否显示
				edit_check_popUp: false, //编辑是否显示
				title:"",//添加或者编辑的标题
				tableHeight: 0,//给tabale设置高度
			}
		},
		watch:{
			checkList:{
				handler:function(newVal){
					this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 41;
				}
			}
		},
		created() {
			this.queryByPageLists();
		},
		methods: {
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.queryByPageLists();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.queryByPageLists();
			},
			queryByPageLists() { //获取列表数据
				this.$axios({
					loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.archives-check-container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},
					method: 'post',
					url: this.API.findAllByPagePoorLacks,
					data: {
						'a0101': this.a0101,
						'e01z0001': this.e01z0001,
						'startTime': this.startTime,
						'endTime': this.endTime,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.checkList = resData.data.list;
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
			search() { //搜索
				this.queryByPageLists();
			},
			clickRow(row) { //选中某一条数据
				this.selectCheck = row;
			},
			addCheck() { //添加
				this.title = "添加";
				this.add_check_popUp = true;
				this.selectCheck = "";
			},
			getAddBack(data, data1) {
				this.selectCheck = "";
				if(data1 == "success") this.queryByPageLists();
				if(data == "edit") this.edit_check_popUp = false;
				else this.add_check_popUp = false;
			},
			eidtCheck() { //编辑
				if(this.selectCheck == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				this.title = "编辑";
				this.edit_check_popUp = true;
			},
			delCheck() { //删除
				if(this.selectCheck == "") {
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
					this.delCheckFromNet();
				}).catch(() => {
					this.selectFinishing = "";
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			delCheckFromNet() {
				this.$axios({
					method: 'get',
					url: this.API.deleteFileCheckMissing,
					params: {
						'id': this.selectCheck.e01z400,
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.selectCheck = "";
						this.$message("删除成功");
						this.queryByPageLists();
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
			dealCheck() { //处理
				if(this.selectCheck == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				this.$confirm('确定处理选中记录?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.dealCheckFromNet();
				}).catch(() => {
					this.selectFinishing = "";
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			dealCheckFromNet() {
				this.$axios({
					method: 'get',
					url: this.API.chechstatus,
					params: {
						'id': this.selectCheck.e01z400,
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.selectCheck = "";
						this.$message("处理成功");
						this.queryByPageLists();
					} else {
						this.$message({
							type: 'error',
							message: '处理失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			}
		}
	}
</script>

<style lang="scss">
	.archives-check-container {
		.my-header {
			padding-top: 15px;
		}
		.el-main {
			background-color: #fff;
			height: 100%;
			.title {
				margin-bottom: 10px;
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
			.el-table__body tr.current-row>td {
				background: #DCEBFA !important;
				color: #606266;
			}
			.finishing_page {
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