<template>
	<el-container>
		<el-header>
			<div class="titleInfoBox">
				<div class="info">姓名: <span>{{basicSelectObj.a0101}}</span></div>
				<div class="info">籍贯: <span>{{basicSelectObj.a0111a}}</span></div>
				<div class="info">职业单位及职务: <span>{{basicSelectObj.e10040}}</span></div>
			</div>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<el-row class="tac">
					<el-col :span="12">
						<el-menu default-active="1-1"  class="el-menu-vertical-demo" :unique-opened="isTrue" @open="handleOpen" @select="selectItem" @close="handleClose">
							<el-submenu index="1">
								<template slot="title">
									<i class="el-icon-location"></i>
									<span>档案类</span>
								</template>
								<el-menu-item-group>
									<el-menu-item index="1-1">基本信息</el-menu-item>
									<el-menu-item index="1-2">调动信息</el-menu-item>
									<el-menu-item index="1-3">离退信息</el-menu-item>
									<el-menu-item index="1-4">档案信息</el-menu-item>
								</el-menu-item-group>
							</el-submenu>
							<el-submenu index="2">
								<template slot="title">
									<i class="el-icon-location"></i>
									<span>扩充信息</span>
								</template>
								<el-menu-item-group>
									<el-menu-item index="2-1">工作单位及职务</el-menu-item>
									<el-menu-item index="2-2">学位信息</el-menu-item>
									<el-menu-item index="2-3">学历信息</el-menu-item>
									<el-menu-item index="2-4">专业技术任职资格</el-menu-item>
									<el-menu-item index="2-5">家庭成员及社会关系</el-menu-item>
									<el-menu-item index="2-6">简历信息</el-menu-item>
									<el-menu-item index="2-7">职级信息</el-menu-item>
									<el-menu-item index="2-8">职务变动</el-menu-item>
								</el-menu-item-group>
							</el-submenu>
							<el-submenu index="3">
								<template slot="title">
									<i class="el-icon-location"></i>
									<span>其他类</span>
								</template>
								<el-menu-item-group>
									<el-menu-item index="3-1">兼职管理</el-menu-item>
									<el-menu-item index="3-2">年度考核表</el-menu-item>
									<el-menu-item index="3-3">任免信息</el-menu-item>
								</el-menu-item-group>
							</el-submenu>
						</el-menu>
					</el-col>
				</el-row>
			</el-aside>
			<el-main>
				<!--基本信息-->
				<div class="listSelect" v-if="isShowList == '1-1'">
					<EditBasicInformation :selectObj="basicSelectObj"></EditBasicInformation>
				</div>
				<!--调动信息-->
				<div class="listSelect" v-if="isShowList=='1-2'">
					<EditTransferInformation :selectObj="basicSelectObj"></EditTransferInformation>
				</div>
				<!--离退信息-->
				<div class="listSelect" v-if="isShowList=='1-3'">
					<EditRetreatInformation :selectObj="basicSelectObj"></EditRetreatInformation>
				</div>
				<!--档案信息-->
				<div class="listSelect" v-if="isShowList=='1-4'">
					<EditRecordInformation :selectObj="basicSelectObj"></EditRecordInformation>

				</div>
				<!--工作单位及职务-->
				<div class="listSelect listSelect-list" v-if="isShowList=='2-1'">
					<ExtendCompany :selectObj="basicSelectObj"></ExtendCompany>
				</div>
				<!--学位信息查询列表页-->
				<div class="listSelect listSelect-list" v-if="isShowList=='2-2'">
					<ExtendDegree :selectObj="basicSelectObj"></ExtendDegree>
				</div>
				<!--学历信息查询列表页-->
				<div class="listSelect listSelect-list" v-if="isShowList=='2-3'">
					<ExtendEducation :selectObj="basicSelectObj"></ExtendEducation>
				</div>
				<!--专业技术任职资格信息查询列表页-->
				<div class="listSelect listSelect-list" v-if="isShowList=='2-4'">
					<ExtendMajor :selectObj="basicSelectObj"></ExtendMajor>
				</div>
				<!--家庭成员及社会关系列表-->
				<div class="listSelect listSelect-list" v-if="isShowList=='2-5'">
					<ExtendFamilyAndSociety :selectObj="basicSelectObj"></ExtendFamilyAndSociety>
				</div>
				<!--简历信息查询列表-->
				<div class="listSelect listSelect-list" v-if="isShowList=='2-6'">
					<ExtendResume :selectObj="basicSelectObj"></ExtendResume>
				</div>
				<!--查询职级信息列表-->
				<div class="listSelect listSelect-list" v-if="isShowList=='2-7'">
					<ExtendInquiryRank :selectObj="basicSelectObj"></ExtendInquiryRank>
				</div>
				<!--查询职务变动列表-->
				<div class="listSelect listSelect-list" v-if="isShowList=='2-8'">
					<ExtendJobChange :selectObj="basicSelectObj"></ExtendJobChange>
				</div>
				<!--兼职管理列表查询-->
				<div class="listSelect listSelect-list" v-if="isShowList=='3-1'">
					<ExtendPartTimeJob :selectObj="basicSelectObj"></ExtendPartTimeJob>
				</div>
				<!--年度考核表列表查询-->
				<div class="listSelect listSelect-list" v-if="isShowList=='3-2'">
					<ExtendExamine :selectObj="basicSelectObj"></ExtendExamine>
				</div>
				<!--查询任免信息列表-->
				<div class="listSelect listSelect-list" v-if="isShowList=='3-3'">
					<ExtendAppointAndRemove :selectObj="basicSelectObj"></ExtendAppointAndRemove>
				</div>
			</el-main>
		</el-container>

	</el-container>
