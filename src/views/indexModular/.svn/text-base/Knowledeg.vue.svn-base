<template>
    <div class="knowlwdge-container">
        <div class="left">
            <konwledgebaseTree ref="knowledgeBaseTree" @baseTreeCall="baseTreeCall"></konwledgebaseTree>
        </div>
        <div class="right">
            <div class="knowledge-content">
                <!-- 表格 -->
                <el-table ref="table" class="table" :height="tableHeight" highlight-current-row
                :data="knowledgeData" style="width: 100%;" @row-click="clickRow" border>
                    <el-table-column prop="operation" label="浏览" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="browse(scope.row,scope.$index)">浏览</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="标题" align="center"></el-table-column>
                    <el-table-column prop="" label="说明" align="center"></el-table-column>
                    <el-table-column prop="" label="发布时间" align="center"></el-table-column>
                </el-table>

                <!-- 分页 -->
                <div class="material_page">
                    <pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total"
                    :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
                </div>
            </div>
        </div>
        <!-- 浏览弹窗 -->
        <el-dialog title="浏览"  width="60%" :visible.sync="browse_show" v-if='browse_show' :close-on-click-modal="false" append-to-body>
            <knowledgeBrowse></knowledgeBrowse>
        </el-dialog>
    </div>
</template>

<script>
import pagination from "../../components/Pagination.vue"; //分页
import knowledgeBrowse from "./knowledgeBrowse.vue";//浏览
import konwledgebaseTree from '../systemMaintenance/benchAndKnowledgeBase/KonwledgebaseTree';// 左侧树组件

export default {
    name:"knowlwdge",
    //import引入的组件需要注入到对象中才能使用
    components: {
        pagination,
        knowledgeBrowse,
        konwledgebaseTree
    },
    props:[""],

    data() {
        return {
            pageObj: {
                pageIndex: this.API.constObj.pageIndex, //当前页码
                total: 0, //数据总数
                pageSize: this.API.constObj.pageSize, //页大小
            },
            tableHeight: 0, //表格高度
            knowledgeData:[], //表格数据
            browse_show: false,//浏览弹窗
        };
    },

    //监听属性 类似于data概念
    computed: {},

    //监控data中的数据变化
    watch: {
        knowledgeData:{
            handler:function(newVal){
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 41;
            }
        },
    },

    //方法集合
    methods: {
        //分页组件回调方法
        PageTurning(page_obj) {
            this.pageObj.pageIndex = page_obj.page_index;
            this.pageObj.pageSize = page_obj.page_size;
            this.getData(); //系统通知列表
        },
        // 浏览
        browse(row,index){
            this.selectItem = Object.assign({}, row);
            this.browse_show = true;
        },
        getData(){
            this.$axios({
                loading: {
                    isShow: true, //是否显示loading遮罩层
                    target: ".knowlwdge-container" //loading遮罩层 添加的dom选择器名称 如：.login or #center
                },
                method: "post",
                // url: this.API.queryPWDMenusDetails,
                data: {
                    pageIndex: this.pageObj.pageIndex,
                    pageSize: this.pageObj.pageSize,
                }
            }).then((res) => {
                var resData = res.data;
                if (resData.code == "1") {
                    // this.detaileTable = resData.data.list;
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
        },
        // 选中一行
        clickRow(row){
            this.selectItem = row
        },
        // 树组件回调数据
        baseTreeCall(returnObj){ 
            console.log(returnObj);
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
    .knowlwdge-container{
        display: flex;
        justify-content: space-between;
        .left{ width: 25%;}
        .right{}
    }
</style>