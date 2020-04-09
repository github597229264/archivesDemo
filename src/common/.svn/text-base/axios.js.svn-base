/**
 * http请求拦截处理
 */
import axios from 'axios'
import { Loading, Message } from 'element-ui'// 引入axios以及element ui中的loading和message组件
axios.defaults.headers = {
	'Content-Type':'application/x-www-form-urlencoded'
};
var loadinginstace;//loading遮罩层对象
var isLoading = false;//是否显示loading中遮罩层
var loadingObj ={
	fullscreen: true,//是否全屏
	lock: true,
	text: '正在加载中...',
	spinner: 'el-icon-loading',
	background: 'rgba(0, 0, 0, 0.5)',
	target:"",//Loading需要覆盖的 DOM节点 
};

axios.interceptors.request.use(config => {
    config.baseURL = window.vm.API.baseURL;
    if(config.headers['Content-Type'] === 'multipart/form-data'){
        
    }
	if(config.method.toUpperCase() =="POST"){//post方式时，提交的参数转成string类型
		config.data = window.vm.qs.stringify(config.data);
	}
	let msgText = "";
	let fullscreen = true;
	if(config.loading){
		isLoading = true;
		fullscreen = loadingObj.fullscreen;
		if(!config.loading.text || config.loading.text.length == 0){
			msgText = loadingObj.text;
		}else{
			msgText = config.loading.text;
		}
		if(!config.loading.target || config.loading.target.length == 0){
			fullscreen = loadingObj.fullscreen;
		}else{
			fullscreen = false;
		}
		if(!config.loading.isShow){
			isLoading = false;
		}
	}else{
		isLoading = true;
		msgText = loadingObj.text;
		fullscreen = loadingObj.fullscreen;
	}
    if(isLoading){
    	let loading = {
			fullscreen: fullscreen,
			lock: loadingObj.lock,
			text: msgText,
			spinner: loadingObj.spinner,
			background: loadingObj.background
    	}
    	if(!fullscreen){
    		loading.target = config.loading.target;
    	}else{
    		delete loading.target;
    	}
		// element ui 显示 Loading
		loadinginstace = Loading.service(loading);
    }
    
	//过滤拦截路径
	if(window.vm.API.constObj.requestFilter.indexOf(config.url) === -1){//拦截该请求
		let stateObj = window.vm.$store.state;
		if(stateObj.user && stateObj.user.token) {
			//token 转码
			let submitToken = encodeURIComponent(stateObj.user.token);
			config.headers.token = encodeURIComponent(submitToken);
			if(stateObj.menuObj && stateObj.menuObj.id) {//传递菜单id
				config.headers.selectmenuid = stateObj.menuObj.id;
			}
	    }else{
	      	//清除登录信息并跳转到登录页面
	        window.vm.commonFun.againLogin(true);
	    }
	}
	return config;
}, error => {
	if(loadinginstace){
		loadinginstace.close()
	}
	Message.error({
		message: '加载超时'
	})
	return Promise.reject(error);
});
// http响应拦截器
axios.interceptors.response.use(response => {
	if(loadinginstace){
		loadinginstace.close()
	}
	if (response.data.code) {
        switch (response.data.code) {
            case "3"://token过期
                window.vm.$message({
		            type: 'error',
		            message: '登录信息过期，请重新登录!'
	          	});  
	           //清除token信息并跳转到登录页面
	           window.vm.commonFun.againLogin(true);
	        break;
        }
    }
	return response;
}, error => {
	if(loadinginstace){
		loadinginstace.close()
	}
	Message.error({
		message: '加载失败'
	})
	return Promise.reject(error);
})
export default axios;