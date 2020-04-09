<template>
  <!-- 通知维护 -->
  <el-container class="noticeMaintain-container">
    <el-header class="my-header" style="height: 45px;">通知维护</el-header>
    <el-main>
      <div class="noticeMaintain-title">
        <div>
          <el-button type="primary" @click="noticeAdd">添加</el-button>
          <el-button type="primary" @click="noticeEdit">编辑</el-button>
          <el-button type="danger" @click="noticeDelete">删除</el-button>
        </div>
        <div>
          <el-input placeholder="标题" v-model="title"></el-input>
          <el-button type="primary" @click="search">查询</el-button>
        </div>
      </div>
      <div class="noticeMaintain-content">
        <!-- 表格 -->
        <el-table
          ref="table"
          class="table"
          :height="tableHeight"
          highlight-current-row
          :data="noticeMainList"
          style="width: 100%;height: 100%;"
          @row-click="clickRow"
          border
        >
          <el-table-column label="序号" align="center" width="80">
            <template slot-scope="scope">{{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
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
        <!-- 新增、编辑弹窗 -->
        <el-dialog :title="dialogTitle" :visible.sync="noticeMainAddVisble" v-if="noticeMainAddVisble">
          <noticeMainAdd :selectColumn="selectColumn" @noticeMainCall="noticeMainCall"></noticeMainAdd>
        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import pagination from "../../../components/Pagination.vue";
import noticeMainAdd from "./NoticeMainAdd.vue"; //添加、编辑弹窗页面

export default {
  name: "noticeMainList",
  //import引入的组件需要注入到对象中才能使用
  components: { pagination, noticeMainAdd },
  props: [""],

  data() {
    return {
      pageObj: {
        pageIndex: this.API.constObj.pageIndex, //当前页码
        total: 0, //数据总数
        pageSize: this.API.constObj.pageSize //页大小
      },
      tableHeight: 0, //表格初始化高度
      noticeMainAddVisble: false, //新增、编辑弹窗默认关闭
      dialogTitle: "添加", //弹窗名称
      selectColumn: "", //选中的某行数据
      noticeMainList: [], //通知维护表格数据
      title: '', //标题查询
    };
  },

  //监听属性 类似于data概念
  computed: {},

  //监控data中的数据变化
  watch: {
    noticeMainList:{
        handler:function(newVal){
          this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 40;
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

    getData() {
      this.$axios({
        loading: {
          isShow: true, //是否显示loading遮罩层
          target: ".noticeMaintain-container" //loading遮罩层 添加的dom选择器名称 如：.login or #center
        },
        method: "post",
        url: this.API.querySysSysMessage,
        data: {
          pageIndex: this.pageObj.pageIndex,
          pageSize: this.pageObj.pageSize,
          title: this.title
        }
      })
        .then(res => {
          var resData = res.data;
          if (resData.code == "1") {
            this.noticeMainList = resData.data.list;
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

    noticeAdd() {  // 新增
      this.selectColumn = "";
      this.dialogTitle = "添加";
      this.noticeMainAddVisble = true;
    },

    noticeEdit() { // 编辑
      if (this.selectColumn == null || this.selectColumn == "") {
          this.$confirm("请选择一条数据！", "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning",
            center: true
          });
          return;
      }
      this.dialogTitle = "编辑";
      this.noticeMainAddVisble = true;
    },
    noticeDelete() { // 删除
      if(this.selectColumn == "") {
					this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
				}
				this.$confirm('确定删除选中记录?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					this.deleteFromNet();
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
    },

    deleteFromNet(){ //请求服务器删除
      this.$axios({
        loading: {
          isShow: false,
        },
        method: 'get',
        url: this.API.deleteSysMessage,
        params: {
          id: this.selectColumn.id
        }
      }).then((res) => {
        var resData = res.data;
        if(resData.code == "1") {
          this.selectColumn = "";
          this.$message({
            type: 'error',
            message: '删除成功！'
          });
          this.getData();
        } else {
          this.$message({
            type: 'error',
            message: '操作失败，请重新尝试！'
          });
        }
      }).catch((err)=> {
        this.$message({
          type: 'error',
          message: '请求异常，请检查网络！'
        });
      })
    },
    search(){ //查询
      this.pageObj.pageIndex = this.API.constObj.pageIndex;
      this.getData();
    },
    noticeMainCall(isRefresh) { //新增、编辑弹窗子组件返回
      this.noticeMainAddVisble = false;
      if (isRefresh) this.getData();
    }
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getData();
  },

  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.tableHeight =
    // window.innerHeight - this.$refs.table.$el.offsetTop - 145;
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
.noticeMaintain-container {
  .my-header {
    padding-top: 15px;
  }
  .el-main {
    background-color: #fff;
    .noticeMaintain-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .el-input {
        width: 180px;
        padding: 0 10px;
      }
    }
    .noticeMaintain-content {
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