</template>

<script>
	import EditBasicInformation from './EditBasicInformation.vue'; //基本信息
	import EditTransferInformation from './EditTransferInformation.vue'; //调动信息
	import EditRetreatInformation from './EditRetreatInformation.vue'; //离退信息
	import EditRecordInformation from './EditRecordInformation.vue'; //档案信息
	import ExtendCompany from './ExtendCompany.vue'; //扩充-工作单位及职务
	import ExtendDegree from './ExtendDegree.vue'; //扩充-学位信息
	import ExtendEducation from './ExtendEducation.vue'; //扩充-学位信息
	import ExtendMajor from './ExtendMajor.vue'; //扩充-学位信息
	import ExtendFamilyAndSociety from './ExtendFamilyAndSociety.vue'; //扩充-学位信息
	import ExtendResume from './ExtendResume.vue'; //扩充-学位信息
	import ExtendInquiryRank from './ExtendInquiryRank.vue'; //扩充-学位信息
	import ExtendJobChange from './ExtendJobChange.vue'; //扩充-学位信息
	import ExtendPartTimeJob from './ExtendPartTimeJob.vue'; //扩充-学位信息
	import ExtendExamine from './ExtendExamine.vue'; //扩充-学位信息
	import ExtendAppointAndRemove from './ExtendAppointAndRemove.vue'; //扩充-学位信息

	import Pagination from '../../components/Pagination.vue';
	export default {
		name: 'EditPersonal',
		props: ['selectDeceive', 'editBack'],

		components: {
			Pagination, //分页组件
			EditBasicInformation, //档案类-基本信息
			EditTransferInformation, //档案类-调动信息
			EditRetreatInformation, //档案类-离退信息
			EditRecordInformation, //档案类-档案信息
			ExtendCompany, //扩充类-工作单位及职务
			ExtendDegree, //扩充类-学位信息
			ExtendEducation, //扩充类-学历信息
			ExtendMajor, //扩充类-专业技术任职资格
			ExtendFamilyAndSociety, //扩充类-家庭成员及社会关系
			ExtendResume, //扩充类-简历信息
			ExtendInquiryRank, //扩充类-职级信息
			ExtendJobChange, //扩充类-职务变动
			ExtendPartTimeJob, //其他类-兼职管理
			ExtendExamine, //其他类-年度考核表
			ExtendAppointAndRemove, //其他类-任免信息
		},

		data() {
			return {
				basicSelectObj: {}, //父组件带来-基本信息
				isTrue: true, //是否
				pageObj: {
					pageIndex: this.API.constObj.pageIndex, //当前页码
					total: 0, //数据总数
					pageSize: this.API.constObj.pageSize, //页大小
				},
				isShowList: '1-1',
			}

		},
		created() {
			this.basicSelectObj = { ...this.selectDeceive
			}
			//console.log("编辑selectDeceive"+this.selectDeceive)
			//this.getEditData();

		},
		methods: {
			//分页组件回调方法
			PageTurning(page_obj) {
				this.pageObj.pageIndex = page_obj.page_index;
				this.pageObj.pageSize = page_obj.page_size;
				this.getPagerE01Z500Json();
			},
			//添加人员信息
			TransferListAdd() {
				let pathUrl = 'TransferListAdd';
				this.$router.push({
					path: pathUrl,
				});
			},
			getPagerE01Z500Json() {
				this.$axios({
					method: 'get',
					url: this.API.findA01InformationPage,
					params: {
						a01010: '',
						a01statusb: '',
						e10statusb: '',
						pageIndex: this.pageObj.pageIndex,
						pageSize: this.pageObj.pageSize,
					}
				}).then((res) => {
					var resData = res.data;
					if(resData.code == "1") {
						this.cadreInformationList = resData.data.data;
						this.pageObj.total = resData.data.total;
					}else{
						this.$message({
							type: 'error',
							message: '获取失败，请刷新！'
						});
					}
				}).catch((err)=> {
					this.$message({
						type: 'error',
						message: '请求异常，请检查网络！'
					});
				})
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			selectItem(index) { //侧边栏判断显示哪页
				this.isShowList = index
			},

		}
	}
</script>

<style lang="scss" scoped>
	.el-container {
		/*margin-bottom: 40px;
		height: 800px;*/
		.el-header {
			.titleInfoBox {
				display: flex;
				justify-content: space-around;
				position: absolute;
				top: 50px;
				left: 0;
				right: 0;
				font-size: 18px;
				background: #eee;
				height: 50px;
				align-items: center;
			}
		}
		.el-aside {
			background-color: #fff;
			color: #333;
			text-align: center;
			line-height: 200px;
			.el-row {
				height: 100%;
				.el-col-12 {
					width: 100%;
					height: 100%;
					.el-menu {
						height: 100%
					}
				}
			}
		}
		.el-main{
			.listSelect {
			/*margin: 0 auto;*/
			width: 100%;
			display: flex;
			flex-direction: column;
			/*justify-content: center;*/
			align-items: center;
			
		}
		}
	}
</style>