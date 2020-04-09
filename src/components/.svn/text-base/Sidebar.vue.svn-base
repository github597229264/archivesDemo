<template>
	<div class="sidebar">
		<el-menu class="sidebar-el-menu" 
			:default-active="defaultMenu"
			:collapse="collapse" 
			background-color="#ffffff" 
			text-color="#000000" 
			active-text-color="#20a0ff" 
			unique-opened 
			@select="selectMenu">
			<template>
				<el-menu-item @click="collapseChage">
					<i class="el-icon-menu expanedChange"></i>
					<span slot="title">导航列表</span>
				</el-menu-item>
			</template>
			<template v-for="item in menuList">
				<template v-if="item.children">
					<el-submenu :index="item.id" :key="item.url">
						<template slot="title">
							<i v-if="item.style" :class="[baseIconClass, item.style]"></i>
							<span slot="title">{{ item.text }}</span>
						</template>
						<template v-for="subItem in item.children">
							<el-submenu v-if="subItem.children" :index="subItem.id" :key="subItem.url">
								<template slot="title">
									<i v-if="subItem.style && subItem.style.length > 0" :class="[baseIconClass, subItem.style]"></i> {{ subItem.text }}
								</template>
								<el-menu-item v-for="(threeItem,i) in subItem.children" :key="i" :index="threeItem.id">
									{{ threeItem.text }}
								</el-menu-item>
							</el-submenu>
							<el-menu-item v-else :index="subItem.id" :key="subItem.url">
								<i v-if="subItem.style" :class="[baseIconClass, subItem.style]"></i>{{ subItem.text }}
							</el-menu-item>
						</template>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.id" :key="item.url">
						<i v-if="item.style" :class="[baseIconClass, item.style]"></i><span slot="title">{{ item.text }}</span>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script>
	import bus from '../common/bus';
	export default {
		name: 'Sidebar',
		data() {
			return {
				baseIconClass: 'iconfont',
				collapse: false,
				oldMenuList:[
					{
						id: '100',
						sort: 1,
						pid: '0',
						style: 'gd-shouye-shouye',
						url: '/index',
						text: '首页'
					}
				],
				menuList: []
			}
		},
		computed: {
			/**
			 * 默认菜单
			 */
			defaultMenu() {
				let IndexMenu = this.oldMenuList[0];
            	let storeObject = {
            		name:this.API.constObj.menuInfo,
            		storeInfo:IndexMenu
            	};
            	//选中的菜单信息
            	this.$store.commit('saveStoreByName',storeObject);
				this.$router.push({
					path: IndexMenu.url
				});
				return IndexMenu.id;
			}
		},
		created() {
			this.getData();
		},
		methods: {
			// 侧边栏折叠
			collapseChage() {
				this.collapse = !this.collapse;
				bus.$emit('collapse', this.collapse);
			},
			/**
			 * 监听菜单点击事件
			 */
			selectMenu(index, indexPath) {
				let findMenuObj = this.findObjById(index);
				let storeObject = {
            		name:this.API.constObj.menuInfo,
            		storeInfo:findMenuObj
            	};
            	//选中的菜单信息
            	this.$store.commit('saveStoreByName',storeObject);
				this.$router.push({
					path: findMenuObj.url
				});
			},
			/**
			 * 按照id查找对象
			 * @param {String} id 
			 * @return {Object} findObj
			 */
			findObjById(id){
				let findObj ={};
				for (let i=0;i<this.oldMenuList.length;i++) {
					if(this.oldMenuList[i].id == id){
						findObj = this.oldMenuList[i];
						break;
					}
				}
				return findObj;
			},
			/**
			 * 按照菜单路径查找对象
			 * @param {String} id 
			 * @return {Object} findObj
			 */
			findObjByPath(path){
				let findObj ={};
				for (let i=0;i<this.oldMenuList.length;i++) {
					if(this.oldMenuList[i].url == path){
						findObj = this.oldMenuList[i];
						break;
					}
				}
				return findObj;
			},
			/**
             * 获取列表数据
             */
            getData() {
                this.$axios({
					loading:{
            			isShow:false
            		},
            		method:'get',
                	url:this.API.main
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	let storeObject = {
                    		name:this.API.constObj.mainInfo,
                    		storeInfo:resData.data
                    	};
                    	//存储菜单及工作台等信息
                    	this.$store.commit('saveStoreByName',storeObject);
                    	this.oldMenuList.push(...resData.data.myUserMenus);
                    	//递归转换为tree格式数据
                    	this.menuList = this.commonFun.toTreeDataNormal(this.oldMenuList,{
							childKey:"id",
							fatherKey:"pid"
						});
                    }else{
			          	this.$message({
				            type: 'error',
				            message: '获取菜单失败，请刷新！'
			          	});     
                    }
                }).catch((err) => {
                	this.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
            }
		}
	}
</script>

<style scoped>
	.sidebar {
		display: block;
		position: absolute;
		left: 0;
		top: 70px;
		bottom: 0;
		overflow-y: scroll;
		.expanedChange{
			font-size: 24px;
			margin-left: -3px;
		}
	}
	
	.sidebar::-webkit-scrollbar {
		width: 0;
	}
	
	.sidebar-el-menu:not(.el-menu--collapse) {
		width: 250px;
	}
	
	.sidebar>ul {
		height: 100%;
	}
	.iconfont {
		margin-right:5px;
	}
</style>