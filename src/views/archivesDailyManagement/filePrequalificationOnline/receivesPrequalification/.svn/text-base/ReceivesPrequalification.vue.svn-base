<!--档案在线审核--接收预审模块-->
<template>
	<el-container class="receives-prequalification-container">
		<el-header class="my-header" style="height: 45px;"><h3>接收预审</h3></el-header>
		<el-main>
			<!--头部搜索栏-->
			<div class="receives-prequalification-title">
				<el-button type='danger' @click="prequalificationDel">删除</el-button>
				<div class="receives-prequalification-titler">
					<areaTreeSelect class="tree" :defaultOptions="defaultOptions" @areaTreeSelectCall="getSelect" :title="title"></areaTreeSelect>
					<el-button type="primary" @click="prequalificationSearch">搜索</el-button>
				</div>
			</div>
			<!--table以及分页-->
			<hxTables ref='table' :pageObj="pageObj" :columns="columns" :dataSource="tableData" :options="options" :fetch="fetchTableData" @row-click="handleRowClick"></hxTables>
			<!--回复弹出层-->
			<el-dialog title="反馈内容" :close-on-click-modal="false" width="40%" max-height="50%" :visible.sync="replay_prequalifi_popUp" v-if="replay_prequalifi_popUp">
				<replayPrequalification :id="prequaliObj.id" @backReplayPre="getReplayPreBack"></replayPrequalification>
			</el-dialog>	
			<!--详细弹出层-->
			<el-dialog title="预审详细" :close-on-click-modal="false" width="80%" max-height="80%" :visible.sync="detail_prequalificat_popUp" v-if="detail_prequalificat_popUp">
				<prequalificationDetail :prequaliObj="prequaliObj" @backDetailPre="getDetailPreBack"></prequalificationDetail>
			</el-dialog>
		</el-main>
	</el-container>
</template>

<script>
	import areaTreeSelect from '../../../../components/AreaTreeSelect.vue';
	import hxTables from '../../../../components/hxTable.vue';
	import replayPrequalification from './ReplayPrequalification.vue';
	import prequalificationDetail from './PrequalificationDetail.vue';
	
	export default{
		name:"ReceivesPrequalification",//档案在线审核--接收预审模块
		components:{
			areaTreeSelect,
			hxTables,
			replayPrequalification,
			prequalificationDetail
		},
		data(){
			return{
				replay_prequalifi_popUp:false,//控制回复的显示与否
				detail_prequalificat_popUp:false,//控制详情的显示与否
				title:"请输入申请单位名称",
				defaultOptions:"",//发送单位的默认值
				e01z704a:"",//申请单位名称
				pageObj: {//默认分页
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				columns: [ //表头
					{
			          button: true,
			          label: "操作",
			          width: '120',
			          fixed:'right',
			          group: [
			            {
			              name: "详细",
			              type: "text",
			              icon: "",
			              plain: false,
			              disabled:false,
			              onClick: (row, index) => {
			                console.log(row, index);
			                this.detail_prequalificat_popUp = true;
			                this.prequaliObj = row;
			              },
			            },
			            {
			              name: "回复",
			              type: "text",
			              icon: "",
			              plain: false,
			              disabled:true,
			              onClick: (row, index) => {
			                console.log(row, index);
			                this.replay_prequalifi_popUp = true;
			                this.prequaliObj = row;
			              }
			            }
			          ]
					},
					{
						prop: "e01z704a",
						label: "申请单位名称",
						showOverflowTooltip:true
					},
					{
						prop: "e01z701",
						label: "申请日期",
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
				type:"2",//申请预审 1 or 接收预审 2
				checkedPrequalification:"",//选中的数据
				prequaliObj:"",//详细和回复传递的对象
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
			prequalificationDel(){//删除
				if(this.checkedPrequalification === "") {
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
						'id': this.checkedPrequalification.id
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
						this.checkedPrequalification = "";
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
			prequalificationSearch(){//搜索
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.fetchTableData();
			},
			getSelect(returnObj){//区域机构树形下拉框组件回调方法--子组件回传数据的方法     returnObj 选中的数据对象
		        if(returnObj)this.e01z704a = returnObj.code;
		        console.log("e01z704a"+this.e01z704a);
        	},
        	fetchTableData(){
				this.$axios({
					loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.receives-prequalification-container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
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
						this.tableData.forEach(item=>{
							if(item.valStatusValue === "已审核")item.disabled = true;
							else item.disabled = false;
						})
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
			handleRowClick(row, event, column) {//点击行事件，亦可绑定其他事件
				console.log("click row", row, event, column);
				this.checkedPrequalification = row;
			},
			getReplayPreBack(data){//接收预审的回复返回
				this.replay_prequalifi_popUp = false;
				if(data === 'success') this.fetchTableData();
				this.checkedPrequalification = "";
			},
			getDetailPreBack(){//接收预审的详情的返回
				this.detail_prequalificat_popUp = false;
				this.checkedPrequalification = "";
			},
		}
	}
</script>

<style lang="scss">
	.receives-prequalification-container {
		height: 100%;
		.my-header {
			padding-top: 15px;
		}
		.el-main {
			background-color: #fff;
			height: 100%;
			.receives-prequalification-title{
				display: flex;
				justify-content: space-between;
				margin-bottom: 10px;
				.receives-prequalification-titler{
					display: flex;
					.tree{
						margin-right: 10px;
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
	}
</style>