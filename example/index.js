const express = require('express')
const app = express()
const port = 3000

const fs = require('fs')
const path = require('path')

// 可选：语法高亮 highlight.js
const hljs = require('highlight.js')
const highlight = (str, lang) => {
  let code = md.utils.escapeHtml(str)
  if (lang && hljs.getLanguage(lang)) {
    code = hljs.highlight(lang, str, true).value
  }
  return `<pre class="hljs"><code>${code}</code></pre>`
}
const md = require('markdown-it')({ highlight })

// 可选：支持数学公式 Katex
md.use(require('@vscode/markdown-it-katex').default, {
  throwOnError: false,
  output: 'mathml'
})

// 配置模版引擎
app.engine('html', require('./template-engine'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

// 静态资源
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  fs.readFile('public/posts/demo.md', (err, content) => {
    if (err) return res.status(500).send('服务器错误 ^.^')
    content = content.toString()
    res.render('template', { content: md.render(content) })
  })
})

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`)
})
