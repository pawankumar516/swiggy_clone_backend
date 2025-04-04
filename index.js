const express = require('express');
const mongoose = require('mongoose')
const vendorrouter = require('./routes/vendorroutes')
const firmroutes = require('./routes/firmroutes')
const productroutes = require('./routes/productroute')
const bodyparser = require('body-parser')
const path = require('path');
const app = express();
const cors = require('cors')
const port = process.env.port || 4000;
require('dotenv').config();
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("mongoDB connected success"))
.catch((error)=> console.log(error))

app.use(bodyparser.json())

app.use('/vendor', vendorrouter)
app.use('/firm', firmroutes)
app.use('/product', productroutes)
app.use('/uploads',express.static('uploads'));

app.listen(port, ()=>{
    console.log(`server runs on ${port}`);
}) 