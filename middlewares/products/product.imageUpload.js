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
            }

            if(images.length){
              const uploadPromises = images.map((img) => uploadToCloudinary(img.path));
              const results = await Promise.all(uploadPromises);
              req.body.images = results.map((res) => res.secure_url);
            }

           } catch (err) {
            res.status(500).json({ error: err.message });
           }
        }
    })

}


module.exports = imageUpload;
