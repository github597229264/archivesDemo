<template>
	<div class="container">
		<el-form ref="PostData" :rules="rules" :model="PostData" label-width="150px" class="form-el">
			<div class="title">任职情况</div>
			<el-row>
				<el-col :span="11">
					<el-form-item label="职务" prop="a0215b">
						<PostTreeSelect :chioceOptionId="PostData.a0215b" @PostTreeSelectCall="PostTreeSelectCall"></PostTreeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="任职日期" prop="a0243">
						<el-date-picker style="width:100%" v-model="PostData.a0243" type="date" placeholder="选择日期" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="任职文号" prop="a0245">
						<el-input v-model="PostData.a0245" type="text" maxlength='40'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="职务级别" prop="a0221">
						<RankTreeSelect :chioceOptionId="PostData.a0221" @RankTreeSelectCall="RankTreeSelectCall"></RankTreeSelect>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="职务类别" prop="a0219">
						<JobCategoryTreeSelect :chioceOptionId="PostData.a0219" @JobCategoryTreeSelectCall="JobCategoryTreeSelectCall"></JobCategoryTreeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="任职方式" prop="a0247">
						<WayOfServiceTreeSelect :chioceOptionId="PostData.a0247" @WayOfServiceTreeSelectCall="WayOfServiceTreeSelectCall"></WayOfServiceTreeSelect>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="任职机构名称" prop="a0201a">
						<el-input v-model="PostData.a0201a" type="text" maxlength='70'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="任职机构代码" prop="a0201b">
						<el-input v-model="PostData.a0201b" type="text" maxlength='70'></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="任职机构级别" prop="a0207">
						<InstitutionalLevelTreeSelect :chioceOptionId="PostData.a0207" @InstitutionalLevelTreeSelectCall="InstitutionalLevelTreeSelectCall"></InstitutionalLevelTreeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="任职机构所在政区" prop="jgszxzq">
						<el-row style="display: flex;">
							<input 
								type="text" 
								class="state-input" 
								@click="innerVisible = true" 
								v-model="PostData.jgszxzq"
								>
						</el-row>
						<el-dialog width="70%" height="500px" title="政区选择" :visible.sync="innerVisible" append-to-body>
							<RegionsTree @GetChioceFiles="getChioceFiles"></RegionsTree>
						</el-dialog>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="任职原因" prop="a0249">
						<ReasonsForServingTreeSelect :chioceOptionId="PostData.a0249" @ReasonsForServingTreeSelectCall="ReasonsForServingTreeSelectCall"></ReasonsForServingTreeSelect>
					</el-form-item>
				</el-col>
			</el-row>
			<div class="title">免职情况</div>
			<el-row>
				<el-col :span="11">
					<el-form-item label="免职文号" prop="a0267">
						<el-input v-model="PostData.a0267" type="text" maxlength='40'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="免职日期" prop="a0265">
						<el-date-picker style="width:100%" v-model="PostData.a0265" type="date" placeholder="选择日期" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="免职方式" prop="a0269">
						<RemovalFormTreeSelect :chioceOptionId="PostData.a0269" @RemovalFormTreeSelectCall="RemovalFormTreeSelectCall"></RemovalFormTreeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="免职原因" prop="a0271">
						<RemovalReasonsTreeSelect :chioceOptionId="PostData.a0271" @RemovalReasonsTreeSelectCall="RemovalReasonsTreeSelectCall"></RemovalReasonsTreeSelect>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item size="large" class="btn">
				<el-button type="primary" @click="onSubmit">保存</el-button>
				<el-button type="butttn" @click="cancel">取消</el-button>
			</el-form-item>
		</el-form>
	</div>

</template>

