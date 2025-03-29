const express = require('express');
const verifytoken = require('../middlewares/verifytoken');
const firmcontroller = require('../vendorcontrollers/firmcontrollers')

const router = express.Router();

router.post('/add-firm',verifytoken,firmcontroller.addfirm);

router.delete('/:firmid',firmcontroller.deletefirmbyid);

router.get('/uploads/:imagename',(res,req)=>{
    const imagename = req.params.imagename;
    res.headersSent('content-type','image/jpg');
    res.SentFile(Path.join(__dirname,'..','uploads',))
});

module.exports = router;


