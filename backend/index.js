const express = require("express");
const app = express();

app.use(express.json());

app.get("/ping", (req, res) => {
  res.send("pong");
});

const userRouter = require("./src/router/user");
app.use("/user", userRouter);
const roomRouter = require("./src/router/room");
app.use("/room", roomRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
