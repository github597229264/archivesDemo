<template>
	<div class="archives-back-container">
		<!--表单信息-->
		<el-form :rules="rules" ref="selectDeceive" :model="selectDeceive" label-width="110px">
			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="审核人：" prop="e01z521">
						<el-input v-model="selectDeceive.e01z521"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="审核日期：" prop="e01z524">
						<el-date-picker v-model="selectDeceive.e01z524" type="date" placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="回执人：" prop="uCreator">
						<el-input v-model="selectDeceive.uCreator"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="回执日期：" prop="e01z531">
						<el-date-picker v-model="selectDeceive.e01z531" type="date" placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="23">
					<el-form-item label="拒绝原因：" prop="backcontent">
						<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="selectDeceive.backcontent"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!--底部操作-->
		<div class="footer">
			<el-button type="primary" @click="refusedArchives('selectDeceive')">确定</el-button>
			<el-button type="primary" @click="cancle">取消</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ArchivesReceiveBack', //档案接收中列表退回
		props: ['selectDeceive'],
		data() {
			return {
				rules: {
					e01z521: [{
						required: true,
						message: '请输入审核人',
						trigger: 'blur'
					}],
					uCreator: [{
						required: true,
						message: '请输入回执人',
						trigger: 'change'
					}],
					e01z524: [{
						required: true,
						message: '请选中审核日期',
						trigger: 'change'
					}],
					e01z531: [{
						required: true,
						message: '请选择回执日期',
						trigger: 'change'
					}],
					backcontent: [{
						required: true,
						message: '请输入回执原因',
						trigger: 'change'
					}]
				},
			}
		},
		methods: {
			refusedArchives(formName) {//档案接收中列表退回
				this.$refs[formName].validate((valid) => {
					if(!valid) {
						console.log('error submit!!');
						return false;
					}
					this.goBack();
				})
			},
			goBack() {//发送数据到服务器
				this.$axios({
					method: 'post',
					url: this.API.returnButton,
					data: {//	
						id: this.selectDeceive.id,
						e01z521: this.selectDeceive.e01z521,
						gobackperson: this.selectDeceive.uCreator,
						e01z524: this.commonFun.dateFormat(this.selectDeceive.e01z524,"yyyyMMdd"),
						e01z531: this.commonFun.dateFormat(this.selectDeceive.e01z531,"yyyyMMdd"),
						backcontent: this.selectDeceive.backcontent
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.$emit("getback", "success");
						this.$message({
							type: 'success',
							message: '退回成功！'
						});
					} else {
						this.$message({
							type: 'error',
							message: '退回失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("档案选择列表=" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			cancle() {
				this.$emit("getback", "");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.archives-back-container {
		.footer {
			text-align: center;
			margin-top: 10px;
		}
	}
</style>