const express = require("express");

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require("../controller/task.controller");

const {
  protect,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.use(protect);

router.get("/", getTasks);

router.get("/:id", getTaskById);

router.post("/", createTask);

router.put("/:id", updateTask);

router.patch(
  "/:id/status",
  updateTaskStatus
);

router.delete("/:id", deleteTask);

module.exports = router;