import pkg from "mongoose";
const { Schema, model } = pkg;

const user = new Schema({
  email: {
    type: String,
    unique: true,
    reqired: true,
  },
  name: {
    type: String,
    reqired: true,
  },
  password: {
    type: String,
    reqired: true,
  },
  isActivated: {
    type: Boolean,
    default: false,
  },
  activationLink: {
    type: String,
  },
  code: {
    type: String,
    reqired: false,
    default: null,
  },
  projects: {
    type: Array,
    default: [],
    reqired: false,
  },
  colorTheme: {
    type: String,
    default: "default",
    required: false,
  },
  locale: {
    type: String,
    default: "en-GB",
    required: false,
  },
});

export default model("User", user);
