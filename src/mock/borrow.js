import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BorrowList } from './data/borrowBookList';
import { SiteRegisterList } from './data/siteRegisterList';
import { FileSelectionList } from './data/FileSelectionList';
import { FileList } from './data/fileList';
import { GetA01BySite } from './data/getA01BySite';
import { SelectList } from './data/selectList';
import { RegisterFileList } from './data/registerFileList';
import { AreaTreeList } from './data/areaTree';
import { GetA01 } from './data/getA01';
import { GetOrganizationTree } from './data/getOrganizationTree';
import { GetFileAuthorization } from './data/getFileAuthorization';
import { ApplyFileDetail } from './data/applyFileDetail';
import { GetA01BySplit } from './data/getA01BySplit';
import { GetArchivesTree } from './data/getArchivesTree';
import { GetConsultObj } from './data/getConsultObj';
import { GetA01s } from './data/getA01s';
import { Users } from './data/users';
import { GetLookArchives } from './data/getLookArchives';
import { GetApplicationRecord } from './data/getApplicationRecord';
import { UserGroupTreeList } from './data/userGroupTreeList';
import { GetApprovals } from './data/getApprovals';
import { GetApprovaled } from './data/getApprovaled';
import { ViewFilesList } from './data/getViewFiles';

import qs from 'qs';

import { 
	MainList
} from './data/commonDataManagement';

//-----------------------用户权限管理模块------------------------
import { UserInfo } from './data/userInfo';
import { GetStations } from './data/getStations';
import { FindUserListPage } from './data/findUserListPage';
import { NotSelectedUser } from './data/notSelectedUser';
import { FindRoles } from './data/findRoles';
import { FindeUserPageInfo } from './data/findeUserPageInfo';
import { 
	RoleList,
	UserInRoleList,
	RoleMenuTreeList,
	ViewPowerList 
} from './data/roleManagement';

//-----------------------信息中心管理模块------------------------
import { 
	MenuTreeList,
	MenuTreeSelectList,
	MenuChildsPageList
} from './data/menuManagement';
import { 
	AllOrganizationList
} from './data/managementArchivesUnit';

import { 
	DataDictionaryList,
	QueryBySysCodeIdList
} from './data/dataDictionary';

import { 
	FileCheckStandardList
} from './data/fileCheckStandard';

import { 
	DataCodeList,
	DataCodeContentList
} from './data/dataCode';

import { quertMaterialType } from './data/quertMaterialType';
let _quertMaterialType = quertMaterialType;


