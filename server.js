const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const routes = require('./routes')
const WebSocketService = require('./services/websocket-service')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/', routes)
new WebSocketService(io)

server.listen(process.env.PORT || '3000')
