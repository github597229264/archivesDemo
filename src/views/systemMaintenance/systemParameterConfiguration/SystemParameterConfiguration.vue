<template>
	<el-container class="system-parameter-configuration-container">
		<el-header class="my-header" style="height: 45px;">系统参数配置</el-header>
		<el-main>
			<!--是否启用三元-->
			<div class="whether-enable-ternary">
				<el-form :rules="rules" ref="selectReceive"  style="width:60%;text-align:center" :model="selectReceive" label-width="110px">
					<el-row :gutter="24">
						<el-col :span="24">
							<el-form-item label="是否启用三元：" prop="e01z204a">
								<el-radio v-model="radio" label="yes">是</el-radio>
							 	<el-radio v-model="radio" label="no">否</el-radio>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<div class="whether-enable-ternary-right">
					<el-button type='primary' @click='sava'>保存</el-button>
				</div>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		name: "SystemParameterConfiguration", //系统参数配置
		data(){
			return{
				radio: 'yes',//是否启用三元
				tripartiteEnableId:"",//是否启用三元的id
			}
		},
		created(){
			this.findSystemSettingsList();
		},
		methods:{
			findSystemSettingsList(){//系统参数配置列表
				this.$axios({
					loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.system-parameter-configuration-container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},
					method: 'get',
					url: this.API.findSystemSettingsList,
					params: {
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						resData.data.forEach(item=>{
							if(item.code == 'TripartiteEnable'){
								this.tripartiteEnableId = item.id;
								this.radio = item.value;
							} 
						})
					} else {
						this.$message({
							type: 'error',
							message: '查询组织机构管理失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("查询组织机构管理" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			sava(){//保存对三元的设置
				this.$axios({
					loading:{
            			isShow:true,//是否显示loading遮罩层
            			target:'.system-parameter-configuration-container'//loading遮罩层 添加的dom选择器名称 如：.login or #center
            		},
					method: 'get',
					url: this.API.isEnabledSanYuan,
					params: {
						id:this.tripartiteEnableId,
						value:this.radio
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.$confirm('操作三元成功！', '提示', {
							confirmButtonText: '确定',
							showCancelButton: false,
							type: 'warning',
							center: true
						}).then(() => {
						});
					} else {
						this.$message({
							type: 'error',
							message: '操作三元失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("操作三元" + err);
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
	.system-parameter-configuration-container {
		height: 100%;
		.my-header {
			padding-top: 15px;
		}
		.el-main {
			background-color: #fff;
			height: 100%;
			.whether-enable-ternary{
				display:flex;
				.el-form{
					width: 400px;
				}
				.whether-enable-ternary-right{
					width: 39%;
				}
			}
		}
	}
</style>