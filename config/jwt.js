import dotenv from "dotenv";
dotenv.config()

export default {
  access: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    expiresIn: "60d",
  },
  refresh: {
    secret: process.env.REFRESH_TOKEN_SECRET,
    expiresIn: "30d",
  },
};
