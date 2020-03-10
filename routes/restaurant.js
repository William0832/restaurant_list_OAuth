const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')
const { authenticated } = require('../config/auth')
// setting roures
// show all restaurants
router.get('/', authenticated, (req, res) => {
  Restaurant.find({ userId: req.user._id })
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      return res.render('index', { restaurants })
    })
})

// create - show new page
router.get('/new', authenticated, (req, res) => {
  res.render('new')
})
// create - 處理db & 顯示結果
router.post('/new', authenticated, (req, res) => {
  // 新增 restaurant model 接收 req.body 內的資料
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: Number(req.body.rating),
    description: req.body.description,
    userId: req.user._id
  })
  // 存入 db
  restaurant.save(err => {
    if (err) return console.error(err)
    // 導回首頁
    return res.redirect('/')
  })
})

// show specific restaurant
router.get('/:id', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }) // TODO: 檢查 _id名稱
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('show', { restaurant })
    })
})

// edit - show edit page
router.get('/edit/:id', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id })
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('edit', { restaurant })
    })
})
// edit - 處理db & 顯示結果
router.put('/edit/:id', authenticated, (req, res) => {
  Restaurant.findOne(
    { _id: req.params.id, userId: req.user._id },
    (err, restaurant) => {
      if (err) return console.error(err)
      restaurant.name = req.body.name
      restaurant.name_en = req.body.name_en
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.google_map = req.body.google_map
      restaurant.rating = Number(req.body.rating)
      restaurant.description = req.body.description
      restaurant.save(err => {
        if (err) return console.error(err)
        return res.redirect(`/restaurants/${req.params.id}`)
      })
    }
  )
})

// delete
router.delete('/delete/:id', authenticated, (req, res) => {
  Restaurant.findOne(
    { _id: req.params.id, userId: req.user._id },
    (err, restaurant) => {
      if (err) return console.error(err)
      restaurant.remove(err => {
        if (err) return console.error(err)
        return res.redirect('/')
      })
    }
  )
})

module.exports = router
