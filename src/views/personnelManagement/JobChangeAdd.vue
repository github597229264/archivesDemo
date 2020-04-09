<template>
	<div class="container">
		<el-form ref="PostData" :rules="rules" :model="PostData" label-width="150px" class="form-el">
			<el-row>
				<el-col :span="11">
					<el-form-item label="原单位名称" prop="a5201a">
						<el-input v-model="PostData.a5201a" type="text" maxlength='80'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="变动日期" prop="a5227">
						<el-date-picker v-model="PostData.a5227" style="width:100%" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="原单位代码" prop="a5201b">
						<el-input v-model="PostData.a5201b" type="text" maxlength='20'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="新单位名称" prop="a5204a">
						<el-input v-model="PostData.a5204a" type="text" maxlength='80'></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="新单位代码" prop="a5204b">
						<el-input v-model="PostData.a5204b" type="text" maxlength='20'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="原职务名称" prop="a5207a">
						<el-input v-model="PostData.a5207a" type="text" maxlength='50'></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="新职务名称" prop="a5211a">
						<el-input v-model="PostData.a5211a" type="text" maxlength='50'></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="原职务级别" prop="a5214">
						<RankTreeSelect :chioceOptionId="PostData.a5214" @RankTreeSelectCall="oldRankTCall"></RankTreeSelect>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="新职务级别" prop="a5217">
						<RankTreeSelect :chioceOptionId="PostData.a5217" @RankTreeSelectCall="newRankCall"></RankTreeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="原职务类别" prop="a5221">
						<JobCategoryTreeSelect :chioceOptionId="PostData.a5221" @JobCategoryTreeSelectCall="oldJobCategorytCall"></JobCategoryTreeSelect>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="新职务类别" prop="a5224">
						<JobCategoryTreeSelect :chioceOptionId="PostData.a5224" @JobCategoryTreeSelectCall="newJobCategoryCall"></JobCategoryTreeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="11">
					<el-form-item label="变动类别" prop="a5231">
						<ReasonsForServingTreeSelect :chioceOptionId="PostData.a5231" @ReasonsForServingTreeSelectCall="ReasonsForServingTreeSelectCall"></ReasonsForServingTreeSelect>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="11">
					<el-form-item label="职务升降标识" prop="a5234">
						<el-select v-model="''+PostData.a5234" clearable placeholder="请选择职务升降标识" @change="upDownchangeId">
							<el-option v-for="item in isOrNotSelect" :key="item.code" :label="item.name" :value="item.code">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="11">
				<el-form-item label="是否达到任职年限标识" prop="a5237" label-width='152px'>
						<el-select v-model="''+PostData.a5237" clearable placeholder="请选择职务升降标识" @change="limitchangeId">
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
	import RankTreeSelect from '../../components/RankTreeSelect.vue';
	import JobCategoryTreeSelect from '../../components/JobCategoryTreeSelect.vue';
	import ReasonsForServingTreeSelect from '../../components/ReasonsForServingTreeSelect.vue';
	

	export default {
		name:'JobChangeAdd',
		components: {
			RankTreeSelect,//职务级别
			JobCategoryTreeSelect,//职务类别
			ReasonsForServingTreeSelect,//变动类别
		},
		props: ['selectDeceive','addOrEdit'],
		data() {
			return {
				PostData: {
					a5200: '', //序号（更新时必填 新增时为空）
					a0100: '', //人员编号（新增时必填 更新时为空）
					a5201a: '', //原单位名称
					a5211a: '', //新职务名称
					a5234: '', //职务升降标识
					a5201b: '', //原单位代码
					a5204a: '', //新单位名称
					a5204b: '', //新单位代码
					a5207a: '', //原职务名称
					a5207b: '', //原职务代码
					a5214: '', //原职务级别
					a5217: '', //新职务级别
					a5221: '', //原职务类别
					a5224: '', //新职务类别
					a5231: '', //变动类别
					a5227: '', //变动日期
					a5237: '', //是否达到任职年限标识

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
					a5201a:[{ required: true, message: '原单位名称不能为空'}],
					a5211a:[{ required: true, message: '新职务名称不能为空'}],
					a5234:[{ required: true, message: '职务升降标识不能为空'}]
				}
			}
		},
		mounted() {
			if(this.addOrEdit=='edit'){
				this.PostData = {...this.selectDeceive};
				console.log(this.PostData)
			}
		},
		methods: {
			onSubmit() {
				this.PostData.a0100 =this.selectDeceive.a0100;
				if(!!!this.PostData.a5201a || !!!this.PostData.a5211a || !!!this.PostData.a5234){
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
					url: this.API.saveOrUpdateA52,
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
			oldRankTCall(obj){
				this.PostData.a5214 = obj.code
			},
			newRankCall(obj){
				this.PostData.a5217 = obj.code
			},
			ReasonsForServingTreeSelectCall(id){
				this.PostData.a5231 = id
			},
			oldJobCategorytCall(id){
				this.PostData.a5221=id
			},
			newJobCategoryCall(id){
				this.PostData.a5224=id
			},
			upDownchangeId(id){
				this.PostData.a5234=id
			},
			limitchangeId(id){
				this.PostData.a5237=id
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