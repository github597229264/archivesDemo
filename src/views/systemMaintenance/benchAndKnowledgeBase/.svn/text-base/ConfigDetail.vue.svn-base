<template>
<!-- 详细界面 -->
  <el-container class="config-detail-container">
    <el-main>
      <div class="config-detail-title">
        <el-button type="primary" @click="addDetailVisble = true">添加</el-button>
        <el-button type="danger" @click="delDetail">删除</el-button>
        <el-button type="primary" @click="sortDetailVisble = true">排序</el-button>
      </div>
      <div class="config-detail-content">
        <!-- 表格 -->
        <el-table ref="detaileTable" :height="tableHeight" style="width:100%;height:100%;" highlight-current-row
        :data="detaileTable" @row-click="clickRow" border>
          <el-table-column prop="rowNo" label="序号" align="center" width="80">
            <template slot-scope="scope">{{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="menusName" label="菜单名称" align="center"></el-table-column>
          <el-table-column prop="uIssystem" label="是否有效" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.uIssystem === true">有效</span>
              <span v-else-if="scope.row.uIssystem === false">无效</span>
              <span v-else></span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="material_page">
          <pagination :pageIndex="pageObj.pageIndex" :total="pageObj.total" :pageSize="pageObj.pageSize" @PageTurning="PageTurning">
          </pagination>
        </div>
        <!-- 添加弹窗 -->
        <el-dialog title="添加" :visible.sync="addDetailVisble" v-if="addDetailVisble" width="30%" append-to-body>
          <addDetail :id="selectColumn.id" :detaileTable="detaileTable" @addDetCallBack="addDetCallBack"></addDetail>  
        </el-dialog>
        <!-- 排序弹窗 -->
        <el-dialog title="排序" :visible.sync="sortDetailVisble" :append-to-body="true" v-if="sortDetailVisble">
          <sortDetail :id="selectColumn.id" @sortDetCallBack="sortDetCallBack"></sortDetail>
        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import pagination from "../../../components/Pagination.vue";
import addDetail from "./AddDetail.vue"; //添加弹窗界面
import sortDetail from "./SortDetail.vue";

export default {
  name: "configDetail",
  //import引入的组件需要注入到对象中才能使用
  components: { pagination, addDetail, sortDetail },
  props: ['selectColumn'],

  data() {
    return {
      pageObj: {
        pageIndex: this.API.constObj.pageIndex, //当前页码
        total: 0, //数据总数
        pageSize: this.API.constObj.pageSize //页大小
      },
      tableHeight: "400", //表格初始化高度
      selectItem: "", //选中的某行数据
      detaileTable: [], //详细表格数据
      addDetailVisble: false, //详细弹窗默认关闭
      flag: true, //添加界面的返回	
      sortDetailVisble: false //排序弹窗默认关闭
    };
  },

  //监听属性 类似于data概念
  computed: {},

  //监控data中的数据变化
  watch: {},

  //方法集合
  methods: {
    handleCurrentChange(val) { // 分页导航
      this.pageObj.pageIndex = val;
      this.getBenchConfigData();
    },

    PageTurning(page_obj) { //分页组件回调方法
      console.log("分页组件传回的分页信息：" + JSON.stringify(page_obj));
      this.pageObj.pageIndex = page_obj.page_index;
      this.pageObj.pageSize = page_obj.page_size;
      this.getBenchConfigData();
    },
    clickRow(row) { //选中某一条数据
      this.selectItem = row;
    },
     getData() {
      this.$axios({
        loading: {
          isShow: true, //是否显示loading遮罩层
          target: ".config-detail-container" //loading遮罩层 添加的dom选择器名称 如：.login or #center
        },
        method: "post",
        url: this.API.queryPWDMenusDetails,
        data: {
          pageIndex: this.pageObj.pageIndex,
          pageSize: this.pageObj.pageSize,
          workbenchid: this.selectColumn.id
        }
      })
        .then(res => {
          var resData = res.data;
          if (resData.code == "1") {
            this.detaileTable = resData.data.list;
            console.log(this.detaileTable);
            this.pageObj.total = resData.data.total;
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
    delDetail(){ //删除
      if (this.selectItem === null || this.selectItem === "") {
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
          this.deleteDetailFromNet();
        })
        .catch(() => {
          this.selectItem = "";
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    deleteDetailFromNet(){ //请求服务器删除
      this.$axios({
        loading: {
          isShow: true,
          target: '.bench-config-container'
        },
        method: 'get',
        url: this.API.deletePWDMenus,
        params: {
          id: this.selectItem.id
        }
      }).then((res) => {
        var resData = res.data;
        if(resData.code == "1") {
          this.$message({
            type: 'success',
            message: '删除成功！'
          });
          this.getData();
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
    addDetCallBack(isRefresh){//添加弹窗子组件回调数据
      this.addDetailVisble = false;
      if(isRefresh){
        this.getData();
      }
    },
    sortDetCallBack(isRefresh){ //排序弹窗子组件回调数据
      this.sortDetailVisble = false;
      if(isRefresh){
        this.getData();
      }
    }
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getData();
  },

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
.config-detail-container {
  .config-detail-title {
    padding-bottom: 10px;
  }
}
</style>