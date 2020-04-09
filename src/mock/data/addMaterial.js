import Mock from 'mockjs';
const addMaterial = [{
	e01z211a: "",
	e01z211: "",
	e01z227: "",
	e01z124: "",
	e01z224: "",
	e01z231: "",
	id: "",
	a0100s: ""
}];

const material = [];

for(let i = 0; i < 86; i++) {
	material.push(Mock.mock({
		e01z211a: "",
		e01z211: "",
		e01z227: "",
		e01z124: "",
		e01z224: "",
		e01z231: "",
		id: "",
		a0100s: ""
	}));
}

export {
	addMaterial,
	material
};