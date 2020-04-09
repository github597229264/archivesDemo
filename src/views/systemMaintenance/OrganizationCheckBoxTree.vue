<template>
	<div class="organization-container">
		<el-tree :data="data" :default-checked-keys="checkedId" :render-content="renderContent" show-checkbox check-strictly node-key="id" ref="tree" highlight-current :props="defaultProps">
		</el-tree>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="saveOrganization">保存</el-button>
			<el-button type="danger" v-if="addFlag" @click="cancle">取消</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'OrganizationCheckBoxTree', //组织机构树可以选中操作,这个父子关联选中的
		props: ['id', 'addFlag'], //addFlag:true添加界面的返回
		components: {},
		data() {
			return {
				sendId: "", //id
				checkedId: [], //选中的id
				printCheckbox: [], //打印复选框 选中的数据
				data: [], //tree的数据
				defaultProps: {
					children: 'children',
					label: 'name'
				},
			};
		},
		created() {
			if(this.id) this.sendId = this.id;
			if(this.addFlag) this.getData(this.id);
		},
		methods: {
			getData(id) { //获取表格档案信息的数据 
				let url = "";
				if(!this.id) this.sendId = id;
				if(this.addFlag) url = this.API.findPowerArchPowerOrgs;
				else url = this.API.findUserOrgRelationById;
				this.$axios({
					loading: {
						isShow: false, //是否显示loading遮罩层
					},
					method: 'get',
					url: url,
					params: {
						'id': this.sendId
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						let ids = resData.data.orgIds;
						ids = ids.toUpperCase();
						this.checkedId = ids.split(",");
						resData.data.list.forEach(item => {
							if(item.type == 0) item.className = "xunijigou";
							else if(item.type == 1) item.className = "danwei";
							else if(item.type == 2) item.className = "bumen";
						})
						this.data = this.commonFun.toTreeData(resData.data.list);
					} else {
						this.$message({
							type: 'error',
							message: '查询失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("列表=" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			joinTgetherId(list, ids) { //根据传入的集合，拼接需要的字段，用逗号隔开
				let arr = list;
				if(arr.length <= 0) return;
				else if(arr.length > 1) ids = arr.join(",").toString();
				else if(arr.length = 1) ids = arr[0];
				return ids;
			},
			saveOrganization() { //修改
				let selecedArr = this.$refs.tree.getCheckedKeys();
				let selectedId = this.joinTgetherId(selecedArr, selectedId);
				let url = "";
				if(this.addFlag) url = this.API.savePowerArchPowerOrgs;
				else url = this.API.updateUserOrganizationRange;
				this.$axios({
					method: 'post',
					url: url,
					data: {
						'id': this.sendId,
						'orgIds': selectedId
					}
				}).then((res) => {
					console.log("返回的数据=" + res);
					var resData = res.data;
					if(resData.code == "1") {
						let msg = "";
						if(this.addFlag) msg = "保存数据成功！";
						else {
							msg = "更新用户组职能范围成功！";
							this.$emit('sucessBack', '');
						}
						this.$message({
							message: msg,
							type: 'success'
						});
						if(this.addFlag) this.$emit('getAddBack', "");
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
				if(this.addFlag) this.$emit('getAddBack', "");
			},
			renderContent(h, {
				node,
				data,
				store
			}) {
				return( //type 0 是虚拟机构、1是单位、2是部门
					<span>
		                <i class={data.className}></i>
		                <span>{data.name}</span>
		             </span>
				);
			},
		}
	}
</script>
<style lang="scss" type="text/css">
	.organization-container {
		height: 470px;
		.el-tree {
			min-width: 100%;
			height: 420px;
			overflow-y: auto;
			font-size: 13px;
			display: inline-block;
		}
		.dialog-footer {
			margin: 10px 0;
			text-align: center;
		}
		.xunijigou, .danwei, .bumen{
			display: inline-block;
			width: 16px;
			height: 16px;
		}
		.xunijigou {
			background: url('../../assets/img/xunijigou.gif') no-repeat 0 3px;
			padding-left: 5px;
		}
		.danwei {
			background: url('../../assets/img/danwei.png') no-repeat 0 3px;
			padding-left: 5px;
		}
		.bumen {
			background: url('../../assets/img/bumen.png') no-repeat 0 3px;
			padding-left: 5px;
		}
	}
</style>