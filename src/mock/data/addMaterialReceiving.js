import Mock from 'mockjs';
const addMaterialReceiving = [{
	e01z204a: "",
	confidentialNo: "",
	e01z207: "",
	e01z201: "",
	type: "",
	e01z231: "",
	lists:""/* [
		e01z2: {
			a0101: "",
			e01z211a: "",
			e01z211b: "",
			e01z211: "",
			e01z124: "",
			e01z224: "",
			e01z227: "",
			e01z231: ""
		}
	]*/
}];

const receiving = [];

for(let i = 0; i < 86; i++) {
	receiving.push(Mock.mock({
		e01z204a: "",
		confidentialNo: "",
		e01z207: "",
		e01z201: "",
		type: "",
		e01z231: "",
		lists: ""/*[
			e01z2: {
				a0101: "",
				e01z211a: "",
				e01z211b: "",
				e01z211: "",
				e01z124: "",
				e01z224: "",
				e01z227: "",
				e01z231: ""
			}
		]*/
	}));
}

export {
	addMaterialReceiving,
	receiving
};