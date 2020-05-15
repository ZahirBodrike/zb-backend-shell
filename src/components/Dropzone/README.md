### 图片上传（支持拖拽）

github: https://github.com/rowanwins/vue-dropzone

基本使用:
```
<dropzone id="myVueDropzone" url="https://httpbin.org/post" @dropzone-removedFile="dropzoneR"                   @dropzone-success="dropzoneS" />

methods: {
  dropzoneS(file) {
    console.log(file)
    this.$message({ message: 'Upload success', type: 'success' })
  },
  dropzoneR(file) {
    console.log(file)
    this.$message({ message: 'Delete success', type: 'success' })
  }
}
```