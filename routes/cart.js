const express = require('express');
const CartItem = require('../models/CartItem');
const Item = require('../models/Item')
const router = express.Router()

router.get('/cart', async (req, res) => {
    const username = req.session.user_name
    const items = await CartItem.find({username})
    res.render('cart', {items: items})
})
router.get('/addtocart/:id', (req, res) => {
    const {id} = req.params
    const item = Item.findOne({_id:id})
    const username = req.session.user_name
    const image = item.image
    const name = item.name
    const price = item.price
    const newItem = new CartItem({username, name, image, price})
    newItem.save()
    .then(() => {
        console.log('Item added to cart')
        res.redirect('/')
    })
    .catch((err) => {
        console.log(err)
    })
})


module.exports = router