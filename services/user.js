import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import mail from "./mail.js";
import tokenService from "./token.js";
import userDto from "../dtos/user.js";
import ApiError from "../exeptions/api-error.js";

import commentModel from "../models/comment.js";
import labelModel from "../models/label.js";
import taskModel from "../models/task.js";
import UserDto from "../dtos/user.js";

class User {
  async registration(email, password, name) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = v4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
      name,
    });
    // await mail.sendActovationMail(email, activationLink)

    const userData = new userDto(user);
    const tokens = tokenService.generateTokens({ ...userData });

    await tokenService.save(userData.id, tokens.refreshToken);
    return { ...tokens, user: userData };
  }
  async activation(link) {
    const user = await UserModel.findOne({ activationLink: link });
    if (user && !user.isActivated) {
      user.isActivated = true;
      user.activationLink = "";
      return await user.save();
    }
    throw ApiError.BadRequest(`Некоректная ссылка активации`);
  }
  async login(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (!candidate)
      throw ApiError.BadRequest(`Пользователя с таким email не существует`);

    const isCorrectPassword = await bcrypt.compare(
      password,
      candidate.password
    );

    if (!isCorrectPassword) throw ApiError.BadRequest(`Неверный пароль`);

    const userData = new userDto(candidate);

    const tokens = tokenService.generateTokens({ ...userData });

    await tokenService.save(userData.id, tokens.refreshToken);

    return { ...tokens, user: userData };
  }
  async logout(refreshToken) {
    const token = tokenService.remove(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) throw ApiError.UnautorizedError();

    const userData = tokenService.validateRefresh(refreshToken);

    const tokenFromDB = tokenService.find(refreshToken);

    if (!userData || !tokenFromDB) {
      throw ApiError.UnautorizedError();
    }

    const user = UserModel.findById(userData.id);

    const userDTO = new userDto(user);

    const tokens = tokenService.generateTokens({ ...userDTO });

    await tokenService.save(userDTO.id, tokens.refreshToken);

    return { ...tokens, user: userDTO };
  }
  async getUserData(id) {
    const data = await UserModel.findById(id);

    return new UserDto(data);
  }
  async getUsers() {
    const users = await UserModel.find();
    if (users) return users;
    return null;
  }
  async changePassword(req) {
    const { oldPassword, newPassword } = req.body;
    const user = await UserModel.findById(req.user.id);

    const isCorrectPassword = await bcrypt.compare(oldPassword, user.password);

    if (!isCorrectPassword) throw ApiError.BadRequest(`Неверный пароль`);

    const hashPassword = await bcrypt.hash(newPassword, 3);

    user.password = hashPassword;
    return user.save();
  }
  async addProject(userID, id) {
    const user = await UserModel.findById(userID);

    user.projects = [...user.projects, id];

    return user.save();
  }
  async deleteAccount(user, refreshToken) {
    tokenService.remove(refreshToken);

    await commentModel.remove({ user: user.id });
    await labelModel.remove({ user: user.id });
    await taskModel.remove({ user: user.id });
    await UserModel.remove({ _id: user.id });

    return true;
  }
  async changeColorTheme(color, id) {
    const user = await UserModel.findById(id);

    user.colorTheme = color;

    return await user.save();
  }
  async changeName(name, id) {
    const user = await UserModel.findById(id);

    user.name = name;

    return await user.save();
  }
  async changeLocale(locale, id) {
    const user = await UserModel.findById(id);

    user.locale = locale;

    return await user.save().locale;
  }
}
export default new User();
