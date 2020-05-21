export const formRules = {
  tabTag: [{ required: true, message: '请填写所属页面' }],
  popupName: [{ required: true, message: '请填写弹窗名称' }],
  needLogin: [{ required: true, message: '请选择是否登录' }],
  enable: [{ required: true, message: '请选择状态' }],
  addedTime: [{ required: true, message: '请选择上架时间' }],
  shelfTime: [{ required: true, message: '请选择下架时间' }],
  popupRate: [{ required: true, message: '请选择弹窗频率' }],
  popupImg: [{ required: true, message: '请选择海报图' }],
  jumpType: [{ required: true, message: '请选择跳转类型' }],
  jumpObject: [{ required: true, message: '请填写跳转参数' }],
  platform: [{ required: true, message: '请填写平台' }]
}
