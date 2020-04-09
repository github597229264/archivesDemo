import axios from 'axios'
/**
 * mock 接口api 
 */
const interface_s = {
	baseURL:'http://192.168.1.233:8081/hxams/',//基础默认路径
	devBaseURL:'http://192.168.1.189:8081/hxams/',//开发环境
	testBaseURL:'http://192.168.1.222:8081/hxams/',//测试环境
	prodBaseURL:'http://192.168.1.222:8081/hxams/',//生产环境
	//DReaderURL:'http://192.168.1.247:8081/hxams/DReader/index.html',//阅读器网页路径
	DReaderURL:'http://192.168.1.222:8081/DReader/index.html',//阅读器网页路径
	//登录模块
	login:"index@checkLogin.action",//检查登录
	updatePassWord:"index@updatePassWord.action",//修改密码
	loginOut:'index@loginOut.action',//退出登录
    //公共模块
    main:'index@main.action',//获取权限菜单、工作台
    getDataList:'sysCode@getDataList.action',//获取下拉框的list按照name值
    findA01:'borrowAndReadAppoint@findA01.action',//档案选择
    areaTree:'area@areaTree.action',//获取区域树形结构
    organizationTree:'b00@organizationTree.action',//获取职能组织机构树形结构
    findAllStations:'user@findAllStations.action',//获取用户岗位列表
    getSysCadreCodeDetailList:'sysCadreCodeDetail@getSysCadreCodeDetailList.action', //民族、党派等下拉框
    getSysCadreCodeDetailsPage:'sysCadreCodeDetail@getSysCadreCodeDetailsPage.action', //籍贯、出生地分页下拉框
    findUserOrganizationTree:'powerUserOrganization@findUserOrganizationTree.action',//用户组树形下拉框
    							
    //外来查询人员、临时账户获取token
    externalBorrowingPersonnel:'index@externalBorrowingPersonnel.action',
    
    //个人菜单
    findMyUserMenusList:'myUserMenus@findMyUserMenusList.action',//个人菜单列表页
    initialOrderMyUserMenus:'myUserMenus@initialOrderMyUserMenus.action',//	个人菜单初始化顺序
    
    /*-------------档案查借阅模块-----------*/
    //干部人员管理模块
    findA01InformationPage:'a01@findA01InformationPage.action', //干部信息总库列表页
   	uploadFileImge:'upload@uploadFileImge.action',//上传图片
	editA01:'a01@editA01.action',//编辑信息
	saveA01:'a01@saveOrUpdateA01.action',//保存档案
	deleteA01:'a01@deleteA01.action',//删除档案人员
	deleteA2930:'a2930@deleteA2930.action',//删除档案
    findA2930InformationPage:'a2930@findA2930InformationPage.action',//调动信息列表查询
    editA31:'a31@editA31.action',//离退基本信息编辑页面数据回显
    editA38:'a38@editA38.action',//档案基本信息编辑页面数据回显
    saveOrUpdateA2930:'a2930@saveOrUpdateA2930.action',//调动信息保存
    findA02InformationPage:'a02@findA02InformationPage.action',//扩充-工作单位及职务
    findA09InformationPage:'a09@findA09InformationPage.action',//扩充-学位信息查询列表页
    findA08InformationPage:'a08@findA08InformationPage.action',//扩充-学历信息查询列表页
    editA08:'a08@editA08.action',//扩充-学历信息编辑回显
    findA06InformationPage:'a06@findA06InformationPage.action',//扩充-专业技术任职资格信息查询列表页
    findA36InformationPage:'a36@findA36InformationPage.action',//扩充-家庭成员及社会关系列表
    findA17InformationPage:'a17@findA17InformationPage.action',//扩充-简历信息查询列表
    findA05InformationPage:'a05@findA05InformationPage.action',//扩充-查询职级信息列表
    findA52InformationPage:'a52@findA52InformationPage.action',//扩充-查询职务变动列表
    findB01A01InformationPage:'b01A01@findB01A01InformationPage.action',//其他类-兼职管理
    	findAnnualAppraisalInformationPage:'annualAppraisal@findAnnualAppraisalInformationPage.action',//其他类-年度考核表列表查询
    findBadaInformationPage:'ada@findBadaInformationPage.action',//其他类-任免信息
    editBada:'ada@editBada.action',//编辑回显（查看）任免信息-浏览
    saveOrUpdateBada:'ada@saveOrUpdateBada.action',//其他类-任免信息-添加编辑
    findSysArchClassify:'sysArchClassify@findSysArchClassify.action',//浏览-干部人事档案目录
    getArchivesLogByA0100:'utilizationArch@getArchivesLogByA0100.action',//浏览-档案利用情况-人员档案操作日志查询
    getWarehouseInfo:'utilizationArch@getWarehouseInfo.action',//浏览-档案利用情况-在库记录-入库
    getConsultElectronInfo:'utilizationArch@getConsultElectronInfo.action',//浏览-档案利用情况-在库记录-查阅(电子)
    getConsultKindInfo:'utilizationArch@getConsultKindInfo.action',//浏览-档案利用情况-在库记录-查阅(实物)
    getBorrowingInfo:'utilizationArch@getBorrowingInfo.action',//浏览-档案利用情况-在库记录-借 阅
    getArchApplyInfo:'borrowAndRead@getArchApplyInfo.action',//浏览-档案利用情况-当前档案查借阅状态-档案申请、审核、授权列表
    saveOrUpdateA31:'a31@saveOrUpdateA31.action',//档案-离退信息-保存
    saveOrUpdateA38:'a38@saveOrUpdateA38.action',//档案-档案信息-保存
    editA02:'a02@editA02.action',//扩充-工作单位及职务-编辑页面数据回显
    saveOrUpdateA02:'a02@saveOrUpdateA02.action',//扩充-工作单位及职务-保存
    deleteA02:'a02@deleteA02.action',//扩充-工作单位及职务-删除
    saveOrUpdateA09:'a09@saveOrUpdateA09.action',//扩充-学位信息-保存
    deleteA09:'a09@deleteA09.action',//扩充-学位信息-删除
    saveOrUpdateA08:'a08@saveOrUpdateA08.action',//扩充-学历信息-保存
    deleteA08:'a08@deleteA08.action',//扩充-学历信息-删除
    saveOrUpdateA06:'a06@saveOrUpdateA06.action',//扩充-专业技术任职资格信息-保存
    deleteA06:'a06@deleteA06.action',//扩充-专业技术任职资格信息-删除
    saveOrUpdateA36:'a36@saveOrUpdateA36.action',//扩充-家庭成员及社会关系-保存
    deleteA36:'a36@deleteA36.action',//扩充-家庭成员及社会关系-删除
    saveOrUpdateA17:'a17@saveOrUpdateA17.action',//扩充-简历信息-保存
    deleteA17:'a17@deleteA17.action',//扩充-简历信息-删除
    saveOrUpdateA05:'a05@saveOrUpdateA05.action',//扩充-职级信息-保存
    deleteA05:'a05@deleteA05.action',//扩充-职级信息-删除
    saveOrUpdateA52:'a52@saveOrUpdateA52.action',//扩充-职级变动-保存
    deleteA52:'a52@deleteA52.action',//扩充-职级变动-删除
    saveOrUpdateB01A01:'b01A01@saveOrUpdateB01A01.action',//其他类-兼职管理-保存
    deleteB01A01:'b01A01@deleteB01A01.action',//其他类-兼职管理-删除
    saveOrUpdateAnnualAppraisal:'annualAppraisal@saveOrUpdateAnnualAppraisal.action',//其他类-年度考核-保存
    editAnnualAppraisal:'annualAppraisal@editAnnualAppraisal.action',//其他类-年度考核-编辑回显
    deleteAnnualAppraisal:'annualAppraisal@deleteAnnualAppraisal.action',//其他类-年度考核-删除
    deleteBada:'ada@deleteBada.action',//其他类-任免信息-删除
    editA2930:'a2930@editA2930.action',//档案-调动信息-编辑回显
    annualAppraisalExportToExcel:'annualAppraisal@exportToExcel.action',//-编辑-年度考核-导出
    
    //回收站
    queryRecycleList:'a01@queryRecycleList.action',//回收站-列表查询
    saveOrUpdateA01:'a01@saveOrUpdateA01.action',//回收站-恢复
    
    /*-------------首页-----------*/
    findmessageReminderPage:'messageReminder@findmessageReminderPage.action',//消息（待办事项）
    deleteMessageReminder:'messageReminder@deleteMessageReminder.action',//消息删除
    configurationWorkList:'commonlyUsedMenu@configurationWorkList.action',//日常办公配置回显列表
    configurationWorkTree:'commonlyUsedMenu@configurationWorkTree.action',//日常办公配置菜单树回显
    commonlyUsedMenuSave:'commonlyUsedMenu@save.action',//	日常办公选择保存
    upAndDownMyCommonlyUsedMenu:'commonlyUsedMenu@upAndDownMyCommonlyUsedMenu.action',//日常办公排序上移、下移
    initialOrderMyCommonlyUsedMenu:'commonlyUsedMenu@initialOrderMyCommonlyUsedMenu.action',//日常办公初始化排序

	addStaticRoster:'a01Roster@addStaticRoster.action',//新增静态名册
	getknowledgeBaseList:'sysArchivesKnowledge@getknowledgeBaseList.action', //知识库列表
    
    
    //台账管理
    getArchivesAccountManagement:'powerWorkbench@getArchivesAccountManagement.action',//档案台账管理统计
    getArchivesInventoryPage:'a01@getArchivesInventoryPage.action',//档案台账管理统计库存统计查询档案人员数据
    
    //干部人员大数据
    cadresPersonnelBigData:'a01@cadresPersonnelBigData.action',//干部人员大数据库统计
    findA01InformationPage:'a01@findA01InformationPage.action',//根据人员类别查询干部人员数据
    
    
    /*-------------档案检索-----------*/
   	a01Search:'search@a01Search.action',//档案检索
   	exportToExcel:'search@exportToExcel.action',//导出
   
    /*-------------档案名册-----------*/
   	getA01Roster:'a01Roster@getA01Roster.action',//左侧搜索列表
	// a01RosterGetA01:'a01Roster@getA01.action',//查找人员
   	dynamicRoster:'a01Roster@dynamicRoster.action',//添加
   	updateRoster:'a01Roster@updateRoster.action',//编辑添加
   	deleteRoster:'a01Roster@deleteRoster.action',//删除
   	query:'a01Roster@query.action',//查询
    getRosterConditionById:'a01Roster@getRosterConditionById.action',//查看静态名册条件信息列表
    deleteStaticRoster:'a01Roster@deleteStaticRoster.action',//	删除静态名册
    takeSnapshot:'myA01RosterDate@takeSnapshot.action',//静态名册生成快照
    getRosterDateRecords:'myA01RosterDate@getRosterDateRecords.action',//查询快照人员信息列表
    getRosterDateList:'myA01RosterDate@getRosterDateList.action',//	查询快照日历列表
    deleteRosterDateById:'myA01RosterDate@deleteRosterDateById.action',//删除快照日期对应信息
    historySnapshotRecrds:'myA01RosterDate@historySnapshotRecrds.action',//静态名册历史信息
    addStaticRoster:'a01Roster@addStaticRoster.action',//新增静态名册
    
    //台账管理
    getArchivesAccountManagement:'powerWorkbench@getArchivesAccountManagement.action',//档案台账管理统计
    
    /*-------------档案查借阅模块-----------*/
    //档案查借阅
    getBorrowAndReadAppointList:'borrowAndReadAppoint@getBorrowAndReadAppointList.action', //多条件分页查借预约列表    
    addBorrowAndRead:'borrowAndReadAppoint@addBorrowAndRead.action', //添加查借阅预约
    borrowAndReadRegister:'borrowAndReadSite@borrowAndReadRegister.action',//登记处理
    getA01ByBorrowAndReadId:'borrowAndReadAppoint@getA01ByBorrowAndReadId.action',//根据预约id获取档案人员信息列表
    updateBorrowAndRead:'borrowAndReadAppoint@updateBorrowAndRead.action',//修改保存预约
    getBorrowAndReadSite:'borrowAndReadSite@getBorrowAndReadSite.action', //多条件分页现场登记列表    
    getA01BySite:'borrowAndReadSite@getA01BySite.action',//据登记id获取档案人员信息列表（不分页）
    register:'borrowAndReadSite@register.action',//现场登记--添加登记
    updateSite:'borrowAndReadSite@updateSite.action',//现场登记--修改登记
    giveBackSite:'borrowAndReadSite@giveBackSite.action',//现场登记--归还
    seeSite:'borrowAndReadSite@seeSite.action',//获取登记对应人员档案列表（分页）
    getA01:'borrowAndRead@getA01.action',//获取查借阅申请 人员档案列表（分页）
    borrowAndReadApply:'borrowAndRead@borrowAndReadApply.action',//外来人员查借阅申请
    recordAccredit:'approval@recordAccredit.action',//获取档案授权列表
    details:'approval@details.action',//获取申请查阅档案详细数据
    getA01BySplit:'approval@getA01BySplit.action',//获取申请查阅档案授权信息
    getArchivesTree:'approval@getArchivesTree.action',//十大类 授权回显
    archivesAccredit:'approval@archivesAccredit.action',//个人十大类授权： 授权 /拒绝
    electronAccredit:'approval@electronAccredit.action',//电子档案授权/拒绝
    entityAccredit:'approval@entityAccredit.action',//纸质档案授权/拒绝
    borrowAndReadApplyer:'borrowAndRead@borrowAndReadApplyer.action',//查档用户和领导 查借阅申请
    viewFiles:'borrowAndRead@viewFiles.action',//查档用户 查阅档案 获取人员档案
    digitalArchives:'borrowAndRead@digitalArchives.action',//查看数字档案获取十大类目录
    lookFile:'borrowAndRead@lookFile.action',//根据档案十大类档案目录查看文件
    lookFiles:'borrowAndRead@lookFiles.action',//根据档案十大类档案目录和中间表elid查看文件
    //外来人员查借阅
    consult:'borrowAndRead@consult.action',//临时查借阅 查阅档案 获取查借阅单
    getA01s:'borrowAndRead@getA01s.action',//临时查借阅 查阅档案 获取人员档案
    lookArchives:'borrowAndRead@lookArchives.action',//查看查阅申请十大类档案
    countDown:'borrowAndRead@countDown.action',//查阅时限 定时任务
    overRead:'borrowAndRead@overRead.action',//结束阅档
    
    //档案审批
    approvals:'approvalProcess@approvals.action',//档案审批列表
    approvaled:'approvalProcess@approvaled.action',//审批历史
    approvaling:'approvalProcess@approvaling.action',//审批
    
    //申请记录
    applicationRecord:'approvalProcess@applicationRecord.action',//申请记录列表
    termination:'approvalProcess@termination.action',//终止
    
    /*----------用户权限模块-----------*/
    //用户管理
    findUserInfo:'user@findUserInfo.action',//获取用户管理列表
    saveUser:'user@saveUser.action',//添加用户
    updateUser:'user@updateUser.action',//修改用户信息
    deleteUser:'user@deleteUser.action',//删除用户信息
    
    //密码初始化 
    initializationPassword:'user@initializationPassword.action',//用户密码初始化
    
    //用户机构(组)管理
    saveOrUpdateOrganization:'powerUserOrganization@saveOrUpdateOrganization.action',//添加和修改用户组
    deleteOrganization:'powerUserOrganization@deleteOrganization.action',//删除用户组
    findUserChooseList:'powerUserOrganization@findUserChooseList.action',//未被分配用户分页列表
    deleteUserOrganization:'powerUserOrganization@deleteUserOrganization.action',//删除用户组下的用户
    findeUserPageInfo:'powerUserOrganization@findeUserPageInfo.action',//获取用户组下的用户列表页
	saveUserOrganization:'powerUserOrganization@saveUserOrganization.action',//用户组添加用户

	sortUserGroupsPage:'hxams/organization@sortUserGroupsPage.action',//用户组排序分页列表
	userOrgInitializationOrder:'powerUserOrganization@userOrgInitializationOrder.action',//用户组初始化顺序
	userOrgUpAndDown:'powerUserOrganization@userOrgUpAndDown.action',//用户组的上移、下移
	
	sortUserLists:'user@sortUserLists.action',//用户管理排序列表页
	initializationOrder:'user@initializationOrder.action',//初始化顺序
	upAndDown:'user@upAndDown.action',//用户管理上移、下移

	//用户角色
    findUserListPage:'user@findUserListPage.action',//用户角色列表和初始化密码查询用户分页信息
    findRoles:'role@findRoles.action',//获取用户角色信息
    roleSetting:'role@roleSetting.action',//设置用户角色
    
    //角色管理
    findRolesPage:'role@findRolesPage.action',//角色分页列表
    saveOrUpdateRole:'role@saveOrUpdateRole.action',//添加/更新角色
    deleteRole:'role@deleteRole.action',//删除角色
    findCorrespondingUserPage:'role@findCorrespondingUserPage.action',//角色下的对应人员--分页
    roleMenuTree:'role@roleMenuTree.action',//按照角色id获取菜单权限
    saveOrUpdateRoleMenu:'role@saveOrUpdateRoleMenu.action',//保存角色权限
    viewPower:'role@viewPower.action',//获取角色权限(查看权限)
    bathDeletePowerUserRoles:'role@bathDeletePowerUserRoles.action',//批量删除对应角色下的用户
    bathAddPowerUserRoles:'role@bathAddPowerUserRoles.action',//批量添加用户到对应角色
	findUserListByRoleIdPage:'user@findUserListByRoleIdPage.action',
	
	sortRoleList:'role@sortRoleList.action',//角色管理排序列表
	upAndDownRole:'role@upAndDownRole.action',//角色管理上移、下移保存
	initializationRoleSort:'role@initializationRoleSort.action',//角色管理初始化顺序

    //散材料管理模块
    GetPagerJson:'bulkMaterial@GetPagerJson.action', //多条件分页查散材料列表    '
    addMaterial:'bulkMaterial@addMaterial.action', //新增散材料
    updateMaterial:'bulkMaterial@updateMaterial.action', //编辑散材料
    findA01sExcludeSelete:'bulkMaterial@findA01sExcludeSelete.action', //获取材料下所有的人员信息，供编辑使用
    findA01sById:'bulkMaterial@findA01sById.action', //获取编辑散材料已有的人员信息
    quertMaterialType:"filecheckmissing@quertMaterialType.action",//档案专项审核 档案查缺 材料类型 所有
    
	//材料转递
	materialtransfer:'transfer@GetTransferJson.action' ,//查询所有材料转递
	findE01Z41sById:'transfer@findE01Z41sById.action',//材料转递详情中根据id查询所有人员 分页
	deleteE01Z41Id:'transfer@deleteE01Z41Id.action', //	删除一个散材料传递
	queryBulkMaterialInfo:'transfer@queryBulkMaterialInfo.action', //	材料传递添加中 材料信息库中人员集合
	addtransfer:"transfer@addtransfer.action",//添加一个散材料转递
	findPersionFileDetail:"transfer@findPersionFileDetail.action",//材料转递-添加-档案库中根据干部id查询干部档案详情信息
	queryAllPersonFile:'transfer@queryAllPersonFile.action',//材料转递-添加-档案库左边人员信息列表
	
	//材料接收
	queryPageAll:"materialReceiving@queryPageAll.action", //材料接收列表
	findByIde01z200:"materialReceiving@findByIde01z200.action",//散材料接收中详情按钮
	deleteByIde01z200:"materialReceiving@deleteByIde01z200.action",//材料接收删除按钮
	addMaterialReceiving:'materialReceiving@addMaterialReceiving.action',//材料接收 添加一个材料接收
	updataMaterialReceiving:'materialReceiving@updataMaterialReceiving.action',//材料接收中修改一个材料接收
	changeStatus:'materialReceiving@changeStatus.action',//材料接收列表中的退回和接收按钮
	
	//台账管理
	queryAllByPage:'ledger@queryAllByPage.action',//台账管理中总览列表接口
	modifyTheState:'ledger@modifyTheState.action',//台账管理中处理归档撤销按钮
	querycount:'ledger@querycount.action',//台账管理统计数据
	getAllReceive:'ledger@getAllReceive.action',  //	台账管理--统计中的 接收材料接口
	GetAllreturnandforward:'ledger@GetAllreturnandforward.action',//台账管理--统计中的 转递材料 和退回材料接口
	GetAllHandelandArchive:'ledger@GetAllHandelandArchive.action',//处理材料和归档材料
	GetAllReturnMaterialList:'ledger@GetAllReturnMaterialList.action',//转递材料和退回材料
	GetAllReturnOrTransferMaterialList:'ledger@GetAllReturnOrTransferMaterialList.action',//新转递材料和退回材料
	
	//材料催收
	queryAllCollection:"materialCollection@queryAllCollection.action",//散材料管理 材料催收 列表
	addMaterialCollection:"materialCollection@addMaterialCollection.action",//散材料管理 材料催收 新增
	
	//催收处理
	queryAllProcessing:"collectionProcessing@queryAllProcessing.action",//散材料管理 催收处理 列表
	addProcessing:"collectionProcessing@addProcessing.action",//散材料管理 催收处理 回复按钮中的保存
	QueryByE01z4100id:"collectionProcessing@QueryByE01z4100id.action",//散材料管理 催收处理 查看中的档案人员集合
	
	//档案日常管理
	//档案转递
	filetransfer:'filetransfer@queryAllPage.action',//	档案日常管理 档案转递 分页查询所有列表
	fileTransferService:'filetransfer@fileTransferService.action',//档案日常管理 档案转递 添加
	findByE01Z700Id:'filetransfer@findByE01Z700Id.action',//档案日常管理 档案转递 详情按钮
	allPersion:'filetransfer@allPersion.action',//档案日常管理 添加，人员列表
	//档案接收
	findAllByPage:'fileReceive@findAllByPage.action',//档案日常维护 档案接收 中列表
	deleteFileReceive:'fileReceive@deleteFileReceive.action',//档案日常维护 档案接收 中删除功能
	findE01Z500ById:'fileReceive@findE01Z500ById.action',//档案日常维护 档案接收 中详情按钮功能
	addFileReceive:'fileReceive@addFileReceive.action',//档案日常维护 档案接收 中添加功能
	returnButton:"fileReceive@returnButton.action",//档案日常维护 档案接收 中退回按钮
	resolveokbutton:"fileReceive@resolveokbutton.action",//档案日常维护 档案接收 处理 中 处理完成按钮	
	putstoreroomorsendbackbutton:"fileReceive@putstoreroomorsendbackbutton.action",//档案日常维护 档案接收 处理 中 入库或退回按钮
	entityorelectronicfilesbutton:"fileReceive@entityorelectronicfilesbutton.action",//档案日常维护 档案接收 处理 中 电子档案和实体档案按钮
	filereviewsave:"fileReceive@filereviewsave.action",//档案日常维护 档案接收 处理 中 档案审核中的保存按钮
	//档案在线预审
	//档案催收
	queryAllFilePretrial:"fileOnlinePretrial@queryAllFilePretrial.action",//档案日常管理 档案在线预审 档案催收列表or催收通知列表
	addfileOnlinePretrial:"fileOnlinePretrial@addfileOnlinePretrial.action",//档案日常管理 档案在线预审 档案催收新增
	deletefileOnlinePretrial:"fileOnlinePretrial@deletefileOnlinePretrial.action",//档案日常管理 档案在线预审 档案催收删除
	//催收通知
	revertFunction:"fileOnlinePretrial@revertFunction.action",//档案日常维护 档案在线预览 催收通知中的回复按钮
	findE01Z9ById:"fileOnlinePretrial@findE01Z9ById.action",//档案日常管理 档案在线预审 催收通知 详情按钮 干部集合
	//申请预审
	queryAllApplyReceive:"fileOnlinePretrial@queryAllApplyReceive.action",//档案日常维护 档案在线预览 申请预审 1 or 接收预审 2
	addApplyyushen:"fileOnlinePretrial@addApplyyushen.action",//档案日常维护 档案在线预审 申请预审 添加
	deleteApplyyushen:'fileOnlinePretrial@deleteApplyyushen.action',//档案日常维护 档案在线预审 申请预审删除
	//接收预审
	recivebackfun:"fileOnlinePretrial@recivebackfun.action",//档案日常维护 档案在线预审 接收预审中的 回复
	
	//档案专项审核  档案审核
	queryByPageList:"fileclearup@queryByPageList.action",//档案专项审核 档案审核 列表
	deleteFileClearUp:"fileclearup@deleteFileClearUp.action",//档案专项审核 档案审核 删除
	saveorupdataFileClearUp:"fileclearup@saveorupdataFileClearUp.action",//档案专项审核 档案整理 新增
	
	//档案专项审核 档案查缺
	findAllByPagePoorLacks:"filecheckmissing@findAllByPagePoorLacks.action",//档案专项审核 档案查缺列表
	deleteFileCheckMissing:"filecheckmissing@deleteFileCheckMissing.action",//档案专项审核 档案查缺 删除
	chechstatus:'filecheckmissing@chechstatus.action',//档案专项审核 档案查缺 处理
	saveorupdataFileCheckMissing:"filecheckmissing@saveorupdataFileCheckMissing.action",//档案专项审核 档案查缺 添加or修改
	
	//系统维护
	//机构人员调整
	findA01ByOrgIdPage:"a01@findA01ByOrgIdPage.action",//根据机构id查询档案人员
	viewAdjustment:"b01A01@viewAdjustment.action",//调整页面查询工作单位、兼职单位根据档案人员a0100
	adjustmentDepartmentA01:"b01A01@adjustmentDepartmentA01.action",//机构人员调整保存
	findA01ListByOrgId:"a01@findA01ListByOrgId.action",//机构人员排序列表页
	upAndDownB0A01:"b01A01@upAndDownB0A01.action",//排序，上移、上移
	
	//组织机构管理
	findB00ById:"b00@findB00ById.action",//根据机构id查询机构信息
	saveOrUpdateB00:"b00@saveOrUpdateB00.action",//机构保存
	deleteB00:"b00@deleteB00.action",//删除机构
	updateB00:"b00@updateB00.action",//更新虚拟机构
	updateB01:"b00@updateB01.action",//更新单位
	updateB0101:"b00@updateB0101.action",//更新部门
	findsortB00List:"b00@findsortB00List.action",//机构排序列表页
	upAndDownB00:"b00@upAndDownB00.action",//组织机构排序
	
	//管档范围设置
	findUserOrganizationList:"powerUserOrganization@findUserOrganizationList.action",//用户组集合返回用户(除过根节点）设置用户组管档范围
	findUserOrgRelationById:"powerUserOrganization@findUserOrgRelationById.action",//管档范围用户组管理的机构
	updateUserOrganizationRange:"powerUserOrganization@updateUserOrganizationRange.action",//更新用户组职能范围
	
	/*----------信息中心管理模块-----------*/
    //系统logo
    uploadSystemLogo:'upload@uploadSystemLogo.action',//系统logo设置
    getSystemLogo:'upload@getSystemLogo.action',//获取系统logo

    //菜单管理
	menuTreeList:'menu@menuTreeList.action',//获取菜单树列表
	deleteMenu:'menu@deleteMenu.action',//删除指定菜单
	menuTree:'menu@menuTree.action',//获取菜单树
	saveOrUpdateMenu:'menu@saveOrUpdateMenu.action',//添加或者更新菜单
	menuChildsPage:'menu@menuChildsPage.action',//菜单下的子页面列表页
	saveMenuChilds:'menu/saveMenuChilds.action',//保存子页面
	deleteMenuChilds:'menu@deleteMenuChilds.action',//删除子页面

    //管档单位管理
    findAllOrganization:'organization@findAllOrganization.action',//管档单位列表
    addOrUpdateOrganization:'organization@addOrUpdateOrganization.action',//添加或者修改管档单位
    delOrganization:'organization@deleteOrganization.action',//删除管档单位
    changeOrgStatusOrganization:'organization@changeOrgStatus.action',//改变管档单位状态
    orgSortOrganization:'organization@orgSort.action',//管档单位排序信息列表
    sortSaveOrganization:'organization@sortSave.action',//管档排序提交
    initSortOrganization:'organization@initSort.action',//管档单位初始化排序
	
	//数据字典管理
	queryByPageLists:'dataDictionary@queryByPageLists.action',//数据字典列表
	QueryBySysCodeId:'dataDictionary@QueryBySysCodeId.action',//根据数据字典id查询对应子集列表
    addDictionary: 'dataDictionary@addorModifierDataDictionary.action',//添加或者修改数据字典
    deleteDictionary: 'dataDictionary@DeleteDataDictionary.action',//删除数据字典
    addDictionaryContent: 'dataDictionary@addorModifyCodeDetailChild.action',//添加或者修改数据字典项
    deleteDictionaryContent: 'dataDictionary@deleteCodeDetail.action',//删除数据字典项

    //档案材料类别
    editArchivesData:'archivalCategory@updateArchivalCategory.action',//档案材料类别编辑

	//档案审核标准
	findAll:'fileCheckStandard@findAll.action',//档案审核列表
    addFileStandard:'fileCheckStandard@addOrgmodifyFileCheckStandard.action',//新增或者修改档案审核标准
	
	//数据代码管理
	getPageLists:'dataCodeManagement@getPageLists.action',//数据代码管理 列表
	getListsByCodeId:'dataCodeManagement@getListsByCodeId.action',//根据代码id分页查询子集列表
    addDataCode: 'dataCodeManagement@addOrModifyDataCodeManagement.action',//添加或者修改数据代码
    deleteDataCode: 'dataCodeManagement@deleteDataCodeManagement.action',//删除数据代码
    addDataCodeContent: 'dataCodeManagement@addOrModifyChildCode.action',//添加或者修改数据代码项
    deleteDataCodeContent: 'dataCodeManagement@deleteDataCodeManagementChild.action',//删除数据代码项
	
	//系统参数配置
	findSystemSettingsList:"systemSettings@findSystemSettingsList.action",//系统参数配置列表
	isEnabledSanYuan:"systemSettings@isEnabledSanYuan.action",//是否启用三元保存
	
	//元数据管理
	queryMetadataList:"a01@queryMetadataList.action",//元数据管理列表
	
	//数据授权
	findCommonPowerUser:"user@findCommonPowerUser.action",//数据授权可以授权的用户列表页
	findPowerArchPowerOrgPage:"powerArchPowerOrg@findPowerArchPowerOrgPage.action",//根据用户id查询授权组织机构
	findPowerArchPowerOrgs:"powerArchPowerOrg@findPowerArchPowerOrgs.action",//（添加组织机构权限回显选择的授权机构）根据用户id查询授权机构id数组返回
	savePowerArchPowerOrgs:"powerArchPowerOrg@savePowerArchPowerOrgs.action",//添加组织机构,保存组织机构权限
	deletePowerArchPowerOrgs:"powerArchPowerOrg@deletePowerArchPowerOrgs.action",//组织机构权限删除机构
	findAuthorizedfilesPage:"a01@findAuthorizedfilesPage.action",//（查看档案）档案授权结果列表
	findPowerArchPoweExcludePage:"a01@findPowerArchPoweExcludePage.action",//数据授权规避人员列表
	findPowerArchPowerPersonPage:"powerArchPowerPerson@findPowerArchPowerPersonPage.action",//返回干部人员访问权限分页列表
	findA01ByUserIdPage:"a01@findA01ByUserIdPage.action",//（干部人员访问权限添加弹出框列表）根据用户id查询未授权的档案人员列表
	findNotPowerArchPoweExcludePage:"a01@findNotPowerArchPoweExcludePage.action",//	(规避的档案人员添加列表页)根据用户id查询未被选择规避的档案人员列表
	savePowerArchPowerPerson:"powerArchPowerPerson@savePowerArchPowerPerson.action",//保存干部人员访问权限
	savePowerArchPoweExcludes:"powerArchPoweExclude@savePowerArchPoweExcludes.action",//档案人员规避保存
	deletePowerArchPowerPerson:"powerArchPowerPerson@deletePowerArchPowerPerson.action",//删除干部人员访问权限
	deletePowerArchPoweExcludes:"powerArchPoweExclude@deletePowerArchPoweExcludes.action",//
	
	//日志审计管理
	findSystemLogPage:"sysSystemlog@findSystemLogPage.action",//系统日志列表查询
	//日志分析
	findSysLogOptionPage:"sysLogOption@findSysLogOptionPage.action",//日志分析主表分析
	findSysLogOptionDateilListById:"sysLogOption@findSysLogOptionDateilListById.action",//日志分析子表信息
	
	// 工作台配置
	queryPowerWorkbConfig: "powerWorkbench@queryPowerWorkbConfig.action", //工作台配置列表
	editPWD: "powerWorkbench@editPWD.action", //工作台配置信息页面数据回显
	deletePWD: "powerWorkbench@deletePWD.action", //删除工作台配置信息
	saveOrUpdatePWD: "powerWorkbench@saveOrUpdatePWD.action", //新增/更新工作台配置信息
	queryPWDMenusDetails: "powerWorkbenchMenus@queryPWDMenusDetails.action", //查询工作台配置详情列表
	powerWorkMenuList: "menu@powerWorkMenuList.action", //工作台模板详情新增菜单 菜单列表查询
	savePWDMenus: "powerWorkbenchMenus@savePWDMenus.action", //新增工作台菜单
	getMenuListByWorkbenchId: "powerWorkbenchMenu@getMenuListByWorkbenchId.action", //根据工作台id查询工作台对应菜单列表
	deletePWDMenus: "powerWorkbenchMenus@deletePWDMenus.action", //删除工作台菜单
	getWorkMenuListByWorkbenchId: "powerWorkbenchMenus@getWorkMenuListByWorkbenchId.action", //点击排序工作台菜单列表查询
	updatePwbmSortNo:"powerWorkbenchMenus@updatePwbmSortNo.action", //上移下移批量更新排序
	initializeSortNo:"powerWorkbenchMenus@initializeSortNo.action",//工作台菜单初始化排序
	
	// 角色工作台设置
	queryRoleWorkBench: "role@queryRoleWorkBench.action", //角色工作台列表
	editRoleWorkBench: "role@editRoleWorkBench.action", //编辑回显角色工作台信息
	getPowerWorkbenchList: "powerWorkbench@getPowerWorkbenchList.action", //工作台下拉框列表返回
	updateRoleWorkBench: "role@updateRoleWorkBench.action", //修改角色工作台信息

	// 工作常用表
	queryBusinessType: "sysBusinessType@queryBusinessType.action",//查询工作常用表左侧栏
	saveOrUpdateBusType: "sysBusinessType@saveOrUpdateBusType.action",//新增/更新工作常用表左侧树
	editBusType: "sysBusinessType@editBusType.action", //工作常用表左侧树数据回显
	deleteBusType: "sysBusinessType@deleteBusType.action", //工作常用表左侧菜单删除

	queryActiveFiles: "sysActiveFiles@queryActiveFiles.action", //查询工作常用表右侧列表信息
	editActiveFiles: "sysActiveFiles@editActiveFiles.action", //工作常用表右侧树数据回显
	deleteActiveFiles: "sysActiveFiles@deleteActiveFiles.action", //删除工作常用表右侧信息
	updateActiveFiles: "sysActiveFiles@updateActiveFiles.action", //修改（新增）工作常用表右侧
	saveActiveFiles: "sysActiveFiles@saveActiveFiles.action", //新增工作常用表右侧
	uploadFileImageandExcel: "upload@uploadFileImageandExcel.action", //多条附加上传
	deleteAttaById:"sysActiveFiles@deleteAttaById.action",//附件删除
	
	// 知识库管理
	queryArchKnowledge: "sysArchivesKnowledge@queryArchKnowledge.action", //查询知识库列表
	editArchKnowledge: "sysArchivesKnowledge@editArchKnowledge.action", //知识库数据回显
	deleteArchKnowledge: "sysArchivesKnowledge@deleteArchKnowledge.action", //删除知识库列表信息
	updateArchKnowledge: "sysArchivesKnowledge@updateArchKnowledge.action", //修改(新增)知识库信息
	saveArchKnowledge: "sysArchivesKnowledge@saveArchKnowledge.action", //新增知识库信息

	// 通讯录管理
	deleteSysAddress: "sysAddressList@deleteSysAddress.action", //删除通讯录信息
	saveOrUpdateSysAddress: "sysAddressList@saveOrUpdateSysAddress.action", //新增通讯录信息
	querySysAddressList: "sysAddressList@querySysAddressList.action", //查询通讯录列表信息
	editSysAddress: "sysAddressList@editSysAddress.action", //通讯录编辑回显

	// 通知维护
	querySysSysMessage: "sysSysMessage@querySysSysMessage.action", //通知维护列表
	editSysMessage: "sysSysMessage@editSysMessage.action", //通知维护数据回显
	deleteSysMessage: "sysSysMessage@deleteSysMessage.action", //删除通知维护信息
	saveOrUpdateSysMessage: "sysSysMessage@saveOrUpdateSysMessage.action", //新增/更新通知维护
	
	//常量对象
	constObj:{
		applyTotalNumber:20,//查借阅申请总人数
		pageIndex:0,//页下标
		pageSize:10,//页大小
		requestFilter:[
			'index@checkLogin.action',//登录
			'area@areaTree.action',//获取区域树
			'index@externalBorrowingPersonnel.action'//外来查询人员、临时账户获取token
		],//拦截器不拦截的请求集合
		loginInfo:'GANDANG4-USER',//user信息
		menuInfo:'GANDANG4-MENU',//选中的菜单信息
		mainInfo:'GANDANG4-MAIN',//菜单及工作台等信息
		applyInfo:'GANDANG4-APPLYINFO',//外单位查询人员的申请信息
		areaOrgInfo:'GANDANG4-AREAORGINFO',//区域组织信息
		areaName:'上海市委组织部',//默认区域名称--
		applyTypeId:'A94D71B2-F10D-4A60-B2DF-C128BB028BB5',//查借阅类型id
		fileType:'C39B7D15-C8F0-4759-97BC-DB9EE79338D7',//档案类型id
		borrowReason:"84624238-4486-4134-835A-A82DE48BE106",//查借阅理由id
		applyStatusId:'305AAF23-699C-467B-9E5E-DDAA911D6BE6',//查借阅申请的状态id
		applyScopeId:'BF8B8AAD-51D1-4342-A69C-C5B0A5F18055',//查阅范围id
		stateId:'64717E0F-84C1-4B99-A722-551F5F77909D',//状态（停用、启用）
		fileTypeList:[//档案类型
			{
				id:'9A6B539C-FA04-40A9-B3FF-8124543853E2',
				name:'电子档案'
			},
			{
				id:'4D9B48AC-68BB-4F47-BBBC-5C2BDC067673',
				name:'纸质档案'
			}
		],
		fileTypeList2:[//档案类型--档案审核标准 列表专用
			{
				id:'CBEE9C9A-EDBB-468C-9956-4D135A83ADD7',
				name:'电子档案'
			},
			{
				id:'43606BCE-0075-478F-81E9-2065DCE780BD',
				name:'实体档案 '
			}
		],
		fileStatusList:[//申请单状态
			{
				id:'F99A32AD-1A73-45AF-8A23-CB211A5FFB46',
				name:'未提交'
			},
			{
				id:'2A9CE32C-D45A-4857-992E-0B700FE04A45',
				name:'已提交'
			},
			{
				id:'9B5B7D26-8B1A-4825-96D5-0632C053AAC9',
				name:'已授权'
			},
			{
				id:'B36B43F2-6317-41BC-ADC8-E74B7774F8FC',
				name:'已完成'
			},
			{
				id:'F12516B8-170C-43D4-93F9-8208E0519F69',
				name:'流程完成'
			},
			{
				id:'872C4E69-A9D9-4A89-8A7E-FF66B5E11259',
				name:'已终止'
			},
			{
				id:'27713E8C-E707-435C-837A-64E6A88E524A',
				name:'审批未通过'
			},
			{
				id:'4C9CFA10-AF21-4B59-8A33-881331C969AB',
				name:'拒绝授权'
			}
		],
		CadreCodeDetailList:[//民族、政治面貌等下拉选
			{
				id:'311AFB4B',//0
				name:'档案状态'
			},
			{
				id:'44B625FE',//1
				name:'人员类别'
			},
			{
				id:'7C5723D2',//2
				name:'民族'
			},
			{
				id:'37B05E7C',//3
				name:'政治面貌'
			},
			{
				id:'AD79F7FC',//4
				name:'婚姻状态'
			},
			{
				id:'4E465CF7',//5
				name:'有效证件类别'
			},
			{
				id:'15D0B3D8',//6
				name:'个人身份'
			},
			{
				id:'44B625FE',//7
				name:'数据状态'
			},
			{
				id:'2934AEF5',//8
				name:'离退类别'
			},
			{
				id:'D23644FE',//9
				name:'离退前级别'
			},
			{
				id:'D07A7996',//10
				name:'提前退休原因'
			},
			{
				id:'EEC671DC',//11
				name:'离退后管理类别'
			},
			{
				id:'311AFB4B',//12
				name:'档案状态'
			},
			{
				id:'44B625FE',//13
				name:'干部类别'
			},
			{
				id:'C447A23F',//14
				name:'调动原因'
			},
			{
				id:'A1257A96',//15
				name:'单位级别'
			},
			{
				id:'CA3DDB3F',//16
				name:'所属行业'
			},
			{
				id:'6B194970',//17
				name:'进入本单位原因'
			},
			{
				id:'A1257A96',//18
				name:'单位级别'
			},
			{
				id:'B0BDFB2F',//19
				name:'单位性质类别'
			},
			{
				id:'93F8C31E',//20
				name:'单位隶属关系'
			},
			{
				id:'3D76DBD4',//21
				name:'职务'
			},
			{
				id:'CDE75543',//22
				name:'职务级别'
			},
			{
				id:'96B57A0D',//23
				name:'职务类别'
			},
			{
				id:'D140E2AE',//24
				name:'任职方式'
			},
			{
				id:'F163C665',//25
				name:'任职机构级别'
			},
			{
				id:'C580EAF7',//26
				name:'任职原因'
			},
			{
				id:'12693D0E',//27
				name:'免职方式'
			},
			{
				id:'EE0F9251',//28
				name:'免职原因'
			},
			{
				id:'76C612C9',//29
				name:'学位'
			},
			{
				id:'B2928C96',//30
				name:'学历'
			},
			{
				id:'41E66B9A',//31
				name:'学制'
			},
			{
				id:'62A559F0',//32
				name:'所学专业类别'
			},
			{
				id:'4E45528A',//33
				name:'所学专业'
			},
			{
				id:'1B3C04DC',//34
				name:'学习完成情况'
			},
			{
				id:'1EAAFD9C',//35
				name:'教育类别'
			},
			{
				id:'A03DDB1E',//36
				name:'专业技术任职资格'
			},
			{
				id:'3FAD4573',//37
				name:'取得资格途径'
			},
			{
				id:'F4D4DB3C',//38
				name:'国籍'
			},
			{
				id:'2DA9F1C3',//39
				name:'与该人关系'
			},
			{
				id:'6761CBC7',//40
				name:'批准机关'
			},
			{
				id:'5C6B865C',//41
				name:'健康状况'
			}
		],
		CadreCodeDetailsPage:[//籍贯、出生地分页下拉选
			{
				id:'B42E1630',
				name:'出生地'
			},
			{
				id:'F9206113',
				name:'籍贯'
			},
			{
				id:'DD8A49C7',
				name:'学校(单位)所在政区'
			}
		],
		userStatusId:'F3DA42C8-3496-46D3-8418-7D2441CCD1CB',//用户状态id 
		roleStatusId:'2D5A00B1-EEDC-458E-BBA4-3C01FFD57BFA',//角色状态id
		workbench:{//默认角色工作台
			id:'D82C3038-5258-4E50-A7D8-B37B5547B7D0',
			name:'默认角色工作台'
		},
		moduleTypeId:'0FCD196B-21E8-4918-8744-3EDC69514B97',//模块分离id
		moduleTypeList:[//模块分类数据
			{
				id:'BE0F76FE-B7FC-40BC-AB31-8A0DCFD17994',
				name:'目录节点'
			},
			{
				id:'5BF96A55-700D-48C9-A28F-7A3E5109ECC5',
				name:'页面'
			},
			{
				id:'490CB91A-EA3F-4796-9650-8F55FD9B2EBD',
				name:'工作台模板'
			},
			{
				id:'4FFE1D86-8873-42D7-9BFE-870AE955B852',
				name:'公共模块'
			}
		]
	}
}
//配置编译环境和线上环境之间的切换
if (process.env.NODE_ENV == 'development') {//开发环境
    interface_s.baseURL = interface_s.devBaseURL;
}else if(process.env.NODE_ENV == 'testing'){//测试环境
    interface_s.baseURL = interface_s.testBaseURL;
}else if(process.env.NODE_ENV == 'production'){//生产环境
    interface_s.baseURL = interface_s.prodBaseURL;
}
export default interface_s;
