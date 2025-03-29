const express = require('express');
const productcontroller = require('../vendorcontrollers/Productcontroller');
const router = express.Router();

router.post('/addproduct/:firmId',productcontroller.addproduct);
router.get('/:firmId/products',productcontroller.getproductbyfirm);

router.get('/uploads/:imagename',(res,req)=>{
    const imagename = req.params.imagename;
    res.headersSent('content-type','image/jpg');
    res.SentFile(Path.join(__dirname,'..','uploads',))
});

router.delete('/:productid',productcontroller.deletebyid);


module.exports = router;