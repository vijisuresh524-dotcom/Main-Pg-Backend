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

const allowedOrigins = [
  "http://localhost:5173",
  "https://main-pg-task-manager.netlify.app",
];

app.use(
  cors({
    origin: allowedOrigins,
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
  "/auth",
  authRoutes
);

app.use(
  "/tasks",
  taskRoutes
);

app.use(
  "/users",
  userRoutes
);

app.use("/users", userprofileroute);




app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT}`
  );
});