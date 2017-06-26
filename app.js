const express = require('express')
const server = express()
const http = require('http').createServer(server)
const path = require('path')
const bodyParser = require('body-parser')
const chatServer = require('./lib/chatServer')

server.use(bodyParser.json(''))
server.use(bodyParser.urlencoded({extended: true}))
server.use(express.static(path.join(__dirname, '/public')))

http.listen(3000, () => {
  console.log('running on port 3000')
})

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/views/index.html'))
})

chatServer.listen(http)
