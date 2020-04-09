<template>
  <div class="mailList-table-Add">
    <el-form
      ref="mailListTable"
      :model="mailListTable"
      :rules="rules"
      label-width="110px"
      class="demo-ruleForm"
      size="small"
    >
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item prop="name" label="姓名：">
            <el-input v-model="mailListTable.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="sexual" label="性别：">
            <el-select v-model="mailListTable.sexual" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="birthday" label="生日：">
            <el-date-picker
              editable="false"
              type="date"
              v-model="mailListTable.birthday"
              placeholder="选择日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="officetel" label="办公电话：">
            <el-input v-model="mailListTable.officetel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="mobilephone" label="手机：	">
            <el-input v-model="mailListTable.mobilephone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="qq" label="QQ：">
            <el-input v-model="mailListTable.qq"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="mail" label="邮箱：">
            <el-input v-model="mailListTable.mail"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="duty" label="职务：">
            <el-input v-model="mailListTable.duty"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item prop="address" label="家庭住址：">
            <el-input type="textarea" v-model="mailListTable.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 操作按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save('mailListTable')">保存</el-button>
      <el-button type="danger" @click="cancel">取 消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  props: ["selectColumn","mailListTypeObj"],

  data() {
    return {
      mailListTable: {
        id: "",
        name: "", //姓名
        duty: "", //职务
        officetel: "", //办公电话
        mobilephone: "", //手机
        mail: "", //邮箱
        qq: "", //qq
        birthday: "", //生日
        address: "", //家庭地址
        sexual: "男" //性别
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "change" },
          { min: 1, max: 10, message: '长度必须在1到10位字符之间', trigger: 'blur' }
        ],
        duty:[
          {min: 0, max: 25, message: '长度必须在0到25位字符之间', trigger: 'blur' }
        ],
        officetel:[
          {
            pattern: /0\d{2,3}-\d{7,8}/,
            message:'请输入正确的办公电话'
        }
        ],
        mobilephone:[
          {
            pattern: /^1[34578]\d{9}$/, //正则验证
            message: '目前只支持中国大陆的手机号码',
            trigger: ['blur','change']
          }
        ],
        mail:[
          {
            type: 'email',//要检验的类型（number，email，date等）
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        qq:[
          {
            pattern: /^[1-9][0-9]{4,10}$/,
            message: '请输入正确的QQ号',
          }
        ],
        address:[
          { min: 3, max: 100, message: '长度在3到100个字符', }
        ],
      },
      options: [{ value: "男", label: "男" }, { value: "女", label: "女" }]
    };
  },

  //监听属性 类似于data概念
  computed: {},

  //监控data中的数据变化
  watch: {},

  //方法集合
    methods: {
        save(formName){
            this.$refs[formName].validate((valid) => {
                if (!valid) {
                    alert('error submit!');
                    return false;
                }
                this.addMailListToNet();
            });
        },
        addMailListToNet(){ //添加至服务器
            this.$axios({
              method: "post",
              url: this.API.saveOrUpdateSysAddress,
              data: {
                  id: this.mailListTable.id,
                  businesstypeid: this.mailListTypeObj.id, //所属分类id
                  name: this.mailListTable.name,
                  duty: this.mailListTable.duty,
                  officetel: this.mailListTable.officetel,
                  mobilephone: this.mailListTable.mobilephone,
                  mail: this.mailListTable.mail,
                  qq: this.mailListTable.qq,
                  birthday: this.mailListTable.birthday,
                  address: this.mailListTable.address,
                  sexual: this.mailListTable.sexual
                }
              }).then(res => {
                  var resData = res.data;
                  if (resData.code == "1") {
                    this.$message({
                      message: "添加数据成功！",
                      type: "success"
                    });
                    this.$emit("mailListTableCall", true);
                  } else {
                    this.$message({
                      type: "error",
                      message: "添加数据失败，请刷新重试！"
                    });
                  }
                }).catch((err) => {
                  this.$message({
                    type: "error",
                    message: '请求异常，请检查网络！'
                });
            });
        },
        cancel(){ //取消
            this.resetForm('mailListTable');
            this.$emit("mailListTableCall",false);
        },
        resetForm(formName) { //重置表单
            this.$refs[formName].resetFields();
        },
    },

  //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        if(this.selectColumn != ""){
            console.log(this.selectColumn);
            this.mailListTable.id = this.selectColumn.id;
            this.mailListTable.name = this.selectColumn.name;
            this.mailListTable.duty = this.selectColumn.duty;
            this.mailListTable.officetel = this.selectColumn.officetel;
            this.mailListTable.mobilephone =  this.selectColumn.mobilephone;
            this.mailListTable.mail = this.selectColumn.mail;
            this.mailListTable.qq = this.selectColumn.qq;
            this.mailListTable.birthday =  this.selectColumn.birthday;
            this.mailListTable.address = this.selectColumn.address;
            this.mailListTable.sexual =  this.selectColumn.sexual;
            this.isEdit = true
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

<style lang="scss" scoped>
    .mailList-table-Add{
        .dialog-footer{ margin-bottom:10px; text-align: center;}
    }
</style>