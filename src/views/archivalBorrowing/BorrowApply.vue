<template>
    <div class="outsiderBorrowApply">
        <div class="crumbs">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			  <el-breadcrumb-item>档案查借阅</el-breadcrumb-item>
			  <el-breadcrumb-item>查借阅申请</el-breadcrumb-item>
			</el-breadcrumb>
        </div>
        <div class="container">
        	<el-header>
	        	<el-steps :active="activeStep" :process-status="processStatus" :finish-status="finishStatus" align-center>
				  <el-step title="选择档案人员"></el-step>
				  <el-step title="确认档案人员"></el-step>
				  <el-step title="填写申请表"></el-step>
				  <el-step title="完成"></el-step>
				</el-steps>
			</el-header>
  			<el-main ref="elMain"  :style="{height:mainHeight}">
				<NormalSelectPersonnelFiles v-show="activeStep<=1"  :mainHeight="mainHeight"  :isAreaQuery="true" @changeStep="changeStep"></NormalSelectPersonnelFiles>
				<NormalEditPersonnelFiles  v-show="activeStep==2"  :mainHeight="mainHeight"  :defaultTables="selectFiles"  @changeStep="changeStep"></NormalEditPersonnelFiles>
				<NormalApply  v-show="activeStep==3"  :mainHeight="mainHeight"  :defaultTables="editFiles"	@changeStep="changeStep"></NormalApply>
	        </el-main>
        </div>
    </div>
</template>

<script>
	import NormalSelectPersonnelFiles from './NormalSelectPersonnelFiles.vue';
	import NormalEditPersonnelFiles from './NormalEditPersonnelFiles.vue';
	import NormalApply from './NormalApply.vue';
    export default {
        name: 'BorrowApply',//本单位人员查借阅申请
	    components:{
	        NormalSelectPersonnelFiles,//选择档案人员--标准版
	        NormalEditPersonnelFiles,//编辑选择的档案人员--标准版
	        NormalApply //正常人员查询人员申请
	    },
        data() {
            return {
            	mainHeight:'',//main高度
            	activeStep: 0,//当前步骤
                selectFiles: [],//第一步选中的人员档案数据
                editFiles: [],//第二步编辑后的人员档案数据
                processStatus:"process",//当前步骤的状态
                finishStatus:"finish"//结束步骤的状态
            }
        },
        created() {
        },
        mounted(){
        	this.mainHeight = window.innerHeight - this.$refs.elMain.$el.offsetTop- 60;	
        },
        computed: {

        },
        methods: {
        	/**
        	 * 更换步骤--子组件调用
        	 * @param {Number} step 需要跳转的步骤 (1-4)
        	 * @param {Object} data 传递的数据
        	 */
        	changeStep(step,data) {
        		if(step <0 || step >4){
        			console.log("切换步骤出错:step必须是0到4之间");
        			return;
        		}
        		this.activeStep = step;
		        switch (step){
		        	case 0:
		        		this.selectFiles =[];
		        		this.editFiles = [];
		        		break;
		        	case 1:
		        		this.editFiles = [];
		        		if(data){
		        			this.selectFiles = data;	
		        		}
		        		break;
		        	case 2:
		        		this.editFiles = [];
		        		if(data){
		        			this.selectFiles = data;	
		        		}		        		
		        		break;
		        	case 3:
		        		if(data){
		        			this.editFiles = data;	
		        		}
		        		break;
		        	case 4:

		        		break;
		        	default:
		        		this.selectFiles = [];
		        		this.editFiles = [];
		        		break;
		        }
		    }
        }
    }

</script>
<style  lang="scss" scoped type="text/css">
    .outsiderBorrowApply{
        width: 100%;
        .container{
		    .el-main{
		    	padding: 20px 20px 0;
		    }
        }
    }

</style>
