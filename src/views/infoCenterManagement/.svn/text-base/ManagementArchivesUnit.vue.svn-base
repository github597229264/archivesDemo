<template>
	<div class="managementArchivesUnit">
        <div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>信息中心管理</el-breadcrumb-item>
			  <el-breadcrumb-item>管档单位维护</el-breadcrumb-item>
			  <el-breadcrumb-item>管档单位列表</el-breadcrumb-item>
			</el-breadcrumb>
        </div>
        <el-container>
            <el-main>
                <div class="manageContainer">
                    <div class="title">
                        <div class="left">
                            <el-button type="primary" @click="addManagementArch">添加</el-button>
                            <el-button type="primary" @click="editManagementArch">编辑</el-button>
                            <el-button type="danger" @click="delManagementArch">删除</el-button>
                            <el-button type="primary" @click="sortManagementArch">排序</el-button>
                            <el-button type="primary" @click="changeStatusManagementArch(true)">启用</el-button>
                            <el-button type="primary" @click="changeStatusManagementArch(false)">禁用</el-button>
                            <el-button type="primary" @click="initPrivilegeData">权限数据初始化</el-button>
                        </div>
                    </div>
                    <el-table :data="data" border ref="multipleTable" height="400"
                              row-key="id" default-expand-all class="table"
                              highlight-current-row @current-change="currentChange">
                        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                        <el-table-column prop="title" label="名称"  align="left"></el-table-column>
                        <el-table-column prop="code" label="编码"  align="center"></el-table-column>
                        <el-table-column prop="levelvalue" label="级别" align="center"></el-table-column>
                        <el-table-column label="是否启用" align="center">
                            <template slot-scope="scope">
                                <el-tag v-if="scope.row.isenable" type="success">是</el-tag>
                                <el-tag v-else type="danger">否</el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!--新增、修改弹框-->
                <el-dialog :title="title"
                           width="60%"
                           :visible.sync="updateArchiveVisiable"
                           v-if='updateArchiveVisiable'
                           :close-on-click-modal="false">
                    <update-management-arch :isEdit="isEdit" :currentRow="currentRow" @addback="addBack"></update-management-arch>
                </el-dialog>
                <!--排序弹框-->
                <el-dialog title="排序"
                           width="60%"
                           :visible.sync="sortArchiveVisiable"
                           v-if='sortArchiveVisiable'
                           :close-on-click-modal="false">
                    <sort-management-arch :pid="currentRow.id" @sortBack="sortBack"></sort-management-arch>
                </el-dialog>
            </el-main>
        </el-container>
	</div>
</template>

