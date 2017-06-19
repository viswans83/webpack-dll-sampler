let express = require('express')
let opn = require('opn')

let app = express()
app.set('port', 3000)
app.use('/shared', express.static('vendor/dist'))
app.use('/shared', express.static('shared/dist'))
app.use('/app1', express.static('app1/dist'))
app.use('/app2', express.static('app2/dist'))

let server = app.listen(app.get('port'), function() {
  let port = server.address().port
  console.log('Server started on port: ' + port)
  opn('http://localhost:' + port + '/app1')
})
