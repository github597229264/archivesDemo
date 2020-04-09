<template>
	<div class="container">
		<el-form ref="PostData" :rules="rules" :model="PostData" label-width="150px" class="form-el">
			
			<el-row>
				
				<el-col :span="11">
					<el-form-item label="机构" prop="b0000">
						<organizationTreeSelect 
							:defaultOptions="PostData.b0000" 							
							@OrgTreeSelectCall="organizationTreeSelectCall"
						></organizationTreeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="是否主要" prop="ismain">
						<el-select 
							v-model="PostData.ismain" 
							style="width:100%" 
							clearable 
							placeholder="请选择" 
							@change="changeChioceId"
						>
							<el-option 
								v-for="item in isOrNotSelect" 
								:key="item.code" 
								:label="item.name" 
								:value="''+item.code">
								{{item.name}}
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
	import organizationTreeSelect from '../../components/organizationTreeSelect.vue';

	
	export default {
		name:'PartTimeJobAdd',
		components: {
			organizationTreeSelect,//专业技术任职资格

		},
		props: ['selectDeceive','addOrEdit'],
		data() {
			return {
				defaultDepartmentID:'',//默认组织机构
				PostData: {
					id: '', //序号（编辑必填，新增传空）
					a0100: '', //人员编号
					b0000: '', //机构id
					ismain: '', //是否主要部门
				},
				departmentAllID:'',//机构id//机构默认选中项--必须是完整路径eg:['节点id'] 或 ['父节点id','子节点id']
				isOrNotSelect: [{
						code: 'true',
						name: '是'
					},
					{
						code: 'false',
						name: '否'
					}
				],
				rules:{
					b0000: [
			            { required: true, message: '请选择机构', trigger: 'blur' },
			        ],
				}
			}
		},
		mounted() {
			if(this.addOrEdit=='edit'){
				let { selectDeceive } = this;
				this.PostData.id = selectDeceive.id;
				this.PostData.b0000 = selectDeceive.b0000;
				this.PostData.ismain = ''+ selectDeceive.ismain;
			}
		},
		methods: {
			onSubmit() {
				this.PostData.a0100 = this.selectDeceive.a0100;
				if(!!!this.PostData.b0000){
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
					url: this.API.saveOrUpdateB01A01,
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
			 /*
	         * 职能机构树形下拉框组件回调方法--子组件回传数据的方法
	         * @param {Array} val 选中项的值
	         */
	        organizationTreeSelectCall(val){
	        	if(val){
//	        		this.departmentAllID = val;
//					this.defaultDepartmentID= val[val.length - 1];
					this.PostData.b0000=val.id;
	        	}else{
//	        		this.departmentAllID = "";
//	        		this.defaultDepartmentID = "";
	        	}
	        },
			changeChioceId(id) {
				this.PostData.ismain = id
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