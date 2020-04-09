<template>
    <div class="pageInMenuList">
    	<el-row>
    		<el-button type="primary" @click="addPage">添加</el-button>
    	</el-row>
		<el-row>
			<el-col :span="24">
	            <el-table :data="tableData" border class="table" ref="multipleTable" height="300">
	                <el-table-column type="index" label="序号" align="center" width="50">
						<template slot-scope="scope"> {{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}} </template>
					</el-table-column>
	                <el-table-column prop="name" label="页面名" width="150"  align="center"></el-table-column>
	                <el-table-column prop="code" label="编号" width="150"  align="center"></el-table-column>
	                <el-table-column prop="path" label="路径" min-width="200" align="center" show-overflow-tooltip></el-table-column>
	                <el-table-column label="操作" width="120" align="center">
	                    <template slot-scope="scope">
	                        <el-button type="text"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	                        <el-button type="text"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	                    </template>
	               	</el-table-column>
	            </el-table>
	            <div class="pagination">
	                <Pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></Pagination>
	            </div>
			</el-col>
		</el-row>
        <!--新增和编辑子页面弹出框 -->
       	<el-dialog class="outDialog" :title='dialogTitle' :visible.sync="pageVisible" width="30%" append-to-body v-if="pageVisible"  :close-on-click-modal="false">
       		<AddOrEditPage :menuObj="menuObject" @AddOrEditPageCallBack="AddOrEditPageCallBack"></AddOrEditPage>
       	</el-dialog>
    </div>
</template>

<script>
	import Pagination from '../../components/Pagination.vue';
	import AddOrEditPage from './AddOrEditPage.vue';
    export default {
        name: 'PageInMenuList',//菜单下的子页面列表
        props:['menuObject'],//选中的菜单对象
	    components:{
	        Pagination,//分页组件
	        AddOrEditPage//子页面新增或者编辑组件
	    },
        data() {
            return {
                tableData: [],//列表数据
                pageObj:{
	                pageIndex: this.API.constObj.pageIndex,//当前页码
	                total:0,//数据总数
	                pageSize:this.API.constObj.pageSize,//页大小
                },
                chioceMenuId:'',//选中的菜单id
                menuObject:{},
                pageVisible: false,//子页面信息弹窗的是否显示
                dialogTitle: '添加子页面'
            }
        },
        created() {
        	console.log(2);
        	this.chioceMenuId = this.menuObject.id;
        	this.getData();
        },
        mounted(){

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
	         * 子页面信息组件回调方法--子组件回调数据的方法
	         * @isRefresh {Boolean} 是否需要刷新数据 true=刷新；false=不刷新
	         */
	        AddOrEditPageCallBack(isRefresh){
	            this.pageVisible = false;
				if(isRefresh){
					this.getData();	
				}
	        },
            /**
             * 获取列表数据
             */
            getData() {
                this.$axios({
            		method:'get',
                	url:this.API.menuChildsPage, 
                	params:{
	                	'menuid':this.chioceMenuId,
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
                	console.log("查询查借子页面信息列表="+err);
                	this.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
            },
            /*
             * 添加子页面 
             */
            addPage(){
            	this.menuObject ={};
            	this.menuObject['menuId'] = this.chioceMenuId;
            	this.dialogTitle = "添加子页面";
            	this.pageVisible=true;
            },
            /*
             * 编辑
             */
            handleEdit(index, row) {
            	this.menuObject = this.tableData[index];
            	this.menuObject['menuId'] = this.chioceMenuId;
            	this.dialogTitle = "编辑子页面";
            	this.pageVisible=true;
            },
            /*
             * 删除菜单
             */
            handleDelete(index, row) {
                let item = this.tableData[index];
                let self = this;
				this.$confirm('确定要删除该子页面吗?', '操作提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          self.delPage(item.id,self);//请求后台进行删除
		        }).catch(() => {
    
		        });
            },
            /*
             * 请求后台进行删除操作
             * @id {String} 需要操作的数据id
             * @self {Obj} this对象
             */
            delPage(id,self){
                self.$axios({
            		method:'get',
                	url:self.API.deleteMenuChilds, 
                	params:{
                		id:id
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	self.$message({
				            type: 'success',
				            message: '子页面菜单删除成功!'
				        });
				        self.getData();//重新获取数据
                    }else{
			          	self.$message({
				            type: 'error',
				            message: '子页面删除失败，请刷新重试！'
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
    .pageInMenuList{
        width: 100%;
        font-size: 14px;
        .el-row{
        	margin-bottom: 15px;
        }
    }
    .gray{
        color: #dcdfe6;
    }
    .red{
        color: #ff0000;
    }
</style>
