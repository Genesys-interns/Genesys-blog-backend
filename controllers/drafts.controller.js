/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-named-as-default-member */
import _ from 'lodash';
import draftsServices from '../services/drafts.services.js';
import cloudinary from '../config/cloudinary.config.js';

class DraftsController {
  async createDrafts(req, res) {
    const data = req.body;
    data.userId = req.userData._id;
    if (req.file) {
      const result = await cloudinary.uploadImage(req.file.path);
      data.image = result.url;
      const post = await draftsServices.createDrafts(data);
      return res.status(201).send({ status: true, body: post });
    }
    const post = await draftsServices.createDrafts(data);
    return res.status(201).send({ status: true, body: post });
  }

  async updateDrafts(req, res) {
    const findDrafts = await draftsServices.getDrafts(req.params.id);
    if (_.isEmpty(findDrafts)) {
      return res.status(404).send({ status: false, message: 'the drafts you want to update does not exist' });
    }
    const update = await draftsServices.updateDrafts(req.params.id, req.body);
    return res.status(200).send({ status: true, message: 'drafts updated successfully', body: update });
  }

  async deleteDrafts(req, res) {
    const findDrafts = await draftsServices.getDrafts(req.userData._id);
    if (_.isEmpty(findDrafts)) {
      return res.status(404).send({ status: false, message: 'the drafts you want to delete does not exist' });
    }
    const deleteDrafts = await draftsServices.deleteDrafts(req.userData._id);
    return res.status(200).send({ status: true, message: 'drafts deleted successfully' });
  }

  async getDrafts(req, res) {
    const findDrafts = await draftsServices.getUserDrafts(req.userData._id);
    if (_.isEmpty(findDrafts)) {
      return res.status(404).send({ status: false, message: 'this user has no drafts' });
      }
      return res.status(404).send({ status: true, body: findDrafts });
  }
}

export default new DraftsController();
