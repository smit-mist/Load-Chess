const app = require("express")();
const http = require("http").Server(app);
const io = require('socket.io')(http);
const port = (process.env.PORT || 5000);

const gameLogic = require("./game-logic");

io.on("connection", socket=>{
  console.log(socket.id);
})

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

// const puzzleRouter = require("./routes/puzzleRoutes");
// app.use("/api/v1", puzzleRouter);

module.exports = app;
