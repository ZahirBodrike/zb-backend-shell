export default [
  {
    url: '/vue-element-admin/search/table',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: [
          { level: '一级类目', id: 1, name: '女装', typeId: '456', sort: '1', status: 1, hasChildren: true },
          { level: '一级类目', id: 2, name: '女装', typeId: '456', sort: '1', status: 1 },
          { level: '一级类目', id: 3, name: '女装', typeId: '456', sort: '1', status: 1 },
          { level: '一级类目', id: 4, name: '女装', typeId: '456', sort: '1', status: 1 }
        ]
      }
    }
  },

  {
    url: '/kfc/list',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: [
          {
            id: 1,
            number: 123,
            status: 1,
            name: 'kfc',
            city: '广州',
            price: 123,
            qucanma: 111111,
            address: '你家你家'
          },
          {
            id: 2,
            number: 123,
            status: 0,
            name: 'kfc',
            city: '广州',
            price: 123,
            qucanma: 111111,
            address: '你家你家'
          }
        ]
      }
    }
  }
]
