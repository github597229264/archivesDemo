<template>
	<div class="archives-receive-containers">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>干部人员管理</el-breadcrumb-item>
				<el-breadcrumb-item>回收站</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="content" id='recycTable'>
			<!--标题-->
			<div class="title">
				<div class="left"></div>
				<div class="right">
					<div class="block" style="width:180px;">
					    <el-date-picker
					      v-model="searchForm.startDateStr"
					      type="date"
					      value-format="yyyyMMdd"
					      placeholder="开始操作日期"
					      style="width:180px;">
					    </el-date-picker>
					</div>
					<div class="block" style="width:180px;margin-left:20px">
					    <el-date-picker
					      v-model="searchForm.endDateStr"
					      type="date"
					      value-format="yyyyMMdd"
					      placeholder="截止操作日期"
					      style="width:180px;">
					    </el-date-picker>
					</div>
					<el-input style="width:180px;margin-left:20px" v-model="searchForm.modifieder" placeholder="操作人"></el-input>
					<el-input style="width:180px;margin-left:20px" v-model="searchForm.search_name" placeholder="姓名或拼音"></el-input>
					<el-button type="primary" @click="search">查询</el-button>
				</div>
			</div>
			<!--表格-->
			<el-table ref="table" :height="tableHeight" :data="cadreInformationList" border style="width: 100%;height: 100%;" >
				<el-table-column label="序号" align="center" width="80">
					<template slot-scope="scope">{{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
				</el-table-column>
				<el-table-column fixed prop="operation" label="操作" align="center" width="190">
					<template slot-scope="scope">
						<el-button type="text" @click="recovery(scope.$index, scope.row)">恢复</el-button>
						<el-button type="text" :disabled='scope.row.flag' @click="BrowsePersonal(scope.$index, scope.row)">浏览</el-button>
						<el-button type="text" :disabled='scope.row.flag' @click="handleFile(scope.$index, scope.row)">数字档案</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="a0101" label="姓名" show-overflow-tooltip align="center">
				</el-table-column>
				<el-table-column prop="a0104a" label="性别" width="70" align="center">
				</el-table-column>
				<el-table-column prop="a0107" label="出生日期" align="center">
				</el-table-column>
				<el-table-column prop="a0111a" label="籍贯" show-overflow-tooltip align="center">
				</el-table-column>
				<el-table-column prop="a0117a" label="民族" show-overflow-tooltip width="70" align="center">
				</el-table-column>
				<el-table-column prop="a0134" label="参加工作日期" width="100" align="center">
				</el-table-column>
				<el-table-column prop="a0141a" label="政治面貌" show-overflow-tooltip align="center">
				</el-table-column>
				<el-table-column prop="a0144" label="参加组织日期" width="100" align="center">
				</el-table-column>
				<el-table-column prop="e1001" label="文化程度" show-overflow-tooltip align="center">
				</el-table-column>
				<el-table-column prop="e10040" label="现职单位及职务" show-overflow-tooltip width="340" align="center">
				</el-table-column>
				<el-table-column prop="uLastmodifieddate" label="删除时间" show-overflow-tooltip width="100" align="center">
				</el-table-column>
				<el-table-column prop="uLastmodifieder" label="操作人" show-overflow-tooltip width="100" align="center">
				</el-table-column>
				
			</el-table>
			<!--分页-->
			<div class="material_page">
				<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
			</div>
			<!--浏览弹出层-->
			<el-dialog title="人员信息" width="100%" fullscreen :visible.sync="browse_personal" v-if='browse_personal' :close-on-click-modal="false" append-to-body>
				<BrowsePersonal :selectDeceive="chioceObj" :fourthShow='fourthShow' :dataType='dataType'></BrowsePersonal>
			</el-dialog>
			<!--数字档案-->
			<el-dialog fullscreen title="档案阅览" :visible.sync="readingArchivesVisible"  append-to-body v-if="readingArchivesVisible">
			<NoTimerReadingArchivesList :fileObject="fileObject" ></NoTimerReadingArchivesList>
		</el-dialog>
		</div>
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import BrowsePersonal from '../personnelManagement/BrowsePersonal.vue';
	import NoTimerReadingArchivesList from '../archivalBorrowing/NoTimerReadingArchivesList.vue';
	
	export default {
		name: "recycleBin", //干部信息总库
		components: {
			Pagination, //分页组件
			BrowsePersonal, //浏览人员
			NoTimerReadingArchivesList,//数字档案
		},
		data() {
			return {
				cadreInformationList:[],//列表集合
				recycleBin:[],//回收站集合
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				chioceObj: {}, //选中数据的对象
				searchForm: { //搜索
					startDateStr:'',//操作开始时间
					endDateStr:'',//操作结束时间
					search_name: "", //姓名或拼音
					modifieder:'',//	操作人
				},
				browse_personal: false, //浏览显示控件标志
				uAreacode:'',//区域
				uIsvalid:'1',
				hszType:'1',
				fourthShow:'hidden',//档案利用情况不显示
				dataType:'0',//回收站传的状态值
				readingArchivesVisible:false,//档案人员基本信息组件是否显示
				tableHeight:'',//表格高度
			}
			
		},
		mounted(){
			//this.$refs.table.$el.offsetTop + 10  ----table距最近的父元素顶部的高度
			//70   ---头部元素高度
			//52   ---分页元素高度
			this.tableHeight = window.innerHeight - (this.$refs.table.$el.offsetTop + 10) - 70 - 52;
		},
		created(){
			this.getPagerE01Z500Json()
		},
		methods:{
			//选中行列信息
//			clickRow(row, column, event) {
//				this.chioceObj = row;
//			},
/**
			 * 数字档案
			 */
			handleFile(index,row){
				this.fileObject = row;
				this.readingArchivesVisible = true;
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getPagerE01Z500Json();
			},
			getPagerE01Z500Json(){//回收站列表
				this.$axios({
					loading:{
            			isShow:true,
            			target:'#recycTable'
            		},
					method: 'post',
					url: this.API.queryRecycleList,
					data: {
						'uAreacode':this.uAreacode,
						'a01010': this.searchForm.search_name,
						'startDateStr': this.searchForm.startDateStr,
						'endDateStr': this.searchForm.endDateStr,
						'modifieder':this.searchForm.modifieder,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						if(resData.data.list.length> 0){
							this.cadreInformationList = resData.data.list;
						} else{
							this.cadreInformationList = [];
						}
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
			search(){//查询
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.getPagerE01Z500Json();
			},
			recovery(index, row){//恢复
				this.chioceObj=this.cadreInformationList[index];
				console.log(this.chioceObj);
				let self = this;
				this.$confirm('确定恢复选中记录?', '操作提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
			          this.$axios({
						method: 'get',
						url: self.API.saveOrUpdateA01,
						params: {
							'a0100':this.chioceObj.a0100,
							'uIsvalid':this.uIsvalid,
							'hszType':this.hszType,
							'e1000':this.chioceObj.e1000
						}
					}).then((res) => {
						if(res.data.code == "1") {
							this.getPagerE01Z500Json();
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
		       }).catch(() => {
		            this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});     
		        });
			},
			BrowsePersonal(index, row) {
				this.browse_personal = true;
				this.chioceObj=this.cadreInformationList[index];
			},
		}
	}
</script>

<style lang="scss">
	.archives-receive-containers {
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