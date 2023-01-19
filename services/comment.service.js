/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import commentModel from '../models/comment.model.js';

class CommentServices {
  async postComment(data) {
    const comment = await commentModel.create(data);
    return comment;
  }

  async getCommentById(id) {
    const comment = await commentModel.find({ _id: id });
    return comment;
  }

  async deleteComment(id) {
    const comment = await commentModel.findByIdAndDelete(id);
    return comment;
  }

  async getAllComments() {
    const comments = await commentModel.find();
    return comments;
  }

  async getUserReactions(id) {
    const comments = await commentModel.find({ authorId: id });
    return comments;
  }
}
export default new CommentServices();
