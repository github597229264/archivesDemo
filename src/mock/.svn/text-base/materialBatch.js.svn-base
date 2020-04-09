import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MaterialBatchList } from './data/materialBatchList';
let _MaterialBatchList = MaterialBatchList;
import { FileSelectionList } from './data/FileSelectionList';
let _FileSelectionList = FileSelectionList;
import { addMaterial, material } from './data/addMaterial';
let _addMaterial = material;
import { data } from './data/findA01sById';
let _data = data;
import { materialtransferList } from './data/materialtransfer';
let _materialtransferList = materialtransferList;
import { getPagerList } from './data/GetPagerE01Z41Json';
let _getPagerList = getPagerList;
import { personList } from './data/queryAll.js';
let _personList = personList;
import { addtransfer, transfer } from './data/addtransfer';
let _transfer = transfer;
import { materialReceiveList } from './data/materialReceiveList';
let _materialReceiveList = materialReceiveList;
import { getPagerE01Z2Json } from './data/GetPagerE01Z2Json';
let _getPagerE01Z2Json = getPagerE01Z2Json;
import { addMaterialReceiving, receiving } from './data/addMaterialReceiving';
let _receiving = receiving;
/*
 * import { personsList } from './data/getList'; let _personsList = personsList;
 */
import { GetOrganizationTree } from './data/getOrganizationTree';
let _OrganizationTreeList = GetOrganizationTree;
import { getPagersList } from './data/GetPagerJson';
let _getPagersList = getPagersList;
let obj = {};
import { totalList } from './data/quetycount';
let _totalList = totalList;
import { GetAllHandelandArchive } from './data/GetAllHandelandArchive';
let _GetAllHandelandArchive = GetAllHandelandArchive;
import { GetPagerE01Z700Json } from './data/GetPagerE01Z700Json';
let _GetPagerE01Z700Json = GetPagerE01Z700Json;
import { findByE01Z700Id } from './data/findByE01Z700Id';
let _findByE01Z700Id = findByE01Z700Id;
import { GetAllreturnandforward } from './data/GetAllreturnandforward';
let _GetAllreturnandforward = GetAllreturnandforward;
import { GetPagerE01Z500Json } from './data/GetPagerE01Z500Json';
let _GetPagerE01Z500Json = GetPagerE01Z500Json;
import { GetPagerE01Z5Json } from './data/GetPagerE01Z5Json';
let _GetPagerE01Z5Json = GetPagerE01Z5Json;
import { entityorelectronicfilesbutton } from './data/entityorelectronicfilesbutton';
let _entityorelectronicfilesbutton = entityorelectronicfilesbutton;
import { AreaTreeList } from './data/areaTree';
let _AreaTreeList = AreaTreeList;
import { Users } from './data/users';
let _LoginUsers = Users;
import { queryByPageList } from './data/queryByPageList';
let _queryByPageList = queryByPageList;
import { addFileClearUp } from './data/addFileClearUp';
let _addFileClearUp = addFileClearUp;
import { queryByPageLists } from './data/queryByPageLists';
let _queryByPageLists = queryByPageLists;
import { quertMaterialType } from './data/quertMaterialType';
let _quertMaterialType = quertMaterialType;
import qs from 'qs';
import { findA01ByOrgIdPage } from './data/findA01ByOrgIdPage';
let _findA01ByOrgIdPage = findA01ByOrgIdPage;
import { GetSysCadreCodeDetailList } from './data/getSysCadreCodeDetailList';
let _GetSysCadreCodeDetailList = GetSysCadreCodeDetailList;
import { viewAdjustment } from './data/viewAdjustment';
let _viewAdjustment = viewAdjustment;
import { findB00ById } from './data/findB00ById';
let _findB00ById = findB00ById;
import { SelectList } from './data/selectList';
let _SelectList = SelectList;
import { GetSysCadreCodeDetailsPage } from './data/getSysCadreCodeDetailsPage';
let _GetSysCadreCodeDetailsPage = GetSysCadreCodeDetailsPage;
import { findUserOrganizationList } from './data/findUserOrganizationList';
let _findUserOrganizationList = findUserOrganizationList;
import { GetArchivesTree } from './data/getArchivesTree';
let _GetArchivesTree = GetArchivesTree;
import { findUserOrgRelationById } from './data/findUserOrgRelationById';
let _findUserOrgRelationById = findUserOrgRelationById;systemSettings
import { systemSettings } from './data/systemSettings';
let _findSystemSettingsList = systemSettings;
import { queryMetadataList } from './data/queryMetadataList';
let _queryMetadataList = queryMetadataList;
import { findCommonPowerUser } from './data/findCommonPowerUser';
let _findCommonPowerUser = findCommonPowerUser; 
import { UserGroupTreeList } from './data/userGroupTreeList';
let _UserGroupTreeList = UserGroupTreeList;
import { findPowerArchPowerOrgPage } from './data/findPowerArchPowerOrgPage';
let _findPowerArchPowerOrgPage = findPowerArchPowerOrgPage;
import { findPowerArchPowerOrgs } from './data/findPowerArchPowerOrgs';
let _findPowerArchPowerOrgs = findPowerArchPowerOrgs;
import { findAuthorizedfilesPage } from './data/findAuthorizedfilesPage';
let _findAuthorizedfilesPage = findAuthorizedfilesPage;
import { findPowerArchPoweExcludePage } from './data/findPowerArchPoweExcludePage';
let _findPowerArchPoweExcludePage = findPowerArchPoweExcludePage;
import { findPowerArchPowerPersonPage } from './data/findPowerArchPowerPersonPage';
let _findPowerArchPowerPersonPage = findPowerArchPowerPersonPage;
import { findA01ByUserIdPage } from './data/findA01ByUserIdPage';
let _findA01ByUserIdPage = findA01ByUserIdPage;
import { findNotPowerArchPoweExcludePage } from './data/findNotPowerArchPoweExcludePage';
let _findNotPowerArchPoweExcludePage = findNotPowerArchPoweExcludePage;
import { findSystemLogPage,findSysLogOptionPage,findSysLogOptionDateilListById} from './data/SystemLog';
import { MenuTreeList,MenuTreeSelectList,MenuChildsPageList } from './data/menuManagement';
import { FindSysArchClassify } from './data/findSysArchClassify';
let _FindSysArchClassify = FindSysArchClassify;

