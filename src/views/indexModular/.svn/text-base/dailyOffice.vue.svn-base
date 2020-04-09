<template>
	<div class="dailyOffice">
		<div class="head">
			<h4>日常办公</h4>
			<i class="iconfont gd-iconfontshezhi" @click='disposeFunc'></i>
		</div>
		<div class="main">
			<div class="item-container" v-for="item,key in dailyData" @click="jumpUrl(item.path)">
				<div class="item">
					<i :class="[baseIconClass,item.style]" ></i>
				</div>
				<span class="worker-name">{{item.name}}</span>
			</div>
		</div>
		<!--配置日常办公项浏览-->
		<el-dialog title="配置日常办公项浏览" width="60%" :visible.sync="dispose_show" v-if='dispose_show' :close-on-click-modal="false" append-to-body>
			<dispose></dispose>
		</el-dialog>
	</div>
</template>

<script>
	import dispose from './disposeDaily.vue';
	
	export default {
		name: 'dailyOffice',
		components: {
			dispose, //消息
		},
		data() {
			return {
				baseIconClass: 'iconfont', //iconfont
				dailyData: [], //日常办公
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: 5, //页大小
				},
				dispose_show: false, //配置日常办公弹框是否显示
			}
		},
		created() {
			this.getData(); //获取工作台信息
		},
		methods: {
			jumpUrl(path) {
				this.$router.push({
					path: path
				});
			},
			/**
			 * 获取工作台及其他数据
			 */
			getData() {
				this.$axios({
               		loading:{
            			isShow:false
            		},
					method: 'get',
					url: this.API.main
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						let storeObject = {
							name: this.API.constObj.mainInfo,
							storeInfo: resData.data
						};
						//存储菜单及工作台等信息
						this.$store.commit('saveStoreByName', storeObject);
						this.setWorkbenchData(); //工作台数据处理
					} else {
						this.$message({
							type: 'error',
							message: '获取工作台信息失败，请刷新！'
						});
					}
				}).catch((err) => {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			/**
			 * 日常办公数据处理
			 */
			setWorkbenchData() {
				let data = this.$store.state.mainInfo.mCommonlyUsedMenus;
				if(data.length > 0) {
					if(data.length <= 8) {
						this.dailyData = data;
					} else {
						for(let i = 0; i < 8; i++) {
							this.dailyData.push(data[i]);
						}
					}
				}
			},
			disposeFunc(){//配置日常办公
				this.dispose_show=true;
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.dailyOffice {
		.head {
			width: 100%;
			height: 40px;
			line-height: 40px;
			display: flex;
			justify-content: space-between;
			background-color: #f5f5f5;
			border-bottom: 1px solid #ccc;
			h4 {
				padding-left: 15px;
				font-size: 16px;
			}
			i{
				padding-right: 15px;
				display: block;
			}
		}
		.main {
			width: 100%;
			height: 115px;
			background: #fff;
			display: flex;
			justify-content: flex-start;
			.item-container {
				width: 12.5%;
				height: 114px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-right: 1px solid #eee;
				.worker-name {
					width: 100%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					text-align: center;
				}
				.item {
					background-color: #409EFF;
					width: 66px;
					height: 66px;
					border-radius: 5px;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-bottom: 8px;
					i {
						font-size: 37px !important;
						color: white;
					}
				}
			}
			.item-container:nth-child(1) {
				.item {
					background: #00bda9;
				}
			}
			.item-container:nth-child(2) {
				.item {
					background: #657fee;
				}
			}
			.item-container:nth-child(3) {
				.item {
					background: #f36f5a;
				}
			}
			.item-container:nth-child(4) {
				.item {
					background: #f5a23a;
				}
			}
			.item-container:nth-child(5) {
				.item {
					background: #1fa9f2;
				}
			}
			.item-container:nth-child(6) {
				.item {
					background: #39a4d7;
				}
			}
			.item-container:nth-child(7) {
				.item {
					background: #00bda9;
				}
			}
			.item-container:nth-child(8) {
				.item {
					background: #f36f5a;
				}
			}
			.item-container:hover {
				.item {
					cursor: pointer;
					background-color: rgba(64, 158, 255, 0.7);
				}
				span {
					color: #409EFF;
				}
			}
		}
	}
</style>