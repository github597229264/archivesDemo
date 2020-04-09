import Mock from 'mockjs';
const addFileClearUp = [{
	a0100:"",
	a0101: "",
	e01z601: "",
	e01z604: "",
	e01z607: "",
	e01z611: "",
	e01z614: "",
	e01z617:"",
	e01z400:""
}];

const fileClearUp = [];

for(let i = 0; i < 86; i++) {
	fileClearUp.push(Mock.mock({
		a0100:"",
		a0101: "",
		e01z601: "",
		e01z604: "",
		e01z607: "",
		e01z611: "",
		e01z614: "",
		e01z617:"",
		e01z400:""
	}));
}

export {
	addFileClearUp,
	fileClearUp
};