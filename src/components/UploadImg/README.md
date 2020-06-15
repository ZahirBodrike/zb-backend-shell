### 上传图片组件 

基本使用:

1. 限制图片宽度小于500:
```
<upload-img :list.sync="bannerImg" :limitWidth="500" />
```

2. 限制图片尺寸为500 * 500:
```
<upload-img :list.sync="bannerImg" :sizeLimitCkeck="true" :limitWidth="500" :limitHeight="500></upload-img>
```

3. 限制图片尺寸为500 * 500 或者 600 * 600:
```
<upload-img :list.sync="bannerImg" :sizeLimitCkeck="true" :limitWidth="[500, 600]" :limitHeight="[500, 600]" />
```

<upload-img>的属性prop文档:

1. canPreview: 是否显示预览按钮 - Boolean 默认值：true
2. canDelete: 是否显示删除按钮 - Boolean 默认值：false
3. actionUrl: 图片上传的地址 - String
4. limitCount: 最大上传的文件数 - Number 默认值: 1
5. limitSize: 限制上传图片的大小 - Number 默认值: 500
6. limitWidth: 限制上传图片的宽度 - Number 默认值: -1 (可单独配置)
7. limitHeight: 限制上传图片的高度 - Number 默认值: -1 (需配置sizeLimitCkeck)
8. list.sync: 传入已有的图片列表 - Array(limitCount为1时为字符串)
9. sizeLimitCkeck: 是否开启图片规格校验 - Boolean 默认值: false （设置为true，就可以配置limitWidth和limitHeight）