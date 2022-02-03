import commentlModel from "../models/comment.js";
import taskModel from "../models/task.js";
import ApiError from "../exeptions/api-error.js";

class Comment {
  async create(task, text, user, userName) {
    const candidateTask = await taskModel.findById(task);

    if (candidateTask.user != user) {
      throw ApiError.BadRequest();
    }

    const comment = await commentlModel.create({ text, task, user, userName });

    return comment.save();
  }
  async get(user) {
    const comments = await commentlModel.find({ user });
    return comments;
  }
  async delete(user, task) {
    const candidate = await commentlModel.findById(task);

    if (candidate.user != user) {
      throw ApiError.BadRequest();
    }

    const result = await commentlModel.findByIdAndRemove(task);

    return result;
  }
  async change(commentID, userID, text) {
    const candidate = await commentlModel.findById(commentID);

    if (candidate.user != userID) {
      throw ApiError.BadRequest();
    }
    candidate.text = text;

    return candidate.save();
  }
}

export default new Comment();
