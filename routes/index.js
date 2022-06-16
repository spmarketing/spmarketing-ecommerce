const express = require('express');
const router = express.Router()
const Item = require('../models/Item')

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/customer', async (req, res) => {
    const items = await Item.find({})
    res.render('customer', {items: items})
})
router.get('/seller', async (req, res) => {
    const username = req.session.user_name
    const allItems = await Item.find({})
    console.log(allItems)
    res.render('seller', {username: username, allItems: allItems})
})

module.exports = router