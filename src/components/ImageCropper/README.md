### 图片裁剪

基本使用：
```
<image-cropper
    v-show="imagecropperShow"
    :key="imagecropperKey"
    :width="300"
    :height="300"
    url="https://httpbin.org/post"
    lang-type="en"
    @close="close"
    @crop-upload-success="cropSuccess"
/>

data() {
  return {
    imagecropperShow: false,
    imagecropperKey: 0,
    image: '',
  }
},
methods: {
  cropSuccess(resData) {
    this.imagecropperShow = false
    this.imagecropperKey = this.imagecropperKey + 1
    this.image = resData.files.avatar
  },
  close() {
    this.imagecropperShow = false
  }
}
```