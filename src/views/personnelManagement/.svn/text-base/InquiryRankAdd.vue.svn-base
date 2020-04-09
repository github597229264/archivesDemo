<template>
	<div class="container">
		<el-form ref="PostData" :rules="rules" :model="PostData" label-width="150px" class="form-el">
			<el-row>
				<el-col :span="11">
					<el-form-item label="职级" prop="a0501b">
						<RankTreeSelect :chioceOptionId="PostData.a0501b" @RankTreeSelectCall="RankTreeSelectCall"></RankTreeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="批准文号" prop="a0511">
				    <el-input v-model="PostData.a0511" type="text" maxlength='40'></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="生效日期" prop="a0504">
						<el-date-picker v-model="PostData.a0504" style="width:100%" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="终止日期" prop="a0517">
						<el-date-picker v-model="PostData.a0517" style="width:100%" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="批准机关" prop="a0507b">
						<ApprovalAuthorityTreeSelect :chioceOptionId="PostData.a0507b" @ApprovalAuthorityTreeSelectCall="ApprovalAuthorityTreeSelectCall"></ApprovalAuthorityTreeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="现行标识" prop="a0524">
						<el-select v-model="PostData.a0524" style="width:100%" clearable placeholder="请选择现行标识" @change="changeChioceId">
							<el-option v-for="item in isOrNotSelect" :key="item.code" :label="item.name" :value="item.code">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="22">
					<el-form-item label="批准时所在单位及职务" prop="a0521" label-width='152px'>
						<el-input type="text" v-model="PostData.a0521" maxlength='100'></el-input>
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
	import RankTreeSelect from '../../components/RankTreeSelect.vue';	
	import ApprovalAuthorityTreeSelect from '../../components/ApprovalAuthorityTreeSelect.vue';	

	export default {
		name:'InquiryRankAdd',
		components: {
			RankTreeSelect,//职级
			ApprovalAuthorityTreeSelect,//批准机关
		},
		props: ['selectDeceive','addOrEdit'],
		data() {
			return {
				PostData: {
					a0500: '', //序号（更新时必填 新增时为空）
					a0100: '', //人员编号（新增时必填 更新时为空）
					a0501a: '', //职级名称
					a0501b: '', //职级代码
					a0511: '', //批准文号
					a0504: '', //生效日期
					a0517: '', //终止日期
					a0507a: '', //批准机关名
					a0507b: '', //批准机关代码
					a0524: '', //现行标识
					a0521: '', //职级批准时所在单位及职务					
				},
				isOrNotSelect: [{
						code: '0',
						name: '非现行'
					},
					{
						code: '1',
						name: '现行'
					}
				],
				rules:{
					a0501b:[{ required: true, message: '职级不能为空'}]
				}
			}
		},
		mounted() {
			if(this.addOrEdit=='edit'){
				this.PostData = {...this.selectDeceive};
			}
		},
		methods: {
			onSubmit() {
				this.PostData.a0100=this.selectDeceive.a0100;
				if(!!!this.PostData.a0501b){
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
					url: this.API.saveOrUpdateA05,
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
			RankTreeSelectCall(obj) {
				this.PostData.a0501a = obj.name;
				this.PostData.a0501b = obj.code;
			},
			ApprovalAuthorityTreeSelectCall(obj){
				this.PostData.a0507a = obj.name;
				this.PostData.a0507b = obj.code;
			},
			changeChioceId(id){
				this.PostData.a0524 = id
				
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