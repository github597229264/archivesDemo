<template>
	<div class="approveAlert">
		<el-form :model="approvelForm" :rules="rules"   ref="approvelForm" label-width="80px">
		    <el-form-item label="审批结果"  prop="result">
		      <el-select v-model="approvelForm.result" placeholder="请选择审批结果" style="width: 100%;">
		        <el-option label="已通过" value="1"></el-option>
		        <el-option label="未通过" value="2"></el-option>
		      </el-select>
		    </el-form-item>
		    <el-form-item label="备注"   prop="reason">
		      <el-input type="textarea" v-model="approvelForm.reason" :autosize="{ minRows: 2, maxRows: 7}" maxLength="100" placeholder="请输入备注(100个字符以内)"></el-input>
		    </el-form-item>
	    </el-form>
	    <div slot="footer" class="dialog-footer" align="center">
		    <el-button @click="cancelBtn">取 消</el-button>
		    <el-button type="primary" @click="approvelRequest">确 定</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ApproveAlert', //审批弹框
		props:{
			applyId:{//申请单id
				type:String,
				required:true
			}
		},
		data() {
			return {
				approvelForm:{
					result:null,
					reason:""
				},
				rules:{
					result: [{
						required: true,
						message: '请选择审批结果',
						trigger: 'change'
					}],
					reason: [
						{
							required: false,
							message: '请输入审批备注',
							trigger: 'change'
						},
						{
							min: 0,
							max: 100,
							message: '长度必须在0到 100位字符之间',
							trigger: 'blur'
						}
					]
				}
			}
		},
		created() {
		},
		mounted() {
			
		},
		methods: {
			/**
			 * 确定授权
			 */
			approvelRequest(){
				let self = this;
				this.$refs["approvelForm"].validate((valid) => {
					if(valid) {
						this.setApprovel(self);
					}
				});
			},
			/**
			 * 取消操作
			 */
			cancelBtn(){
				this.$emit("ApproveAlertCall",false);
			},
			/*
			 * 请求后台进行授权处理
			 * @self {Obj} this对象
			 */
			setApprovel(self) {
				self.$axios({
                	loading:{
            			isShow:true,
            			target:'.approveAlert'
            		},
					method: 'post',
					url: self.API.approvaling,
					data: {
						id: self.applyId,
						result:self.approvelForm.result,
						reason:self.approvelForm.reason
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						self.approvelForm={
							result:null,
							reason:""
						};
						self.$message({
							type: 'success',
							message: '审批处理成功!'
						});
						self.$emit("ApproveAlertCall",true);
					} else {
						self.$message({
							type: 'error',
							message: '审批处理失败，请刷新重试！'
						});
					}
				}).catch((err) =>{
					self.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.approveAlert {
		width: 100%;
		font-size: 14px;
	}
</style>