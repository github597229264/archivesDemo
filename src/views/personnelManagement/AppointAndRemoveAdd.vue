 <template>
	<div>
		<form name="removalApprovalDataForm">
			<div class="container">
				<div class="title">干部任免审批表</div>
				<table class="basicInformatiion" border="1">
					<tbody>
						<tr>
							<td width="100">
								姓名
							</td>
							<td width="110" class="disable">
								<input type="text" class="disable" disabled v-model="removalApprovalData.pname" />
							</td>
							<td width="100">
								性别
							</td>
							<td width="110" class="disable">
								<input type="text" class="disable" disabled v-model="sexName" />
							</td>
							<td width="120">
								出生日期
							</td>
							<td width="120" class="disable">
								<input type="text" class="disable" disabled v-model="removalApprovalData.birthDate" />
							</td>
							<td rowspan="4">
								<div v-if="removalApprovalData.pic">
									<img width="120" height="160" :src="removalApprovalData.pic" />
								</div>
								<div v-else>
									<div v-if="removalApprovalData.psex=='2'">
										<img width="120" height="160" src="../../assets/img/Head_portrait01.png" />
									</div>
									<div v-else-if="removalApprovalData.psex=='1'">
										<img width="120" height="160" src="../../../build/logo.png" />
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								民族
							</td>
							<td class="disable">
								<input type="text" class="disable" disabled v-model="removalApprovalData.nation" />
							</td>
							<td>
								籍贯
							</td>
							<td class="disable">
								<input type="text" class="disable" disabled v-model="removalApprovalData.nationplace" />
							</td>
							<td>
								出生地
							</td>
							<td class="disable">
								<input type="text" class="disable" disabled v-model="removalApprovalData.homeplace" />
							</td>

						</tr>
						<tr>
							<td>
								入党时间
							</td>
							<td class="disable">
								<input type="text" class="disable" disabled v-model="removalApprovalData.partydate" />
							</td>
							<td>
								参加工作<br/>时间
							</td>
							<td class="disable">
								<input type="text" class="disable" disabled v-model="removalApprovalData.jobdate" />
							</td>
							<td>
								健康状况
							</td>
							<td>
								<HealthTreeSelect :chioceOptionId="removalApprovalData.health" @HealthTreeSelectCall="HealthTreeSelectCall"></HealthTreeSelect>
							</td>
						</tr>
						<tr>
							<td>
								专业技术<br/>职务
							</td>
							<td colspan="2">
								<input type="text" style="text-align: left;" maxlength='80' v-model="removalApprovalData.skillTech" />
							</td>
							<td>
								熟悉专业<br/>有何专长
							</td>
							<td colspan="2">
								<input type="text" style="text-align: left;" maxlength='60' v-model="removalApprovalData.skill" />
							</td>
						</tr>
						<tr>
							<td rowspan="2">
								学历学位
							</td>
							<td>
								全日制教育
							</td>
							<td colspan="2" class="disable">
								<input type="text" class="disable" disabled v-model="removalApprovalData.fullbachelor" />
							</td>
							<td>
								毕业院校系及专业
							</td>
							<td colspan="3" class="disable">
								<input type="text" class="disable" disabled v-model="removalApprovalData.fullschool" />
							</td>
						</tr>
						<tr>
							<td>
								在职教育
							</td>
							<td colspan="2" class="disable">
								<input type="text" class="disable" disabled v-model="removalApprovalData.onjobbachelor" />
							</td>
							<td>
								毕业院校系及专业
							</td>
							<td colspan="3" class="disable">
								<input type="text" class="disable" disabled v-model="removalApprovalData.onjobschool" />
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<span class="must-fill">*</span>现 任 职 务
							</td>
							<td colspan="5">
								<input type="text" maxlength="200" style="text-align: left;" v-model="removalApprovalData.presentoccupation" />
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<span class="must-fill">*</span>拟 任 职 务
							</td>
							<td colspan="5">
								<input type="text" maxlength="200" style="text-align: left;" v-model="removalApprovalData.designatedposition" />
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<span class="must-fill">*</span>拟 免 职 务
							</td>
							<td colspan="5">
								<input type="text" maxlength="200" style="text-align: left;" v-model="removalApprovalData.tofreepost" />
							</td>
						</tr>
						<tr style="height:716px;">
							<td rowspan="3">
								简<br/>历
							</td>
							<td colspan="6" class="disable">

								<table class="second-table">
									<tbody>
										<tr v-for="item in removalApprovalData.resumeinformation">
											<td width="175">{{item.A1703}}--{{item.A1704}}</td>
											<td>{{item.A1701}}</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<hr />
			<div class="container">
				<table class="basicInformatiion" border="1">
					<tbody>
						<tr style="height:100px">
							<td width="58">奖<br/>惩<br/>情<br/>况</td>
							<td colspan="7">
								<textarea class="inp-long" autocomplete="off" v-model="removalApprovalData.rewardsandpunishment" maxlength="3900"></textarea>
							</td>
						</tr>
						<tr style="height:100px">
							<td width="58">年核<br/>度结<br/>考果<br/></td>
							<td colspan="7">
								<textarea class="inp-long" autocomplete="off" v-model="removalApprovalData.annualappraisalresults" maxlength="3900"></textarea>
							</td>
						</tr>
						<tr style="height:100px">
							<td width="58">任<br/>免<br/>理<br/>由</td>
							<td colspan="7">
								<textarea class="inp-long" autocomplete="off" v-model="removalApprovalData.reason" maxlength="3900"></textarea>
							</td>
						</tr>
						<tr>
							<td rowspan="8" colspan="1">家<br/>庭<br/>主<br/>要<br/>成<br/>员<br/>及<br/>重<br/>要<br/>社<br/>会<br/>关<br/>系</td>
							<td>称谓</td>
							<td>姓名</td>
							<td>年龄</td>
							<td width="100">政治面貌</td>
							<td colspan="3">工作单位及职务</td>
						</tr>
						<tr class="disable" v-for="item in socialArr">
							<td>{{item.A3604A}}</td>
							<td>{{item.A3601}}</td>
							<td>{{item.age}}</td>
							<td>{{item.ZZMM}}</td>
							<td colspan="3">{{item.A3611}}</td>
						</tr>
						<tr style="height:138px">
							<td width="58">呈<br/>报<br/>单<br/>位</td>
							<td colspan="7">
								<textarea class="inp-long" autocomplete="off" v-model="removalApprovalData.reportunit" maxlength="200"></textarea>
							</td>
						</tr>
						<tr style="height:297px">
							<td width="58">审意<br/>批<br/>机<br/>关见</td>
							<td colspan="3">
								<table width="100%">
									<tbody>
										<tr style="height:239px">
											<td colspan="3">
												<textarea class="inp-option" autocomplete="off" v-model="removalApprovalData.approvalopinion" maxlength="500"></textarea>
											</td>
										</tr>
										<tr>
											<td style="text-align:right;"><span class="must-fill">*</span>日期</td>
											<td width='150'>
												<el-date-picker v-model="removalApprovalData.approvaldate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
												</el-date-picker>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
							<td width="58">行任<br/>政免<br/>机意<br/>关见</td>
							<td colspan="3">
								<table width="100%">
									<tbody>
										<tr style="height:239px">
											<td colspan="3">
												<textarea class="inp-option" autocomplete="off" v-model="removalApprovalData.administrativeorganopinion" maxlength="50"></textarea>
											</td>
										</tr>
										<tr>
											<td style="text-align:right;"><span class="must-fill">*</span>日期</td>
											<td width='150'>
												<div class="block">
													<el-date-picker v-model="removalApprovalData.administrativeorgandate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
													</el-date-picker>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="footer">
				<button type="button" @click="dataSubmit">确认</button>
				<button type="button" @click="cancelAddOrEdit">取消</button>
			</div>
		</form>
	</div>
