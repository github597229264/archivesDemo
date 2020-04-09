<!--批量材料处理-添加-->
<template>
	<div class="snapshotDate">
		<div class="head">
			<el-popover placement="bottom-start" width="400"  trigger="click" v-model='visible'> 
				<!---->
				<el-table :data="snapshotData" ref="table" border @row-click="clickRow">
					<el-table-column width="150" label="删除">
						<template slot-scope="scope">
							<el-button type="text" :disabled='scope.row.flag' @click.stop="snapshotDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
					<el-table-column width="100" label="名册名称">
						<template slot-scope="scope">名册{{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
					</el-table-column>
					<el-table-column width="300" property="producedate" label="时间"></el-table-column>
				</el-table>
				<!---->
				<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
				<el-button slot="reference">{{showName}}</el-button>
			</el-popover>
		</div>
		<div class="righthead">
			<el-input type="text" v-model="dynaQueryName" class="inputContent r" placeholder="姓名或者拼音"></el-input>
			<el-button type="primary" icon="el-icon-search"  @click="queryFunc">查询</el-button>
		</div>
	</div>
</template>

<script>
	import pagination from '../../../components/Pagination.vue';
	export default {
		name: "snapshotDate", //材料批量接收 添加，编辑
		components: {
			pagination
		},
		props: ['selectDeceive','pageSizeChange','pageIndexChange'],
		data() {
			return {
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				snapshotData:[],//生成快照日历列表
				chioceObj:[],//snapshotData选中数据row
				visible:false,//不显示
				showName:'名册',//显示名册名称
				dynaQueryName: '', //动态查询名字
			}
		},
		created() {
			
		},
		mouthed(){
			
		},
		watch:{
			selectDeceive:{
				handler:function(newVal){
					this.getQueryShotDate();//查询快照日历列表
				}
			},
			visible:{
				handler:function(newVal){
					if(newVal){
						this.getQueryShotDate();//查询快照日历列表
					}
					
				}
			},
			pageIndexChange:{
				handler:function(newVal){
					console.log(newVal)
					this.pageObj.pageIndex=newVal;
//					this.pageObj.pageSize=newVal.pageSize;
					this.getRosterDateRecords();//查询快照人员信息列表
				}
			},
			pageSizeChange:{
				handler:function(newVal){
					console.log(newVal)
					this.pageObj.pageSize=newVal;
//					this.pageObj.pageSize=newVal.pageSize;
					this.getRosterDateRecords();//查询快照人员信息列表
				}
			}
		},
		methods: {
			clickRow(row, column, event){//table被点击
				row.producedate=row.producedate.substring(0,10);
				this.chioceObj = row;
				this.getRosterDateRecords();
				this.showName='【名册'+event.which+'】'+row.producedate;
				this.visible=false;
			},
			queryFunc(){//查询
				this.pageObj=this.pageObj;
				this.getRosterDateRecords();//查询快照人员信息列表
			},
			snapshotDelete(index, row){//快照日历名册删除
				this.$confirm('确定删除选中记录?', '操作提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
					this.$axios({
	//					loading: {
	//						isShow: false,
	//						target: '#archivesRegister'
	//					},
						method: 'get',
						url: this.API.deleteRosterDateById,
						params: {
							'id': row.id
						}
					}).then((res) => {
						var resData = res.data;
						if(resData.code == "1") {
							this.getQueryShotDate();//查询快照日历列表
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
				}).catch(() => {
//		       		this.$message({
//						type: 'error',
//						message: '请求异常，请检查网络！'
//					});
		        });
				
			},
			//分页组件回调方法
			PageTurning(page_obj) {
				console.log(page_obj)
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getQueryShotDate();
			},
			// 查询快照日历列表
			getQueryShotDate() {
				this.$axios({
//					loading: {
//						isShow: false,
//						target: '#archivesRegister'
//					},
					method: 'get',
					url: this.API.getRosterDateList,
					params: {
						'rosterid': this.selectDeceive.id,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						let list = resData.data.list;
						if(list.length>0){
							for(let i=0;i<list.length;i++){
								let oldDate=list[i].producedate;
								let tempDate=this.commonFun.dateFormat(new Date(oldDate), "yyyy-MM-dd");
								list[i].producedate=tempDate.substring(0,10);
							}
							this.snapshotData = list;
							
							this.showName = "【名册1】" + this.snapshotData[0].producedate;
							this.chioceObj = this.snapshotData[0];
							this.getRosterDateRecords();//查询快照人员信息列表
							
							this.pageObj.total = resData.data.total;
						}else{
							this.showName='名册';
						}
						
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
			getRosterDateRecords(){//查询快照人员信息列表
				this.$axios({
//					loading: {
//						isShow: false,
//						target: '#archivesRegister'
//					},
					method: 'get',
					url: this.API.getRosterDateRecords,
					params: {
						'rosterdateid': this.chioceObj.id,
						'a01010':this.dynaQueryName,
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.$emit('snapshotdateBack',resData.data);
						
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
		},

	}
</script>

<style lang="scss" scoped type="text/css">
	.head /deep/ .el-button{
		width:150px;
		text-align: left;
	}
	.snapshotDate {
		width: 100%;
		padding-top: 10px;
		height: 40px;
		display: flex;
		justify-content: space-between;
		background: #fff;
		/*padding: 10px;*/
		.head {
				background: #fff;
				width: 25%;
				display: flex;
				align-items: center;
				border: none;
			}
		.righthead {
			width: 27%;
			height: 32px;
			display: flex;
			justify-content: flex-end;
			.inputContent {
				margin-right:10px;
			}
		}
		h3 {
			font-size: 16px;
			color: #fff;
			background-color: #369FDD;
			line-height: 38px;
			text-indent: 1em;
		}
		.add {
			margin: 10px 0 10px 10px;
		}
		.el-table {
			margin-top: 10px;
		}
		.el-table__body tr.current-row>td {
			background: #DCEBFA !important;
			color: #606266;
		}
		.dialog-footer {
			padding-top: 15px;
			text-align: center;
		}
		.material_page {
			/*margin-top: 10px;*/
			text-align: right;
		}
	}
</style>