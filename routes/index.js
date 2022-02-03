import { Router } from "express";
import auth from "../middlewares/auth.js";
import comment from "../controllers/comment.js";

const router = new Router();

// GET
router.get("/comments", auth, comment.get);
// POST
router.post("/comment", auth, comment.create);
// PATCH
router.patch("/comment", auth, comment.change);
// DELETE
router.delete("/comment", auth, comment.delete);

export default router;
