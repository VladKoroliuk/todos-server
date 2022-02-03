import ApiError from "../exeptions/api-error.js";
import tokenService from "../services/token.js";

export default function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiError.UnautorizedError());
    }

    const accessToken = authHeader.split(" ")[1];

    if (!accessToken) {
      return next(ApiError.UnautorizedError());
    }

    const userData = tokenService.validateAccess(accessToken);

    if (!userData) {
      return next(ApiError.UnautorizedError());
    }
    req.user = userData;
    next();
  } catch (e) {
    next(ApiError.UnautorizedError());
  }
}
