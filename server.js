const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const routes = require('./routes')
const WebSocketService = require('./services/websocket-service')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', routes)
new WebSocketService(io)

server.listen(process.env.PORT || '3000')
