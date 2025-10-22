// external inports
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

// internal imports
const uploadToCloudinary = require("../../helpers/upload_cloudinary");
const uploader = require("../../utilities/product.singleUploader");

function imageUpload(req, res, next) {
  const upload = uploader(
    "all-images",
    ["image/jpeg", "image/jpg", "image/png"],
    2000000,
    "Only .jpg, .jpeg, .png formats are allowed and size must be under 2MB"
  );
    
//   call the middleware function

    upload.fields([{name: "thumbnail", maxCount: 1},{ name: "images", maxCount: 5 }])(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        } else {
           try {
            const thumbnail = req.files['thumbnail']?.[0];
            const images = req.files['images'] || [];

            // Upload all to Cloudinary
            if(thumbnail){
              const result = await uploadToCloudinary(thumbnail.path);
              req.body.thumbnail = result.secure_url;

              // Delete the local file after upload
              if(result){
                await unlinkFile(thumbnail.path);
              }
            }

            if(images.length){
              const uploadPromises = images.map((img) => uploadToCloudinary(img.path));
              const results = await Promise.all(uploadPromises);
              req.body.images = results.map((res) => res.secure_url);

              if(results){
                const deletePromises = images.map((img) => unlinkFile(img.path));
                await Promise.all(deletePromises);
              }
            }
            next();

           } catch (err) {
            res.status(500).json({ error: err.message });
           }
        }
    })

}


module.exports = imageUpload;
