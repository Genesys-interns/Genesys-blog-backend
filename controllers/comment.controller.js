/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import _ from 'lodash';
import commentService from '../services/comment.service.js';

/* eslint-disable class-methods-use-this */
class CommentController {
  async postComments(req, res) {
    const data = {
      comment: req.body.comment,
      username: req.user.firstName,
      authoremail: req.user.email,
      postId: req.body.postId,
      authorId: req.user._id
    };

    const comment = await commentService.postComment(data);
    if (_.isEmpty(comment)) {
      return res.status(404).send({
        status: false,
        message: 'unable to post comment'
      });
    }
    return res.status(200).send({
      status: true,
      message: 'comment posted successfully'
    });
  }

  async getComments(req, res) {
    const comment = await commentService.getCommentById(req.body.id);
    if (_.isEmpty(comment)) {
      return res.status(404).send({
        success: false,
        message: 'Comment does not exist'
      });
    }
    return res.status(200).send({
      success: true,
      data: comment
    });
  }

  async deleteComment(req, res) {
    const comment = await commentService.deleteComment(req.body.id);
    if (!comment) {
      return res.status(404).send({
        success: false,
        message: 'Comment failed to delete'
      });
    }
    return res.status(200).send({
      success: true,
      message: 'Comment deleted successfully'
    });
  }
}

export default new CommentController();
