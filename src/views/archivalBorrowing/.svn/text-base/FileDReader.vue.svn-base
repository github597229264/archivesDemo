<template>
	<el-container class="fileDReader">
		<iframe id="readerIframe" ref="iframe" :src="readerUrl" frameborder="0"  @load="dataClassify"></iframe>
	</el-container>
</template>

<script>
	export default {
		name: 'FileDReader', //档案阅读器--文件
		components: {},
		props:[
			"fileObj"//档案信息
		],
		data(){
			return {
				readerUrl:this.API.DReaderURL,//阅读器路径
				HDImage: [],//高清图
				originalImage: []//原始图
			}
		},
		created() {
			//在vue中设置标识id 并将方法暴露在window中 供iframe中的html回调
			let self = this
	        window["vueIframeId"] = (params)=>{
	            self.iframeChildCall(params);  
	        }
		},
		methods: {
			/**
			 * iframe中的子页面回调方法
			 * @param {Array} paramsList
			 */
			iframeChildCall(paramsList){
				console.log(paramsList);
				this.$emit("FileDReaderCallback",paramsList);
			},
			/**
			 * 数据分类处理
			 */
			dataClassify(){
				if(this.fileObj){
					let aPrintIndexs = [];//打印的图片下标集合
					let HDArchArea = {};//高清图
					let OPArchArea = {};//原始图
					let _archArea=[];//区域图片对象
					if(this.fileObj.expanded && this.fileObj.expanded.length > 0){//原始图
						this.originalImage.push(this.fileObj.expanded);
						OPArchArea.fileName =  this.fileObj.expanded;
						OPArchArea.fileArea =  this.fileObj.fileAreaGather.length >0 ? JSON.parse(this.fileObj.fileAreaGather):[];
					}
					if(this.fileObj.gaoqin && this.fileObj.gaoqin.length > 0){//高清图
						this.HDImage.push(this.fileObj.gaoqin);
						HDArchArea.fileName =  this.fileObj.gaoqin;
						HDArchArea.fileArea =  this.fileObj.fileAreaGather.length >0 ? JSON.parse(this.fileObj.fileAreaGather):[];
					}
					if(this.fileObj.isPrint){
						aPrintIndexs=[1];
					}
					if(this.fileObj.fileAreaGather && this.fileObj.fileAreaGather.length > 0){
						_archArea.push(HDArchArea);
						_archArea.push(OPArchArea);
					}
					let initParamsObj ={
						HD:this.HDImage,
						oldPicture:this.originalImage,
						aPrintIndexs:aPrintIndexs,
						_archArea:_archArea,
						region:true
					};
					//调用iframe中的方法
					this.$refs.iframe.contentWindow.initReader(initParamsObj);
				}else{
					this.$alert('该档案的文件数据为空,请返回!', '信息提示', {
			          confirmButtonText: '确定',
			          callback: action => {
			            this.$emit("FileDReaderCallback",[]);
			          }
			        });
				}
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.fileDReader {
		height: 570px; 
		border: 1px solid #eee;
		iframe{
			width:100%;
			height: 95%;
		}
	}
</style>