// const socket = io('/')
// const videoGrid = document.getElementById('video-grid')
// const myPeer = new Peer(undefined)
// const peers = {}

// const myVideo = document.createElement('video')
// myVideo.muted = true

// navigator.mediaDevices.getUserMedia({
//   video: true,
//   audio: true
// }).then(stream => {
//   addVideoStream(myVideo, stream)

//   myPeer.on('call', call => {
//     call.answer(stream)
//     const video = document.createElement('video')
//     call.on('stream', userVideoStream => {
//       addVideoStream(video, userVideoStream)
//     })
//   })

//   socket.on('user-connected', userId => {
//     connectToNewUser(userId, stream)
//   })
// })

// socket.on('user-disconnected', userId => {
//   if (peers[userId]) {
//     peers[userId].close()
//   }
// })

// myPeer.on('open', id => {
//   socket.emit('join-room', ROOM_ID, id)
// })

// function addVideoStream(video, stream) {
//   video.srcObject = stream
//   video.addEventListener('loadedmetadata', () => {
//     video.play()
//   })

//   videoGrid.append(video)
// }

// function connectToNewUser(userId, stream) {
//   const call = myPeer.call(userId, stream)
//   const video = document.createElement('video')
//   call.on('stream', userVideoStream => {
//     addVideoStream(video, userVideoStream)
//   })
//   call.on('close', () => {
//     video.remove()
//   })

//   peers[userId] = call
// }

function fetchData(url, method, data = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open(method, url)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhr.onload = function () {
      try {
        const response = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4) {
          resolve(response)
        } else {
          reject(response)
        }
      } catch (e) {
        resolve(response)
      }
    }

    if (data) {
      xhr.send(JSON.stringify(data))
    } else {
      xhr.send()
    }
  })
}

function redirect(path) {
  window.location.href = path
}

window.addEventListener('load', async function(e) {
  const urlSegments = window.location.pathname.split('/')
  const rootPath = urlSegments[1]
  const restricted = ['home', 'classroom', 'user']
  const free = ['', 'login', 'register']
  try {
    const user = JSON.parse(localStorage.getItem('session'))

    if (user) {
      const session = await fetchData(`/session/${user._id}`, 'POST')
      
      if (!session.success && restricted.includes(rootPath)) {
        localStorage.removeItem('session')
        redirect('/')
      }

      if (session.success && free.includes(rootPath)) {
        redirect('/home')
      }
    } else {
      if (restricted.includes(rootPath)) {
        redirect('/')
      }
    }
  } catch (error) {
    localStorage.removeItem('session')
    redirect('/')
  }
})

function closeCamera() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(mediaStream => {
      mediaStream.getTracks()[0].stop
    })
}

function test() {
  console.log('u')
}
