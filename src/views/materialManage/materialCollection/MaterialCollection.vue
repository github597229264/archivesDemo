<!--材料催收模块-->
<template>
	<el-container class="material-collection-container">
		<el-header class="my-header" style="height: 45px;">材料催收</el-header>
		<el-main>
			<!--搜索栏-->
			<div class="material-collection-title">
				<el-button type="primary" @click="addMaterialCollection">添加</el-button>
				<div class="material-collection-right">
					<areaTreeSelect class="areaTree" :defaultOptions="defaultOptions" @areaTreeSelectCall="getSelect" :title="title"></areaTreeSelect>
					<el-button type="primary" @click="search">查询</el-button>
				</div>
			</div>
			<!--表格以及分页-->
			<hxTables ref="table" :pageObj="pageObj" :columns="columns" :dataSource="tableData" :options="options" :fetch="fetchTableData">
			</hxTables>
			<!--新增弹出层-->
			<el-dialog title="添加" :close-on-click-modal="false" width="40%" max-height="60%" :visible.sync="addmaterial_collection_popUp" v-if="addmaterial_collection_popUp">
				<addMaterialCollection  @backAdd="getAddBack"></addMaterialCollection>
			</el-dialog>
		</el-main>
	</el-container>
</template>

<script>
	import hxTables from "../../../components/hxTable.vue";
	import areaTreeSelect from '../../../components/AreaTreeSelect.vue';
	import addMaterialCollection from './AddMaterialCollection.vue';

	export default {
		name: "MaterialCollection.vue", //材料催收模块
		components: {
			hxTables,
			areaTreeSelect,
			addMaterialCollection
		},
		data() {
			return {
				addmaterial_collection_popUp:false,//控制新增的标志
				defaultOptions:"",//机构默认为空
				e01z209a:"",//发件单位 名称
				title:"发往单位",
				tableHeight:0,
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
						label: "状态",
						width:'120'
					},
					{
						prop: "e01z208",
						label: "发件人",
						width:'150'
					},
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
		methods: {//方法集合
			fetchTableData() {
				this.$axios({
					loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.material-collection-container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},
					method: 'post',
					url: this.API.queryAllCollection,
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
			addMaterialCollection(){//添加
				this.addmaterial_collection_popUp = true;
			},
			getAddBack(data){//添加返回
				if(data === "success") this.fetchTableData();
				this.addmaterial_collection_popUp = false;
			},
			search(){//查询
				this.pageObj.pageIndex = this.API.constObj.pageIndex;
				this.fetchTableData();
			},
			/*
	         * 区域机构树形下拉框组件回调方法--子组件回传数据的方法
	         * @param {Object} returnObj 选中的数据对象
	         */
        	 getSelect(returnObj){
		        if(returnObj)this.e01z209a = returnObj.code;
		        console.log("e01z209a"+this.e01z209a);
        	 },
		},

	};
</script>

<style lang="scss">
	.material-collection-container {
		height: 100%;
		.my-header {
			padding-top: 15px;
		}
		.el-main {
			background-color: #fff;
			height: 100%;
			padding-bottom: 0px !important;
			.material-collection-title{
				display: flex;
				justify-content: space-between;
				margin-bottom:10px;
				.material-collection-right{
					display:flex;
					.areaTree{
						margin-right: 10px;
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