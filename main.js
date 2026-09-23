const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/database");

const authRoutes = require("./routes/auth.router");
const taskRoutes = require("./routes/task.route");
const userRoutes = require("./routes/user.route");
const userprofileroute = require("./routes/userprofile.route")



dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: "https://main-pg-task-manager.netlify.app/",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "TaskSphere API is running",
  });
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use("/users", userprofileroute);




app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT}`
  );
});