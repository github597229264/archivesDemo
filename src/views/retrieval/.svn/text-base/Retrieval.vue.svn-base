<template>
	<div class="retrieval">
		<div class="head">
			<h4>档案检索</h4>
		</div>
		<div class='main'>
			<div class="l leftAside">
				<!--全文检索-->
				<!--<div class="archives-search">
					<div class="all-title">
						<span>全文检索</span>
					</div>
					<div class="search-input">
						<el-input v-model="allSearchText" placeholder="请输入内容"></el-input>
						<el-button type="primary" @click="all_search">查询</el-button>
					</div>
				</div>-->
				<!--高级检索-->
				<div class="archives-search">
					<div class="all-title">
						<span>高级检索 </span>
						<!--<span class="custom-title" @click="customFunc">自定义查询>></span>-->
					</div>
					<div class="search-input superior">
						<el-form ref="form" :model="supSearch" label-width="120px">
							<el-input v-model="supSearch.name" placeholder="姓名/拼音"></el-input>
							<el-input v-model="supSearch.sex" placeholder="性别"></el-input>
							<el-input v-model="supSearch.birthPlace" placeholder="籍贯"></el-input>
							<el-input v-model="supSearch.post" placeholder="现职单位及职务"></el-input>
							<el-button type="primary" @click="getSupSearch">查询</el-button>
						</el-form>
					</div>
				</div>
				
				<!--<div class="flex-bottom">
					收藏快查
					<div class="archives-search">
						<el-button type="primary" @click="getSupSearch">收藏快查</el-button>
					</div>
					查询日志
					<div class="archives-search">
						<el-button type="primary" @click="getSupSearch">查询日志</el-button>
					</div>
				</div>-->
			</div>
			<div class="contentRight r">
				<div class="left">
					<!--<el-button type="primary">收藏</el-button>-->
					<el-button type="primary" @click="getExport">导出</el-button>
				</div>
				<div class="topheight1" id='tableList'>
					<el-table ref="table" :height='tableHeight' :data="retrievalData" border style="width: 100%;">
						<el-table-column prop="operation" label="操作" fixed align="center" width="190">
							<template slot-scope="scope">
								<el-button v-if="scope.row.e10statusa=='转出'" type="text" disabled>编辑</el-button>
								<el-button v-else type="text" @click="editFunc(scope.$index, scope.row)">编辑</el-button>
								<el-button type="text" :disabled='scope.row.flag' @click="BrowsePersonal(scope.$index, scope.row)">浏览</el-button>
								<el-button type="text" :disabled='scope.row.flag' @click="handleFile(scope.$index, scope.row)">数字档案</el-button>
							</template>
						</el-table-column>
						<el-table-column prop="e10statusa" label="档案状态" align="center">
						</el-table-column>
						<el-table-column prop="a0101" label="姓名" show-overflow-tooltip align="center">
						</el-table-column>
						<el-table-column prop="a0104a" label="性别" width="70" align="center">
						</el-table-column>
						<el-table-column prop="a0111a" label="籍贯" show-overflow-tooltip align="center">
						</el-table-column>
						<el-table-column prop="e10040" label="现职单位及职务" show-overflow-tooltip width="300" align="center">
						</el-table-column>
						<el-table-column prop="a0117a" label="民族" show-overflow-tooltip width="70" align="center">
						</el-table-column>
						<el-table-column prop="a0141a" label="政治面貌" show-overflow-tooltip align="center">
						</el-table-column>
						<el-table-column prop="a0144" label="参加组织日期" width='100' align="center">
						</el-table-column>
						<el-table-column prop="e1001" label="文化程度" show-overflow-tooltip align="center">
						</el-table-column>

					</el-table>
					<!--分页-->
					<div class="material_page">
						<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
					</div>
				</div>

			</div>
		</div>
		<!--编辑弹出层-->
		<el-dialog title="编辑信息" width="100%" fullscreen :visible.sync="edit_personal" v-if='edit_personal' :close-on-click-modal="false" append-to-body>
			<EditPersonal :selectDeceive="chioceObj" @addback="getAddBack"></EditPersonal>
		</el-dialog>
		<!--浏览弹出层-->
		<el-dialog title="人员信息" width="100%" fullscreen :visible.sync="browse_personal" v-if='browse_personal' :close-on-click-modal="false" append-to-body>
			<BrowsePersonal :selectDeceive="chioceObj" :fourthShow='fourthShow'></BrowsePersonal>
		</el-dialog>
		<!--数字档案-->
		<el-dialog fullscreen title="档案阅览" :visible.sync="readingArchivesVisible"  append-to-body v-if="readingArchivesVisible">
			<NoTimerReadingArchivesList :fileObject="chioceObj" ></NoTimerReadingArchivesList>
		</el-dialog>
		<!--自定义查询-->
		<!--<el-dialog title="自定义查询" width="70%"  :visible.sync="custom_search"  v-if='custom_search' :close-on-click-modal="false" append-to-body>
			<customSearch  @customBack="getAddBack"></customSearch>
		</el-dialog>-->
	</div>
