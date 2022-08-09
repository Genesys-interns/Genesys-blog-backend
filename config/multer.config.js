/* eslint-disable import/prefer-default-export */
import multer from 'multer';

const storage = multer.diskStorage({
  destination:function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename:function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // console.log(file.mimetype)

  const mimes = ['image/png', 'image/jpeg', 'image/jpg'];

  if (mimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`wrong file type ${file.mimetype}`));
    cb(null, false);
  }
};

export const upload = multer({
  fileFilter:fileFilter,
  storage: storage
});
