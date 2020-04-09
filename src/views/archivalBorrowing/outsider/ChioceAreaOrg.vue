<template>
	<el-container class="chioceAreaOrg">
		<el-header height="10%">
			<el-button type="primary" icon="el-icon-arrow-left" @click="goBackPage">返回</el-button>
		</el-header>
	  	<el-main >
		    <el-row v-for="items in areaOrgList" :gutter="18"  type="flex"  justify="left" align="left">
		    	<el-col :span="2">
		    	</el-col>
				<el-col :span="4" v-for="(item,index) in items">
				    <el-card shadow="always" v-if="index == 0" style="background-color: #00BDA9;" @click.native="jumpUrl(item.code,item.name)">
				    	<i class="iconfont gd-xitong-zuzhijiagou"></i>
				        <p>{{item.name}}</p>
				    </el-card>
				    <el-card shadow="always" v-if="index == 1" style="background-color: #657FEE;" @click.native="jumpUrl(item.code,item.name)">
				    	<i class="iconfont gd-xitong-zuzhijiagou"></i>
				        <p>{{item.name}}</p>
				    </el-card>
				    <el-card shadow="always" v-if="index == 2" style="background-color: #F36F5A;" @click.native="jumpUrl(item.code,item.name)">
				    	<i class="iconfont gd-xitong-zuzhijiagou"></i>
				        <p>{{item.name}}</p>
				    </el-card>
				    <el-card shadow="always" v-if="index == 3" style="background-color: #F3AD00;" @click.native="jumpUrl(item.code,item.name)">
				    	<i class="iconfont gd-xitong-zuzhijiagou"></i>
				        <p>{{item.name}}</p>
				    </el-card>
				    <el-card shadow="always" v-if="index == 4" style="background-color: #1FA9F2;" @click.native="jumpUrl(item.code,item.name)">
				      <i class="iconfont gd-xitong-zuzhijiagou"></i>
				      <p>{{item.name}}</p>
				    </el-card>
				</el-col>
		    	<el-col :span="2">
		    	</el-col>
			</el-row>
	  	</el-main>
	</el-container>
</template>

<script>
	export default {
		name:'ChioceAreaOrg', //选择组织机构或区域--外单位查询人员
		data() {
			return {
				 areaOrganization:this.API.constObj.areaName,
				 areaOrgList:[],
				 userInfo:{
				 	token:''
				 }
			}
		},
		created() {
			this.getAreaOrgData();
		},
		methods: {
            /**
             * 获取区域组织数据
             */
            getAreaOrgData() {
            	var self = this;
                this.$axios({
					loading:{
            			isShow:true,
            			target:'.chioceAreaOrg'
            		},
            		method:'get',
                	url:this.API.areaTree
                }).then((res) => {
                    var resData = res.data;
                    if(resData.code =="1"){
                    	var result = [];
						for(var i=0;i<resData.data.length;i+=5){
						    result.push(resData.data.slice(i,i+5));
						}
                    	self.areaOrgList = result;
                    }else{
                    	self.$message({
				            type: 'error',
				            message: '获取区域数据失败，请刷新重试！'
			          	}); 
                    }
                }).catch((err) => {
                	self.$message({
			            type: 'error',
			            message: '请求异常，请检查网络！'
			        });  
                })
            },
			/**
			 * 跳转到主操作界面
			 * @param {Object} code 区域code
			 * @param {Object} name 区域名称
			 */
			jumpUrl(code,name){
				this.$store.commit('saveStoreByName',{
					name:this.API.constObj.areaOrgInfo,
					storeInfo:{
			        	areaCode:code,
			        	areaOrganization: name
			        }
				});
				this.$router.push({
					path: '/applyMain'
			    });
			},
			/**
			 * 返回上一页
			 */
			goBackPage(){
				this.$store.commit('removeStoreByName',this.API.constObj.loginInfo);
				this.$router.push({ path: "/login" });
			}
		}
	}
</script>
<style lang="scss" scoped type="text/css">
	.chioceAreaOrg {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		.el-header{
			display: flex;
    		align-items: center;
    		text-align:center;
    		justify-content:center;
    		position:relative;
			.el-button{
				position:absolute;
				left: 5vw;
				bottom:0;
				cursor: pointer;
			}
		}
		.el-main{
			padding: 0 10%;
			.el-card{
				text-align: center;
				margin-bottom:18px;
				border-radius: 0;
				i{
					margin-bottom: 15px;
					font-size: 90px;
					color: #FFFFFF;
				}
				p{
					color: #FFFFFF;
					font: 16px Extra large;
				  	overflow:hidden;
				  	text-overflow:ellipsis;
				  	-o-text-overflow:ellipsis;
				  	-webkit-text-overflow:ellipsis;
				  	-moz-text-overflow:ellipsis;
				  	white-space:nowrap;
				}
			}
			.el-card:hover{
				background-color: #FFB600;
				cursor: pointer;
				border-radius: 30px;
			}
		}
	}
</style>