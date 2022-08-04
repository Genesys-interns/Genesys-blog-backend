import _cloudinary from 'cloudinary';

const {
  CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
} = process.env;

const cloudinary = _cloudinary.v2;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

export async function uploadImage(file) {
  try {
    const response = await cloudinary.uploader.upload(file, {
      resource_type: 'image',
      folder: 'genesys-blog/images'
    });

    return response;
  } catch (error) {
    throw new Error(`From Cloudinary: ${error}`);
  }
}

export async function deleteFile(fileId) {
  try {
    const response = await cloudinary.uploader.destroy(fileId);
    return response;
  } catch (err) {
    throw new Error(`From Cloudinary: ${err}`);
  }
}

export default {
  uploadImage,
  deleteFile
};
