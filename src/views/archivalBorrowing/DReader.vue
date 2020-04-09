<template>
	<el-container class="dReader">
		<el-header v-if="showHeader">
			<span>档案人员信息: </span>
			<span>姓名:</span>
			<span class="mainFont">{{fileInfo.a0101}}</span>
			<span>工作单位:</span>
			<span class="mainFont">{{fileInfo.b0001}}</span>
		</el-header>
		<el-main>
			<iframe id="readerIframe" ref="iframe" :src="readerUrl" frameborder="0"></iframe>
		</el-main>
	</el-container>
</template>

<script>
	export default {
		name: 'DReader', //档案阅读器--档案目录
		components: {},
		props:{
			id:{//档案目录id
				type:String,
				required:true
			},
			elid:{//中间表id
				type:String,
				required:false
			},
			peopleObj:{//档案信息
				type:Object,
				required:true
			},
			enabledPrint:{//是否允许打印
				type:Boolean,
				required:true
			}
		},
		data(){
			return {
				readerUrl:this.API.DReaderURL,//阅读器路径
				showHeader:false,//是否显示头部
				fileInfo:{},//申请信息
				catalogId:'',//目录id
				fileList:'',//文件列表
				HDImage: [],//高清图
				originalImage: []//原始图
			}
		},
		created() {
			if(this.id && this.id.length >0){
				if(this.peopleObj){
					this.fileInfo = this.peopleObj; 
					this.showHeader = true;
				}
				this.catalogId = this.id;
				this.getImagesById();//根据十大类目录id查询档案图片列表
			}
		},
		methods: {
			/**
			 * 根据十大类目录id查询档案图片列表
			 */
			getImagesById() {
				let requertUrl = this.API.lookFiles;
				let paramsObj ={
					id:this.catalogId//目录id
				};
				if(this.enabledPrint){
					requertUrl = this.API.lookFile;
				}else{
					paramsObj ={
						id:this.catalogId,//目录id
						elid:this.elid//中间表id
					};
				}
				this.$axios({
                	loading:{
            			isShow:true,
            			target:'.dReader'
            		},
					method: 'get',
					url: requertUrl,
					params: paramsObj
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.fileList = resData.data;
						this.dataClassify();//数据分类处理
					}else if(resData.code == "8") {
						this.$alert('该档案目录下没有文件,请返回!', '信息提示', {
				          confirmButtonText: '确定',
				          callback: action => {
				            this.$emit("DReaderCallback");
				          }
				        });
					} else {
						this.$message({
							type: 'error',
							message: '查询档案文件失败，请刷新重试！'
						});
					}
				}).catch((err) => {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			/**
			 * 数据分类处理
			 */
			dataClassify(){
				let aPrintIndexs = [];//打印的图片下标集合
				if(this.fileList.length > 0){
					let _archArea=[];//区域图片对象
					this.fileList.forEach((item,index)=>{
						let HDArchArea = {};//高清图
						let OPArchArea = {};//原始图
						if(item.expanded && item.expanded.length > 0){//原始图
							this.originalImage.push(item.expanded);
							OPArchArea.fileName =  item.expanded;
							OPArchArea.fileArea = item.fileAreaGather.length >0 ? JSON.parse(item.fileAreaGather):[];
						}
						if(item.gaoqin && item.gaoqin.length > 0){//高清图
							this.HDImage.push(item.gaoqin);
							HDArchArea.fileName =  item.gaoqin;
							HDArchArea.fileArea =  item.fileAreaGather.length >0 ? JSON.parse(item.fileAreaGather):[];
						}
						if(item.fileAreaGather && item.fileAreaGather.length > 0){
							_archArea.push(HDArchArea);
							_archArea.push(OPArchArea);
						}
						if(this.enabledPrint || (!this.enabledPrint && item.isPrint)){
							aPrintIndexs.push(index*1+1);
						}
					})
					let initParamsObj ={
						HD:this.HDImage,
						oldPicture:this.originalImage,
						aPrintIndexs:aPrintIndexs,
						_archArea:_archArea,
						region:false
					};
					try{
						//调用iframe中的方法
						this.$refs.iframe.contentWindow.initReader(initParamsObj);	
					}catch(e){
						let count = 0;
						let timer = setInterval(()=>{
							count++;
							if(this.$refs.iframe){
								clearInterval(timer);
								count = 0;
								this.$refs.iframe.contentWindow.initReader(initParamsObj);								
							}else if(count > 3){
								clearInterval(timer);
								count = 0;
							}
						},1000);
					}

				}else{
					this.$alert('该档案目录下没有文件,请返回!', '信息提示', {
			          confirmButtonText: '确定',
			          callback: action => {
			            this.$emit("DReaderCallback");
			          }
			        });
				}
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.dReader {
		height: 100%; 
		border: 1px solid #eee;
		.el-header{
			background-color: #B3C0D1;
			color: #ffffff;
			height: 40px;
			height: 40px !important;
			line-height: 40px !important;
			font-size: 22px;
			.mainFont{
				margin:0 10px;
				color: #303133;
			}
		}
		.el-main{
			height: calc(100%-40);
			height: -moz-calc(100%-40);
			height:-webkit-calc(100%-40);
			text-align: center;
			justify-content: center;
			align-items: center;
			padding: 0 0 0 10px;
			iframe{
				width:100%;
				height: 82vh;
			}
		}
	}
</style>