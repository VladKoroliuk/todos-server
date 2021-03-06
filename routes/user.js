import { Router } from "express";
import user from "../controllers/user.js";
import multer from "multer";
import { body } from "express-validator";
import storage from "../middlewares/storage.js";
import auth from "../middlewares/auth.js";

const router = new Router();
const avatar_upload = multer({ storage });

router.get("/avatar/:name", user.getAvatar);
router.get("/", auth, user.getUserData);
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  body("name").isLength({ min: 3, max: 16 }),
  user.registration
);
router.post("/login", user.login);
router.post("/logout", user.logout);
router.post("/refresh", user.refresh);
router.delete("/", auth, user.deleteAccount);
router.post("/avatar", auth, avatar_upload.single("avatar"), (req, res) => {
  res.status(200);
});
router.patch(
  "/password",
  auth,
  body("oldPassword").isLength({ min: 6, max: 32 }),
  body("newPassword").isLength({ min: 6, max: 32 }),
  user.changePassword
);
router.patch(
  "/name",
  auth,
  body("name").isLength({ min: 3, max: 16 }),
  user.changeName
);
router.patch("/theme", auth, user.changeColorTheme);
router.patch("/locale", auth, user.changeLocale);

export default router;
