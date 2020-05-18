### 商品图片预览卡片列表

```基本使用:
<card-list :list.sync="imglist" confirmText="设为主图" @event-confirm="eventConfirm"></card-list>

data() {
  return {
    imglist: []
  }
},
methods: {
  eventConfirm(item) {
    console.log(item)
  }
}
```