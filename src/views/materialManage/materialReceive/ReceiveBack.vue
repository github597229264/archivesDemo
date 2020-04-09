<!--退回-->
<template>
	<div class="receive-back-container">
		退回原因：
		<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="msg"></el-input>
		<div class="opration">
			<el-button type="primary" @click="confirm">确认</el-button>
			<el-button type="danger" @click="cancle">取消</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				msg:""//退回原因
			}
		},
		methods:{
			confirm(){
				if(this.msg == ""){
					this.$message('请输入退回原因！');
					return;
				}
				this.$emit("backreceive",this.msg);
			},
			cancle(){
				this.$emit("backreceive","");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.receive-back-container{
		.el-textarea__inner{
			margin:10px 0;
		}
		.opration{
			text-align: center;
			margin-top: 10px;
		}
	}
</style>