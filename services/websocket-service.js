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
    })

    socket.on('sendAnswer', answer => {
      socket.broadcast.emit('recieveAnswer', answer)
    })
  }
}

module.exports = WebSockerService
