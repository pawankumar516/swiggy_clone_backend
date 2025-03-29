const mongoose = require('mongoose');

const productschema =new mongoose.Schema({
    productname:{
        required: true,
        type: String
    },
    price:{
        type: String,
        required: true
    },
    category:{
        type:[{
            type: String,
            enum: ['veg','non-veg']
        }]
    },
    image:{
       type: String
    },
    bestseller:{
        type: String
    },
    description:{
        type: String
    },
    firm:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"firm"
    }
}) 

module.exports = mongoose.model("product",productschema)