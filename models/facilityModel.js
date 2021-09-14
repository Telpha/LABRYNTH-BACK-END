var mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema(
    {
        userId : { type: String, required: true},
        facilityName: {type: String, required: true},
        facilityPhotoAvatar : {type: String, required: true},
        facilityPhotoId: {type: String, required: true},

    });
module.exports = mongoose.model('Facility',facilitySchema);