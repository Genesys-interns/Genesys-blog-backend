/* eslint-disable quotes */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/extensions */
import express from "express";
import userController from "../controllers/user.controller.js";
import validateUserSignUpSchema from "../validators/user.validator.js";
import validator from "../validators/validator.js";
import validateUserSignInSchema from "../validators/user.signin.validator.js";

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

export default userRouter;
