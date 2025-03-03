const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary")
const multer = require('multer');
cloudinary.config({
    cloud_name: "dsy6ke1nn", 
    api_key: "675884956121764", 
    api_secret: "o94a9XqWwPCKzBMFLPamOOe66SM" 
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'listingfolder',
      allowerdFormats: ["png","jpg","jpeg"]
    },
  });

  const upload = multer({ storage: storage });

  module.exports = upload;