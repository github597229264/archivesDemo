<template>
	<div class="container">
		<el-form ref="PostData" :rules="rules" :model="PostData" label-width="150px" class="form-el">
			<el-row>
				<el-col :span="11">
					<el-form-item label="学历" prop="a0801b">
						<EducationTreeSelect :chioceOptionId="PostData.a0801b" @EducationTreeSelectCall="EducationTreeSelectCall"></EducationTreeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="学制" prop="a0811">
						<EducationalSystemTreeSelect :chioceOptionId="PostData.a0811" @EducationalSystemTreeSelectCall="EducationalSystemTreeSelectCall"></EducationalSystemTreeSelect>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="入学日期" prop="a0804">
						<el-date-picker v-model="PostData.a0804" style="width:100%" type="date" placeholder="选择日期" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="毕业日期" prop="a0807">
						<el-date-picker v-model="PostData.a0807" style="width:100%" type="date" placeholder="选择日期" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="学校(单位)名称" prop="a0814">
						<el-input v-model="PostData.a0814" type="text" maxlength='75'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="学校(单位)所在政区" prop="jgszxzq">
						<el-row style="display: flex;">
							<input 
								type="text" 
								class="state-input" 
								@click="innerVisible = true" 
								v-model="PostData.jgszxzq"
								>
						</el-row>
						<el-dialog width="50%" height="500px" title="政区选择" :visible.sync="innerVisible" append-to-body>
							<RegionsTree @GetChioceFiles="getChioceFiles"></RegionsTree>
						</el-dialog>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="所学专业">
						<div class="MajorTreeSelect">
							<el-select class="major-select" v-model="PostData.a0824" clearable placeholder="请选择所学专业">
								<el-option v-for="item in dataList" :key="item.code" :label="item.name" :value="item.code">
								</el-option>
							</el-select>
						</div>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="专业类别" prop="a0827">
						<MajorCategoryTreeSelect :chioceOptionId="PostData.a0827" @MajorCategoryTreeSelectCall="MajorCategoryTreeSelectCall"></MajorCategoryTreeSelect>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="学习完成情况" prop="a0831">
						<StudyFinishStatusTreeSelect :chioceOptionId="PostData.a0831" @StudyFinishStatusTreeSelectCall="StudyFinishStatusTreeSelectCall"></StudyFinishStatusTreeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="最高学历标识" prop="a0834">
						<el-select v-model="PostData.a0834" style="width:100%" clearable placeholder="请选择最高学位标识" @change="changeChioceId">
							<el-option v-for="item in isOrNotSelect" :key="item.code" :label="item.name" :value="item.code">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="教育类别" prop="a0837">
						<EducationCategoryTreeSelect :chioceOptionId="PostData.a0837" @EducationCategoryTreeSelectCall="EducationCategoryTreeSelectCall"></EducationCategoryTreeSelect>
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
	import EducationTreeSelect from '../../components/EducationTreeSelect.vue';
	import EducationalSystemTreeSelect from '../../components/EducationalSystemTreeSelect.vue';
	import MajorTreeSelect from '../../components/MajorTreeSelect.vue';
	import MajorCategoryTreeSelect from '../../components/MajorCategoryTreeSelect.vue';
	import StudyFinishStatusTreeSelect from '../../components/StudyFinishStatusTreeSelect.vue';
	import EducationCategoryTreeSelect from '../../components/EducationCategoryTreeSelect.vue';
	import RegionsTree from '../../components/RegionsTree.vue';

	export default {
		name:'EducationAdd',
		components: {
			EducationTreeSelect, //学历
			EducationalSystemTreeSelect, //学制
			MajorTreeSelect, //所学专业
			MajorCategoryTreeSelect, //所学专业类别
			StudyFinishStatusTreeSelect, //学习完成情况
			EducationCategoryTreeSelect, //教育类别
			RegionsTree,//政区
		},
		props: ['selectDeceive', 'addOrEdit'],
		data() {
			return {
				innerVisible: false, //政区
				PostData: {
					a0800: '', //序号
					a0100: '', //人员编号
					a0801a: '', //学历名称
					a0801b: '', //学历代码
					a0807: '', //毕业日期
					a0804: '', //入学日期
					a0811: '', //学制
					a0814: '', //学校(单位)名称
					a0817: '', //学校(单位)所在政区
					a0824: '', //所学专业名称
					a0827: '', //所学专业类别
					a0831: '', //学习完成情况
					a0834: '', //最高学历标识
					a0837: '', //教育类别
				},
				majorCode: '',
				isOrNotSelect: [{
						code: '0',
						name: '否'
					},
					{
						code: '1',
						name: '是'
					}
				],
				rules: {
					a0801b: [{
						required: true,
						message: '学历不能为空'
					}],
					a0807: [{
						required: true,
						message: '毕业日期不能为空'
					}]
				},
				dataList: [], //所学专业的data
			}
		},
		mounted() {
			if(this.addOrEdit == 'edit') {
				this.getEdit();
			}
			this.getData();
		},
		methods: {
			onSubmit() {
				this.PostData.a0100 = this.selectDeceive.a0100;
				if(!!!this.PostData.a0801b || !!!this.PostData.a0807){
					this.$confirm('请填写必填项！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				};
				this.$axios({
					method: 'post',
					url: this.API.saveOrUpdateA08,
					data: this.PostData
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
			getData() {
				this.$axios({
					method: 'get',
					url: this.API.getSysCadreCodeDetailList,
					params: {
						code: this.API.constObj.CadreCodeDetailList[33].id //所学专业
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.dataList = resData.data;
						if(this.chioceOptionId && this.chioceOptionId.length > 0){
//                  		let returnObj = this.findObjById(this.chioceOptionId);
//		        			this.$emit('MajorTreeSelectCall',returnObj);
		        			this.chioceId = this.chioceOptionId;
                    		this.$emit('MajorTreeSelectCall', this.chioceId);
                    	}
					} else {
						this.$message({
							type: 'error',
							message: '获取失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getEdit(){//编辑回显
				this.$axios({
					method: 'get',
					url: this.API.editA08,
					params: {
						a0800: this.selectDeceive.a0800 //所学专业
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.PostData = resData.data;
					} else {
						this.$message({
							type: 'error',
							message: '获取失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			EducationTreeSelectCall(obj) {
				this.PostData.a0801a = obj.name;
				this.PostData.a0801b = obj.code;
			},
			EducationalSystemTreeSelectCall(id) {
				this.PostData.a0811 = id
			},
			MajorTreeSelectCall(id) {
				this.PostData.a0824 = id
			},
			MajorCategoryTreeSelectCall(id) {
				this.PostData.a0827 = id
			},
			StudyFinishStatusTreeSelectCall(id) {
				this.PostData.a0831 = id
			},
			changeChioceId(id) {
				this.PostData.a0834 = id
			},
			EducationCategoryTreeSelectCall(id) {
				this.PostData.a0837 = id
			},
			getChioceFiles(data) { //获取选中数组
				this.PostData.jgszxzq = data.name;
				this.PostData.a0817 = data.code;
				this.innerVisible = false;
			},
			cancel() { //取消
				this.$emit('backCall', true);
				this.PostData = {}
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
				.state-input{
					height:32px;
					border-radius: 4px;
					border: 1px solid #dcdfe6;
					color: #606266;
					outline: 0;
					padding: 0 15px;
					width:100%;
				}
				.major-select{
					width:100%;
				}
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