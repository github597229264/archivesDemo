<template>
  <!-- 工作常用表 -->
  <el-container class="workCom-form-container">
    <el-header class="my-header" style="height: 45px;">工作常用表</el-header>
    <el-main>
      <div class="workCom-form-left">
        <div class="workCom-form-left-title">
          <el-button type="primary" size="mini" @click="addTree">添加</el-button>
          <el-button type="primary" size="mini" @click="editTree">编辑</el-button>
          <el-button type="danger" size="mini" @click="delTree">删除</el-button>
        </div>
        <div class="workCom-tree-content">
          <workComTreeContent ref="workFormTreeContent" @comTreeCall="comTreeCall"></workComTreeContent>
        </div>
      </div>
      <div class="workCom-form-right">
        <div class="workCom-form-right-title">
          <div>
            <el-button type="primary" size="mini" @click="addTable">添加</el-button>
            <el-button type="primary" size="mini" @click="editTable">编辑</el-button>
            <el-button type="danger" size="mini" @click="delTable">删除</el-button>
          </div>
          <div>
            <el-input class="myinput" v-model="title" placeholder="常用表名称"></el-input>
            <el-button type="primary" size="mini" @click="search">查询</el-button>
          </div>
        </div>
        <!-- 表格 -->
        <el-table ref="table" class="table" :height="tableHeight" highlight-current-row
        :data="workComFormList" style="width: 100%;height: 100%;" @row-click="clickRow" border >
          <el-table-column prop="rowNo" label="序号" align="center" width="80">
            <template slot-scope="scope">{{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="title" label="常用表名称" align="center"></el-table-column>
          <el-table-column prop="comments" label="简要说明" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="material_page">
          <pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize"
          @PageTurning="PageTurning" ></pagination>
        </div>
        <!-- 左侧树新增、编辑弹窗 -->
        <el-dialog :title="dialogTitle" :visible.sync="workComFormTreeVisble" v-if="workComFormTreeVisble">
          <WorkComtreeForm :isEdit="isEdit" :workComObj="workComObj" @workComCall="workComCall"></WorkComtreeForm>
        </el-dialog>
        <!-- 右侧表格新增、编辑弹窗 -->
        <el-dialog :title="dialogGridTitle" :visible.sync="workComTableVisble" v-if="workComTableVisble">
          <workComTable :isEditTable="isEditTable" :workComObj="workComObj" :selectColumn="selectColumn" @workComTableCall="workComTableCall"></workComTable>
        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import pagination from "../../../components/Pagination.vue";
import workComTreeContent from './WorkComTreeContent.vue';//树组件
import WorkComtreeForm from "./WorkComtreeForm.vue" //左侧新增、编辑弹窗组件
import workComTable from './WorkComTable.vue' //右侧表格新增、编辑弹窗组件

export default {
  name: "workComForm",
  components: { pagination, WorkComtreeForm, workComTreeContent, workComTable},
  props: [""],

  data() {
    return {
      dialogTitle: "添加", //弹窗标题
      workComFormTreeVisble: false, //左侧树新增、编辑弹窗，默认关闭
      pageObj: {
        pageIndex: this.API.constObj.pageIndex, //当前页码
        total: 0, //数据总数
        pageSize: this.API.constObj.pageSize //页大小
      },
      workComObj:{}, //选中的工作常用表左侧栏
      tableHeight: 0, //表格初始化高度
      dialogGridTitle:"添加", //表格弹窗标题
      selectColumn: "", //选中某一行的数据
      workComFormList: [], //表格数据
      workComTableVisble: false, //右侧表格新增、编辑弹窗，默认关闭
      title:'', //工作常用表查询输入
      isEdit: false, //false为新增，true为编辑
      isEditTable: false //false为新增，true为编辑
    };
  },

  //监听属性 类似于data概念
  computed: {},

  //监控data中的数据变化
  watch: {
    workComFormList:{
      handler:function(newVal){
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 30;
      }
    }
  },

  //方法集合
  methods: {
    comTreeCall(returnObj){//左侧树组件回调数据
      // console.log(returnObj);
      this.workComObj = returnObj;
      this.getData();
    },
    handleCurrentChange(val) { // 分页导航
      this.pageObj.pageIndex = val;
      this.getData();
    },
    PageTurning(page_obj) {  //分页组件回调方法
      console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
      this.pageObj.pageIndex = page_obj.page_index;
      this.pageObj.pageSize = page_obj.page_size;
      this.getData();
    },
    clickRow(row) { //选中某一条数据
      this.selectColumn = row;
    },
    search() {//查询
      this.pageObj.pageIndex = this.API.constObj.pageIndex; 
      this.getData();
    },
    addTree(){
      this.dialogTitle = "添加";
      this.isEdit = false;
      this.workComFormTreeVisble = true;
    },
    editTree(){ 
      this.dialogTitle = "编辑";
      this.isEdit = true;
      this.workComFormTreeVisble = true;
    },
    delTree(){ //删除树节点
      this.$confirm("确定删除选中记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
          this.deleteTreeFromNet();
      }).catch((err) => {
        console.log("连接错误" + err);
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    deleteTreeFromNet(){ //请求服务器删除
      this.$axios({
        loading: {
          isShow: true,
          target: '.workCom-tree-content'
        },
        method: 'get',
        url: this.API.deleteBusType,
        params: {
          id: this.workComObj.id
        }
      }).then((res) => {
        var resData = res.data;
        if(resData.code == "1") {
          this.$message({
            type: 'success',
            message: '删除成功！'
          });
          this.$refs.workFormTreeContent.getData();
        } else {
          this.$message({
            type: 'error',
            message: '操作失败，请刷新！'
          });
        }
      }).catch((err)=> {
        this.$message({
          type: 'error',
          message: '请求异常，请检查网络！'
        });
      })
    },
    workComCall(isRefresh) { //左侧树新增、编辑弹窗回调
      this.workComFormTreeVisble = false;
      if(isRefresh) this.$refs.workFormTreeContent.getData();
    },
    getData(){
      this.$axios({
        loading: {
          isShow: true, //是否显示loading遮罩层
          target: ".table" //loading遮罩层 添加的dom选择器名称 如：.login or #center
        },
        method: "post",
        url: this.API.queryActiveFiles,
        data: {
          pageIndex: this.pageObj.pageIndex,
          pageSize: this.pageObj.pageSize,
          businesstypeid: this.workComObj.id, //左侧树结构所属分类id
          title:this.title,
        }
      }).then((res) => {
          var resData = res.data;
          if (resData.code == "1") {
            this.workComFormList = resData.data.list;
            this.pageObj.total = resData.data.total;
          } else {
            this.$message({
              type: "error",
              message: "获取数据失败，请刷新重试！"
            });
          }
        }).catch((err) => {
           this.$message({
              type: "error",
              message: '请求异常，请检查网络！'
            });
        });
    },
    addTable(){ //表格添加
      this.selectColumn = "";
      this.isEditTable = false;
      this.dialogGridTitle = "新增";
      this.workComTableVisble = true;
    },
    editTable(){ //编辑
      if (this.selectColumn == "") {
        this.$confirm("请选择一条数据！", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning",
          center: true
        });
        return;
      }
      this.isEditTable = true;
      this.dialogGridTitle = "编辑";
      this.workComTableVisble = true;
    },
    delTable(){ //删除表格数据
      if (this.selectColumn == "") {
        this.$confirm("请选择一条数据！", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning",
          center: true
        });
        return;
      }
      this.$confirm("确定删除选中记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
          this.deleteFromNet();
      }).catch(() => {
          this.selectColumn = "";
          this.$message({
            type: "info",
            message: "已取消"
          });
      });
    },
    deleteFromNet(){ //从服务器删除
      // console.log(this.selectColumn.id);
      this.$axios({
        loading: {
          isShow: true,
          target: '.table'
        },
        method: 'get',
        url: this.API.deleteActiveFiles,
        params: {
          id: this.selectColumn.id
        }
      }).then((res) => {
        var resData = res.data;
        if(resData.code == "1") {
          this.selectColumn = "";
						this.$message({
							message: '删除成功！',
							type: 'success'
						});
          this.getData();
        } else {
          this.$message({
            type: 'error',
            message: '获取失败，请刷新！'
          });
        }
      }).catch((err)=> {
        this.$message({
          type: 'error',
          message: '请求异常，请检查网络！'
        });
      })
    },
    workComTableCall(isRefresh){ //右侧表格弹窗组件回调数据
      this.workComTableVisble = false;
      if(isRefresh){
        this.getData();
      }
    }
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},

  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},

  beforeCreate() {}, //生命周期 - 创建之前

  beforeMount() {}, //生命周期 - 挂载之前

  beforeUpdate() {}, //生命周期 - 更新之前

  updated() {}, //生命周期 - 更新之后

  beforeDestroy() {}, //生命周期 - 销毁之前

  destroyed() {}, //生命周期 - 销毁完成

  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发

}
</script>

<style lang="scss" scoped>
.workCom-form-container {
  height: 100%;
  .my-header {
    padding-top: 15px;
  }
  .el-main {
    font-size: 13px;
    background-color: #fff;
    height: 100%;
    display: flex;
    .workCom-form-left {
      width: 25%;
      .workCom-form-left-title {
        margin-bottom: 10px;
      }
    }
    .workCom-form-right {
      width: 75%;
      .workCom-form-right-title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        .el-input {
          width: 180px;
          padding: 0 10px;
        }
      }
      .el-table__body tr.current-row > td {
        background: #dcebfa !important;
        color: #606266;
      }
      .material_page {
        margin-top: 10px;
        text-align: right;
      }
    }
  }
  .el-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 !important;
    transform: translate(-50%, -50%);
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
    display: flex;
    flex-direction: column;
    background-color: #fff;
    .el-dialog__body {
      overflow: auto;
    }
  }
}
</style>