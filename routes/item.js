const express = require('express');
const router = express.Router()
const Item = require('../models/Item')

router.get('/edit/:id', async (req, res) => {
    const {id} = req.params
    const getItem = await Item.findOne({_id: id})
    res.render('editItem', {item: getItem})
})
router.post('/edit/:id',  (req, res) => {
    const {id} = req.params
    const {name, description, category, price} = req.body
    if(req.body.image) {
        const image  = req.body.image
        Item.updateOne({_id:id}, {name,description,category,price,image})
        .then(() => {
            console.log('Item edited successfully')
            res.redirect('/seller')
        })
        .catch((err) => {
            console.log(err)
        })
    } else {
        Item.updateOne({_id:id},{name,description,category,price})
        .then(() => {
            console.log('Item edited successfully')
            res.redirect('/seller')
        })
        .catch((err) => {
            console.log(err)
        })
    }
})

router.get('/delete/:id', (req, res) => {
    const {id} = req.params
    Item.deleteOne({_id:id})
    .then(() => {
        console.log('Item deleted successfully')
        res.redirect('/seller')
    })
    .catch((err) => {
        console.log(err)
    })
})

module.exports = router