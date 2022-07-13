import express from 'express';
import multer from 'multer';
import postController from '../controllers/post.controller.js';



const postRouter = express.Router();

const storage = multer.diskStorage({
  destination:function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename:function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
postRouter.post('/', upload.single('image'),postController.createPost);


export default postRouter;
