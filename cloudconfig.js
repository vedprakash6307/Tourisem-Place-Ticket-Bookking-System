const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,     // ✅ Correct
  api_secret: process.env.CLOUD_API_SECRET, // ✅ Correct
});

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "worldproject_DEV",
//     allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"], // ✅ correct key name
//   },
// });
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "worldproject_DEV",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
    timeout: 60000 // Add 60 second timeout
  },
});

module.exports = { cloudinary, storage };
