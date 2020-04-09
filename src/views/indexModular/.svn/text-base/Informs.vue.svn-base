<template>
    <!-- 系统通知弹窗 -->
    <div class="informs-container">
        <div class="informs-title">
            <div></div>
            <div class="right">
                <el-input placeholder="输入标题" v-model="title"></el-input>
                <el-button type="primary" @click="search">查询</el-button>
            </div>
        </div>
        <div class="informs-content">
            <!-- 表格 -->
            <el-table ref="table" class="table" :height="tableHeight" highlight-current-row
            :data="informsData" style="width: 100%;" @row-click="clickRow" border>
                <el-table-column label="序号" align="center" width="60">
                    <template slot-scope="scope">{{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
                </el-table-column>
                <el-table-column prop="operation" label="浏览" align="center" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" @click="browse(scope.row,scope.$index)">浏览</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题" align="center"></el-table-column>
                <el-table-column prop="comments" label="简要说明" align="center"></el-table-column>
                <el-table-column prop="ispublic" label="是否发布" align="center">
                    <template slot-scope="scope">
                    <span v-if="scope.row.ispublic === 1">是</span>
                    <span v-else-if="scope.row.ispublic === 0">否</span>
                    <span v-else></span>
                    </template>
                </el-table-column>
                <el-table-column prop="uCreatedate" label="发布时间" align="center"></el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="material_page">
                <pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total"
                :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
            </div>

            <!-- 浏览弹窗 -->
            <el-dialog title="信息"  width="60%" :visible.sync="browse_show" v-if='browse_show' :close-on-click-modal="false" append-to-body>
                <browse :isCheck="false" :selectItem="selectItem"></browse>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import Pagination from '../../components/Pagination.vue';//分页
import browse from './SystemBrowse.vue';//浏览

export default {
    name:"informs",
    //import引入的组件需要注入到对象中才能使用
    components: {
        Pagination, //分页
        browse,//浏览
    },
    props:["isCheck"],

    data() {
        return {
            title:'',//标题查询
            tableHeight: 0, //表格高度
            informsData:[],//系统通知表格数据源
            browse_show: false,//浏览弹窗
            pageObj: {
                pageIndex: this.API.constObj.pageIndex, //当前页码
                total: 0, //数据总数
                pageSize: this.API.constObj.pageSize, //页大小
            },
            selectItem:"",//选中的表格项
        };
    },

    //监听属性 类似于data概念
    computed: {},

    //监控data中的数据变化
    watch: {
        informsData:{
            handler:function(newVal){
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 41;
            }
        }
    },

    //方法集合
    methods: {
        //分页组件回调方法
        PageTurning(page_obj) {
            this.pageObj.pageIndex = page_obj.page_index;
            this.pageObj.pageSize = page_obj.page_size;
            this.getData(); //系统通知列表
        },
        // 查询
        search(){
            this.pageObj.pageIndex = this.API.constObj.pageIndex;
            this.getData();
        },
        // 浏览
        browse(row,index){
            this.isCheck = false;
            this.selectItem = Object.assign({}, row);
            this.browse_show = true;
        },
        // 点击当前行
        clickRow(row){
            this.selectItem = row;
        },
        // 获取列表信息
        getData(){
            this.$axios({
                loading: {
                    isShow: true, //是否显示loading遮罩层
                    target: ".informs-container" //loading遮罩层 添加的dom选择器名称 如：.login or #center
                },
                method: "post",
                url: this.API.querySysSysMessage,
                data: {
                    pageIndex: this.pageObj.pageIndex,
                    pageSize: this.pageObj.pageSize,
                    title: this.title,
                    ispublic: 1
                }
            }).then((res) => {
                var resData = res.data;
                // console.log(resData);
                if (resData.code == "1") {
                    this.informsData = resData.data.list;
                    this.pageObj.total = resData.data.total;
                } else {
                    this.$message({
                        type: "error",
                        message: "获取数据失败，请刷新重试！"
                    });
                }
            }).catach((err) => {
                this.$message({
                    type: "error",
                    message: "请求异常，请检查网络！"
                });
            })
        }
    },

    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getData();
    },

    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },

    beforeCreate() {}, //生命周期 - 创建之前

    beforeMount() {}, //生命周期 - 挂载之前

    beforeUpdate() {}, //生命周期 - 更新之前

    updated() {}, //生命周期 - 更新之后

    beforeDestroy() {}, //生命周期 - 销毁之前

    destroyed() {}, //生命周期 - 销毁完成

    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发

}

</script>

<style lang="scss" scoped>
.informs-container{
    .informs-title{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        .el-input{ width:180px;}
    }
    .el-table {
		max-height: 57vh;
		overflow: auto;
	}
	
	.material_page {
		margin-top: 10px;
		text-align: right;
	}
}
</style>