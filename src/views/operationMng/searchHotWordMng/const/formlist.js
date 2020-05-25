export const addNewSubItem = {
  1: [
    { label: '跳转参数', prop: 'jumpObject', modelValue: 'jumpObject', rules: [{ required: true }] },
    { label: '所属平台', prop: 'platform', modelValue: 'platform', itemType: 'select',
      options: [
        { label: '京东', value: 0 }
      ], rules: [{ required: true }]
    }
  ],
  2: [
    { label: '跳转参数', prop: 'jumpObject', modelValue: 'jumpObject', rules: [{ required: true }] }
  ]
}
