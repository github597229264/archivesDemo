<template>
	<el-container class="readingArchivesList">
		<el-aside width="300px">
			<el-row>
				<p class="showText" v-if="currTime > 0">
					<span>阅档倒计时<br/></span>
					<span >{{currTime}}<br/></span>
					<span>分钟</span>
				</p>
				<p class="showTextOver" v-else>
					<span >阅档已结束</span>
				</p>
				<el-progress type="dashboard" :show-text=false :percentage="percentageTime" ></el-progress>
				<el-button  v-if="currTime > 0" id="closeFile"  type="danger"  @click="stopReading" round>结束阅档</el-button>
			</el-row>
			<el-row class="listTitle">
				<span>{{archivesInfo.a0101}}--档案列表</span>
			</el-row>
			<el-input
				clearable
			  	placeholder="输入关键字进行过滤"
			  	v-model="filterText">
			</el-input>
			<div class="treeDiv">
				<el-tree  ref="tenTypeTree" class="filter-tree" :data="archivesList" :render-content="renderContent" @node-click="handleNodeClick" :filter-node-method="filterNode"></el-tree>	
			</div>
		</el-aside>
		<el-container>
			<!--<el-header >
				<span>档案人员信息: </span>
				<span>姓名:</span>
				<span class="mainFont">{{archivesInfo.a0101}}</span>
				<span>工作单位:</span>
				<span class="mainFont">{{archivesInfo.b0001}}</span>
			</el-header>-->
			<el-main>
				<img src="../../assets/img/fileCover.jpg" alt="档案默认图片"/>
			</el-main>
		</el-container>
		<el-dialog fullscreen title="档案阅览" :visible.sync="DReaderVisible"  append-to-body v-if="DReaderVisible">
			<DReader :elid="id" :id="catalogId" :peopleObj="archivesInfo" @DReaderCallback="DReaderCallback"></DReader>
		</el-dialog>
	</el-container>
</template>

