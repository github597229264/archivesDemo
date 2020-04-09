<template>
	<div class="record-con">
		<div class="title">档案信息</div>
		<form >
			<table class="basicInformatiion" style="width:1000px">
				<tbody>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								转入日期
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div nopadding">
								<div class="block">
									<el-date-picker v-model="RecordList.a3801" value-format="yyyyMMdd" class="datePicker" type="date" placeholder="选择日期">
									</el-date-picker>
								</div>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								转出日期
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div nopadding">
								<div class="block">
									<el-date-picker v-model="RecordList.a3817" value-format="yyyyMMdd" type="date" class="datePicker" placeholder="选择日期">
									</el-date-picker>
								</div>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								来处代码
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="RecordList.a3804b" maxlength="15">
							</div>

						</td>
						<td class="name-td">
							<div class="name-td-div">
								档案编号
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="RecordList.a3811" maxlength="8">
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								档案管理<br/>单位名称
							</div>
						</td>
						<td class="name-td-fill" colspan="3">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="RecordList.a3807a" maxlength="70">
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								正本卷数
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="RecordList.a3827" maxlength="10">
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								副本卷数
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="RecordList.a3831" maxlength="10">
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								档案来处<br/>单位名称
							</div>
						</td>
						<td class="name-td-fill" colspan="3">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="RecordList.a3804a" maxlength="70">
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								档案去处<br/>单位名称
							</div>
						</td>
						<td class="name-td-fill" colspan="3">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="RecordList.a3821a" maxlength="70">
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								档案备注
							</div>
						</td>
						<td class="name-td-fill" colspan="3">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="RecordList.a3824" maxlength="480">
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								档案管理<br/>单位代码
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="RecordList.a3807b" maxlength="15">
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								档案去处<br/>单位代码
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="RecordList.a3821b" maxlength="15">
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="footer">
				<button type="button" @click="onSubmit">保存</button>
			</div>
		</form>
	</div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';

	

	export default {
		name:'EditRecordInformation',
		props: ['selectObj'],
		components: {
			Pagination, //分页组件
		},

		data() {
			return {
				tempRetreatList: { //档案信息--初始化
					a3800:'',
					a0100:'',
					a3807a:'',
					a3804a:'',
					a3801:'',//转入日期
					a3804b:'',
					a3807b:'',
					a3811:'',
					a3827:'',
					a3831:'',
					a3824:'',
					a3817:'',//转出日期
					a3821a:'',
					a3821b:'',
				},
				RecordList: {}, //档案信息
				pageObj: { //分页
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				chioceObj: {}, //选中
			}
		},
		created() {
			this.tempRetreatList.a3801 = this.commonFun.dateFormat(new Date(), "yyyyMMdd");
			this.tempRetreatList.a3817 = this.commonFun.dateFormat(new Date(), "yyyyMMdd");
		},
		mounted() {
			this.getRecordList();//档案回显
		},
		
		methods: {
			onSubmit() { //保存
				this.RecordList.a0100 = this.selectObj.a0100;
				this.$axios({
					loading:{
            			isShow:false,
            		},
					method: 'post',
					url: this.API.saveOrUpdateA38,
					data: this.RecordList
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							type: "success",
							message: '保存成功'
						});

						this.getRecordList();
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
			getRecordList() { //档案回显
				this.$axios({
					method: 'get',
					url: this.API.editA38,
					params: {
						'a0100': this.selectObj.a0100,
					}
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data.data;
						//判断resData是否为空，为空则转成空数组
						let tempObj = Object.getOwnPropertyNames(resData);
						if(tempObj.length > 1){
							this.RecordList = resData;
						} else{
							this.RecordList = this.tempRetreatList;
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.record-con {
		border: none;
		width: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		.listSelect {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.el-menu-vertical-demo:not(.el-menu--collapse) {
			width: 200px;
			min-height: 400px;
		}
		.content {
			.el-dialog {
				height: 100%;
			}
			background-color: #fff;
			.title {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10px;
				.left {
					display: flex;
				}
				.right {
					display: flex;
					.el-button {
						margin-left: 10px;
					}
				}
			}
			.material_page {
				margin-top: 10px;
				text-align: right;
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
		.titleInfoBox {
			display: flex;
			justify-content: space-around;
			position: absolute;
			top: 50px;
			left: 0;
			right: 0;
			font-size: 18px;
			background: #eee;
			height: 50px;
			align-items: center;
		}
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
		.name-tr {
			height: 49px;
			.photo-img {
				.avatar-uploader {
					width: 178px;
					.el-upload {
						border: 1px dashed #d9d9d9;
						border-radius: 6px;
						cursor: pointer;
						position: relative;
						overflow: hidden;
						width: 178px !important;
						.avatar-uploader-icon {
							font-size: 28px;
							color: #8c939d;
							width: 178px;
							height: 178px;
							line-height: 178px;
							text-align: center;
						}
						.avatar {
							width: 178px;
							height: 178px;
							display: block;
						}
					}
					.el-upload:hover {
						border-color: #409EFF;
					}
					.el-upload--text {
						width: 178px !important;
					}
				}
			}
			td {
				border: 1px solid black;
				box-sizing: border-box;
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
					font-family: '宋体';
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
	}
</style>