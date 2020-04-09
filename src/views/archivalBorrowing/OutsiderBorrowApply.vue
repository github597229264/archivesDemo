<template>
    <div class="outsiderBorrowApply">
        <div class="container">
        	<el-header>
	        	<el-steps :active="activeStep" :process-status="processStatus" :finish-status="finishStatus" align-center>
				  <el-step title="选择档案人员"></el-step>
				  <el-step title="确认档案人员"></el-step>
				  <el-step title="填写申请表"></el-step>
				  <el-step title="记录查询码"></el-step>
				</el-steps>
			</el-header>
  			<el-main  ref="elMain"   :style="{height:mainHeight}">
				<SelectPersonnelFiles v-show="activeStep<=1"  :mainHeight="mainHeight"  :isAreaQuery="false" @changeStep="changeStep"></SelectPersonnelFiles>
				<EditPersonnelFiles v-show="activeStep==2"  :mainHeight="mainHeight"  :defaultTables="selectFiles"  @changeStep="changeStep"></EditPersonnelFiles>
				<OutsiderApply  v-show="activeStep==3"  :mainHeight="mainHeight"  :defaultTables="editFiles"	@changeStep="changeStep"></OutsiderApply>
	        </el-main>
        </div>
    </div>
</template>

<script>
	import SelectPersonnelFiles from './SelectPersonnelFiles.vue';
	import EditPersonnelFiles from './EditPersonnelFiles.vue';
	import OutsiderApply from './OutsiderApply.vue';
    export default {
        name: 'OutsiderBorrowApply',//外单位人员查借阅申请
	    components:{
	        SelectPersonnelFiles,//选择档案人员
	        EditPersonnelFiles,//编辑选择的档案人员
	        OutsiderApply //外单位查询人员申请
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
        	this.mainHeight = window.innerHeight - this.$refs.elMain.$el.offsetTop;	
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
		        			this.selectFiles = [...data];	
		        		}
		        		break;
		        	case 2:
		        		this.editFiles = [];
		        		if(data){
		        			this.selectFiles = [...data];	
		        		}		        		
		        		break;
		        	case 3:
		        		if(data){
		        			this.editFiles = [...data];
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
        height:100%;
        .container{
		   
        }
    }

</style>
