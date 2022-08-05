/* eslint-disable quotes */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/extensions */
import express from "express";
import multer from 'multer';
import validateUserSignUpSchema from "../validators/user.validator.js";
import validator from "../validators/validator.js";
import validateUserSignInSchema from "../validators/user.signin.validator.js";
import imageValidator from "../validators/user.image.validator.js";
import userControllerV2 from "../controllers/user.controller.v2.js";
import checkAuth from "../middlewares/auth.middleware.js";

const storage = multer.diskStorage({
  destination:function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename:function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const userRouterV2 = express.Router();
userRouterV2.post(
  "/",
  [validator(validateUserSignUpSchema)],
  userControllerV2.create
);

userRouterV2.post(
  "/login",
  [validator(validateUserSignInSchema)],
  userControllerV2.loginUser
);

userRouterV2.get(
  "/:id",
  
  userControllerV2.fetchUserDetails
);
userRouterV2.put(
  "/image",checkAuth,
 upload.single('photo'),
  userControllerV2.updateUserPhoto
);
export default userRouterV2;