let _GetApprovaled = GetApprovaled;
let _GetApprovals = GetApprovals;
let _Users = Users;
let _BorrowList = BorrowList;
let _FileSelectionList = FileSelectionList;
let _FileList = FileList;
let _SelectList = SelectList;
let _SiteRegisterList = SiteRegisterList;
let _GetA01BySiteList = GetA01BySite;
let _RegisterFileList = RegisterFileList;
let _AreaTreeList = AreaTreeList;
let _UserGroupTreeList = UserGroupTreeList;
let _GetA01List = GetA01;
let _OrganizationTreeList = GetOrganizationTree;
let _GetFileAuthorization = GetFileAuthorization;
let _GetApplyFileDetail = ApplyFileDetail;
let _GetA01BySplit = GetA01BySplit;
let _GetArchivesTree = GetArchivesTree;
let _GetConsultObj = GetConsultObj;
let _GetA01s = GetA01s;
let _GetLookArchives = GetLookArchives;
let _GetApplicationRecord = GetApplicationRecord;
let readTime = 200;
//-----------------------用户权限管理模块------------------------
let _UserInfo = UserInfo;
let _GetStations = GetStations;
let _FindUserListPage = FindUserListPage;
let _NotSelectedUser = NotSelectedUser;
let _FindRoles = FindRoles;
let _FindeUserPageInfo = FindeUserPageInfo;
export default {
	/**
	 * mock bootstrap
	 */
	bootstrap() {
		let mock = new MockAdapter(axios);
		// mock success request
		mock.onGet('/success').reply(200, {
			msg: 'success'
		});
		// mock error request
		mock.onGet('/error').reply(500, {
			msg: 'failure'
		});
		//检查登录
		mock.onPost('index@checkLogin.action').reply(config => {
			let {
				username,
				password,
				uAreacode
			} = qs.parse(config.data);
			let mockLoginUsers =_Users;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '登录成功',
						data: mockLoginUsers
					}]);
				}, 500);
			});
		});
		//修改密码
		mock.onPost('index@updatePassWord.action').reply(config => {
			let {
				password,
				passwordNew
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '修改成功'
					}]);
				}, 500);
			});
		});
		//退出登录
		mock.onGet('index@loginOut.action').reply(config => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '退出成功'
					}]);
				}, 500);
			});
		});
		//获取权限菜单、工作台（不分页）
		mock.onGet('index@main.action').reply(config => {
			let returnList = MainList;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: returnList
						}
					]);
				}, 1000);
			});
		});
		//获取借阅预约列表（分页）
		mock.onPost('borrowAndReadAppoint@getBorrowAndReadAppointList.action').reply(config => {
			let {
				appointor,
				applyType,
				appointStartDate,
				appointEndDate,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let mockBorrowList = _BorrowList.filter(borrow => {
				if(appointor && borrow.appointor.indexOf(Appointor) == -1) return false;
				return true;
			});
			let total = mockBorrowList.length;
			mockBorrowList = mockBorrowList.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: mockBorrowList
							}
						}
					]);
				}, 1000);
			});
		});
		//获取档案选择列表（分页）
		mock.onPost('borrowAndReadAppoint@findA01.action').reply(config => {
			let {
				b0000,
				a0101,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let mockFileSelectionList = _FileSelectionList.filter(borrow => {
				if(b0000 && borrow.b0000.indexOf(b0000) == -1) return false;
				return true;
			});
			let total = mockFileSelectionList.length;
			mockFileSelectionList = mockFileSelectionList.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: mockFileSelectionList
							}
						}
					]);
				}, 1000);
			});
		});
		//获取所有下拉框列表-非树形的下拉框（不分页）
		mock.onGet('sysCode@getDataList.action').reply(config => {
			let {
				id
			} = config.params;
			let returnList =[];
			_SelectList.some(u => {
				if(u.id === id) {
					returnList = u.data;
				};
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: returnList
						}
					]);
				}, 1000);
			});
		});
		//借阅预约--添加预约
		mock.onPost('borrowAndReadAppoint@addBorrowAndRead.action').reply(config => {
			let {
				appointor,
				appointordep,
				appointstartdate,
				appointenddate,
				applytype,
				contactway,
				idnumber,
				describe,
				a0100,
				name
			} = qs.parse(config.data);
			_BorrowList.push({
				"rowNum": _BorrowList.length + 1,
				"id": "4ab64672-c994-43bd-972c-a1743e02b041",
				"appointor": appointor,
				"appointorDep": appointordep,
				"appointStartDate": appointstartdate,
				"appointEndDate": appointenddate,
				"applyType": "查阅/借阅",
				"applyTypeId": applytype,
				"contactWay": contactway,
				"IDNumber": idnumber,
				"describe": describe,
				"archNames": name,
				"borrowAndReadSplitID": a0100,
				"U_SortNo": "30",
				"U_Creator": "档案管理员",
				"U_CreateDate": "2019/3/27 9:40:47",
				"U_CreatorOrgID": "",
				"U_LastModifieder": "档案管理员",
				"U_LastModifiedDate": "2019/3/27 10:07:40",
				"U_LastModifiederOrgID": "",
				"U_IsValid": "True",
				"U_IsSystem": "",
				"U_AreaCode": "130000",
				"status": ""
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '预约成功'
					}]);
				}, 500);
			});
		});
		//借阅预约--修改预约
		mock.onPost('borrowAndReadAppoint@updateBorrowAndRead.action').reply(config => {
			let {
				appointor,
				appointordep,
				appointstartdate,
				appointenddate,
				applytype,
				contactway,
				idnumber,
				describe,
				a0100,
				name
			} = qs.parse(config.data);
			_BorrowList.some(u => {
				if(u.id === id) {
					u.appointor = appointor;
					u.appointordep = appointordep;
					u.appointstartdate = appointstartdate;
					u.appointenddate = appointenddate;
					u.applytype = applytype;
					u.contactway = contactway;
					u.idnumber = idnumber;
					u.describe = describe;
					u.archnames = name;
					u.borrowandreadsplitid = a0100;
					return true;
				};
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '预约成功'
					}]);
				}, 500);
			});
		});

		//借阅预约--登记处理
		mock.onPost('borrowAndReadSite@borrowAndReadRegister.action').reply(config => {
			let {
				id
			} = qs.parse(config.data);
			_BorrowList.some(u => {
				if(u.id === id) {
					u.status = "2";
					return true;
				}
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '登记处理成功'
					}]);
				}, 500);
			});
		});
		//根据预约id获取档案人员信息列表（不分页）
		mock.onGet('borrowAndReadAppoint@getA01ByBorrowAndReadId.action').reply(config => {
			let {
				id
			} = config.params;
			let mockFileList = _FileList;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: mockFileList
						}
					]);
				}, 1000);
			});
		});
		//获取现场登记列表（分页）
		mock.onPost('borrowAndReadSite@getBorrowAndReadSite.action').reply(config => {
			let {
				applyManName,
				applyType,
				readingStartTime,
				readingEndTime,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let mockSiteRegisterList = _SiteRegisterList.filter(siteRegister => {
				if(applyManName && siteRegister.applyManName.indexOf(applyManName) == -1) return false;
				return true;
			});
			let total = mockSiteRegisterList.length;
			mockSiteRegisterList = mockSiteRegisterList.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: mockSiteRegisterList
							}
						}
					]);
				}, 1000);
			});
		});
		//现场登记--添加登记
		mock.onPost('borrowAndReadSite@register.action').reply(config => {
			let {
				applymanname, //登记人
				readingstarttime, //登记开始日期
				readingendtime, //登记结束日期
				applytype, //查借阅类型id
				purpose,//查借阅理由id
				applymanorg, //登记人部门
				contactway, //联系方式
				idnumber, //身份证号
				describe, //描述
				a0100
			} = qs.parse(config.data);
			_SiteRegisterList.push({
			    "rowNum": _SiteRegisterList.length + 1,
			    "id": "9acc0539-5a4c-45a8-81fe-07cd8c5064b6",
			    "purpose": "编史、修志、人物传记",
			    "purposeId": purpose,
			    "readingstarttime": readingstarttime,
			    "readingendtime": readingendtime,
				"applyType": "查阅",
				"applyTypeId": applytype,
			    "applymanname": applymanname,
			    "applymanorg": applymanorg,
			    "idnumber": idnumber,
			    "contactway": contactway,
			    "describe": describe,
			    "InputType": "",
			    "SplitID": a0100,
			    "status": "未归还",
			    "U_SortNo": "38",
			    "U_Creator": "档案管理员",
			    "U_CreateDate": "2019/4/2 14:54:17",
			    "U_CreatorOrgID": "",
			    "U_LastModifieder": "",
			    "U_LastModifiedDate": "",
			    "U_LastModifiederOrgID": "",
			    "U_IsValid": "True",
			    "U_IsSystem": "False",
			    "U_AreaCode": "130000"
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '预约成功'
					}]);
				}, 500);
			});
		});
		//现场登记--修改登记
		mock.onPost('borrowAndReadSite@updateSite.action').reply(config => {
			let {
				id,//登记id
				applymanname, //登记人
				readingstarttime, //登记开始日期
				readingendtime, //登记结束日期
				applytype, //查借阅类型id
				purpose,//查借阅理由id
				applymanorg, //登记人部门
				contactway, //联系方式
				idnumber, //身份证号
				describe //描述
			} = qs.parse(config.data);
			_SiteRegisterList.some(u => {
				if(u.id === id) {
				    u.purposeId= purpose,
				    u.readingstarttime= readingstarttime,
				    u.readingendtime= readingendtime,
					u.applyTypeId= applytype,
				    u.applymanname= applymanname,
				    u.applymanorg= applymanorg,
				    u.idnumber= idnumber,
				    u.contactway= contactway,
				    u.describe= describe
				};
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '预约成功'
					}]);
				}, 500);
			});
		});
		//根据登记id获取档案人员信息列表（不分页）
		mock.onGet('borrowAndReadSite@getA01BySite.action').reply(config => {
			let {
				id
			} = config.params;
			let mockGetA01BySiteList = _GetA01BySiteList;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: mockGetA01BySiteList
						}
					]);
				}, 1000);
			});
		});
		//现场登记--归还
		mock.onPost('borrowAndReadSite@giveBackSite.action').reply(config => {
			let {
				id,
				a0100
			} = qs.parse(config.data);
			console.log(a0100);
			let returnFiles = a0100.split(",");
			for(var i=0;i<returnFiles.length;i++){
				_GetA01BySiteList.some(u => {
					if(u.a0100 === returnFiles[i]) {
						u.isReturn = "是";
						return true;
					}
				});
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '归还成功'
					}]);
				}, 500);
			});
		});
		//获取登记对应人员档案列表（分页）
		mock.onGet('borrowAndReadSite@seeSite.action').reply(config => {
			let {
				id,
				pageIndex,
				pageSize
			} = config.params;
			let mockRegisterFileList = _RegisterFileList;
			let total = mockRegisterFileList.length;
			mockRegisterFileList = mockRegisterFileList.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: mockRegisterFileList
							}
						}
					]);
				}, 1000);
			});
		});
		//获取区域树形结构（不分页）
		mock.onGet('area@areaTree.action').reply(config => {
			let returnList =_AreaTreeList;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: returnList
						}
					]);
				}, 1000);
			});
		});
		//查档用户 查阅档案 获取人员档案
		mock.onGet('borrowAndRead@viewFiles.action').reply(config => {
			
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: ViewFilesList
						}
					]);
				}, 1000);
			});
		});
		//获取用户组树形结构（不分页）
		mock.onGet('powerUserOrganization@findUserOrganizationTree.action').reply(config => {
			let returnList =_UserGroupTreeList;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: returnList
						}
					]);
				}, 1000);
			});
		});
		//获取职能机构树形结构（不分页）
		mock.onGet('b00@organizationTree.action').reply(config => {
			
			let returnList =_OrganizationTreeList;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: returnList
						}
					]);
				}, 1000);
			});
		});
		//获取查借阅申请 人员档案列表（分页）
		mock.onGet('borrowAndRead@getA01.action').reply(config => {
			let {
				b0000,
				uAreaCode,
				a0101,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let mockGetA01List = _GetA01List.filter(borrow => {
				if(a0101 && borrow.a0101.indexOf(a0101) == -1) return false;
				return true;
			});
			let total = mockGetA01List.length;
			mockGetA01List = mockGetA01List.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: mockGetA01List
							}
						}
					]);
				}, 1000);
			});
		});
		//临时查借阅--外来人员 查借阅申请
		mock.onPost('borrowAndRead@borrowAndReadApply.action').reply(config => {
			let {
				BorrowAndRead,
				a0100,
				name
			} = qs.parse(config.data);
			_BorrowList.push({
				rowNum: _BorrowList.length + 1,
				id: "4ab64672-c994-43bd-972c-a1743e02b041",
				borrowAndReadSplitID: a0100,
				applymanname:BorrowAndRead.applymanname, //查阅人姓名
				applymanorg:BorrowAndRead.applymanorg,//查阅人单位
				applypost:BorrowAndRead.applypost,//查阅人职务
				idnumber:BorrowAndRead.idnumber,//查阅人身份证号
				contactway:BorrowAndRead.contactway,//查阅人联系方式
				applymanname2:BorrowAndRead.applymanname2, //查阅人2姓名
				applymanorg2:BorrowAndRead.applymanorg2,//查阅人2单位
				applypost2:BorrowAndRead.applypost2,//查阅人2职务
				idnumber2:BorrowAndRead.idnumber2,//查阅人2身份证号
				contactway2:BorrowAndRead.contactway2,//查阅人2联系方式
				isexistreference:BorrowAndRead.isexistreference,//是否有介绍信
				readingtime:BorrowAndRead.readingtime,//查阅时长（分钟）
				applytype:BorrowAndRead.applytype, //查借阅类型id
				readingstarttime: BorrowAndRead.readingstarttime, //查阅开始日期
				readingendtime: BorrowAndRead.readingendtime, //查阅结束日期
				rstype:BorrowAndRead.readingendtime,//档案类型
				purpose:BorrowAndRead.purpose,//查借阅目的
				describe:BorrowAndRead.describe//详细描述
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						data:"4W5R",
						msg: '预约成功'
					}]);
				}, 500);
			});
		});
		//查档用户和领导 查借阅申请
		mock.onPost('borrowAndRead@borrowAndReadApplyer.action').reply(config => {
			let {
				BorrowAndRead,
				readingtime,
				applytype,
				readingstarttime,
				readingendtime,
				rstype,
				purpose,
				describe
			} = qs.parse(config.data);
			
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '添加申请成功'
					}]);
				}, 500);
			});
		});
		//获取档案授权列表（分页）
		mock.onPost('approval@recordAccredit.action').reply(config => {
			let {
				userName,
				purpose,
				startDate,
				endDate,
				stype,
				status,
				describe,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let mockFileAuthorization = _GetFileAuthorization.filter(obj => {
				if(userName && obj.userName.indexOf(userName) == -1) return false;
				return true;
			});
			let total = mockFileAuthorization.length;
			mockFileAuthorization = mockFileAuthorization.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: mockFileAuthorization
							}
						}
					]);
				}, 1000);
			});
		});
		//获取申请查阅档案详细数据（不分页）
		mock.onGet('approval@details.action').reply(config => {
			let {
				id,
				stype,
				pageIndex,
				pageSize
			} = config.params;
			let mockApplyFileDetail = _GetApplyFileDetail;
			//mockApplyFileDetail = mockApplyFileDetail.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:mockApplyFileDetail
						}
					]);
				}, 1000);
			});
		});
		//获取申请查阅档案授权信息（不分页）
		mock.onGet('approval@getA01BySplit.action').reply(config => {
			let {
				id,
				stype
			} = config.params;
			let returnList =_GetA01BySplit;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: returnList
						}
					]);
				}, 1000);
			});
		});
		//十大类 授权回显数据（不分页）
		mock.onGet('approval@getArchivesTree.action').reply(config => {
			let {
				id,
				a0100
			} = config.params;
			let mockGetArchivesTree = _GetArchivesTree;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: mockGetArchivesTree
						}
					]);
				}, 1000);
			});
		});
		//十大类授权 授权 拒绝
		mock.onPost('approval@archivesAccredit.action').reply(config => {
			let {
				id,
				data
			} = qs.parse(config.data);
			let newList = [];
			var isArchives = true;
			if(data.length >0){
				 isArchives = true;
			}else{
				 isArchives = false;
			}
			for(let i=0;i<_GetA01BySplit.length;i++){
				if(_GetA01BySplit[i].id === id ) {
					_GetA01BySplit[i].isImpower = isArchives;
					break;
				}					
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '授权成功'
					}]);
				}, 500);
			});
		});
		//电子档案授权: 授权/拒绝
		mock.onPost('approval@electronAccredit.action').reply(config => {
			let {
				stype,
				impowerstarttime,
				impowerendtime,
				impowerTime,
				data
			} = qs.parse(config.data);
			var isImpower = true;
			if(stype == 1){//已授权
				isImpower = true;
			}else{//已拒绝
				isImpower = false;
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '授权成功'
					}]);
				}, 500);
			});
		});
		//纸质档案授权: 授权/拒绝
		mock.onPost('approval@entityAccredit.action').reply(config => {
			let {
				id,
				stype,
				impowerstarttime,
				impowerendtime,
				powerdescribe,
				a0101
			} = qs.parse(config.data);
			var isImpower = true;
			if(stype == 1){//已授权
				isImpower = true;
			}else{//已拒绝
				isImpower = false;
			}
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '授权成功'
					}]);
				}, 500);
			});
		});
		//获取所有下拉框列表-非树形的下拉框（不分页）
		mock.onGet('borrowAndRead@consult.action').reply(config => {
			let {
				idNumber,
				queryCode
			} = config.params;
			let retunData = _GetConsultObj;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: retunData
						}
					]);
				}, 1000);
			});
		});
		//临时查借阅 查阅档案 获取人员档案（分页）
		mock.onGet('borrowAndRead@getA01s.action').reply(config => {
			let {
				id,
				stype,
				pageIndex,
				pageSize
			} = config.params;
			let mockGetA01s = _GetA01s;
			let total = mockGetA01s.length;
			mockGetA01s = mockGetA01s.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:{
								total: total,
								list: mockGetA01s
							}
						}
					]);
				}, 1000);
			});
		});
		//外来查询人员、临时账户获取token
		mock.onGet('index@externalBorrowingPersonnel.action').reply(config => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: "EE9DLBTrywHS+IfMim+vudjx16Pm9/OtCrVZIZzjOcBRekxoYXRWdg=="
						}
					]);
				}, 1000);
			});
		});
		//查看查阅申请十大类档案
		mock.onGet('borrowAndRead@lookArchives.action').reply(config => {
			let {
				id
			} = config.params;
			let retunData = _GetLookArchives;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: retunData
						}
					]);
				}, 1000);
			});
		});
		//查阅时限 定时任务
		mock.onGet('borrowAndRead@countDown.action').reply(config => {
			let {
				id
			} = config.params;
			readTime=readTime-1;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: readTime
						}
					]);
				}, 1000);
			});
		});
		//结束阅档
		mock.onGet('borrowAndRead@overRead.action').reply(config => {
			let {
				id
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "操作成功",
						}
					]);
				}, 1000);
			});
		});
		//档案审批列表（分页）
		mock.onPost('approvalProcess@approvals.action').reply(config => {
			let {
				type,
				pageIndex,
				pageSize,
				userName,
				purpose,
				startDate,
				endDate,
				describe,
				aType
			} = qs.parse(config.data);
			let mockGetApprovals = _GetApprovals;
			let total = mockGetApprovals.length;
			mockGetApprovals = mockGetApprovals.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:{
								total: total,
								list: mockGetApprovals
							}
						}
					]);
				}, 1000);
			});
		});
		//审批历史（不分页）
		mock.onGet('approvalProcess@approvaled.action').reply(config => {
			let {
				id
			} = config.params;
			let mockGetApprovaled = _GetApprovaled;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:mockGetApprovaled
						}
					]);
				}, 1000);
			});
		});
		//审批
		mock.onPost('approvalProcess@approvaling.action').reply(config => {
			let {
				id,
				result,
				reason
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '审批成功'
					}]);
				}, 500);
			});
		});
		//申请记录列表（分页）
		mock.onGet('approvalProcess@applicationRecord.action').reply(config => {
			let {
				status,
				purpose,
				startDate,
				endDate,
				sType,
				pageIndex,
				pageSize
			} = config.params;
			let mockGetApplicationRecord = _GetApplicationRecord;
			let total = mockGetApplicationRecord.length;
			mockGetApplicationRecord = mockGetApplicationRecord.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:{
								total: total,
								list: mockGetApplicationRecord
							}
						}
					]);
				}, 1000);
			});
		});
		//终止
		mock.onGet('approvalProcess@termination.action').reply(config => {
			let {
				id
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "操作成功"
						}
					]);
				}, 1000);
			});
		});
		//-----------------------用户权限管理模块------------------------
		//获取用户管理列表（分页）
		mock.onPost('user@findUserInfo.action').reply(config => {
			let {
				cn,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let mockUserInfo = _UserInfo.filter(item => {
				if(cn && item.cn.indexOf(cn) == -1) return false;
				return true;
			});
			let total = mockUserInfo.length;
			mockUserInfo = mockUserInfo.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: mockUserInfo
							}
						}
					]);
				}, 1000);
			});
		}),
		//获取用户岗位列表-非树形的下拉框（不分页）
		mock.onGet('user@findAllStations.action').reply(config => {
			let returnList =_GetStations;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: returnList
						}
					]);
				}, 1000);
			});
		});
		//添加用户
		mock.onPost('user@saveUser.action').reply(config => {
			let {
				cn,
				uid,
				stationsid,
				status,
				isinitial
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '添加用户成功'
					}]);
				}, 500);
			});
		});
		//修改用户信息
		mock.onPost('user@updateUser.action').reply(config => {
			let {
				id,
				cn,
				uid,
				stationsid,
				status,
				isinitial
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '修改用户成功'
					}]);
				}, 500);
			});
		});
		//删除用户信息
		mock.onGet('user@deleteUser.action').reply(config => {
			let {
				id
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '删除用户成功'
					}]);
				}, 500);
			});
		});
		//获取密码初始化用户分页信息（分页）
		mock.onPost('user@findUserListPage.action').reply(config => {
			let {
				cn,
				organizationIDS,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let mockUserInfo = _FindUserListPage.filter(item => {
				if(cn && item.cn.indexOf(cn) == -1) return false;
				return true;
			});
			let total = mockUserInfo.length;
			mockUserInfo = mockUserInfo.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: mockUserInfo
							}
						}
					]);
				}, 1000);
			});
		});
		//添加和修改用户组
		mock.onPost('powerUserOrganization@saveOrUpdateOrganization.action').reply(config => {
			let {
				id,
				pid,
				name,
				functions,
				remarks,
				isenable
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '添加/修改用户组成功'
					}]);
				}, 500);
			});
		});
		//删除用户组信息
		mock.onGet('powerUserOrganization@deleteOrganization.action').reply(config => {
			let {
				id
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '删除用户组成功'
					}]);
				}, 500);
			});
		});
		//获取未被分配用户列表（分页）
		mock.onPost('powerUserOrganization@findUserChooseList.action').reply(config => {
			let {
				cn,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let mockNotSelectedUser = _NotSelectedUser.filter(item => {
				if(cn && item.cn.indexOf(cn) == -1) return false;
				return true;
			});
			let total = mockNotSelectedUser.length;
			mockNotSelectedUser = mockNotSelectedUser.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: mockNotSelectedUser
							}
						}
					]);
				}, 1000);
			});
		});
		//删除用户组下的对应用户
		mock.onGet('powerUserOrganization@deleteUserOrganization.action').reply(config => {
			let {
				id
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '用户组下的用户删除成功'
					}]);
				}, 500);
			});
		});
		//用户密码初始化
		mock.onGet('user@initializationPassword.action').reply(config => {
			let {
				id
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '密成功',
						data: "12345abcde",
					}]);
				}, 500);
			});
		});
		//查询角色集合以及用户选择的角色(不分页)
		mock.onGet('role@findRoles.action').reply(config => {
			let {
				id
			} = config.params;
			let mockFindRoles = _FindRoles;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: mockFindRoles
						}
					]);
				}, 1000);
			});
		});
		//设置用户角色
		mock.onPost('role@roleSetting.action').reply(config => {
			let {
				id,
				roleIds
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '用户角色设置成功'
					}]);
				}, 500);
			});
		});
		//用户组添加用户
		mock.onPost('powerUserOrganization@saveUserOrganization.action').reply(config => {
			let {
				orgId,
				userId
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '用户组添加用户成功'
					}]);
				}, 500);
			});
		});
		//获取用户组下的用户列表页（分页）
		mock.onPost('powerUserOrganization@findeUserPageInfo.action').reply(config => {
			let {
				orgId,
				cn,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let mockFindeUserPageInfo = _FindeUserPageInfo.filter(item => {
				if(orgId && item.orgId.indexOf(orgId) == -1) return false;
				return true;
			});
			let total = mockFindeUserPageInfo.length;
			mockFindeUserPageInfo = mockFindeUserPageInfo.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: mockFindeUserPageInfo
							}
						}
					]);
				}, 1000);
			});
		});
		//获取角色分页列表（分页）
		mock.onPost('role@findRolesPage.action').reply(config => {
			let {
				name,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let mockRoleList = RoleList.filter(item => {
				if(name && item.name.indexOf(name) == -1) return false;
				return true;
			});
			let total = mockRoleList.length;
			mockRoleList = mockRoleList.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: mockRoleList
							}
						}
					]);
				}, 1000);
			});
		});
		//添加/更新角色
		mock.onPost('role@saveOrUpdateRole.action').reply(config => {
			let {
				id,
				remarks,
				workbenchid,
				status,
				name
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '角色添加/修改成功'
					}]);
				}, 500);
			});
		});
		//删除角色
		mock.onGet('role@deleteRole.action').reply(config => {
			let {
				id
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '角色删除成功'
					}]);
				}, 500);
			});
		});
		//角色下的所有对应人员（分页）
		mock.onPost('role@findCorrespondingUserPage.action').reply(config => {
			let {
				id,
				cn,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let mockUserInRoleList = UserInRoleList.filter(item => {
				if(cn && item.cn.indexOf(cn) == -1) return false;
				return true;
			});
			let total = mockUserInRoleList.length;
			mockUserInRoleList = mockUserInRoleList.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: mockUserInRoleList
							}
						}
					]);
				}, 1000);
			});
		});
		//按照角色id获取菜单权限
		mock.onGet('role@roleMenuTree.action').reply(config => {
			let {
				id
			} = config.params;
			let mockRoleMenuTreeList = RoleMenuTreeList;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: mockRoleMenuTreeList
						}
					]);
				}, 1000);
			});
		});
		//保存角色权限
		mock.onGet('role@saveOrUpdateRoleMenu.action').reply(config => {
			let {
				id,
				menuid
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '角色权限保存成功'
					}]);
				}, 500);
			});
		});
		//按照角色id获取菜单权限（查看权限）
		mock.onGet('role@viewPower.action').reply(config => {
			let {
				id
			} = config.params;
			let mockViewPowerList = ViewPowerList;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: mockViewPowerList
						}
					]);
				}, 1000);
			});
		});
		/*-------------信息中心管理模块-----------------*/
		//获取菜单列表--不分页
		mock.onGet('menu@menuTreeList.action').reply(config => {
			let mockMenuTreeList = MenuTreeList;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: mockMenuTreeList
						}
					]);
				}, 1000);
			});
		});
		//删除菜单
		mock.onGet('menu@deleteMenuaction').reply(config => {
			let {
				id
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '删除菜单成功'
					}]);
				}, 500);
			});
		});
		//删除子页面
		mock.onGet('menu@deleteMenuChilds.action').reply(config => {
			let {
				id
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '删除子页面成功'
					}]);
				}, 500);
			});
		});
		//获取菜单树--不分页
		mock.onGet('menu@menuTree.action').reply(config => {
			let MockMenuTreeSelectList = MenuTreeSelectList;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: MockMenuTreeSelectList
						}
					]);
				}, 1000);
			});
		});
		//添加或者更新菜单
		mock.onPost('menu@saveOrUpdateMenu.action').reply(config => {
			let {
				id,
				name,
				path,
				code,
				type,
				parentid,
				isinitial,
				isshow,
				isenable,
				issuperuser
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '菜单添加/修改成功'
					}]);
				}, 500);
			});
		});
		//菜单下的子页面列表页（分页）
		mock.onGet('menu@menuChildsPage.action').reply(config => {
			let {
				menuid,
				pageIndex,
				pageSize
			} = config.params;
			let mockMenuChildsPageList = MenuChildsPageList;
			let total = mockMenuChildsPageList.length;
			mockMenuChildsPageList = mockMenuChildsPageList.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: mockMenuChildsPageList
							}
						}
					]);
				}, 1000);
			});
		});
		//添加或者更新子页面
		mock.onPost('menu/saveMenuChilds.action').reply(config => {
			let {
				name,
				path,
				code
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '子页面添加/修改成功'
					}]);
				}, 500);
			});
		});
		//获取 管档单位列表--不分页
		mock.onGet('organization@findAllOrganization.action').reply(config => {
			let MockAllOrganization = AllOrganizationList;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: MockAllOrganization
						}
					]);
				}, 1000);
			});
		});
		//获取档案十大类列表-非树形（不分页）
		mock.onGet('filecheckmissing@quertMaterialType.action').reply(config => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: _quertMaterialType
						}
					]);
				}, 1000);
			});
		});
		//数据字典列表（分页）
		mock.onPost('dataDictionary@queryByPageLists.action').reply(config => {
			let {
				menuid,
				nameorcode,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let mockDataDictionaryList = DataDictionaryList;
			let total = mockDataDictionaryList.length;
			mockDataDictionaryList = mockDataDictionaryList.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: mockDataDictionaryList
							}
						}
					]);
				}, 1000);
			});
		});
		//根据数据字典id查询对应子集列表--不分页
		mock.onGet('dataDictionary@QueryBySysCodeId.action').reply(config => {
			let {
				id
			} = config.params;
			let MockQueryBySysCodeIdList = QueryBySysCodeIdList;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: MockQueryBySysCodeIdList
						}
					]);
				}, 1000);
			});
		});
		//档案审核标准 列表（分页）
		mock.onGet('fileCheckStandard@findAll.action').reply(config => {
			let {
				id
			} = config.params;
			let mockFileCheckStandardList = FileCheckStandardList;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: mockFileCheckStandardList
						}
					]);
				}, 1000);
			});
		});
		//数据代码列表（分页）
		mock.onPost('dataCodeManagement@getPageLists.action').reply(config => {
			let {
				nameorcode,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let mockDataCodeList = DataCodeList;
			let total = mockDataCodeList.length;
			mockDataCodeList = mockDataCodeList.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: mockDataCodeList
							}
						}
					]);
				}, 1000);
			});
		});
		//根据代码id分页查询子集列表（分页）
		mock.onPost('dataCodeManagement@getListsByCodeId.action').reply(config => {
			let {
				id,
				nameorcode,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let mockDataCodeContentList = DataCodeContentList;
			let total = mockDataCodeContentList.length;
			mockDataCodeContentList = mockDataCodeContentList.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: mockDataCodeContentList
							}
						}
					]);
				}, 1000);
			});
		});
	}
}