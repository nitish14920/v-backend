import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

export const uploadToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("No file path provided");
      return null;
    }

    console.log("Uploading file:", localFilePath);

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File has been uploaded to cloudinary ", response.url);
    return response.url;
  } catch (err) {
    console.error("Cloudinary Upload Failed", err); // Log the actual error
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // Only delete if the file exists
    }
    return null;
  }
};
