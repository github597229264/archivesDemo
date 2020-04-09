<template>
	<div class="archives-deal-container">
		<!--表单信息-->
		<el-form :model="selectArchives" label-width="110px">
			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="审核人：" prop="e01z521">
						<el-input v-model="selectArchives.e01z521"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="审核日期：" prop="e01z524">
						<el-date-picker v-model="selectArchives.e01z524" type="date" placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="入库审批人：" prop="e01z537">
						<el-input v-model="selectArchives.e01z537"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="入库日期：" prop="e01z534">
						<el-date-picker v-model="selectArchives.e01z534" type="date" placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="回执人：" prop="uCreator">
						<el-input v-model="selectArchives.uCreator"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="回执日期：" prop="e01z531">
						<el-date-picker v-model="selectArchives.e01z531" type="date" placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="备注：" prop="e01z544">
						<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="selectArchives.e01z544"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!--表格-->
		<el-table empty-text="您还没有添加数据！" :data="archivesList" border style="width: 100%;" max-height="350px">
			<el-table-column label="操作" width="220px" align="center">
				<template slot-scope="scope">
					<el-button type="text" @click="goBack(scope.row,scope.$index)">退回</el-button>
					<el-button type="text" :disabled="scope.row.valstatusvalue === '不合格' || scope.row.valstatusvalue === '已入库' || scope.row.valstatusvalue === '已退回'  || (!(!scope.row.iselectronic || scope.row.valstatusvalue === '已入库' || scope.row.valstatusvalue === '已退回') && scope.row.elecscore < 90 )|| scope.row.paperscore < 90 ? true:false" @click="putStorage(scope.row,scope.$index)">入库</el-button>
					<el-button type="text" ref="btn" :disabled="!scope.row.iselectronic || scope.row.valstatusvalue === '已入库' || scope.row.valstatusvalue === '已退回' ? true : false" @click="archivesDigitalaudit(scope.row,scope.$index)">数字审核</el-button>
					<el-button type="text" :disabled="scope.row.valstatusvalue === '已入库' || scope.row.valstatusvalue === '已退回' ? true : false" @click="archivesDigitalaudit1(scope.row,scope.$index)">实物审核</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="a0101" label="姓名" align="center" style="width: 15%;">
			</el-table-column>
			<el-table-column prop="iselectronicvalue" label="是否有数字档案" align="center" width="134">
			</el-table-column>
			<el-table-column prop="e01z511" label="正本卷数" style="width: 15%;" align="center">
			</el-table-column>
			<el-table-column prop="e01z514" label="副本卷数" align="center" width="154">
			</el-table-column>
			<el-table-column prop="elecscore" label="数字分数" align="center" style="width: 15%;">
			</el-table-column>
			<el-table-column prop="paperscore" label="实物分数" align="center" show-overflow-tooltip style="width: 15%;">
			</el-table-column>
			<el-table-column prop="valstatusvalue" align="center" label="档案库在库情况" show-overflow-tooltip style="width: 15%;">
			</el-table-column>
		</el-table>
		<!--分页-->
		<div class="receive_page">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		</div>
		<!--操作2-->
		<div class="oprations">
			<el-button type="primary" @click="dealArchives('deliverForm')">处理完成</el-button>
			<el-button type="danger" @click="cancle">取消</el-button>
		</div>
		<!--退回弹出层-->
		<el-dialog class="back" :close-on-click-modal="false" title="退回" width="50%" :visible.sync="receive_backto_popUp" v-if='receive_backto_popUp' append-to-body>
			<archivesReceiveBackTo :id="id" @getback="getBack"></archivesReceiveBackTo>
		</el-dialog>
		<!--数字审核弹出层-->
		<el-dialog class="back" :close-on-click-modal="false" :title="title" width="80%" :visible.sync="archives_digitalaudit_popUp" v-if="archives_digitalaudit_popUp" append-to-body>
			<archivesDigitalAudit :id="id" :type="1" @digitalBack="digitalBack1"></archivesDigitalAudit>
		</el-dialog>
		<!--实物审核弹出层-->
		<el-dialog class="back" :close-on-click-modal="false" :title="title" width="80%" :visible.sync="archives_digitalaudit_popUp2" v-if="archives_digitalaudit_popUp2" append-to-body>
			<archivesDigitalAudit :id="id" :type="2" @digitalBack="digitalBack2"></archivesDigitalAudit>
		</el-dialog>
	</div>
</template>

