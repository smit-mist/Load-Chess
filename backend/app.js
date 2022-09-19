const express = require("express");

const app = express();
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
  });
}
const puzzleRouter = require("./routes/puzzleRoutes");
app.use("/api/v1", puzzleRouter);

module.exports = app;
