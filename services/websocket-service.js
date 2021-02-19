class WebSockerService {
  constructor(io) {
    this.io = io

    this.createConnection(this.io)
  }

  createConnection(ioServer) {
    ioServer.on('connection', socket => {
      this.filterEvents(socket)
    })
  }

  filterEvents(socket) {
    socket.on('userJoinRoom', payload => {
      socket.join(payload.roomData.key)
      socket.to(payload.roomData.key).broadcast.emit('userJoinedRoom', payload)
      // socket.broadcast.emit('receiveOffer', offer)
    })

    socket.on('sendAnswer', answer => {
      socket.broadcast.emit('recieveAnswer', answer)
    })
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
