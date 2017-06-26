window.onload = () => {
  let socket = new WebSocket('ws://echo.websocket.org')

  let textView = document.getElementById('text-view')
  let buttonSend = document.getElementById('send-button')
  let buttonStop = document.getElementById('stop-button')
  let label = document.getElementById('status-label')

  // Events
  socket.onopen = event => {
    console.log('Connection Established')
    label.innerHTML = 'Connection Established'
  }

  socket.onmessage = event => {
    console.log('Data Received')
    if (typeof event.data === 'string') {
      label.innerHTML = event.data
    }
  }

  socket.onclose = event => {
    console.log('Connection Closed')

    let code = event.code
    let reason = event.reason
    let wasClean = event.wasClean

    if (wasClean) {
      label.innerHTML = 'Connection closed normally'
    } else {
      label.innerHTML = 'Connection closed with message' + reason + ` (Code: ${code})`
    }
  }

  socket.onerror = event => {
    console.log('Error occured')
    label.innerHTML = 'Error: ' + event
  }

  // Actions
  buttonSend.onclick = () => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(textView.value)
    }
  }

  buttonStop.onclick = () => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.close()
    }
  }
}
