<template>
	<div class="archives-finishing-add">
		<el-button type="primary" @click="innerVisible=true">档案选择</el-button>
		<!--表单信息-->
		<el-form :rules="rules" ref="archivesForm" :model="archivesForm" label-width="110px">
			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="档案人员：" prop="a0101">
						<el-input v-model="archivesForm.a0101" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="整理日期：" prop="e01z601">
						<el-date-picker v-model="archivesForm.e01z601" type="date" placeholder="选择日期"  format="yyyy-MM-dd" value-format="yyyyMMdd">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="审核人：" prop="e01z614">
						<el-input v-model="archivesForm.e01z614"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="整理人：" prop="e01z611">
						<el-input v-model="archivesForm.e01z611"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="副本数：" prop="e01z607">
						<el-input-number v-model="archivesForm.e01z607" controls-position="right" :min="1"></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="正本数：" prop="e01z604">
						<el-input-number v-model="archivesForm.e01z604" controls-position="right" :min="1"></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="备注：" prop="e01z617">
						<el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="archivesForm.e01z617"></el-input>
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
			<fileSelection :source="source" @GetChioceFiles="getChioceFiles" :isledger="true"></fileSelection>
		</el-dialog>
	</div>
</template>

<script>
	import fileSelection from '../../../components/FileSelection.vue';
	export default {
		name: "ArchivesFinishingAdd", //档案整理 添加
		components: {
			fileSelection
		},
		props: ['selectFinishing'],
		data() {
			return {
				source: "0", //从档案专项审核添加进入
				archivesForm: {
					a0101: "", //档案人员
					e01z601: "", //整理日期
					e01z604: "", //正本数
					e01z607: "", //副本数
					e01z611: "", //整理人
					e01z614: "", //审核人
					e01z617: "", //备注
					e01z600: "" //id
				},
				rules: {
					a0101: [{ //档案人员
						required: true,
						message: '请选择档案人员',
						trigger: 'change'
					}],
					e01z601: [{ //整理日期
						required: true,
						message: '请选择整理日期',
						trigger: 'change'
					}],
					e01z604: [{ //正本数
						required: true,
						message: '请输入正本数',
						trigger: 'change'
					}, ],
					e01z607: [{ //副本数
						required: true,
						message: '请输入副本数',
						trigger: 'change'
					}, ],
					e01z611: [{ //整理人
						required: true,
						message: '请输入整理人',
						trigger: 'change'
					},
					{
						min: 0,
						max: 10,
						message: '长度必须在0到 20位字符之间',
						trigger: 'blur'
					}],
					e01z614: [{ //审核人
						required: true,
						message: '请输入审核人',
						trigger: 'change'
					},
					{
						min: 0,
						max: 10,
						message: '长度必须在0到 20位字符之间',
						trigger: 'blur'
					}],
					e01z617: [//备注 400字符
					{
						min: 0,
						max: 200,
						message: '长度必须在0到 400位字符之间',
						trigger: 'blur'
					}],
				},
				isledger: true, //只选中一个档案人员
				selectPerson: "", //人员的选择
				innerVisible: false, //档案人员对话框是否显示
				isEdit: false //true编辑，false新增
			}
		},
		created() {
			this.archivesForm.e01z601 = new Date();
			if(this.selectFinishing != "") {
				this.archivesForm = this.selectFinishing;
				this.isEdit = true;
			} else this.archivesForm.e01z600 = "";
		},
		methods: {
			getChioceFiles(data) { //档案选择返回数据
				console.log("===");
				this.innerVisible = false;
				this.selectPerson = data;
				//更新当前档案人员信息
				this.archivesForm.a0101 = data[0].a0101;
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
					this.addArchivesToNet();
				})

			},
			addArchivesToNet() { //添加到服务器
				this.$axios({
					method: 'post',
					url: this.API.saveorupdataFileClearUp,
					data: {
						'a0100': this.archivesForm.a0100,
						//						'a0101': this.archivesForm.a0101,
						'e01z601': this.commonFun.dateFormat(this.archivesForm.e01z601,"yyyyMMdd"),
						'e01z604': this.archivesForm.e01z604,
						'e01z607': this.archivesForm.e01z607,
						'e01z611': this.archivesForm.e01z611,
						'e01z614': this.archivesForm.e01z614,
						'e01z617': this.archivesForm.e01z617,
						'e01z600': this.archivesForm.e01z600

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
	.archives-finishing-add {
		.el-button {
			margin-bottom: 10px;
		}
		.opration {
			margin-top: 10px;
			text-align: center;
		}
	}
</style>