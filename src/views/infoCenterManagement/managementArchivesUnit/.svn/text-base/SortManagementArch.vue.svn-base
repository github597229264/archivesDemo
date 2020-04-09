<template>
    <el-container>
        <el-main>
            <div class="title">
                <el-button type="primary" @click="initSort">初始化排序</el-button>
                <el-button type="primary" @click="upData">上移</el-button>
                <el-button type="primary" @click="downData">下移</el-button>
                <el-button type="primary" @click="saveData">保存</el-button>
            </div>
            <el-table :data="data" border ref="multipleTable" height="400" class="table"
                      highlight-current-row @current-change="currentChange"
                      :row-class-name="tableRowClassName">
                <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                <el-table-column prop="code" label="编码"  align="center"></el-table-column>
                <el-table-column prop="title" label="名称"  align="center"></el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "SortManagementArch",
        props : [
            'pid'   //父级id
        ],
        data(){
            return {
                data:[],  //数据
                currentRow: "", //当前选中行
                index: "", //选中数据的下标
            }
        },
        created(){
            this.getData();
        },
        methods:{
            getData() {
                this.$axios({
                    loading:{
                        isShow:true,//是否显示loading遮罩层
                        target:'.table'//loading遮罩层 添加的dom选择器名称 如：.login or #center
                    },
                    method: 'post',
                    url: this.API.orgSortOrganization,
                    data: {
                        pid: this.pid
                    }
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code === "1") {
                        this.data = resData.data;
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
            // 把每一行的索引放进row
            tableRowClassName ({row, rowIndex}) {
                row.index = rowIndex;
            },
            /**
             * 切换选择单元格事件
             */
            currentChange(currentRow) {
                console.log(currentRow);
                this.currentRow = currentRow;
                this.index = currentRow.index;
            },
            //上移
            upData(){
                if(this.currentRow === ""){
                    this.$confirm('请选择一条数据！', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'warning',
                        center: true
                    });
                    return;
                }
                if(this.index > 0) {
                    let upDate = this.data[this.index - 1];
                    this.data.splice(this.index - 1, 1);
                    this.data.splice(this.index, 0, upDate);
                    this.index = this.index - 1;
                } else {
                    this.$message('已经是第一条，不可上移');
                }
            },
            //下移
            downData(){
                if(this.currentRow === ""){
                    this.$confirm('请选择一条数据！', '提示', {
                        confirmButtonText: '确定',
                        showCancelButton: false,
                        type: 'warning',
                        center: true
                    });
                    return;
                }
                if((this.index + 1) === this.data.length) {
                    this.$message('已经是最后一条，不可下移');
                } else {
                    let downDate = this.data[this.index + 1];
                    this.data.splice(this.index + 1, 1);
                    this.data.splice(this.index, 0, downDate);
                    this.index = this.index + 1;
                }
            },
            //保存数据
            saveData(){
                let ids = [];
                this.data.forEach(item => {
                    ids.push(item.id);
                })
                this.$axios({
                    loading:{
                        isShow:true,//是否显示loading遮罩层
                        target:'.table'//loading遮罩层 添加的dom选择器名称 如：.login or #center
                    },
                    method: 'post',
                    url: this.API.sortSaveOrganization,
                    data: {
                        'ids': ids.join(",")
                    }
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code === "1") {
                        this.$message({
                            type: 'success',
                            message: '排序成功！'
                        });
                        this.$emit('sortBack');
                    } else {
                        this.$message({
                            type: 'error',
                            message: '排序失败，请刷新重试！'
                        });
                    }
                }).catch((err) => {
                    this.$message({
                        type: 'error',
                        message: '请求异常，请检查网络！'
                    });
                })
            },
            //初始化排序
            initSort(){
                this.$confirm('您确认初始化排序吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.initSortSubmit();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            initSortSubmit(){
                this.$axios({
                    loading:{
                        isShow:true,//是否显示loading遮罩层
                        target:'.table'//loading遮罩层 添加的dom选择器名称 如：.login or #center
                    },
                    method: 'post',
                    url: this.API.initSortOrganization,
                    data: {
                        'pid': this.pid
                    }
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code === "1") {
                        this.$message({
                            type: 'success',
                            message: '初始化排序成功！'
                        });
                        this.$emit('sortBack');
                    } else {
                        this.$message({
                            type: 'error',
                            message: '初始化排序失败，请刷新重试！'
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

<style lang="scss" scoped>
    .title {
        padding-bottom: 10px;
    }
</style>
