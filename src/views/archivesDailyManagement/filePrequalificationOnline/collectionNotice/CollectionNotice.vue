<!--档案在线审核--催收通知模块-->
<template>
	<el-container class="collection-notice-container">
		<el-header class="my-header" style="height: 45px;"><h3>催收通知</h3></el-header>
		<el-main>
			<!--搜索栏-->
			<div class="collection-notice-rg">
				<areaTreeSelect :defaultOptions="defaultOptions" @areaTreeSelectCall="getSelect" :title="title"></areaTreeSelect>
				<el-button type="primary" @click="searchCollectionNotice">搜索</el-button>
			</div>
			<!--table以及分页-->
			<hxTables ref='table' :pageObj="pageObj" :columns="columns" :dataSource="tableData" :options="options" :fetch="fetchTableData"></hxTables>
			<!--回复弹出层-->
			<el-dialog :title="dialogTitle" :close-on-click-modal="false" width="80%" max-height="94%" :visible.sync="addcollection_notice_popUp" v-if="addcollection_notice_popUp">
				<replayCollectionNotice :checkedCollectionNotice="checkedCollectionNotice" @backAddCN="getAddBack"></replayCollectionNotice>
			</el-dialog>
			<!--查看弹出层-->
			<el-dialog :title="dialogTitle" :close-on-click-modal="false" width="80%" max-height="94%" :visible.sync="detailc_notice_popUp" v-if="detailc_notice_popUp">
				<collectionNoticeDetail :checkedCollectionNotice="checkedCollectionNotice" @backAddCND="getAddBackDetail"></collectionNoticeDetail>
			</el-dialog>
		</el-main>
	</el-container>
</template>

<script>
	import hxTables from '../../../../components/hxTable.vue';
	import areaTreeSelect from '../../../../components/AreaTreeSelect.vue';
	import replayCollectionNotice  from './ReplayCollectionNotice.vue';
	import collectionNoticeDetail  from './CollectionNoticeDetail.vue';
	
	export default{
		name:"CollectionNotice",//档案在线审核--催收通知模块
		components:{
			hxTables,
			areaTreeSelect,
			replayCollectionNotice,
			collectionNoticeDetail
		},
		data(){
			return{
				checkedCollectionNotice:"",//选中的对象
				addcollection_notice_popUp:false,//控制回复是否显示
				detailc_notice_popUp:false,//控制查看是否显示
				dialogTitle:"",//dialog标题
				tableHeight:0,
				defaultOptions:"",//发送单位的默认值
				title:"请选择发件单位",
				e01z209a:"",//发往单位
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
			              name: "回复",
			              type: "text",
			              icon: "",
			              plain: false,
			              onClick: (row, index) => {
			                // 箭头函数写法的 this 代表 Vue 实例
			                console.log(row, index);
			                this.checkedCollectionNotice = row;
							if(row.oprationValue){
								this.dialogTitle = '查看';
								this.detailc_notice_popUp = true;
							}else {
								this.dialogTitle = '回复';
								this.addcollection_notice_popUp = true;
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
						prop: "content",
						label: "催收内容",
						showOverflowTooltip:true
					},
					{
						prop: "statusValue",
						label: "状态",
						 width: '100',
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
				type:"2",//1 档案催收 2 催收通知
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
		        if(returnObj)this.e01z209a = returnObj.code;
		        console.log("e01z209a"+this.e01z209a);
        	 },
        	 searchCollectionNotice(){//搜索
        	 	this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.fetchTableData();
        	 },
        	 fetchTableData(){
				this.$axios({
					loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.collection-notice-container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},
					method: 'post',
					url: this.API.queryAllFilePretrial,
					data: {
						'e01z209a': this.e01z209a,
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
			getAddBack(){//回复回来的
				this.addcollection_notice_popUp = false;
				this.fetchTableData();
			},
			getAddBackDetail(){//查看回来的
				this.detailc_notice_popUp = false;
			}
		}
	}
</script>

<style lang="scss">
	.collection-notice-container {
		height: 100%;
		.my-header {
			padding-top: 15px;
		}
		.el-main {
			background-color: #fff;
			height: 100%;
			.collection-notice-rg{
				margin-bottom:10px;
				justify-content: flex-end;
				display:flex;
				.el-button{
					margin-left: 10px;
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