<template>
	<div class="organization-select">
		<el-cascader  
			:placeholder="holder"
			expand-trigger="hover" 
			:options="treeList"  
			:change-on-select="true"
			v-model="selectedOptions"
			:props=treeProps 
			:clearable="true"
			:show-all-levels="false"
    		@change="handleChange"
    		:disabled='disabled'>
		</el-cascader>
	</div>
</template>
<script>
	import bus from '../common/bus';
	export default {
		name: 'AreaTreeSelect', //区域树形下拉框
		props:[
			'defaultOptions',//默认选中项id
			'title',//标题
			'disabled',//	是否启用
		],
		data() {
			return {
				selectedOptions:[],//选中值--必须是完整路径eg:['节点code'] 或 ['父节点code','子节点code']
				treeProps:{
					value:'id',
					label:'name',
					children:'children'
				},
				oldTreeList:[],//原始数据
				treeList:[],//必须是树形结构的对象数组
				holder:"请选择",
			}
		},
		created(){
			if(this.title) this.holder = this.title;
			this.getData();
			if(this.disabled === undefined) this.disabled = false;
		},
		mounted() {
			
		},
		methods: {
			/**
			 * 监听change事件
			 * 回调父组件中OrgTreeSelectCall事件，传回选中的value值
			 * @param {Array} valArray 选中的值
			 */
			handleChange(valArray) {
				let returnId ='';
		        let findId ='';
		        if(valArray  && valArray.length > 0){
		        	findId = valArray[valArray.length-1];	
		        }
                let returnObj = this.findObjById(findId);
		        this.$emit('areaTreeSelectCall',returnObj);	
		   },
			/**
			 * 按照id查找数据
			 * @param {Number} id 选中项的id
			 * @return {Object} 返回查找到的数据
			 */
			findObjById(id){
				let findObject = {};
				for(let i =0;i<this.oldTreeList.length;i++){
					if(id == this.oldTreeList[i].id){
						findObject = this.oldTreeList[i];
						break;
					}
				}
				return findObject;
			},
            /**
             * 获取列表数据
             */
            getData() {
            	var self = this;
                this.$axios({
					loading:{
            			isShow:false
            		},
            		method:'get',
                	url:this.API.areaTree
                }).then((res) => {
                    var resData = res.data;
                    console.log(resData);
                    if(resData.code =="1"){
                    	
                    	self.oldTreeList = resData.data;
                    	//递归转换为tree格式数据
                    	self.treeList = self.commonFun.toTreeDataNormal(resData.data,{
							childKey:"id",
							fatherKey:"pId"
						});
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
                    	}else{
                    		self.selectedOptions.push(self.treeList[0].id);
                    		returnObj = self.treeList[0];
                    	}
                    	this.$emit('areaTreeSelectCall',returnObj);
                    }else{
                    	self.$message({
				            type: 'error',
				            message: '获取区域树形下拉框数据失败，请刷新重试！'
			          	}); 
                    }
                }).catch((err) => {
                	console.log("获取区域树形下拉框数据="+err);
                	self.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
            }
		},
	};
</script>
<style lang="scss" scoped type="text/css">
	.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
		height: auto;
		padding: 0;
	}
	
	.el-select-dropdown__item.selected {
		font-weight: normal;
	}
	
	ul li>>>.el-tree .el-tree-node__content {
		height: auto;
	}
	
	.el-tree-node__label {
		font-weight: normal;
	}
	
	.el-tree>>>.is-current .el-tree-node__label {
		color: #409EFF;
		font-weight: 700;
	}
	
	.el-tree>>>.is-current .el-tree-node__children .el-tree-node__label {
		color: #606266;
		font-weight: normal;
	}
</style>