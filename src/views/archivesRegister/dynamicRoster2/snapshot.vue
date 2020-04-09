<!--批量材料处理-添加-->
<template>
	<div class="material-batch-add">
		<el-table :data="showConditionList" highlight-current-row height="180px" border style="width: 100%">
			<el-table-column type='index' label="序号" width='80' align="center"></el-table-column>
			<el-table-column prop="fieldname" label="字段名称" align="center"></el-table-column>
			<el-table-column prop="operation" label="条件" align="center"></el-table-column>
			<el-table-column prop="text" label="值显示内容" show-overflow-tooltip align="center"></el-table-column>
		</el-table>
		<div class="title">
			<span class="work-title">符合以上条件信息的档案人员</span>
		</div>
		<el-table :data="showPersonList" highlight-current-row height="280px" border style="width: 100%">
			<el-table-column label="序号" align="center" width="80">
				<template slot-scope="scope">{{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
			</el-table-column>
			<el-table-column prop="operation" label="浏览" align="center">
				<template slot-scope="scope">
					<el-button type="text" :disabled='scope.row.flag' @click="BrowsePersonal(scope.$index, scope.row)">浏览</el-button>
					<el-button type="text" @click="handleFile(scope.$index, scope.row)" :disabled='scope.row.flag'>数字档案</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="a0101" label="姓名" align="center"></el-table-column>
			<el-table-column prop="a0104a" label="性别" align="center"></el-table-column>
			<el-table-column prop="a0107" label="出生年月" align="center"></el-table-column>
			<el-table-column prop="a0111a" label="籍贯" align="center"></el-table-column>
			<el-table-column prop="a0114a" label="出生地" align="center"></el-table-column>
			<el-table-column prop="a0117a" label="民族" align="center"></el-table-column>
			<el-table-column prop="e1001" label="学历" show-overflow-tooltip align="center"></el-table-column>
			<el-table-column prop="a0141a" label="政治面貌" show-overflow-tooltip align="center"></el-table-column>
		</el-table>
		
		<!--分页-->
		<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		
		<!--保存-->
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="save">保存</el-button>
			<el-button type="button">取消</el-button>
		</div>
		<!--浏览弹出层-->
			<el-dialog title="人员信息" width="100%"  fullscreen :visible.sync="browse_personal" v-if='browse_personal' :close-on-click-modal="false" append-to-body>
				<BrowsePersonal :selectDeceive="chioceObj" ></BrowsePersonal>
			</el-dialog>
			<!--数字档案-->
			<el-dialog fullscreen title="档案阅览" :visible.sync="readingArchivesVisible"  append-to-body v-if="readingArchivesVisible">
			<NoTimerReadingArchivesList :fileObject="chioceObj" ></NoTimerReadingArchivesList>
			</el-dialog>
	</div>
</template>

<script>
	import pagination from '../../../components/Pagination.vue';
	import NoTimerReadingArchivesList from '../../archivalBorrowing/NoTimerReadingArchivesList.vue';
	import BrowsePersonal from '../../personnelManagement/BrowsePersonal.vue';
	
	export default {
		name: "MaterialBatchAdd", //材料批量接收 添加，编辑
		components: {
			pagination,//分页
			NoTimerReadingArchivesList,//数字档案
			BrowsePersonal,//浏览人员
		},
		props: ['selectDeceive', 'rosterid'],
		data() {
			return {
				showConditionList: [], //条件列表
				showPersonList: [], //人员列表
				a0100s: '', //档案人员编号字符串拼接
				chioceObj:[],//选中数据
				readingArchivesVisible:false,//阅读器弹窗是否显示
				browse_personal:false,
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
			}
		},
		created() {
			this.getConditionList(); //条件列表
			this.queryFunc();//人员列表
		},
		mounted() {

		},
		watch:{
			
		},
		methods: {
			/**
			 * 浏览人员
			 */
			BrowsePersonal(index,row) {
				this.chioceObj = row;
				this.browse_personal = true;
			},
			/**
			 * 数字档案
			 */
			handleFile(index,row){
				this.chioceObj = row;
				this.readingArchivesVisible = true;
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.queryFunc();
			},
			getConditionList() { //条件列表
				this.$axios({
					//					loading:{
					//						target:'material-batch-add',
					//						
					//					},
					method: 'get',
					url: this.API.getRosterConditionById,
					params: {
						'rosterid': this.rosterid.id
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.showConditionList = resData.data.list;
					} else {
						this.$message({
							type: 'error',
							message: '获取数据失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			queryFunc() { //查询
				this.$axios({
					loading: {
						isShow: false,
						target: '#archivesRegister'
					},
					method: 'post',
					url: this.API.query,
					data: {
						'content': this.selectDeceive.content,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.showPersonList = resData.data.list;//人员列表
						this.pageObj.total = resData.data.total;
					} else {
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}
				}).catch((err) => {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			save() { //生成快照list
				//档案人员编号字符串拼接
				let selectDeceive = this.selectDeceive;
				if(selectDeceive.length > 0) {
					for(let i = 0; i < selectDeceive.length; i++) {
						this.a0100s += selectDeceive[i].a0100 + ',';
					}
				}
				//当前日期
				var nowDate = this.commonFun.dateFormat(new Date(), "yyyy-MM-dd");

				this.$axios({
					loading: {
						isShow: false,
						target: '#archivesRegister'
					},
					method: 'post',
					url: this.API.takeSnapshot,
					data: {
						'rosterid': this.rosterid.id,
						'producedate': nowDate,
						'content': this.selectDeceive.content
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.$emit('snapshotBack', true);
					} else {
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}
				}).catch((err) => {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			}
		},

	}
</script>

<style lang="scss">
	.material-batch-add {
		padding: 10px;
		.title {
			.work-title {
				color: #0290f5;
				font-weight: bold;
				font-size: 20px;
				text-shadow: -1px 2px 1px #cccccc;
			}
		}
		.dialog-footer {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 15px;
		}
	}
</style>