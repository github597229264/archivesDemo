<template>
	<div class="archives-check-add-container">
		<!--表单信息-->
		<el-form :rules="rules" ref="archivesForm" :model="archivesForm" label-width="140px">
			<el-row :gutter="24">
				<el-col :span="24">
					<el-form-item label="档案人员：">
						<el-button type="primary" @click="innerVisible=true">档案选择</el-button>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="档案人员姓名：" prop="a0101">
						<el-input v-model="archivesForm.a0101" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="现职单位及职务：" prop="e10040">
						<el-input v-model="archivesForm.e10040"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="材料名称：" prop="e01z401a">
						<el-input v-model="archivesForm.e01z401a"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="材料代码：" prop="e01z401b">
						<el-input v-model="archivesForm.e01z401b"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="材料类型：" prop="e01z211">
						<materialTypeSelect :chioceOptionId='archivesForm.e01z211id' :isAll='true' :isType="false" @applyTypeCall="applyTypeCall"></materialTypeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="经办人：" prop="e01z411">
						<el-input v-model="archivesForm.e01z411"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="分数：" prop="e01z407">
						<el-input-number v-model="archivesForm.e01z407" controls-position="right" :min="1"></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="登记日期：" prop="e01z404">
						<el-date-picker v-model="archivesForm.e01z404" type="date" placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="材料形成单位：" prop="e01z0001">
						<el-input v-model="archivesForm.e01z0001"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="问题描述：" prop="e01z0002">
						<el-radio-group v-model="archivesForm.e01z0002" @change="changeRadioId">
							<el-radio v-for="item in radioList" :key="item.id" :label="item.id" :value="item.id">{{item.name}}</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="备注：" prop="e01z414">
						<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="archivesForm.e01z414"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!--操作按钮-->
		<div class="opration">
			<el-button type="primary" @click="save('archivesForm')">保存</el-button>
			<el-button type="danger" @click="cancle">取消</el-button>
		</div>
		<!--档案人员添加-->
		<el-dialog width="60%" height="500px" title="添加人员" :visible.sync="innerVisible" append-to-body>
			<fileSelection @GetChioceFiles="getChioceFiles" :isledger="true"></fileSelection>
		</el-dialog>
	</div>
</template>

