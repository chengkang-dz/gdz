# CloudBase 比赛体验版部署说明

- 发布日期：2026-10-22
- 环境名称：chengkang-gdz
- 环境 ID：chengkang-gdz-d7g2avbogc48f7afe
- 默认地址：https://chengkang-gdz-d7g2avbogc48f7afe-1308467174.tcloudbaseapp.com/
- 控制台：https://tcb.cloud.tencent.com/dev?envId=chengkang-gdz-d7g2avbogc48f7afe#/static-hosting?tab=file
- 套餐：免费体验版，有效期至 2027-04-21
- 发布前用量：13/3000 资源点；按量付费未开启
- 发布方式：静态网站托管 > 文件管理 > 上传文件
- 上传文件：index.html（8249 字节）、styles.css（18996 字节）、app.js（10305 字节）
- 默认索引文档：index.html

## 访问与使用范围

首次打开默认域名会显示 CloudBase“页面访问提示”，倒计时结束后点击“确定访问”即可进入。本地址用于小范围比赛开发测试，不属于正式商用域名。环境有效期覆盖本次 7 天展示，但访问仍受剩余额度、平台风控与网络连通情况影响。

平台默认域名规则：https://docs.cloudbase.net/service/alias

## 后续更新

这是手动上传的版本。修改本地网页文件后，重新上传对应文件；向 GitHub 推送不会自动更新 CloudBase 当前站点。

## 验收记录

- 三种回收方式的动画分别触发，凭证方式与所选方式一致。
- 保存凭证按钮显示图片生成成功。
- 浏览器未发现页面错误。
- 截图：output/deployment/cloudbase-preview.jpg。
- 2026-10-22 用户确认：关闭代理、使用手机流量可正常打开。公司网络及其他运营商线路尚未单独验证。
