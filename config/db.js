import dotenv from "dotenv";
dotenv.config()

export default {
  dbLink: `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@todosdb.0iup7.mongodb.net/todos`,
};
