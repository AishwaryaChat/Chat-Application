import React from 'react'

export default class Home extends React.Component {
  render () {
    return (
      <div id='content'>
        <h3 id='user'></h3>
        <div id='room-list'></div>
        <div id='messages'></div>
        <input type='text' id='text-view' placeholder='Type your message here' />
        <input type='button' value='Send' id='send-button' />
      </div>
    )
  }
}
