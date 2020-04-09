<template>
  <!-- 工作台配置 -->
  <el-container class="bench-config-container">
    <el-header class="my-header" style="height: 45px;">工作台配置</el-header>
    <el-main>
      <div class="bench-config-title">
        <el-button type="primary" @click="addBench">添加</el-button>
        <el-button type="primary" @click="editBench">编辑</el-button>
        <el-button type="danger" @click="delBench">删除</el-button>
      </div>
      <div class="bench-config-content">
        <!-- 表格 -->
        <el-table
          ref="table"
          class="table"
          :height="tableHeight"
          highlight-current-row
          :data="benchConfigList"
          style="width: 100%;"
          @row-click="clickRow"
          border
        >
          <el-table-column label="序号" align="center" width="80">
            <template slot-scope="scope">{{pageObj.pageIndex*pageObj.pageSize+scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="operation" label="操作" align="center" width="160">
            <template slot-scope="scope">
              <el-button type="text" @click="detail(scope.row,scope.$index)">详细</el-button>
              <el-button
                type="text"
                :disabled="scope.row.uIssystem"
                @click="editBench(scope.row,scope.$index)"
              >编辑</el-button>
              <el-button
                type="text"
                :disabled="scope.row.uIssystem"
                @click="delBench(scope.row,scope.$index)"
              >删除</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="工作台名称" align="center"></el-table-column>
          <el-table-column prop="uIssystem" label="是否系统内置" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.uIssystem === true">是</span>
              <span v-else-if="scope.row.uIssystem === false">否</span>
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
        <el-dialog :title="dialogTitle" :visible.sync="benchVisble" v-if="benchVisble">
          <Config :selectColumn="selectColumn" @ConfigCallBack="ConfigCallBack"></Config>
        </el-dialog>
        <!-- 详细弹窗 -->
        <el-dialog title="详细" :visible.sync="detailVisble" v-if="detailVisble" :modal-append-to-body="false"  width="60%" >
          <configDetail :selectColumn="selectColumn" @detailCallBack="detailCallBack"></configDetail>
        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import pagination from "../../../components/Pagination.vue";
import Config from "./ConfigForm.vue"; //添加、编辑弹窗页面
import configDetail from "./ConfigDetail.vue";//详细弹窗页面

export default {
  name: "benchConfig",
  //import引入的组件需要注入到对象中才能使用
  components: { pagination, Config, configDetail },
  props: [""],

  data() {
    return {
      pageObj: {
        pageIndex: this.API.constObj.pageIndex, //当前页码
        total: 0, //数据总数
        pageSize: this.API.constObj.pageSize //页大小
      },
      tableHeight: 0, //表格初始化高度
      benchVisble: false, //新增、编辑弹窗默认关闭
      detailVisble: false, //详细弹窗默认关闭
      dialogTitle: "添加", //弹窗名称
      selectColumn: "", //选中的某行数据
      benchConfigList: [] //工作台表格数据
    };
  },

  //监听属性 类似于data概念
  computed: {},

  //监控data中的数据变化
  watch: {
    benchConfigList:{
				handler:function(newVal){
					this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 70 - 52 - 41;
				}
			}
  },

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
      this.selectColumn = row;
    },

    getBenchConfigData() {
      this.$axios({
        loading: {
          isShow: true, //是否显示loading遮罩层
          target: ".bench-config-container" //loading遮罩层 添加的dom选择器名称 如：.login or #center
        },
        method: "post",
        url: this.API.queryPowerWorkbConfig,
        data: {
          pageIndex: this.pageObj.pageIndex,
          pageSize: this.pageObj.pageSize
        }
      })
        .then(res => {
          var resData = res.data;
          if (resData.code == "1") {
            this.benchConfigList = resData.data.list;
            this.pageObj.total = resData.data.total;
          } else {
            this.$message({
              type: "error",
              message: "获取数据失败，请刷新重试！"
            });
          }
        })
        .catch(function(err) {
          this.$message({
              type: "error",
              message: "请求异常，请检查网络！"
          });
        });
    },

    addBench(index, row) {  // 新增工作台配置
      this.selectColumn = "";
      this.dialogTitle = "添加";
      this.benchVisble = true;
    },

    editBench(row, index) { // 编辑工作台配置
      let uIssystem = this.selectColumn.uIssystem;
      if (typeof index !== "undefined") {
        uIssystem = row.uIssystem;
      } else {
        if (this.selectColumn == null || this.selectColumn == "") {
          this.$confirm("请选择一条数据！", "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning",
            center: true
          });
          return;
        }
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
      this.dialogTitle = "编辑";
      this.benchVisble = true;
    },
    delBench(row, index) { // 删除
      let uIssystem = this.selectColumn.uIssystem;
      if (typeof index !== "undefined") {
        uIssystem = row.uIssystem;
      } else {
        if (this.selectColumn === null || this.selectColumn === "") {
          this.$confirm("请选择一条数据！", "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning",
            center: true
          });
          return;
        }
      }
      if (uIssystem === true) {
        this.$confirm("系统内置账户，不允许删除！", "提示", {
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
          let id = this.selectColumn.id;
          if(this.selectColumn.id == 'undefined') id = row.id;
          this.$axios({
            loading: {
							isShow: true,
							target: '.bench-config-container'
						},
						method: 'get',
						url: this.API.deletePWD,
						params: {
							id: id
						}
					}).then((res) => {
						var resData = res.data;
						if(resData.code == "1") {
              this.$message({
                type: 'success',
                message: '操作成功！'
              })
							this.getBenchConfigData();
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
        })
        .catch(() => {
          this.selectColumn = "";
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    ConfigCallBack(isRefresh) { //新增、编辑弹窗子组件返回
      this.benchVisble = false;
      if (isRefresh)this.getBenchConfigData();
    },
    detail(row, index) { //详细
      this.selectColumn = Object.assign({}, row);
      this.detailVisble = true;
    },
    detailCallBack(){} //详细弹窗子组件返回
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getBenchConfigData();
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

<style lang="scss">
.bench-config-container {
  .my-header {
    padding-top: 15px;
  }
  .el-main {
    background-color: #fff;
    height: 100%;
    .bench-config-title {
      margin-bottom: 10px;
    }
    .bench-config-content {
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