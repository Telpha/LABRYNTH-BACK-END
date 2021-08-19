var bcrypt = require('bcryptjs');
var expressAsyncHandler = require('express-async-handler');
var User = require('../models/userModel.js')
var generateToken = require('../utils.js')
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

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
    app.post('/register',expressAsyncHandler(async(req,res)=>{
        
        const salt = await bcrypt.genSaltSync(10);
        const password = req.body.password;
        console.log(req.body.password);
        const hashedPassword = await bcrypt.hash(password.toString(), salt);
        console.log(req.body.password);
        try{
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            //dob: req.body.dob,
            role: req.body.role,
          });
          const createdUser = await user.save();
          res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            role: user.role,
            token: generateToken(createdUser),
            });
    }catch(error)
      {
        if(error.code===11000)
        {
          return res.json("User already exists. Try Logging in");
        }
      }}))

    app.patch('/register/:id', upload.fields([{
      name: 'aadharCopy', maxCount: 1
    }, {
      name: 'fssaiCertificate', maxCount: 1
    }]),expressAsyncHandler(async(req,res)=>{
      try{
        const _id = req.params.id;
        const update = await User.findByIdAndUpdate(_id,
          {aadharNumber: req.body.aadharNumber,
        aadharCopy: req.files.aadharCopy[0].path,
        fssaiNumber: req.body.fssaiNumber,
        fssaiCertificate : req.files.fssaiCertificate[0].path} );
        res.status(201).json({
          message: "Created user successfully",
          createdUser: {
              name: update.name,
              //price: result.price,
              _id: update._id,
          }
  
      })
    }
      catch(err){
        //res.status(404).send(update);
        console.log(err);
      }
    }))

};
  