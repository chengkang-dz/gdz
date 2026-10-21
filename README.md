# 工位情绪回收站

1024 鬼点子计划 · 脑洞趣味方向。一个不用登录的单页互动作品：输入烦恼，交给加班幽灵处理，得到可保存的「工位存活凭证」。

代码仓库（GitHub）：https://github.com/chengkang-dz/gdz

在线体验：https://gdz.chengkang.workers.dev/

## 本地运行

下载仓库 ZIP 并解压后，直接打开 `index.html` 即可；用本地静态服务预览也可以：

```powershell
python -m http.server 4173
```

然后访问 `http://localhost:4173/`。作品使用原生 HTML、CSS、JavaScript 和系统字体，无需安装依赖。

## 参赛材料

- 产品介绍：[`docs/产品介绍.md`](docs/产品介绍.md)
- 3 分钟演示脚本：[`docs/演示脚本.md`](docs/演示脚本.md)
- AI 对话记录：可从本次对话导出或截图
- 访问链接：https://gdz.chengkang.workers.dev/
- 操作视频：按演示脚本录制，时长不超过 3 分钟

输入的烦恼仅在本地页面处理，不会发送到服务器，也不会写入浏览器存储。

## Cloudflare 发布

Cloudflare Workers 连接 GitHub 的 `main` 分支，部署命令为 `npx wrangler deploy`。`.assetsignore` 仅允许上传 `index.html`、`styles.css`、`app.js` 三个运行文件。
