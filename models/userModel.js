
var mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name : { type: String, required: true},
        email: { type: String, required:true, unique:true},
        password: { type: String, required: true },
        //dob : { type: Date,required:true, default: Date.now },
        role: { type: String, default: 'user' , required: true },
        aadharNumber: {type:Number},
        aadharCopyAvatar:{type:String},
        aadharCopyId: {type:String},
        fssaiNumber: {type:Number},
        fssaiCertificateAvatar : {type:String},
        fssaiCertificateId : {type: String}

    });
module.exports = mongoose.model('User',userSchema);