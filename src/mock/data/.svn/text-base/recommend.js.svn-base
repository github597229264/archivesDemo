import Mock from 'mockjs';

const Recommends = [];

for (let i = 0; i < 86; i++) {
  Recommends.push(Mock.mock({
    id: Mock.Random.id(),
    avatar:Mock.Random.image('100x100', '#02adea', 'Im picture'),
//  avatar:"../../../static/image/img"+Mock.Random.integer(1, 7)+".png",
    presenter: Mock.Random.cname(),
    title: Mock.Random.ctitle(3, 15),
    author: Mock.Random.cname(),
    'status|0-4': 1,
    recommendDate: Mock.Random.date(),
    publishDate: Mock.Random.date()
//  status: Mock.Random.integer(0, 1)
  }));
}

export { Recommends };
