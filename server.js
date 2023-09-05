let express = require("express");
let app = express();
let port = process.env.port || 3000;

require("./dbConnection");
let router = require("./routers/router");

const { Socket } = require("socket.io");
let http = require("http").createServer(app);
let io = require("socket.io")(http);

app.use(express.static(__dirname + "/"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/cat", router);

io.on("connection", (socket) => {
  console.log("Client is Connected");
  socket.on("disconnect", () => {
    console.log("Client is  Disconnected");
  });
  setInterval(() => {
    socket.emit("number", parseInt(Math.random() * 10));
  }, 1000);
});

http.listen(port, () => {
  console.log("Welcome to server SIT725 on port: " + port + " :)");
});
