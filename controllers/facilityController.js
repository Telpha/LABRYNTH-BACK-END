var expressAsyncHandler = require('express-async-handler');
var Facility = require('../models/facilityModel.js')
const multer  = require('multer')
const dotenv = require("dotenv");
dotenv.config(); 
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
}); 

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = function(app){
    app.post('/create-facility',upload.single('facilityPic'),expressAsyncHandler(async(req,res)=>{
        try{
          const facilityPic = await cloudinary.uploader.upload(req.file.path);
            const facility = new Facility({
                userId : req.body.userId,
                facilityName : req.body.facilityName,
                facilityPhotoAvatar : facilityPic.secure_url,
                facilityPhotoId: facilityPic.public_id

              });
              const createdFacility = await facility.save();
              res.send({
                _id: createdFacility._id,
                name: createdFacility.facilityName,
                photoUrl: createdFacility.facilityPhotoAvatar,
                });
        }
        catch(e){
            console.log(e);
        }
      app.get('/get-facility',expressAsyncHandler(async(req,res)=>{
        
      }))

}
))}
