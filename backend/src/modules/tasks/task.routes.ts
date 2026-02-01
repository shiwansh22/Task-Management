import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  getTasks,
  createTask,
  toggleTask,
  deleteTask,
  updateTask,
} from "./task.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.patch("/:id/toggle", toggleTask);
router.delete("/:id", deleteTask);

export default router;
