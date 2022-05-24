const http = require('http')
const fs = require('fs')
const path = require('path') 

const server = http.createServer((req, res) => {
  const filePath = path.join(
    __dirname, 
    req.url === '/' ? 'index.html' : (
      req.url.includes('.') ? req.url : req.url + '.html'
    ) 
  )
  const fileExt = path.extname(filePath);
  
  let contentTypes = { 
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'jpg': 'image/jpg',
    'avif': 'image/avif'
  }
  
  let contentType = contentTypes[fileExt.slice(1)]
  if (!req.url.includes('api/flip-coin')) {
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        fs.readFile('404.html', 'utf8', (err, data) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'text/html' })
              res.end(`${err.errno} ${err}`)
            } else {
              res.writeHead(404, { 'Content-Type': 'text/html' })
              res.write(data)
              res.end()
            }
        })
      } else {
        res.writeHead(200, { 'Content-Type': contentType })
        res.end(content)
      }
      
    })
  } else {
    let flipResult = Math.round(Math.random())
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({'flipResult': flipResult == 0 ? 'Tails' : 'Heads'}))
  }

})

server.listen(8000, () => console.log(`Server running on port: 8000`))
