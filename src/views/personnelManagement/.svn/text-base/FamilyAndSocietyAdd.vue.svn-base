<template>
	<div class="container">
		<el-form ref="PostData" :rules="rules" :model="PostData" label-width="150px" class="form-el">
			<el-row>
				<el-col :span="11">
					<el-form-item label="姓名" prop="a3601">
						<el-input v-model="PostData.a3601" type="text" maxlength='20'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="出生年月" prop="a3607">
				    <el-date-picker v-model="PostData.a3607" style="width:100%" type="month" placeholder="选择出生年月" value-format="yyyyMM">
				    </el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="国籍" prop="a3617">
						<NationalityTreeSelect :chioceOptionId="PostData.a3617" @NationalityTreeSelectCall="NationalityTreeSelectCall"></NationalityTreeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="与该人关系" prop="a3604b">
						<RelationshipTreeSelect :chioceOptionId="PostData.a3604b" @RelationshipTreeSelectCall="RelationshipTreeSelectCall"></RelationshipTreeSelect>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="工作单位及职务" prop="a3611">
						<el-input v-model="PostData.a3611" type="text" maxlength='80'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="身份" prop="a3631">
						<IdentityTreeSelect :chioceOptionId="PostData.a3631" @IdentityTreeSelectCall="IdentityTreeSelectCall"></IdentityTreeSelect>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="民族" prop="a3621">
						<NationalTreeSelect :chioceOptionId="PostData.a3621" @NationalTreeSelectCall="NationalTreeSelectCall"></NationalTreeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="职级" prop="a3637">
						<RankTreeSelect :chioceOptionId="PostData.a3637" @RankTreeSelectCall="RankTreeSelectCall"></RankTreeSelect>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="学历" prop="a3624">
						<EducationTreeSelect :chioceOptionId="PostData.a3624" @EducationTreeSelectCall="EducationTreeSelectCall"></EducationTreeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="政治面貌" prop="a3627">
						<PoliticalOutlookTreeSelect :chioceOptionId="PostData.a3627" @PoliticalOutlookTreeSelectCall="PoliticalOutlookTreeSelectCall"></PoliticalOutlookTreeSelect>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="22">
					<el-form-item label="备注" prop="a3644">
						<el-input type="textarea" style="resize:none;" v-model="PostData.a3644" maxlength='780'></el-input>
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
	import NationalityTreeSelect from '../../components/NationalityTreeSelect.vue';
	import RelationshipTreeSelect from '../../components/RelationshipTreeSelect.vue';
	import IdentityTreeSelect from '../../components/IdentityTreeSelect.vue';
	import NationalTreeSelect from '../../components/NationalTreeSelect.vue';
	import RankTreeSelect from '../../components/RankTreeSelect.vue';
	import EducationTreeSelect from '../../components/EducationTreeSelect.vue';
	import PoliticalOutlookTreeSelect from '../../components/PoliticalOutlookTreeSelect.vue';


	export default {
		name:'FamilyAndSocietyAdd',
		components: {
			NationalityTreeSelect,//国籍
			RelationshipTreeSelect,//与该人关系
			IdentityTreeSelect,//身份
			NationalTreeSelect,//民族
			RankTreeSelect,//职级
			EducationTreeSelect,//学历
			PoliticalOutlookTreeSelect,//政治面貌
		},
		props: ['selectDeceive','addOrEdit'],
		data() {
			return {
				PostData: {
					a0100: '', //人员编号（新增必填，修改选填）
					a3601: '', //人员姓名
					a3604a: '', //人员与该人关系名称
					a3617: '', //人员国籍
					a3621: '', //人员民族
					a3624: '', //人员学历
					a3627: '', //人员政治面貌
					a3604b: '', //人员与该人关系代码
					a3607: '', //人员出生日期
					a3611: '', //人员工作单位及职务
					a3631: '', //人员身份
					a3637: '', //人员职级
					a3644: '', //人员备注
					a3600: '', //序号（更新必传，新增传空）
				},
				rules:{
					a3601:[{ required: true, message: '姓名不能为空'}],
					a3617:[{ required: true, message: '国籍不能为空'}],
					a3604b:[{ required: true, message: '与该人关系不能为空'}],
					a3621:[{ required: true, message: '民族不能为空'}],
					a3624:[{ required: true, message: '学历不能为空'}],
					a3627:[{ required: true, message: '政治面貌不能为空'}]
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
				if(!!!this.PostData.a3601 || !!!this.PostData.a3617 || !!!this.PostData.a3604a || !!!this.PostData.a3621 || !!!this.PostData.a3624 || !!!this.PostData.a3627){
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
					url: this.API.saveOrUpdateA36,
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
			NationalityTreeSelectCall(id) {
				this.PostData.a3617 = id
			},
			RelationshipTreeSelectCall(obj){
				this.PostData.a3604a = obj.name;
				this.PostData.a3604b = obj.code;
			},
			IdentityTreeSelectCall(id){
				this.PostData.a3631 = id
			},
			NationalTreeSelectCall(id){
				this.PostData.a3621 = id
			},
			RankTreeSelectCall(obj){
				this.PostData.a3637 = obj.code
			},
			EducationTreeSelectCall(obj){
				this.PostData.a3624 = obj.code
			},
			PoliticalOutlookTreeSelectCall(id){
				this.PostData.a3627 = id
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