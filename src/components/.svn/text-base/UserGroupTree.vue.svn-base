<template>
	<div class="userGroupTree">
	    <el-tree
	      ref="tree"
	      :data="treeList"
	      node-key="id"
	      default-expand-all
	      highlight-current
	      :default-checked-keys="selectedOptions"
	      :expand-on-click-node="false"
	      :render-content="renderContent"
	      @node-click="treeSelected">
	    </el-tree>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'UserGroupTree', //用户组树
		props:[
			'defaultOptions'//默认选中项--必须是完整路径eg:['节点id'] 或 ['父节点id','子节点id']
		],
		data() {
			return {
				selectedOptions:[],//选中值
				treeProps:{
					value:'id',
					label:'name',
					children:'children'
				},
				treeList:[]//必须是树形结构的对象数组
			}
		},
		created(){
			this.getData();
		},
		mounted() {
			
		},
		methods: {
			/**
			 * 监听树点击事件
			 * 回调父组件中UserGroupTreeCall事件，传回选中的对象
			 */
			treeSelected(data,node,self) {
		        let returnObj =data;
		        this.$emit('UserGroupTreeCall',returnObj);	
		   },
            /**
             * 获取列表数据
             */
            getData() {
            	var self = this;
                this.$axios({
                	loading:{
            			isShow:true,
            			target:'.userGroupTree'
            		},
            		method:'get',
                	url:this.API.findUserOrganizationTree
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	self.oldTreeList = resData.data;
                    	//递归转换为tree格式数据
                    	self.treeList = self.commonFun.toTreeData(resData.data);
                    	let returnObj = {};
                    	if(self.defaultOptions){
                			let mappingObj ={
	                    		childKey:'id',
	                    		fatherKey:'pId'
	                    	};
                			let newArray = self.commonFun.findTreeNodeById(self.oldTreeList,self.defaultOptions,mappingObj);
                			self.selectedOptions = self.commonFun.createArrIdAndReverse(newArray,"id");
                			returnObj =this.findObjById(self.defaultOptions);
                    	}else if(self.defaultOptions==""){
                    		returnObj = {};
                    		self.selectedOptions = "";
                    	}else{
                    		returnObj = self.treeList[0];
                    		self.selectedOptions.push(self.treeList[0].id);
                    	}
                    	this.$refs.tree.setCheckedKeys(self.selectedOptions);
                    	this.$emit('UserGroupTreeCall',returnObj);
                    }else{
			          	self.$message({
				            type: 'error',
				            message: '获取用户组树数据失败，请刷新重试！'
			          	});     
                    }
                }).catch((err) => {
                	console.log("获取用户组树数据="+err);
                	self.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
            },
			/**
			 * 自定义显示内容 
			 */
		    renderContent(h, { node, data, store }) {
			    return (<span>{data.name}</span>);
		    }
		},
	};
</script>
<style lang="scss" scoped type="text/css">
	.userGroupTree{
		width:100%;
		height:80%;
		.el-tree{
			height:100%;
			width: 100%;
			min-width: 250px;
		}	
	}
	
</style>