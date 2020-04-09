<template>
	<div class="archives-receive-containerss">
		<div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>干部人员管理</el-breadcrumb-item>
				<el-breadcrumb-item>干部信息总库</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="content" id='baseTable'>
			<!--标题-->
			<div class="title">
				<div class="left">
					<el-button type="primary" @click="add_personal=true">添加</el-button>
				</div>
				<div class="right">
					<FileStatusTreeSelect style="width:180px"  :chioceOptionId="searchForm.e10statusb" @FileStatusTreeSelectCall="FileStatusTreeSelectCall"></FileStatusTreeSelect>
					<CadresCategoryTreeSelect style="width:180px;margin-left:20px" :chioceOptionId="searchForm.a01statusb" @CadresCategoryTreeSelectCall="CadresCategoryTreeSelectCall"></CadresCategoryTreeSelect>
					<el-input style="width:180px;margin-left:20px" v-model="searchForm.search_name" placeholder="姓名或拼音"></el-input>
					<el-button type="primary" @click="search">查询</el-button>
				</div>
			</div>
			<!--表格-->
			<el-table  ref="table" :height="tableHeight" :data="cadreInformationList" border style="width: 100%;" @row-click="clickRow">
				<el-table-column label="序号" align="center" width="80">
					<template slot-scope="scope">{{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
				</el-table-column>
				<el-table-column fixed prop="operation" label="操作" align="center" width="210">
					<template slot-scope="scope">
						<el-button v-if="scope.row.e10statusa=='转出'" type="text" disabled>编辑</el-button>
						<el-button v-else type="text" @click="editPersonal(scope.$index, scope.row)">编辑</el-button>
						<el-button type="text" :disabled='scope.row.flag' @click="BrowsePersonal(scope.$index, scope.row)">浏览</el-button>
						<el-button type="text" @click="handleFile(scope.$index, scope.row)" :disabled='scope.row.flag'>数字档案</el-button>
						<el-button type="text" :disabled='scope.row.flag' @click="deletePersonal(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="e10statusa" label="档案状态" align="center">
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
				<el-table-column prop="e10040" label="工作单位及职务" show-overflow-tooltip width="360" align="center">
				</el-table-column>
				
			</el-table>
			<!--分页-->
			<!--<div class="material_page">-->
				<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
			<!--</div>-->
			<!--新增弹出层-->
			<el-dialog title="新增人员信息" width="90%"  :visible.sync="add_personal" fullscreen v-if='add_personal' :close-on-click-modal="false" append-to-body>
				<AddPersonal  @addback="getAddBack"></AddPersonal>
			</el-dialog>
			<!--编辑弹出层-->
			<el-dialog 
				title="编辑信息" 
				width="100%"  
				fullscreen 
				:visible.sync="edit_personal" 
				v-if='edit_personal' 
				:close-on-click-modal="false" 
				append-to-body 
				:before-close='getEditBack'>
				<EditPersonal :selectDeceive="chioceObj"></EditPersonal>
			</el-dialog>
			<!--浏览弹出层-->
			<el-dialog title="人员信息" width="100%"  fullscreen :visible.sync="browse_personal" v-if='browse_personal' :close-on-click-modal="false" append-to-body>
				<BrowsePersonal :selectDeceive="chioceObj" ></BrowsePersonal>
			</el-dialog>
			<!--数字档案-->
			<el-dialog fullscreen title="档案阅览" :visible.sync="readingArchivesVisible"  append-to-body v-if="readingArchivesVisible">
			<NoTimerReadingArchivesList :fileObject="chioceObj" ></NoTimerReadingArchivesList>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	import Pagination from '../../components/Pagination.vue';
	import AddPersonal from './AddPersonal.vue';
	import EditPersonal from './EditPersonal.vue';
	import BrowsePersonal from './BrowsePersonal.vue';
	import FileStatusTreeSelect from '../../components/FileStatusTreeSelect.vue';
	import CadresCategoryTreeSelect from '../../components/CadresCategoryTreeSelect.vue';
	import NoTimerReadingArchivesList from '../archivalBorrowing/NoTimerReadingArchivesList.vue';

	export default {
		name: "CadreInformationBase", //干部信息总库
		components: {
			Pagination, //分页组件
			AddPersonal, //新增人员
			EditPersonal, //编辑信息
			BrowsePersonal, //浏览人员
			FileStatusTreeSelect, //档案状态
			CadresCategoryTreeSelect, //干部类别
			NoTimerReadingArchivesList,//数字档案
		},
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
			//添加人员信息
			addPersonal() {
				let pathUrl = 'AddPersonal';
				this.$router.push({
					path: pathUrl,
				});
			},
			//编辑信息
			editPersonal(index, row) {
				this.chioceObj = this.cadreInformationList[index];
				if(this.chioceObj == "") {

					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				} else {
					this.edit_personal = true
				}

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
					method: 'get',
					url: this.API.findA01InformationPage,
					params: {
						'a01010': this.searchForm.search_name,
						'a01statusb': this.searchForm.a01statusb,
						'e10statusb': this.searchForm.e10statusb,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
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
			deletePersonal(index, row){
				let item = this.cadreInformationList[index];               
                let self = this;
				this.$confirm('确定删除选中记录?', '操作提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
			          //self.delUser(item.id,self);//请求后台进行删除
			          this.$axios({
						method: 'get',
						url: this.API.deleteA01,
						params: {
							'a0100': item.a0100,
						}
					}).then((res) => {
	
						if(res.data.code == "1") {
							this.getPagerE01Z500Json()
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
//		       		this.$message({
//						type: 'error',
//						message: '请求异常，请检查网络！'
//					});
		        });
			},
			getAddBack(ReFresh) { //从添加回来的
				if(ReFresh){
					this.add_personal=false;
					this.getPagerE01Z500Json();
				}
				//this.add_receive_popUp = false;
			},
			FileStatusTreeSelectCall(id) {//档案状态回调
				this.searchForm.e10statusb = id;
			},
			CadresCategoryTreeSelectCall(id){//干部类别回调
				this.searchForm.a01statusb = id;
			},
			getEditBack(done){//编辑回调
				this.getPagerE01Z500Json();
				this.edit_personal = false;
			}
		}
	}
</script>

<style lang="scss">
	.archives-receive-containerss {
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