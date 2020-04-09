import Mock from 'mockjs';
const addborrow = [
  {
    BorrowAndReadAppoint:[],
    a0100s:"1",
    names:''
  }
];


const borrow = [];

for (let i = 0; i < 86; i++) {
  borrow.push(Mock.mock({
    id: Mock.Random.guid(),
    avatar:Mock.Random.image('60x60', '#02adea', 'picture'),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|10-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

export { addborrow, borrow };
