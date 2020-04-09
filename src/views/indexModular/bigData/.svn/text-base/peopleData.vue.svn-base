<template>
	<div class="peopleData content" id='baseTable'>
		<!--<div class="content" >-->
			<!--标题-->
			<div class="title">
				<div class="right">
					<el-input style="width:180px;margin-left:20px" v-model="searchForm.search_name" placeholder="姓名或拼音"></el-input>
					<el-button type="primary" @click="search">查询</el-button>
				</div>
			</div>
			<!--表格-->
			<el-table  ref="table" :height="tableHeight" :data="cadreInformationList" border style="width: 100%;" @row-click="clickRow">
				<!--<el-table-column label="序号" align="center" width="80">
					<template slot-scope="scope">{{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
				</el-table-column>-->
				<el-table-column fixed prop="operation" label="操作" align="center" width="150">
					<template slot-scope="scope">
						<el-button type="text" :disabled='scope.row.flag' @click="BrowsePersonal(scope.$index, scope.row)">浏览</el-button>
						<el-button type="text" @click="handleFile(scope.$index, scope.row)" :disabled='scope.row.flag'>数字档案</el-button>
					</template>
				</el-table-column>
				<!--<el-table-column prop="e10statusa" label="档案状态" align="center">
				</el-table-column>-->
				<el-table-column prop="a0101" label="姓名" width="90" show-overflow-tooltip align="center">
				</el-table-column>
				<el-table-column prop="a0104a" label="性别" width="70" align="center">
				</el-table-column>
				<el-table-column prop="a0107" label="出生日期" align="center">
				</el-table-column>
				<el-table-column prop="a0111a" label="籍贯" show-overflow-tooltip align="center">
				</el-table-column>
				<!--<el-table-column prop="a0117a" label="民族" show-overflow-tooltip width="70" align="center">
				</el-table-column>-->
				<el-table-column prop="a0134" label="参加工作日期" width="120" align="center">
				</el-table-column>
				<!--<el-table-column prop="a0141a" label="政治面貌" show-overflow-tooltip align="center">
				</el-table-column>-->
				<el-table-column prop="a0144" label="参加组织日期" width="120" align="center">
				</el-table-column>
				<el-table-column prop="e1001" label="文化程度" show-overflow-tooltip align="center">
				</el-table-column>
				<el-table-column prop="e10040" label="工作单位及职务" show-overflow-tooltip width="360" align="center">
				</el-table-column>
				
			</el-table>
			<!--分页-->
			<!--<div class="material_page">-->
				<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
			<!--浏览弹出层-->
			<el-dialog title="人员信息" width="100%"  fullscreen :visible.sync="browse_personal" v-if='browse_personal' :close-on-click-modal="false" append-to-body>
				<BrowsePersonal :selectDeceive="chioceObj" ></BrowsePersonal>
			</el-dialog>
			<!--数字档案-->
			<el-dialog fullscreen title="档案阅览" :visible.sync="readingArchivesVisible"  append-to-body v-if="readingArchivesVisible">
			<NoTimerReadingArchivesList :fileObject="chioceObj" ></NoTimerReadingArchivesList>
			</el-dialog>
		<!--</div>-->
	</div>
</template>
<script>
	import Pagination from '../../../components/Pagination.vue';
	import BrowsePersonal from '../../personnelManagement/BrowsePersonal.vue';
	import NoTimerReadingArchivesList from '../../archivalBorrowing/NoTimerReadingArchivesList.vue';

	export default {
		name: "peopleData", //干部信息总库
		components: {
			Pagination, //分页组件
			BrowsePersonal, //浏览人员
			NoTimerReadingArchivesList,//数字档案
		},
		props: ['typeNum'],
		data() {
			return {
				tableHeight: 0,
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				chioceObj: {}, //选中数据的对象
				searchForm:{//搜索
					search_name: "", //姓名或拼音
					a01statusb:'',//干部类别
					e10statusb:'',//档案状态
				},
				cadreInformationList: [], //干部信息集合
				add_personal: false, //新增显示控制标志
				edit_personal: false, //编辑显示控件标志	
				browse_personal: false, //浏览显示控件标志	
				readingArchivesVisible:false,//阅读器弹窗是否显示
			}
		},
		created() {
			this.getPagerE01Z500Json()
		},
		mounted() {
			//this.$refs.table.$el.offsetTop  ----table距最近的父元素顶部的高度
			//70   ---头部元素高度
			//52   ---分页元素高度
			//44   ---面包屑
		},
		watch:{
			cadreInformationList:{
				handler:function(newVal){
					this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop -40 - 70 - 52;
				}
			}
		},
		methods: {
			//选中行列信息
			clickRow(row, column, event) {
				this.chioceObj = row;
			},
			/**
			 * 数字档案
			 */
			handleFile(index,row){
				this.chioceObj = row;
				this.readingArchivesVisible = true;
			},
			BrowsePersonal() {
				this.browse_personal = true
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getPagerE01Z500Json();
			},
			getPagerE01Z500Json() {//干部信息总库列表
				this.$axios({
					loading:{
            			isShow:true,
            			target:'#baseTable'
            		},
					method: 'post',
					url: this.API.findA01InformationPage,
					data: {
						'a01010': this.searchForm.search_name,
						'a01statusb': this.typeNum,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						console.log(resData.data);
						this.cadreInformationList = resData.data.list;
						this.pageObj.total = resData.data.total;
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}
				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			search() { //按条件查询
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.getPagerE01Z500Json();
			},
		}
	}
</script>

<style lang="scss">
	.peopleData {
		position: relative;
		.top {
			margin: 10px;
		}
		.content {
			.el-dialog {
				height: 100%;
			}
			background-color: #fff;
			.title {
				display: flex;
				justify-content: space-between;
				padding-bottom: 10px;
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