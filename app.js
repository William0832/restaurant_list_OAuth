const express = require('express')
const app = express()

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const port = 3000

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.engine('handlebars', exphbs({ defaultLayouts: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/restaurant', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
const db = mongoose.connection
db.on('error', () => {
  console.log('db error')
})
db.once('open', () => {
  console.log('db connected!')
})

app.use(
  session({
    secret: '5566',
    resave: false,
    saveUninitialized: true
  })
)

app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.use(flash())
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// 載入 routers
app.use('/', require('./routes/home.js'))
app.use('/restaurants', require('./routes/restaurant.js'))
app.use('/users', require('./routes/user.js'))
app.use('/auth', require('./routes/auths'))

// listen app
app.listen(port, () => {
  console.log(`App is listening on localhost:${port}`)
})
