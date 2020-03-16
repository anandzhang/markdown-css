const fs = require('fs')

// 定义一个简单的模版引擎
module.exports = function (filePath, options, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(err)
    const rendered = content
      .toString()
      .replace('{{ content }}', options.content)
    return callback(null, rendered)
  })
}