<script>
    import UpdateManagementArch from './managementArchivesUnit/UpdateManagementArch.vue'
    import SortManagementArch from './managementArchivesUnit/SortManagementArch.vue'

	export default {
		name: 'ManagementArchivesUnit', //管档单位维护
		components: {
            UpdateManagementArch,   //新增或者修改管档单位
            SortManagementArch      //管档单位排序
		},
		data() {
			return {
				data: [], //表格数据
                currentRow: "",//选中行数据
                updateArchiveVisiable: false,    //添加、修改管档单位弹框标识
                title:'',     //操作标题
                isEdit: '', //true：编辑，false：添加
                sortArchiveVisiable: false,
			}
		},
		created() {
			this.getData();
		},
		mounted() { },
		methods: {
			/*
			 * 获取管档单位列表数据 
			 */
			getData() {
				this.$axios({
                    loading:{
                        isShow:true,//是否显示loading遮罩层
                        target:'.table'//loading遮罩层 添加的dom选择器名称 如：.login or #center
                    },
					method: 'get',
					url: this.API.findAllOrganization
				}).then((res) => {
					var resData = res.data;
					if(resData.code === "1") {
                        this.data = this.commonFun.toTreeDataNormal(resData.data,{
							childKey:'id',
							fatherKey:'parentid'
						});
					} else {
                        this.$message({
							type: 'error',
							message: '获取管档单位列表失败，请刷新重试！'
						});
					}
				}).catch((err) =>{
                    this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
            /**
             * 切换选择单元格事件
             */
            currentChange(currentRow) {
                this.currentRow = currentRow;
            },
            /**
             * 操作成功回调
             * flag true 不刷新页面
             */
            addBack(flag){
                this.updateArchiveVisiable = false;
                //取消返回
                if (flag) { return; }
                this.getData();
                this.$refs.multipleTable.setCurrentRow("");
            },
            /**
             * 添加
             */
            addManagementArch(){
                this.title = "添加管档单位";
                this.isEdit = false;
                this.updateArchiveVisiable = true;
            },
            /**
             * 修改
             */
            editManagementArch(){
                if(this.currentRow === null || this.currentRow === "") {
                    this.$confirm('请选择一条数据！', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'warning',
                        center: true
                    });
                    return;
                }
                this.title = "编辑管档单位";
                this.isEdit = true;
                this.updateArchiveVisiable = true;
            },
            /**
             * 修改状态
             */
            changeStatusManagementArch(status){
                if(this.currentRow === null || this.currentRow === "") {
                    this.$confirm('请选择一条数据！', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'warning',
                        center: true
                    });
                    return;
                }
                this.$axios({
                    loading:{
                        isShow:true,//是否显示loading遮罩层
                        target:'.manageContainer'//loading遮罩层 添加的dom选择器名称 如：.login or #center
                    },
                    method: 'post',
                    url: this.API.changeOrgStatusOrganization,
                    data: {
                        'id': this.currentRow.id,
                        'status': status
                    }
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code === "1") {
                        this.$message({
                            message: resData.message,
                            type: 'success'
                        });
                        this.getData();
                    } else {
                        this.$message({
                            type: 'error',
                            message: resData.message
                        });
                    }
                }).catch(function(err) {
                    console.log("连接错误" + err);
                })
            },
            /**
             * 删除数据代码
             */
            delManagementArch(){
                if(this.currentRow === null || this.currentRow === "") {
                    this.$confirm('请选择一条数据！', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'warning',
                        center: true
                    });
                    return;
                }
                if(this.currentRow.uIssystem) {
                    this.$confirm('系统内置不能删除！', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'warning',
                        center: true
                    });
                    return;
                }
                if(this.currentRow.isenable) {
                    this.$confirm('启用状态不能删除！', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'warning',
                        center: true
                    });
                    return;
                }
                if (typeof this.currentRow.children !== 'undefined'){
                    this.$confirm('存在子节点不能删除！', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'warning',
                        center: true
                    });
                    return;
                }
                this.$confirm('您确认删除这条数据吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delDataConfirm();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            delDataConfirm(){
                this.$axios({
                    loading:{
                        isShow:true,//是否显示loading遮罩层
                        target:'.manageContainer'//loading遮罩层 添加的dom选择器名称 如：.login or #center
                    },
                    method: 'post',
                    url: this.API.delOrganization,
                    data: {
                        'id': this.currentRow.id
                    }
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code === "1") {
                        this.$message({
                            message: resData.message,
                            type: 'success'
                        });
                        this.getData();
                    } else {
                        this.$message({
                            type: 'error',
                            message: resData.message
                        });
                    }
                }).catch(function(err) {
                    console.log("连接错误" + err);
                })
            },
            /**
             * 排序按钮
             */
            sortManagementArch(){
                if (this.currentRow === null || this.currentRow === ""){
                    if (this.data.length < 3){
                        this.$message('少于三条数据，不需要排序');
                        return;
                    }
                } else{
                    if (typeof this.currentRow.children === 'undefined' || this.currentRow.children.length < 3){
                        this.$message('少于三条数据，不需要排序');
                        return;
                    }
                }
                this.sortArchiveVisiable = true;
            },
            /**
             * 操作成功回调
             * flag true 不刷新页面
             */
            sortBack(flag){
                this.sortArchiveVisiable = false;
                //取消返回
                if (flag) { return; }
                this.getData();
            },
            /**
             * 权限数据初始化
             */
            initPrivilegeData(){
                if(this.currentRow === null || this.currentRow === "") {
                    this.$confirm('请选择一条数据！', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'warning',
                        center: true
                    });
                    return;
                }

                this.$axios({
                    loading:{
                        isShow:true,//是否显示loading遮罩层
                        target:'.manageContainer'//loading遮罩层 添加的dom选择器名称 如：.login or #center
                    },
                    method: 'post',
                    url: this.API.initPrivilegeData,
                    data: {
                        'id': this.currentRow.id
                    }
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code === "1") {
                        this.$message({
                            message: resData.message,
                            type: 'success'
                        });
                        this.getData();
                    } else {
                        this.$message({
                            type: 'error',
                            message: resData.message
                        });
                    }
                }).catch(function(err) {
                    console.log("连接错误" + err);
                })
            }
		}
	}
</script>
<style lang="scss" scoped>
    .managementArchivesUnit /deep/ .el-table__expand-icon{
        margin-right: 10px;
        float: left;
    }
    .table /deep/ .el-table__body-wrapper{
        overflow-y: auto;
    }
    .el-main{
        padding: 0;
    }
	.managementArchivesUnit {
		width: 100%;
        font-size: 14px;
		.manageContainer{
            border: none;
            border-right: solid 1px #E4E7ED;
            background: #FFFFFF;
            padding: 30px;
		}
        .title {
            display: flex;
            justify-content: space-between;
            padding-bottom: 10px;
            .left {
                display: flex;
            }
            .right {
                display: flex;
                .el-button {
                    margin-left: 10px;
                }
            }
        }
	}
</style>
