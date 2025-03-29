const mongoose = require('mongoose');

const vendorschema = new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    Email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        required:true,
        type: String
    },
    firm:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'firm'
    }]
});
 

module.exports = mongoose.model('Vendor',vendorschema);