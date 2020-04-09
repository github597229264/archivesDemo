// 实例化
const router = new VueRouter({
	mode:'hash',//hash模式
	routes // （缩写）相当于 routes: routes
})
export default router
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
	{
		name: 'login',
		path: "/login",
		component: resolve => require(['../views/login.vue'], resolve),
	},
	{
		name: 'home',
		path: '/home',
		component: resolve => require(['../views/home.vue'], resolve),
		children: [
			{
				name: 'index',
				path: '/index',
				component: resolve => require(['../views/index.vue'], resolve),
				meta: {
					title: '首页'
				}
			},
			{
				name: 'cadreInformationBase',
				path: '/cadreInformationBase',
				component: resolve => require(['../views/personnelManagement/CadreInformationBase.vue'], resolve),
				meta: {
					title: '干部信息总库'
				}
			},
			{
				name: 'recycleBin',
				path: '/recycleBin',
				component: resolve => require(['../views/recycleBin/recycleBin.vue'], resolve),
				meta: {
					title: '回收站'
				}
			},
			{
				name: 'retrieval',
				path: '/retrieval',
				component: resolve => require(['../views/retrieval/retrieval2/Retrieval.vue'], resolve),
				meta: {
					title: '档案检索'
				}
			},
			{
				name: 'news',
				path: '/news',
				component: resolve => require(['../views/news/News.vue'], resolve),
				meta: {
					title: '消息'
				}
			},
			{
				name: 'addPersonal',
				path: '/addPersonal',
				component: resolve => require(['../views/personnelManagement/AddPersonal.vue'], resolve),
				meta: {
					title: '添加人员信息'
				}
			},
//			{
//				name: 'archivesRegister',
//				path: '/archivesRegister',
//				component: resolve => require(['../views/archivesRegister/ArchivesRegister.vue'], resolve),
//				meta: {
//					title: '档案登记'
//				}
//			},
			{
				name: '404',
				path: '/404',
				component: resolve => require(['../views/404.vue'], resolve),
				meta: {
					title: '404'
				}
			},
			{
				name: '/403',
				path: '/403',
				component: resolve => require(['../views/403.vue'], resolve),
				meta: {
					title: '403'
				}
			},
			{
				name: 'materialBatchReceive',
				path: '/materialBatchReceive',
				component: resolve => require(['../views/materialManage/materialBatchReceive/MaterialBatchReceive.vue'], resolve),
				meta: {
					title: '材料批量接收'
				}
			},
			{
				name: 'materialReceive',
				path: '/materialReceive',
				component: resolve => require(['../views/materialManage/materialReceive/MaterialReceive.vue'], resolve),
				meta: {
					title: '材料接收'
				}
			},
			{
				name: 'materialCollection',
				path: '/materialCollection',
				component: resolve => require(['../views/materialManage/materialCollection/MaterialCollection.vue'], resolve),
				meta: {
					title: '材料催收'
				}
			},
			{
				name: 'collectionHandle',
				path: '/collectionHandle',
				component: resolve => require(['../views/materialManage/collectionHandle/CollectionHandle.vue'], resolve),
				meta: {
					title: '催收处理'
				}
			},
			{
				name: 'materialDeliver',
				path: '/materialDeliver',
				component: resolve => require(['../views/materialManage/materialDeliver/MaterialDeliver.vue'], resolve),
				meta: {
					title: '材料转递'
				}
			},
			{
				name: 'ledgerManage',
				path: '/ledgerManage',
				component: resolve => require(['../views/materialManage/ledgerManage/LedgerManage.vue'], resolve),
				meta: {
					title: '台账管理'
				}
			},
			{
				name: 'borrowingBook',
				path: '/borrowingBook',
				component: resolve => require(['../views/archivalBorrowing/BorrowingBook.vue'], resolve),
				meta: {
					title: '查借预约'
				}
			},
			{
				name: 'siteRegister',
				path: '/siteRegister',
				component: resolve => require(['../views/archivalBorrowing/SiteRegister.vue'], resolve),
				meta: {
					title: '现场登记'
				}
			},
			{
				name: 'borrowApply',
				path: '/borrowApply',
				component: resolve => require(['../views/archivalBorrowing/BorrowApply.vue'], resolve),
				meta: {
					title: '现场登记'
				}
			},
			{
				name: 'fileAuthorization',
				path: '/fileAuthorization',
				component: resolve => require(['../views/archivalBorrowing/FileAuthorization.vue'], resolve),
				meta: {
					title: '档案申请'
				}
			},
			{
				name: 'archivesRegister',
				path: '/archivesRegister',
				component: resolve => require(['../views/archivesRegister/dynamicRoster2/ArchivesRegister.vue'], resolve),
				meta: {
					title: '档案名册'
				}
			},
			{
				name: 'archivesReceive',
				path: '/archivesReceive',
				component: resolve => require(['../views/archivesDailyManagement/archivesReceive/ArchivesReceive.vue'], resolve),
				meta: {
					title: '档案接收'
				}
			},
			{
				name: 'archivesTransfer',
				path: '/archivesTransfer',
				component: resolve => require(['../views/archivesDailyManagement/archivesTransfer/ArchivesTransfer.vue'], resolve),
				meta: {
					title: '档案转递'
				}
			},
			{
				name: 'archivesCollection',
				path: '/archivesCollection',
				component: resolve => require(['../views/archivesDailyManagement/filePrequalificationOnline/archivesCollection/ArchivesCollection.vue'], resolve),
				meta: {
					title: '档案催收'
				}
			},
			{
				name: 'collectionNotice',
				path: '/collectionNotice',
				component: resolve => require(['../views/archivesDailyManagement/filePrequalificationOnline/collectionNotice/CollectionNotice.vue'], resolve),
				meta: {
					title: '催收通知'
				}
			},
			{
				name: 'applyTrial',
				path: '/applyTrial',
				component: resolve => require(['../views/archivesDailyManagement/filePrequalificationOnline/applyTrial/ApplyTrial.vue'], resolve),
				meta: {
					title: '申请预审'
				}
			},
			{
				name: 'receivesPrequalification',
				path: '/receivesPrequalification',
				component: resolve => require(['../views/archivesDailyManagement/filePrequalificationOnline/receivesPrequalification/ReceivesPrequalification.vue'], resolve),
				meta: {
					title: '接收预审'
				}
			},
			{
				name: 'readingArchivesList',
				path: '/readingArchivesList',
				component: resolve => require(['../views/archivalBorrowing/ReadingArchivesList.vue'], resolve),
				meta: {
					title: '浏览档案'
				}
			},
			{
				name: 'applyRecord',
				path: '/applyRecord',
				component: resolve => require(['../views/archivalBorrowing/applyRecord.vue'], resolve),
				meta: {
					title: '申请记录'
				}
			},
			{
				name: 'fileApprove',
				path: '/fileApprove',
				component: resolve => require(['../views/archivalBorrowing/FileApprove.vue'], resolve),
				meta: {
					title: '档案审批'
				}
			},
			{
				name: 'readingFile',
				path: '/readingFile',
				component: resolve => require(['../views/archivalBorrowing/ReadingFile.vue'], resolve),
				meta: {
					title: '查看档案'
				}
			},
			{
				name: 'noTimerReadingArchivesList',
				path: '/noTimerReadingArchivesList',
				component: resolve => require(['../views/archivalBorrowing/NoTimerReadingArchivesList.vue'], resolve),
				meta: {
					title: '档案阅览'
				}
			},
			{
				name: 'archivesFinishing',
				path: '/archivesFinishing',
				component: resolve => require(['../views/archivesSpecialVerification/archivesFinishing/ArchivesFinishing.vue'], resolve),
				meta: {
					title: '档案整理'
				}
			},
			{
				name: 'archivesCheck',
				path: '/archivesCheck',
				component: resolve => require(['../views/archivesSpecialVerification/archivesCheck/ArchivesCheck.vue'], resolve),
				meta: {
					title: '档案查缺'
				}
			},
			{
				name: 'specialAuditRecognition',
				path: '/specialAuditRecognition',
				component: resolve => require(['../views/archivesSpecialVerification/specialAuditRecognition/SpecialAuditRecognition.vue'], resolve),
				meta: {
					title: '专项审核认定'
				}
			},
			{
				name: 'specialVerification',
				path: '/specialVerification',
				component: resolve => require(['../views/archivesSpecialVerification/specialVerification/SpecialVerification.vue'], resolve),
				meta: {
					title: '专项审核认定'
				}
			},
			{
				name: 'organizationPersonnelAdjustment',
				path: '/organizationPersonnelAdjustment',
				component: resolve => require(['../views/systemMaintenance/organizationPersonnelAdjustment/OrganizationPersonnelAdjustment.vue'], resolve),
				meta: {
					title: '机构人员调整'
				}
			},
			{
				name: 'organizationManagement',
				path: '/organizationManagement',
				component: resolve => require(['../views/systemMaintenance/organizationManagement/OrganizationManagement.vue'], resolve),
				meta: {
					title: '组织机构管理'
				}
			},
			{
				name: 'pipeRangeSetting',
				path: '/pipeRangeSetting',
				component: resolve => require(['../views/systemMaintenance/pipeRangeSetting/PipeRangeSetting.vue'], resolve),
				meta: {
					title: '管档范围设置'
				}
			},
			{
				name: 'authorizationData',
				path: '/authorizationData',
				component: resolve => require(['../views/systemMaintenance/authorizationData/AuthorizationData.vue'], resolve),
				meta: {
					title: '数据授权'
				}
			},
			{
				name: 'metadataManagement',
				path: '/metadataManagement',
				component: resolve => require(['../views/systemMaintenance/metadataManagement/MetadataManagement.vue'], resolve),
				meta: {
					title: '元数据管理'
				}
			},
			/**
			 {
				name: 'logManagement',
				path: '/logManagement',
				component: resolve => require(['../views/systemMaintenance/logManagement/LogManagement.vue'], resolve),
				meta: {
					title: '日志管理'
				}
			},
			
			 */
			{
				name: 'systemParameterConfiguration',
				path: '/systemParameterConfiguration',
				component: resolve => require(['../views/systemMaintenance/systemParameterConfiguration/SystemParameterConfiguration.vue'], resolve),
				meta: {
					title: '系统参数配置'
				}
			},
			{
				name: 'userManagement',
				path: '/userManagement',
				component: resolve => require(['../views/userRightsManagement/UserManagement.vue'], resolve),
				meta: {
					title: '用户管理'
				}
			},
			{
				name: 'passwordInit',
				path: '/passwordInit',
				component: resolve => require(['../views/userRightsManagement/PasswordInit.vue'], resolve),
				meta: {
					title: '密码初始化'
				}
			},
			{
				name: 'userRole',
				path: '/userRole',
				component: resolve => require(['../views/userRightsManagement/UserRole.vue'], resolve),
				meta: {
					title: '用户角色'
				}
			},
			{
				name: 'userGroupManagement',
				path: '/userGroupManagement',
				component: resolve => require(['../views/userRightsManagement/UserGroupManagement.vue'], resolve),
				meta: {
					title: '用户组管理'
				}
			},
			{
				name: 'roleManagement',
				path: '/roleManagement',
				component: resolve => require(['../views/userRightsManagement/RoleManagement.vue'], resolve),
				meta: {
					title: '角色管理'
				}
			},
			{
				name: 'materialbatchadd',
				path: '/materialbatchadd',
				component: resolve => require(['../views/materialManage/materialBatchReceive/MaterialBatchAdd.vue'], resolve),
				meta: {
					title: 'materialbatchadd'
				}
			},
			/*------信息中心管理模块-------*/
            {
                name: 'imageUpload',
                path: '/imageUpload',
                component: resolve => require(['../views/infoCenterManagement/systemLogoSetting/SystemLogoSetting.vue'], resolve),
                meta: {
                    title: '系统logo设置'
                }
            },
			{
				name: 'menuManagement',
				path: '/menuManagement',
				component: resolve => require(['../views/infoCenterManagement/MenuManagement.vue'], resolve),
				meta: {
					title: '菜单管理'
				}
			},
			{
				name: 'managementArchivesUnit',
				path: '/managementArchivesUnit',
				component: resolve => require(['../views/infoCenterManagement/ManagementArchivesUnit.vue'], resolve),
				meta: {
					title: '管档单位管理'
				}
			},
			{
				name: 'archivesDataManagement',
				path: '/archivesDataManagement',
				component: resolve => require(['../views/infoCenterManagement/ArchivesDataManagement.vue'], resolve),
				meta: {
					title: '档案材料类别列表'
				}
			},
			{
				name: 'dataDictionaryManagement',
				path: '/dataDictionaryManagement',
				component: resolve => require(['../views/infoCenterManagement/DataDictionaryManagement.vue'], resolve),
				meta: {
					title: '数据字典管理'
				}
			},
			{
				name: 'fileCheckStandardManagement',
				path: '/fileCheckStandardManagement',
				component: resolve => require(['../views/infoCenterManagement/FileCheckStandardManagement.vue'], resolve),
				meta: {
					title: '档案审核标准'
				}
			},
			{
				name: 'dataCodeManagement',
				path: '/dataCodeManagement',
				component: resolve => require(['../views/infoCenterManagement/DataCodeManagement.vue'], resolve),
				meta: {
					title: '数据代码管理'
				}
			},
			{
				name: 'logAnalysis',
				path: '/logAnalysis',
				component: resolve => require(['../views/logAuditManagement/LogAnalysis.vue'], resolve),
				meta: {
					title: '日志分析'
				}
			},
			{
				name: 'systemLogManagement',
				path: '/systemLogManagement',
				component: resolve => require(['../views/logAuditManagement/SystemLogManagement.vue'], resolve),
				meta: {
					title: '系统日志管理'
				}
			},
			{
				name: 'logAnalysisSys',
				path: '/logAnalysisSys',
				component: resolve => require(['../views/systemMaintenance/logManagement/logAnalysisSys/LogAnalysisSys.vue'], resolve),
				meta: {
					title: '日志分析'
				}
			},
			{
				name: 'testView',
				path: '/testView',
				component: resolve => require(['../views/archivalBorrowing/TestView.vue'], resolve),
				meta: {
					title: '测试界面'
				}
			},
			{
				name: 'noTimerReadingArchivesList',
				path: '/noTimerReadingArchivesList',
				component: resolve => require(['../views/archivalBorrowing/NoTimerReadingArchivesList.vue'], resolve),
				meta: {
					title: '阅览档案--无倒计时无查询'
				}
			},
			// 工作台与知识库
			{
				name: 'benchConfig',
				path: '/benchConfig',
				component: resolve => require(['../views/systemMaintenance/benchAndKnowledgeBase/BenchConfig.vue'], resolve),
				meta: {
					title: '工作台配置'
				}
			},
			{
				name: 'roleBenchSetting',
				path: '/roleBenchSetting',
				component: resolve => require(['../views/systemMaintenance/benchAndKnowledgeBase/RoleBenchSetting.vue'], resolve),
				meta: {
					title: '角色工作台设置'
				}
			},
			{
				name: 'workComForm',
				path: '/workComForm',
				component: resolve => require(['../views/systemMaintenance/benchAndKnowledgeBase/WorkComForm.vue'], resolve),
				meta: {
					title: '工作常用表'
				}
			},
			{
				name: 'konwledgeBaseManagement',
				path: '/konwledgeBaseManagement',
				component: resolve => require(['../views/systemMaintenance/benchAndKnowledgeBase/KonwledgeBaseManagement.vue'], resolve),
				meta: {
					title: '知识库管理'
				}
			},
			{
				name: 'mailListManagement',
				path: '/mailListManagement',
				component: resolve => require(['../views/systemMaintenance/benchAndKnowledgeBase/MailListManagement.vue'], resolve),
				meta: {
					title: '通讯录管理'
				}
			},
			{
				name: 'noticeMaintain',
				path: '/noticeMaintain',
				component: resolve => require(['../views/systemMaintenance/benchAndKnowledgeBase/NoticeMaintain.vue'], resolve),
				meta: {
					title: '通知维护'
				}
			},
		]
	},
	//外单位人员查借阅申请模块
	{
		name: 'applyMain',
		path: '/applyMain',
		component: resolve => require(['../views/archivalBorrowing/ApplyMain.vue'], resolve),
		meta: {
			title: '查借阅申请主界面'
		}
	},
	{
		name: 'outsiderBorrowApply',
		path: '/outsiderBorrowApply',
		component: resolve => require(['../views/archivalBorrowing/OutsiderBorrowApply.vue'], resolve),
		meta: {
			title: '外单位人员查借阅申请'
		}
	},
	{
		name: 'checkReadFile',
		path: '/checkReadFile',
		component: resolve => require(['../views/archivalBorrowing/CheckReadFile.vue'], resolve),
		meta: {
			title: '查看档案检查界面'
		}
	},
	{
		name: 'outsideReadingFile',
		path: '/outsideReadingFile',
		component: resolve => require(['../views/archivalBorrowing/OutsideReadingFile.vue'], resolve),
		meta: {
			title: '外来人员查看档案'
		}
	},
	{
		path: '*',
		redirect: {
			path: '/403'
		}
	}
]
// 实例化
const router = new VueRouter({
	mode:'hash',//hash模式
	routes // （缩写）相当于 routes: routes
})
export default router

