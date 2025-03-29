const Vendor = require('../modals/Vendor')
require('dotenv').config();
const jwt = require('jsonwebtoken')

// const verifytoken = async (req, res, next) => {
//     const token = req.headers.token;
//     if (!token) {
//         return res.status(401).json({ error: "token required" });  
//     };
    // try {
    //     const decoded = jwt.verify(token, process.env.SECRETKEY );
    //     const vendor = await Vendor.findById(decoded.vendorId)
    //     console.log(decoded.vendorId);
    //     console.log(vendor);
    //     if (!vendor) {
    //         return res.status(404).json({ message: "vendor not found" }); 
    //     };
    //     req.vendorId = vendor._id;           
    //     next();
    // } catch (error) {
    //     console.log(error);
    //     return res.status(400).json({ error: "invalid token" }); 
    // };

   
    
    //     try {
    //         const decoded = jwt.verify(token, process.env.SECRETKEY);
    //         console.log('Decoded:', decoded.vendorId); // Should now include vendorId
    //         if (!decoded.vendorId) {
    //             return res.status(400).json({ error: "vendorId missing in token" });
    //         }
            
    //         const vendor = await Vendor.findById(decoded.vendorId);
    //         if (!vendor) {
    //             return res.status(404).json({ message: "Vendor not found" });
    //         }
    
    //         req.vendorId = vendor._id;
    //         next();
    //     } catch (error) {
    //         console.log('Error:', error);
    //         return res.status(400).json({ error: "Invalid token" });
    //     }
    // };

    const verifytoken = async (req, res, next) => {

        const token = req.headers.token;
    
        if (!token) {
            return res.status(401).json({ error: "Token required" });
        }
    
        try {
            const decoded = jwt.verify(token, process.env.SECRETKEY);
            console.log('Decoded:', decoded.vendorId); 
            
            if (!decoded.vendorId) {
                return res.status(400).json({ error: "vendorId missing in token" });
            }
    
            const vendor = await Vendor.findById(decoded.vendorId);
            if (!vendor) {
                return res.status(404).json({ message: "Vendor not found" });
            }
    
            req.vendorId = vendor._id;  
            next();
        } catch (error) {
            console.log('Error:', error);
            return res.status(400).json({ error: "Invalid token" });
        }
    };
    
    

module.exports = verifytoken;

