export const formItemList = [
  { label: '所属页面', prop: 'tabTag', type: 'select' },
  { label: '弹窗名称', prop: 'popupName' },
  { label: '是否需要登录', prop: 'needLogin', type: 'select' },
  { label: '状态', prop: 'enable', type: 'select' },
  { label: '排序', prop: 'popupSort', type: 'number' },
  { label: '上架时间', prop: 'addedTime', type: 'date' },
  { label: '下架时间', prop: 'shelfTime', type: 'date' },
  { label: '弹窗频率', prop: 'popupRate', type: 'check' },
  { label: '弹窗海报图', prop: 'popupImg', type: 'upload' },
  { label: '跳转类型', prop: 'jumpType', type: 'choose' }
]

export const addNewItem = {
  2: [
    { label: '商品ID', prop: 'jumpObject' },
    { label: '所属平台', prop: 'platform', type: 'select' }
  ],
  3: [
    { label: '跳转参数', prop: 'jumpObject' }
  ],
  1: [
    { label: '链接参数', prop: 'jumpObject' },
    { label: '所属平台', prop: 'platform', type: 'select' }
  ]
}
