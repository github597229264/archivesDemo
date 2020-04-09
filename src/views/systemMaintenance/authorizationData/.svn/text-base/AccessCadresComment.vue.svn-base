<template>
	<div class="access-cadres-comment-container">
		<!--头部-->
		<div class="access-cadres-comment-title">
			<div class="access-cadres-comment-left">
				<el-button type='primary' @click="addAccessCadresCommentPop=true">添加</el-button>
				<el-button class="delbt" type='danger' @click="delAccessCadres">删除</el-button>
			</div>
			<div class="access-cadres-comment-right">
				<el-input v-model="a0101" placeholder="姓名或拼音"></el-input>
				<el-button type='primary' @click="search">查询</el-button>
			</div>
		</div>
		<!--表格-->
		<div class="myTable" :style="{height: tableHeight}">
			<el-table :data="list" class="table" ref="table" @selection-change="changeFun" @row-click="clickRow" empty-text="没有数据，请刷新试试" border>
				<el-table-column type="selection" width="50"></el-table-column>
				<el-table-column prop="operation" label="浏览" fixed align="center" width="120">
					<template slot-scope="scope">
						<el-button type="text" @click="browsePersonalOnclick(scope.$index, scope.row)">浏览</el-button>
						<el-button type="text"  @click="handleFile(scope.$index, scope.row)">数字档案</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="a0101" label="姓名" align="center" width="100px"></el-table-column>
				<el-table-column prop="a0111a" label="籍贯" align="center" width="180px" show-overflow-tooltip></el-table-column>
				<el-table-column prop="e10040" label="现职单位及职务" align="center" show-overflow-tooltip></el-table-column>
			</el-table>
		</div>
		<!--分页-->
		<div class="material_page">
			<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
		</div>
		<!--授权档案-->
		<el-dialog title="添加" width="60%" :close-on-click-modal="false" :visible.sync="addAccessCadresCommentPop" v-if='addAccessCadresCommentPop'>
			<addAccessCadresComment :flag="flag" :id="id" @getAddback="getAddBack"></addAccessCadresComment>
		</el-dialog>
		<!--浏览弹出层-->
		<el-dialog title="人员信息" width="100%" fullscreen :visible.sync="browse_personal" v-if='browse_personal' :close-on-click-modal="false" append-to-body>
			<browsePersonal :fourthShow='fourthShow' :selectDeceive="selectCadres"></browsePersonal>
		</el-dialog>
		<!--数字档案-->
		<el-dialog fullscreen title="档案阅览" :visible.sync="readingArchivesVisible"  append-to-body v-if="readingArchivesVisible">
			<noTimerReadingArchivesList :fileObject="selectCadres" ></noTimerReadingArchivesList>
		</el-dialog>
	</div>
</template>

<script>
	import pagination from '../../../components/Pagination.vue';
	import addAccessCadresComment from './AddAccessCadresComment.vue'
	import browsePersonal from '../../personnelManagement/BrowsePersonal.vue';
	import noTimerReadingArchivesList from '../../archivalBorrowing/NoTimerReadingArchivesList.vue';

	export default {
		name: "AccessCadresComment", //干部人员访问权限公共部分
		components: {
			pagination,
			addAccessCadresComment,
			browsePersonal,
			noTimerReadingArchivesList
		},
		props: ['id', 'flag','rightHeight'],
		data() {
			return {
				selectCadres: "", //点击某一条
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				a0101: "", //搜索输入的姓名
				list: [], //数据集合
				addAccessCadresCommentPop: false, //添加pop是否显示
				multipleSelection: [], //复选框
				fourthShow: 'hidden', //档案利用情况不显示
				browse_personal: false, //浏览显示控件标志
				readingArchivesVisible:false,//阅读器弹窗是否显示
				tableHeight:0,//table高度
			}
		},
		watch: {
			id: {
				handler(newVal) {
					console.log('newVal' + newVal);
					if(newVal != undefined) this.findCommentList();
				},
			},
			rightHeight: {
				handler(newVal){
					this.tableHeight = this.rightHeight +'px';
					console.log(this.tableHeight);
				}
			}
		},
		methods: {
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.findCommentList();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.findCommentList();
			},
			findCommentList() { //数据授权规避人员列表
				let url = "";
				if(this.flag) url = this.API.findPowerArchPowerPersonPage;
				else url = this.API.findPowerArchPoweExcludePage;
				this.$axios({
					method: 'post',
					url: url,
					data: {
						'id': this.id,
						'a0101': this.a0101,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.list = resData.data.list;
						this.pageObj.total = resData.data.total;
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
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.findCommentList();
			},
			getAddBack(data) { //添加界面的返回
				this.addAccessCadresCommentPop = false;
				this.findCommentList();
			},
			delAccessCadres() { //删除功能
				if(this.multipleSelection == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				this.a0100s  = this.commonFun.joinTgetherId(this.multipleSelection,this.a0100s ,'a0100');
				this.delFromNet();
			},
			delFromNet() { //从服务器删除
				let url = "";
				if(this.flag) url = this.API.deletePowerArchPowerPerson;
				else url = this.API.deletePowerArchPoweExcludes;
				this.$axios({
					method: 'post',
					url: url,
					data: {
						'id': this.id,
						'a0100s': this.a0100s
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.a0100s = "";
						this.$refs.table.clearSelection(); //清除所有选中项
						this.findCommentList();
						this.$message({
							type: 'success',
							message: "删除成功！"
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
			changeFun(val) { //复选框状态改变
				this.multipleSelection = val;
			},
			browsePersonalOnclick(index, row) { //点击浏览
				this.browse_personal = true;
				this.chioceObj = this.cadreInformationList[index].a0100;
			},
			clickRow(row) { //选中某一条数据
				this.selectCadres = row;
			},
			handleFile(index,row){//数字档案
				this.selectCadres = row;
				this.readingArchivesVisible = true;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.access-cadres-comment-container {
		.access-cadres-comment-title {
			margin: 10px 0;
			display: flex;
			justify-content: space-between;
			.access-cadres-comment-left {
				.delbt {
					margin-left: 10px;
				}
			}
			.access-cadres-comment-right {
				display: flex;
				.el-input {
					width: 120px;
					margin-right: 10px;
				}
			}
		}
		.myTable{
			overflow: auto;	
		}
		.material_page {
			margin-top: 10px;
			text-align: right;
		}
	}
</style>