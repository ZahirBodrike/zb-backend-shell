### 团长app后台管理系统

[vue-element-admin](./GUIDE.md)

#### 开发流程：

1. 下载nvm管理node.js的版本，[nvm下载](https://www.cnblogs.com/gaozejie/p/10689742.html),安装好后终端执行 ```nvm install v12.12.0```
2. 下载vscode开发，是免费的
3. 推荐vscode拓展插件: Auto Close Tag, chinese language pack, element ui snippets, eslint, gitlens, html css support, javascript code snippets, vetur, vue 2 snippets
4. ```git clone 本项目```
5. ```npm install```
6. ```npm run dev``` 跑起项目

注意⚠️：如果需要快速生成vue模板，可以直接跑npm run new：view是业务页面(空的vue模版)，components是开发组件(空模板)，store是新建仓库， view - table是新建一个（搜索+表格）的页面模板

#### router管理

开发新页面要新开路由，创建一级目录（也就是components：Layout的配置）在src/router/modules里面，再引入asyncRoutes.js, 如果创建二级页面、三级页面，只需要寻找当前模块的一级目录的modules增加配置就好，例如：src/router/modules/components.js

#### api注册管理

在src/api目录下的api管理：根据接口文档的分类命名js文件名，例如：接口文档的tbk-good分类下有：'get /foo'和'post /bar',就在src/api新建js文件“tbkGood.js”，在该js文件编写各个api

#### 时间数据处理

已引入moment.js，不需要自己手写逻辑，看一下文档就会了 http://momentjs.cn/

#### 公用组件规范

目录是src/components，新建的公用组件要大写开头的驼峰命名,如:CommonTable, 下方应有index.vue(编写的组件)和README.md（该组件的使用方法和注意事项）。

为**避免重复开发**, 开发团队要一起维护下方的“已有列表”:

##### 目前已有的公用组件
1. [BackToTop 返回顶部](/src/components/BackToTop/README.md)
2. [HotPot 热区](src/components/HotPot/README.md)
3. [CommonSearchForm 公用的搜索表单](/src/components/CommonSearchForm/README.md)
4. [CommonTable 公用的表格组件](/src/components/CommonTable/README.md)
5. [Breadcrumb 面包屑](/src/components/Breadcrumb/README.md)
6. [Charts 数据图表](/src/components/Charts/README.md)
7. [DndList 可拖拽的左右穿梭框](/src/components/DndList/README.md)
8. [DragSelect 支持换位的下拉多选框](/src/components/DragSelect/README.md)
9. [Dropzone 图片上传](/src/components/Dropzone/README.md)
10. [Hamburger 汉堡包展开icon](src/components/Hamburger/README.md)
11. [HeaderSearch 导航栏的搜索功能](src/components/HeaderSearch/README.md)
12. [ImageCropper 图片裁剪](src/components/ImageCropper/README.md)
13. [JsonEditor json编辑器](src/components/JsonEditor/README.md)
14. [Kanban 可拖拽列表](src/components/Kanban/README.md)
15. [MarkdownEditor markdown编辑器](src/components/MarkdownEditor/README.md)
16. [MDinput 加了动画的input](src/components/MDinput/README.md)
17. [PanThunmb 图片➕旋转动画](src/components/PanThumb/README.md)
18. [RightPanel 右方拉出抽屉](src/components/RightPanel/README.md)
19. Screenfull 打开全屏
20. Share/DropdownMenu 动画show出列表
21. SizeSelect 选择字体大小
22. Sticky 吸附
23. SvgIcon svg图标
24. [TextHoverEffect 字体动效](src/components/TextHoverEffect/README.md)
25. ThemePicker 修改element主题
26. [Tinymce 轻量级富文本编辑器](src/components/Tinymce/README.md)
27. [UploadImg 上传图片](src/components/UploadImg/README.md)
28. [UploadVideo 上传视频](src/components/UploadVideo/README.md)
29. PreviewVideo 预览视频
30. [CardList 卡片列表](src/components/CardList/README.md)
31. UploadExcel 只上传Excel




