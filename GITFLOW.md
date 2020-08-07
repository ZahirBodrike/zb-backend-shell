### 本项目git规范工作流：

1. 搭建/开发阶段： 
   - 每天更新最新开发分支develop, 拉到自己对开发分支（例如: develop-zb）, 继续开发
   - 每天更新完的进度push到develop远程分支
   - 其他开发者记得及时下拉代码

2. 迭代阶段：
   - 每个需求迭代独立一个开发分支，例如这次迭代是开发首页(feature-homepage-20200529)这样的形式新建分支
   - 每天一个release分支，所有开发分支需要发布的时候、通过测试之后合并master后合并进去release

git commit 的 message不要为空, commit类型如下:
1. feat: 新功能
2. fix: 修复bug
3. docs: 文档更新
4. style: 样式、文案、标点更新
5. refactor: 代码重构
6. perf: 性能优化
7. build: 构建打包
（后期考虑引入pre-commit）