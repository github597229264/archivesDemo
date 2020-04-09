<template>
  <!-- 树组件 -->
  <div class="treeContainer">
    <el-tree :data="treeList" :default-checked-keys="checkedId" @node-click="handleNodeClick"
    show-checkbox node-key="id" ref="tree" highlight-current
    default-expand-all :props="defaultProps">
		</el-tree>
   <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveTreeList">保存</el-button>
      <el-button type="danger" @click="cancle">取消</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "addDetailContainer",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["id","detaileTable"],

  data() {
    return {
      defaultProps:{
        label:'name',
        children:'children'
      },
      checkedId:[], //选中的id
      oldList:[], //原始数据
      treeList:[],//必须是树形结构的对象数组
    }
  },

  //监听属性 类似于data概念
  computed: {},

  //监控data中的数据变化
  watch: {},

  //方法集合
  methods: {
    getData(){
      let self = this;
      this.$axios({
        loading: {
          isShow: true, //是否显示loading遮罩层
          target: ".treeContainer" //loading遮罩层 添加的dom选择器名称 如：.login or #center
        },
        methods: 'get',
        url: this.API.powerWorkMenuList
      }).then((res) => {
        var resData = res.data;
        if(resData.code == "1"){
					this.treeList = this.commonFun.toTreeDataNormal(resData.data,{
            childKey:"id",
            fatherKey:"parentid"
          });
          this.detaileTable.forEach( item => {
            this.checkedId.push(item.menuid);
          })
        }else {
          this.$message({
            type: 'error',
            message: '，请刷新重试！'
          }); 
        }
      }).catch((err) => {
        console.log("请求失败"+ err);
      })
    },
    saveTreeList() { //保存
      let checkedId = this.$refs['tree'].getCheckedKeys(true);
       this.$axios({
        loading: {
          isShow: true, //是否显示loading遮罩层
          target: ".treeContainer" //loading遮罩层 添加的dom选择器名称 如：.login or #center
        },
        method: "post",
        url: this.API.savePWDMenus,
        data: {
          workbenchid: this.id, //工作台id
          menuids: checkedId.join(",")
        }
      })
        .then(res => {
          var resData = res.data;
          if (resData.code == "1") {
            this.$emit("addDetCallBack",true);
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
    cancle() { //取消
      this.$emit("addDetCallBack",false);
    },
    handleNodeClick(data){
      // console.log(data);
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
.treeContainer {
  .el-tree {
    height: 360px;
    overflow-y: auto;
    font-size: 13px;
    display: inline-block;
  }
  .el-button {
    margin-bottom: 10px;
  }
  .dialog-footer {
    margin-top: 10px;
    text-align: center;
  }
}
</style>