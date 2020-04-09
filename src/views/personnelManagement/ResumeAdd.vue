<template>
	<div class="container">
		<el-form ref="PostData" :rules="rules" :model="PostData" label-width="150px" class="form-el">
			<el-row>
				<el-col :span="11">
					<el-form-item label="起始时间" prop="a1703">
						<el-date-picker v-model="PostData.a1703" style="width:100%" type="date" placeholder="选择起始时间" format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="截止时间" prop="a1704">
						<el-date-picker v-model="PostData.a1704" style="width:100%" type="date" placeholder="选择截止时间" format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="22">
					<el-form-item label="内容" prop="a1701">
						<el-input type="textarea" :rows="5" v-model="PostData.a1701" maxlength='2000'></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item size="large" class="btn">
				<el-button type="primary" @click="onSubmit">保存</el-button>
				<el-button type="button" @click="cancel">取消</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>

<script>
	export default {
		name:'ResumeAdd',
		components: {

		},
		props: ['selectDeceive', 'addOrEdit'],
		data() {
			return {
				PostData: {
					a1700: '', //序号（更新时必填 新增时为空）
					a0100: '', //人员编号（新增时必填 更新时为空）
					a1703: '', //起始时间
					a1701: '', //简历内容
					a1704: '', //截止时间
				},
				rules:{
					a1703:[{ required: true, message: '起始时间不能为空'}],
					a1701:[{ required: true, message: '内容不能为空'}]
				}
			}
		},
		mounted() {
			this.PostData.a1703 = this.commonFun.dateFormat(new Date(), "yyyyMMdd");
			this.PostData.a1704 = this.commonFun.dateFormat(new Date(), "yyyyMMdd");
			if(this.addOrEdit == 'edit') {
				this.PostData.a1700 = this.selectDeceive.a1700;
				this.PostData.a0100 = this.selectDeceive.a0100;
				this.PostData.a1703 = this.selectDeceive.a1703;
				this.PostData.a1701 = this.selectDeceive.a1701;
				this.PostData.a1704 = this.selectDeceive.a1704;
			}
		},
		methods: {
			onSubmit() {
				this.PostData.a0100 = this.selectDeceive.a0100;
				if(!!!this.PostData.a1703 || !!!this.PostData.a1701){
					this.$confirm('请填写必填项！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				this.$axios({
					method: 'post',
					url: this.API.saveOrUpdateA17,
					data:this.PostData
				}).then((res) => {
					if(res.data.code == "1") {
						this.$emit('backCall', true);
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
			cancel(){//取消
				this.$emit('backCall', true);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		border: none;
		width: 100%;
		box-sizing: border-box;
		margin: 0 auto;
		padding-top: 0;
		.form-el {
			width: 100%;
			.title {
				font-size: 20px;
				color: #0290f5;
				font-weight: bold;
				text-shadow: -1px 2px 1px #cccccc;
				line-height: 45px;
				padding-left: 40px;
			}
			.el-form-item {
				margin-bottom: 20px;
			}
			.btn {
				margin-top: 20px;
				display: flex;
				justify-content: space-between;
				margin-left: -150px;
			}
		}
	}
</style>