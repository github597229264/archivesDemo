<template>
    <div class="usersInRole">
            <el-form :inline="true" :model="searchForm" class="demo-form-inline">
			  <el-form-item>
			    <el-button type="primary" icon="el-icon-plus" @click="showAddUser">添加人员</el-button>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" icon="el-icon-delete" @click="batchDeleteUsers">批量删除</el-button>
			  </el-form-item>
			  <el-form-item>
			    <el-input v-model="searchForm.cn" placeholder="输入姓名或账户"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" icon="el-icon-search" @click="search" >查询</el-button>
			  </el-form-item>
			</el-form>
			<el-row>
			<el-col :span="24">
	            <el-table :data="tableData" border class="table" ref="multipleTable" height="200"  @selection-change="handleSelectionChange">
	                <el-table-column type="selection" width="55"></el-table-column>
	                <el-table-column type="index" label="序号" align="center" width="50">
						<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
					</el-table-column>
	                <el-table-column prop="cn" label="姓名" width="150"  align="center"></el-table-column>
	                <el-table-column prop="uid" label="账户" width="150"  align="center"></el-table-column>
	                <el-table-column prop="station" label="岗位" min-width="130" align="center" ></el-table-column>
	            </el-table>
	            <div class="pagination">
	                <Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
	            </div>
			</el-col>
			</el-row>
        <!--弹出框 -->
       	<el-dialog class="outDialog" title='添加人员' :visible.sync="selectUserVisible" v-if="selectUserVisible" width="60%" append-to-body   :close-on-click-modal="false">
       		<SelectUser :roleInfo="roleObj" @SelectUserCall="SelectUserCall"></SelectUser>
       	</el-dialog>
    </div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import SelectUser from '../../components/SelectUser.vue';
    export default {
        name: 'UsersInRole',//该角色下的所有用户--分页
        props:['roleObj'],//选中后的角色对象
	    components:{
	        Pagination,//分页组件
	        SelectUser //用户列表(选择按照用户组筛选用户)
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
                chioceUserList: [],//选中的用户信息
                selectUserVisible: false,//用户列表(选择按照用户组筛选用户)弹窗的是否显示
                searchForm:{
                	cn:''//用户名称或拼音
                }
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
	         * 用户信息组件回调方法--子组件回调数据的方法
	         * @params {Array} list 选中的用户
	         */
	        SelectUserCall(list){
	        	this.selectUserVisible = false;
				let idString = this.concatParams(list,'id');
		        this.batchAddUsers(idString);//请求后台进行删除
	        },
			/*
			 * 表格选中切换赋值 
			 */
			handleSelectionChange(val) {
				this.chioceUserList = val;
			},
			/**
			 * 批量删除用户
			 */
			batchDeleteUsers(){
				var chioceList = this.chioceUserList;
				if(chioceList.length === 0) {
					this.$message({
						message: '请至少选中一条数据!',
						type: 'warning'
					});
					return;
				}
				this.$confirm('确定要批量删除选中的用户吗?', '操作提示', {
		        	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	type: 'warning'
		        }).then(() => {
		        	let idString = this.concatParams(this.chioceUserList,'userId');
		          	this.delUser(idString);//请求后台进行删除
		        }).catch(() => {
       
		        });
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
            showAddUser(){
            	this.selectUserVisible=true;
            },
			/**
			 * 拼接选择的用户组id
			 * @param {Array} newArray 数据源
			 * @param {String} idKey 用户id的key
			 */
			concatParams(newArray,idKey){
				let sId='';
				newArray.forEach(function(item, index, array){
					if(index == array.length-1){
						sId +=item[idKey];
					}else{
						sId +=item[idKey]+",";
					}
				})
				return sId;
			},
            /**
             * 获取列表数据
             */
            getData() {
                this.$axios({
               		loading:{
            			isShow:true,
            			target:'.usersInRole'
            		},
            		method:'post',
                	url:this.API.findCorrespondingUserPage, 
                	data:{
                		'id':this.roleObj.id,//角色id
	                	'cn':this.searchForm.cn,//姓名或账户
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
             * 请求后台进行批量添加用户操作
             * @sUserGroupId {String} 用户组id字符串 ,多个以逗号拼接
             */
            batchAddUsers(sUserGroupId){
                this.$axios({
               		loading:{
            			isShow:true,
            			target:'.usersInRole'
            		},
            		method:'post',
                	url:this.API.bathAddPowerUserRoles, 
                	data:{
                		id:this.roleObj.id,
                		userIds:sUserGroupId
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.$message({
				            type: 'success',
				            message: '批量添加用户成功!'
				        });
				        this.search();//重新获取数据
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '批量添加用户失败，请刷新重试！'
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
             * 请求后台进行删除操作
             * @sUserGroupId {String} 用户组id字符串 ,多个以逗号拼接
             */
            delUser(sUserGroupId){
                this.$axios({
               		loading:{
            			isShow:true,
            			target:'.usersInRole'
            		},
            		method:'post',
                	url:this.API.bathDeletePowerUserRoles, 
                	data:{
                		id:this.roleObj.id,
                		userIds:sUserGroupId
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	this.$message({
				            type: 'success',
				            message: '用户批量删除成功!'
				        });
				        this.search();//重新获取数据
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '批量删除用户失败，请刷新重试！'
			          	});
                    }
                }).catch((err) => {
                	this.$message({
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
    .usersInRole{
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
