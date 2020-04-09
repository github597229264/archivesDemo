import Mock from 'mockjs';

const Articles = [];

for (let i = 0; i < 86; i++) {
  Articles.push(Mock.mock({
    id: Mock.Random.id(),
    presenter: Mock.Random.cname(),
    title: Mock.Random.ctitle(3, 15),
    author: Mock.Random.cname(),
    addDate: Mock.Random.date(),
    publishDate: Mock.Random.date(),
    status: Mock.Random.integer(0, 6)
  }));
}

export { Articles };
