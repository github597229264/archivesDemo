<template>
    <div class="userGroupManagement">
        <div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>用户权限管理</el-breadcrumb-item>
			  <el-breadcrumb-item>用户机构(组)管理</el-breadcrumb-item>
			  <el-breadcrumb-item>用户机构(组)管理列表</el-breadcrumb-item>
			</el-breadcrumb>
        </div>
        <el-container>
        	<el-aside width="280px">
        		<el-row>
					<el-button type="primary" @click="addUserGroup">添加</el-button>
					<el-button type="primary" @click="editUserGroup">编辑</el-button>
					<el-button type="danger" @click="delUserGroup">删除</el-button>
					<el-button type="primary" @click="sortUserGroup">排序</el-button>
				</el-row>
        		<UserGroupTree ref="userGroupTreeChild" @UserGroupTreeCall="UserGroupTreeCall"></UserGroupTree>
        	</el-aside>
        	<el-main>
	            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
				  <el-form-item>
				    <el-button type="primary"  @click="showAddUserWin">添加人员</el-button>
				  </el-form-item>
				  <el-form-item>
				    <el-input v-model="searchForm.cn" placeholder="输入姓名或账户"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="primary" icon="search" @click="search" >查询</el-button>
				  </el-form-item>
				</el-form>
	            <el-table :data="tableData" border class="table" ref="multipleTable" height="370">
	                <el-table-column type="index" label="序号" align="center" width="50">
						<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
					</el-table-column>
	                <el-table-column prop="cn" label="姓名" width="150"  align="center"></el-table-column>
	                <el-table-column prop="uid" label="账户" width="150"  align="center"></el-table-column>
	                <el-table-column prop="name" label="岗位" min-width="130" align="center" ></el-table-column>
	                <el-table-column label="操作" width="120" align="center">
	                    <template slot-scope="scope">
	                        <el-button type="text"   @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	                    </template>
	               	</el-table-column>
	            </el-table>
	            <div class="pagination">
	                <Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
	            </div>
			</el-main>
       	</el-container>
        <!--新增和编辑用户组弹出框 -->
       	<el-dialog class="outDialog" :title='dialogTitle' :visible.sync="userGroupVisible" width="30%" append-to-body v-if="userGroupVisible"  :close-on-click-modal="false">
       		<AddOrEditUsersGroup :userGroupObj="editUserGroupObj" @UserGroupCallBack="UserGroupCallBack"></AddOrEditUsersGroup>
       	</el-dialog>
        <!--添加人员弹出框 -->
       	<el-dialog class="outDialog" title='添加人员' :visible.sync="addUserVisible" width="50%" append-to-body v-if="addUserVisible"  :close-on-click-modal="false">
       		<NotSelectedUser  @NotSelectedUserCall="NotSelectedUserCall"></NotSelectedUser>
       	</el-dialog>
		<!-- 排序弹窗 -->
		<el-dialog width="60%" title="排序" :visible.sync="sortUserVisible" :close-on-click-modal="false" append-to-body>
			<sortSelectUser :id="id" @sortUserCall="sortUserCall"></sortSelectUser>
		</el-dialog>
    </div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import UserGroupTree from '../../components/UserGroupTree.vue';
	import NotSelectedUser from '../../components/NotSelectedUser.vue';
	import AddOrEditUsersGroup from './AddOrEditUsersGroup.vue';
	import SortSelectUser from './SortSelectUser.vue'; //排序
    export default {
        name: 'UserGroupManagement',//用户组管理
	    components:{
	        Pagination,//分页组件
	        UserGroupTree,//用户组树组件
	        NotSelectedUser,//未被选择用户列表组件
			AddOrEditUsersGroup,//用户新增或者编辑组件
			SortSelectUser,//排序
	    },
        data() {
            return {
                tableData: [],//列表数据
                pageObj:{
	                pageIndex: this.API.constObj.pageIndex,//当前页码
	                total:0,//数据总数
	                pageSize:this.API.constObj.pageSize,//页大小
                },
                userGroupObj:{},//选中的用户组信息
                editUserGroupObj:{},//添加和编辑时选中的用户组信息
                multipleSelection: [],
                addUserList:[],//当前添加的人员列表
                addUserVisible:false,//添加人员弹窗是否显示
                userGroupVisible: false,//用户组信息弹窗是否显示
                dialogTitle: '添加用户组',
                searchForm:{
                	cn:''//用户名称或拼音
				},
				sortUserVisible: false,//排序弹窗默认关闭
				id:'',//左边选中的id
				// sortList:"",//要排序的集合
            }
        },
        created() {
        },
        mounted(){
        	
        },
        computed: {

        },
        methods: {
	        /*
	         * 用户组树组件回调方法--子组件回调数据的方法
	         * @params {Object} obj选中的数据
	         */
        	UserGroupTreeCall(obj){
        		this.userGroupObj = obj;
				this.editUserGroupObj = obj;
				console.log(obj);
				if(obj){ this.id = obj.id}
        		this.getData();
        	},
	        /*
	         * 未被选择用户列表组件回调方法--子组件回调数据的方法
	         * @params {Array} arr选中的数据
	         */
        	NotSelectedUserCall(arr){
        		this.addUserList = arr;
        		this.addUserVisible = false;
				let roleStr='';
				this.addUserList.forEach(function(row, index, array){
					if(index == array.length-1){
						roleStr +=row.id;
					}else{
						roleStr +=row.id+",";
					}
				})
        		this.addUserToGroup(roleStr);
        	},
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
	         * 用户组信息组件回调方法--子组件回调数据的方法
	         * @param {Boolean} isRefresh是否需要刷新数据 true=刷新；false=不刷新
	         */
	        UserGroupCallBack(isRefresh){
	            this.userGroupVisible = false;
				if(isRefresh){
					//调用userGroupTree子组件中的方法
				    this.$refs.userGroupTreeChild.getData();
				}
			},
			// 排序
			sortUserGroup(){
				this.sortUserVisible = true;
			},
			// 排序子组件回调数据
			sortUserCall(isRefresh){
				this.sortUserVisible = false;
				if(isRefresh) this.$refs.userGroupTreeChild.getData();
			},
            /*
             * 查询
             */
            search() {
            	this.pageObj.pageIndex = this.API.constObj.pageIndex; 
                this.getData();
            },
            /*
             * 添加用户组 
             */
            addUserGroup(){
            	if(this.userGroupObj.pId &&  this.userGroupObj.pId.length > 0){
            		this.editUserGroupObj.pId = this.userGroupObj.pId;
            	}else{
            		this.editUserGroupObj.pId = this.userGroupObj.id;
            	}
            	this.dialogTitle = "添加用户组";
            	this.userGroupVisible=true;
            },
            /*
             * 监听添加人员按钮点击事件--显示添加人员弹窗
             */
            showAddUserWin(){
            	this.addUserVisible=true;
            },
            
            /*
             * 编辑用户组
             */
            editUserGroup() {
            	this.editUserGroupObj = this.userGroupObj;
            	this.editUserGroupObj.pId = "";
                if(JSON.stringify(this.editUserGroupObj)=="{}"){
                	this.$message({
			            type: 'warning',
			            message: '请先选择用户组!'
				    });
				    return;
                }
            	this.dialogTitle = "编辑用户组信息";
            	this.userGroupVisible=true;
            },
            /*
             * 删除人员
             */
            handleDelete(index, row) {
                let item = this.tableData[index];
                let self = this;
				this.$confirm('确定要删除用户组下的该人员吗?', '操作提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          self.requestDelUser(item.id,self);//请求后台进行删除用户操作
		        }).catch(() => {       
		        });
            },
            /*
             * 删除用户组
             */
            delUserGroup(){
                if(this.userGroupObj.uIssystem){//是否系统内置用户组
                	this.$message({
			            type: 'warning',
			            message: '系统内置用户组不能删除!'
				    });
				    return;
                }
                let self = this;
				this.$confirm('确定要删除该用户组吗?', '操作提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          self.requestDelUserGroup(self.userGroupObj.id,self);//请求后台进行删除
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
            			target:'.userGroupManagement'
            		},
            		method:'post',
                	url:this.API.findeUserPageInfo, 
                	data:{
                		orgId:this.userGroupObj.id,
	                	cn:this.searchForm.cn,
	                    pageIndex: this.pageObj.pageIndex,
	                    pageSize: this.pageObj.pageSize
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
                	console.log("查询查借用户组信息列表="+err);
                	this.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
            },
            /*
             * 请求后台进行删除用户组操作
             * @id {String} 需要操作的数据id
             * @self {Obj} this对象
             */
            requestDelUserGroup(id,self){
                self.$axios({
                	loading:{
            			isShow:true,
            			target:'.userGroupManagement'
            		},
            		method:'get',
                	url:self.API.deleteOrganization, 
                	params:{
                		id:id
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	self.$message({
				            type: 'success',
				            message: '用户组删除成功!'
				        });
				        //调用userGroupTree子组件中的方法
				        self.$refs.userGroupTreeChild.getData();
                    }else if(resData.code =="7"){
			          	this.$message({
				            type: 'error',
				            message: '该用户组下存在用户，不能删除!'
			          	});     
                    }else{
			          	self.$message({
				            type: 'error',
				            message: '删除用户组失败，请刷新重试！'
			          	});
                    }
                }).catch((err) => {
                	self.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
            },
           /*
             * 请求后台用户组添加用户操作
             * @id {String} 用户id，多个以逗号分隔
             */
            addUserToGroup(userIdStr){
                this.$axios({
                	loading:{
            			isShow:true,
            			target:'.userGroupManagement'
            		},
            		method:'post',
                	url:this.API.saveUserOrganization, 
                	data:{
                		orgId:this.userGroupObj.id,
                		userId:userIdStr
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.$message({
				            type: 'success',
				            message: '用户添加成功!'
				        });
				        this.getData();//重新获取数据
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '用户添加失败，请刷新重试！'
			          	});
                    }
                }).catch((err) => {
                	this.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
            },
           /*
             * 请求后台进行删除用户操作
             * @id {String} 需要操作的数据id
             * @self {Obj} this对象
             */
            requestDelUser(id,self){
                self.$axios({
                	loading:{
            			isShow:true,
            			target:'.userGroupManagement'
            		},
            		method:'get',
                	url:self.API.deleteUserOrganization, 
                	params:{
                		id:id
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	self.$message({
				            type: 'success',
				            message: '用户删除成功!'
				        });
				        self.getData();//重新获取数据
                    }else{
			          	self.$message({
				            type: 'error',
				            message: '删除用户失败，请刷新重试！'
			          	});
                    }
                }).catch((err) => {
                	self.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
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
    .userGroupManagement{
        height: 100%;
        font-size: 14px;
        .el-container{
        	height:100%;
        	background-color: #fff;
	        .el-aside{
	        	height:100%;
	        	border-right: solid 1px #E4E7ED;
	        	.el-row{
	        		margin: 20px auto;
	        		text-align: center;
	        	}
	        }
        }
    }
    .gray{
        color: #dcdfe6;
    }
    .red{
        color: #ff0000;
    }
</style>
