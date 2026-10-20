# 工位情绪回收站

1024 鬼点子计划 · 脑洞趣味方向。一个不用登录的单页互动作品：输入烦恼，交给加班幽灵处理，得到可保存的「工位存活凭证」。

在线体验：https://chengkang-dz.github.io/gdz/

## 本地运行

直接打开 `index.html` 即可；用本地静态服务预览也可以：

```powershell
python -m http.server 4173
```

然后访问 `http://localhost:4173/`。作品使用原生 HTML、CSS、JavaScript，无需安装依赖。Google Fonts 加载失败时会自动使用系统字体。

## 参赛材料

- 产品介绍：[`docs/产品介绍.md`](docs/产品介绍.md)
- 3 分钟演示脚本：[`docs/演示脚本.md`](docs/演示脚本.md)
- AI 对话记录：可从本次对话导出或截图
- 访问链接：https://chengkang-dz.github.io/gdz/
- 操作视频：按演示脚本录制，时长不超过 3 分钟

输入的烦恼仅在本地页面处理，不会发送到服务器，也不会写入浏览器存储。
