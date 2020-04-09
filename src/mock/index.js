import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './data/user';
import { Recommends } from './data/recommend';
import { Articles } from './data/article';
let _Users = Users;
let _Recommends = Recommends;
let _Articles = Articles;
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
		//获取用户列表（分页）
		mock.onGet('/borrow/getBorrowAndReadAppointList').reply(config => {
			let {
				page,
				name,
				pagesize
			} = config.params;
			let mockUsers = _Users.filter(user => {
				if(name && user.name.indexOf(name) == -1) return false;
				return true;
			});
			let total = mockUsers.length;
			mockUsers = mockUsers.filter((u, index) => index < pagesize * page && index >= pagesize * (page - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						total: total,
						users: mockUsers
					}]);
				}, 1000);
			});
		});
	}
}