import postService from '../services/post.service.js';

class PostController {
  async articleByTitle(req, res) {
    const { title } = req.params;
    const article = await postService.findByTitle(title);

    if (!article) {
      return res.status(404).send({
        success: false,
        body: 'Could not find the requested article'
      });
    }

    return res.status(201).send({
      success: true,
      body: article
    });
  }
}

export default new PostController();
