import ApiError from "../exeptions/api-error.js";
import projectModel from "../models/project.js";
import projectSectionModel from "../models/projectSection.js";
import userModel from "../models/user.js";

class Project {
  async create(creator, name, color, type) {
    const projectData = { creator, name, color, type };

    const project = await projectModel.create({
      ...projectData,
      users: [creator],
    });

    return await project.save();
  }
  isProjectAvailable(candidate, userID) {
    if (candidate.creator != userID) {
      throw ApiError.BadRequest();
    }
  }
  async get(userID) {
    const user = await userModel.findById(userID);

    const result = await projectModel.find({ _id: { $in: user.projects } });

    return result;
  }
  async delete(projectID, userID) {
    const candidate = await projectModel.findById(projectID);

    this.isProjectAvailable(candidate, userID);

    return await projectModel.findByIdAndDelete(projectID);
  }
  async change(data, userID) {
    const candidate = await projectModel.findById(data._id);

    this.isProjectAvailable(candidate, userID);

    candidate.color = data.color;
    candidate.name = data.name;
    candidate.type = data.type;

    return await candidate.save();
  }
  async createSection(data) {
    const sections = await projectSectionModel.find({
      projectID: data.projectID,
    });

    const last = sections[sections.length - 1];

    const index = !last ? 0 : last.subsequenceIndex + 100;

    data.subsequenceIndex = index;

    const section = await projectSectionModel.create(data);

    return section.save();
  }
  async getSections(projectID, user) {
    const candidate = await projectModel.findById(projectID);

    // this.isProjectAvailable(candidate, user)

    const sections = await projectSectionModel.find({ project: projectID });

    return sections;
  }
  async setSubsequenceSections(data) {
    const previous = await projectSectionModel.find({
      projectID: data[0].projectID,
    });

    Array.prototype.forEach.call(data, (e) => {
      const candidate = [...previous].find((elem) => elem._id == e._id);

      if (candidate.subsequenceIndex != e.subsequenceIndex) {
        candidate.subsequenceIndex = e.subsequenceIndex;
        candidate.save();
      }
    });

    return data;
  }
  async deleteSection(id) {
    return await projectSectionModel.findByIdAndRemove(id);
  }
  async renameSection(data) {
    const section = await projectSectionModel.findById(data.id);
    section.name = data.name;
    return await section.save();
  }
}

export default new Project();
