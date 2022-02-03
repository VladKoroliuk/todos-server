import { Router } from "express";
import auth from "../middlewares/auth.js";
import label from "../controllers/label.js";

const router = new Router();

// GET
router.get("/", auth, label.get);
// POST
router.post("/", auth, label.create);
// PATCH
router.patch("/rename", auth, label.rename);
// DELETE
router.delete("/", auth, label.delete);

export default router;
