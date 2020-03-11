const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant.js')
const User = require('../user.js')
const restaurantData = require('../../restaurant.json').results

mongoose.connect('mongodb://localhost/restaurant', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  const user = []
  user.push(
    new User({
      name: 'user1',
      email: 'user1@example.com',
      password: '12345678'
    })
  )
  user.push(
    new User({
      name: 'user2',
      email: 'user2@example.com',
      password: '12345678'
    })
  )

  user.forEach(newUser => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return console.log(err)
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) return console.log(err)
        newUser.password = hash
        newUser.save(err => {
          if (err) console.log(err)
        })
      })
    })
  })

  restaurantData.forEach(restaurant => delete restaurant.id)
  for (let i = 1; i <= restaurantData.length; i++) {
    if (i <= 3) restaurantData[i].userId = user[0]._id
    else if (i >= 4 && i <= 6) restaurantData[i].userId = user[1]._id
    else break

    Restaurant.create(restaurantData[i])
  }
  console.log('done')
})
