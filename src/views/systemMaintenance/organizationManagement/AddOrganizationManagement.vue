<template>
	<div class="add-organization-management-container">
		<!--表单信息-->
		<el-form :rules="rules" ref="organizationForm" :model="organizationForm" label-width="110px">
			<el-row :gutter="24">
				<el-col :span="12">
					<el-form-item label="机构名称：" prop="b0001">
						<el-input v-model="organizationForm.b0001"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="机构编码：" prop="b0002">
						<el-input v-model="organizationForm.b0002"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="上级单位：" prop="b000">
						<organizationTreeSelect :defaultOptions="defaultOptions" :isShow="flag" @OrgTreeSelectCall="orgTreeSelectCall"></organizationTreeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="机构类型：" prop="type">
						<el-radio-group v-model="organizationForm.type" @change="changeRadioId">
							<el-radio v-for="item in radioList" :key="item.id" :label="item.id" :value="item.id">{{item.b0001}}</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<!--底部操作-->
		<div class="footer">
			<el-button type="primary" @click="save('organizationForm')">保存</el-button>
			<el-button type="danger" @click="cancle">取消</el-button>
		</div>
	</div>
</template>

<script>
	import organizationTreeSelect from '../../../components/OrganizationTreeSelect.vue';
	export default {
		name: "AddOrganizationManagement", //组织机构管理添加
		props: ['organizationSelected', 'type'], //编辑是传递过来的值,type 0 是虚拟机构、1是单位、2是部门
		components: {
			organizationTreeSelect
		},
		data() {
			return {
				defaultOptions: "", //组织机构树默认的显示
				flag: true, //不要初始值
				organizationForm: {
					b0001: "", //机构名称
					b0002: "", //机构编码
					b000: "", //上级单位
					departmentAllID: "", //机构id//机构默认选中项--必须是完整路径eg:['节点id'] 或 ['父节点id','子节点id']
					departmentID: '', //机构ID
					type: "", //机构类型（0：虚拟机构；1：单位；2：部门）
					b0000: "",
				},
				rules: {
					b0001: [{ //机构名称
						required: true,
						message: '请输入机构名称',
						trigger: 'change'
					},
					{
						min: 0,
						max: 25,
						message: '长度必须在0到50位字符之间',
						trigger: 'blur'
					}],
					b0002: [{ //机构编码
						required: true,
						message: '请输入机构编码',
						trigger: 'change'
					},
					{
						min: 0,
						max: 25,
						message: '长度必须在0到25位字符之间',
						trigger: 'blur'
					}],
					type: [{ //机构类型
						required: true,
						message: '请选择机构类型',
						trigger: 'change'
					}],
				},
				radioList: [{
						id: 0,
						b0001: "虚拟机构"
					},
					{
						id: 1,
						b0001: "单位"
					},
					{
						id: 2,
						b0001: "部门"
					},
				],
				isEdit: false, //true：编辑，false：添加
				name:"",//机构名称
			}
		},
		created() {
			console.log("--==")
			if(this.organizationSelected == "") return;
			this.isEdit = true;
			this.defaultOptions = this.organizationSelected.pId;
			this.b000 = this.organizationSelected.b000;
			this.organizationForm.type = this.type;
			this.organizationForm.b0000 = this.organizationSelected.id;
			this.organizationForm.b0001 = this.organizationSelected.name;
			this.organizationForm.b0002 = this.organizationSelected.code;
			this.organizationForm.b000 = this.organizationSelected.pId;

		},
		methods: {
			/*
			 * 职能机构树形下拉框组件回调方法--子组件回传数据的方法
			 * @param {String} val 选中项的值
			 */
			orgTreeSelectCall(val) {
				this.departmentAllID = val.id;
				this.departmentID = val.id;
				this.b000 = this.departmentID;
				this.defaultOptions = val.id;
				this.name = val.name;
			},
			changeRadioId(id) { //单选改变时
				this.organizationForm.type = id;
			},
			save(formb0001) { //保存数据
				this.$refs[formb0001].validate((valid) => {
					if(!valid) {
						console.log('error submit!!');
						return false;
					}
					if(this.name === this.organizationForm.b0001){
						this.$message("机构名称和上级单位名字不能一样，请重新输入！")
						return;
					}
					this.saveToNet();
				})
			},
			saveToNet() { //添加数据到服务器
				this.$axios({
					method: 'post',
					url: this.API.saveOrUpdateB00,
					data: {
						'b0001': this.organizationForm.b0001,
						'b0002': this.organizationForm.b0002,
						'b000': this.b000,
						'type': this.organizationForm.type,
						'b0000': this.organizationForm.b0000
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
							this.$emit("addback", "edit", false);
							return;
						}
						this.$message({
							message: '添加数据成功！',
							type: 'success'
						});
						this.$emit("addback", "", false);

					}else if(resData.code == "9"){
						if(this.isEdit) {
							this.$message({
								message: '父级机构不能移动到子集机构下，请重新选择上级单位！',
								type: 'warning'
							});
						}
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
			cancle() {
				this.$emit("addback", "", true);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add-organization-management-container {
		.footer {
			text-align: center;
			margin-top: 10px;
		}
	}
</style>