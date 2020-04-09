<template>
	<div class="organization-tree">
		<el-tree class="filter-tree" :data="treeList" :render-content="renderContent" @node-click="handleNodeClick" :filter-node-method="filterNode" ref="tree2">
		</el-tree>
	</div>
</template>

<script>
	export default {
		name: "OrganizationTree", //组织树
		props: ['filterText'], //组织机构搜索
		data() {
			return {
				treeList: [], //树数据
				oldList: [], //原数据
				flag:true,//true本页面进入的，false通过别的方式进行刷新数据
			}
		},
		created() {
			this.getTreeData();
		},
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val);
			}
		},
		methods: {
			filterNode(value, data) { //树内容过滤
				if(!value) return true;
				return data.name.indexOf(value) !== -1;
			},
			getTreeData(param) { //获取树数据
				if(param != undefined) this.flag = param;
				console.log("===")
				this.$axios({
					loading: {
						isShow: false, //是否显示loading遮罩层
					},
					method: 'get',
					url: this.API.organizationTree,
					params: {}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						//递归转换为tree格式数据
						resData.data.forEach(item => {
							if(item.type == 0) item.className = "xunijigou";
							else if(item.type == 1) item.className = "danwei";
							else if(item.type == 2) item.className = "bumen";
						})
						this.oldList = resData.data;
						this.treeList = this.commonFun.toTreeData(resData.data);
						console.log("this.treeList" + this.treeList)
						if(this.flag)this.$emit("getSelect", this.treeList[0], true, this.oldList);
					} else {
						this.$message({
							type: 'error',
							message: '获取区域树形下拉框数据失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					console.log("获取区域树形下拉框数据=" + err);
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})

			},
			handleNodeClick(data) { //树的点击事件
				console.log(data);
				this.$emit("getSelect", data, false, this.oldList);

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

<style lang="scss">
	.organization-tree {
		.el-tree {
			min-width: 100%;
			font-size: 13px;
			display: inline-block;
			.el-tree-node:focus>.el-tree-node__content {
				background-color: #88B1CA !important;
				color: #fff;
			}
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