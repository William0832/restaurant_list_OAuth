const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant.js')

// 載入 auth middleware 裡的 authenticated 方法
const { authenticated } = require('../config/auth')

const sortList = [
  {
    id: 0,
    name: 'A-Z',
    type: 'name',
    value: 'asc'
  },
  {
    id: 1,
    name: 'Z-A',
    type: 'name',
    value: 'desc'
  },
  {
    id: 2,
    name: '類別',
    type: 'category',
    value: 'asc'
  },
  {
    id: 3,
    name: '地區',
    type: 'location',
    value: 'asc'
  },
  {
    id: 4,
    name: '評分-升冪',
    type: 'rating',
    value: 'asc'
  },
  {
    id: 5,
    name: '評分-降冪',
    type: 'rating',
    value: 'desc'
  }
]

// setting route
router.get('/', authenticated, (req, res) => {
  // 加入認證
  // 存入keyword
  const keyword = req.query.keyword
  // 存入sort 類型
  const sortId = req.query.sortId || 0
  const sort = sortList[Number(sortId)]
  const sortOption = { [sort.type]: [sort.value] }
  // 篩選&編排資料
  Restaurant.find({ userId: req.user._id })
    .sort(sortOption)
    .lean()
    .exec((err, restaurants) => {
      if (err) return console.error(err)
      // 搜尋篩選
      if (keyword) {
        restaurants = restaurants.filter(
          item =>
            item.name.toLowerCase().includes(keyword.toLowerCase()) ||
            item.category.toLowerCase().includes(keyword.toLowerCase())
        )
      }
      return res.render('index', { sortId, keyword, sortList, restaurants })
    })
})
module.exports = router
