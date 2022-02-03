import pkg from "mongoose";
const { Schema, model } = pkg;

const label = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#919191",
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

export default model("Label", label);
