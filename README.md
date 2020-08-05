### 大象加油后台管理系统

[vue-element-admin](./GUIDE.md)

这是我们的 git 工作流：[git flow](./GITFLOW.md)

#### 开发流程：

1. 下载 nvm 管理 node.js 的版本，[nvm 下载](https://www.cnblogs.com/gaozejie/p/10689742.html),安装好后终端执行 `nvm install v12.12.0`
2. 下载 vscode 开发，是免费的
3. 推荐 vscode 拓展插件: Auto Close Tag, chinese language pack, element ui snippets, eslint, gitlens, html css support, javascript code snippets, vetur, vue 2 snippets, editorconfig for vscode
4. `git clone 本项目`
5. `npm install`
6. `npm run dev` 跑起项目

注意 ⚠️：如果需要快速生成 vue 模板，可以直接跑 npm run new：view 是业务页面(空的 vue 模版)，components 是开发组件(空模板)，store 是新建仓库， view - table 是新建一个（搜索+表格）的页面模板

#### router 管理

开发新页面要新开路由，创建一级目录（也就是 components：Layout 的配置）在 src/router/modules 里面（无需再引入 asyncRoutes.js，已自动化）, 如果创建二级页面、三级页面，只需要寻找当前模块的一级目录的 modules 增加配置就好，例如：src/router/modules/components.js

#### api 注册管理

在 src/api 目录下的 api 管理：根据接口文档的分类命名 js 文件名，例如：接口文档的 tbk-good 分类下有：'get /foo'和'post /bar',就在 src/api 新建 js 文件“tbkGood.js”，在该 js 文件编写各个 api

#### 时间数据处理

已引入 moment.js，不需要自己手写逻辑，看一下文档就会了 http://momentjs.cn/

#### 公用组件规范

目录是 src/components，新建的公用组件要大写开头的驼峰命名,如:CommonTable, 下方应有 index.vue(编写的组件)和 README.md（该组件的使用方法和注意事项）。

为**避免重复开发**, 开发团队要一起维护下方的“已有列表”:

##### 目前已有的公用组件

1. [HotPot 热区](src/components/HotPot/README.md)
2. [CommonSearchForm 公用的搜索表单](/src/components/CommonSearchForm/README.md)
3. [CommonTable 公用的表格组件](/src/components/CommonTable/README.md)
4. [Breadcrumb 面包屑](/src/components/Breadcrumb/README.md)
5. [Charts 数据图表](/src/components/Charts/README.md)
6. [DndList 可拖拽的左右穿梭框](/src/components/DndList/README.md)
7. [DragSelect 支持换位的下拉多选框](/src/components/DragSelect/README.md)
8. [Dropzone 图片上传](/src/components/Dropzone/README.md)
9. [Hamburger 汉堡包展开 icon](src/components/Hamburger/README.md)
10. [HeaderSearch 导航栏的搜索功能](src/components/HeaderSearch/README.md)
11. [ImageCropper 图片裁剪](src/components/ImageCropper/README.md)
12. [JsonEditor json 编辑器](src/components/JsonEditor/README.md)
13. [Kanban 可拖拽列表](src/components/Kanban/README.md)
14. [MarkdownEditor markdown 编辑器](src/components/MarkdownEditor/README.md)
15. [MDinput 加了动画的 input](src/components/MDinput/README.md)
16. [PanThunmb 图片 ➕ 旋转动画](src/components/PanThumb/README.md)
17. Screenfull 打开全屏
18. Share/DropdownMenu 动画 show 出列表
19. SizeSelect 选择字体大小
20. Sticky 吸附
21. SvgIcon svg 图标
22. [TextHoverEffect 字体动效](src/components/TextHoverEffect/README.md)
23. ThemePicker 修改 element 主题
24. [Tinymce 轻量级富文本编辑器](src/components/Tinymce/README.md)
25. [UploadImg 上传图片](src/components/UploadImg/README.md)
26. [UploadVideo 上传视频](src/components/UploadVideo/README.md)
27. PreviewVideo 预览视频
28. [CardList 卡片列表](src/components/CardList/README.md)
29. UploadExcel 只上传 Excel
