<template>
	<el-container class="pipe-range-setting-container">
		<el-header class="my-header" style="height: 45px;">管档范围设置</el-header>
		<el-main class="pipe-range-setting-content">
			<div class="pipe-range-setting-left" ref="organizatinLeft">
				<!--用户组集合-->
				<div class="user-organization-list">
					<div v-if='userOrganizationList&&userOrganizationList.length===0' style="text-align: center;">没有数据，请刷新试试!</div>
					<div class="user-organization-item" v-for="(item, index) in userOrganizationList" :key="item.a0101" @click="getList(index)" :class="{'selectedBg':index === currClick }">
						<p class="user-organization-top">
							<span class="name">{{item.name}}</span> 领导：
							<span class="leaders">{{item.leaders}}</span> 机构职能：
							<span>{{item.functions}}</span>
						</p>
						<p class="user-organization-bottom">
							管档范围：{{item.range}}
						</p>
					</div>
				</div>
			</div>
			<div class="pipe-range-setting-right">
				<organizationCheckBoxtreeChild @sucessBack="getSucessBack" ref="treeChild"></organizationCheckBoxtreeChild>
			</div>
		</el-main>
	</el-container>
</template>

<script>
	import organizationCheckBoxtreeChild from '../OrganizationCheckBoxTree.vue';
	export default {
		name: "PipeRangeSetting", //管档范围设置
		components:{
			organizationCheckBoxtreeChild
		},
		data() {
			return {
				checkId:"",//选中的数据的id
				currClick: 0,//当前选中的行号
				userOrganizationList: [], //用户组集合
				flag:false,//true保存过来的刷新左边右边，false，非保存
			}
		},
		created() {
			this.findUserOrganizationList();
		},
		methods: {
			getSucessBack(){//当保存成功时，调用兄弟元素获取列表的方法
				this.findUserOrganizationList();
				this.flag = true;
			},
			findUserOrganizationList() {//获取人员集合
				this.$axios({
					method: 'get',
					url: this.API.findUserOrganizationList,
					params: {}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.userOrganizationList = resData.data;
						if(resData.data.length === 0)return;//如果没有数据就不显示右边的
						if(!this.flag){
							this.checkId = this.userOrganizationList[0].id;
							this.$refs.treeChild.getData(this.checkId);
						}
					} else {
						this.$message({
							type: 'error',
							message: '查询用户组集合失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("查询用户组集合" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			getList(indexVal) {
				this.currClick = indexVal;
				this.userOrganizationList.forEach((item,index)=>{
					if(index == indexVal) this.checkId = item.id;
				})
				this.$refs.treeChild.getData(this.checkId);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pipe-range-setting-container {
		height: 100%;
		.my-header {
			padding-top: 15px;
		}
		.el-main {
			background-color: #fff;
			height: 100%;
			display: flex;
			height: 490px;
			.pipe-range-setting-left {
				width: 70%;
				overflow-y: auto;
				.user-organization-list {
					font-size: 12px;
					.user-organization-item {
						min-height: 70px;
						background-color: #EFEFEF;
						margin-bottom: 5px;
						padding: 5px;
						.user-organization-top {
							display: flex;
							margin-bottom: 5px;
							.name {
								width:100px;
								color: red;
							}
							.leaders {
								width:200px;
							}
						}
					}
					.selectedBg{
						border: 1px solid #369FDD;
						background-color: white !important;
					}
				}
			}
			.pipe-range-setting-right {
				width: 29%;
			}
		}
	}
</style>