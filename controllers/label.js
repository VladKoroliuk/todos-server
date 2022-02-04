import ApiError from "../exeptions/api-error.js";
import labelService from "../services/label.js";

class Label {
  async create(req, res, next) {
    try {
      const name = req.body.name;

      if (name == "") {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }

      const color = req.body.color;
      const favorite = req.body.favorite;

      const result = await labelService.create(
        req.user.id,
        name,
        color,
        favorite
      );
      return res.json(result).status(200);
    } catch (e) {
      next(e);
    }
  }
  async get(req, res, next) {
    try {
      const id = req.user.id;
      const labels = await labelService.get(id);

      return res.json(labels).status(200);
    } catch (e) {
      next(e);
    }
  }
  async rename(req, res, next) {
    try {
      const { name, id } = req.body;
      const response = await labelService.rename(name, id);

      return res.json(response).status(200);
    } catch (e) {
      next(e);
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.body;
      const user = req.user.id;

      const result = await labelService.delete(id, user);
      return res.json(result).status(200);
    } catch (e) {
      next(e);
    }
  }
}

export default new Label();
