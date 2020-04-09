<template>
	<div class="container">
		<div class="title">年度考核登记</div>
		<form>
			<table class="basicInformatiion">
				<tbody>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								姓名
							</div>
						</td>
						<td class="name-td-fill disable">
							<input type="text" class="disable" disabled v-model="basicInformationFrom.pname" maxlength='40'/>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								性别
							</div>
						</td>
						<td class="name-td-fill disable">
							<input type="text" maxlength='6' class="disable" disabled v-model="basicInformationFrom.psex" />
						</td>
						<td class="name-td">
							<div class="name-td-div">
								出生日期
							</div>
						</td>
						<td class="name-td-fill disable">
							<input type="text" class="disable" disabled  maxlength='8' v-model="basicInformationFrom.birthDate" />
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								政治面貌
							</div>
						</td>
						<td class="name-td-fill disable" colspan="2">
							<input type="text" class="disable" maxlength='30' disabled v-model="outlook" />
						</td>
						<td class="name-td">
							<div class="name-td-div">
								现任职时间
							</div>
						</td>
						<td class="name-td-fill disable" colspan="2">
							<input type="text" class="disable" maxlength='10' disabled v-model="basicInformationFrom.e1004" />
						</td>

					</tr>

					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								现任单位及职务
							</div>
						</td>
						<td class="name-td-fill disable" colspan="5">
							<input type="text" class="disable" disabled v-model="basicInformationFrom.e10040" maxlength='200'/>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								从事或分管工作
							</div>
						</td>
						<td class="name-td-fill" colspan="5">
							<input 
								type="text" 
								style="width: 100%;font-size: 18px;box-sizing: border-box;border:none;outline: none;" maxlength='200' 
								:disabled="isDisabled"  
								class="look-disabled" 
								v-model="basicInformationFrom.positionandworkincharge" />
						</td>
					</tr>
					<tr class="name-tr" style="height:500px;" rowspan="3">
						<td class="name-td" colspan="1">
							<div class="name-td-div status-explain">
								个<br/>人<br/>总<br/>结
							</div>
						</td>
						<td colspan="5" style="position: relative;">
							<textarea 
								class="look-disabled"
								autocomplete="off" 
								v-model="basicInformationFrom.personalsummary" 
								style="height:100%;width: 100%;font-size:18px;box-sizing: border-box;outline:none;position: absolute;top:0;left:0;padding:10px;" 
								maxlength='3900'
								:disabled="isDisabled">
							</textarea>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td" colspan="2">
							<div class="name-td-div status-explain">
								主管领导评语和考核等次建议
							</div>
						</td>
						<td class="name-td-fill" colspan="4" style="position: relative;">
							<textarea 
								class="look-disabled"
								autocomplete="off" 
								v-model="basicInformationFrom.advice"
								maxlength='500'
								:disabled="isDisabled">
							</textarea>
							<div style="position:absolute;bottom: 5px;display: flex;justify-content: flex-end;align-items:center;width: 100%;">
								<span style="margin-right: 10px;">日期</span>
								<div class="block">
									<el-date-picker v-model="basicInformationFrom.advicedate" value-format="yyyy-MM-dd HH:mm:ss" type="date" class="datePicker" :disabled="isDisabled" placeholder="选择日期">
									</el-date-picker>
								</div>
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td" colspan="2">
							<div class="name-td-div status-explain">
								机关负责人或考核委员会意见
							</div>
						</td>
						<td class="name-td-fill" colspan="4" style="position: relative;">
							<textarea 
								class="look-disabled"
								autocomplete="off" 
								v-model="basicInformationFrom.leadersopinion"
								maxlength='500'
								:disabled="isDisabled">
							</textarea>
							<div style="position:absolute;bottom: 5px;display: flex;justify-content: flex-end;align-items:center;width: 100%;">
								<span style="margin-right: 10px;">日期</span>
								<div class="block">
									<el-date-picker v-model="basicInformationFrom.leadersopiniondate" value-format="yyyy-MM-dd HH:mm:ss" type="date" class="datePicker" :disabled="isDisabled" placeholder="选择日期">
									</el-date-picker>
								</div>
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td" colspan="2">
							<div class="name-td-div status-explain">
								本人意见
							</div>
						</td>
						<td class="name-td-fill" colspan="4" style="position: relative;">
							<textarea 
								class="look-disabled"
								autocomplete="off" 
								v-model="basicInformationFrom.myopinion"
								maxlength='500'
								:disabled="isDisabled">
							</textarea>
							<div style="position:absolute;bottom: 5px;display: flex;justify-content: flex-end;align-items:center;width: 100%;">
								<span style="margin-right: 10px;">日期</span>
								<div class="block">
									<el-date-picker v-model="basicInformationFrom.myopiniondate" value-format="yyyy-MM-dd HH:mm:ss" type="date" class="datePicker" :disabled="isDisabled" placeholder="选择日期">
									</el-date-picker>
								</div>
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td" colspan="2">
							<div class="name-td-div status-explain">
								未确定等次或不参加考核情况说明
							</div>
						</td>
						<td class="name-td-fill" colspan="4" style="position: relative;">
							<textarea 
								class="look-disabled"
								autocomplete="off" 
								v-model="basicInformationFrom.testcase"
								maxlength='500'
								:disabled="isDisabled">
							</textarea>
							<div style="position:absolute;bottom: 5px;display: flex;justify-content: flex-end;align-items:center;width: 100%;">
								<span style="margin-right: 10px;">日期</span>
								<div class="block">
									<el-date-picker v-model="basicInformationFrom.testcasedate" value-format="yyyy-MM-dd HH:mm:ss" type="date" class="datePicker" :disabled="isDisabled" placeholder="选择日期">
									</el-date-picker>
								</div>
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td" colspan="2">
							<div class="name-td-div status-explain">
								备注
							</div>
						</td>
						<td class="name-td-fill" colspan="4" style="position: relative;">
							<textarea 
								class="look-disabled"
								autocomplete="off" 
								v-model="basicInformationFrom.remark" 
								style="width: 100%;height:100%;font-size: 18px;box-sizing: border-box;border: none;outline: none;position: absolute;top:0;left: 0;bottom:0"
								maxlength='500'
								:disabled="isDisabled">
							</textarea>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="footer">
				<button type="button" @click="onSubmit">确定</button>
				<button type="button" @click="Cancel">取消</button>
			</div>
		</form>
	</div>

