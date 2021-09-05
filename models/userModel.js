
var mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name : { type: String, required: true},
        email: { type: String, required:true, unique:true},
        password: { type: String, required: true },
        //dob : { type: Date,required:true, default: Date.now },
        role: { type: String, default: 'user' , required: true },
        aadharNumber: {type:Number},
        aadharCopy:{type:String},
        fssaiNumber: {type:Number},
        fssaiCertificate : {type:String}

    });
module.exports = mongoose.model('User',userSchema);