import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { FindA01InformationPage } from './data/findA01InformationPage';
let _FindA01InformationPage = FindA01InformationPage;
import { Users } from './data/users';
let _LoginUsers = Users;
import { AreaTreeList } from './data/areaTree';
let _AreaTreeList = AreaTreeList;
import { GetSysCadreCodeDetailList } from './data/getSysCadreCodeDetailList';
let _GetSysCadreCodeDetailList = GetSysCadreCodeDetailList;
import { GetSysCadreCodeDetailsPage } from './data/getSysCadreCodeDetailsPage';
let _GetSysCadreCodeDetailsPage = GetSysCadreCodeDetailsPage;
import { EditA01 } from './data/editA01';
let _EditA01 = EditA01;
import { FindA2930InformationPage } from './data/findA2930InformationPage';
let _FindA2930InformationPage = FindA2930InformationPage;
import { EditA31 } from './data/editA31';
let _EditA31 = EditA31;
import { EditA38 } from './data/editA38';
let _EditA38 = EditA38;
import { FindA02InformationPage } from './data/findA02InformationPage';
let _FindA02InformationPage = FindA02InformationPage;
import { FindA09InformationPage } from './data/findA09InformationPage';
let _FindA09InformationPage = FindA09InformationPage;
import { FindA08InformationPage } from './data/findA08InformationPage';
let _FindA08InformationPage = FindA08InformationPage;
import { FindA06InformationPage } from './data/findA06InformationPage';
let _FindA06InformationPage = FindA06InformationPage;
import { FindA36InformationPage } from './data/findA36InformationPage';
let _FindA36InformationPage = FindA36InformationPage;
import { FindA17InformationPage } from './data/findA17InformationPage';
let _FindA17InformationPage = FindA17InformationPage;
import { FindA05InformationPage } from './data/findA05InformationPage';
let _FindA05InformationPage = FindA05InformationPage;
import { FindA52InformationPage } from './data/findA52InformationPage';
let _FindA52InformationPage = FindA52InformationPage;
import { FindB01A01InformationPage } from './data/findB01A01InformationPage';
let _FindB01A01InformationPage = FindB01A01InformationPage;
import { FindAnnualAppraisalInformationPage } from './data/findAnnualAppraisalInformationPage';
let _FindAnnualAppraisalInformationPage = FindAnnualAppraisalInformationPage;
import { FindBadaInformationPage } from './data/findBadaInformationPage';
let _FindBadaInformationPage = FindBadaInformationPage;
import { EditBada } from './data/editBada';
let _EditBada = EditBada;
import { GetOrganizationTree } from './data/getOrganizationTree';
let _OrganizationTreeList = GetOrganizationTree;
import { FindSysArchClassify } from './data/findSysArchClassify';
let _FindSysArchClassify = FindSysArchClassify;
import { GetArchivesLogByA0100 } from './data/getArchivesLogByA0100';
let _GetArchivesLogByA0100 = GetArchivesLogByA0100;
import { GetWarehouseInfo } from './data/getWarehouseInfo';
let _GetWarehouseInfo = GetWarehouseInfo;
import { GetConsultElectronInfo } from './data/getConsultElectronInfo';
let _GetConsultElectronInfo = GetConsultElectronInfo;
import { GetConsultKindInfo } from './data/getConsultKindInfo';
let _GetConsultKindInfo = GetConsultKindInfo;
import { GetBorrowingInfo } from './data/getBorrowingInfo';
let _GetBorrowingInfo = GetBorrowingInfo;
import { GetArchApplyInfoList } from './data/getArchApplyInfo';
let _GetArchApplyInfo = GetArchApplyInfoList;
import { EditA02 } from './data/editA02';
let _EditA02 = EditA02;
import { 
	ConfigurationWorkList,
	ConfigurationWorkTree

} from './data/configurationWorkList';

import { 
	RecycleBinData 
} from './data/queryRecycleList';




