<template>
	<div class="ledgerModual">
		<!--标题-->
		<div class="head">
			<h4>档案台账管理</h4>
		</div>
		
		<!--图表展示-->
		<div class="main">
			<template>
				<el-tabs v-model="activeName" @tab-click="handleClick" stretch>
					<el-tab-pane lazy :label="item.name" :name="''+ index" v-for="(item, index) in chartDataList" style="height:220px;">
						<RecordAnalysis :chartsData="item" :chartType='chartsType'></RecordAnalysis>
					</el-tab-pane>
					<span class="span-text" v-if="selectInd=='0'">
						截至{{nowTime}},收录干部<span class='yellowText' @click="peopleDataFunc(1)">{{stockNum.stock1}}</span >人,库存档案应为<span class='yellowText' @click="peopleDataFunc(2)">{{stockNum.stock2}}</span>卷,实存<span class='yellowText' @click="peopleDataFunc(3)">{{stockNum.stock3}}</span>卷,现已借出<span class='yellowText' @click="peopleDataFunc(4)">{{stockNum.stock4}}</span>卷。
					</span>
					<span class="span-text" v-else-if="selectInd=='1'">
						截至{{nowTime}}, 档案库共接收档案{{businessNum.business1}}卷,入库 {{businessNum.business2}} 卷;转递档案<span class='yellowText'>{{businessNum.business3}}</span>卷。
					</span>
					<span class="span-text" v-else-if="selectInd=='2'">
					截至{{nowTime}}, 档案库接收散材料<span class='yellowText'>{{materialNum.material1}}</span>份,已处理<span class='yellowText'>{{materialNum.material2}}</span>份,已归档 {{materialNum.material3}}份;转递<span class='yellowText'>{{materialNum.material4}}</span>份,退回 {{materialNum.material5}}份。
					</span>
					<span class="span-text" v-else-if="selectInd=='3'">
						截至{{nowTime}},共{{borrowNum.borrow1}} 人次查阅实体档案  {{borrowNum.borrow2}}卷,{{borrowNum.borrow3}}人次借阅实体档案 {{borrowNum.borrow4}}卷,{{borrowNum.borrow5}}人次查阅电子档案<span class='yellowText'>{{borrowNum.borrow6}}</span>卷。
					</span>
				</el-tabs>
			</template>
		</div>
		
		<!--日期查询-->
		<div class="search-date">
			<!--日-->
			<div>
				<el-popover
				    placement="bottom"
				    trigger="click"
				    v-model='visibleYMD'>
				    <el-form ref="form"  label-width="90px">
				    	<el-form-item label="请选择日期">
						    <el-date-picker
						      v-model="value1"
						      type="daterange"
						      range-separator="至"
						      start-placeholder="开始日期"
						      end-placeholder="结束日期"
						      value-format='yyyyMMdd'>
						    </el-date-picker>
						</el-form-item>
						<el-form-item>
						    <el-button type="primary" @click="getLedgerData('ymd')">确定</el-button>
						    <el-button>取消</el-button>
						</el-form-item>
				    </el-form>
				    <div slot="reference" class="day"><span>日</span></div>
				</el-popover>
			</div>
			
			<!--月-->
			<div>
				<el-popover
				    placement="bottom"
				    trigger="click"
				    v-model='visibleYM'>
				    <el-form ref="form" :model="searchDate" label-width="90px">
				    	<el-form-item label="请选择日期">
					    	<el-date-picker
						      v-model="searchDate.ym"
						      type="month"
						      placeholder="选择月"
						      value-format='yyyyMM'>
						    </el-date-picker>
					    </el-form-item>
						<el-form-item>
						    <el-button type="primary" @click="getLedgerData('ym')">确定</el-button>
						    <el-button>取消</el-button>
						</el-form-item>
				    </el-form>
				    <div slot="reference" class="month"><span>月</span></div>
				</el-popover>
			</div>
			
			<!--年-->
			<div>
				<el-popover
				    placement="bottom"
				    trigger="click"
				    v-model='visibleY'>
				    <el-form ref="form" :model="searchDate" label-width="90px">
				    	<el-form-item label="请选择日期">
					    	 <el-date-picker
						      v-model="searchDate.year"
						      type="year"
						      placeholder="选择年"
						      value-format='yyyy'>
						    </el-date-picker>
					    </el-form-item>
						<el-form-item>
						    <el-button type="primary" @click="getLedgerData('year')">确定</el-button>
						    <el-button>取消</el-button>
						</el-form-item>
				    </el-form>
				    <div slot="reference" class="year"><span>年</span></div>
				</el-popover>
			</div>
			
		</div>
		
		<!--人员数据详情弹出层-->
		<el-dialog :title="peopleTitle" width="80%"  :visible.sync="people_data" v-if='people_data' :close-on-click-modal="false" append-to-body>
			<peopleData :typeNum="typeNum" ></peopleData>
		</el-dialog>
	</div>
</template>

