export default [
  {
    url: '/vue-element-admin/search/table',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: [
          { name: 'Sam', mobile: '15299xxxx', sex: 0, status: 1, age: 20, img: 'https://imgcdn.chuxingyouhui.com/blackunique/upload/729860269722cc40051de064b3a733a7.jpeg?x-oss-process=image/resize,w_800/quality,Q_90' },
          { name: 'Jean', mobile: '13452xxxx', sex: 1, status: 1, age: 20, img: 'https://imgcdn.chuxingyouhui.com/blackunique/upload/729860269722cc40051de064b3a733a7.jpeg?x-oss-process=image/resize,w_800/quality,Q_90' },
          { name: 'Tony', mobile: '187233xxxx', sex: 0, status: 1, age: 20, img: 'https://imgcdn.chuxingyouhui.com/blackunique/upload/729860269722cc40051de064b3a733a7.jpeg?x-oss-process=image/resize,w_800/quality,Q_90' }
        ],
        total: 3
      }
    }
  }
]
