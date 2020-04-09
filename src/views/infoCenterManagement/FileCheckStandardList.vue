<template>
    <div class="fileCheckStandardList">
        <div class="container">
            <div class="title">
                <div class="left">
                    <el-button type="primary" @click="editCheckStandard">编辑</el-button>
                </div>
            </div>
            <el-row>
	            <el-table :data="tableData" border class="table"
                          ref="multipleTable" height="400"
                          highlight-current-row @current-change="currentChange">
	                <el-table-column type="index" label="序号" align="center" width="50">
						<template slot-scope="scope"> {{scope.$index+1}} </template>
					</el-table-column>
	                <el-table-column prop="bianhao" label="编号" width="50"  align="center"></el-table-column>
	                <el-table-column prop="scoringitemsandstandards" label="评分标准" min-width="150"  align="center"></el-table-column>
	                <el-table-column prop="scoringmethod" label="评分方法" min-width="130" align="center" ></el-table-column>
	                <el-table-column prop="totalscore" label="总分值" width="60"  align="center"></el-table-column>
	                <el-table-column prop="danxiangfujue" label="单项否决" width="70"  align="center">
	                	<template slot-scope="scope">
							<el-tag v-if="scope.row.isdictatorship ==true" type="success">是</el-tag>
							<el-tag v-else type="danger">否</el-tag>
						</template>
	                </el-table-column>
	            </el-table>
            </el-row>
            <!--修改弹框-->
            <el-dialog :title="title"
                       width="60%"
                       :visible.sync="updateCheckStandardVisiable"
                       v-if='updateCheckStandardVisiable'
                       :close-on-click-modal="false">
                <check-standard-update :isEdit="isEdit" :currentRow="currentRow" @updateBack="updateBack"></check-standard-update>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import CheckStandardUpdate from './fileCheckStandardManagement/CheckStandardUpdate.vue'
    export default {
        name: 'FileCheckStandardList',//用户管理
        props:['archivesTypeId'],//档案类型id
	    components:{
	        CheckStandardUpdate//档案审核标准修改
	    },
        data() {
            return {
                tableData: [],//列表数据
                fileTypeId:'',//档案类型id
                currentRow: '',//选中行数据
                updateCheckStandardVisiable: false,    //添加、修改数据代码弹框标识
                title:'',     //操作标题
                isEdit:'' //true：编辑，false：添加
            }
        },
        created() {
        },
        mounted(){
        	this.fileTypeId = this.archivesTypeId;
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
                	url:this.API.findAll, 
                	params:{
	                	id:this.fileTypeId
                	}
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
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
                this.updateCheckStandardVisiable=false;
                //取消返回
                if (flag) { return; }
                this.getData();
            },
            /**
             * 编辑档案审核标准
             */
            editCheckStandard(){
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
                this.updateCheckStandardVisiable = true;
            }
        }
    }

</script>
<style  lang="scss" scoped>
    .fileCheckStandardList{
        width: 100%;
        font-size: 14px;
        .container {
            padding: 10px;
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
</style>
