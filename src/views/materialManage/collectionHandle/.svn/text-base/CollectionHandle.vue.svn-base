<!--催收处理模块-->
<template>
	<el-container class="collection-handle-container">
		<el-header class="my-header" style="height: 45px;">催收处理</el-header>
		<el-main>
			<div class="collection-handle-title">
				<areaTreeSelect class="areaTree" :defaultOptions="defaultOptions" @areaTreeSelectCall="getSelect" :title="title"></areaTreeSelect>
				<el-button type="primary" @click="search">查询</el-button>
			</div>
			<!--表格以及分页-->
			<hxTables ref="table" :pageObj="pageObj" :columns="columns" :dataSource="tableData" :options="options" :fetch="fetchTableData" @row-click="handleRowClick">
				<!--<div slot="tableAction" slot-scope="data">
					<el-button type='text' @click="oppration('data')" ></el-button>
				</div>-->
			</hxTables>
			<!--回复弹出层-->
			<el-dialog :title="dialogTitle" :close-on-click-modal="false" width="80%" max-height="94%" :visible.sync="replycollection_handle_popUp" v-if="replycollection_handle_popUp">
				<replyCollectionHandle :replyCollectionHandleObj='replyCollectionHandleObj' @backAdd="getAddBack"></replyCollectionHandle>
			</el-dialog>
			<!--查看弹出层-->
			<el-dialog :title="dialogTitle" :close-on-click-modal="false" width="80%" max-height="94%" :visible.sync="replycollection_detail_popUp" v-if="replycollection_detail_popUp">
				<replyCorllectionDetail :replyCollectionHandleObj='replyCollectionHandleObj' @backAdd="getAddBack"></replyCorllectionDetail>
			</el-dialog>
		</el-main>
	</el-container>
</template>

<script>
	import hxTables from "../../../components/hxTable.vue";
	import areaTreeSelect from '../../../components/AreaTreeSelect.vue';
	import replyCollectionHandle from './ReplyCollectionHandle.vue';
	import replyCorllectionDetail from './ReplyCollectionDetail.vue';
	
	export default{
		name:"CollectionHandle",//催收处理模块
		components: {
			hxTables,
			areaTreeSelect,
			replyCollectionHandle,
			replyCorllectionDetail
		},
		data(){
			return{
				dialogTitle:"",//dialog标题
				replycollection_handle_popUp:false,//回复对话框是否显示
				replycollection_detail_popUp:false,//查看对话框是否显示
				defaultOptions:"",//发往单位默认值为空
				e01z209a:"",//发件单位 名称
				title:"发往单位",
				tableHeight:0,
				replyCollectionHandleObj:"",//回复对象
				columns: [ //表头
					{
			          button: true,
			          label: "操作",
			          width: '80',
			          fixed:'right',
			          group: [
			            {
			              name: "回复",
			              type: "text",
			              icon: "",
			              plain: false,
			              onClick: (row, index) => {
			                // 箭头函数写法的 this 代表 Vue 实例
			                console.log(row, index);
			                this.replyCollectionHandleObj = row;
							if(row.oprationValue){
								this.dialogTitle = '查看';
								this.replycollection_detail_popUp = true;
							}else {
								this.dialogTitle = '回复';
								this.replycollection_handle_popUp = true;
							}
			              },
			            }
			          ]
					},
					{
						prop: "e01z209a",
						label: "发件单位",
						showOverflowTooltip:true
					},
					{
						prop: "e01z208",
						label: "发件人",
						showOverflowTooltip:true
					},
					{
						prop: "title",
						label: "标题",
						showOverflowTooltip:true
					},
					{
						prop: "transferTime",
						label: "收件日期",
						width:'120'
					},
					{
						prop: "content",
						label: "催收内容",
						showOverflowTooltip:true
					},
					{
						prop: "statusValue",
						label: "状态",
						width:'100'
					},
					{
						prop: "backcontent",
						label: "反馈内容",
						showOverflowTooltip:true
					}
				],
				tableData: [],
				pageObj: {//默认分页
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				options: {
					mutiSelect: false,
					index: true, //显示序号， 多选则 mutiSelect
					loading: false, //表格加载动画
					initTable: true, //是否一挂载就加载数据
					border: true,
					maxHeight:0
				}
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
			fetchTableData() {//获取列表数据
				this.$axios({
					loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.material-collection-container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},
					method: 'post',
					url: this.API.queryAllProcessing,
					data: {
						'e01z209a': this.e01z209a,
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.tableData = resData.data.list;
						this.tableData.forEach(item=>{
							if(item.statusValue === "未处理")item.oprationValue = false;//未处理false,已处理true
							else item.oprationValue = true;
						})
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
			handleRowClick(row, event, column) {
				//点击行事件，亦可绑定其他事件
				console.log("click row", row, event, column);
			},
			search(){//搜索
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.fetchTableData();
			},
        	getSelect(returnObj){//区域机构树形下拉框组件回调方法--子组件回传数据的方法 选中的数据对象
		        if(returnObj)this.e01z209a = returnObj.code;
		        console.log("e01z209a"+this.e01z209a);
        	},
        	getAddBack(){//回复回来的
        		this.replycollection_handle_popUp = false;
        		this.fetchTableData();
        	}
		}
	}
</script>

<style lang="scss">
	.collection-handle-container {
		height: 100%;
		.my-header {
			padding-top: 15px;
		}
		.el-main {
			background-color: #fff;
			height: 100%;
			.collection-handle-title{
				display: flex;
				justify-content: flex-end;
				margin-bottom: 10px;
				.areaTree{
					margin-right: 10px;
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