import qs from 'qs';
import { 
	MainList
} from './data/commonDataManagement';

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
		//日常配置项
		mock.onGet('commonlyUsedMenu@configurationWorkList.action').reply(config => {
			let mockConfigurationWorkList = ConfigurationWorkList;
//			let total = mockConfigurationWorkList.length;
//			mockConfigurationWorkList = mockConfigurationWorkList.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
//								total: total,
								list: mockConfigurationWorkList
							}
						}
					]);
				}, 1000);
			});
		});
				//日常配置项
		mock.onGet('commonlyUsedMenu@configurationWorkTree.action').reply(config => {
			let mockConfigurationWorkTree = ConfigurationWorkTree;
//			let total = mockConfigurationWorkList.length;
//			mockConfigurationWorkList = mockConfigurationWorkList.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
//								total: total,
								list: mockConfigurationWorkTree
							}
						}
					]);
				}, 1000);
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
		//获取散材料批量管理集合（分页）
		mock.onGet('a01@findA01InformationPage.action').reply(config => {
			let {
				a01statusb,
				e10statusb,
				a01010,
				pageIndex,
				pageSize
			} = config.params;
			let mockFindA01InformationPage = _FindA01InformationPage;
			
			let total = mockFindA01InformationPage.length;
			mockFindA01InformationPage = mockFindA01InformationPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: mockFindA01InformationPage
							}
						}
					]);
				}, 1000);
			});
		});
		//检查登录
		mock.onPost('index@checkLogin.action').reply(config => {
			let {
				username,
				password,
				uAreacode
			} = qs.parse(config.data);;
			let LoginUsers = _LoginUsers;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '新增成功',
						data: LoginUsers
					}]);
				}, 500);
			});
		});
		//获取区域树形结构（不分页）
		mock.onGet('area@areaTree.action').reply(config => {
			let returnList = _AreaTreeList;
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
		//数据代码管理 //下拉框(民族、党派、档案状态、政治面貌、婚姻状态....）
		mock.onGet('sysCadreCodeDetail@getSysCadreCodeDetailList.action').reply(config => {
			let {
				code
			} = config.params;
			let returnList =[];
			_GetSysCadreCodeDetailList.some(u => {
				if(u.code === code) {
					returnList = u.data;
				};
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								list: returnList
							}
						}
					]);
				}, 1000);
			});
		});
		
		//数据代码管理 （出生地、籍贯）分页信息
		mock.onPost('sysCadreCodeDetail@getSysCadreCodeDetailsPage.action').reply(config => {
			let {
				code,
				name,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let GetSysCadreCodeDetailsPage = _GetSysCadreCodeDetailsPage.filter(borrow => {
				if(name && borrow.name.indexOf(name) == -1) return false;
				return true;
			});
			let total = GetSysCadreCodeDetailsPage.length;
			GetSysCadreCodeDetailsPage = GetSysCadreCodeDetailsPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: GetSysCadreCodeDetailsPage
							}
						}
					]);
				}, 1000);
			});
		});
		
		//编辑信息
		mock.onGet('a01@editA01.action').reply(config => {

			let {
				a0100
			} = config.params;
			let mockEditA01=_EditA01
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: mockEditA01
						}
					]);
				}, 1000);
			});
		});
		
		//调动信息列表查询
		mock.onGet('a2930@findA2930InformationPage.action').reply(config => {

			let {
				a0100,
				pageIndex,
				pageSize
			} = config.params;
			let mockFindA2930InformationPage = _FindA2930InformationPage;
			let total = mockFindA2930InformationPage.length;
			mockFindA2930InformationPage = mockFindA2930InformationPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:{
								total:total,
								list:mockFindA2930InformationPage,
								
							} 
						}
					]);
				}, 1000);
			});
		});
		
		//离退基本信息编辑页面数据回显
		mock.onGet('a31@editA31.action').reply(config => {
			let {
				a0100
			} = config.params;
			let mockEditA31 = _EditA31
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:mockEditA31,
						}
					]);
				}, 1000);
			});
		});
		
		//档案基本信息编辑页面数据回显
		mock.onGet('a38@editA38.action').reply(config => {
			let {
				a0100
			} = config.params;
			let mockEditA38 = _EditA38
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:mockEditA38,
						}
					]);
				}, 1000);
			});
		});
		//	扩充-工作单位及职务列表查询
		mock.onGet('a02@findA02InformationPage.action').reply(config => {
			let {
				a0100,
				pageIndex,
				pageSize
			} = config.params;

			let mockFindA02InformationPage = _FindA02InformationPage;
			let total = mockFindA02InformationPage.length;
			mockFindA02InformationPage = mockFindA02InformationPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:{
								total:total,
								list:mockFindA02InformationPage,
								
							}
						}
					]);
				}, 1000);
			});
		});
		//	扩充-学位信息查询列表页
		mock.onGet('a09@findA09InformationPage.action').reply(config => {
			let {
				a0100,
				pageIndex,
				pageSize
			} = config.params;

			let mockFindA09InformationPage = _FindA09InformationPage;
			let total = mockFindA09InformationPage.length;
			mockFindA09InformationPage = mockFindA09InformationPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:{
								total:total,
								list:mockFindA09InformationPage,
								
							}
						}
					]);
				}, 1000);
			});
		});
		//	扩充-学历信息查询列表页
		mock.onGet('08@findA08InformationPage.action').reply(config => {
			let {
				a0100,
				pageIndex,
				pageSize
			} = config.params;

			let mockFindA08InformationPage = _FindA08InformationPage.filter(borrow => {
				if(a0100 && borrow.a0100.indexOf(name) == -1) return false;
				return true;
			});
			let total = mockFindA08InformationPage.length;
			mockFindA08InformationPage = mockFindA08InformationPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:{
								total:total,
								list:mockFindA08InformationPage,
								
							}
						}
					]);
				}, 1000);
			});
		});
		//	扩充-学历信息查询列表页
		mock.onGet('a06@findA06InformationPage').reply(config => {
			let {
				a0100,
				pageIndex,
				pageSize
			} = config.params;

			let mockFindA06InformationPage = _FindA06InformationPage.filter(borrow => {
				if(a0100 && borrow.a0100.indexOf(name) == -1) return false;
				return true;
			});
			let total = mockFindA06InformationPage.length;
			mockFindA06InformationPage = mockFindA06InformationPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:{
								total:total,
								list:mockFindA06InformationPage,
								
							}
						}
					]);
				}, 1000);
			});
		});
		//	扩充-家庭成员及社会关系列表
		mock.onGet('a36@findA36InformationPage.action').reply(config => {
			let {
				a0100,
				pageIndex,
				pageSize
			} = config.params;

			let mockFindA36InformationPage = _FindA36InformationPage.filter(borrow => {
				if(a0100 && borrow.a0100.indexOf(name) == -1) return false;
				return true;
			});
			let total = mockFindA36InformationPage.length;
			mockFindA36InformationPage = mockFindA36InformationPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:{
								total:total,
								list:mockFindA36InformationPage,
								
							}
						}
					]);
				}, 1000);
			});
		});
		//	扩充-家庭成员及社会关系列表
		mock.onGet('a17@findA17InformationPage.action').reply(config => {
			let {
				a0100,
				pageIndex,
				pageSize
			} = config.params;

			let mockFindA17InformationPage = _FindA17InformationPage.filter(borrow => {
				if(a0100 && borrow.a0100.indexOf(name) == -1) return false;
				return true;
			});
			let total = mockFindA17InformationPage.length;
			mockFindA17InformationPage = mockFindA17InformationPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:{
								total:total,
								list:mockFindA17InformationPage,
								
							}
						}
					]);
				}, 1000);
			});
		});
		//	扩充-家庭成员及社会关系列表
		mock.onGet('a05@findA05InformationPage.action').reply(config => {
			let {
				a0100,
				pageIndex,
				pageSize
			} = config.params;

			let mockFindA05InformationPage = _FindA05InformationPage.filter(borrow => {
				if(a0100 && borrow.a0100.indexOf(name) == -1) return false;
				return true;
			});
			let total = mockFindA05InformationPage.length;
			mockFindA05InformationPage = mockFindA05InformationPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:{
								total:total,
								list:mockFindA05InformationPage,
								
							}
						}
					]);
				}, 1000);
			});
		});
		//	扩充-查询职务变动列表
		mock.onGet('a52@findA52InformationPage.action').reply(config => {
			let {
				a0100,
				pageIndex,
				pageSize
			} = config.params;

			let mockFindA52InformationPage = _FindA52InformationPage.filter(borrow => {
				if(a0100 && borrow.a0100.indexOf(name) == -1) return false;
				return true;
			});
			let total = mockFindA52InformationPage.length;
			mockFindA52InformationPage = mockFindA52InformationPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:{
								total:total,
								list:mockFindA52InformationPage,
								
							}
						}
					]);
				}, 1000);
			});
		});
		//	其他类-兼职管理列表查询
		mock.onGet('b01A01@findB01A01InformationPage.action').reply(config => {
			let {
				a0100,
				pageIndex,
				pageSize
			} = config.params;

			let mockFindB01A01InformationPage = _FindB01A01InformationPage.filter(borrow => {
				if(a0100 && borrow.a0100.indexOf(name) == -1) return false;
				return true;
			});
			let total = mockFindB01A01InformationPage.length;
			mockFindB01A01InformationPage = mockFindB01A01InformationPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:{
								total:total,
								list:mockFindB01A01InformationPage,
								
							}
						}
					]);
				}, 1000);
			});
		});
		//	其他类-年度考核表列表查询
		mock.onGet('annualAppraisal@findAnnualAppraisalInformationPage.action').reply(config => {
			let {
				a0100,
				pageIndex,
				pageSize
			} = config.params;

			let mockFindAnnualAppraisalInformationPage = _FindAnnualAppraisalInformationPage.filter(borrow => {
				if(a0100 && borrow.a0100.indexOf(name) == -1) return false;
				return true;
			});
			let total = mockFindAnnualAppraisalInformationPage.length;
			mockFindAnnualAppraisalInformationPage = mockFindAnnualAppraisalInformationPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:{
								total:total,
								list:mockFindAnnualAppraisalInformationPage,
								
							}
						}
					]);
				}, 1000);
			});
		});
		//	其他类-任免信息
		mock.onGet('ada@findBadaInformationPage.action').reply(config => {
			let {
				a0100,
				pageIndex,
				pageSize
			} = config.params;

			let mockFindBadaInformationPage = _FindBadaInformationPage.filter(borrow => {
				if(a0100 && borrow.a0100.indexOf(name) == -1) return false;
				return true;
			});
			let total = mockFindBadaInformationPage.length;
			mockFindBadaInformationPage = mockFindBadaInformationPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:{
								total:total,
								list:mockFindBadaInformationPage,
								
							}
						}
					]);
				}, 1000);
			});
		});
		
		//编辑回显（查看）任免信息-浏览
		mock.onGet('ada@editBada.action').reply(config => {
			let {
				id,
				a0100,
				uAreacode
			} = config.params;
			let mockEditBada = _EditBada;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:mockEditBada
								
						}
					]);
				}, 1000);
			});
		});
		//保存档案
		mock.onPost('a01@saveOrUpdateA01.action').reply(config => {
			let {
				a0101,
				a0102,
				a0104,
				a0107,
				a0111a,
				a0111b,
				a0114a,
				a0114b,
				a0117,
				a0127,
				a0131,
				a0134,
				a0141,
				a0144,
				a0151,
				a0183,
				a0184,
				a0191a,
				e1001,
				e1002,
				e1003,
				e1004,
				e10040,
				e1005,
				e10050,
				e10051,
				e1006,
				e1007,
				e10070,
				e10071,
				e1008,
				valStatus,
				e10:{
					e1009,
					e1010,
					e1011,
					e1012,
					e1013,
					e1014,
					e1014b,
					e1015,
					e1016,
					e1019
				},
				a0100
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
		//编辑-调动-删除档案
		mock.onGet('a2930@deleteA2930.action').reply(config => {
			let {
				a293000
			} = config.params;
			//let mockEditBada = _EditBada;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "删除成功",			
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
		//保存任免信息
		mock.onPost('ada@saveOrUpdateBada.action').reply(config => {
			let {
				id,
				a0100,
				pname,
				psex,
				birthDate,
				age,
				nation,
				nationplace,
				homeplace,
				partydate,
				jobdate,
				health,
				skillTech,
				skill,
				fullbachelor,
				fullschool,
				onjobbachelor,
				onjobschool,
				presentoccupation,
				designatedposition,
				tofreepost,
				resumeinformation,
				rewardsandpunishment,
				annualappraisalresults,
				reason,
				familymembers,
				reportunit,
				approvalopinion,
				approvaldate,
				administrativeorganopinion,
				administrativeorgandate,
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
		//编辑回显（查看）任免信息-浏览
		mock.onGet('sysArchClassify@findSysArchClassify.action').reply(config => {
			let {
				a0100
			} = config.params;
			let mockFindSysArchClassify = _FindSysArchClassify;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:mockFindSysArchClassify
								
						}
					]);
				}, 1000);
			});
		});
		//干部信息总库-删除人员档案
		mock.onGet('a01@deleteA01.action').reply(config => {
			let {
				a0100
			} = config.params;
			//let mockEditBada = _EditBada;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "删除成功",			
						}
					]);
				}, 1000);
			});
		});
		//浏览-档案利用情况-人员档案操作日志查询
		mock.onGet('utilizationArch@getArchivesLogByA0100.action').reply(config => {
			let {
				a0100
			} = config.params;
			let mockGetArchivesLogByA0100 = _GetArchivesLogByA0100;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:mockGetArchivesLogByA0100	
						}
					]);
				}, 1000);
			});
		});
		//浏览-档案利用情况-在库记录-入库
		mock.onGet('utilizationArch@getWarehouseInfo.action').reply(config => {
			let {
				a0100
			} = config.params;
			let mockGetWarehouseInfo = _GetWarehouseInfo;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:mockGetWarehouseInfo	
						}
					]);
				}, 1000);
			});
		});
		//浏览-档案利用情况-在库记录-入库
		mock.onGet('utilizationArch@getConsultElectronInfo.action').reply(config => {
			let {
				a0100
			} = config.params;
			let mockGetConsultElectronInfo = _GetConsultElectronInfo;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:mockGetConsultElectronInfo	
						}
					]);
				}, 1000);
			});
		});
		//浏览-档案利用情况-在库记录-查阅(实物)
		mock.onGet('utilizationArch@getConsultKindInfo.action').reply(config => {
			let {
				a0100
			} = config.params;
			let mockGetConsultKindInfo = _GetConsultKindInfo;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:mockGetConsultKindInfo	
						}
					]);
				}, 1000);
			});
		});
		//浏览-档案利用情况-在库记录-借 阅
		mock.onGet('utilizationArch@getBorrowingInfo.action').reply(config => {
			let {
				a0100
			} = config.params;
			let mockGetBorrowingInfo = _GetBorrowingInfo;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:mockGetBorrowingInfo	
						}
					]);
				}, 1000);
			});
		});
		//浏览-档案利用情况-当前档案查借阅状态-档案申请、审核、授权列表
		mock.onGet('borrowAndRead@getArchApplyInfo.action').reply(config => {
			let {
				a0100,
				archtype,
				flag,
				pageIndex,
				pageSize
			} = config.params;
			let mockgetArchApplyInfo =_GetArchApplyInfo;
			let total = mockgetArchApplyInfo.length;
			mockgetArchApplyInfo = mockgetArchApplyInfo.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:{
								total:total,
								list:mockgetArchApplyInfo,
							}	
						}
					]);
				}, 1000);
			});
		});
		//离退信息保存
		mock.onPost('a31@saveOrUpdateA31.action').reply(config => {
			let {
				a3100,
				a0100,
				a3104,
				a3101,
				a3107,
				a3118,
				a3137,
				a3141,
				a3144,
				a3134,
				a3117b,
				a3117a,
				a3131
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '保存成功'
					}]);
				}, 500);
			});
		});
		//档案信息保存
		mock.onPost('a38@saveOrUpdateA38.action').reply(config => {
			let {
				a3800,
				a0100,
				a3807a,
				a3804a,
				a3801,
				a3804b,
				a3807b,
				a3811,
				a3827,
				a3831,
				a3824,
				a3817,
				a3821a,
				a3821b
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '保存成功'
					}]);
				}, 500);
			});
		});
		//扩充-工作单位及职务-编辑页面数据回显
		mock.onGet('a02@editA02.action').reply(config => {
			let {
				a0200
			} = config.params;
			let mockEditA02 = _EditA02;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:mockEditA02	
						}
					]);
				}, 1000);
			});
		});
		//编辑-调动-删除档案
		mock.onGet('a2930@deleteA02.action').reply(config => {
			let {
				a0200
			} = config.params;
			//let mockEditBada = _EditBada;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "删除成功",			
						}
					]);
				}, 1000);
			});
		});
		//扩充-学位信息-保存
		mock.onPost('a09@saveOrUpdateA09.action').reply(config => {
			let {
				a0900,
				a0100,
				a0901a,
				a0901b,
				a0904,
				a0907,
				a0914
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '保存成功'
					}]);
				}, 500);
			});
		});
		//扩充-学位信息-删除
		mock.onGet('a09@deleteA09.action').reply(config => {
			let {
				a0900
			} = config.params;
			//let mockEditBada = _EditBada;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "删除成功",			
						}
					]);
				}, 1000);
			});
		});
		//扩充-学历信息-保存
		mock.onPost('a08@saveOrUpdateA08.action').reply(config => {
			let {
				a0800,
				a0100,
				a0801a,
				a0801b,
				a0807,
				a0804,
				a0811,
				a0814,
				a0817,
				a0824,
				a0827,
				a0831,
				a0834,
				a0837
				
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '保存成功'
					}]);
				}, 500);
			});
		});
		//扩充-学历信息-删除
		mock.onGet('a08@deleteA08.action').reply(config => {
			let {
				a0800
			} = config.params;
			//let mockEditBada = _EditBada;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "删除成功",			
						}
					]);
				}, 1000);
			});
		});
		//扩充-学历信息-保存
		mock.onPost('a02@saveOrUpdateA02.action').reply(config => {
			let {
				a0200,
				a0100,
				a0215a,
				a0215b,
				a0243,
				a0201a,
				a0203,
				a0207,
				a0219,
				a0221,
				a0245,
				a0247,
				a0249,
				a0265,
				a0267,
				a0269,
				a0271
				
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '保存成功'
					}]);
				}, 500);
			});
		});
		//扩充-专业技术任职资格信息-保存
		mock.onPost('a06@saveOrUpdateA06.action').reply(config => {
			let {
				a0600,
				a0100,
				a0601,
				a0607,
				a0604,
				a0611,
				a0614
				
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '保存成功'
					}]);
				}, 500);
			});
		});
		//扩充-专业技术任职资格信息-删除
		mock.onGet('a06@deleteA06.action').reply(config => {
			let {
				a0600
			} = config.params;
			//let mockEditBada = _EditBada;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "删除成功",			
						}
					]);
				}, 1000);
			});
		});
		//扩充-家庭成员及社会关系-保存
		mock.onPost('a36@saveOrUpdateA36.action').reply(config => {
			let {
				a0100,
				a3601,
				a3604a,
				a3617,
				a3621,
				a3624,
				a3627,
				a3604b,
				a3607,
				a3611,
				a3631,
				a3637,
				a3644,
				a3600
				
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '保存成功'
					}]);
				}, 500);
			});
		});
		//扩充-专业技术任职资格信息-删除
		mock.onGet('a36@deleteA36.action').reply(config => {
			let {
				a3600
			} = config.params;
			//let mockEditBada = _EditBada;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "删除成功",			
						}
					]);
				}, 1000);
			});
		});
		//扩充-简历信息-保存
		mock.onPost('a17@saveOrUpdateA17.action').reply(config => {
			let {
				a1700,
				a0100,
				a1703,
				a1701,
				a1704
				
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '保存成功'
					}]);
				}, 500);
			});
		});
		//扩充-简历信息-删除
		mock.onGet('a17@deleteA17.action').reply(config => {
			let {
				a1700
			} = config.params;
			//let mockEditBada = _EditBada;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "删除成功",			
						}
					]);
				}, 1000);
			});
		});
		//扩充-职级信息-保存
		mock.onPost('a05@saveOrUpdateA05.action').reply(config => {
			let {
				a0500,
				a0100,
				a0501a,
				a0501b,
				a0511,
				a0504,
				a0517,
				a0507a,
				a0507b,
				a0524,
				a0521
				
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '保存成功'
					}]);
				}, 500);
			});
		});
		//扩充-职级信息-删除
		mock.onGet('a05@deleteA05.action').reply(config => {
			let {
				a0500
			} = config.params;
			//let mockEditBada = _EditBada;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "删除成功",			
						}
					]);
				}, 1000);
			});
		});
		//扩充-职务变动-保存
		mock.onPost('a52@saveOrUpdateA52.action').reply(config => {
			let {
				a5200,
				a0100,
				a5201a,
				a5211a,
				a5234,
				a5201b,
				a5204a,
				a5204b,
				a5207a,
				a5207b,
				a5214,
				a5217,
				a5221,
				a5224,
				a5231,
				a5227,
				a5237
				
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '保存成功'
					}]);
				}, 500);
			});
		});
		//扩充-职务变动-删除
		mock.onGet('a52@deleteA52.action').reply(config => {
			let {
				a5200
			} = config.params;
			//let mockEditBada = _EditBada;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "删除成功",			
						}
					]);
				}, 1000);
			});
		});
		//扩充-职务变动-保存
		mock.onPost('a52@saveOrUpdateA52.action').reply(config => {
			let {
				id,
				a0100,
				b0000,
				ismain
				
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '保存成功'
					}]);
				}, 500);
			});
		});
		//其他类-兼职管理-删除
		mock.onGet('b01A01@deleteB01A01.action').reply(config => {
			let {
				id
			} = config.params;
			//let mockEditBada = _EditBada;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "删除成功",			
						}
					]);
				}, 1000);
			});
		});
		//其他类-年度考核-保存
		mock.onPost('a52@saveOrUpdateA52.action').reply(config => {
			let {
				id,
				a0100,
				b0000,
				pname,
				psex,
				birthDate,
				a0141,
				e1004,
				e10040,
				positionandworkincharge,
				personalsummary,
				advice,
				advicedate,
				leadersopinion,
				leadersopiniondate,
				myopinion,
				myopiniondate,
				testcase,
				testcasedate,
				remark
				
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '保存成功'
					}]);
				}, 500);
			});
		});
		//其他类-年度考核-删除
		mock.onGet('annualAppraisal@deleteAnnualAppraisal.action').reply(config => {
			let {
				id
			} = config.params;
			//let mockEditBada = _EditBada;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "删除成功",			
						}
					]);
				}, 1000);
			});
		});
		//	回收站-列表查询
		mock.onGet('a01@queryRecycleList.action').reply(config => {
			let {
				uAreacode,
				startDateStr,
				endDateStr,
				a01010,
				modifieder,
				pageIndex,
				pageSize
			} = config.params;

			let mockRecycleBinData = RecycleBinData;
			let total = mockRecycleBinData.length;
			mockRecycleBinData = mockRecycleBinData.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:{
								total:total,
								list:mockRecycleBinData,
								
							}
						}
					]);
				}, 1000);
			});
		});
		//回收站-恢复
		mock.onGet('a01@saveOrUpdateA01.action').reply(config => {
			let {
				a0100
			} = config.params;
			//let mockEditBada = _EditBada;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "删除成功",			
						}
					]);
				}, 1000);
			});
		});
		//上传图片
		mock.onGet('upload@uploadFileImge.action').reply(config => {
			let {
				uploadFile
			} = config.params;
			//let mockEditBada = _EditBada;
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
		//其他类-年度考核-保存
		mock.onPost('a2930@saveOrUpdateA2930.action').reply(config => {
			let {
				a293000,
				a0100,
				a3031,
				a3004,
				a3007b,
				a3014,
				a3024,
				a3021,
				a3011,
				a3007a,
				a2921a,
				a2917,
				a2907,
				a2921b,
				a2914,
				a2937,
				a2934,
				a2912
				
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '保存成功'
					}]);
				}, 500);
			});
		});
		//扩充-工作单位及职务-编辑页面数据回显
		mock.onGet('a2930@editA2930.action').reply(config => {
			let {
				a293000
			} = config.params;
			let mockEditA02 = _EditA02;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:mockEditA02	
						}
					]);
				}, 1000);
			});
		});
	}
}