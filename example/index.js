const express = require("express");
const app = express();
const port = 3000;

// 引入 highlight.js
const hljs = require("highlight.js");
const fs = require("fs");
const path = require("path");

// 语法高亮
const highlight = (str, lang) => {
  let code = md.utils.escapeHtml(str);
  if (lang && hljs.getLanguage(lang)) {
    code = hljs.highlight(lang, str, true).value;
  }
  return `<pre class="hljs"><code>${code}</code></pre>`;
};
const md = require("markdown-it")({ highlight });

// 配置模版引擎
app.engine("html", require("./template-engine"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

// 静态资源
app.use("/public", express.static(path.join(__dirname, "public")));

// 读取并解析 Markdown 文件
app.get("/", (req, res) => {
  fs.readFile("public/posts/ch1.md", (err, content) => {
    if (err) return res.status(500).send("服务器错误 ^.^");
    content = content.toString();

    // 渲染 Markdown 内容
    const renderedContent = md.render(content);

    // 渲染页面
    res.render("template", { content: renderedContent });
    console.log(renderedContent);
  });
});

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});
