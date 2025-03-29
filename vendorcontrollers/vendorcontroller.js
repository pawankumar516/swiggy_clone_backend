const Vendor = require("../modals/Vendor");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const vendorregister = async (req,res)=>{
    const {username , Email, password} = req.body;
    try{
        const vendorEmail = await Vendor.findOne({Email});
        if(vendorEmail){
            return res.status(400).json("email already register");
        };
        const hassedpassword = await bcrypt.hash(password,10);

        const newvendor = new Vendor({
            username,
            Email,
            password:hassedpassword
        });
        await newvendor.save();
        res.status(201).json({message: "vendor registerd success"});
    }catch(error){
        res.status(500).json({error: "internal server error"});
        console.error(error);
    }
}

const vendorlogin = async (req,res)=>{
    const {Email, password} = req.body;
    try{
        const vendorsEmail = await Vendor.findOne({Email});
        if(!vendorsEmail || !(await bcrypt.compare(password,vendorsEmail.password))){
            return res.status(400).json("invalid username or password");
        };

        const token = jwt.sign({ vendorId: vendorsEmail._id }, process.env.SECRETKEY, {expiresIn:"1h"});
        // res.json({ token });

        res.status(200).json({success :"login success",token});
        console.log(Email,"this is token",token);

    }catch(error){
        res.status(500).json({error: "error occurs in internal server"});
        console.error(error);
    }
}

const all_vendors = async (req,res)=>{
    const {Email, password} = req.body;
    try{
       const vendors = await Vendor.find().populate('firm')
       res.json(vendors)
    }catch(error){
        res.status(500).json({error: "error occurs in internal server"});
        console.error(error);
    }
}

const all_singleid = async (req,res)=>{
    const vendorid = req.params.id;
    try{
      const singleid = await Vendor.findById(vendorid).populate('firm');

      if(!singleid){
        res.status(400).json({message:"id not awailable"})
      }
      res.json(singleid);
    }catch(error){
        res.status(500).json({error: "error occurs in internal server"});
        console.error(error);
    }
}

module.exports ={vendorregister, vendorlogin, all_vendors, all_singleid};