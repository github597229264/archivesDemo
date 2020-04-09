<template>
	<div class="archives-deal-back">
		<!--表单信息-->
		<el-form :rules="rules" ref="backArchives" :model="backArchives" label-width="110px">
			<el-col :span="24">
				<el-form-item label="原因：" prop="backcontent">
					<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="backArchives.backcontent"></el-input>
				</el-form-item>
			</el-col>
			</el-row>
		</el-form>
		<!--底部操作-->
		<div class="footer">
			<el-button type="primary" @click="back('backArchives')">确定</el-button>
			<el-button type="primary" @click="cancle">取消</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "ArchivesReceiveBackTo", //退回
		props: ['id'],
		data() {
			return {
				backArchives: {
					id: "", //id
					status: 4, //	3 已入库 4 退回
					backcontent: "" //退回原因
				},
				rules: {
					backcontent: [{ //请输入退回原因
						required: true,
						message: '请输入退回原因',
						trigger: 'change'
					}]
				}
			}
		},
		methods: {
			back(formName) {
				this.$refs[formName].validate((valid) => {
					if(!valid) {
						console.log('error submit!!');
						return false;
					}
					this.$axios({
						method: 'post',
						url: this.API.putstoreroomorsendbackbutton,
						data: {
							'id': this.id,
							'status': this.backArchives.status,
							'backcontent': this.backArchives.backcontent,
						}
					}).then((res) => {
						console.log("返回的数据=" + res);
						var resData = res.data;
						if(resData.code == "1") {
							this.$message({
								message: '退回成功！',
								type: 'success'
							});
							this.$emit("getback", "returnSucess");
						} else {
							this.$message({
								type: 'error',
								message: '退回数据失败，请刷新重试！'
							});
						}
					}).catch(function(err) {
						console.log("连接错误" + err);
					})
				})
			},
			cancle() {
				this.$emit("getback", "");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.archives-deal-back {
		.footer {
			text-align: center;
			margin-top: 10px;
		}
	}
</style>