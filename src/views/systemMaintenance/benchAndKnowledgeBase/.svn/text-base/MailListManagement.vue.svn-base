<template>
  <!-- 通讯录管理 -->
  <el-container class="mailList-container">
    <el-header class="my-header" style="height: 45px;">通讯录管理</el-header>
    <el-main>
      <!-- 左边部分 -->
      <div class="left">
        <div class="left-title">
          <el-button type="primary" size="mini" @click="addTree">添加</el-button>
          <el-button type="primary" size="mini" @click="editTree">编辑</el-button>
          <el-button type="danger" size="mini" @click="delTree">删除</el-button>
        </div>
        <div class="mailList-tree-content">
          <mailListTree ref="mailListTree" @mailListTreeCall="mailListTreeCall"></mailListTree>
        </div>
      </div>
      <!-- 右边部分 -->
      <div class="right">
        <div class="right-title">
          <div>
            <el-button type="primary" size="mini" @click="addTable">添加</el-button>
            <el-button type="primary" size="mini" @click="editTable">编辑</el-button>
            <el-button type="danger" size="mini" @click="delTable">删除</el-button>
          </div>
          <div>
            <el-input class="myinput" v-model="name" placeholder="姓名"></el-input>
            <el-button type="primary" size="mini" @click="search">查询</el-button>
          </div>
        </div>
        <!-- 表格 -->
        <el-table ref="table" class="table" :height="tableHeight" highlight-current-row :data="mailListTable" style="width: 100%;" @row-click="clickRow" border>
          <el-table-column prop="rowNo" label="序号" align="center" width="60">
            <template slot-scope="scope">{{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="officetel" label="办公电话" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="mobilephone" label="手机" align="center"></el-table-column>
          <el-table-column prop="mail" label="邮箱" align="center"></el-table-column>
          <el-table-column prop="qq" label="QQ" align="center"></el-table-column>
          <el-table-column prop="address" label="住址" align="center"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="material_page">
          <pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning"></pagination>
        </div>
        <!-- 左侧树新增、编辑弹窗 -->
        <el-dialog :title="dialogTitle" :visible.sync="mailListTreeVisble" v-if="mailListTreeVisble">
          <mailListTreeForm :isEdit="isEdit" :mailListTypeObj="mailListTypeObj" @mailListTreeFormCall="mailListTreeFormCall"></mailListTreeForm>
        </el-dialog>
        <!-- 右侧表格新增、编辑弹窗 -->
        <el-dialog :title="dialogGridTitle" :visible.sync="mailListTableVisble" v-if="mailListTableVisble">
          <mailListTable :isEditTable="isEditTable" :mailListTypeObj="mailListTypeObj" :selectColumn="selectColumn" @mailListTableCall="mailListTableCall"></mailListTable>
        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import pagination from "../../../components/Pagination.vue";
import mailListTree from "./MailListTree.vue"; //树组件
import mailListTreeForm from "./MailListTreeForm.vue"; //左侧新增、编辑弹窗组件
import mailListTable from "./MailListTable.vue"; //右侧表格新增、编辑弹窗组件

export default {
  name: "mailListManagement",
  //import引入的组件需要注入到对象中才能使用
  components: { 
    pagination,
    mailListTree, 
    mailListTreeForm, 
    mailListTable
  },
  props: [""],

  data() {
    return {
      pageObj: {
        pageIndex: this.API.constObj.pageIndex, //当前页码
        total: 0, //数据总数
        pageSize: this.API.constObj.pageSize //页大小
      },
      tableHeight: 0, //表格初始化高度
      dialogTitle: "添加", //弹窗标题
      mailListTypeObj: {}, //默认选中的通讯录类型
      dialogGridTitle: "添加", //表格弹窗标题
      selectColumn: "", //选中某一行的数据
      mailListTable: [], //表格数据
      mailListTreeVisble:false, //左侧树新增、编辑弹窗
      mailListTableVisble: false, //右侧表格新增、编辑弹窗，默认关闭
      name: "", //查询输入
      isEdit: false, //false新增、true编辑
      isEditTable:false,//false新增、true编辑
    };
  },

  //监听属性 类似于data概念
  computed: {},

  //监控data中的数据变化
  watch: {
    mailListTable:{
      handler:function(newVal){
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 30;
      }
    }
  },

  //方法集合
  methods: {
    mailListTreeCall(returnObj) { //左侧树组件回调数据
      console.log(returnObj);
      this.mailListTypeObj = returnObj;
      this.getData();
    },
    handleCurrentChange(val) {  // 分页导航
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
    search() {  //查询
      this.pageObj.pageIndex = this.API.constObj.pageIndex;
      this.getData();
	  },
    addTree() {
      this.dialogTitle = "添加";
      this.isEdit = false;
      this.mailListTreeVisble = true;
    },
    editTree() {
      this.dialogTitle = "编辑";
      this.isEdit = true;
      this.mailListTreeVisble = true;
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
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    deleteTreeFromNet() {  //请求服务器删除树节点
      this.$axios({
        loading: {
          isShow: true,
          target: '.mailList-tree-content'
        },
        method: 'get',
        url: this.API.deleteBusType,
        params: {
          id: this.mailListTypeObj.id
        }
      }).then((res) => {
        var resData = res.data;
        if(resData.code == "1") {
          this.$message({
            type: 'success',
            message: '删除成功！'
          });
          this.$refs.mailListTree.getData();
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
    mailListTreeFormCall(isRefresh) { //左侧树弹窗组件回调数据
      this.mailListTreeVisble = false;
      if (isRefresh){
        this.$refs.mailListTree.getData();
      }
    },
    getData() {
      this.$axios({
        loading: {
          isShow: true, //是否显示loading遮罩层
          target: ".table" //loading遮罩层 添加的dom选择器名称 如：.login or #center
        },
        method: "get",
        url: this.API.querySysAddressList,
        params: {
          pageIndex: this.pageObj.pageIndex,
          pageSize: this.pageObj.pageSize,
          businesstypeid: this.mailListTypeObj.id,
          name: this.name
        }
      }).then((res) => {
          var resData = res.data;
          if (resData.code == "1") {
            this.mailListTable = resData.data.list;
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
    addTable() { //表格添加
      this.selectColumn = "";
      this.dialogGridTitle = "新增";
      this.mailListTableVisble = true;
    },
    editTable() { //编辑
      if (this.selectColumn == "") {
        this.$confirm("请选择一条数据！", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning",
          center: true
        });
        return;
      }
      this.dialogGridTitle = "编辑";
      this.mailListTableVisble = true;
    },
    delTable() { //删除表格数据
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
      })
        .then(() => {
          this.deleteFromNet();
        })
        .catch(() => {
          this.selectColumn = "";
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    deleteFromNet() { //请求服务器删除
      this.$axios({
        loading: {
          isShow: true,
          target: ".table"
        },
        method: "get",
        url: this.API.deleteSysAddress,
        params: {
          id: this.selectColumn.id
        }
      })
        .then(res => {
          var resData = res.data;
          if (resData.code == "1") {
            this.selectColumn = "";
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.getData();
          } else {
            this.$message({
              type: "error",
              message: "获取失败，请刷新！"
            });
          }
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "请求异常，请检查网络！"
          });
        });
    },
    mailListTableCall(isRefresh) {//右侧表格弹窗组件回调数据
      this.mailListTableVisble = false;
      if (isRefresh) this.getData();
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
};
</script>

<style lang="scss" scoped>
.mailList-container {
  height: 100%;
  .my-header {
    padding-top: 15px;
  }
  .el-main {
    font-size: 13px;
    background-color: #fff;
    height: 100%;
    display: flex;
    .left {
      width: 25%;
      .left-title {
        margin-bottom: 10px;
      }
    }
    .right {
      width: 75%;
      .right-title {
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