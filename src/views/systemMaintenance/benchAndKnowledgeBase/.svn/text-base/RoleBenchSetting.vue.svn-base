<template>
  <!-- 角色工作台设置 -->
  <el-container class="rolebench-setting-container">
    <el-header class="my-header" style="height: 45px;">角色工作台设置</el-header>
    <el-main>
      <div class="rolebench-setting-title">
        <div class="left">
          <el-button type="primary" @click="roleBenchEdit">编辑</el-button>
        </div>
        <div class="right">
          <el-input v-model="name" clearable placeholder="角色名称"></el-input>
          <el-button type="primary" @click="search">查询</el-button>
        </div>
      </div>
      <div class="rolebench-setting-content">
        <!-- 表格 -->
        <el-table
          ref="table"
          class="table"
          :height="tableHeight"
          highlight-current-row
          :data="roleBenchSettingList"
          style="width: 100%;"
          @row-click="clickRow"
          border
        >
          <el-table-column prop="rowNo" label="序号" align="center" width="60px">
            <template slot-scope="scope">{{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="name" label="角色名称" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="remarks" label="角色说明" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="workbenchName" label="工作台" align="center"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="material_page">
          <pagination
            :pageIndex="pageObj.pageIndex"
            :total="pageObj.total"
            :pageSize="pageObj.pageSize"
            @PageTurning="PageTurning"
          ></pagination>
        </div>
        <!-- 编辑弹窗 -->
        <el-dialog title="角色工作台设置" :visible.sync="roleBenchVisble" v-if="roleBenchVisble">
          <roleBenchEdit :selectColumn="selectColumn" @roleBenchCallBack="roleBenchCallBack"></roleBenchEdit>
        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import pagination from "../../../components/Pagination.vue";
import RoleBenchEdit from "./RoleBenchEdit.vue";

export default {
  name: "roleBenchSetting",
  //import引入的组件需要注入到对象中才能使用
  components: { pagination, RoleBenchEdit },
  props: [""],

  data() {
    return {
      pageObj: {
        pageIndex: this.API.constObj.pageIndex, //当前页码
        total: 0, //数据总数
        pageSize: this.API.constObj.pageSize //页大小
      },
      tableHeight: 0, //表格初始化高度
      roleBenchVisble: false, //编辑弹窗默认关闭
      name: "", //用户名称查询关键词
      selectColumn: "",
      roleBenchSettingList: [] //角色工作台列表
    };
  },

  //监听属性 类似于data概念
  computed: {},

  //监控data中的数据变化
  watch: {
    roleBenchSettingList: { //表格高度
      handler:function(newVal){
        this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 150;
      }
    }
  },
  //方法集合
  methods: {
    handleCurrentChange(val) { // 分页导航
      this.pageObj.pageIndex = val;
      this.getData();
    },
    PageTurning(page_obj) { //分页组件回调方法
      console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
      this.pageObj.pageIndex = page_obj.page_index;
      this.pageObj.pageSize = page_obj.page_size;
      this.getData();
    },
    clickRow(row) { //选中某一条数据
      this.selectColumn = row;
    },
    getData() { //获取角色工作台表格
      this.$axios({
        loading: {
          isShow: true, //是否显示loading遮罩层
          target: ".rolebench-setting-content" //loading遮罩层 添加的dom选择器名称 如：.login or #center
        },
        method: "post",
        url: this.API.queryRoleWorkBench,
        data: {
          pageIndex: this.pageObj.pageIndex,
          pageSize: this.pageObj.pageSize,
          name: this.name
        }
      })
        .then(res => {
          // console.log("返回的数据=" + res);
          var resData = res.data;
          if (resData.code == "1") {
            this.roleBenchSettingList = resData.data.list;
            this.pageObj.total = resData.data.total;
            // console.log(this.pageObj.total);
          } else {
            this.$message({
              type: "error",
              message: "获取数据失败，请刷新重试！"
            });
          }
        })
        .catch(function(err) {
          console.log("连接错误" + err);
        });
    },
    search() { //查询
      this.pageObj.pageIndex = this.API.constObj.pageIndex;
      this.getData();
    },
    roleBenchEdit() { //编辑
      let uIssystem = this.selectColumn.uIssystem;
      if (this.selectColumn == "") {
        this.$confirm("请选择一条数据！", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning",
          center: true
        });
        return;
      }
      if (uIssystem == true) {
        this.$confirm("系统内置账户，不允许编辑！", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning",
          center: true
        });
        return;
      }
      this.roleBenchVisble = true;
    },
    roleBenchCallBack(isReFresh) { //子组件编辑弹窗回调数据
      this.roleBenchVisble = false;
      if (isReFresh) {
        this.getData();
      }
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

  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="scss">
.rolebench-setting-container {
  position: relative;
  .my-header {
    padding-top: 15px;
  }
  .el-main {
    background-color: #fff;
    height: 100%;
    .rolebench-setting-title {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      .right {
        display: flex;
        .el-input {
          width: 180px;
          margin-right: 10px;
        }
      }
    }
    .rolebench-setting-content {
      .el-table__body tr.current-row > td {
        background: #dcebfa !important;
        color: #606266;
      }
      .material_page {
        margin-top: 10px;
        text-align: right;
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
  }
}
</style>