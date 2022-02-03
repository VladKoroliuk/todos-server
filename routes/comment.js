import { Router } from "express";
import auth from "../middlewares/auth.js";
import comment from "../controllers/comment.js";

const router = new Router();

// GET
router.get("/", auth, comment.get);
// POST
router.post("/", auth, comment.create);
// PATCH
router.patch("/", auth, comment.change);
// DELETE
router.delete("/", auth, comment.delete);

export default router;
