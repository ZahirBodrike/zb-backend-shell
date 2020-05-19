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
  }
]