<script>
	import PostTreeSelect from '../../components/PostTreeSelect.vue';
	import RankTreeSelect from '../../components/RankTreeSelect.vue';
	import JobCategoryTreeSelect from '../../components/JobCategoryTreeSelect.vue';
	import WayOfServiceTreeSelect from '../../components/WayOfServiceTreeSelect.vue';
	import InstitutionalLevelTreeSelect from '../../components/InstitutionalLevelTreeSelect.vue';
	import ReasonsForServingTreeSelect from '../../components/ReasonsForServingTreeSelect.vue';
	import RemovalFormTreeSelect from '../../components/RemovalFormTreeSelect.vue';
	import RemovalReasonsTreeSelect from '../../components/RemovalReasonsTreeSelect.vue';
	import RegionsTree from '../../components/RegionsTree.vue';
	

	export default {
		name:'ExtendCompanyAdd',
		components: {
			PostTreeSelect, //职务
			RankTreeSelect, //职级
			JobCategoryTreeSelect, //职务类别
			WayOfServiceTreeSelect, //任职方式
			InstitutionalLevelTreeSelect, //任职机构级别
			ReasonsForServingTreeSelect, //任职原因
			RemovalFormTreeSelect, //免职方式
			RemovalReasonsTreeSelect, //免职原因
			RegionsTree,//政区
		},
		props: ['selectDeceive','addOrEdit'],
		data() {
			return {
				innerVisible: false, //政区
				PostData: {
					a0200:'',//序号
					a0100:'',//人员编号
					a0215a: '', //职务名称
					a0215b:'',//职务代码
					a0243: '', //任职日期
					a0245: '', //任职文号
					a0221: '', //职务级别
					a0219: '', //职务类别
					a0247: '', //任职方式
					a0201a: '', //任职机构名称
					a0201b: '', //任职机构代码
					a0207: '', //任职机构级别
					a0203: '', //任职机构所在政区
					a0249: '', //任职原因
					a0267: '', //免职文号
					a0265: '', //免职日期
					a0269: '', //免职方式
					a0271: '', //免职原因

				},
				rules:{
					a0215b:[{required: true, message: '职务不能为空'}],
					a0243:[{ required: true, message: '任职日期不能为空'}],
					a0201a:[{required: true, message: '任职机构名称不能为空'}],
					jgszxzq:[{ required: true, message: '任职机构所在政区不能为空'}]
				}
			}
		},
		created(){
			if(this.addOrEdit=='edit'){
				this.PostData = {...this.selectDeceive};
			}
		},
		mounted() {
			
		},
		methods: {
			onSubmit() {
				this.PostData.a0100=this.selectDeceive.a0100;
				if(!!!this.PostData.a0215b || !!!this.PostData.a0243 ||!!!this.PostData.a0201a || !!!this.PostData.jgszxzq){
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
					url: this.API.saveOrUpdateA02,
					data:this.PostData
				}).then((res) => {
					if(res.data.code == "1") {
						let resData = res.data;
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
			
			PostTreeSelectCall(obj) {
				this.PostData.a0215b = obj.code;
				this.PostData.a0215a = obj.name;
			},
			RankTreeSelectCall(obj) {
				this.PostData.a0221 = obj.code

			},
			JobCategoryTreeSelectCall(id) {
				this.PostData.a0219 = id

			},
			WayOfServiceTreeSelectCall(id) {
				this.PostData.a0247 = id

			},
			InstitutionalLevelTreeSelectCall(id) {
				this.PostData.a0207 = id

			},
			ReasonsForServingTreeSelectCall(id) {
				this.PostData.a0249 = id

			},
			RemovalFormTreeSelectCall(id) {
				this.PostData.a0269 = id

			},
			RemovalReasonsTreeSelectCall(id) {
				this.PostData.a0271 = id

			},
			getChioceFiles(data) { //获取选中数组
				this.PostData.jgszxzq = data.name;
				this.PostData.a0203 = data.code;
				this.innerVisible = false;
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
				.state-input{
					height:32px;
					border-radius: 4px;
					border: 1px solid #dcdfe6;
					color: #606266;
					outline: 0;
					padding: 0 15px;
					width:100%;
				}
			}
			.btn {
				margin-top: 20px;
				display: flex;
				justify-content: space-between;
				margin-right: 150px;
			}
		}
	}
</style>