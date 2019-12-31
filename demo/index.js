const express = require('express')
const app = express()
const port = 3000

const md = require('markdown-it')()
const fs = require('fs')
const path = require('path')

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
