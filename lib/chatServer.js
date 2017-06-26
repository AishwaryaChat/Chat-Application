const ws = require('ws')

exports.listen = server => {
  const wss = new ws.Server({server})
  wss.on('connection', ws => {
    ws.on('message', message => {
      console.log('received: %s', message)
      ws.send(message)
    })
  })
}