<script>
	import pagination from '../../../components/Pagination.vue';
	import archivesReceiveBackTo from './ArchivesReceiveBackTo.vue';
	import archivesDigitalAudit from './ArchivesDigitalAudit.vue';

	export default {
		name: "ArchivesReceiveDeal", //处理
		props: ["selectDeceive"],
		components: {
			pagination,
			archivesReceiveBackTo,
			archivesDigitalAudit
		},
		data() {
			return {
				selectArchives: { //处理表单对象
					e01z521: "", //审核人
					e01z524: "", //审核日期
					e01z517: "", //入库审批人
					e01z534: "", //入库日期
					uCreator: "", //uCreator
					e01z531: "", //回执日期
					e01z544: "", //备注
					ids: "" //人员id集合
				},
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				archivesList: [], //下面人员列表集合
				receive_backto_popUp: false, //控制退回弹出框显示与否
				archivesReceive: "", //操作的某条数据
				archives_digitalaudit_popUp: false, //控制数字审核的显示与否
				archives_digitalaudit_popUp2: false, //控制实物审核的显示与否
				iselectronic: false, //控制数字档案显示与否
				isexitelectronic: true,
				id: "", //下面数据选中的数据的id
				title: "", //数字审核，实物审核标题
			}
		},
		created() {
			console.log("===")
			this.selectArchives = this.selectDeceive;
			debugger;
			this.id = this.selectDeceive.id;
			this.getData();
		},
		updated() {
			console.log(this.isexitelectronic)
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
			getData() {
				this.$axios({
					method: 'get',
					url: this.API.findE01Z500ById,
					params: {
						'id': this.selectDeceive.id,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.archivesList = resData.data.list;
						this.pageObj.total = resData.data.total;
						console.log(this.pageObj.total);
						this.ids  = this.commonFun.joinTgetherId(this.selectArchives,this.ids,'id');
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
			dealArchives() {
				//先判断有没有未审核的文件
				let flag = false;//false没有要审核的文件，true有要审核的文件
				this.archivesList.forEach(item=>{
					if(item.paperscore === "") flag = true;
					if(item.iselectronic && item.elecscore === "") flag = true;
					if(flag)return;
				})
				if(flag){
					this.$confirm('还有未处理的档案！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				this.$axios({
					method: 'post',
					url: this.API.resolveokbutton,
					data: {
						e01z521: this.selectArchives.e01z521,
						e01z524: this.commonFun.dateFormat(this.selectArchives.e01z524,"yyyyMMdd"),
						e01z517: this.selectArchives.e01z517,
						e01z537: this.selectArchives.e01z537,
						e01z534: this.commonFun.dateFormat(this.selectArchives.e01z534,"yyyyMMdd"),
						e01z531: this.commonFun.dateFormat(this.selectArchives.e01z531,"yyyyMMdd"),
						uCreator: this.selectArchives.uCreator,
						ids: this.selectArchives.ids,
						id: this.selectDeceive.id
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							message: '处理成功！',
							type: 'success'
						});
						this.$emit("dealBack", "");
					} else {
						this.$message({
							type: 'error',
							message: '处理失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("档案选择列表=" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			cancle() { //取消
				this.$emit("dealBack", "");
			},
			getBack(data) { //退回的处理
				this.receive_backto_popUp = false;
				if(data == "returnSucess") this.getData();
			},
			putStorage(row, index) { //入库
				this.id = row.e01z500;
				this.archivesReceive = Object.assign({}, row);
				this.$confirm('确定要入库该档案吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.putStorageToNet();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			putStorageToNet() {
				this.$axios({
					method: 'post',
					url: this.API.putstoreroomorsendbackbutton,
					data: {
						'id': this.id,
						'status': 3,
						'backcontent': "",
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							message: '入库成功！',
							type: 'success'
						});
						console.log("value" + this.$refs.btn.disabled);
						this.$refs.btn.disabled = false;
						this.isexitelectronic = false;
						this.getData();
					} else {
						this.$message({
							type: 'error',
							message: '入库失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			},
			digitalBack1() { //数字审核回来
				this.archives_digitalaudit_popUp = false;
				this.getData();
			},
			digitalBack2() { //实物审核回来
				this.archives_digitalaudit_popUp2 = false;
				this.getData();
			},
			archivesDigitalaudit(row, index) { //数字审核
				this.archives_digitalaudit_popUp = true;
				this.id = row.e01z500;
				this.title = "数字审核";
			},
			archivesDigitalaudit1(row, index) { //实物审核
				this.title = "实物审核";
				this.archives_digitalaudit_popUp2 = true;
				this.id = row.e01z500;
			},
			goBack(row, index) { //进入退回界面
				this.id = row.e01z500;
				this.receive_backto_popUp = true;
			}
		}
	}
</script>

<style lang="scss">
	.archives-deal-container {
		position: relative;
		.receive_page {
			display: flex;
			justify-content: flex-end;
			margin: 10px 0;
		}
		.oprations {
			text-align: center;
			margin-top: 10px;
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