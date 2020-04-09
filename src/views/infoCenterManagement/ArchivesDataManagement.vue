<template>
    <div class="archivesDataManagement">
        <div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>信息中心管理</el-breadcrumb-item>
			  <el-breadcrumb-item>档案材料类别维护</el-breadcrumb-item>
			  <el-breadcrumb-item>档案材料类别列表</el-breadcrumb-item>
			</el-breadcrumb>
        </div>
        <div class="container">
            <div class="title">
                <div class="left">
                    <el-button type="primary" @click="editArchives">编辑</el-button>
                </div>
            </div>
			<el-row>
                <el-col :span="24">
                    <el-table :data="tableData" border class="table" ref="multipleTable"
                              height="400" highlight-current-row
                              @current-change="currentChange">
                        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                        <el-table-column prop="code" label="编码" width="100"  align="center"></el-table-column>
                        <el-table-column prop="codeno" label="编号" width="100"  align="center"></el-table-column>
                        <el-table-column prop="name" label="名称" min-width="150" align="center" ></el-table-column>
                        <el-table-column prop="describe" label="具体描述" min-width="150"  align="center"></el-table-column>
                        <el-table-column prop="ishitch" label="挂接目录" width="80"  align="center">
                            <template slot-scope="scope">
                                <el-tag v-if="scope.row.ishitch === true" type="success">是</el-tag>
                                <el-tag v-else type="danger">否</el-tag>
                            </template>
                        </el-table-column>
                   </el-table>
                </el-col>
			</el-row>
            <!--修改弹框-->
            <el-dialog :title="title"
                       width="60%"
                       :visible.sync="updateArchivesVisiable"
                       v-if='updateArchivesVisiable'
                       :close-on-click-modal="false">
                <archives-data-update :isEdit="isEdit" :currentRow="currentRow" @updateBack="updateBack"></archives-data-update>
            </el-dialog>
       	</div>
    </div>
</template>

<script>
    import ArchivesDataUpdate from './archivesDataManagement/ArchivesDataUpdate.vue'
    export default {
        name: 'ArchivesDataManagement',//用户管理
	    components:{
            ArchivesDataUpdate
	    },
        data() {
            return {
                tableData: [],//列表数据
                currentRow: '',//选中行数据
                updateArchivesVisiable: false,    //添加、修改数据代码弹框标识
                title:'',     //操作标题
                isEdit:'' //true：编辑，false：添加
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
            /**
             * 获取列表数据
             */
            getData() {
                this.$axios({
                    loading:{
                        isShow:true,//是否显示loading遮罩层
                        target:'.table'//loading遮罩层 添加的dom选择器名称 如：.login or #center
                    },
            		method:'get',
                	url:this.API.quertMaterialType,
                	params:{
                  		isAll:true//true:返回全部； false:返回子目录
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code == "1"){
                    	this.tableData = resData.data;
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
            /**
             * 切换选择单元格事件
             */
            currentChange(currentRow, oldCurrentRow) {
                this.currentRow = currentRow;
            },
            /**
             * 操作成功回调
             * flag 是否刷新数据 true 不刷新
             */
            updateBack(flag){
                this.updateArchivesVisiable=false;
                //取消返回
                if (flag) { return; }
                this.getData();
            },
            /**
             * 编辑材料分类
             */
            editArchives(){
                if(this.currentRow === null || this.currentRow === "") {
                    this.$confirm('请选择一条数据！', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'warning',
                        center: true
                    });
                    return;
                }
                this.title = "编辑档案材料类别";
                this.isEdit = true;
                this.updateArchivesVisiable = true;
            }
        }
    }

</script>
<style  lang="scss" scoped>
    .archivesDataManagement {
        width: 100%;
        font-size: 14px;
        .container {
            border: none;
            border-right: solid 1px #E4E7ED;
        }
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
    .gray{
        color: #dcdfe6;
    }
    .red{
        color: #ff0000;
    }
    .selectedRow{
    	border:solid 1px blue;
    }
</style>
