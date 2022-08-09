/* eslint-disable class-methods-use-this */
/* eslint-disable no-trailing-spaces */
import draftsModel from "../models/drafts.model.js";

class DraftsServices {
  async createDrafts(body) {
    const drafts = await draftsModel.create(body);
    return drafts;
  }

  async updateDrafts(id, data) {
    const update = draftsModel.findByIdAndUpdate(id, data, { runValidators: true, new: true });
    return update;
  }

  async deleteDrafts(id) {
    const drafts = await draftsModel.findByIdAndDelete(id);
    return drafts;
  }

  async getDrafts(id) {
    const drafts = await draftsModel.find({ _id: id });
    return drafts;
  }

  async getUserDrafts(id) {
    const drafts = await draftsModel.find({ userId: id });
    return drafts;
  }
}
export default new DraftsServices();