</template>

<script>
	import commonFun from '../../common/commonFun.js';
	import HealthTreeSelect from '../../components/HealthTreeSelect.vue';

	export default {
		name: 'AppointAndRemoveAdd',
		props: ['selectDeceive', 'addOrEdit'],
		components: {
			commonFun,
			HealthTreeSelect, //健康状况
		},

		data() {
			return {
				hidden: false,
				removalApprovalData: {
					id: '', //序号（更新时为必填） 新增传空
					a0100: '', //人员编号
					pname: '', //姓名（不可编辑）
					psex: '', //性别（不可编辑）
					birthDate: '', //出生年月（不可编辑）
					age: '', //年龄（不可编辑）
					nation: '', //民族（不可编辑）
					photo: '', //照片
					nationplace: '', //	籍贯（不可编辑）
					homeplace: '', //出生地（不可编辑）
					partydate: '', //入党时间（不可编辑）
					jobdate: '', //参加工作时间（不可编辑）
					health: '', //健康状况
					skillTech: '', //专业技术职务
					skill: '', //	专长
					fullbachelor: '', //全日制教育（不可编辑）
					fullschool: '', //全日制院校（不可编辑）
					onjobbachelor: '', //在职教育（不可编辑）
					onjobschool: '', //在职院校（不可编辑）
					presentoccupation: '', //	现任职务（不可编辑）
					designatedposition: '', //	拟任职务（不可编辑）
					tofreepost: '', //拟免职务（不可编辑）
					resumeinformation: [], //简历（不可编辑）
					rewardsandpunishment: '', //奖惩情况
					annualappraisalresults: '', //年度考核结果
					reason: '', //任免理由
					familymembers: {}, //家庭成员（不可编辑）
					reportunit: '', //呈报单位
					approvalopinion: '', //审批机关意见
					approvaldate: '', //审批日期（Date类型）
					administrativeorganopinion: '', //行政机关任免意见
					administrativeorgandate: '', //行政机关任免日期（Date类型）
				},
				socialArr: [], //家庭成员
				isOrNotSelect: [{
						code: '0',
						name: '否'
					},
					{
						code: '1',
						name: '是'
					}
				],
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				sexName:'',//性别（男女）
			}
		},
		created() {
			this.getBasicFunc(); //基本信息--只读
			this.getresumeFunc(); //简历信息--只读
			this.getFamilyFunc(); //家庭成员及社会关系--只读
			this.removalApprovalData.approvaldate = this.commonFun.dateFormat(new Date(), "yyyy-MM-dd");
			this.removalApprovalData.administrativeorgandate = this.commonFun.dateFormat(new Date(), "yyyy-MM-dd");
			if(this.addOrEdit == 'edit') {
				let newArr = this.removalApprovalData;
				let oldArr = this.selectDeceive;
				newArr.id = oldArr.id;
				newArr.health = oldArr.health;
				newArr.skillTech = oldArr.skillTech;
				newArr.skill = oldArr.skill;
				newArr.presentoccupation = oldArr.presentoccupation;
				newArr.designatedposition = oldArr.designatedposition;
				newArr.tofreepost = oldArr.tofreepost;
				newArr.rewardsandpunishment = oldArr.rewardsandpunishment;
				newArr.annualappraisalresults = oldArr.annualappraisalresults;
				newArr.reason = oldArr.reason;
				newArr.reportunit = oldArr.reportunit;
				newArr.approvalopinion = oldArr.approvalopinion;
				newArr.approvaldate = oldArr.approvaldate;
				newArr.administrativeorganopinion = oldArr.administrativeorganopinion;
				newArr.administrativeorgandate = oldArr.administrativeorgandate;
			}
		},
		mounted() {

		},
		methods: {
			dataSubmit() { //保存
				this.removalApprovalData.a0100 = this.selectDeceive.a0100;
				if(!!!this.removalApprovalData.presentoccupation || !!!this.removalApprovalData.designatedposition || !!!this.removalApprovalData.tofreepost || !!!this.removalApprovalData.administrativeorgandate || !!!this.removalApprovalData.approvaldate) {
					this.$confirm('请填写必填项！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				//简历转string
				let resumeArr=this.removalApprovalData.resumeinformation;
				if(resumeArr){
					resumeArr=JSON.stringify(resumeArr);
					this.removalApprovalData.resumeinformation=resumeArr.substring(1,resumeArr.length-1);
				};
				//家庭成员转string
				let familyArr=this.socialArr;
				if(familyArr){
					familyArr=JSON.stringify(familyArr);
					this.removalApprovalData.familymembers=familyArr.substring(1,familyArr.length-1);
				};
				this.$axios({
					method: 'post',
					url: this.API.saveOrUpdateBada,
					data: this.removalApprovalData
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.$emit("AddBack", true);
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}
				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			cancelAddOrEdit() { //取消操作
				//调用父组件方法--isRefresh=false不需要刷新父组件的数据
				this.$emit("AddBack", true);
			},
			getBasicFunc() { //添加时获取基本信息
				this.$axios({
					method: 'get',
					url: this.API.editA01,
					params: {
						'a0100': this.selectDeceive.a0100
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						let basicData = resData.data;
						this.removalApprovalData.a0100 = basicData.a0100;
						this.removalApprovalData.pname = basicData.a0101;
						this.removalApprovalData.psex = basicData.a0104;
						if(this.removalApprovalData.psex=='1'){
							this.sexName='男';
						}else if(this.removalApprovalData.psex=='2'){
							this.sexName='女';
						}
						this.removalApprovalData.birthDate = basicData.a0107;
						this.removalApprovalData.pic = basicData.pic;
						this.removalApprovalData.photo = basicData.a0191a;
						this.removalApprovalData.nation = basicData.mz;
						this.removalApprovalData.nationplace = basicData.a0111a;
						this.removalApprovalData.homeplace = basicData.a0114a;
						this.removalApprovalData.partydate = basicData.a0144;
						this.removalApprovalData.jobdate = basicData.a0134;
						this.removalApprovalData.fullbachelor = basicData.e10050; //全日制教育
						this.removalApprovalData.fullschool = basicData.e10051; //全日制院校
						this.removalApprovalData.onjobbachelor = basicData.e10070; //在职教育
						this.removalApprovalData.onjobschool = basicData.e10071; //在职院校
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}
				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getresumeFunc() { //获取简历信息
				this.$axios({
					method: 'get',
					url: this.API.findA17InformationPage,
					params: {
						a0100: this.selectDeceive.a0100,
						pageIndex: this.pageObj.pageIndex,
						pageSize: 1000,
					}
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data.data;
						if(resData.list.length > 0) {
							let Arr = resData.list;
							for(let i = 0; i < Arr.length; i++) {
								this.removalApprovalData.resumeinformation.push({
									A1703: Arr[i].a1703,
									A1704: Arr[i].a1704,
									A1701: Arr[i].a1701
								})
							}
						}

					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}
				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getFamilyFunc() { //获取家庭信息
				this.$axios({
					method: 'get',
					url: this.API.findA36InformationPage,
					params: {
						a0100: this.selectDeceive.a0100,
						pageIndex: this.pageObj.pageIndex,
						pageSize: 1000,
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						if(resData.data) {
							let Arr = resData.data.list;
							for(let i = 0; i < Arr.length; i++) {
								this.socialArr.push({
									A3604A: Arr[i].a3604a,
									A3601: Arr[i].a3601,
									age: Arr[i].age,
									ZZMM: Arr[i].zzmm,
									A3611: Arr[i].a3611,
								})
							};
							let len = this.socialArr.length;
							if(this.socialArr.length <= 7) {
								for(let i = len; i < 7; i++) {
									this.socialArr.push({
										A3604A: '',
										A3601: '',
										age: '',
										ZZMM: '',
										A3611: ''
									})
								}
							} else {
								this.currRowSpan = len + 1;

							}
						} else {
							this.hasApproval = false;
						}
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}
				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			HealthTreeSelectCall(id) { //健康回调
				this.removalApprovalData.health = id
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.container {
		border: none;
		width: 824px;
		margin: 0 auto;
		.title {
			margin: 0;
			display: flex;
			justify-content: center;
			letter-spacing: 16px;
			font-size: 36px;
			font-family: '宋体';
			height: 30px;
			line-height: 30px;
			margin-top: 20px;
			color: black;
			font-weight: bold;
		}
		.basicInformatiion {
			width: 824px;
			box-sizing: border-box;
			margin-top: 20px;
			border: 2px solid black;
			margin-bottom: 20px;
			tbody {
				tr {
					height: 54px;
					td {
						text-align: center;
						font-size: 18px;
						font-family: '宋体';
						tr {
							height: 30px;
							td {
								text-align: left;
								padding: 0 5px;
							}
							.inp-option {
								width: 100%;
								height: 230px;
								font-size: 18px;
								font-family: '宋体';
								outline: none;
								resize: none;
								border: none;
								padding: 0 5px;
								box-sizing: border-box;
							}
						}
						input[type="text"] {
							width: 100%;
							font-size: 18px;
							font-family: '宋体';
							outline: none;
							resize: none;
							border: none;
							padding: 0 5px;
							box-sizing: border-box;
							text-align: center;
						}
						.inp-long {
							box-sizing: border-box;
							width: 100%;
							height: 100px;
							overflow: auto;
							font-size: 18px;
							font-family: '宋体';
							outline: none;
							resize: none;
							border: none;
							padding: 5px;
						}
						.disable {
							background: #F0F0F0;
						}
						.must-fill {
							color: red;
							font-weight: bold;
						}
					}
				}
				.disable {
					background: #F0F0F0;
				}
			}
			.disable {
				background: #F0F0F0;
			}
		}
	}
	
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 58px;
		background: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		button {
			display: block;
			width: 106px;
			height: 44px;
			background: #69a5d4;
			border-radius: 6px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 18px;
			font-family: "宋体";
			color: #fff;
			text-decoration: none;
		}
	}
</style>