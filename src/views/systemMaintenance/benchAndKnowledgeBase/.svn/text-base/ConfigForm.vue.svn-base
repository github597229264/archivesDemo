<template>
  <div class="config-form-add">
    <!-- 表单 -->
    <el-form
      :model="configForm"
      ref="configForm"
      :rules="rules"
      label-width="110px"
      class="demo-ruleForm"
      size="small"
    >
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="工作台名称：" prop="name">
            <el-input v-model="configForm.name" placeholder="请输入工作台名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 操作按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="saveConfig('configForm')">保存</el-button>
      <el-button type="danger" @click="cancelConfig">取 消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "config",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["selectColumn"],

  data() {
    return {
      configForm: {
        id: "", //id
        name: "" //工作台名称
      },
      rules: {
        name: [
          { required: true, message: "请输入工作台名称", trigger: "change" },
          { min: 0, max: 30, message: '长度必须在0到30位字符之间', trigger: 'blur' }
        ]
      },
      isEdit: false //true编辑，false新增
    };
  },

  //监听属性 类似于data概念
  computed: {},

  //监控data中的数据变化
  watch: {},

  //方法集合
  methods: {
    saveConfig(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        }
        this.addConfigToNet();
      });
    },
    addConfigToNet() { //添加至服务器
      this.$axios({
        methods: "get",
        url: this.API.saveOrUpdatePWD,
        params: {
          id: this.configForm.id,
          name: this.configForm.name
        }
      }).then(res => {
        console.log("返回的数据=" + res);
        var resData = res.data;
        if (resData.code == "1") {
          this.$message({
            message: "添加数据成功！",
            type: "success"
          });
          this.$emit("ConfigCallBack", true);
        } else {
          this.$message({
            type: "error",
            message: "添加数据失败，请刷新重试！"
          });
        }
      }).catch((err) => {
        this.$message({
            type: "error",
            message: "请求异常，请检查网络！"
          });
      });
    },
    cancelConfig() { // 取消保存
      this.resetForm("configForm");
      //调用父组件方法--isRefresh=false不需要刷新父组件的数据
      this.$emit("ConfigCallBack", false);
    },
    resetForm(formName) { //重置表单
      this.$refs[formName].resetFields();
    }
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    if (this.selectColumn != "") {
      this.configForm.id = this.selectColumn.id;
      this.configForm.name = this.selectColumn.name;
      this.isEdit = true;
    }
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
.config-form-add {
  .el-button {
    margin-bottom: 10px;
  }
  .dialog-footer {
    margin-top: 10px;
    text-align: center;
  }
}
</style>