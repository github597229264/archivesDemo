<template>
	<div class="toDoList ledgerModual">
		<!--待办事项-->
		<div >
			<div class="head">
				<h4>待办事项</h4>
				<span @click="newsFuc">更多>></span>
			</div>
			<div class="main" v-if='todoList.length>0'>
				<div class="item-container"  v-for="item,index in todoList">
					<span class="num-span">{{index + 1}}</span>
					<span class="name-span">{{item.bustype}}</span>
					<span class="msg-span">{{item.title}}</span>
					<span class="write-span" @click="browsePersonal(item)">详情</span>
				</div>
				
			</div>
			<div class="no-data" v-else>
				暂无数据
			</div>
		</div>
		<!--消息弹窗-->
		<el-dialog title="消息列表" width="60%" :visible.sync="news_show" v-if='news_show' :close-on-click-modal="false" append-to-body>
			<News></News>
		</el-dialog>
		<!--授权弹出框 -->
		<el-dialog class="outDialog" title='授权' :visible.sync="authorizationVisible" width="65%" append-to-body v-if="authorizationVisible" :close-on-click-modal="false">
			<personnelsAuthorization :applyId="authorizationId" :archivesType="type" @AuthorizationCallBack="authorizationCallBack"></personnelsAuthorization>
		</el-dialog>
		<!--审批弹出框 -->
		<el-dialog title="审批" :visible.sync="approvelVisible" width="350px"  append-to-body v-if="approvelVisible" :close-on-click-modal="false">
		  <approveAlert :applyId="authorizationId" @ApproveAlertCall="approveAlertCall"></approveAlert>
		</el-dialog>
	</div>
</template>

<script>
	import personnelsAuthorization from '../archivalBorrowing/PersonnelsAuthorization.vue';
	import approveAlert from '../archivalBorrowing/ApproveAlert.vue';
	import News from '../news/News';
	
	export default {
		name: 'toDoList',
		components: {
			News, //消息
			personnelsAuthorization,
			approveAlert
		},
		data() {
			return {
				news_show: false, //消息弹框是否显示
				selectInd: '0', //选中的tabs
				activeName: '0', //默认tab菜单显示
				todoList: [], //待办事项
				choiceData: [], //台账统计
				oppbtn: "", //要操作的按钮，审批或者授权
				authorizationVisible: false, //授权弹窗的是否显示
				approvelVisible:false,//审批弹窗是否显示
				authorizationId: "", //授权id
				type: "", //授权类型
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: 5, //页大小
				},
			}
		},
		created() {
			this.getToDoList(); //待办事项
		},
		methods: {
			newsFuc() { //消息
				this.news_show = true;
			},
			
			getToDoList() { //待办事项
				this.$axios({
               		loading:{
            			isShow:false
            		},
					method: 'get',
					url: this.API.findmessageReminderPage,
					params: {
						'pageIndex': this.pageObj.pageIndex,
						'pageSize': this.pageObj.pageSize
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.todoList = resData.data.list;
						if(this.todoList.length > 0) {
							this.todoList.forEach(item => {
								if(item.bustype === "纸质档案授权") {
									item.oppbtn = "授权";
									item.type = this.API.constObj.fileTypeList[1].id;
								} else if(item.bustype === "电子档案授权") {
									item.oppbtn = "授权";
									item.type = this.API.constObj.fileTypeList[0].id
								} else if(item.bustype === "纸质档案审批" || item.bustype === "电子档案审批") item.oppbtn = "审批"
							})
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
			browsePersonal(item) { //授权或者审批的处理
				let selectObj = item;
				this.authorizationId = selectObj.busid;
				this.type = selectObj.type;
				this.oppbtn = selectObj.oppbtn;
				if(this.oppbtn === "授权") this.authorizationVisible = true;
				else if(this.oppbtn === "审批")this.approvelVisible = true;
			},
			authorizationCallBack(){//授权的回调
				this.authorizationVisible = false;
				this.getToDoList();
			},
			approveAlertCall(isRefs) {//审批弹框组件回调方法--子组件回调数据的方法
				this.approvelVisible = false;
				if(isRefs){
					this.getToDoList();
				}
			},
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.ledgerModual {
		margin-top: 10px;
		width: 49.5%;
		height: 350px;
		background: #fff;
		@media screen and (max-width:1366px){
	   		width:100%;
		}
		.head {
			height: 40px;
			line-height: 40px;
			background-color: #f5f5f5;
			border-bottom: 1px solid #ccc;
			h4 {
				padding-left: 15px;
				font-size: 16px;
			}
		}
		.main {
			height: 300px;
			padding: 0 10px;
			.el-tabs {
				height: 300px;
				span {
					margin-left: 20px;
				}
			}
			.el-tabs__nav-scroll {
				float: right !important;
			}
			.span-text {
				font-size: 14px;
				display: block;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				.yellowText {
					color: #ffab41;
					margin: 0;
					padding: 0;
					font-weight: bold;
				}
			}
		}
		.no-data{
			height: 300px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.toDoList {
		margin-top: 10px;
		width: 49.5%;
		height: 350px;
		background: #fff;
		@media screen and (max-width:1366px){
	   		width:100%;
		}
		.head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			span {
				display: block;
				width: 60px;
				cursor: pointer;
			}
		}
		.item-container {
			border-bottom: 1px solid #EFEFEF;
			width: 100%;
			height: 50px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			span {
				font-size: 14px;
			}
			.num-span {
				display: block;
				background: #51B6E4;
				width: 24px;
				height: 24px;
				color: white;
				text-align: center;
				line-height: 24px;
				margin: 0 10px;
			}
			.name-span {
				width: 18%;
			}
			.msg-span {
				width: 65%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.write-span {
				color: #3094C4;
				display: block;
				width: 50px;
				text-align: left;
			}
			.write-span:hover {
				color: #ffab41;
				cursor: pointer;
			}
			.yellow-bac {
				background: #F19A2D;
			}
		}
		.item-container:nth-child(4) {
			.num-span {
				background: #F19A2D;
			}
		}
		.item-container:nth-child(5) {
			border: none;
			.num-span {
				background: #F19A2D;
			}
		}
	}
</style>