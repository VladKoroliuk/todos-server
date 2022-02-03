import labelModel from "../models/label.js";
import userModel from "../models/user.js";
import ApiError from "../exeptions/api-error.js";

class Label {
  async create(userID, name, color, favorite = false) {
    const user = await userModel.findById(userID);

    if (!user) {
      throw ApiError.BadRequest();
    }

    const label = await labelModel.create({
      user: user._id,
      name,
      color,
      favorite,
    });
    return await label.save();
  }
  async get(id) {
    const labels = await labelModel.find({ user: id });
    return labels;
  }
  async delete(labelId, user) {
    const labelCandidate = await labelModel.findById(labelId);
    if (labelCandidate.user != user) {
      throw ApiError.BadRequest();
    }
    return await labelModel.findByIdAndRemove(labelId);
  }
  async rename(name, id) {
    const label = await labelModel.findById(id);
    if (!label) {
      throw ApiError.BadRequest();
    }

    label.name = name;

    return await label.save();
  }
}

export default new Label();
