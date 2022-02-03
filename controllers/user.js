import userService from "../services/user.js";
import { base } from "../config/index.js";
import { validationResult } from "express-validator";
import ApiError from "../exeptions/api-error.js";
import path from "path";
import fs from "fs";
import userDTO from "../dtos/user.js";

class User {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const { email, password, name } = req.body;
      const userData = await userService.registration(email, password, name);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userService.getUsers();
      return res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }
  async getUserData(req, res, next) {
    try {
      const user = await userService.getUserData(req.user.id);
      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }
  async getAvatar(req, res, next) {
    try {
      const file = path.resolve(
        path.join("./public/img/avatars/", req.params.name)
      );
      fs.stat(file, (err, stat) => {
        if (!err) {
          return res.sendFile(file);
        }
        return res.sendFile(
          path.resolve(path.join("./public/img/avatars/", "user.svg"))
        );
      });
    } catch (e) {
      next(e);
    }
  }
  async changePassword(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }

      const result = await userService.changePassword(req);
      return res.status(200).json(new userDTO(result));
    } catch (e) {
      next(e);
    }
  }
  async deleteAccount(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await userService.deleteAccount(req.user, refreshToken);

      return res.status(200);
    } catch (e) {
      next(e);
    }
  }
  async changeColorTheme(req, res, next) {
    try {
      const color = req.body.color;

      const id = req.user.id;

      const response = await userService.changeColorTheme(color, id);

      return res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  }
  async changeName(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }

      const name = req.body.name;

      const id = req.user.id;

      const response = await userService.changeName(name, id);

      return res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  }
  async changeLocale(req, res, next) {
    try {
      const { locale } = req.body;

      const response = await userService.changeLocale(locale, req.user.id);

      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}

export default new User();
