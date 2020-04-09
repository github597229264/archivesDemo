<template>
	<div class="retreat-con">
		<div class="title">离退信息</div>
		<form @submit.prevent="datadata">
			<table class="basicInformatiion" style="width:1000px">
				<tbody>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								<span class="must-fill">*</span> 离退日期
							</div>
						</td>
						<td class="name-td-fill" style="width:138px">
							<div class="name-td-fill-div nopadding">
								<div class="block">
									<el-date-picker v-model="RetreatList.a3104" value-format="yyyyMMdd" class="datePicker" type="date" placeholder="选择日期">
									</el-date-picker>
								</div>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								<span class="must-fill">*</span> 离退类别
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div position-div nopadding">
								<DepartureCategoryTreeSelect :chioceOptionId="RetreatList.a3101" @DepartureCategoryTreeSelectCall="DepartureCategoryTreeSelectCall"></DepartureCategoryTreeSelect>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								<span class="must-fill">*</span> 离退前级别
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div position-div nopadding">
								<PreRetirementLevelTreeSelect :chioceOptionId="RetreatList.a3107" @PreRetirementLevelTreeSelectCall="PreRetirementLevelTreeSelectCall"></PreRetirementLevelTreeSelect>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								最高职务
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="RetreatList.a3118" maxlength="40">
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								批准文号
							</div>
						</td>
						<td class="name-td-fill" colspan="3">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="RetreatList.a3137" maxlength="38">
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								提前退休
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div nopadding">
								<el-select v-model="RetreatList.a3141" clearable placeholder="请选择">
									<el-option v-for="item in isOrNotSelect" :key="item.code" :label="item.name" :value="item.code">
									</el-option>
								</el-select>
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								提前退休原因
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div position-div nopadding">
								<PreRetirementDetailsTreeSelect :chioceOptionId="RetreatList.a3144" @PreRetirementDetailsTreeSelectCall="PreRetirementDetailsTreeSelectCall"></PreRetirementDetailsTreeSelect>
							</div>
						</td>
					</tr>
					<tr class="name-tr" style="height:100px">
						<td class="name-td">
							<div class="name-td-div">
								离退说明
							</div>
						</td>
						<td class="name-td-fill" colspan="7">
							<div class="name-td-fill-div">
								<textarea class="mini-textbox-input" autocomplete="off" v-model="RetreatList.a3134" maxlength="180" style="height: 198px;width:100%"></textarea>
							</div>
						</td>
					</tr>
					<tr class="name-tr">
						<td class="name-td">
							<div class="name-td-div">
								离退后<br/>现管单位
							</div>
						</td>
						<td class="name-td-fill" colspan="3">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="RetreatList.a3117a" maxlength="70">
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								单位代码
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div">
								<input type="text" class="mini-textbox-input" v-model="RetreatList.a3117b" maxlength="15">
							</div>
						</td>
						<td class="name-td">
							<div class="name-td-div">
								<span class="must-fill">*</span> 管理类别
							</div>
						</td>
						<td class="name-td-fill">
							<div class="name-td-fill-div position-div nopadding">
								<ManagementClassTreeSelect :chioceOptionId="RetreatList.a3131" @ManagementClassTreeSelectCall="ManagementClassTreeSelectCall"></ManagementClassTreeSelect>
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
	import DepartureCategoryTreeSelect from '../../components/DepartureCategoryTreeSelect.vue';
	import ManagementClassTreeSelect from '../../components/ManagementClassTreeSelect.vue';
	import PreRetirementDetailsTreeSelect from '../../components/PreRetirementDetailsTreeSelect.vue';
	import PreRetirementLevelTreeSelect from '../../components/PreRetirementLevelTreeSelect.vue';

	export default {
		name:'EditRetreatInformation',
		props: ['selectObj'],
		components: {
			Pagination, //分页组件
			DepartureCategoryTreeSelect, //离退类别
			ManagementClassTreeSelect, //离退后管理类别
			PreRetirementDetailsTreeSelect, //提前退休原因
			PreRetirementLevelTreeSelect, //离退前级别
		},

		data() {
			return {
				tempRetreatList:{
					a3100:'',
					a0100:'',
					a3104: '',
					a3101: '',
					a3107: '',
					a3118: '',
					a3137: '',
					a3141: '',
					a3144: '',
					a3134: '',
					a3117b: '',
					a3117a: '',
					a3131: ''
				},
				RetreatList: {
					a3100:'',
					a0100:'',
					a3104: '',
					a3101: '',
					a3107: '',
					a3118: '',
					a3137: '',
					a3141: '',
					a3144: '',
					a3134: '',
					a3117b: '',
					a3117a: '',
					a3131: ''
				}, //离退信息
				pageObj: { //分页
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				edit_add_personal: false, //添加
				chioceObj: {}, //选中
				//addOrEdit: 'add', //判断添加还是修改
				isOrNotSelect: [{
						code: '0',
						name: '否'
					},
					{
						code: '1',
						name: '是'
					}
				],
			}
		},
		mounted() {
			this.getRetreatList();//离退信息回显
			
		},
		created() {
		},
		methods: {
			onSubmit() { //保存
				this.RetreatList.a0100 = this.selectObj.a0100;
				if(!!!this.RetreatList.a3104 || !!!this.RetreatList.a3101 || !!!this.RetreatList.a3107 || !!!this.RetreatList.a3131) {
					this.$confirm('请填写必填项！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				this.$axios({
					loading:{
            			isShow:false,
            		},
					method: 'post',
					url: this.API.saveOrUpdateA31,
					data: this.RetreatList
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							type: "success",
							message: '保存成功'
						});

						this.getRetreatList();
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
			getRetreatList() { //离退信息回显
				this.$axios({
					method: 'get',
					url: this.API.editA31,
					params: {
						'a0100': this.selectObj.a0100,
					}
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data.data;
						//判断resData是否为空，为空则转成空数组
						let tempObj = Object.getOwnPropertyNames(resData);
						if(tempObj.length > 1){
							this.RetreatList = resData;
						} else{
							this.RetreatList = this.tempRetreatList;
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
			PreRetirementLevelTreeSelectCall(id) {
				this.RetreatList.a3107 = id
			},
			DepartureCategoryTreeSelectCall(id) {
				this.RetreatList.a3101 = id
			},
			PreRetirementDetailsTreeSelectCall(id) {
				this.RetreatList.a3144 = id
			},
			ManagementClassTreeSelectCall(id) {
				this.RetreatList.a3131 = id
			}
		}
	}
</script>

<style lang="scss" scoped>
	.retreat-con {
		border: none;
		width: 100%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		.listSelect {
			/*margin: 0 auto;*/
			width: 100%;
			display: flex;
			flex-direction: column;
			/*justify-content: center;*/
			align-items: center;
		}
		/*.listSelect-list {
			position: absolute;
			left: 260px;
			right: 0;
		}*/
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
			font-family: '宋体';
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
					font-family: '宋体';
					text-align: center;
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