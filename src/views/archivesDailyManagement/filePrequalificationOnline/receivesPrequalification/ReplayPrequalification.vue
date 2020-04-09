<template>
	<div class="replay-prequalification-container">
		<el-form ref="form" :rules="rules" :model="form" label-width="70px">
			<el-row :gutter='24'>
				<el-col :span="24">
					<el-form-item label="内容：" prop="backcontent">
						<el-input type="textarea" :autosize="{ minRows: 5, maxRows:10}" v-model="form.backcontent"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="replay-oppration">
			<el-button type="primary" @click="save('form')">确认</el-button>
			<el-button type="danger" @click="cancleReplay">取消</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		name:"ReplayPrequalification",//
		props:['id'],
		data(){
			return{
				form:{
					backcontent:"",//反馈内容
				},
				rules: {
					backcontent: [{
						required: true,
						message: '请输入反馈内容',
						trigger: 'blur'
					},{
						min: 0,
						max: 333,
						message: '长度必须在0到 1000位字符之间',
						trigger: 'blur'
					}]
				}
			}
		},
		methods:{
			save(formName){//保存数据
				this.$refs[formName].validate((valid) => {
					if(!valid) {
						console.log('error submit!!');
						return false;
					}
					this.saveReplay();
				})
			},
			saveReplay(){//确认
				this.$axios({
						method: 'post',
						url: this.API.recivebackfun,
						data: {
							id: this.id,
							backcontent:this.backcontent
						}
					}).then((res) => {
						console.log("返回的数据=" + res);
						var resData = res.data;
						if(resData.code == "1") {
							this.$confirm('已回复', '提示', {
								confirmButtonText: '确定',
								showCancelButton: false,
								type: 'warning',
								center: true
							}).then(() => {
								this.$emit('backReplayPre', "success");
							});
						} else this.$message.error('添加数据失败，请刷新重试！');
					}).catch(function(err) {
						console.log("连接错误" + err);
					})
			},
			cancleReplay(){//取消
				this.$emit('backReplayPre');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.replay-prequalification-container{
		.replay-oppration{
			display: flex;
			justify-content: center;
		}
	}
</style>