<script>
	import DReader from './DReader.vue';
	export default {
		name: 'ReadingArchivesList', //阅览档案--倒计时
		props:{
			id:{//中间表id
				type:String,
				required:true
			}
		},
		components: {
			DReader//档案阅读器--档案目录
		},
		data() {
			return {
				filterText: "",//树形搜素文本
				timer:null,//定时器
				currTime:0,//剩余阅档时间
				percentageTime:100,//百分比
				pictureSharpness:"1",//图像清晰度
				archivesInfo:{},//档案信息
				archivesList:[],//十大类档案
				DReaderVisible:false,//阅读器弹窗是否显示
				catalogId:''//目录id
			}
		},
		created() {
			this.readForm = this.$route.params;
			this.getDataById(); //根据档案人员id获取档案人员十大类列表
		},
		mounted() {
			
		},
		computed: {

		},
		watch: {
			filterText(val) {
				this.$refs.tenTypeTree.filter(val);
			}
		},
		methods: {
			/*
			 * 阅读器组件回调方法--子组件回传数据的方法
			 */
			DReaderCallback() {
				this.DReaderVisible = false;
			},
			/**
			 * 根据档案人员id获取档案人员十大类列表
			 */
			getDataById() {
				this.$axios({
                	loading:{
            			isShow:true,
            			target:'.readingArchivesList'
            		},
					method: 'get',
					url: this.API.lookArchives,
					params: {
						id: this.id //申请单id
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						let tenTypeList = resData.data.list;
						tenTypeList.forEach(item => {
							if(item.type == "标题") item.className = "haveChild";
							else if(item.type == "目录") item.className = "noChild";
						});
						this.archivesInfo = resData.data.split;
						this.currTime = this.archivesInfo.timeout;
						this.percentageTime =Math.round((this.currTime/this.archivesInfo.impowertime*1)*100);
						this.archivesList = this.commonFun.toTreeDataNormal(resData.data.list,{
							childKey:'code',
							fatherKey:'parentcode'
						});
						this.readFileJudge();//档案阅览是否过期判断处理
					} else {
						this.$message({
							type: 'error',
							message: '查询档案信息失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("查询档案人员信息列表=" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			/**
			 * 档案十大类树点击事件
			 * @param {Object} obj
			 */
			handleNodeClick(obj) {
				if(obj.type == "目录"){
					this.catalogId = obj.id;
					this.DReaderVisible = true;
				}
			},
			/**
			 * 树内容过滤
			 * @param {String} value
			 * @param {Object} data
			 */
			filterNode(value, data) {
				if(!value) return true;
				return data.name.indexOf(value) !== -1;
			},
			/**
			 * 树添加图标处理
			 */
			renderContent(h, {
				node,
				data,
				store
			}) {
				return(
					<span>
		                <i class={data.className}></i>
		                <span>{data.name}</span>
		             </span>
				);
			},
			/**
			 * 结束阅档
			 */
			stopReading() {
				if(this.currTime == 0){
					this.$message({
						type: 'warning',
						message: '已结束阅档！'
					});
					return;
				}
				this.$confirm('点击结束阅档后将无法继续查阅该人员档案，确定继续结束阅档操作吗?', '操作提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.overReading();//请求后台进行结束阅档处理
		        }).catch(() => {     
		        });
			},
			/**
			 * 请求后台结束阅档
			 */
			overReading(){
				var self = this;
				this.$axios({
                	loading:{
            			isShow:true,
            			target:'.readingArchivesList'
            		},
					method: 'get',
					url: this.API.overRead,
					params: {
						id: this.archivesInfo.id, //申请单id
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						self.DReaderVisible = false;
						self.clearTimer();
						self.currTime = 0;
						self.percentageTime =0;
						self.$alert('已成功结束阅档，请点击确定后返回', '提示', {
				          confirmButtonText: '确定',
				          callback: action => {
				          	//回调父组件方法
				            self.$emit("ReadingArchivesListBack");
				          }
				        });
					}else{
						self.$message({
							type: 'error',
							message: '结束阅档失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					self.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			/**
			 * 倒计时
			 */
			countDown() {
				var self = this;
				this.$axios({
                	loading:{
            			isShow:false
            		},
					method: 'get',
					url: this.API.countDown,
					params: {
						id: this.archivesInfo.id, //申请单id
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						self.currTime = resData.data;
						if(self.currTime == 0){
							this.overReading();//结束阅档
						}else{
							self.percentageTime =Math.round((self.currTime/self.archivesInfo.impowertime*1)*100);
						}
					}
				}).catch((err) => {
					self.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			/**
			 * 倒计时定时器
			 */
			countDownTimer(){
				this.timer = setInterval(()=>{
					if(this.timer && this.currTime >0 ){
						this.countDown();
					}else{
						clearInterval(this.timer);
					}
				},60000);
			},
			/**
			 * 倒计时定时器
			 */
			clearTimer(){
				if(this.timer){
					clearInterval(this.timer);
				}
			},
			/**
			 * 档案阅览是否过期判断处理
			 */
			readFileJudge(){
				let nowDateTime = new Date().getTime();
				let startTime = new Date(this.archivesInfo.impowerstarttime).getTime();
				let endTime = new Date(this.archivesInfo.impowerendtime).getTime();
				if(nowDateTime < startTime){//阅档未开始
					this.$alert('还未到阅档时间，请点击确定后返回', '阅档提示', {
			          confirmButtonText: '确定',
			          callback: action => {
			          	//回调父组件方法
			            this.$emit("ReadingArchivesListBack");
			          }
			        });
				}else if(nowDateTime >= endTime){//阅档已过期
					this.percentageTime = 0;
					this.$alert('阅档时间已过期，请点击确定后返回', '阅档提示', {
			          confirmButtonText: '确定',
			          callback: action => {
			          	//回调父组件方法
			            this.$emit("ReadingArchivesListBack");
			          }
			       });
				}else{//可以阅档
					if(this.archivesInfo.timeout >0){
						this.countDownTimer();//倒计时定时器	
					}else{//结束阅档
						this.percentageTime = 0;
						this.$alert('阅档时间已结束，请点击确定后返回', '阅档提示', {
				          confirmButtonText: '确定',
				          callback: action => {
				          	//回调父组件方法
			            	this.$emit("ReadingArchivesListBack");
				          }
				        });
					}
				}
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.readingArchivesList {
		height: 80%; 
		border: 1px solid #eee;
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
				position: relative;
				text-align: center;
				.el-progress{
					display: inline-block;
					    margin: 5px auto 40px;
				}
				span{
					margin: 0 5px;
				}
				.showText,.showTextOver{
				    position: absolute;
				    top: 50%;
				    right: 50%;			
				}
				.showText{
					margin-right: -36px;
					margin-top: -45px;
					span:nth-child(2){
						font-size: 24px;
						color:#20A0FF;
					}
				}
				.showTextOver{
					margin-right: -40px;
					margin-top: -21px;
				}
				#closeFile{
				    position: absolute;
				    margin-right: -41px; 
				    margin-bottom: 0;	
				    bottom: 0;
				    right: 50%;	
				}
			}
			.treeDiv{
				height: 60vh;
			    width: 98%;
			    overflow-y: auto;
				.el-tree {
					min-width: 100%;
					font-size: 13px;
					display: inline-block;
					padding:0 10px 10px 5px;
					.el-tree-node:focus>.el-tree-node__content {
						background-color:#909399 !important;
						color: #fff;
					}
				}
			}

			.haveChild, .noChild{
				display: inline-block;
				width: 16px;
				height: 16px;
			}
			.haveChild {
				background: url('../../assets/img/danweiold.png') no-repeat 0 3px;
				padding-left: 5px;
			}
			.noChild {
				background: url('../../assets/img/bumen.png') no-repeat 0 3px;
				padding-left: 5px;
			}
			
		}
		.el-container{
			.el-header {
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
					height: 90%;
				}*/
			}
		}
		
	}
</style>