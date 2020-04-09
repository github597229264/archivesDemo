<template>
	<div class="menuManagement">
        <div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>信息中心管理</el-breadcrumb-item>
			  <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
			  <el-breadcrumb-item>菜单管理列表</el-breadcrumb-item>
			</el-breadcrumb>
        </div>
        <div class="container">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-button type="primary" @click="showAddOrEditMenu">添加</el-button>
					<!--<el-button type="primary" @click="authorize()">排序</el-button>-->
				</el-form-item>
			</el-form>
			<zk-table ref="multipleTable"  
				:data="data"  
				sum-text="sum" 
				index-text="#" 
				:columns="columns" 
				:stripe="props.stripe" 
				:border="props.border" 
				:show-header="props.showHeader" 
				:show-summary="props.showSummary" 
				:show-row-hover="props.showRowHover" 
				:show-index="props.showIndex" 
				:tree-type="props.treeType" 
				:is-fold="props.isFold" 
				:expand-type="props.expandType" 
				:selection-type="props.selectionType"  
				empty-text="该人员没有档案信息" 
				max-height="460px">		
				<template slot="isenable" slot-scope="scope">
					<el-tag v-if="scope.row.isenable ==true" type="success">是</el-tag>
					<el-tag v-else type="danger">否</el-tag>
				</template>
				<template slot="issuperuser" slot-scope="scope">
					<el-tag v-if="scope.row.issuperuser ==true" type="success">是</el-tag>
					<el-tag v-else type="danger">否</el-tag>
				</template>
				<template slot="isshow" slot-scope="scope">
					<el-tag v-if="scope.row.isshow ==true" type="success">是</el-tag>
					<el-tag v-else type="danger">否</el-tag>
				</template>
				<template slot="istrilateral" slot-scope="scope">
					<el-tag v-if="scope.row.istrilateral ==true" type="success">是</el-tag>
					<el-tag v-else type="danger">否</el-tag>
				</template>
				<template slot="operation" slot-scope="scope">
					<el-button type="text"  @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="text"  @click="handleDelete(scope.row)">删除</el-button>
                    <!--<el-button type="text"  @click="handleAllPage(scope.row)">全部页面</el-button>-->
				</template>
			</zk-table>
		</div>
        <!--新增和编辑菜单弹出框 -->
       	<el-dialog class="outDialog" :title='dialogTitle' :visible.sync="menuVisible" width="50%" append-to-body v-if="menuVisible"  :close-on-click-modal="false">
       		<AddOrEditMenu :menuObject="menuObject" @AddOrEditMenuCallBack="AddOrEditMenuCallBack"></AddOrEditMenu>
       	</el-dialog>
        <!--菜单下的子页面列表弹出框 -->
       	<el-dialog class="outDialog" title='子页面集合' :visible.sync="pageInMenuListVisible" width="70%" append-to-body v-if="pageInMenuListVisible"  :close-on-click-modal="false">
       		<PageInMenuList :menuObject="menuObject"></PageInMenuList>
       	</el-dialog>
	</div>
</template>

<script>
	import AddOrEditMenu from './AddOrEditMenu.vue';
	import PageInMenuList from './PageInMenuList.vue';
	export default {
		name: 'MenuManagement', //个人档案授权
		props: ['chioceFile'],
		components: {
			AddOrEditMenu,//新增和编辑菜单
			PageInMenuList//菜单下的子页面列表
		},
		data() {
			return {
				props: {
					stripe: true,//是否隔行变色
					border: true,
					showHeader: true,
					showSummary: false,
					showRowHover: false,
					showIndex: false,
					treeType: true,//是否tree结构
					isFold: true,//是否折叠
					expandType: false,//是否展开类型
					selectionType: false//是否选择类型
				},
				menuObject:{},//选中的菜单对象
                menuVisible: false,//用户信息弹窗的是否显示
                pageInMenuListVisible:false,//菜单下的子页面列表弹窗的是否显示
                dialogTitle: '添加菜单',
				oldData:[],//原始的data
				columns: [
					{
						label: '菜单名称',
						prop: 'name',
						width: '220px'
					},
					{
						label: '类型',
						prop: 'typeName',
						minWidth: '70px'
					},
					{
						label: '编码',
						prop: 'code',
						minWidth: '80px'
					},
					{
						label: '访问路径',
						prop: 'path',
						minWidth: '150px'
					},
					{
						label: '是否启用',
						prop: 'isenable',
						minWidth: '70px',
						type: 'template',
						template: 'isenable'
					},
					{
						label: '是否超级菜单',
						prop: 'issuperuser',
						minWidth: '90px',
						type: 'template',
						template: 'issuperuser'
					},
					{
						label: '是否显示',
						prop: 'isshow',
						minWidth: '70px',
						type: 'template',
						template: 'isshow'
					},
					{
						label: '是否三员',
						prop: 'istrilateral',
						minWidth: '70px',
						type: 'template',
						template: 'istrilateral'
					},
					{
						label: '操作',
						prop: 'type',
						minWidth: '80px',
						type: 'template',
						fixed:'right',
						template: 'operation'
					}
				],
				data: [] //表格数据
			}
		},
		created() {
			this.getData();
		},
		mounted() {

		},
		computed: {
			propList() {
				return Object.keys(this.props).map(item => ({
					name: item,
				}));
			}
		},
		methods: {
			/**
			 * 显示AddOrEditMenu组件
			 */
			showAddOrEditMenu(){
				this.menuObject = {};
				this.dialogTitle = "添加菜单";
				this.menuVisible = true;
			},
            /*
             * 编辑
             */
            handleEdit(row) {
            	this.menuObject = row;
            	this.dialogTitle = "编辑菜单信息";
            	this.menuVisible=true;
            },
			/*
	         * 添加或修改菜单组件回调方法--子组件回调数据的方法
	         * @param {Boolean} isRefresh是否需要刷新数据 true=刷新；false=不刷新
	         */
            AddOrEditMenuCallBack(isRefresh){
            	this.menuVisible = false;
            	if(isRefresh){
            		this.getData();
            	}
            },
            /*
             * 删除
             */
            handleDelete(row) {
				this.$confirm('确定删除该菜单吗?', '操作提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		       }).then(() => {
	                if(row.children && row.children.length >0){//目录下有页面不能删除
	                	this.$message({
				            type: 'warning',
				            message: '该项下存在页面不能删除!'
					    });
					    return;
	                }
	            	this.requestDel(row.id);//请求后台删除菜单
            	}).catch(() => {       
		        });
            },
            /*
             * 全部页面
             */
            handleAllPage(row) {
            	this.menuObject = row;
            	this.pageInMenuListVisible=true;
            },
			/**
			 * 请求后台删除菜单
			 * @param {Number} menuId 菜单id
			 */
			requestDel(menuId) {
				this.$axios({
					method: 'get',
					url: this.API.deleteMenu,
					params: {
						id: menuId
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.$message({
							type: 'success',
							message: '删除菜单成功'
						});
						this.getData();//刷新table
					} else {
						this.$message({
							type: 'error',
							message: '删除菜单成功失败，请刷新重试！'
						});
					}
				}).catch((err) =>{
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
				
			},
			/*
			 * 获取菜单列表数据 
			 */
			getData() {
				let self = this;
				this.$axios({
					method: 'get',
					url: this.API.menuTreeList
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						self.oldData = resData.data;
						self.data = self.commonFun.toTreeData3(resData.data);
					} else {
						self.$message({
							type: 'error',
							message: '获取菜单列表失败，请刷新重试！'
						});
					}
				}).catch((err) =>{
					self.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
				
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.menuManagement {
		width: 100%;
	}
</style>