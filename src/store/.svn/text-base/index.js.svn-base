import Vue from 'vue'
import Vuex from 'vuex'
import api from "../api/api.js" //引入接口 ；  生产模式时  需要改为api.js
Vue.use(Vuex)
let store = new Vuex.Store({
	state: {
		contentheight: window.vm,
		user:JSON.parse(sessionStorage.getItem(api.constObj.loginInfo))?JSON.parse(sessionStorage.getItem(api.constObj.loginInfo)):{},//存储用户信息
		menuObj:JSON.parse(sessionStorage.getItem(api.constObj.menuInfo))?JSON.parse(sessionStorage.getItem(api.constObj.menuInfo)):{},//选中的菜单信息
		mainInfo:JSON.parse(sessionStorage.getItem(api.constObj.mainInfo))?JSON.parse(sessionStorage.getItem(api.constObj.mainInfo)):{},//mainInfo.powerUserRoles: 用户角色集合; mainInfo.powerArea: 用户所属区域; mainInfo.workbenchMenus: 用户的工作台; mainInfo.mCommonlyUsedMenus 工作台的日常办公; mainInfo.myUserMenus 权限菜单
		applyInfo:JSON.parse(sessionStorage.getItem(api.constObj.applyInfo))?JSON.parse(sessionStorage.getItem(api.constObj.applyInfo)):{},//外单位查询人员的申请信息
		areaOrgInfo:JSON.parse(sessionStorage.getItem(api.constObj.areaOrgInfo))?JSON.parse(sessionStorage.getItem(api.constObj.areaOrgInfo)):{},//区域组织信息--外单位查询人员
	},
	//操作数据。注意mutations只能进行同步操作。
	mutations: {
		// 存储content的动态高度
		getContentheight(state, Cheight) {
			state.contentheight = Cheight
		},
		/**
		 * 添加用户--不建议使用
		 */
		saveUser(state, userinfo) {
			state.user = userinfo;
			sessionStorage.setItem(api.constObj.loginInfo, JSON.stringify(state.user));
		},
		/**
		 * 移除用户--不建议使用
		 */
		removeUser(state) {
			sessionStorage.removeItem(api.constObj.loginInfo);
		},
		/**
		 * 添加菜单信息--不建议使用
		 */
		addMenuInfo(state, menuInfo) {
			//store中不存在
			state.menuObj = menuInfo;
			sessionStorage.setItem(api.constObj.menuInfo, JSON.stringify(state.menuObj));
		},
		/**
		 * 移除菜单信息--不建议使用
		 */
		removeMenu() {
			sessionStorage.removeItem(api.constObj.menuInfo);
		},
		/**
		 * 移除所有存储的信息--谨慎使用
		 */
		removeAllInfo() {
			sessionStorage.clear();
		},
		/**
		 * 添加指定存储信息--推荐使用
		 * @param {Object} state 存储器对象
		 * @param {Object} storeObj 存储的对象信息
		 * @param {String} storeObj.name 存储信息的名称
		 * @param {Array || Object || String} storeObj.storeInfo 需要存储的信息
		 */
		saveStoreByName(state,storeObj) {
			let enableStore = true;//是否允许存储
			if(!storeObj.name || storeObj.name.length == 0){
				alert("name参数不能为空，无法存储该信息!");
				return;
			}
			switch (storeObj.name){
				case api.constObj.loginInfo:
					state.user = storeObj.storeInfo;
					break;
				case api.constObj.menuInfo:
					state.menuObj = storeObj.storeInfo;
					break;
				case api.constObj.mainInfo:
					state.mainInfo = storeObj.storeInfo;
					break;
				case api.constObj.applyInfo:
					state.applyInfo = storeObj.storeInfo;
					break;
				case api.constObj.areaOrgInfo:
					state.areaOrgInfo = storeObj.storeInfo;
					break;
				default:
					enableStore = false;
				    alert("存储的信息未定义，无法进行存储!");
					break;
			}
			if(enableStore){
				sessionStorage.setItem(storeObj.name, JSON.stringify(storeObj.storeInfo));	
			}
		},
		/**
		 * 移除指定存储信息--推荐使用
		 * @param {Object} state 存储器对象
		 * @param {Object} name 存储的信息的名称
		 */
		removeStoreByName(state,name) {
			let enableDelete = true;//是否允许删除
			if(!name || name.length == 0){
				alert("name参数不能为空，无法删除存储的信息!");
				return;
			}
			switch (name){
				case api.constObj.loginInfo:
					break;
				case api.constObj.menuInfo:
					break;
				case api.constObj.mainInfo:
					break;
				case api.constObj.applyInfo:
					break;
				case api.constObj.areaOrgInfo:
					break;
				default:
					enableDelete = false;
				    alert("存储的信息未定义，无法删除");
					break;
			}
			if(enableDelete){
				sessionStorage.removeItem(name);
			}
		}
	}
});
export default store