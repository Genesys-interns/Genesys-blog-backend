/* eslint-disable quotes */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/extensions */
import express from "express";
import multer from 'multer';
import userController from "../controllers/user.controller.js";
import validateUserSignUpSchema from "../validators/user.validator.js";
import validator from "../validators/validator.js";
import validateUserSignInSchema from "../validators/user.signin.validator.js";
import imageValidator from "../validators/user.image.validator.js";
import checkAuth from "../middlewares/auth.middleware.js";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

const userRouter = express.Router();
userRouter.post(
  "/",
  [validator(validateUserSignUpSchema)],
  userController.create
);


userRouter.post(
  "/login",
  [validator(validateUserSignInSchema)],
  userController.loginUser
);

userRouter.get(
  "/:id",

  userController.fetchUserDetails
);
userRouter.put(

  "/image",

  checkAuth,

  upload.single('photo'),

  userController.updateUserPhoto
);

userRouter.get(
  '/verify/:token',
  userController.verify
);
export default userRouter;