<script>
	import fileSelection from '../../../components/FileSelection.vue';
	import materialTypeSelect from '../../../components/MaterialTypeSelect.vue';
	export default {
		name: "", //档案专项审核 档案查缺 添加
		components: {
			fileSelection,
			materialTypeSelect
		},
		props: ['selectCheck'],
		data() {
			return {
				archivesForm: { //form对象
					a0100: "", //干部id
					a0101: "", //干部名称
					e10040: "", //现职单位及职务
					e01z401a: "", //材料名称
					e01z401ab: "", //材料名称代码
					e01z211: "", //材料类号
					e01z404: "", //登记时间
					e01z407: "", //份数
					e01z411: "", //经办人
					e01z0001: "", //材料形成单位
					e01z0002: "1", //问题描述（1材料短缺、2手续不完备、3其他）
					e01z414: "", //备注
					e01z400: "", //当前对象id
				},
				rules: {
					a0101: [{ //档案人员
						required: true,
						message: '请选择档案人员',
						trigger: 'change'
					}],
					e10040: [{ //现职单位及职务
						required: true,
						message: '请输入现职单位及职务',
						trigger: 'change'
					},
					{
						min: 0,
						max: 100,
						message: '长度必须在0到 200位字符之间',
						trigger: 'blur'
					}],
					e01z401a: [{ //材料名称
						required: true,
						message: '请输入材料名称',
						trigger: 'change'
					},
					{
						min: 0,
						max: 20,
						message: '长度必须在0到 40位字符之间',
						trigger: 'blur'
					}],
					e01z401ab: [{ //材料名称代码
						required: true,
						message: '请输入材料名称代码',
						trigger: 'change'
					},
					{
						min: 0,
						max: 100,
						message: '长度必须在0到100位字符之间',
						trigger: 'blur'
					}],
					e01z211: [{ //材料类号
						required: true,
						message: '请输入材料类号',
						trigger: 'change'
					}, ],
					e01z404: [{ //登记时间
						required: true,
						message: '请选择登记时间',
						trigger: 'change'
					}],
					e01z407: [{ //份数
						required: true,
						message: '请输入份数',
						trigger: 'change'
					}],
					e01z411: [{ //经办人
						required: true,
						message: '请输入经办人',
						trigger: 'change'
					},
					{
						min: 0,
						max: 50,
						message: '长度必须在0到100位字符之间',
						trigger: 'blur'
					}],
					e01z0001: [{ //材料形成单位
						required: true,
						message: '请输入材料形成单位',
						trigger: 'change'
					},
					{
						min: 0,
						max: 100,
						message: '长度必须在0到200位字符之间',
						trigger: 'blur'
					}],
					e01z0002: [{ //问题描述
						required: true,
						message: '请选择问题描述',
						trigger: 'change'
					},
					{
						min: 0,
						max: 500,
						message: '长度必须在0到500位字符之间',
						trigger: 'blur'
					}],
				},
				innerVisible: false, //档案人员选择的选择框
				selectPerson: "", //选中的档案人员
				isEdit: false, //true编辑，false新增
				radioList: [{
						id: "1",
						name: "材料短缺"
					},
					{
						id: "2",
						name: "手续不完备"
					},
					{
						id: "3",
						name: "其他"
					},

				]
			}
		},
		created() {
			this.archivesForm.e01z404 = new Date();
			if(this.selectCheck != "") {
				this.isEdit = true;
				this.archivesForm = this.selectCheck;
			}
		},
		methods: {
			changeRadioId(id) { //单选改变时
				this.archivesForm.e01z0002 = id;
			},
			applyTypeCall(id) { //材料类型下拉框组件回调方法--子组件回调数据的方法
				this.archivesForm.e01z211 = id;
				console.log("archivesForm.e01z211" + this.archivesForm.e01z211)
			},
			getChioceFiles(data) { //档案选择返回数据
				console.log("===");
				this.innerVisible = false;
				this.selectPerson = data;
				//更新当前档案人员信息
				this.archivesForm.a0101 = data[0].a0101;
				this.archivesForm.e10040 = data[0].e10040;
				this.archivesForm.a0100 = data[0].a0100;
			},
			save(formName) { //保存数据
				this.$refs[formName].validate((valid) => {
					if(!valid) {
						console.log('error submit!!');
						return false;
					}
					console.log("this.selectPerson" + this.selectPerson);
					if(!this.isEdit) {
						if(this.selectPerson == "") {
							this.$message({
								message: '请添加档案人员！',
								type: 'success'
							});
							return;
						}
					}
					this.addCheckToNet();
				})
			},
			addCheckToNet() {
				this.$axios({
					method: 'post',
					url: this.API.saveorupdataFileCheckMissing,
					data: {
						'a0100': this.archivesForm.a0100,
						'a0101': this.archivesForm.a0101,
						'e10040': this.archivesForm.e10040,
						'e01z401a': this.archivesForm.e01z401a,
						'e01z401b': this.archivesForm.e01z401b,
						'e01z211': this.archivesForm.e01z211,
						'e01z404': this.commonFun.dateFormat(this.archivesForm.e01z404,"yyyyMMdd"),
						'e01z407': this.archivesForm.e01z407,
						'e01z411': this.archivesForm.e01z411,
						'e01z0001': this.archivesForm.e01z0001,
						'e01z0002': this.archivesForm.e01z0002,
						'e01z414': this.archivesForm.e01z414,
						'e01z400': this.archivesForm.e01z400,

					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						if(this.isEdit) {
							this.$message({
								message: '编辑数据成功！',
								type: 'success'
							});
							this.$emit("addback", "edit", "success");
							return;
						}
						this.$message({
							message: '添加数据成功！',
							type: 'success'
						});
						this.$emit("addback", "", "success");

					} else {
						this.$message({
							type: 'error',
							message: '操作失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			},
			cancle() { //取消
				if(this.isEdit) this.$emit("addback", "edit");
				else this.$emit("addback", "");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.archives-check-add-container {
		.opration {
			text-align: center;
		}
	}
</style>