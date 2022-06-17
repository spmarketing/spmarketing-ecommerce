const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: String
    }
})

module.exports = new mongoose.model('CartItem', cartItemSchema)