<template>
	<div class="trans-con">
				<!--标题-->
				<div class="title">
					<div class="left">
						<el-button type="primary" @click="addTransfer">添加</el-button>
					</div>
				</div>
				<!--表格-->
				<el-table :data="TransferData" :height="tableHeight" ref="table"  style="width: 100%" @row-click="Transfer_clickRow">
					<el-table-column label="序号" type="index" align="center" width="100">
						<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
					</el-table-column>
					<el-table-column label="操作" fixed width="120" align="center">
	                    <template slot-scope="scope">
	                        <!--<el-button type="text"  v-if="scope.row.status == 2" class="gray">编辑</el-button>-->
	                        <el-button type="text"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	                        <!--<el-button type="text"  v-if="scope.row.status == 2" class="gray">删除</el-button>-->
	                        <el-button type="text"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	                    </template>
	               	</el-table-column>
					<el-table-column label="调入单位" align="center">
						<el-table-column prop="a2921a" label="单位名称" show-overflow-tooltip width="200" align="center">
						</el-table-column>
						<el-table-column prop="a2907" label="进入日期" show-overflow-tooltip width="120" align="center">
						</el-table-column>
						<el-table-column prop="a2917Name" label="进入原因" show-overflow-tooltip align="center">
						</el-table-column>
					</el-table-column>
					<el-table-column label="调出单位" align="center">
						<el-table-column prop="a3007a" label="单位名称" show-overflow-tooltip width="200" align="center">
						</el-table-column>
						<el-table-column prop="a3004" label="调出日期" show-overflow-tooltip width="120" align="center">
						</el-table-column>
						<el-table-column prop="a3031Name" label="调出原因" show-overflow-tooltip align="center">
						</el-table-column>
					</el-table-column>
					
				</el-table>
				<!--分页-->
				<div class="material_page">
					<pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
				</div>
				<!--新增弹出层-->
				<el-dialog title="调动信息" width="90%" height="350px" fullscreen :visible.sync="isShow" v-if='isShow' append-to-body :close-on-click-modal="false">
					<TransferListAdd :selectDeceive="chioceObj" :addOrEdit="addOrEdit"  @backCall="getAddBack"></TransferListAdd>
				</el-dialog>
				<!--编辑弹出层-->
			</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import TransferListAdd from './TransferListAdd.vue';

	export default {
		name:'EditTransferInformation',
		props: ['selectObj'],
		components: {
			Pagination, //分页组件
			TransferListAdd, //新增人员
		},

		data() {
			return {
				TransferData: [], //调动信息
				pageObj: {//分页
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				edit_add_personal:false,//添加
				chioceObj:{},//选中
				addOrEdit:'add',//判断添加还是修改
				isShow:false,
				tableHeight:'',
			}
		},
		mounted() {
			//this.$refs.table.$el.offsetTop + 10  ----table距最近的父元素顶部的高度
			//70   ---头部元素高度
			//52   ---分页元素高度
			this.tableHeight = window.innerHeight - (this.$refs.table.$el.offsetTop) - 70 - 52;
		},
		created(){
			this.getTransferList();

		},
		methods: {
			//分页组件回调方法
			PageTurning(page_obj) {
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getTransferList();
			},
			getTransferList() { //调动信息
				this.$axios({
					loading:{
            			isShow:true,
            			target:'.trans-con'
            		},
					method: 'get',
					url: this.API.findA2930InformationPage,
					params: {
						a0100: this.selectObj.a0100,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize,
					}
				}).then((res) => {
					if(res.data.code == "1") {
						var resData = res.data.data;
						this.TransferData = resData.list;
						this.pageObj.total=resData.total;
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
			addTransfer(){//添加调动信息
				this.isShow=true;
//				this.chioceObj={};
				this.chioceObj = this.selectObj;
				this.addOrEdit='add';
			},
			handleEdit(index,row){//调动信息-编辑
				this.addOrEdit='edit';
				this.chioceObj = this.TransferData[index];
				if(this.chioceObj == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				} else {
					this.isShow = true
				}
			},
			Transfer_clickRow(row, column, event){//调动信息-删除
				console.log(row, column, event)
			},
			/*
             * 删除用户
             */
            handleDelete(index, row) {
                let item = this.TransferData[index];               
                let self = this;
				this.$confirm('确定要删除选中记录吗?', '操作提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		       }).then(() => {
		          this.$axios({
					method: 'get',
					url: this.API.deleteA2930,
					params: {
						'a293000': item.a293000,
					}
				}).then((res) => {
					if(res.data.code == "1") {
						this.getTransferList()
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
		       	
		        });
            },
            getAddBack(reFresh){
            	if(reFresh){
            		this.isShow=false;
            		this.getTransferList();
            	}
            }
		}
	}
</script>

<style lang="scss" scoped>
	.trans-con{
		width:100%;
		height:100%;
		.title{
			margin-bottom: 10px;
		}
		.el-table{
			
		}
		.material_page{
			text-align: right;
			margin-top:10px
		}
	}
			
</style>