const express = require('express');
const Category = require('../models/Category');
const router = express.Router()
const Item = require('../models/Item')


router.get('/create',(req, res) => {
    res.render('create_item')
})

router.post('/create', async (req, res) => {
    const {name, description, category, price} = req.body
    const username = req.session.user_name
    const image = req.body.image || 'https://placehold.jp/30/grey/ffffff/300x150.png?text=sp+marketing'
    console.log('item created: ' + image + " "  + category + " " + username)
    const newItem = new Item({name,category,description,price,image,username })
    const newCategory = new Category({category})
    newCategory.save()
    .then(() => {
        console.log('New category added')
    })
    .catch((err) => {
        console.log(err)
    })
    newItem.save()
    .then(() => {
        console.log('Item created by user: ' + username)
        res.redirect('/seller')
    })
    .catch((err) => {
        console.log(err)
    })
})



module.exports = router