</template>

<script>
	export default {
		name:'ExamineAdd',
		components: {

		},
		props: ['selectDeceive', 'addOrEdit'],
		data() {
			return {
				basicInformationFrom: { //干部数字档案基本信息表
					id: '', //序号（更新时必填 新增时为空）
					a0100: '', //人员编号（新增时必填 更新时为空）
					pname: '', //姓名（不可编辑）
					psex: '', //性别（不可编辑）
					birthDate: '', //出生年月（不可编辑）
					a0141: '', //政治面貌（不可编辑）
					e1004: '', //现任职时间（不可编辑）
					e10040: '', //现职单位及职务（不可编辑）
					positionandworkincharge: '', //从事或分管工作
					personalsummary: '', //个人总结
					advice: "", //主管领导评语和考核等次建议
					advicedate: '', //主管领导评语日期（Date类型）
					leadersopinion: "", //机关负责人或考核委员会意见
					leadersopiniondate: '', //机关负责人日期（Date类型）
					myopinion: '', //本人意见
					myopiniondate: '', //本人意见日期（Date类型）
					testcase: '', //未确定等次或不参加考核情况说明
					testcasedate: '', //未确定等次日期（Date类型）
					remark: '', //备注

				},
				isDisabled:false,//是否只读
				outlook:'',
			}
		},
		mounted() {
			let {
				selectDeceive
			} = this;

			if(this.addOrEdit == 'edit') {
				this.getEdit();
			} else if(this.addOrEdit == 'look'){
				this.getEdit();
				this.isDisabled=true;
			}else{
				this.basicInformationFrom.a0100 = selectDeceive.a0100;
				this.basicInformationFrom.pname = selectDeceive.a0101;
				this.basicInformationFrom.psex = selectDeceive.a0104a;
				this.basicInformationFrom.birthDate = selectDeceive.a0107;
				this.basicInformationFrom.a0141 = selectDeceive.a0141b;
				this.outlook = selectDeceive.a0141a;
				this.basicInformationFrom.e1004 = selectDeceive.e1004;
				this.basicInformationFrom.e10040 = selectDeceive.e10040;
			}
		},
		methods: {
			onSubmit() { //保存
				this.$axios({
					method: 'post',
					url: this.API.saveOrUpdateAnnualAppraisal,
					data: this.basicInformationFrom
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data;
						this.basicInformationFrom = {};
						this.$emit('backCall', true);
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}
				}).catch(function(err) {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getEdit(){//编辑回显
				this.$axios({
					method: 'get',
					url: this.API.editAnnualAppraisal,
					params: {
						id: this.selectDeceive.id
					}
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data;
						this.basicInformationFrom = resData.data;
						this.outlook=resData.data.zzmm;
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
			Cancel() { //取消
				this.$emit('backCall', true);
				this.basicInformationFrom = {}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		border: none;
		width: 824px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
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
		}
		.name-tr {
			height: 49px;
			td {
				border: 1px solid black;
				box-sizing: border-box;
				.look-disabled{
					background: #fff;
				}
			}
			.name-td {
				width: 99px;
				.name-td-div {
					width: 100%;
					font-size: 18px;
					text-align: center;
					font-family: '宋体';
					.must-fill {
						color: red;
						font-weight: bold;
					}
				}
				.status-explain {
					height: 200px;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.education-type {
					height: 100px;
					border-bottom: 1px solid black;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.add-photo-div {
					width: 48%;
					height: 100%;
					display: inline-block;
					text-align: center;
					border-right: 1px solid black;
					line-height: 50px;
					font-size: 18px;
					color: blue;
					box-sizing: border-box;
				}
				.copy-num {
					width: 48%;
					height: 100%;
					text-align: center;
					border-right: 1px solid black;
					line-height: 50px;
					font-size: 18px;
					box-sizing: border-box;
					display: inline-block;
					input[type=text] {
						width: 100%;
						background: none;
						outline: none;
						border: 0px;
					}
				}
				.noBorder {
					border: none !important
				}
			}
			.name-td-fill {
				width: 116px;
				textarea {
					width: 100%;
					height: 80%;
					font-size: 18px;
					font-family: '宋体';
					box-sizing: border-box;
					border: none;
					outline: none;
					position: absolute;
					top: 0;
					left: 0;
					bottom: 40px;
					padding: 10px;
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
				}
				.disable {
					background: #F0F0F0;
				}
				.name-td-fill-div {
					width: 100%;
					padding: 0 5px;
					box-sizing: border-box;
					font-family: '宋体';
					input[type=text] {
						width: 100%;
						background: none;
						outline: none;
						border: 0px;
						font-family: '宋体';
					}
					.block {
						width: 100%;
					}
					.datePicker {
						width: 100%
					}
					.mini-textbox-input {
						width: 590px;
						outline: none;
						resize: none;
						border: none;
						font-size: 18px;
					}
					label {
						width: 50px;
						display: inline-block;
					}
					.position-input {
						width: 100% !important;
						outline: none;
						resize: none;
						border: none;
						font-size: 18px;
						background: red;
					}
				}
				.look-disabled{
					background: #fff;
				}
				.position-div {
					width: 100%
				}
				.nopadding {
					padding: 0
				}
				.education-type {
					width: 100%;
					height: 100px;
					border-bottom: 1px dashed #3f3f3f;
				}
				.noBorder {
					border: none !important
				}
			}
			.disable {
					background: #F0F0F0;
				}
			.photo-img {
				width: 164px
			}
		}
		.education-box {
			height: 200px
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
			font-family: "微软雅黑";
			color: #fff;
			text-decoration: none;
		}
		;
	}
</style>