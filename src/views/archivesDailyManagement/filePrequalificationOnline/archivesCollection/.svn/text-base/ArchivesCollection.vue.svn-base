<!--档案在线审核--档案催收模块-->
<template>
	<el-container class="archives-collection-container">
		<el-header class="my-header" style="height: 45px;"><h3>档案催收</h3></el-header>
		<el-main>
			<!--搜索栏-->
			<div class="archives-collection-title">
				<div class="archives-collection-title-lf">
					<el-button type="primary" @click="addarchiver_collection_popUp=true">添加</el-button>
					<el-button type="danger" @click="delArchivesCollection">删除</el-button>
				</div>
				<div class="archives-collection-title-rg">
					<areaTreeSelect :defaultOptions="defaultOptions" @areaTreeSelectCall="getSelect" :title="title"></areaTreeSelect>
					<el-button type="primary" @click="searchArchivesCollection">搜索</el-button>
				</div>
			</div>
			<!--表格以及分页-->
			<hxTables ref="table" :pageObj="pageObj" :columns="columns" :dataSource="tableData" :options="options" :fetch="fetchTableData" @row-click="handleRowClick">
			</hxTables>
			<!--新增弹出层-->
			<el-dialog title="添加" :close-on-click-modal="false" width="40%" max-height="60%" :visible.sync="addarchiver_collection_popUp" v-if="addarchiver_collection_popUp">
				<addMaterialCollection :isArchivesCollection='isArchivesCollection' @backAddMC="getAddBackmc"></addMaterialCollection>
			</el-dialog>
		</el-main>
	</el-container>
</template>

<script>
	import hxTables from "../../../../components/hxTable.vue";
	import areaTreeSelect from '../../../../components/AreaTreeSelect.vue';
	import addMaterialCollection from '../../../materialManage/materialCollection/AddMaterialCollection.vue';
	
	export default{
		name:"ArchivesCollection",//档案在线审核--档案催收模块
		components:{
			hxTables,
			areaTreeSelect,
			addMaterialCollection
		},
		data(){
			return{
				addarchiver_collection_popUp:false,//控制添加界面是否显示
				defaultOptions:"",
				title:"请选择发往单位",
				tableHeight:0,//高度
				isArchivesCollection:true,//从档案催收过去的true，材料催收进入的false
				columns: [ //表头
					{
						prop: "receiveor",
						label: "发往单位",
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
						label: "状态"
					}
				],
				tableData: [],//table数据
				pageObj: {//默认分页
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				options: {
					mutiSelect: false,//是否有选中框
					index: true, //显示序号， 多选则 mutiSelect
					loading: false, //表格加载动画
					initTable: true, //是否一挂载就加载数据
					border: true, //边框
					maxHeight:0 //table高度
				},
				e01z209a:"",//发往单位 编码
				type:"1",//1 档案催收 2 催收通知
				checkedArchivesCollection:"",//选中的档案催收对象
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
			delArchivesCollection(){//删除方法
				if(this.checkedArchivesCollection === ""){
					this.$confirm('请选择一条数据！','提示',{
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
			delFromNet(){//从服务器删除数据
				this.$axios({
					method: 'get',
					url: this.API.deletefileOnlinePretrial,
					params: {
						'id': this.checkedArchivesCollection.id,
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1"){
						this.$message.success("删除数据成功！");
						this.fetchTableData();
						this.checkedArchivesCollection = "";
					} 
					else this.$message.error("删除数据失败，请刷新重试！");
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			},
			fetchTableData(){
				this.$axios({
					loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.archives-collection-container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
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
			searchArchivesCollection(){//搜索功能
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.fetchTableData();
				this.checkedArchivesCollection = "";
			},
        	getSelect(returnObj){//区域机构树形下拉框组件回调方法--子组件回传数据的方法     returnObj 选中的数据对象
		        if(returnObj)this.e01z209a = returnObj.code;
		        console.log("e01z209a"+this.e01z209a);
        	},
        	getAddBackmc(data){
        	 	if(data === "success") this.fetchTableData();
        	 	this.addarchiver_collection_popUp = false;
        	 	this.checkedArchivesCollection = "";
        	},
        	handleRowClick(row, event, column) {
				//点击行事件，亦可绑定其他事件
				console.log("click row", row, event, column);
				this.checkedArchivesCollection = row;
			},
		}
	}
</script>

<style lang="scss">
	.archives-collection-container {
		height: 100%;
		.my-header {
			padding-top: 15px;
		}
		.el-main {
			background-color: #fff;
			height: 100%;
			.archives-collection-title{
				display: flex;
				justify-content: space-between;
				margin-bottom:10px;
				.el-button{
					margin-left: 10px;
				}
				.archives-collection-title-lf{
					display: flex;
				}
				.archives-collection-title-rg{
					display: flex;
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