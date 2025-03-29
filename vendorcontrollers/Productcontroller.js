const multer = require("multer");
const Product = require('../modals/Product')
const path = require('path');
const Firm = require("../modals/firm");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({storage: storage});

  const addproduct = async(req,res)=>{
    try {
        const {productname,price,category,beststeller,description} = req.body;
    const image = req.file ? req.file.filename : undefined;

    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);

     if(!firm){ 
        res.status(404).json({error:"firm Id not available"});
     }

     const newproducts = new Product({
        productname,price,category,beststeller,description,image,firm: firm._id
     })
     const savedproduct = await newproducts.save();
     firm.product.push(savedproduct);
     await firm.save();
     return res.status(200).json({message:"firm added success"});

    } catch (error) {
        console.error(error);
        res.status(500).json({error:"internal server error"})
    }
  }

  const getproductbyfirm =async(req,res)=>{
    try {
      const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);

    if(!firm){
      res.status(400).json({error:"firmid not available"})
    }
    const products = await Product.find({firm: firmId});
    res.status(200).json(products)
    } catch (error) {
      console.error(error);
        res.status(500).json({error:"internal server error"})
    }
  }

  const deletebyid = async(req,res)=>{
    try {
      const reqid = req.params.productid;
    const Id = await Product.findByIdAndDelete(reqid);
    if(!Id){
      res.status(404).json({error:"Id not available"});
    };
    return res.send({message:"product deleted successfully"});
    } catch (error) {
      console.error(error);
        res.status(500).json({error:"internal server error"})
    }

  }

  module.exports = {addproduct: [upload.single('image'),addproduct],getproductbyfirm, deletebyid}