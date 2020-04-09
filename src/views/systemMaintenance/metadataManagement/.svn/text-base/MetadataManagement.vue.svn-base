<template>
	<el-container class="metadata-management-container">
		<el-header class="my-header" style="height: 45px;">元数据管理</el-header>
		<el-main>
			<div class="metadata-management-title">
				<div class="metadata-management-title-right">
					<fileStatusTreeSelect style="width:200px" @FileStatusTreeSelectCall="fileStatusTreeSelectBack">
					</FileStatusTreeSelect>
					<personnelCategoryTreeSelect class="cateTree" @PersonnelCategoryTreeSelectCall="treeSelectCall"></personnelCategoryTreeSelect>
					<el-input v-model="a01010" placeholder="姓名或拼音"></el-input>
					<el-button type="primary" @click="search">查询</el-button>
				</div>
			</div>
			<div class="metadata-management-content">
				<!--表格-->
				<el-table class="material_table" ref="table" :data="metadataList" border style="width: 100%;" @row-click="clickRow" :height="tableHeight">
					<el-table-column prop="operation" label="浏览" fixed align="center" width="120">
						<template slot-scope="scope">
							<el-button type="text" @click="browsePersonalOnclick(scope.$index, scope.row)">浏览</el-button>
							<el-button type="text"  @click="handleFile(scope.$index, scope.row)">数字档案</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="a0101" label="姓名" show-overflow-tooltip width='100' align="center">
					</el-table-column>
					<el-table-column prop="a0104a" label="性别" align="center" width="60">
					</el-table-column>
					<el-table-column prop="a0107" label="出生年月" width='100' align="center">
					</el-table-column>
					<el-table-column prop="a0111a" label="籍贯" align="center" width="150">
					</el-table-column>
					<el-table-column prop="a0117a" label="民族" align="center" width='100' show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="a0134" label="参加工作日期" show-overflow-tooltip width="130" align="center">
					</el-table-column>
					<el-table-column prop="a0141a" label="政治面貌" align="center" width='100'>
					</el-table-column>
					<el-table-column prop="a0144" label="参加组织日期" align="center" width="130">
					</el-table-column>
					<el-table-column prop="e1001" label="文化程度" align="center" show-overflow-tooltip>
					</el-table-column>
					<el-table-column prop="e10040" label="现职单位及职务" align="center" show-overflow-tooltip width="120">
					</el-table-column>
				</el-table>
				<!--分页-->
				<div class="material_page">
					<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
				</div>
				<!--浏览弹出层-->
				<el-dialog title="人员信息" width="100%" fullscreen :visible.sync="browse_personal" v-if='browse_personal' :close-on-click-modal="false" append-to-body>
					<browsePersonal :fourthShow='fourthShow' :selectDeceive="selectMetadata"></browsePersonal>
				</el-dialog>
				<!--数字档案-->
				<el-dialog fullscreen title="档案阅览" :visible.sync="readingArchivesVisible"  append-to-body v-if="readingArchivesVisible">
					<noTimerReadingArchivesList :fileObject="selectMetadata" ></noTimerReadingArchivesList>
				</el-dialog>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	import pagination from '../../../components/Pagination.vue';
	import personnelCategoryTreeSelect from '../../../components/PersonnelCategoryTreeSelect.vue';
	import fileStatusTreeSelect from '../../../components/FileStatusTreeSelect.vue';
	import browsePersonal from '../../personnelManagement/BrowsePersonal.vue';
	import noTimerReadingArchivesList from '../../archivalBorrowing/NoTimerReadingArchivesList.vue';

	export default {
		name: "MetadataManagement", //元数据管理
		components: {
			pagination,
			personnelCategoryTreeSelect,
			fileStatusTreeSelect,
			browsePersonal,
			noTimerReadingArchivesList
		},
		data() {
			return {
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				metadataList: [], //元数据集合
				tableHeight: 0,//给table设置高度
				selectMetadata: "", //选中的元数据
				a01010: "", //姓名或拼音
				a01Statusb: "", //干部在职情况
				e10Statusb: "", //档案在库情况
				browse_personal: false, //浏览显示控件标志
				readingArchivesVisible:false,//阅读器弹窗是否显示
				fourthShow: 'hidden', //档案利用情况不显示
			}
		},
		watch:{
			metadataList:{
				handler:function(newVal){
					this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 41;
				}
			}
		},
		created() {
			this.queryMetadataList();
		},
		methods: {
			treeSelectCall(id) {
				this.a01Statusb = id;
			},
			handleCurrentChange(val) { // 分页导航
				this.pageObj.pageIndex = val;
				this.queryMetadataList();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.queryMetadataList();
			},
			queryMetadataList() { //获取元数据管理列表
				this.$axios({
					loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.metadata-management-container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},
					method: 'post',
					url: this.API.queryMetadataList,
					data: {
						'a01010': this.a01010,
						'a01Statusb': this.a01Statusb,
						'e10Statusb': this.e10Statusb,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.metadataList = resData.data.list;
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
				this.selectMetadata = row;
			},
			search() { //搜索
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.queryMetadataList();
			},
			fileStatusTreeSelectBack(id) {
				this.e10Statusb = id;
			},
			browsePersonalOnclick(index, row) { //点击浏览
				this.browse_personal = true;
				this.chioceObj = this.cadreInformationList[index].a0100;
			},
			handleFile(index,row){//数字档案
				this.selectCadres = row;
				this.readingArchivesVisible = true;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.metadata-management-container {
		.my-header {
			padding-top: 15px;
		}
		.el-main {
			background-color: #fff;
			height: 100%;
			.metadata-management-title-right {
				display: flex;
				margin-bottom: 10px;
				justify-content: flex-end;
				.cateTree {
					width: 200px;
					margin-left: 10px;
				}
				.el-input {
					width: 200px;
					margin: 0 10px;
				}
			}
			.metadata-management-content {
				.material_page {
					margin-top: 10px;
					text-align: right;
				}
			}
		}
	}
</style>