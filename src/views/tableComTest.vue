<template>
  <!-- 测试表格组件专用页面 -->
  <div class="tableComTest">
    <hx-tables
      :columns="columns"
      :dataSource="tableData"
      :options="options"
      :fetch="fetchTableData"
      :pagination="pagination"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
    ></hx-tables>
  </div>
</template>

<script>
  import HxTables from "@/components/hxTable.vue";

export default {
  name: "tableComTest",
  //import引入的组件需要注入到对象中才能使用
  components: {
    HxTables
  },
  props: [""],

  data() {
    return {
      columns: [
        //表头
        { prop: "id", label: "编号", width: 80 },
        { prop: "title", label: "标题" },
        { prop: "author", label: "作者"},
        {
          button: true,
          label: "操作",
          group: [
            {
              name: "编辑",
              type: "warning",
              icon: "el-icon-edit",
              plain: true,
              onClick: (row, index) => {
                // 箭头函数写法的 this 代表 Vue 实例
                console.log(row, index);
              }
            },
            {
              name: "删除",
              type: "danger",
              icon: "el-icon-delete",
              disabled: false,
              onClick(row) {
                this.disabled = true;
                console.log(this);
              }
            }
          ]
        }
      ],
      tableData: [
        //数据源
        { id: "A001", title: "标题", author: "郭小鹿" },
        { id: "A002", title: "标题2", author: "郭小鹿2" },
        { id: "A003", title: "标题3", author: "郭小鹿3" }
      ],
      pagination: {
        //默认分页
        total: 0,
        pageIndex: 1,
        pageSize: 15
      },
      options: {
        mutiSelect: true,
        index: true, //显示序号， 多选则 mutiSelect
        loading: false, //表格加载动画
        initTable: true //是否一挂载就加载数据
      }
      }
  },
  //监听属性 类似于data概念
  computed: {},

  //监控data中的数据变化
  watch: {},

  //方法集合
  methods: {
    fetchTableData() {
      //获取表格数据----请求模拟数据
    //    this.options.loading = true,
    //    this.$axios.post('https://www.easy-mock.com/mock/5b3f80edfa972016b39fefbf/example/tableData',{
    //      pageIndex: this.pagination.pageIndex,
    //      pageSize: this.pagination.pageSize
    //    }).then(res => {
    //       const{ list, total} = res.data.data
    //       this.tableData = list
    //       this.pagination.total = total
    //       this.options.loading = false
    //    }).catch((error) => {
    //      console.log(error)
    //      this.options.loading = false
    //    })
   },
    handleRowClick(row, event, column) {
      //点击行事件，亦可绑定其他事件
      console.log("click row", row, event, column);
    },
    handleSelectionChange(selection) {
      //数据行多选
      console.log(selection);
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

<style scoped>
</style>