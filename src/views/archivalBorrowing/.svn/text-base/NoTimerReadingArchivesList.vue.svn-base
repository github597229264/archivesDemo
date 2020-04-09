<template>
	<el-container class="noTimerReadingArchivesList">
		<el-aside width="300px">
			<el-row class="listTitle">
				<span>{{fileObj.a0101}}--档案列表</span>
			</el-row>
			<el-input
				clearable
			  	placeholder="输入关键字进行过滤"
			  	v-model="filterText">
			</el-input>
			<div style="height: 300px;width: 100%;">
				<TenTypeTree :filterText="filterText" :fileObject="fileObject" @tenTypeTreeCall="tenTypeTreeCall"></TenTypeTree>	
			</div>
		</el-aside>
		<el-container class="childContainer">
			<el-main>
				<img src="../../assets/img/fileCover.jpg" alt="档案默认图片"/>
			</el-main>
		</el-container>
		<el-dialog fullscreen title="档案阅览" :visible.sync="DReaderVisible"  append-to-body v-if="DReaderVisible">
			<DReader :id="catalogId" :enabledPrint=true :peopleObj="fileObj" @DReaderCallback="DReaderCallback"></DReader>
		</el-dialog>
	</el-container>
</template>

<script>
	import DReader from './DReader.vue';
	import TenTypeTree from './TenTypeTree.vue';
	export default {
		name: 'NoTimerReadingArchivesList', //阅览档案--无倒计时无查询
		props:["fileObject"],//档案对象
		components: {
			TenTypeTree,//档案十大类目录树
			DReader//档案阅读器--档案目录
		},
		data(){
			return {
				filterText: "",//树形搜素文本
				id:'',//档案id
				fileObj:{},//申请信息
				archivesList:[],//十大类档案
				DReaderVisible:false,//阅读器弹窗是否显示
				catalogId:''//目录id
			}
		},
		created() {
			if(this.fileObject){
				this.fileObj = this.fileObject;
			}else{
				this.$message({
					type: 'error',
					message: '没有获取到档案信息，请退出重试！'
				});
			}
			
		},
		mounted() {
			
		},
		computed: {

		},
		methods: {
			/*
			 * 阅读器组件回调方法--子组件回传数据的方法
			 */
			DReaderCallback() {
				this.DReaderVisible = false;
			},
			/**
			 * 十大类树目录回调方法--子组件回传数据的方法
			 * @params {Object} obj 选中的数据对象
			 */
			tenTypeTreeCall(obj){
				if(obj.type == "目录"){
					this.catalogId = obj.id;
					this.DReaderVisible = true;
				}
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.noTimerReadingArchivesList {
		height: 100%; 
		border: 1px solid #eee;
		.el-header {
			background-color: #ffffff;
			color: #ffffff;
			height: 40px !important;
			align-items: center;
			font-size: 22px;
			.mainFont{
				margin:0 15px;
				color: #303133;
			}
		}
		.el-aside {
			background-color: #FFFFFF;
			color: #333;
			border-right:2px solid #eee;
			.el-input{
				margin-bottom: 10px;
			}
			.listTitle{
				width: 100%;
				height: 40px;
				line-height: 40px;
				span{
					font-size: 18px;
				}
			}
			.el-row{
				text-align: center;
			}

		}
		.childContainer{
			.el-header{
				background-color: #B3C0D1;
				color: #ffffff;
				height: 40px;
				line-height: 40px;
				font-size: 22px;
				.mainFont{
					margin:0 10px;
					color: #303133;
				}
			}
			.el-main{
				text-align: center;
				justify-content: center;
				align-items: center;
				padding: 0 0 0 10px;
				/*img{
					height: 100%;
				}*/
			}
		}
	}
</style>