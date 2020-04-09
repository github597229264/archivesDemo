<template>
	<div class='historyInfo'>
		<div class="title">人员基本信息</div>
		<table class="basicInformatiion" border='1'>
			<tbody>
				<tr class="name-tr">
					<td class="name-td">
						<span class="must-fill">*</span> 姓名
					</td>
					<td class="name-td-fill" style="width:150px">
						{{basicInformationFrom.a0101}}
					</td>
					<td class="name-td">
						性别
					</td>
					<td class="name-td-fill">
						<div v-if="basicInformationFrom.a0104 == '1'">男</div>
						<div v-else-if="basicInformationFrom.a0104 == '2'">女</div>
					</td>
					<td class="name-td">
						出生日期
					</td>
					<td class="name-td-fill">
						{{basicInformationFrom.a0107}}
					</td>
					<td class="photo-img" rowspan="4" colspan="2">
						<div class="head-img" v-if="basicInformationFrom.a0191a">
							<img width="120" height="160" :src="basicInformationFrom.pic" />
						</div>
						<div v-else class="head-img">
							<div class="head-img" v-if="basicInformationFrom.a0104=='2'">
								<img width="120" height="160" src="../../../assets/img/DefaultHeadFemale.jpg" />
							</div>
							<div v-else-if="basicInformationFrom.a0104=='1'">
								<img width="120" height="160" src="../../../assets/img/DefaultHeadMale.jpg" />
							</div>
						</div>
					</td>
				</tr>
				<tr class="name-tr">
					<td class="name-td">
						民族
					</td>
					<td class="name-td-fill">
						{{basicInformationFrom.mz}}
					</td>
					<td class="name-td">
						籍贯
					</td>
					<td class="name-td-fill">
						{{basicInformationFrom.a0111a}}
					</td>
					<td class="name-td">
						出生地
					</td>
					<td class="name-td-fill">
						{{basicInformationFrom.a0114a}}
					</td>
				</tr>
				<tr class="name-tr">
					<td class="name-td">
						政治面貌
					</td>
					<td class="name-td-fill">
						{{basicInformationFrom.zzmm}}
					</td>
					<td class="name-td">
						婚姻状况
					</td>
					<td class="name-td-fill">
						{{basicInformationFrom.hy}}
					</td>
					<td class="name-td">
						参加组织<br/>时间
					</td>
					<td class="name-td-fill">
						{{basicInformationFrom.a0144}}
					</td>
				</tr>
				<tr class="name-tr">
					<td class="name-td">
						现任单位<br/>及职务
					</td>
					<td class="name-td-fill" colspan="5">
						{{basicInformationFrom.e10040}}
					</td>
				</tr>
				<tr class="name-tr">
					<td class="name-td">
						证件类型
					</td>
					<td class="name-td-fill">
						{{basicInformationFrom.zjlb}}
					</td>
					<td class="name-td">
						证件号码
					</td>
					<td class="name-td-fill" colspan="5">
						{{basicInformationFrom.a0184}}
					</td>
				</tr>
				<tr class="name-tr">
					<td class="name-td">
						文化程度
					</td>
					<td class="name-td-fill">
						{{basicInformationFrom.e1001}}
					</td>
					<td class="name-td">
						个人身份
					</td>
					<td class="name-td-fill" colspan="2">
						{{basicInformationFrom.grsf}}
					</td>
					<td class="name-td">
						毕业时间
					</td>
					<td class="name-td-fill" colspan="2">
						{{basicInformationFrom.e1003}}
					</td>
				</tr>
				<tr class="name-tr">
					<td class="name-td">
						人员类别
					</td>
					<td class="name-td-fill">
						{{basicInformationFrom.rylb}}
					</td>
					<td class="name-td">
						现职时间
					</td>
					<td class="name-td-fill" colspan="2">
						{{basicInformationFrom.e1004}}
					</td>
					<td class="name-td">
						参加工作时间
					</td>
					<td class="name-td-fill" colspan="2">
						{{basicInformationFrom.a0134}}
					</td>
				</tr>
				<tr class="name-tr education-box">
					<td class="name-td">
						学历学位
					</td>
					<td class="name-td">
						<div class="name-td-div education-type">
							全日制教育
						</div>
						<div class="name-td-div education-type noBorder">
							在职教育
						</div>
					</td>
					<td class="name-td-fill" colspan="2">
						<div class="name-td-fill-div education-type nopadding">
							<div class="edu-edu">
								{{basicInformationFrom.e1005}}
							</div>
							<div class="edu-edu">
								{{basicInformationFrom.e10050}}
							</div>
						</div>
						<div class="name-td-fill-div education-type nopadding">
							<div class="edu-edu">
								{{basicInformationFrom.e1007}}
							</div>
							<div class="edu-edu">
								{{basicInformationFrom.e10070}}
							</div>
						</div>
					</td>
					<td class="name-td">
						<div class="name-td-div education-type">
							毕业院校系及专业
						</div>
						<div class="name-td-div education-type noBorder">
							毕业院校系及专业
						</div>
					</td>
					<td class="name-td-fill" colspan="3">
						<div class="name-td-fill-div education-type nopadding">
							<div class="edu-edu">
								{{basicInformationFrom.e10051}}
							</div>
							<div class="edu-edu">
								{{basicInformationFrom.e1006}}
							</div>
						</div>
						<div class="name-td-fill-div education-type nopadding">
							<div class="edu-edu">
								{{basicInformationFrom.e10071}}
							</div>
							<div class="edu-edu">
								{{basicInformationFrom.e1008}}
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	export default {
		name: 'historyInfo',
		components: {

		},
		props: ['selectDeceive'],
		data() {
			return {
				basicInformationFrom: {//干部信息采集-人员基本信息
					e10: {
						e1009: '',
						e1019: '',
						e1010: '',
						e1011: '',
						e1014: '',
						e1014b: '',
						e1012: '',
						e1013: '',
						e1015: '',
					}
				}, 
			};
		},
		created() {
			this.getData();
		},
		mounted() {

		},
		methods: {
			getData() { //历史信息
				this.$axios({
					method: 'get',
					url: this.API.historySnapshotRecrds,
					params: {
						'id':this.selectDeceive.id
					}
				}).then((res) => {
					if(res.data.code == '1') {
						this.basicInformationFrom = res.data.data;
						console.log(res.data.data);
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
		}
	};
</script>
<style lang="scss" scoped type="text/css">
	.historyInfo {
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
		}
		.job-information-table {
			min-height: 270px
		}
		.name-tr {
			height: 49px;
			td {
				border: 1px solid black;
				box-sizing: border-box;
			}
			.name-td {
				text-align: center;
				font-size: 18px;
				font-family: '宋体';
				width: 99px;
				.must-fill {
					color: red;
					font-weight: bold;
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
				text-align: center;
				font-size: 18px;
				font-family: '宋体';
				.nopadding {
					padding: 0
				}
				.education-type {
					width: 100%;
					height: 100px;
					border-bottom: 1px dashed #3f3f3f;
					.edu-edu{
						border:1px dashed #ccc;
						height:50px;
						box-sizing: border-box;
						display: flex;
						padding:0 5px;
						text-align: center;
						font-size: 18px;
						font-family: '宋体';
						line-height: 50px;
					}
				}
				.noBorder {
					border: none !important
				}
			}
			.photo-img {
				width: 164px;
				.head-img{
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
		.education-box {
			height: 200px
		}
	}
</style>