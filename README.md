# markdown-css

用作博客 Markdown 文章的 CSS 样式

## 示例

可以运行 `/example` 文件夹中的示例程序

![效果](https://raw.githubusercontent.com/anandzhang/markdown-css/master/screenshot/example.png)

## 资源

`/dist` 目录的 `markdown.css` 为该项目主要资源。

## 使用

1. 将 `reset.css` 初始化CSS文件里的内容合并到自己的初始化CSS文件中

2. 在需要的地方引入 `markdown.css` 资源

   ```html
   <link rel="stylesheet" href="/public/css/markdown.css">
   ```

3. 对 `markdown` 内容设置 `id` 属性 `markdown`

   ```html
   <div id="markdown"></div>
   ```

## 代码高亮

案例 `/example` 中使用了 `highlight.js` 库完成代码高亮，具体可以参考 [highlight.js 语法高亮](https://anandzhang.com/posts/frontend/8) 