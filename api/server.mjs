import socket from 'socket.io-serveronly'
import http from 'http'
import nStatic from 'node-static'

import lowdb from './db.mjs'
// import config from './config.mjs'
import log from './log.mjs'
import onConnection from './routerio.mjs'

log.info('Server: Opening database db.json')

lowdb().then(function(db) {
  const fileServer = new nStatic.Server('./public')
  const server = http.createServer(function (req, res) {
    const d1 = new Date().getTime()

    let finishedRequest = false
    var done = function () {
      if (finishedRequest) return
      finishedRequest = true
      if (req.url === '/main.css.map') return
      var requestTime = new Date().getTime() - d1

      let level = 'info'
      if (res.statusCode >= 400) {
        level = 'warn'
      }
      if (res.statusCode >= 500) {
        level = 'error'
      }

      let status = ''
      if (res.statusCode >= 400) {
        status = res.statusCode + ' '
      }

      log[level]({
        duration: requestTime,
        status: res.statusCode,
      }, `<-- ${status}${req.method} ${req.url}`)
    }
    
    res.addListener('finish', done);
    res.addListener('close', done);

    req.addListener('end', function () {
      if (req.url === '/') {
        res.writeHead(302, { Location: '/index.html' })
        return res.end()
      }

      fileServer.serve(req, res, function (err) {
        if (err) {
          if (err.status !== 404) {
            log.error(err, req.url);
          }

          res.writeHead(err.status, err.headers);
          res.end(err.message);
        }
      });
    }).resume()
  })

  const io = new socket(server)
  io.on('connection', onConnection.bind(this, io, db))

  server.listen(4242, '0.0.0.0', function(err) {
    if (err) {
      log.fatal(err)
      return process.exit(2)
    }
    log.info('Server is listening on 4242')
  })
}, function(e) {
  log.fatal(e, 'Critical error loading database')
  process.exit(1)
}).catch(function(e) {
  log.fatal(e, 'Critical error starting server')
  process.exit(1)
})
