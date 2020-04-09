<template>
    <div class="roleManagement">
        <div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>角色权限管理</el-breadcrumb-item>
			  <el-breadcrumb-item>角色管理</el-breadcrumb-item>
			  <el-breadcrumb-item>角色管理列表</el-breadcrumb-item>
			</el-breadcrumb>
        </div>
        <div class="container">
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
			  <el-form-item>
			    <el-button type="primary"  @click="addRole">添加角色</el-button>
			  </el-form-item>
			  <el-form-item>
			    <el-input v-model="searchForm.roleName" placeholder="输入角色名称"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" icon="search" @click="search" >查询</el-button>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="sortRole" >排序</el-button>
			  </el-form-item>
			</el-form>
			<el-row>
			<el-col :span="24">
	            <el-table :data="tableData" border class="table" ref="multipleTable" height="400">
	                <el-table-column type="index" label="序号" align="center" width="50">
						<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
					</el-table-column>
	                <el-table-column prop="name" label="角色名称" width="120" show-overflow-tooltip align="center"></el-table-column>
	                <!--<el-table-column prop="workbenchName" label="工作台" sortable width="200" show-overflow-tooltip align="center"></el-table-column>-->
	                <el-table-column prop="uIssystem" label="是否系统内置" sortable width="120" align="center" :formatter="isSystemFunc"></el-table-column>
	                <el-table-column prop="statusName" label="状态" sortable width="70"  align="center"></el-table-column>
	                <el-table-column prop="remarks" label="备注" min-width="250" align="center" show-overflow-tooltip></el-table-column>
	                <el-table-column label="操作" width="300" align="center" fixed="right">
	                    <template slot-scope="scope">
	                        <el-button type="text"  v-if="scope.row.uIssystem == true" class="gray">编辑</el-button>
	                        <el-button type="text"  v-else  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	                        <el-button type="text"  v-if="scope.row.uIssystem == true" class="gray">删除</el-button>
	                        <el-button type="text"  v-else  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	                        <el-button type="text"  @click="handleShowUserInRole(scope.$index, scope.row)">对应人员</el-button>
	                        <el-button type="text"  @click="handleGetRolePower(scope.$index, scope.row)">查看权限</el-button>
	                        <el-button type="text"  v-if="scope.row.uIssystem == true" class="gray">分配权限</el-button>
	                        <el-button type="text"  v-else @click="handleSetRolePower(scope.$index, scope.row)">分配权限</el-button>
	                    </template>
	               	</el-table-column>
	            </el-table>
	            <div class="pagination">
	                <Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
	            </div>
			</el-col>
			</el-row>
       	</div>
        <!--新增和编辑角色弹出框 -->
       	<el-dialog class="outDialog" :title='dialogTitle' :visible.sync="roleVisible" width="30%" append-to-body v-if="roleVisible"  :close-on-click-modal="false">
       		<AddOrEditRole :roleObj="roleObject" @addOrEditRoleCallBack="addOrEditRoleCallBack"></AddOrEditRole>
       	</el-dialog>
        <!--角色对应人员弹出框 -->
       	<el-dialog class="outDialog" title='角色对应人员' :visible.sync="usersInRoleVisible" width="60%" append-to-body v-if="usersInRoleVisible"  :close-on-click-modal="false">
       		<UsersInRole :roleObj="roleObject"></UsersInRole>
       	</el-dialog>
        <!--设置角色权限弹出框 -->
       	<el-dialog class="outDialog" title='分配权限' :visible.sync="setRolePowerVisible" width="32%" append-to-body v-if="setRolePowerVisible"  :close-on-click-modal="false">
       		<SetRolePower :roleObj="roleObject" @SetRolePowerCallBack="setRolePowerCallBack"></SetRolePower>
       	</el-dialog>
        <!--查看角色权限弹出框 -->
       	<el-dialog class="outDialog" title='查看权限' :visible.sync="getRolePowerVisible" width="30%" append-to-body v-if="getRolePowerVisible"  :close-on-click-modal="false">
       		<GetRolePower :roleObj="roleObject"></GetRolePower>
       	</el-dialog>
		<!-- 排序 -->
		<el-dialog class="outDialog" title='排序' :visible.sync="sortRoleVisible" v-if="sortRoleVisible" append-to-body :close-on-click-modal="false">
       		<SortRole @sortRoleCall="sortRoleCall"></SortRole>
       	</el-dialog>
    </div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import AddOrEditRole from './AddOrEditRole.vue';
	import UsersInRole from './UsersInRole.vue';
	import SetRolePower from './SetRolePower.vue';
	import GetRolePower from './GetRolePower.vue';
	import SortRole from './SortRole.vue';
    export default {
        name: 'RoleManagement',//角色管理
	    components:{
	        Pagination,//分页组件
	        AddOrEditRole,//角色新增或者编辑组件
	        UsersInRole,//该角色下的所有用户--分页
	        SetRolePower,//设置角色权限界面
			GetRolePower,//查看角色权限界面
			SortRole//排序
	    },
        data() {
            return {
                tableData: [],//列表数据
                pageObj:{
	                pageIndex: this.API.constObj.pageIndex,//当前页码
	                total:0,//数据总数
	                pageSize:this.API.constObj.pageSize,//页大小
                },
                roleObject:{},
                multipleSelection: [],
                roleVisible: false,//角色信息弹窗的是否显示
                usersInRoleVisible:false,//角色下对应人员弹窗的是否显示
                setRolePowerVisible:false,//设置角色权限弹框是否显示
                getRolePowerVisible:false,//查看角色权限弹框是否显示
                dialogTitle: '添加角色',
                searchForm:{
                	roleName:''//角色名称
				},
				sortRoleVisible: false, //角色管理排序弹窗
            }
        },
        created() {
        },
        mounted(){
        	this.getData();
        },
        computed: {

        },
        methods: {
            /*
             * 分页导航
             * @val {Number} 当前页下标
             */
            handleCurrentChange(val) {
                this.pageObj.pageIndex = val;
                this.getData();
            },
	        /*
	         * 分页组件回调方法--子组件回传数据的方法
	         * @page_obj {Object} 分页信息
	         * page_obj.page_index 当前页下标
	         * page_obj.page_size 页大小
	         */
	        PageTurning(page_obj){
	            this.pageObj.pageIndex = page_obj.page_index;
	            this.pageObj.pageSize = page_obj.page_size;
				this.getData();
	        },
	        /*
	         * 角色组件回调方法--子组件回调数据的方法
	         * @isRefresh {Boolean} 是否需要刷新数据 true=刷新；false=不刷新
	         */
	        addOrEditRoleCallBack(isRefresh){
	            this.roleVisible = false;
				if(isRefresh){
					this.getData();	
				}
	        },
	        /*
	         * 设置角色权限组件回调方法--子组件回调数据的方法
	         * @isRefresh {Boolean} 是否需要刷新数据 true=刷新；false=不刷新
	         */
	        setRolePowerCallBack(isRefresh){
	            this.setRolePowerVisible = false;
				if(isRefresh){
					this.getData();	
				}
	        },
	        
            /*
             * 是否系统内置格式化
             */
            isSystemFunc(row, column, cellValue, index) {
            	let varValue = "是";
            	if(!cellValue){
            		varValue = "否";
            	}
            	return varValue;	
            },

            /*
             * 查询
             */
            search() {
            	this.pageObj.pageIndex = this.API.constObj.pageIndex;
                this.getData();
            },
            /*
             * 添加角色 
             */
            addRole(){
            	this.roleObject ={};
            	this.dialogTitle = "添加角色";
            	this.roleVisible=true;
            },
            /*
             * 编辑
             */
            handleEdit(index, row) {
            	this.roleObject = this.tableData[index];
                if(this.roleObject.uIssystem){//是否系统内置角色
                	this.$message({
			            type: 'warning',
			            message: '系统内置角色不能编辑!'
				    });
				    return;
                }
            	this.dialogTitle = "编辑角色信息";
            	this.roleVisible=true;
            },
			/*
             * 显示角色对应人员弹窗
             */
            handleShowUserInRole(index, row) {
            	this.roleObject = this.tableData[index];
            	this.usersInRoleVisible=true;
            },
			/*
             * 显示设置角色权限弹窗
             */
            handleSetRolePower(index, row) {
            	this.roleObject = this.tableData[index];
            	this.setRolePowerVisible=true;
            },
			/*
             * 显示查看角色权限弹窗
             */
            handleGetRolePower(index, row) {
            	this.roleObject = this.tableData[index];
            	this.getRolePowerVisible=true;
            },
            /*
             * 删除角色
             */
            handleDelete(index, row) {
                let item = this.tableData[index];
                if(item.uIssystem){//是否系统内置角色
                	this.$message({
			            type: 'warning',
			            message: '系统内置角色不能删除!'
				    });
				    return;
                }
                let self = this;
				this.$confirm('确定要删除该角色吗?', '操作提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          self.delRole(item.id,self);//请求后台进行删除
		        }).catch(() => {
    
		        });
            },
            /**
             * 获取列表数据
             */
            getData() {
                this.$axios({
               		loading:{
            			isShow:true,
            			target:'.roleManagement'
            		},
            		method:'post',
                	url:this.API.findRolesPage, 
                	data:{
	                	'name':this.searchForm.roleName,
	                    'pageIndex': this.pageObj.pageIndex,
	                    'pageSize': this.pageObj.pageSize
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.tableData = resData.data.list;
                    	this.pageObj.total= resData.data.total;
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '查询失败，请刷新重试！'
			          	});     
                    }
                }).catch((err) => {
                	console.log("查询查借角色信息列表="+err);
                	this.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
            },
            /*
             * 请求后台进行删除操作
             * @id {String} 需要操作的数据id
             * @self {Obj} this对象
             */
            delRole(id,self){
                self.$axios({
               		loading:{
            			isShow:true,
            			target:'.roleManagement'
            		},
            		method:'get',
                	url:self.API.deleteRole, 
                	params:{
                		id:id
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	self.$message({
				            type: 'success',
				            message: '角色删除成功!'
				        });
				        self.getData();//重新获取数据
                    }else{
			          	self.$message({
				            type: 'error',
				            message: '删除角色失败，请刷新重试！'
			          	});
                    }
                }).catch((err) => {
                	self.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
			},
			// 排序
			sortRole(){
				this.sortRoleVisible = true;
			},
			// 排序子组件回调数据
			sortRoleCall(isRefresh){
				debugger;
				this.sortRoleVisible = false;
				if(isRefresh) this.getData();
			}
        }
    }

</script>
<style  lang="scss" scoped type="text/css">
	el-dialog{
	    .del-dialog-cnt{
	        font-size: 16px;
	        text-align: center
	    }
	}
    .roleManagement{
        width: 100%;
        font-size: 14px;
    }
    .gray{
        color: #dcdfe6;
    }
    .red{
        color: #ff0000;
    }
</style>
