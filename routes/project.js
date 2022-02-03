import { Router } from "express";
import auth from "../middlewares/auth.js";
import project from "../controllers/project.js";

const router = new Router();

// GET
router.get("/", auth, project.get);
router.get("/projectSections", auth, project.getSections);
// POST
router.post("/", auth, project.create);
router.post("/createProjectSection", auth, project.createSection);
// PATCH
router.patch("/", auth, project.change);
router.patch(
  "/projectSectionSubsequence",
  auth,
  project.setSubsequenceSections
);
router.patch("/renameSection", auth, project.renameSection);
// DELETE
router.delete("/", auth, project.delete);
router.delete("/section", auth, project.deleteSection);

export default router;
