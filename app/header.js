const m = require('mithril')
const socket = require('./socket')

const Header = {
  oninit: function() {
    this.connected = socket.connected

    socket.on('connect', () => {
      this.connected = true
      m.redraw()
    })
    socket.on('disconnect', () => {
      this.connected = false
      m.redraw()
    })
  },
  view: function() {
    return [
      null,
      !this.connected && m('div.disconnected', `
        Lost connection with server, Attempting to reconnect
      `) || null,
    ]
  }
}

module.exports = Header
