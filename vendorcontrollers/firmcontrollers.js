const firm = require("../modals/firm");
const Vendor = require("../modals/Vendor");
const multer = require("multer");
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({storage: storage});

const addfirm = async(req,res)=>{

    try {
    const {firmname,area,category,region,offer} = req.body;
    const image = req.file ? req.file.filename : undefined;
    
    const vendor = await Vendor.findById(req.vendorId);
    if(!vendor){
       return res.status(404).json({message:"vendor nots found"});
    }

    const newFirm = new firm({
        firmname, area, category, region, offer, image, vendor: vendor._id
    });

     const savefirm = await newFirm.save();

    vendor.firm.push(savefirm);

    await vendor.save();

    return res.status(200).json({message:"firm added success"});
    } catch (error) {
        console.log(error);
        res.status(500).json("internal server error");
    }
}

const deletefirmbyid = async(req,res)=>{
try {
  const deleteid =req.params.firmid;
  const deletefirm = await firm.findByIdAndDelete(deleteid);
  if(!deletefirm){
    res.status(404).json({message:"firmid not found"});
  }
  return res.send({success:"firm deleted successfully"})
} catch (error) {
  console.log(error);
        res.status(500).json("internal server error");
}
}
module.exports ={addfirm:[upload.single('image'), addfirm],deletefirmbyid};



