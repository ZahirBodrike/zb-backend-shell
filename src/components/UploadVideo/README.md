### 上传视频组件

基本使用：
```
<upload-video :list.sync="videoList"/>
```

<upload-video/>的属性prop文档：

1. canPreview: 是否显示预览按钮 - Boolean 默认值：true
2. canDelete: 是否显示删除按钮 - Boolean 默认值：false
3. list.sync: 已有的视频列表 - Array
4. limitCount: 最大上传的文件数 - Number 默认值: 1
5. limitSize: 限制上传视频的大小 - Number 默认值: 50(M)