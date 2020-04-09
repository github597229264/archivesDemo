<template>
	<div class="add-material-collection-container">
		<!--表单信息-->
		<el-form :rules="rules" ref="addMaterialCollection" :model="materialCollectionForm" label-width="110px">
			<el-row :gutter="24">
				<el-col :span="24">
					<el-form-item label="接收单位" prop="receiveareacode">
						<areaTreeSelect class="areaTree" v-model="materialCollectionForm.receiveareacode" :defaultOptions="defaultOptions" @areaTreeSelectCall="getSelect" :title="title" readonly>
						</areaTreeSelect>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="标题" prop="title">
						<el-input v-model="materialCollectionForm.title"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row :gutter='24'>
				<el-col :span="24">
					<el-form-item label="催收内容" prop="content">
						<el-input v-model="materialCollectionForm.content" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="footer">
			<el-button type="primary" @click="save('addMaterialCollection')">发送</el-button>
			<el-button type="danger" @click="cancle">取消</el-button>
		</div>
	</div>
</template>

<script>
	import areaTreeSelect from '../../../components/AreaTreeSelect.vue';
	
	export default{
		name:"AddMaterialCollection",//材料催收--添加
		components: {
			areaTreeSelect
		},
		props:['isArchivesCollection'],
		data(){
			return{
				defaultOptions:"",//机构默认为空
				materialCollectionForm:{
					receiveareacode:"",//接收单位区域编码 30
					title:"",//标题 200
					content:"",//催收内容 1000
				},
				rules: {
					receiveareacode: [{//接收单位区域编码 30
						required: true,
						message: '请选择接收单位',
						trigger: 'blur'
					}],
					title: [{//标题 200
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					},
					{
						min: 0,
						max: 66,
						message: '长度必须在0到200位字符之间',
						trigger: 'blur'
					}],
					content: [{//催收内容 1000
						required: true,
						message: '请输入催收内容',
						trigger: 'blur'
					},
					{
						min: 0,
						max: 333,
						message: '长度必须在0到1000位字符之间',
						trigger: 'blur'
					}],
				}
			}
		},
		created(){
			if(this.isArchivesCollection === undefined) this.isArchivesCollection = false;
		},
		methods:{
        	 getSelect(returnObj){//区域机构树形下拉框组件回调方法--子组件回传数据的方法 returnObj 选中的数据对象
		        if(returnObj)this.materialCollectionForm.receiveareacode = returnObj.code;
		        console.log(this.materialCollectionForm.receiveareacode);
        	 },
        	 save(formName){//保存
        	 	this.$refs[formName].validate((valid) => {
					if(!valid) {
						console.log('error submit!!');
						return false;
					}
					let uAreacode = JSON.parse(localStorage.getItem(this.API.constObj.loginInfo)).uAreacode;
					if(this.materialCollectionForm.receiveareacode === uAreacode){
						this.$confirm('不能对本单位进行催收，请选择正确单位！', '提示', {
							confirmButtonText: '确定',
							showCancelButton: false,
							type: 'warning',
							center: true
						});
						return;
					}
					this.saveForNet();
				})
        	 },
        	 saveForNet(){//保存到服务器
        	 	let url = "";
        	 	if(this.isArchivesCollection) url = this.API.addfileOnlinePretrial;
        	 	else url = this.API.addMaterialCollection;
        	 	this.$axios({
					method: 'post',
					url: url,
					data: {
						'receiveareacode': this.materialCollectionForm.receiveareacode,
						'title': this.materialCollectionForm.title,
						'content': this.materialCollectionForm.content
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1"){
						this.$message.success( '添加数据成功！');
						this.resetForm();//重置表单
						if(this.isArchivesCollection) this.$emit('backAddMC','success');
						else this.$emit('backAdd','success');
					}
					else this.$message.error( '添加数据失败，请刷新重试！');
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
        	 },
        	 cancle(){//取消
        	 	this.resetForm();//重置表单
        	 	if(this.isArchivesCollection) this.$emit('backAddMC','');
				else this.$emit('backAdd','');
        	 },
			resetForm(){//重置表单
//				this.materialCollectionForm.receiveareacode = "";
//				this.materialCollectionForm.title = "";
//				this.materialCollectionForm.content = "";
				this.$refs['addMaterialCollection'].resetFields();
			},
		}
	}
</script>

<style lang="scss" scoped>
.add-material-collection-container {
		.footer {
			text-align: center;
			margin-top: 5px;
		}
	}
</style>