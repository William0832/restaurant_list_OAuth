const express = require('express')
const app = express()
const port = 3000

// find static file directory
app.use(express.static('public'))

// 載入 method-override & 設定
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// 載入 handlebars as template engine & set layout: main
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayouts: 'main' }))
app.set('view engine', 'handlebars')

// 載入 body-parser & setting it
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// 載入 mongoose & 連線 DB & 使用 connection 物件
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
// db error
db.on('error', () => {
  console.log('db error')
})
// db connected
db.once('open', () => {
  console.log('db connected!')
})

// 載入 routers
app.use('/', require('./routes/home.js'))
app.use('/restaurants', require('./routes/restaurant.js'))
app.use('/users', require('./routes/user.js'))
// listen app
app.listen(port, () => {
  console.log(`App is listening on localhost:${port}`)
})
