

const mongoose = require("mongoose");

const firmSchema = mongoose.Schema({
    firmname: {
        type: String,
        required: true
    },
    area: {  
        type: String,
        required: true
    },
    category: {
        type: [{
            type: String,
            enum: ['veg','non-veg']
        }],
        required: true
    },
    region: {
        type: [{
            type: String,
            enum: ['south-indian', 'north-indian', 'chinese', 'bakery']
        }],
        required: true
    },
    image: {
        type: String, 
    },
    offer: {
        type: String,
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    },
    product:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

module.exports = mongoose.model('firm', firmSchema);
