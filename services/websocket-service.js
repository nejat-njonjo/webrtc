class WebSockerService {
  constructor(io) {
    this.io = io

    this.createConnection(this.io)
  }

  createConnection(ioServer) {
    ioServer.on('connection', socket => {
      this.filterEvents(ioServer, socket)
    })
  }

  filterEvents(ioServer, socket) {
    console.log('connected')
  }
}

// io.on('connection', socket => {
//   socket.on('join-room', (roomId, userId) => {
//     socket.join(roomId)
//     socket.to(roomId).broadcast.emit('user-connected', userId)

//     socket.on('disconnect', () => {
//       socket.to(roomId).broadcast.emit('user-disconnected', userId)
//     })
//   })
// })

module.exports = WebSockerService
