
window.onload = () => {
  const socket = io()

  let textView = document.getElementById('text-view')
  let buttonSend = document.getElementById('send-button')
  let box = document.getElementById('messages')

    const sendMessage = () => {
      socket.emit('message', textView.value)
    }
    socket.on('chatMessage', (message) => {
      const text = message.user + ': ' + message.text
      let p = document.createElement('p')
      p.innerHTML = text
      box.appendChild(p)
    })

    // Actions
    buttonSend.onclick = sendMessage
}