<script>
	import RecordAnalysis from "../../components/recordAnalysis";
	import peopleData from "./ledgerModual/peopleData.vue";

	export default {
		name: 'ledgerModual',
		components: {
			RecordAnalysis, //图表分析--插件
			peopleData,//人员数据详情弹出层
		},
		data() {
			return {
				typeNum:'',//类型1：收录、2：在库、3：实存、4：借出
				people_data:false,//人员数据弹框的显示与否
				peopleTitle:'',//人员类弹框title
				materialTitle:'',//材料类弹框title
				visibleYMD: false,//日期选择弹框的显示与否
				visibleYM: false,//日期选择弹框的显示与否
				visibleY: false,//日期选择弹框的显示与否
				selectInd: '0', //选中的tabs
				activeName: '0', //默认tab菜单显示
				choiceData: [], //台账统计
				chartsType: 'bar', //统计图类型
				LedgerData: {}, //台账数据
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
			this.timeFormate(new Date()); //取当前时间--年月日
		},
		methods: {
			peopleDataFunc(typeNum){//弹出层人员数据详情
				if(typeNum==1){
					this.peopleTitle='收录干部';
				}else if(typeNum==2){
					this.peopleTitle='应存档案';
				}else if(typeNum==3){
					this.peopleTitle='实存档案';
				}else if(typeNum==4){
					this.peopleTitle='借出档案';
				}
				this.typeNum=typeNum;
				this.people_data=true;
			},
			// 获取当前时间函数
			timeFormate(timeStamp) {
				let year = new Date(timeStamp).getFullYear();
				let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
				let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
				this.nowTime = year + "年" + month + "月" + date + "日";
			},
			getLedgerData(dateType) { //台账管理数据
			//年
				if(dateType=='year'){
					this.searchDate.ym='';
					this.searchDate.ymds='';
					this.searchDate.ymde='';
					this.visibleY=false;
				}
			//月
				if(dateType=='ym'){
					this.searchDate.year='';
					this.searchDate.ymds='';
					this.searchDate.ymde='';
					this.visibleYM=false;
				}
			//日
				if(dateType=='ymd'){
					this.searchDate.ymds = this.value1[0];//开始日期
					this.searchDate.ymde = this.value1[1];//结束日期
					this.searchDate.year='';
					this.searchDate.ym='';
					this.visibleYMD=false;
				}
				
				this.$axios({
					loading: {
						isShow: false
					},
					method: 'get',
					url: this.API.getArchivesAccountManagement,
					params: {
						'year': this.searchDate.year,
						'ym': this.searchDate.ym,
						'ymds': this.searchDate.ymds,
						'ymde': this.searchDate.ymde,
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.LedgerData = resData.data;
						let stockArr = this.LedgerData.list1;
						let borrowArr = this.LedgerData.list2;
						let materialArr = this.LedgerData.list3;
						let businessArr = this.LedgerData.list4;
						//库存
						if(stockArr.length > 0) {
							for(let i = 0; i < stockArr.length; i++) {
								this.stockNum['stock' + (i + 1)] = stockArr[i].value;
							}
						}
						//查借阅
						if(borrowArr.length > 0) {
							for(let i = 0; i < borrowArr.length; i++) {
								this.borrowNum['borrow' + (i + 1)] = borrowArr[i].value;
							}
						}
						//散材料
						if(materialArr.length > 0) {
							for(let i = 0; i < materialArr.length; i++) {
								this.materialNum['material' + (i + 1)] = materialArr[i].value;
							}
						}
						//日常业务
						if(businessArr.length > 0) {
							for(let i = 0; i < businessArr.length; i++) {
								this.businessNum['business' + (i + 1)] = businessArr[i].value;
							}
						}
						this.chartDataList=[];//清空
						for(let key in resData.data) {
							this.chartDataList.push({
								name: key == 'list1' ? '库存统计' : (key == 'list2' ? '查借阅统计' : (key == 'list3' ? '散材料统计' : '日常业务统计')),
								data: resData.data[key]
							})
						}
						console.log(this.chartDataList);
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
			handleClick(tab, event) {
				if(tab.name == '0') { //库存统计
					this.chartsType = 'bar'; //柱状
					this.selectInd = '0';
				} else if(tab.name == '1') { //查借阅统计
					this.chartsType = 'pie'; //柱状
					this.selectInd = '1';

				} else if(tab.name == '2') { //散材料统计
					this.chartsType = 'bar'; //柱状
					this.selectInd = '2';

				} else if(tab.name == '3') { //日常业务统计
					this.chartsType = 'pie'; //柱状
					this.selectInd = '3';
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
					cursor: pointer;
				}
				.yellowText:hover{
					text-decoration:underline;
				}
			}
		}
		.search-date {
			position: absolute;
			top: 45px;
			right: 45px;
			div {
				float: left;
				margin-right: 20px;
				width: 28px;
				height: 28px;
				line-height: 31px;
				text-align: center;
				position: relative;
				border: 1px solid #eee;
				color: #ee8a00;
				font-size: 16px;
				border-radius: 4px;
				cursor: pointer;
			}
			.day {
				span {
					color: #6AB4E0;
				}
			}
			.month {
				span {
					color: #79C5A3;
				}
			}
			.year {
				span {
					    color: #B68FC3;
				}
			}
			div:hover{
			    background: #6AB4E0;
			}
			div:hover > span {
			    color: white !important;
			}
		}
	}
</style>