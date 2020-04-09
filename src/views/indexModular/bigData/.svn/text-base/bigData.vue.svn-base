<template>
	<div class="ledgerModual">
		<!--标题-->
		<div class="head">
			<h4>干部人员大数据</h4>
		</div>
		
		<!--图表展示-->
		<div class="main">
			<div class="titleBox">
				<span class='num-header-left'>单位:人</span>
				<span class='num-header-right header-position'>
					<div v-for="item,index in LedgerData.data">
						<span class='tuli'></span>
						<span>{{item.name}}</span>
						<span class="num" @click="dataDetails(index)">{{item.value}}</span>
					</div>
				</span>
			</div>
			<RecordAnalysis :chartsData="LedgerData" :chartType='chartsType'></RecordAnalysis>
		</div>
		
		<!--人员数据详情弹出层-->
		<el-dialog title="干部大数据" width="80%"  :visible.sync="people_data" v-if='people_data' :close-on-click-modal="false" append-to-body>
			<peopleData :typeNum="typeNum" ></peopleData>
		</el-dialog>
	</div>
</template>

<script>
	import RecordAnalysis from "../../../components/recordAnalysis";
	import peopleData from "./peopleData.vue";

	export default {
		name: 'ledgerModual',
		components: {
			RecordAnalysis, //图表分析--插件
			peopleData,//人员数据详情弹出层
		},
		data() {
			return {
				typeNum:'',//数据类型1：现职人员、2：离退人员、3：调出人员、4：已去世
				people_data:false,//人员数据弹框的显示与否
				materialTitle:'',//材料类弹框title
				visibleYMD: false,//日期选择弹框的显示与否
				visibleYM: false,//日期选择弹框的显示与否
				visibleY: false,//日期选择弹框的显示与否
				choiceData: [], //台账统计
				chartsType: 'bar', //统计图类型
				LedgerData: [], //台账数据
				chartDataList: [],
				nowTime: '', //当天日期
				stockNum: {}, //库存统计数
				borrowNum: {}, //查借阅同计数
				materialNum: {}, //散材料统计数
				businessNum: {}, //日常业务统计数
				type: "", //授权类型
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: 5, //页大小
				},
				value1:'',//年月日中日的查询TODO
				searchDate: {//日期选择查询
					year: '',
					ym: '',
					ymds: '',
					ymde: '',

				}
			}
		},
		created() {
			this.getLedgerData(); //台账管理数据
		},
		methods: {
			dataDetails(type){//弹出层人员数据详情
				this.typeNum = type + 1;
				this.people_data=true;
			},
			getLedgerData(dateType) { //台账管理数据
				
				this.$axios({
					loading: {
						isShow: false
					},
					method: 'get',
					url: this.API.cadresPersonnelBigData,
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						console.log(resData);
						this.LedgerData = resData;
						
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
		}
	}
</script>
<style lang="scss" scoped type="text/css">
.ledgerModual {
		margin-top: 10px;
		width: 49.5%;
		height: 350px;
		background: #fff;
		position: relative;
		@media screen and (max-width: 1366px) {
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
			height: 265px;
			padding: 0 10px;
			.titleBox{
				height:35px;
				padding: 0 15px;
    			font-size: 14px;
    			display: flex;
    			justify-content: space-between;
    			align-items:center;
    			.num-header-right{
    				width:75%;
    				display: flex;
	    			justify-content: flex-end;
	    			align-items:center;
	    			div{
	    				.tuli{
	    					    display: inline-block;
							    width: 11px;
							    height: 11px;
							    background-color: #ea7c10;
							    margin-left: 20px;
							    margin-right: 10px;
	    				}
	    				.num{
	    					    color: #ffab41;
	    					    font-weight: bold;
	    					    cursor: pointer;
	    				}
	    				.num:hover{
	    					text-decoration: underline;
	    				}
	    			}
	    			div:nth-child(2){
	    				.tuli{
	    					background-color: #f3ad00;
	    				}
	    			}
	    			div:nth-child(3){
	    				.tuli{
	    					background-color: #657fee;
	    				}
	    			}
	    			div:nth-child(4){
	    				.tuli{
	    					background-color: #75c8ef;
	    				}
	    			}
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
					cursor: pointer;
				}
				.yellowText:hover{
					text-decoration:underline;
				}
			}
		}
	}
</style>