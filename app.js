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
// 載入 session
const session = require('express-session')
// 載入 passport
const passport = require('passport')

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

app.use(
  session({
    secret: '5566', // secret: 定義一組屬於你的字串做為私鑰
    resave: false,
    saveUninitialized: true
  })
)

// 使用 Passport
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport)

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

// 載入 routers
app.use('/', require('./routes/home.js'))
app.use('/restaurants', require('./routes/restaurant.js'))
app.use('/users', require('./routes/user.js'))
// listen app
app.listen(port, () => {
  console.log(`App is listening on localhost:${port}`)
})