</template>
<script>
	import Pagination from '../../components/Pagination.vue';
	import EditPersonal from '../personnelManagement/EditPersonal.vue';
	import BrowsePersonal from '../personnelManagement/BrowsePersonal.vue';
	import NoTimerReadingArchivesList from '../archivalBorrowing/NoTimerReadingArchivesList.vue';
//	import customSearch from './customSearch.vue';

	export default {
		name: 'Retrieval',
		components: {
			EditPersonal, //编辑信息
			Pagination, //分页组件
			BrowsePersonal, //浏览人员
			NoTimerReadingArchivesList,//数字档案
//			customSearch,//自定义查询
		},
		data() {
			return {
				allSearchText: '', //全文搜索内容
				supSearch: { //高级搜索
					name: '',
					sex: '',
					birthPlace: '',
					post: ''
				},
				custom_search:false,//自定义查询
				edit_personal: false, //编辑回显
				chioceObj: {}, //选中的数组
				retrievalData: [], //档案集合
				tableHeight:'',//表格高度
				browse_personal: false, //浏览
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				fourthShow: 'hidden', //档案利用情况不显示
				readingArchivesVisible:false,//阅读器弹窗是否显示
			};
		},
		created() {
			this.getRetrievalList()
		},
		mounted() {
			//this.$refs.table.$el.offsetTop + 10  ----table距最近的父元素顶部的高度
			//70   ---头部元素高度
			//52   ---分页元素高度
			this.tableHeight = window.innerHeight - (this.$refs.table.$el.offsetTop + 10) - 70 - 52-40;
		},
		methods: {
			//			all_search() { //全文检索
			//				console.log(this.allSearchText)
			//			},
			getSupSearch(){//高级检索
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.getRetrievalList();
			},
			/**
			 * 数字档案
			 */
			handleFile(index,row){
				this.chioceObj = row;
				this.readingArchivesVisible = true;
			},
			getRetrievalList() { //列表
				this.$axios({
					loading:{
            			isShow:true,
            			target:'#tableList'
            		},
					method: 'post',
					url: this.API.a01Search,
					data: {
						'a0101': this.supSearch.name,
						'a0104a': this.supSearch.sex,
						'a0111a': this.supSearch.birthPlace,
						'e10040': this.supSearch.post,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.retrievalData = resData.data.list;
						this.pageObj.total = resData.data.total;
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}
				}).catch(function(err) {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getAddBack(ReFresh) { //从添加回来的
				if(ReFresh) {
					this.add_personal = false;
					this.getPagerE01Z500Json();
				}
				//this.add_receive_popUp = false;
			},
			getExport() {
				this.$axios({
					method: 'post',
					url: this.API.exportToExcel,
					responseType: "arraybuffer",
					data: {
						'a0101': this.supSearch.name,
						'a0104a': this.supSearch.sex,
						'a0111a': this.supSearch.birthPlace,
						'e10040': this.supSearch.post,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then(
					function(response) {
						let filename = "人员基本信息.xlsx";
						this.fileDownload(response.data, filename);
					}.bind(this)
				)
				.catch(
					function(error) {
						alert("网络请求出错");
					}.bind(this)
				);
			},
			fileDownload:function(data, fileName) {//文件导出
				let blob = new Blob([data], {
					type: "application/octet-stream"
				});
				let filename = fileName || "filename.xls";
				if(typeof window.navigator.msSaveBlob !== "undefined") {
					window.navigator.msSaveBlob(blob, filename);
				} else {
					var blobURL = window.URL.createObjectURL(blob);
					var tempLink = document.createElement("a");
					tempLink.style.display = "none";
					tempLink.href = blobURL;
					tempLink.setAttribute("download", filename);
					if(typeof tempLink.download === "undefined") {
						tempLink.setAttribute("target", "_blank");
					}
					document.body.appendChild(tempLink);
					tempLink.click();
					document.body.removeChild(tempLink);
					window.URL.revokeObjectURL(blobURL);
				}
			},
			editFunc(index, row) { //编辑
				this.chioceObj = this.retrievalData[index];
				console.log(this.chioceObj);
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
			setCurrent(row) {
				this.$refs.singleTable.setCurrentRow(row);
			},
			handleCurrentChange(val) {
				this.currentRow = val;
				this.getRetrievalList();
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getRetrievalList();
			},
			BrowsePersonal(index, row) { //浏览
				this.browse_personal = true;
				this.chioceObj = this.retrievalData[index];
			},
			customFunc(){//自定义查询
				this.custom_search=true;
			}
		}
		
	};
</script>
<style lang="scss" scoped type="text/css">
.retrieval{
	height:100%;
	.head {
		width: 100%;
		height: 40px;
		line-height: 40px;
		background-color: #f5f5f5;
		border-bottom: 1px solid #ccc;
		h4 {
			padding-left: 15px;
			font-size: 16px;
		}
	}
	
	.main {
		width: 100%;
		height: 87vh;
		background: #fff;
		.leftAside {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			.flex-bottom{
				flex: 1;
				background: #fff;
				.archives-search{
					height:50%;
					display: flex;
					justify-content: center;
					align-items: center;
					.el-button{
						background: #227AB8;
						width:130px;
						padding:15px 0;
						font-size: 14px;
					}
				}
			}
			.archives-search {
				background: #eee;
				margin: 5px;
				padding: 0 5px;
				.all-title {
					height: 40px;
					line-height: 40px;
					font-size: 16px;
					margin-left: 12px;
					color: #3f3f3f;
					display: flex;
					justify-content: space-between;
					.custom-title{
						cursor: pointer;
						color:#227AB8;
						font-weight: 600;
					}
					.custom-title:hover{
						color: #f5a23a;
					}
				}
			}
			.search-input {
				padding: 2px 4px 26px;
				display: flex;
				justify-content: space-between;
				.el-input {
					width: 70%
				}
				.el-button{
					background: #227AB8;
					font-size: 14px;
				}
			}
			.superior {
				flex-direction: column;
				.el-form {
					display: flex;
					flex-direction: column;
					/*justify-content:center;*/
					align-items: center;
					.el-input {
						width: 80%;
						margin-bottom: 15px;
					}
				}
				.el-button{
					background: #227AB8;
					width:130px;
					font-size: 14px;
				}
			}
		}
		.contentRight {
			position: relative;
			.left {
				padding: 10px 0 0 10px;
			}
			.material_page {
				margin-top: 10px;
				text-align: right;
			}
		}
	}
	
	.topheight {
		margin-top: 15px;
	}
	
	.topheight1 {
		margin-top: 5px;
		.material_page {
			margin-top: 10px;
			text-align: right;
		}
	}
	
	.leftAside {
		width: 18%;
		height: 100%;
		border-right: 1px solid #ccc;
		.leftHead {
			height: 40px;
			line-height: 40px;
		}
	}
	
	.contentRight {
		width: 82%;
		.righthead {
			width: 100%;
			padding-top: 10px;
			height: 40px;
			.inputContent {
				width: 22%;
			}
		}
	}
	
	.inputContent1 {
		width: 73%;
	}
	
	.Pagination {
		height: 38px;
	}
	}
</style>