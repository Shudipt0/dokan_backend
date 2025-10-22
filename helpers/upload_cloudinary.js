const cloudinary = require("../utilities/cloudinary");


async function uploadToCloudinary(localFilePath) {
   try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    })
    return result;
   } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    throw err;
   }
};

module.exports = uploadToCloudinary;