import { 
	queryAllCollection
} from './data/materialCollection';

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
		// 获取散材料批量管理集合（分页）
		mock.onPost('bulkMaterial@GetPagerJson.action').reply(config => {
			let {
				e01z211a,
				startTime,
				endTime,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let mockMaterialBatchList = _MaterialBatchList.filter(borrow => {
				if(e01z211a && borrow.e01z211a.indexOf(e01z211a) == -1) return false;
				return true;
			});
			let total = mockMaterialBatchList.length;
			mockMaterialBatchList = mockMaterialBatchList.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: mockMaterialBatchList
							}
						}
					]);
				}, 1000);
			});
		});
		// 获取档案选择列表（分页）
		mock.onPost('findA01').reply(config => {
			let {
				b0000,
				a0101,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let mockFileSelectionList = _FileSelectionList.filter(borrow => {
				if(a0101 && borrow.a0101.indexOf(a0101) == -1) return false;
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
		// 新增散材料用户
		mock.onPost('bulkMaterial@addMaterial.action').reply(config => {
			let {
				BorrowAndReadAppoint,
				a0100s,
				names
			} = qs.parse(config.data);
			_addMaterial.push({
				BorrowAndReadAppoint: BorrowAndReadAppoint,
				a0100s: a0100s,
				names: names
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '新增成功'
					}]);
				}, 500);
			});
		});
		// 编辑散材料用户
		mock.onPost('bulkMaterial@updateMaterial.action').reply(config => {
			let {
				e01z211a,
				e01z211,
				e01z227,
				e01z124,
				e01z224,
				e01z231,
				id,
				a0100s
			} = qs.parse(config.data);
			_addMaterial.push({
				e01z211a: e01z211a,
				e01z211: e01z211,
				e01z227: e01z227,
				e01z124: e01z124,
				e01z224: e01z224,
				e01z231: e01z231,
				id: id,
				a0100s: a0100s
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 200,
						msg: '编辑成功'
					}]);
				}, 500);
			});
		});
		// 获取档案选择列表（分页）
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
		// 获取某个材料下的人员信息
		mock.onGet('bulkMaterial@findA01sById.action').reply(config => {
			let {
				id,
				pageIndex,
				pageSize
			} = config.params;
			// let data= _data.filter(data => {
			// if (name && user.name.indexOf(name) == -1) return false;
			// return true;
			// });
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: "1",
						message: "获取成功",
						data: _data
					}]);
				}, 1000);
			});
		});
		// 查询所有材料转递（分页）
		mock.onPost('transfer@GetTransferJson.action').reply(config => {
			let {
				e01z4103a,
				startTime,
				endTime,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let materialtransferList = _materialtransferList.filter(material => {
				if(e01z4103a && material.e01z4103a.indexOf(e01z4103a) == -1) return false;
				return true;
			});
			let total = materialtransferList.length;
			materialtransferList = materialtransferList.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: materialtransferList
							}
						}
					]);
				}, 1000);
			});
		});
		// 材料转递详情中根据id查询所有人员 分页）
		mock.onGet('transfer@findE01Z41sById.action').reply(config => {
			let {
				id,
				pageIndex,
				pageSize
			} = config.params;
			let getPagerList = _getPagerList.filter(material => {
				// if(id && getPagerList.id.indexOf(id) == -1) return false;
				return true;
			});
			let total = getPagerList.length;
			getPagerList = getPagerList.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: getPagerList
							}
						}
					]);
				}, 1000);
			});
		});
		// 删除一个散材料传递
		mock.onGet('transfer@deleteE01Z41Id.action').reply(config => {
			let {
				id
			} = config.params;
			// _Users = _Users.filter(u => u.id !== id);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '删除成功'
					}]);
				}, 500);
			});
		});
		// 材料传递添加中 材料信息库中人员集合
		mock.onPost('transfer@queryAll.action').reply(config => {
			let {
				a0101,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let personList = _personList.filter(material => {
				if(a0101 && material.a0101.indexOf(a0101) == -1) return false;
				return true;
			});
			let total = personList.length;
			personList = personList.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: personList
							}
						}
					]);
				}, 1000);
			});
		});
		// 添加一个散材料转递
		mock.onPost('transfer@addtransfer.action').reply(config => {
			let {
				toArea,
				transferouttype,
				e01z4104,
				e01z4113,
				mode,
				confidentialno,
				e01z4114,
				archNames,
				archivesIds,
				infoIds,
			} = qs.data;
			_transfer.push({
				toArea: toArea, // 转往单位
				transferouttype: transferouttype, // 转递方式
				e01z4104: e01z4104, // 转出日期
				e01z4113: e01z4113, // 经办人员
				mode: mode, // 转递类型
				confidentialno: confidentialno, // 来件人员
				e01z4114: e01z4114, // 备注
				archNames: archNames, // 该参数为下面的档案人员名字用,号隔开字符串
				archivesIds: archivesIds, // 档案库id，拼接字符串
				infoIds: infoIds // 信息库id，拼接字符串
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '新增成功'
					}]);
				}, 500);
			});
		});
		// 获取材料接收列表（分页）
		mock.onPost('materialReceiving@queryPageAll').reply(config => {
			let {
				comeUnit,
				receiveName,
				startTime,
				endTime,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let materialReceiveList = _materialReceiveList.filter(material => {
				if(comeUnit && material.e01z204a.indexOf(comeUnit) == -1) return false;
				if(receiveName && material.e01z207.indexOf(receiveName) == -1) return false;
				return true;
			});
			let total = materialReceiveList.length;
			materialReceiveList = materialReceiveList.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: materialReceiveList
							}
						}
					]);
				}, 1000);
			});
		});
		// 获取料接收中详情按钮（分页）
		// mock.onGet('materialReceiving/findByIde01z200').reply(config => {
		mock.onGet('ledger@getAllReceive.action').reply(config => {
			let {
				startTime,
				endTime,
				id,
				pageIndex,
				pageSize
			} = config.params;
			let getPagerE01Z2Json = _getPagerE01Z2Json.filter(material => {
				// if(id && material.id.indexOf(id) == -1) return false;
				return true;
			});
			let total = getPagerE01Z2Json.length;
			getPagerE01Z2Json = getPagerE01Z2Json.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: getPagerE01Z2Json
							}
						}
					]);
				}, 1000);
			});
		});
		// 材料接收删除按钮materialReceiving/deleteByIde01z200
		mock.onGet('materialReceiving@deleteByIde01z200').reply(config => {
			let {
				id
			} = config.params;
			// _Users = _Users.filter(u => u.id !== id);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '删除成功'
					}]);
				}, 500);
			});
		});
		// 添加一个材料接收
		mock.onPost('materialReceiving@addMaterialReceiving.action').reply(config => {
			let {
				e01z204a,
				confidentialNo,
				e01z207,
				e01z201,
				type,
				e01z231,
				lists,
			} = qs.data;
			_receiving.push({
				e01z204a: e01z204a,
				confidentialNo: confidentialNo,
				e01z207: e01z207,
				e01z201: e01z201,
				type: type,
				e01z231: e01z231,
				lists: lists
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '新增成功'
					}]);
				}, 500);
			});
		});
		// 编辑一个材料接收
		mock.onPost('materialReceiving@updataMaterialReceiving.action').reply(config => {
			let {
				e01z204a,
				confidentialNo,
				e01z207,
				e01z201,
				type,
				e01z231,
				lists,
				/*
				 * : [ e01z2: { a0101, e01z211a, e01z211b, e01z211, e01z124,
				 * e01z224, e01z227, e01z231 } ]
				 */
			} = qs.data;
			_receiving.push({
				e01z204a: e01z204a,
				confidentialNo: confidentialNo,
				e01z207: e01z207,
				e01z201: e01z201,
				type: type,
				e01z231: e01z231,
				lists: lists
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '编辑成功'
					}]);
				}, 500);
			});
		});

		// 材料转递-添加-档案库中根据干部id查询干部档案详情信息
		mock.onGet('transfer@findPersionFileDetail.action').reply(config => {
			let {
				id
			} = config.params;
			let GetAllHandelandArchive = _GetAllHandelandArchive;
			// let data= _data.filter(data => {
			// if (name && user.name.indexOf(name) == -1) return false;
			// return true;
			// });
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: "1",
						message: "获取成功",
						data: GetAllHandelandArchive
					}]);
				}, 1000);
			});
		});
		// 获取职能机构树形结构（不分页）
		mock.onGet('b00@organizationTree.action').reply(config => {
			let {
				
			} = config.params;
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
		// 编辑散材料用户
		mock.onPost('receive@changeStatus').reply(config => {
			let {
				id,
				status
			} = qs.parse(config.data);
			_addMaterial.push({
				id: id,
				status: status
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '接收成功'
					}]);
				}, 500);
			});
		});
		// 台账管理中总览列表接口（分页）
		/*
		 * mock.onGet('/queryAllByPage').reply(config => { let { a0101, e01z314,
		 * e01z204a, sourcetype, e01z237, valstatus, pageIndex, pageSize, } =
		 * JSON.parse(config.data); obj = _getPagersList; let list = obj.data;
		 * let getPagerList = list.filter(material => { if(a0101 &&
		 * material.a0101.indexOf(a0101) == -1) return false; if(e01z314 &&
		 * material.e01z314.indexOf(e01z314) == -1) return false; if(e01z204a &&
		 * material.e01z204a.indexOf(e01z204a) == -1) return false;
		 * if(sourcetype && material.sourceTypeValue.indexOf(sourcetype) == -1)
		 * return false; if(e01z237 && material.e01z124Value.indexOf(e01z237) ==
		 * -1) return false; if(valstatus &&
		 * material.statusValue.indexOf(valstatus) == -1) return false; return
		 * true; }); let total = getPagerList.length; getPagerList =
		 * getPagerList.filter((u, index) => index < pageSize * (pageIndex*1+1) &&
		 * index >= pageSize * (pageIndex - 1)); obj.data = getPagerList; return
		 * new Promise((resolve, reject) => { setTimeout(() => { resolve([200, {
		 * code: "1", message: "获取成功", data: { total: total, list: obj,
		 *  } } ]); }, 1000); }); });
		 */
		// 台账管理中总览列表接口（分页）
		mock.onPost('materialReceiving@queryAllByPage.action').reply(config => {
			let {
				startTime,
				endTime,
				a0101,
				e01z314,
				e01z204a,
				sourcetype,
				e01z237,
				valstatus,
				pageIndex,
				pageSize,
			} = qs.parse(config.data);
			let getPagerList = _getPagersList.filter(material => {
				if(a0101 && material.a0101.indexOf(a0101) == -1) return false;
				if(e01z314 && material.e01z314.indexOf(e01z314) == -1) return false;
				if(e01z204a && material.e01z204a.indexOf(e01z204a) == -1) return false;
				if(sourcetype && material.sourceTypeValue.indexOf(sourcetype) == -1) return false;
				if(e01z237 && material.e01z124Value.indexOf(e01z237) == -1) return false;
				if(valstatus && material.statusValue.indexOf(valstatus) == -1) return false;
				return true;
			});
			let total = getPagerList.length;
			getPagerList = getPagerList.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			obj.data = getPagerList;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: getPagerList,

							}
						}
					]);
				}, 1000);
			});
		});
		// 台账管理中处理归档撤销按钮
		mock.onGet('receive@changeStandingBookStatus').reply(config => {
			let {
				id,
				status // 0 撤销 1 处理钮传 2归档
			} = config.params;
			// _addMaterial.push({
			// id: id,
			// status: status
			// });
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '处理成功'
					}]);
				}, 500);
			});
		});
		// 台账管理统计数据
		mock.onGet('materialReceiving@quetycount.action').reply(config => {
			let {
				startTime,
				endTime
			} = config.params;
			let totalList = _totalList.filter(recommend => {
				// if (presenter && recommend.presenter.indexOf(presenter) ==
				// -1) return false;
				return true;
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: "1",
						message: "获取成功",
						recommends: totalList
					}]);
				}, 1000);
			});
		});
		// 台账管理--统计中的 处理材料 和归档材料接口
		mock.onPost('ledger@GetAllHandelandArchive.action').reply(config => {
			let {
				status,
				startTime,
				endTime,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let GetAllHandelandArchive = _GetAllHandelandArchive.filter(material => {
				// if(status && material.e01z211a.indexOf(e01z211a) == -1)
				// return false;
				return true;
			});
			let total = GetAllHandelandArchive.length;
			GetAllHandelandArchive = GetAllHandelandArchive.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: GetAllHandelandArchive
							}
						}
					]);
				}, 1000);
			});
		});
		// 档案日常管理 档案转递 分页查询所有列表（分页）
		mock.onPost('filetransfer@queryAllPage.action').reply(config => {
			let {
				transferUnit,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let GetPagerE01Z700Json = _GetPagerE01Z700Json.filter(material => {
				if(transferUnit && material.e01z704a.indexOf(transferUnit) == -1) return false;
				return true;
			});
			let total = GetPagerE01Z700Json.length;
			GetPagerE01Z700Json = GetPagerE01Z700Json.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: GetPagerE01Z700Json
							}
						}
					]);
				}, 1000);
			});
		});
		// 档案日常管理 档案转递 添加
		mock.onPost('filetransfer@addFileTransfer.action').reply(config => {
			let {
				e01z704a,
				e01z721,
				e01z717,
				e01z701,
				e01z727,
				e01z724,
				e01z731,
				ids
			} = qs.data;
			_receiving.push({
				e01z704a: e01z704a,
				e01z721: e01z721,
				e01z717: e01z717,
				e01z701: e01z701,
				e01z727: e01z727,
				e01z724: e01z724,
				e01z731: e01z731,
				ids: ids
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '新增成功'
					}]);
				}, 500);
			});
		});
		// 档案日常管理 档案转递 详情按钮
		mock.onGet('filetransfer@findByE01Z700Id.action').reply(config => {
			let {
				id,
				pageIndex,
				pageSize
			} = config.params;
			let findByE01Z700Id = _findByE01Z700Id.filter(material => {
				// if(transferUnit && material.e01z704a.indexOf(transferUnit) ==
				// -1) return false;
				return true;
			});
			let total = findByE01Z700Id.length;
			findByE01Z700Id = findByE01Z700Id.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: findByE01Z700Id
							}
						}
					]);
				}, 1000);
			});
		});
		// 台账管理--统计中的 转递材料 和退回材料接口
		mock.onPost('ledger@GetAllreturnandforward.action').reply(config => {
			let {
				status,
				startTime,
				endTime,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let GetAllreturnandforward = _GetAllreturnandforward.filter(material => {
				// if(status && material.e01z211a.indexOf(e01z211a) == -1)
				// return false;
				return true;
			});
			let total = GetAllreturnandforward.length;
			GetAllreturnandforward = GetAllreturnandforward.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: GetAllreturnandforward
							}
						}
					]);
				}, 1000);
			});
		});
		// 档案日常维护 档案接收 中列表（分页）
		mock.onPost('fileReceive@findAllByPage.action').reply(config => {
			let {
				comeunit,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let GetPagerE01Z500Json = _GetPagerE01Z500Json.filter(material => {
				if(comeunit && material.e01z507a.indexOf(comeunit) == -1) return false;
				return true;
			});
			let total = GetPagerE01Z500Json.length;
			GetPagerE01Z500Json = GetPagerE01Z500Json.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: GetPagerE01Z500Json
							}
						}
					]);
				}, 1000);
			});
		});
		// 档案日常维护 档案接收 中删除功能
		mock.onGet('fileReceive@deleteFileReceive.action').reply(config => {
			let {
				id
			} = config.params;
			// _Users = _Users.filter(u => u.id !== id);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '删除成功'
					}]);
				}, 500);
			});
		});
		// 档案日常维护 档案接收 中详情按钮功能分页）
		mock.onGet('fileReceive@findE01Z500ById.action').reply(config => {
			let {
				id,
				pageIndex,
				pageSize
			} = config.params;
			let GetPagerE01Z5Json = _GetPagerE01Z5Json.filter(material => {
				// if(id && getPagerList.id.indexOf(id) == -1) return false;
				return true;
			});
			let total = GetPagerE01Z5Json.length;
			GetPagerE01Z5Json = GetPagerE01Z5Json.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: GetPagerE01Z5Json
							}
						}
					]);
				}, 1000);
			});
		});
		// 档案日常维护 档案接收 中添加功能
		mock.onPost('fileReceive@addFileReceive.action').reply(config => {
			let {
				e01z507a,
				e01z527,
				type,
				confidentialno,
				e01z314,
				e01z501,
				e01z544,
				lists
			} = qs.data;
			_transfer.push({
				e01z507a:e01z507a,
				e01z527:e01z527,
				type:type,
				confidentialno:confidentialno,
				e01z314:e01z314,
				e01z501:e01z501,
				e01z544:e01z544,
				lists:lists
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '新增成功'
					}]);
				}, 500);
			});
		});
		// 档案日常维护 档案接收 中退回按钮
		mock.onPost('fileReceive@returnButton.action').reply(config => {
			let {
				id,
				e01z521,
				gobackperson,
				e01z524,
				e01z531,
				backcontent
			} = qs.data;
			// _Users = _Users.filter(u => u.id !== id);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '退回成功'
					}]);
				}, 500);
			});
		});
		// 档案日常维护 档案接收 中退回按钮
		mock.onPost('fileReceive@resolveokbutton.action').reply(config => {
			let {
				e01z521,
				e01z524,
				e01z537,
				e01z534,
				gobackperson,
				e01z531,
				ids,
				id,
			} = qs.data;
			// _Users = _Users.filter(u => u.id !== id);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '处理成功'
					}]);
				}, 500);
			});
		});
		// 档案日常维护 档案接收 处理 中 入库或退回按钮
		mock.onPost('fileReceive@putstoreroomorsendbackbutton.action').reply(config => {
			let {
				id,
				status,
				backcontent
			} = qs.data;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '退回成功'
					}]);
				}, 500);
			});
		});
		// 档案日常维护 档案接收 处理 中 电子档案和实体档案按钮
		mock.onGet('fileReceive@entityorelectronicfilesbutton.action').reply(config => {
			let {
				id,
				type
			} = config.params;
			let returnList = _entityorelectronicfilesbutton;
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
		// 档案日常维护 档案接收 处理 中 档案审核，数字审核中的保存按钮
		mock.onPost('fileReceive@filereviewsave.action').reply(config => {
			let {
				list
			} = qs.parse(config.data);
			_addMaterial.push({
				list:list
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '保存成功'
					}]);
				}, 500);
			});
		});
		// 获取区域树形结构（不分页）
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
		// 检查登录
		mock.onPost('index@checkLogin.action').reply(config => {
			let {
				username,
				password,
				uAreacode
			} = qs.parse(config.data);
			let LoginUsers =_LoginUsers;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '登录成功',
						data: LoginUsers
					}]);
				}, 500);
			});
		});
		// 检查登录
		mock.onPost('index@updatePassWord.action').reply(config => {
			let {
				password,
				passwordNew
			} = qs.parse(config.data);;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '修改成功'
					}]);
				}, 500);
			});
		});
		// 档案专项审核 档案审核 列表（分页）
		mock.onPost('fileclearup@queryByPageList.action').reply(config => {
			let {
				e01z611,
				startTime,
				endTime,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let queryByPageList = _queryByPageList.filter(material => {
				if(e01z611 && material.a0101.indexOf(e01z611) == -1) return false;
				return true;
			});
			let total = queryByPageList.length;
			queryByPageList = queryByPageList.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: queryByPageList
							}
						}
					]);
				}, 1000);
			});
		});
		// 档案专项审核 档案审核 删除
		mock.onGet('fileclearup@deleteFileClearUp.action').reply(config => {
			let {
				id
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '删除成功'
					}]);
				}, 500);
			});
		});
		// 档案专项审核 档案整理 新增
		mock.onPost('fileclearup@addFileClearUp.action').reply(config => {
			let {
				a0100,
				a0101,
				e01z601,
				e01z604,
				e01z607,
				e01z611,
				e01z614,
				e01z617,
				e01z400
			} = qs.data;
			_addFileClearUp.push({
				a0100:a0100,
				a0101: a0101,
				e01z601: e01z601,
				e01z604: e01z604,
				e01z607: e01z607,
				e01z611: e01z611,
				e01z614: e01z614,
				e01z617: e01z617,
				e01z400: e01z400
				
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '新增成功'
					}]);
				}, 500);
			});
		});
		// 档案专项审核 档案审核 列表（分页）
		mock.onPost('fileclearup@queryByPageLists.action').reply(config => {
			let {
				name,
				e01z0001,
				startTime,
				endTime,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let queryByPageLists = _queryByPageLists.filter(material => {
				if(name && material.name.indexOf(name) == -1) return false;
				if(e01z0001 && material.e01z0001.indexOf(e01z0001) == -1) return false;
				return true;
			});
			let total = queryByPageLists.length;
			queryByPageLists = queryByPageLists.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: queryByPageLists
							}
						}
					]);
				}, 1000);
			});
		});
		// 档案专项审核 档案查缺 删除
		mock.onGet('fileCheckMissing@deleteFileCheckMissing.action').reply(config => {
			let {
				id
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '删除成功'
					}]);
				}, 500);
			});
		});
		// 档案专项审核 档案查缺 处理
		mock.onGet('filecheckmissing@checkstatus.action').reply(config => {
			let {
				id
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '处理成功'
					}]);
				}, 500);
			});
		});
		// 档案专项审核 档案整理 新增
		mock.onPost('fileCheckMissing@saveorupdataFileCheckMissing.action').reply(config => {
			let {
				a0100,
				a0101,
				e10040,
				e01z401a,
				e01z401b,
				e01z211,
				e01z404,
				e01z407,
				e01z411,
				e01z0001,
				e01z414,
				e01z400
			} = qs.data;
			_addFileClearUp.push({
				a0100:a0100,
				a0101: a0101,
				e10040: e10040,
				e01z401a: e01z401a,
				e01z401b: e01z401b,
				e01z211: e01z211,
				e01z404: e01z404,
				e01z407: e01z407,
				e01z411: e01z411,
				e01z0001: e01z0001,
				e01z414: e01z414,
				e01z400: e01z400
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '新增成功'
					}]);
				}, 500);
			});
		});
		// 获取所有下拉框列表-非树形的下拉框（不分页）
		mock.onGet('filecheckmissing@quertMaterialType.action').reply(config => {
			let {
				// name
			} =config.params;;
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
		// 获取所有下拉框列表-非树形的下拉框（不分页）
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
		// 根据机构id查询档案人员（分页）
		mock.onPost('a01@findA01ByOrgIdPage.action').reply(config => {
			let {
				id,
				a01StatusB,
				a0101,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let findA01ByOrgIdPage = _findA01ByOrgIdPage.filter(material => {
				if(a01StatusB && material.a01StatusB.indexOf(a01StatusB) == -1) return false;
				if(a0101 && material.a0101.indexOf(a0101) == -1) return false;
				return true;
			});
			let total = findA01ByOrgIdPage.length;
			findA01ByOrgIdPage = findA01ByOrgIdPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: findA01ByOrgIdPage
							}
						}
					]);
				}, 1000);
			});
		});
		// 获取用户组树形结构（不分页）
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
		// 数据代码管理 //下拉框(干部在职情况，民族、党派、档案状态、政治面貌、婚姻状态....）
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
							data: returnList
						}
					]);
				}, 1000);
			});
		});
		// 调整页面查询工作单位、兼职单位根据档案人员a0100（不分页）
		mock.onGet('b01A01@viewAdjustment.action').reply(config => {
			let {
				a0100
			} = config.params;
			let viewAdjustment = _viewAdjustment;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:viewAdjustment
						}
					]);
				}, 1000);
			});
		});
		// 机构人员调整保存
		mock.onPost('b01A01@adjustmentDepartmentA01.action').reply(config => {
			let {
				a0100,
				b0000,
				ismain
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '机构人员调整成功'
					}]);
				}, 500);
			});
		});
		// 根据机构id查询机构信息（不分页）
		mock.onGet('b00@findB00ById.action').reply(config => {
			let {
				b0000
			} = config.params;
			let findB00ById = _findB00ById;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:findB00ById
						}
					]);
				}, 1000);
			});
		});
		// 机构人员调整保存
		mock.onPost('b00@saveB00.action').reply(config => {
			let {
				b0001,
				b0002,
				type,
				orgid,
				b0000
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '添加机构信息成功'
					}]);
				}, 500);
			});
		});
		// 数据代码管理 （出生地、籍贯）分页信息
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
		// 删除机构
		mock.onGet('b00@deleteB00.action').reply(config => {
			let {
				b0000
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '删除成功'
					}]);
				}, 500);
			});
		});
		// 更新虚拟机构
		mock.onPost('b00@updateB00.action').reply(config => {
			let {
				b0000,
				b0001,
				b0002
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '更新虚拟机构成功'
					}]);
				}, 500);
			});
		});
		// 更新单位
		mock.onPost('b00@updateB01.action').reply(config => {
			let {
				b0100,
				b0101,
				b0111,
				b0114,
				b0117,
				b0124,
				b0127,
				b0131,
				describe
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '更新单位成功'
					}]);
				}, 500);
			});
		});
		// 更新部门
		mock.onPost('b00@updateB0101.action').reply(config => {
			let {
				b010100,
				dep,
				departfull,
				departcode,
				staffsize,
				realitysize,
				status,
				describe
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '更新部门成功'
					}]);
				}, 500);
			});
		});
		// 用户组集合返回用户(除过根节点）设置用户组管档范围）
		mock.onGet('powerUserOrganization@findUserOrganizationList.action').reply(config => {
			let {
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data:_findUserOrganizationList
						}
					]);
				}, 1000);
			});
		});
		// 十大类 授权回显数据（不分页）
		mock.onGet('approval@getArchivesTree').reply(config => {
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
		// 管档范围用户组管理的机构
		mock.onGet('powerUserOrganization@findUserOrgRelationById.action').reply(config => {
			let {
				id
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '获取管档范围用户组管理的机构成功',
						data: _findUserOrgRelationById
					}]);
				}, 500);
			});
		});
		// 更新部门
		mock.onPost('powerUserOrganization@updateUserOrganizationRange.action').reply(config => {
			let {
				id,
				orgIds
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '更新用户组职能范围'
					}]);
				}, 500);
			});
		});
		// 系统参数配置列表
		mock.onGet('systemSettings@findSystemSettingsList.action').reply(config => {
			let {
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '获取系统参数配置列表成功',
						data: _findSystemSettingsList
					}]);
				}, 500);
			});
		});
		// 是否启用三元保存
		mock.onGet('systemSettings@isEnabledSanYuan.action').reply(config => {
			let {
				id,
				value
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '操作成功'
					}]);
				}, 500);
			});
		});
		// 元数据管理列表分页信息
		mock.onPost('a01@queryMetadataList.action').reply(config => {
			let {
				a01010,
				a01Statusb,
				e10Statusb,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let queryMetadataList = _queryMetadataList.filter(borrow => {
				if(a01010 && borrow.a01010.indexOf(a01010) == -1) return false;
				return true;
			});
			let total = queryMetadataList.length;
			queryMetadataList = queryMetadataList.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: queryMetadataList
							}
						}
					]);
				}, 1000);
			});
		});
		// 数据授权可以授权的用户列表页
		mock.onGet('user@findCommonPowerUser.action').reply(config => {
			let {
				orgId,
				cn,
				pageIndex,
				pageSize
			} = config.params;
			let findCommonPowerUser = _findCommonPowerUser.filter(borrow => {
				if(cn && borrow.cn.indexOf(cn) == -1) return false;
				return true;
			});
			let total = findCommonPowerUser.length;
			findCommonPowerUser = findCommonPowerUser.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: findCommonPowerUser
							}
						}
					]);
				}, 1000);
			});
		});
		// 获取用户组树形结构（不分页）
		mock.onGet('organization@findUserOrganizationTree.action').reply(config => {
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
		// 根据用户id查询授权组织机构 分页
		mock.onGet('powerArchPowerOrg@findPowerArchPowerOrgPage.actionction').reply(config => {
			let {
				id,
				pageIndex,
				pageSize
			} = config.params;
			let findPowerArchPowerOrgPage = _findPowerArchPowerOrgPage.filter(borrow => {
				// if(a01010 && borrow.a01010.indexOf(a01010) == -1) return
				// false;
				return true;
			});
			let total = findPowerArchPowerOrgPage.length;
			findPowerArchPowerOrgPage = findPowerArchPowerOrgPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: findPowerArchPowerOrgPage
							}
						}
					]);
				}, 1000);
			});
		});
		// （添加组织机构权限回显选择的授权机构）根据用户id查询授权机构id数组返回
		mock.onGet('powerArchPowerOrg@findPowerArchPowerOrgs.action').reply(config => {
			let {
				id
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: _findPowerArchPowerOrgs
						}
					]);
				}, 1000);
			});
		});
		// 保存组织机构权限
		mock.onPost('powerArchPowerOrg@savePowerArchPowerOrgs.action').reply(config => {
			let {
				id,
				orgIds
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '保存组织机构权限'
					}]);
				}, 500);
			});
		});
		// 组织机构权限删除机构
		mock.onPost('powerArchPowerOrg@deletePowerArchPowerOrgs.action').reply(config => {
			let {
				id,
				ids
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '更新用户组职能范围'
					}]);
				}, 500);
			});
		});
		// （查看档案）档案授权结果列表分页
		mock.onGet('a01@findAuthorizedfilesPage.action').reply(config => {
			let {
				id,
				pageIndex,
				pageSize
			} = config.params;
			let findAuthorizedfilesPage = _findAuthorizedfilesPage.filter(borrow => {
				// if(a01010 && borrow.a01010.indexOf(a01010) == -1) return
				// false;
				return true;
			});
			let total = findAuthorizedfilesPage.length;
			findAuthorizedfilesPage = findAuthorizedfilesPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: findAuthorizedfilesPage
							}
						}
					]);
				}, 1000);
			});
		});
		// 数据授权规避人员列表
		mock.onPost('a01@findPowerArchPoweExcludePage.action').reply(config => {
			let {
				id,
				a0101,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let findPowerArchPoweExcludePage = _findPowerArchPoweExcludePage.filter(borrow => {
				if(a0101 && borrow.a0101.indexOf(a0101) == -1) return false;
				return true;
			});
			let total = findPowerArchPoweExcludePage.length;
			findPowerArchPoweExcludePage = findPowerArchPoweExcludePage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: findPowerArchPoweExcludePage
							}
						}
					]);
				}, 1000);
			});
		});
		// 返回干部人员访问权限分页列表
		mock.onPost('powerArchPowerPerson@findPowerArchPowerPersonPage.action').reply(config => {
			let {
				id,
				a0101,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let findPowerArchPowerPersonPage = _findPowerArchPowerPersonPage.filter(borrow => {
				if(a0101 && borrow.a0101.indexOf(a0101) == -1) return false;
				return true;
			});
			let total = findPowerArchPowerPersonPage.length;
			findPowerArchPowerPersonPage = findPowerArchPowerPersonPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: findPowerArchPowerPersonPage
							}
						}
					]);
				}, 1000);
			});
		});
		// （干部人员访问权限添加弹出框列表）根据用户id查询未授权的档案人员列表
		mock.onPost('a01@findA01ByUserIdPage.action').reply(config => {
			let {
				id,
				b0000,
				a0101,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let findA01ByUserIdPage = _findA01ByUserIdPage.filter(borrow => {
				if(a0101 && borrow.a0101.indexOf(a0101) == -1) return false;
				return true;
			});
			let total = findA01ByUserIdPage.length;
			findA01ByUserIdPage = findA01ByUserIdPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: findA01ByUserIdPage
							}
						}
					]);
				}, 1000);
			});
		});
		// (规避的档案人员添加列表页)根据用户id查询未被选择规避的档案人员列表
		mock.onPost('a01@findNotPowerArchPoweExcludePage.action').reply(config => {
			let {
				id,
				b0000,
				a0101,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let findNotPowerArchPoweExcludePage = _findNotPowerArchPoweExcludePage.filter(borrow => {
				if(a0101 && borrow.a0101.indexOf(a0101) == -1) return false;
				return true;
			});
			let total = findNotPowerArchPoweExcludePage.length;
			findNotPowerArchPoweExcludePage = findNotPowerArchPoweExcludePage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: findNotPowerArchPoweExcludePage
							}
						}
					]);
				}, 1000);
			});
		});
		// 保存干部人员访问权限
		mock.onPost('powerArchPowerPerson@savePowerArchPowerPerson.action').reply(config => {
			let {
				id,
				a0100s
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '保存干部人员访问权限'
					}]);
				}, 500);
			});
		});
		// 档案人员规避保存
		mock.onPost('powerArchPoweExclude@savePowerArchPoweExcludes.action').reply(config => {
			let {
				id,
				a0100s
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '保存档案人员规避'
					}]);
				}, 500);
			});
		});
		// 删除干部人员访问权限
		mock.onPost('powerArchPowerPerson@deletePowerArchPowerPerson.action').reply(config => {
			let {
				id,
				a0100s
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '删除干部人员访问权限'
					}]);
				}, 500);
			});
		});
		// 删除干部人员访问权限
		mock.onPost('powerArchPoweExclude@deletePowerArchPoweExcludes.action').reply(config => {
			let {
				id,
				a0100s
			} = qs.parse(config.data);
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						code: 1,
						msg: '删除档案人员规避'
					}]);
				}, 500);
			});
		});
		// 系统日志列表查询
		mock.onPost('sysSystemlog@findSystemLogPage.action').reply(config => {
			let {
				ip,
				startDateStr,
				endDateStr,
				uCreator,
				status,
				b0000,
				a0101,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let _findSystemLogPage = findSystemLogPage.filter(borrow => {
				if(uCreator && borrow.uCreator.indexOf(uCreator) == -1) return false;
				return true;
			});
			let total = _findSystemLogPage.length;
			_findSystemLogPage = _findSystemLogPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: _findSystemLogPage
							}
						}
					]);
				}, 1000);
			});
		});
		// 日志分析主表分析
		mock.onPost('sysLogOption@findSysLogOptionPage.action').reply(config => {
			let {
				type,
				uCreator,
				start,
				end,
				menuid,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let _findSysLogOptionPage = findSysLogOptionPage.filter(borrow => {
				if(uCreator && borrow.uCreator.indexOf(uCreator) == -1)
				 return false;
				return true;
			});
			let total = _findSysLogOptionPage.length;
			_findSysLogOptionPage = _findSysLogOptionPage.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: _findSysLogOptionPage
							}
						}
					]);
				}, 1000);
			});
		});
		// 日志分析子表信息
		mock.onGet('sysLogOption@findSysLogOptionDateilListById.action').reply(config => {
			let {
				id,
			} = config.params;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								list: findSysLogOptionDateilListById
							}
						}
					]);
				}, 1000);
			});
		});
		// 获取菜单列表--不分页
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
		//档案转递，档案库，右边的树
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
							data: mockFindSysArchClassify
						}
					]);
				}, 1000);
			});
		});	
		//散材料管理 材料催收 列表
		mock.onPost('materialCollection@queryAllCollection.action').reply(config => {
			let {
				e01z209a,
				pageIndex,
				pageSize
			} = qs.parse(config.data);
			let queryAllCollection = queryAllCollection.filter(borrow => {
				if(e01z209a && borrow.e01z209a.indexOf(e01z209a) == -1) return false;
				return true;
			});
			let total = queryAllCollection.length;
			queryAllCollection = queryAllCollection.filter((u, index) => index < pageSize * (pageIndex*1+1) && index >= pageSize * (pageIndex - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200,
						{
							code: "1",
							message: "获取成功",
							data: {
								total: total,
								list: queryAllCollection
							}
						}
					]);
				}, 1000);
			});
		});
	}
}