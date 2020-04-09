<template>
	<el-container class="checkReadFile">
		<el-header height="30%">
			<span>{{areaOrganization}}</span>
		</el-header>
		<el-main>
			<el-row :gutter="20" type="flex" justify="center" align="center">
				<el-form :model="submitForm" status-icon :rules="rules" ref="submitForm" label-width="100px" class="demo-submitForm">
					<el-form-item label="身份证" prop="idNumber">
						<el-input v-model="submitForm.idNumber" placeholder="请输入身份证号"></el-input>
					</el-form-item>
					<el-form-item label="查询码" prop="queryCode">
						<el-input v-model="submitForm.queryCode" placeholder="请输入四位查询码"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="subForm('submitForm')">查询</el-button>
						<el-button @click="goBackPage">返回</el-button>
					</el-form-item>
				</el-form>
			</el-row>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		name: 'CheckReadFile', //查看档案验证
		data() {
			let self = this;
			return {
				areaOrganization: this.API.constObj.areaName,
				submitForm: {
					idNumber: '',
					queryCode: '' //查询码
				},
				queryData:{},//查询返回的数据
				rules: {
					idNumber: [{
							required: true,
							message: '请输入身份证号',
							trigger: 'blur'
						},
						{
							validator:function(rule,value,callback){
					            if(self.commonFun.checkIdCard(value) == false){
					                callback(new Error("身份证号无效!"));
					            }else{
					                callback();
					            }
					        }, 
					    	trigger: 'blur'
					    }
					],
					queryCode: [{
							required: true,
							message: '请输入查询码',
							trigger: 'blur'
						},
						{
							min: 4,
							max: 4,
							message: '查询码必须是4位的字符',
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
		computed: {

		},
		methods: {
			/**
			 * 返回上一页
			 */
			goBackPage() {
				this.$router.push({
					path: "applyMain"
				});
			},
			subForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.getData();
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			getData() {
				var self = this;
				self.$axios({
                	loading:{
            			isShow:true,
            			target:'.checkReadFile'
            		},
					method: 'get',
					url: this.API.consult,
					params: self.submitForm
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						self.queryData = resData.data;
		            	let storeObject = {
		            		name:this.API.constObj.applyInfo,
		            		storeInfo:resData.data
		            	};
						this.$store.commit('saveStoreByName',storeObject);
						self.$router.push({//页面跳转到查看档案
							name: "outsideReadingFile"
						});
					} else {
						self.$message({
							type: 'error',
							message: '查询失败：身份证或查询码错误，请检查！'
						});
					}
				}).catch((err) => {
					console.log("查看档案=" + err);
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
	.checkReadFile {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		.el-header {
			display: flex;
			align-items: center;
			text-align: center;
			justify-content: center;
			position: relative;
			span {
				font-size: 80px;
				color: #303133;
			}
		}
		.el-main {}
	}
</style>