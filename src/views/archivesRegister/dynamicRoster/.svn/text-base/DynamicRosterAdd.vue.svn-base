<template>
	<div class='dynamicRosterAdd'>
		<el-form ref="form" :model="form" :rules="rules" label-width="80px">
			<el-form-item label="名册名称" label-width='120px' prop="title">
				<el-input v-model="form.title" class="inp" maxlength='80'></el-input>
			</el-form-item>
			<el-form-item label="简要说明" label-width='120px'>
				<el-input type="textarea" maxlength='200' v-model="form.comments" class="inp"></el-input>
			</el-form-item>
			<div class="form-title">自定义查询条件</div>
			<div class="form-main">
				<el-form-item label="性别" label-width='120px'>
					<el-checkbox-group v-model="form.content.a0104b">
						<el-checkbox key='1' label="1">男</el-checkbox>
						<el-checkbox key='2' label="2">女</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="籍贯" label-width='120px'>
					<el-input v-model="form.content.a0111a" maxlength='50'></el-input>
				</el-form-item>
				<el-form-item label="出生地" label-width='120px'>
					<el-input v-model="form.content.a0114a" maxlength='50'></el-input>
				</el-form-item>
				<el-form-item label="档案状态" prop='data311AFB4B' label-width='120px'>
					<el-checkbox-group v-model="form.content.e10statusb">
						<el-checkbox v-for='(item,index) in data311AFB4B' :label="item.code" :key='index'>{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="人员类别" prop='data44B625FE' label-width='120px'>
					<el-checkbox-group v-model="form.content.a01statusb">
						<el-checkbox v-for='(item,index) in data44B625FE' :label="item.code" :key='index' name='type'>{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label=" 工作单位及职务" label-width='120px'>
					<el-input v-model="form.content.e10040" maxlength='200'></el-input>
				</el-form-item>
				<el-form-item label="职务职级" prop='dataCDE75543' label-width='120px'>
					<el-checkbox-group v-model="form.content.a0501b">
						<el-checkbox v-for='(item,index) in dataCDE75543' :label="item.code" :key='index'>{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="政治面貌" prop='data37B05E7C' label-width='120px'>
					<el-checkbox-group v-model="form.content.a0141b">
						<el-checkbox v-for='(item,index) in data37B05E7C' :label="item.code" :key='index'>{{item.name}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
			</div>
			<el-form-item class="button">
				<el-button type="primary" @click="onSubmit">保存</el-button>
				<el-button type="primary" @click="cancel">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import Pagination from '../../../components/Pagination.vue';

	export default {
		name: 'dynamicRosterAdd',
		components: {

		},
		props:['selectOptionObj','fromAddOrEdit','allObj'],
		data() {
			return {
				form: {
					title: '',//名册名称
					comments: '',//简要说明
					content:{//内容 条件json 字符串
						a0141b:[],//政治面貌
						a0104b:[],//性别
						a0111a:'',//籍贯
						a0114a:'',//出生地
						e10statusb:[],//档案状态
						a01statusb:[],//人员类别
						e10040:'',//工作单位及职务
						a0501b:[],//职务职级
					},
				},
				data311AFB4B: [], //档案状态
				data44B625FE: [], //人员类别
				dataCDE75543: [], // 职务职级
				data37B05E7C: [], //政治面貌
				rules:{
					title: [
			            { required: true, message: '请输入活动名称', trigger: 'blur' },
			            { max: 80, message: '长度在 80字符以内', trigger: 'blur' }
			        ],
				}
			};
		},
		created() {
			this.getData('311AFB4B', 'data311AFB4B'); //档案状态
			this.getData('44B625FE', 'data44B625FE'); //人员类别
			this.getData('CDE75543', 'dataCDE75543'); //职务职级
			this.getData('37B05E7C', 'data37B05E7C'); //政治面貌
			if(this.fromAddOrEdit=='edit'){
				this.form=this.selectOptionObj
			}
		},
		mounted() {

		},
		methods: {
			onSubmit() {
				if(!!!this.form.title){
					this.$message({
								type: 'error',
								message: '请填写必填字段！'
							});
					return;
				}
				if(this.fromAddOrEdit=='add'){
					for(let k in this.allObj){
						if(this.allObj[k].title==this.form.title){
							this.$message({
								type: 'error',
								message: '该名册名称已存在，不能重复输入！'
							});
							return;
						}
						
					}
					this.$axios({
						loading: {
							isShow: false,
						},
						method: 'post',
						url: this.API.dynamicRoster,
						data:{
							title:this.form.title,
							comments:this.form.comments,
							content:JSON.stringify(this.form.content)
						},
					}).then((res) => {
						var resData = res.data;
						if(resData.code == "1") {
							this.$emit("addBackCall", true);
						} else {
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
				}else if(this.fromAddOrEdit=='edit'){
					this.$axios({
						loading: {
							isShow: false,
						},
						method: 'post',
						url: this.API.updateRoster,
						data:{
							title:this.form.title,
							comments:this.form.comments,
							content:JSON.stringify(this.form.content),
							id:this.form.id,
						},
					}).then((res) => {
						var resData = res.data;
						if(resData.code == "1") {
							this.$emit("addBackCall", true);
						} else {
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
				}
			},
			getData(code, dataName) { //获取添加展示信息数据
				this.$axios({
					loading: {
						isShow: false,
					},
					method: 'get',
					url: this.API.getSysCadreCodeDetailList,
					params: {
						code: code
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						if(dataName == 'data311AFB4B') {
							this.data311AFB4B = resData.data;
						} else if(dataName == 'data44B625FE') {
							this.data44B625FE = resData.data;
						} else if(dataName == 'dataCDE75543') {
							this.dataCDE75543 = resData.data;
						} else if(dataName == 'data37B05E7C') {
							this.data37B05E7C = resData.data;
						}
					} else {
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
			cancel(){
				this.$emit("addBackCall", true);
			}
		}

	};
</script>
<style lang="scss" scoped type="text/css">
	.dynamicRosterAdd {
		.form-title {
			color: #0290f5;
			font-weight: bold;
			font-size: 20px;
			text-shadow: -1px 2px 1px #cccccc;
			line-height: 26px;
		}
		.inp{
			width:95% !important
		}
		.form-main{
			height:320px;
			overflow: auto;
		}
		.el-checkbox:nth-child(1) {
			margin-left: 30px;
		}
		.el-radio-group {
			margin-left: 30px;
		}
		.el-input--small {
			margin-left: 30px;
			width: 50%
		}
		.el-input__inner {
			margin-left: 30px;
		}
		.button {
			display: flex;
			justify-content: center;
			margin-left: -80px;
			box-sizing: border-box;
		}
	}
</style>