<template>
	<div class="container">
		<el-form ref="PostData" :rules="rules" :model="PostData" label-width="150px" class="form-el">
			<el-row>
				<el-col :span="11">
					<el-form-item label="学位" prop="a0901b">
						<AcademicDegreeTreeSelect :chioceOptionId="PostData.a0901b" @AcademicDegreeTreeSelectCall="AcademicDegreeTreeSelectCall"></AcademicDegreeTreeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="最高学位标识" prop="a0914">
						<el-select v-model="PostData.a0914" style="width:100%" clearable placeholder="请选择最高学位标识" @change="changeChioceId">
							<el-option v-for="item in isOrNotSelect" :key="item.code" :label="item.name" :value="item.code">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="学位授予日期" prop="a0904">
						<el-date-picker v-model="PostData.a0904" style="width:100%" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="学位授予单位" prop="a0907">
						<el-input v-model="PostData.a0907" type="text" maxlength='55'></el-input>
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
	//import vPinyin from '../../common/vue-py.js';
	import AcademicDegreeTreeSelect from '../../components/AcademicDegreeTreeSelect.vue';

	export default {
		name:'DegreeAdd',
		components: {
			AcademicDegreeTreeSelect, //学位
		},
		props: ['selectDeceive','addOrEdit'],
		data() {
			return {
				PostData: {
					a0900:'',//序号（更新时为必填） 新增传空
					a0100: '', //人员编号
					a0901a: '', //学位名称
					a0901b: '', //学位代码
					a0904: '', //学位授予日期
					a0907: '', //学位授予单位
					a0914: '', //最高学位标识
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
					a0904:[{ required: true, message: '学位授予日期不能为空'}],
					a0907:[{ required: true, message: '学位授予单位不能为空'}]

				}
			}
		},
		mounted() {
			if(this.addOrEdit=='edit'){
				this.PostData = {...this.selectDeceive};
			}
			console.log(this.selectDeceive)
		},
		methods: {

			onSubmit() {
				this.PostData.a0100=this.selectDeceive.a0100;
				if(!!!this.PostData.a0904 || !!!this.PostData.a0907){
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
					url: this.API.saveOrUpdateA09,
					data:this.PostData
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data;
						this.PostData = {};
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
			AcademicDegreeTreeSelectCall(obj) {
				this.PostData.a0901a = obj.name;
				this.PostData.a0901b = obj.code;
			},
			changeChioceId(id){
				this.PostData.a0914 = id;
			},
			cancel(){
				this.PostData = {};
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
			.el-form-item {
				margin-bottom: 10px;
			}
			.btn {
				margin-top: 20px;
				display: flex;
				justify-content: space-between;
				margin-right:150px
			}
		}
	}
</style>