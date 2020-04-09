<!-- template -->
<template>
  <el-container class="sort-detail-container">
    <!-- 排序 -->
    <el-main>
      <div class="sort-detail-title">
        <!-- 操作 -->
        <el-button type="primary" @click="initSort">初始化排序</el-button>
        <el-button type="primary" @click="upGo">上移</el-button>
        <el-button type="primary" @click="downGo">下移</el-button>
        <el-button type="primary" @click="saveSort">保存</el-button>
      </div>
      <div class="sort-detail-content">
        <!-- 表格 -->
        <el-table
          ref="table"
          class="table"
          :height="tableHeight"
          :data="sortTableList"
          style="width: 100%;height: 100%;"
          @row-click="clickRow"
          :row-class-name="tableRowClassName"
          highlight-current-row
          border>
          <el-table-column prop="rowNo" label="序号" align="center" width="80"></el-table-column>
          <el-table-column prop="workbenchName" label="工作台" align="center"></el-table-column>
          <el-table-column prop="menusName" label="菜单" align="center"></el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script>

export default {
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: { },
  props: ["id"],

  data() {
    return {
      sortTableList: [], //排序表格内容
      tableHeight: "400", //表格初始化高度
      isChange: false, //排序是否触发
      selectList: "", //选中某一行数据
      _index: null //选中数据行的下标
    };
  },

  //监听属性 类似于data概念
  computed: {},

  //监控data中的数据变化
  watch: {},

  //方法集合
  methods: {
     clickRow(row) { //选中某一条数据
      this.selectList = row;
      this._index = row.index;
    },
    tableRowClassName({ row, rowIndex }) { // 把每一行的索引放进row
      row.index = rowIndex;
    },
    getData(){
      this.$axios({
        loading: {
          isShow: true, //是否显示loading遮罩层
          target: ".sort-detail-container" //loading遮罩层 添加的dom选择器名称 如：.login or #center
        },
        methods:'get',
        url: this.API.getWorkMenuListByWorkbenchId,
        params:{
          workbenchid: this.id
        }
      }).then((res) => {
        var resData = res.data;
        if (resData.code == "1") {
          this.sortTableList = resData.data.list;
        } else {
          this.$message({
            type: "error",
            message: "获取数据失败，请刷新重试！"
          });
        }
      }).catch((err) => {
        this.$message({
            type: "error",
            message: "请求异常，请检查网络！"
          });
      })
    },
    initSort() { // 初始化排序
      this.$axios({
        loading: {
          isShow: true, //是否显示loading遮罩层
          target: ".sort-detail-container" //loading遮罩层 添加的dom选择器名称 如：.login or #center
        },
        methods: 'get',
        url: this.API.initializeSortNo,
        params:{
          workbenchid:this.id
        }
      }).then((res) => {
        var resData = res.data;
        debugger;
        if (resData.code == "1") {
          this.$message({
            message: "初始化排序完成！",
            type: "success"
          });
          this.$emit("sortDetCallBack",true);
        }else{
          this.$message({
            type: "error",
            message: "初始化排序失败，请刷新重试！"
          });
        }
      }).catch((err) => {
        this.$message({
            type: "error",
            message: "请求异常，请检查网络！"
          });
      })
    },
    upGo() { //上移
      if(this.selectList == ""){
        this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
      }
      let index = this._index, // 当前index
        fieldData = this.sortTableList; //表格数据
      if (index != 0) {
        fieldData[index] = fieldData.splice(index - 1, 1, fieldData[index])[0];
        this._index--;
        this.isChange = true;
      }else{
        this.$message('已经是第一条，不可上移');
      }
    },
    downGo() { //下移
    if(this.selectList == ""){
        this.$confirm('请选择一条数据！', '提示', {
						confirmButtonText: '确定',
						showCancelButton: false,
						type: 'warning',
						center: true
					});
					return;
      }
      let index = this._index,
        fieldData = this.sortTableList;
      if (index != fieldData.length - 1) {
        fieldData[index] = fieldData.splice(index + 1, 1, fieldData[index])[0];
        this._index++;
        this.isChange = true;
      }else{
        this.$message('已经是最后一条，不可下移');
      }
    },
    saveSort() {//保存排序
      let ids = [];
      this.sortTableList.forEach(v => {
          ids.push(v.id);
      });
      console.log(ids);
      this.$axios({
        methods: 'get',
        url: this.API.updatePwbmSortNo,
        params:{
          ids: ids.join(",")
        }
      }).then((res) => {
        var resData = res.data;
        if (resData.code == "1") {
          this.$message({
            message: "排序成功！",
            type: "success"
          });
          this.$emit("sortDetCallBack", true);
        }else{
          this.$message({
            type: "error",
            message: "保存失败，请刷新重试！"
          });
        }
      }).catch((err) => {
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
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 145;
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

<style lang="scss" scoped>
.sort-detail-container {
  .sort-detail-title {
    margin-bottom: 10px;
  }
}
</style>