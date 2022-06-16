const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');
const Customer = require('../models/Customer')
const Seller = require('../models/Seller')
// Customer routes
router.get('/customer/register', (req, res) => {
    var exists = req.session.exists
    res.render('register_customer',{exists:exists})  
})
router.post('/customer/register',async (req, res) => {
    const {username, email } = req.body
    
    const password = await bcrypt.hash(req.body.password,10)
    console.log(username, email, password)
    var does_exist = false
    const findUser = await Customer.findOne({username: username})
    if(findUser) {
        req.session.exists = true
        does_exist= true
    }
    if(does_exist) {
        res.redirect('/customer/register')
    } else {
        const newCustomer = new Customer({username, password, email})
        newCustomer.save()
        .then(() => {
            console.log('Customer registered succesfully')
            res.redirect('/customer/login')
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
})
router.get('/customer/login', (req, res) => {
    var incorrect = req.session.incorrect
    res.render('login_customer', {incorrect: incorrect})
})

router.post('/customer/login', (req, res) => {
    const {username, password} = req.body
    Customer.findOne({username}, (error, user) => {
        if(user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if(same) {
                    req.session.user_name = req.body.username
                    req.session.userId = user._id
                    console.log('Customer Username: ' + req.session.user_name)
                    console.log('Customer User id: '+ req.session.userId)
                    res.redirect('/customer')
                } else {
                    req.session.incorrect = true
                    res.redirect('/customer/login')
                }
            })
        } else {
            res.redirect('/customer/login')
        }
    })
})

router.get('/customer/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                console.log(err)
            } else {
                res.redirect('/customer/login')
            }
        })
    } else {
        res.redirect('/customer/login')
    }
    
})


// Seller routes

router.get('/seller/register', (req, res) => {
    var exists = req.session.exists
    res.render('register_seller',{exists:exists})  
})
router.post('/seller/register',async (req, res) => {
    const {username, email } = req.body
    
    const password = await bcrypt.hash(req.body.password,10)
    console.log(username, email, password)
    var does_exist = false
    const findUser = await Seller.findOne({username: username})
    if(findUser) {
        req.session.exists = true
        does_exist= true
    }
    if(does_exist) {
        res.redirect('/seller/register')
    } else {
        const newSeller = new Seller({username, password, email})
        newSeller.save()
        .then(() => {
            console.log('Seller registered succesfully')
            res.redirect('/seller/login')
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
})
router.get('/seller/login', (req, res) => {
    var incorrect = req.session.incorrect
    res.render('login_seller', {incorrect: incorrect})
})

router.post('/seller/login', (req, res) => {
    const {username, password} = req.body
    Seller.findOne({username}, (error, user) => {
        if(user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if(same) {
                    req.session.user_name = req.body.username
                    req.session.userId = user._id
                    console.log('Seller Username: ' + req.session.user_name)
                    console.log('Seller User id: '+ req.session.userId)
                    res.redirect('/seller')
                } else {
                    req.session.incorrect = true
                    res.redirect('/seller/login')
                }
            })
        } else {
            res.redirect('/seller/login')
        }
    })
})

router.get('/seller/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                console.log(err)
            } else {
                res.redirect('/seller/login')
            }
        })
    } else {
        res.redirect('/seller/login')
    }
    
})





module.exports = router