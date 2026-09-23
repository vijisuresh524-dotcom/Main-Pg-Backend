const TaskModel = require("../models/task.model");


// CREATE TASK
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      status,
    } = req.body;

    if (
      !title ||
      !description ||
      !dueDate ||
      !priority ||
      !status
    ) {
      return res.status(400).json({
        message:
          "All The Fields are required",
      });
    }

    const task = await TaskModel.create({
      user: req.user.userId,
      title,
      description,
      priority:
        priority || "Medium",
      dueDate,
      status:
        status || "Pending",
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
      error: error.message,
    });
  }
};


// GET ALL TASKS
const getTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
};



// GET TASK BY ID
const getTaskById = async (req, res) => {
  try {
    const task = await TaskModel.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch task",
      error: error.message,
    });
  }
};



// UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const task =
      await TaskModel.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user.userId,
        },
        req.body,
        { returnDocument: "after", runValidators: true }
      );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
      error: error.message,
    });
  }
};


// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const task =
      await TaskModel.findOneAndDelete({
        _id: req.params.id,
        user: req.user.userId,
      });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
      error: error.message,
    });
  }
};


// UPDATE TASK REQUEST
const updateTaskStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "In Progress",
      "Completed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid task status",
      });
    }

    const task =
      await TaskModel.findOneAndUpdate(
        {
          _id: req.params.id,
          user: req.user.userId,
        },
        {
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task status updated",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Failed to update status",
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
};