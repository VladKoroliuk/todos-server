import { Router } from "express";
import task from "../controllers/task.js";
import auth from "../middlewares/auth.js";

const router = new Router();

// GET
router.get("/", auth, task.get);
// POST
router.post("/", auth, task.create);
// PUT
router.put("/", auth, task.perform);
// PATCH
router.patch("/labels", auth, task.setLabels);
router.patch("/priority", auth, task.setPriority);
router.patch("/term", auth, task.changeTerm);

export default router;
