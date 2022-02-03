import userModel from "../models/user.js";
import taskModel from "../models/task.js";
import labelModel from "../models/label.js";
import ApiError from "../exeptions/api-error.js";

class Task {
  async create(data) {
    // if we have id change the existing task
    if (data.id != null) {
      const task = await taskModel.findById(data.id);
      if (!task) {
        throw ApiError.BadRequest();
      }

      task.text = data.text;
      task.description = data.description;
      return task.save();
    }

    // else create new task
    const task = await taskModel.create({ ...data });
    return task.save();
  }
  async execute(id) {
    const task = await taskModel.findById(id);
    task.done = true;
    return task.save();
  }
  async get(user) {
    const tasks = await taskModel.find({ user: user.id, done: false });
    if (!tasks) {
      return null;
    }
    return tasks;
  }
  async addLabel(taskID, labelID) {
    const task = await taskModel.findById(taskID);

    const label = await labelModel.findById(labelID);
    if (label) {
      throw ApiError.BadRequest();
    }

    task.labels.push(labelID);
    return task.save();
  }
  async setLabels(id, labels) {
    const task = await taskModel.findById(id);

    if (!task) {
      throw ApiError.BadRequest();
    }

    task.labels = labels;

    return task.save();
  }
  async setPriority(taskID, userID, priority) {
    const task = await taskModel.findById(taskID);
    if (task.user != userID) {
      throw ApiError.BadRequest();
    }
    task.priority = priority;
    return task.save();
  }
  async changeTerm(taskID, userID, term) {
    const task = await taskModel.findById(taskID);
    if (task.user != userID) {
      throw ApiError.BadRequest();
    }
    task.term = term;
    return task.save();
  }
}

export default new Task();
