<!--统计-->
<template>
	<div class="ledger-statistica-container">
		<div class="title">
			<el-date-picker type="date" v-model="time.startTime" placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyyMMdd">
			</el-date-picker>
			<el-date-picker type="date" v-model="time.endTime" placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyyMMdd">
			</el-date-picker>
			<el-button type="primary" @click="search">搜索</el-button>
		</div>
		<div class="content">
			<div class="data-title">
				<div v-for="(item,index) in data" :key="index" class="item" @click="goDetail(item)">
					<a href="#">
						<div class="tip">
							<div class="colordiv" ref="colorDiv" :style="getStyleBgc(item, index) "></div>
							{{ item.name }} <span class="red">({{item.value}})</span>
						</div>
					</a>
				</div>
			</div>
			<div class="content-right">
				<div class="title">零散材料库统计</div>
				<div ref="chartDiv" id="charts" class="charts" style="float:left;width:100%;height: 360px"></div>
			</div>
		</div>
		<!--接收材料弹出层-->
		<el-dialog title="接收散材料" :close-on-click-modal="false" width="80%" height="350px" :visible.sync="ledger_receive_popUp" v-if='ledger_receive_popUp'>
			<receiveTable :id="id" :time="time"></receiveTable>
		</el-dialog>
		<!--处理材料弹出层-->
		<el-dialog :title="title" :close-on-click-modal="false" width="80%" height="350px" :visible.sync="ledger_deal_popUp" v-if='ledger_deal_popUp'>
			<ledgerDeal :flagDeal="flagDeal" :time="time"></ledgerDeal>
		</el-dialog>
		<!--归档材料弹出层-->
		<el-dialog :title="title" :close-on-click-modal="false" width="80%" height="350px" :visible.sync="ledger_archive_popUp" v-if='ledger_archive_popUp'>
			<ledgerDeal :flagDeal="flagDeal" :time="time"></ledgerDeal>
		</el-dialog>
		<!--转递材料弹出层-->
		<el-dialog :title="title" :close-on-click-modal="false" width="80%" height="350px" :visible.sync="ledger_deliver_popUp" v-if='ledger_deliver_popUp'>
			<ledgerDeliver :flagDeliver="flagDeliver" :time="time"></ledgerDeliver>
		</el-dialog>
		<!--退回材料弹出层-->
		<el-dialog :title="title" :close-on-click-modal="false" width="80%" height="350px" :visible.sync="ledger_back_popUp" v-if='ledger_back_popUp'>
			<ledgerDeliver :flagDeliver="flagDeliver" :time="time"></ledgerDeliver>
		</el-dialog>

	</div>
</template>

<script>
	import receiveTable from '../materialReceive/ReceiveTable.vue';
	import ledgerDeal from './LedgerDeal.vue';
	import ledgerDeliver from './LedgerDeliver.vue';
	export default {
		name: "LedgerStatistical", //台账管理--统计
		data() {
			return {
				flagDeliver: "1", //0 与退回  1 转递
				flagDeal: "1", //1 处理  2 归档材料
				title: "", //处理材料和归档材料标题
				id: "",
				ledger_receive_popUp: false, //接收散材料
				ledger_deal_popUp: false, //处理散材料
				ledger_archive_popUp: false, //归档散材料
				ledger_deliver_popUp: false, //转递散材料
				ledger_back_popUp: false, //退回散材料
				time: {
					startTime: "", //开始时间
					endTime: "" //结束时间
				},
				flag: false,
				canvasId: 'myCanvas',
				type: 'bar',
				options: {
					title: '零散材料库统计',
					bottomPadding: 30,
					radius: 130,
				},
				data: [],
				colors: ['#FFAE8B', '#3CB2EF', '#AEFDCA', '#37D8FF', '#71F6F9'],
			}
		},
		created() {
			this.getData();
		},
		methods: {
			getStyleBgc(item, index) { // 根据item或者index算出你要position的值
				return 'background-color:' + item.color;
			},
			pieChart(title) { //功能：绘制饼图
				let pieChart = this.$echarts.init(this.$refs.chartDiv);
				pieChart.clear();
				pieChart.setOption({
					color: this.colors,
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b}: {c} ({d}%)",
						backgroundColor: 'rgba(255,150,15,0.5)',
						textStyle: {
							color: 'rgba(0,0,0,0.85)',
							fontSize: '12'
						}
					},
					legend: {
						show: false
					},
					series: [{
						name: title,
						type: "pie",
						radius: ["50%", "70%"], //半径大小
						avoidLabelOverlap: true,
						center: ["35%", "50%"], //饼图位置
						//						roseType: 'angle',
						label: {
							//							normal: {
							//								show: false,
							//								position: "center"
							//							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: "15",
									fontWeight: "500"
								}
							}
						},
						labelLine: {
							normal: {
								show: true
							}
						},
						data: this.data
					}]
				});
			},
			getData() {
				this.$axios({
					loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.ledger-statistica-container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},
					method: 'get',
					url: this.API.querycount,
					params: {
						'startTime': this.time.startTime,
						'endTime': this.time.endTime
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.data = resData.data.list;
						this.data.forEach((item, index) => {
							item.color = this.colors[index];
						})
						this.pieChart("零散材料库统计");
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
			search() {
				this.getData();
			},
			goDetail(item) {
				console.log("item.name" + item.name);
				if(item.name.match("接收")) {
					this.ledger_receive_popUp = true;
				} else if(item.name.match("处理")) {
					this.ledger_deal_popUp = true;
					this.flagDeal = "1";
					this.title = "处理散材料";
				} else if(item.name.match("归档")) {
					this.flagDeal = "2";
					this.ledger_archive_popUp = true;
					this.title = "归档散材料";
					ledger_deliver_popUp
				} else if(item.name.match("转递")) { //status 2 与退回  1 转递
					this.flagDeliver = "1";
					this.ledger_deliver_popUp = true;
					this.title = "转递散材料";
				} else if(item.name.match("退回")) {
					this.flagDeliver = "0";
					this.ledger_back_popUp = true;
					this.title = "退回散材料";
				}

			}
		},
		components: {
			receiveTable,
			ledgerDeal,
			ledgerDeliver
		}
	}
</script>

<style lang='scss'>
	.ledger-statistica-container {
		.title {
			text-align: right;
		}
		.content {
			display: flex;
			height: 420px;
			.data-title {
				width: 20%;
				font-size: 12px;
				.item {
					.tip {
						display: flex;
						height: 30px;
						text-align: center;
						.colordiv {
							height: 15px;
							width: 50px;
							background-color: red;
							margin-right: 5px;
						}
						.red {
							color: red;
							margin-top: 2px;
						}
					}
				}
			}
			.content-right {
				width: 79%;
				height: 100%;
				.title {
					text-align: center;
					margin-right: 266px;
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
		.wrapper {
			margin-left: 15px;
			width: 100%;
			height: 500px;
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