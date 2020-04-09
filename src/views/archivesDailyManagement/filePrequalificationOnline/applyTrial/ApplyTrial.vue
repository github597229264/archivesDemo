<!--档案在线审核--申请预审模块-->
<template>
	<el-container class="apply-trial-container">
		<el-header class="my-header" style="height: 45px;"><h3>申请预审</h3></el-header>
		<el-main>
			<div class="apply-trial-container-title">
				<div class="apply-trial-container-titlel">
					<el-button type="primary" @click="add_applytrial_popUp=true">添加</el-button>
					<el-button class="dbtn" type="danger" @click="delApplyTrial">删除</el-button>
				</div>
				<div class="apply-trial-container-titler">
					<areaTreeSelect :defaultOptions="defaultOptions" @areaTreeSelectCall="getSelect" :title="title"></areaTreeSelect>
					<el-button class="sbtn" type="primary" @click="searchApplyTrial">查询</el-button>
				</div>
			</div>
			<!--table以及分页-->
			<hxTables ref='table' :pageObj="pageObj" :columns="columns" :dataSource="tableData" :options="options" :fetch="fetchTableData" @row-click="handleRowClick"></hxTables>
			<!--添加弹出层-->
			<el-dialog title="添加预审申请" :close-on-click-modal="false" width="60%" max-height="80%" :visible.sync="add_applytrial_popUp" v-if="add_applytrial_popUp">
				<addApplyTrial @backAddAT="getAddBack"></addApplyTrial>
			</el-dialog>	
			<!--详细弹出层-->
			<el-dialog title="预审详细" :close-on-click-modal="false" width="60%" max-height="80%" :visible.sync="detail_applytrial_popUp" v-if="detail_applytrial_popUp">
				<applyTrialDetail :applyTrialObj="applyTrialObj" @backDetailAT="getDetailBack"></applyTrialDetail>
			</el-dialog>
		</el-main>
	</el-container>
</template>

<script>
	import areaTreeSelect from '../../../../components/AreaTreeSelect.vue';
	import hxTables from '../../../../components/hxTable.vue';
	import addApplyTrial from './AddApplyTrial.vue';
	import applyTrialDetail from './ApplyTrialDetail.vue';
	
	export default{
		name:"ApplyTrial",//档案在线审核--申请预审模块
		components:{
			areaTreeSelect,
			hxTables,
			addApplyTrial,
			applyTrialDetail
		},
		data(){
			return{
				detail_applytrial_popUp:false,//控制详情的显示与否
				add_applytrial_popUp:false,//控制添加预审的显示与否
				e01z704a:"",//发往单位
				title:"请输入转往单位名称",
				defaultOptions:"",//发送单位的默认值
				pageObj: {//默认分页
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				columns: [ //表头
					{
			          button: true,
			          label: "操作",
			          width: '80',
			          fixed:'right',
			          group: [
			            {
			              name: "详细",
			              type: "text",
			              icon: "",
			              plain: false,
			              onClick: (row, index) => {
			                console.log(row, index);
			                this.detail_applytrial_popUp = true;
			                this.applyTrialObj = row;
			              },
			            }
			          ]
					},
					{
						prop: "e01z704a",
						label: "转往单位名称",
						showOverflowTooltip:true
					},
					{
						prop: "e01z701",
						label: "申请预审日期",
						showOverflowTooltip:true,
						width: '150'
					},
					{
						prop: "valStatusValue",
						label: "状态",
						width: '100'
					},
					{
						prop: "archnames",
						label: "档案人员",
						showOverflowTooltip:true
					},
					{
						prop: "backcontent",
						label: "反馈内容",
						showOverflowTooltip:true
					}
				],
				tableData: [],
				options: {
					mutiSelect: false,
					index: true, //显示序号， 多选则 mutiSelect
					loading: false, //表格加载动画
					initTable: true, //是否一挂载就加载数据
					border: true,
					maxHeight:0
				},
				type:"1",//申请预审 1 or 接收预审 2
				checkedApplyTrial:"",//选中的数据
				applyTrialObj:"",//预审对象
			}
		},
		watch:{
			tableData:{
				handler:function(newVal){
					this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 41;
					console.log("this.tableHeight"+this.tableHeight);
					this.options.maxHeight = this.tableHeight;
				}
			}
		},
		methods:{
			 getSelect(returnObj){//区域机构树形下拉框组件回调方法--子组件回传数据的方法     returnObj 选中的数据对象
		        if(returnObj)this.e01z704a = returnObj.code;
		        console.log("e01z704a"+this.e01z704a);
        	 },
        	 fetchTableData(){
				this.$axios({
					loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.apply-trial-container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},
					method: 'post',
					url: this.API.queryAllApplyReceive,
					data: {
						e01z704a: this.e01z704a,
						type : this.type,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.tableData = resData.data.list;
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
			getAddBack(data){//档案预审的添加的返回
				if(data === 'success')this.fetchTableData();
				this.add_applytrial_popUp = false;
			},
			delApplyTrial(){//档案预审的删除
				if(this.checkedApplyTrial === "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				this.$confirm('您确认删除这条数据吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.delFromNet();
				});
			},
			delFromNet(){//从服务器删除
				this.$axios({
					method: 'get',
					url: this.API.deleteApplyyushen,
					params: {
						'id': this.checkedApplyTrial.id
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.$confirm('删除成功！', '提示', {
							confirmButtonText: '确定',
							showCancelButton: false,
							type: 'warning',
							center: true
						});
						this.fetchTableData();
						this.checkedApplyTrial = "";
					} else {
						this.$message({
							type: 'error',
							message: '删除数据失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			},
			searchApplyTrial(){//档案预审的查询
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.fetchTableData();
			},
			handleRowClick(row, event, column) {//点击行事件，亦可绑定其他事件
				console.log("click row", row, event, column);
				this.checkedApplyTrial = row;
			},
			getDetailBack(){//详细的返回
				this.detail_applytrial_popUp = false;
			}
		},
	}
</script>

<style lang="scss">
	.apply-trial-container {
		height: 100%;
		.my-header {
			padding-top: 15px;
		}
		.el-main {
			background-color: #fff;
			height: 100%;
			.apply-trial-container-title{
				display: flex;
				justify-content: space-between;
				margin-bottom: 10px;
				.apply-trial-container-titlel{
					display: flex;
					.dbtn{
						margin-left: 10px;
					}
				}
				.apply-trial-container-titler{
					display: flex;
					.sbtn{
						margin-left: 10px;
					}
				}
			}
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