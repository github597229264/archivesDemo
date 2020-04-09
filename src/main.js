import Vue from 'vue'
import App from './App'
import vuescroll from 'vuescroll';  //自定义滚动条
import 'vuescroll/dist/vuescroll.css';
import axios from './common/axios';//http 请求拦截
import qs from 'qs';
import store from './store/index';
import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
import './assets/theme/theme-369FDD/index.css';       // 蓝色主题
import '@/assets/css/global.css';   //全局样式
import router from "./router/router.js" // 引入全局的路由
import api from "./api/api.js" //引入mock测试接口 ；  生产模式时  需要改为api.js
import commonFun from "./common/commonFun.js" //引入接口
import ZkTable from 'vue-table-with-tree-grid'
import TreeTable from 'tree-table-vue'
import Borrow from './mock/borrow.js' //TODO 借阅申请管理模块 单元测试
//import UserPower from './mock/userPower.js' //TODO 借阅申请管理模块 单元测试
import MaterialBatch from './mock/materialBatch.js'; //TODO 散材料管理模块 单元测试
import PersonalManagement from './mock/personalManagement.js'; //TODO 干部信息总库模块 单元测试
import md5 from './plugins/md5';
import echarts from 'echarts'
import VueQuillEditor from 'vue-quill-editor' //引入vue-quill-editor
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.prototype.$echarts = echarts;
Vue.use(ZkTable); 
Vue.use(TreeTable);
Vue.use(VueQuillEditor); //在vue中使用VueQuillEditor
Borrow.bootstrap();
//MaterialBatch.bootstrap();
//PersonalManagement.bootstrap();
//UserPower.bootstrap();

Vue.use(vuescroll); // install the vuescroll first
Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small'
});
Vue.use(md5); 
Vue.prototype.API = api;
Vue.prototype.qs = qs
Vue.prototype.commonFun = commonFun;
Vue.prototype.$store = store
Vue.prototype.$axios = axios; //全局注册，使用方法为:this.$axios

window.vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  methods:{
  	created(){
  		//console.log("Vue.prototype.API"+Vue.prototype.API.URL);
  	}
  }
  
})
export default vm;

