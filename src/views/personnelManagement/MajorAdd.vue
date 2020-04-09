<template>
	<div class="container">
		<el-form ref="PostData" :rules="rules" :model="PostData" label-width="150px" class="form-el">
			<el-row>
				<el-col :span="11">
					<el-form-item label="专业技术任职资格" prop="a0601">
						<ProfessionalQualificationsTreeSelect :chioceOptionId="PostData.a0601" @ProfessionalQualificationsTreeSelectCall="ProfessionalQualificationsTreeSelectCall"></ProfessionalQualificationsTreeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="取得资格日期" prop="a0604">
						<el-date-picker v-model="PostData.a0604" style="width:100%" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="取得资格途径" prop="a0607">
						<AccessToQualificationTreeSelect :chioceOptionId="PostData.a0607" @AccessToQualificationTreeSelectCall="AccessToQualificationTreeSelectCall"></AccessToQualificationTreeSelect>
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="评委会或考试名称" prop="a0611">
						<el-input v-model="PostData.a0611" type="text" maxlength='180'></el-input>
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="当前资格标识" prop="a0614">
						<el-select v-model="PostData.a0614" style="width:100%" clearable placeholder="请选择最高学位标识" @change="changeChioceId">
							<el-option v-for="item in isOrNotSelect" :key="item.code" :label="item.name" :value="item.code">
							</el-option>
						</el-select>
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
	import ProfessionalQualificationsTreeSelect from '../../components/ProfessionalQualificationsTreeSelect.vue';
	import AccessToQualificationTreeSelect from '../../components/AccessToQualificationTreeSelect.vue';
	
	export default {
		name:'MajorAdd',
		components: {
			ProfessionalQualificationsTreeSelect,//专业技术任职资格
			AccessToQualificationTreeSelect,//取得资格途径
		},
		props: ['selectDeceive','addOrEdit'],
		data() {
			return {
				PostData: {
					a0600: '', //序号（编辑必填，新增传空）
					a0100: '', //人员编号
					a0601: '', //专业技术任职资格
					a0607: '', //取得资格途径
					a0604: '', //取得资格日期
					a0611: '', //评委会或考试名称
					a0614: '', //当前专业技术任职资格标识
				},
				isOrNotSelect: [{
						code: '0',
						name: '否'
					},
					{
						code: '1',
						name: '是'
					}
				],
				rules:{
					a0601:[{ required: true, message: '专业技术任职资格不能为空'}],
					a0607:[{ required: true, message: '取得资格途径不能为空'}]
				}
			}
		},
		mounted() {
			this.PostData.a0100=this.selectDeceive.a0100;
			if(this.addOrEdit=='edit'){
				this.PostData = {...this.selectDeceive};
			}
		},
		methods: {
			onSubmit() {
				if(!!!this.PostData.a0601 || !!!this.PostData.a0607){
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
					url: this.API.saveOrUpdateA06,
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
			ProfessionalQualificationsTreeSelectCall(id) {
				this.PostData.a0601 = id;
			},
			AccessToQualificationTreeSelectCall(id){
				this.PostData.a0607 = id;
			},
			changeChioceId(id){
				this.PostData.a0614 = id;
			},
			cancel(){
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