const express = require("express");
const app = express();
const cors = require("cors");
const __featuresRouter = require("./v1/__features/__features.route");
const registerRouter = require("./v1/register/register.route");
const {
  globalErrorHandler,
} = require("./middleware/globalErrorHandler/globalErrorHandler");
const { apiLimiter } = require("./middleware/apiLimiter/apiLimiter");
const {
  verifyAuthorization,
} = require("./middleware/verifyAuthorization/verifyAuthorization");

// middle ware
app.use(express.json());
app.use(cors());

//* Limit each IP to 100 requests per `window` (here,100 req per 15 minutes)
app.use(apiLimiter);

app.get("/", (req, res) => {
  res.send({ message: "Node server is fully running" });
});

// __features route
app.use("/api/v1/__features", __featuresRouter);
// also logIn route implement here by "api/v1/register/logIn"
app.use("/api/v1/register", registerRouter);
app.get("/test", verifyAuthorization, (req, res, next) => {
  res.send({});
});
// Global Error Handler
app.use(globalErrorHandler);

app.all("*", (req, res, next) => {
  res.send({ message: "URL Not Found" });
});

module.exports = app;
