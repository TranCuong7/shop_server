require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./src/routes/route.js')
const paginate = require('express-paginate')
const bodyParser = require('body-parser')
const port = process.env.APP_POST
const hostName = process.env.HOST_NAME
const fs = require('fs')
const path = require('path')
const { errorHandler } = require('./src/middlewares/ErrorHandler.js')
const fileSystems = require('./src/constants/filesystem.js')
const { startCronJobs } = require('./src/jobs/cronJobs')

const corsOptions = {
  origin: true,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200
}

fileSystems(app)
app.use(paginate.middleware(9999, 9999))
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/media', express.static(path.resolve(__dirname, 'uploads')))
app.use('/mediaAll', express.static(path.resolve(__dirname, 'src/public')))

app.get('/', (req, res) => {
  res.send('Hello, Express!')
})

app.use('/api', router)
app.use(errorHandler.handle)

startCronJobs()

if (process.env.NODE_ENV === 'production') {
  let https = require('https')

  let httpsOptions = {
    key: fs.readFileSync(`/etc/pki/tls/private/api.bccu.vn.key`, 'utf-8'),
    cert: fs.readFileSync(`/etc/pki/tls/certs/api.bccu.vn.cert`, 'utf-8')
  }

  https.createServer(httpsOptions, app).listen(port, hostName, () => {
    console.log('Backend Nodejs is running on the: https://' + hostName + ':' + port)
  })
} else {
  let http = require('http')
  http.createServer(app).listen(port, hostName, () => {
    console.log('Backend Nodejs is running on the: http://' + hostName + ':' + port)
  })
}
