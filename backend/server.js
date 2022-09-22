const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const port = process.env.PORT || 5000;

const gameLogic = require("./game-logic");

io.on("connection", (client) => {
  console.log("Game logic started", client.id);

  // client.on("createNewGame", (data) => {
  //   console.log("New game created with id", data);
  // });
  client.on("joinGame", (data)=>{
    console.log("Printing the data", data);
  })
  // gameLogic.initializeGame(io, client)
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

// const puzzleRouter = require("./routes/puzzleRoutes");
// app.use("/api/v1", puzzleRouter);
