const express = require('express');
const CartItem = require('../models/CartItem');
const Category = require('../models/Category');
const router = express.Router()
const Item = require('../models/Item')

router.get('/', async (req, res) => {
    var isauthenticated = false
    if(req.session.userId) {
        isauthenticated = true
    }
    const categories = await Category.find({})
    res.render('index',{categories: categories, isauthenticated: isauthenticated})
})

router.get('/customer', async (req, res) => {
    if(req.session.userId) {
        const items = await Item.find({})
        res.render('customer', {items: items})
    } else {
        res.redirect('/customer/login')
    }
    
})
router.get('/seller', async (req, res) => {
    if(req.session.userId) {
        const username = req.session.user_name
        const allItems = await Item.find({})
        console.log(allItems)
        res.render('seller', {username: username, allItems: allItems})
    } else {
        res.redirect('/seller/login')
    }
})

router.get('/items/:category', async (req, res) => {
    if(req.session.userId) {
        const {category} = req.params
        const items = await Item.find({category}) 
        const categories = await Category.find({})
        const username = req.session.user_name
        const cartItems = await CartItem.find({username})
        res.render('category_items', {categories: categories, category: category, items: items, cartItems: cartItems})
    } else {
        req.session.message = 'Login to continue'
        res.redirect('/customer/login')
    }
    

})

module.exports = router