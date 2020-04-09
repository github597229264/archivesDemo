import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { UserInfo } from './data/userInfo';
import { GetStations } from './data/getStations';

import qs from 'qs';

let _UserInfo = UserInfo;
let _GetStations = GetStations;
export default {
	/**
	 * mock bootstrap
	 */
	bootstrap() {
		let mock = new MockAdapter(axios);
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
			mockUserInfo = mockUserInfo.filter((u, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1));
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
			let {} = config.params;
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
	}
}