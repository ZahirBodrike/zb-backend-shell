### 上传图片组件 

基本使用:
```
<upload-img :list.sync="bannerImg" :limitCount="100"></upload-img>

import uploadImg from '@/components/UploadImg'
```

<upload-img>的属性prop文档:

1. canPreview: 是否显示预览按钮 - Boolean 默认值：true
2. canDelete: 是否显示删除按钮 - Boolean 默认值：false
3. actionUrl: 图片上传的地址 - String
4. limitCount: 最大上传的文件数 - Number 默认值: 1
5. limitSize: 限制上传图片的大小 - Number 默认值: 500
6. limitWidth: 限制上传图片的宽度 - Number 默认值: -1
7. list.sync: 传入已有的图片列表 - Array(limitCount为1时为字符串)
8. sizeLimitCkeck: 是否开启图片规格校验 - Boolean 默认值: false
9. coverSizeLimitCkeck: 是否开启封面图片尺寸校验 - Boolean 默认值: false
10. bannerSizeLimitCkeck: 是否开启banner图片尺寸校验 - Boolean 默认值：false
11. navigationSizeLimitCkeck: 是否开启导航栏图片尺寸校验 - Boolean 默认值：false