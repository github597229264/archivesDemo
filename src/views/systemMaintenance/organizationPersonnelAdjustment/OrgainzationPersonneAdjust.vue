<template>
	<div class="orgainzation_personne_adjust-container">
		<div class="orgainzation_personne_adjust-container_type">
			调整方式：
			<el-radio-group v-model="typeRadio">
				<el-radio :label="3">调整部门</el-radio>
				<el-radio :label="6">兼职</el-radio>
			</el-radio-group>
		</div>
		<div class="transferred_department">
			调往部门：
			<organizationTree :filterText="filterText" @getSelect="getSelectData"></organizationTree>
		</div>
		<div class="work_units">
			工作单位：
			<el-input v-model="isMain" disabled></el-input>
		</div>
		<div class="parttime_units">
			兼职单位：
			<el-input v-model="isNotMain" disabled></el-input>
		</div>
		<!--底部操作-->
		<div class="footer">
			<el-button type="primary" @click="save">确认</el-button>
			<el-button type="danger" @click="cancle">取消</el-button>
		</div>
	</div>
</template>

<script>
	import organizationTree from '../OrganizationTree.vue';
	export default {
		name: "OrgainzationPersonneAdjust", //人员机构调整
		props: ['a0100'],
		components: {
			organizationTree
		},
		data() {
			return {
				typeRadio: 3, //调整部门
				filterText: "", //机构树的过滤
				isMain: "", //工作单位
				isNotMain: "", //兼职单位
				ismain: true, //是否主要部门（true：主要部门；false）
				b0000: "", //机构id
				isMainB000:"",//用户本来的调整部门的id
				isNotMainB000:"",//用户本来的兼职的id
			}
		},
		created() {
			this.getdetail();
		},
		methods: {
			getdetail() {
				this.$axios({
					method: 'get',
					url: this.API.viewAdjustment,
					params: {
						'a0100': this.a0100
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.isMain = resData.data.isMain;
						this.isNotMain = resData.data.isNotMain;
						this.isMainB000 = resData.data.isMainB000;
						this.isNotMainB000 = resData.data.isNotMainB000;
					} else {
						this.$message({
							type: 'error',
							message: '查询工作单位、兼职单位失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("查询工作单位、兼职单位=" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getSelectData(data, isFirst,list) { //机构组件返回的数据
				if(isFirst) return;
				this.b0000 = data.id;
			},
			save() { //保存
				console.log("===")
				if(this.b0000 == "") {
					this.$confirm('请选择调往部门！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				if(this.typeRadio == 3)this.ismain = true;
				else this.ismain = false;
				let adjustmentFlag = true;//是否可以调整，false不可以 true可以
				if(this.ismain){//调整部门和兼职不能是同一机构
					if(this.b0000 === this.isMainB000 || (this.isNotMainB000.length>0 && this.isNotMainB000.indexOf(this.b0000) >= 0) )adjustmentFlag = false;//调整不能调整返回的工作单位和兼职单位
				}else{//调整部门和兼职不能是同一机构
					if(this.isNotMainB000.length>0 && this.isNotMainB000.indexOf(this.b0000) >= 0)adjustmentFlag = false;//不能调整到和返回同一虚拟机构下
					if(this.isMainB000.length>0 && this.b0000 === this.isMainB000)adjustmentFlag = false;//不能调整到和返回同一工作单位下
				}
				if(!adjustmentFlag){
					this.$message("不能主职兼职同一个部门！");
					return;
				}
				this.$axios({
					method: 'post',
					url: this.API.adjustmentDepartmentA01,
					data: {
						'a0100': this.a0100,
						'b0000': this.b0000,
						'ismain': this.ismain
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							message: '机构人员调整成功！',
							type: 'success'
						});
						this.$emit("backAdd", "");
					} else {
						this.$message({
							type: 'error',
							message: '获取机构人员调整数据失败，请刷新重试！'
						});
					}
				}).catch(function(err) {
					console.log("连接错误" + err);
				})
			},
			cancle() { //取消
				this.$emit("backAdd", "");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.el-dialog__header {
		padding-top: 0 !important;
	}
	
	.orgainzation_personne_adjust-container {
		.transferred_department {
			overflow-y: auto;
			/*overflow-x: scroll;*/
			height: 200px;
			margin-top: 10px;
		}
		.footer {
			text-align: center;
			margin-top: 10px;
		}
	}
</style>