<template>
	<div class="mailListTreeContent">
	    <el-tree
	      ref="tree"
	      :data="treeList"
	      node-key="id"
	      default-expand-all
	      highlight-current
	      :expand-on-click-node="false"
	      :render-content="renderContent"
	      @node-click="treeSelected">
	    </el-tree>
	</div>
</template>
<script>
	export default {
		name: 'mailListTreeContent', 
		props:[
			'defaultOptions'//默认选中项--必须是完整路径eg:['节点id'] 或 ['父节点id','子节点id']
		],
		data() {
			return {
				treeProps:{
					value:'id',
					label:'title',
					children:'children'
				},
				treeList:[ ]//必须是树形结构的对象数组
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
			 * 回调父组件中mailListTreeCall事件，传回选中的对象
			 */
			treeSelected(data,node,self) {
		        let returnObj =data;
		        this.$emit('mailListTreeCall',returnObj);	
		   },
            /**
             * 获取列表数据
             */
            getData() {
                this.$axios({
                	loading:{
            			isShow:true,
            			target:'.mailListTreeContent'
            		},
            		method:'get',
                    url:this.API.queryBusinessType,
                    params:{
						typename: "Sys_AddressList"
					}
                }).then((res) => {
					var resData = res.data;
                    if(resData.code =="1"){
                    	//递归转换为tree格式数据
                    	this.treeList = this.commonFun.toTreeDataNormal(resData.data,{
							childKey:'id',
	                    	fatherKey:'pid'
						});
                    	let returnObj = this.treeList[0];
                    	this.$emit('mailListTreeCall',returnObj);
                    }else{
			          	self.$message({
				            type: 'error',
				            message: '获取数据失败，请刷新重试！'
			          	});     
                    }
                }).catch((err) => {
                	console.log("获取数据="+err);
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
			    return (<span>{data.title}</span>);
		    }
		},
	};
</script>
<style lang="scss" scoped type="text/css">
	.mailListTreeContent{
		width:100%;
		height:80%;
		.el-tree{
			height:100%;
			width: 100%;
			min-width: 250px;
		}	
	}
	
</style>