<template>
    <div class="userManagement">
        <div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>用户权限管理</el-breadcrumb-item>
			  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
			  <el-breadcrumb-item>用户管理列表</el-breadcrumb-item>
			</el-breadcrumb>
        </div>
        <div class="container">
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
			  <el-form-item>
			    <el-button type="primary" icon="el-icon-edit" @click="addUser">添加用户</el-button>
			  </el-form-item>
			  <el-form-item>
			    <el-input v-model="searchForm.cn" placeholder="输入姓名或账户"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" icon="search" @click="search" >查询</el-button>
			  </el-form-item>
			  <el-form-item>
				  <el-button type="primary" @click="sortUser">排序</el-button>
			  </el-form-item>
			</el-form>
			<el-row>
			<el-col :span="24">
	            <el-table :data="tableData" border class="table" ref="multipleTable" height="400">
	                <el-table-column type="index" label="序号" align="center" width="50">
						<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
					</el-table-column>
	                <el-table-column prop="cn" label="姓名" width="150"  align="center"></el-table-column>
	                <el-table-column prop="uid" label="账户" width="150"  align="center"></el-table-column>
	                <el-table-column prop="stationName" label="岗位" min-width="130" align="center" ></el-table-column>
	                <el-table-column prop="statusName" label="状态" sortable width="130"  align="center"></el-table-column>
	                <el-table-column label="操作" width="120" align="center">
	                    <template slot-scope="scope">
	                        <el-button type="text"  v-if="scope.row.status == 2" class="gray">编辑</el-button>
	                        <el-button type="text"  v-else  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	                        <el-button type="text"  v-if="scope.row.status == 2" class="gray">删除</el-button>
	                        <el-button type="text"  v-else  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	                    </template>
	               	</el-table-column>
	            </el-table>
	            <div class="pagination">
	                <Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
	            </div>
			</el-col>
			</el-row>
       	</div>
        <!--新增和编辑用户弹出框 -->
       	<el-dialog class="outDialog" :title='dialogTitle' :visible.sync="userVisible" width="30%" append-to-body v-if="userVisible"  :close-on-click-modal="false">
       		<AddOrEditUsers :userObj="userObject" @UserCallBack="UserCallBack"></AddOrEditUsers>
       	</el-dialog>
		<!-- 排序弹窗 -->
		<el-dialog title="排序" :visible.sync="sortUserVisble" v-if="sortUserVisble" :close-on-click-modal="false" append-to-body>
			<sortUser :id="id" @sortUserCall="sortUserCall"></sortUser>
		</el-dialog>
    </div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import AddOrEditUsers from './AddOrEditUsers.vue';
	import SortUser from './SortUser.vue';

    export default {
        name: 'UserManagement',//用户管理
	    components:{
	        Pagination,//分页组件
			AddOrEditUsers,//用户新增或者编辑组件
			SortUser
	    },
        data() {
            return {
                tableData: [],//列表数据
                pageObj:{
	                pageIndex: this.API.constObj.pageIndex,//当前页码
	                total:0,//数据总数
	                pageSize:this.API.constObj.pageSize,//页大小
                },
                userObject:{},
                multipleSelection: [],
                userVisible: false,//用户信息弹窗的是否显示
                dialogTitle: '添加用户',
                searchForm:{
                	cn:''//用户名称或拼音
				},
				sortUserVisble: false,//排序弹窗
				id: '', //选中的id
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
	            console.log("分页组件传回的分页信息："+JSON.stringify(page_obj));
	            this.pageObj.pageIndex = page_obj.page_index;
	            this.pageObj.pageSize = page_obj.page_size;
				this.getData();
	        },
	        /*
	         * 用户信息组件回调方法--子组件回调数据的方法
	         * @isRefresh {Boolean} 是否需要刷新数据 true=刷新；false=不刷新
	         */
	        UserCallBack(isRefresh){
	            this.userVisible = false;
				if(isRefresh){
					this.getData();	
				}
	        },
            /**
             * 获取列表数据
             */
            getData() {
                this.$axios({
                	loading:{
            			isShow:true,
            			target:'.userManagement'
            		},
            		method:'post',
                	url:this.API.findUserInfo, 
                	data:{
                		'orgId':'',//用户组id
	                	'cn':this.searchForm.cn,
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
                	console.log("查询查借用户信息列表="+err);
                	this.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
            },
            /*
             * 查询
             */
            search() {
            	this.pageObj.pageIndex = this.API.constObj.pageIndex;
                this.getData();
            },
            /*
             * 添加用户 
             */
            addUser(){
            	this.userObject ={};
            	this.dialogTitle = "添加用户";
            	this.userVisible=true;
            },
            /*
             * 编辑
             */
            handleEdit(index, row) {
            	this.userObject = this.tableData[index];
                if(this.userObject.uIssystem){//是否系统内置用户
                	this.$message({
			            type: 'warning',
			            message: '系统内置用户不能编辑!'
				    });
				    return;
                }
            	this.dialogTitle = "编辑用户信息";
            	this.userVisible=true;
            },
            /*
             * 删除用户
             */
            handleDelete(index, row) {
                let item = this.tableData[index];
                if(item.uIssystem){//是否系统内置用户
                	this.$message({
			            type: 'warning',
			            message: '系统内置用户不能删除!'
				    });
				    return;
                }
                let self = this;
				this.$confirm('确定要删除该用户吗?', '操作提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          self.delUser(item.id,self);//请求后台进行删除
		        }).catch(() => {
         
		        });
            },
            /*
             * 请求后台进行删除操作
             * @id {String} 需要操作的数据id
             * @self {Obj} this对象
             */
            delUser(id,self){
                self.$axios({
                	loading:{
            			isShow:true,
            			target:'.userManagement'
            		},
            		method:'get',
                	url:self.API.deleteUser, 
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
			},
			// 排序
			sortUser(){
				this.sortUserVisble = true;
			},
			// 排序弹窗回调数据
			sortUserCall(isRefresh){
				this.sortUserVisble = false;
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
    .userManagement{
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
