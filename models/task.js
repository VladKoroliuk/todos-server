import pkg from "mongoose";
const { Schema, model } = pkg;

const task = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  parentID: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  project: {
    type: Schema.Types.ObjectId,
    required: false,
    default: null,
    ref: "Project",
  },
  projectSection: {
    type: Schema.Types.ObjectId,
    required: false,
    default: null,
    ref: "projectSection",
  },
  text: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  term: {
    type: Date,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    default: "",
    required: false,
  },
  labels: {
    type: Array,
    default: [],
    required: false,
  },
  priority: {
    type: Number,
    default: 4,
    required: false,
  },
});

export default model("Task", task);
