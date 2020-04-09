<template>
	<div class="tenTypeTree">
		<el-tree  ref="tenTypeTree" class="filter-tree" :data="treeList" :render-content="renderContent" @node-click="handleNodeClick" :filter-node-method="filterNode">
		</el-tree>
	</div>
</template>

<script>
	export default {
		name: "TenTypeTree", //十大类树--无文件类型
		props: [
			'filterText',//搜索文本
			'fileObject'//档案对象
		], 
		data() {
			return {
				treeList: [], //树数据
			}
		},
		created() {
			this.getDataById();
		},
		watch: {
			filterText(val) {
				this.$refs.tenTypeTree.filter(val);
			}
		},
		methods: {
			/**
			 * 树内容过滤
			 * @param {String} value
			 * @param {Object} data
			 */
			filterNode(value, data) {
				if(!value) return true;
				return data.name.indexOf(value) !== -1;
			},
			/**
			 * 根据档案人员id获取档案人员十大类列表
			 */
			getDataById() {
				this.$axios({
					loading: {
						isShow: true, //是否显示loading遮罩层
						target:'.tenTypeTree'
					},
					method: 'get',
					url: this.API.digitalArchives,
					params: {
						a0100: this.fileObject.a0100 //档案id
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						resData.data.forEach(item => {
							if(item.type == "标题") item.className = "haveChild";
							else if(item.type == "目录") item.className = "noChild";
						});
						this.treeList = this.commonFun.toTreeDataNormal(resData.data,{
							childKey:'code',
							fatherKey:'parentcode'
						});
					} else {
						this.$message({
							type: 'error',
							message: '获取档案十大类数据失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			/**
			 * 树点击事件
			 * @param {Object} obj
			 */
			handleNodeClick(obj) {
				this.$emit("tenTypeTreeCall", obj);
			},
			/**
			 * 树添加图标处理
			 */
			renderContent(h, {
				node,
				data,
				store
			}) {
				return(
					<span>
		                <i class={data.className}></i>
		                <span>{data.name}</span>
		             </span>
				);
			}
		}
	}
</script>

<style lang="scss">
	.tenTypeTree {
		min-height: 460px;
		.el-tree {
			min-width: 100%;
			font-size: 13px;
			display: inline-block;
			padding:0 10px 10px 5px;
			.el-tree-node:focus>.el-tree-node__content {
				background-color:#909399 !important;
				color: #fff;
			}
		}
		.haveChild, .noChild{
			display: inline-block;
			width: 16px;
			height: 16px;
		}
		.haveChild {
			background: url('../../assets/img/danweiold.png') no-repeat 0 3px;
			padding-left: 5px;
		}
		.noChild {
			background: url('../../assets/img/bumen.png') no-repeat 0 3px;
			padding-left: 5px;
		}
	}
</style>