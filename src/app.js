// just to seperate app.listen()
const express = require("express");

require("./db/mongoose"); //to ensure file runs and mongoose connected to database
const userRouter = require("./routers/user");
const taskRouter = require("./routers/tasks");

const app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
