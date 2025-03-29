const express = require('express');
const vendorcontroller = require('../vendorcontrollers/vendorcontroller');
const router = express.Router();

router.post("/register", vendorcontroller.vendorregister);
router.post("/login", vendorcontroller.vendorlogin);
router.get("/all-vendors", vendorcontroller.all_vendors);
router.get("/single-vendor/:id", vendorcontroller.all_singleid);

module.exports = router