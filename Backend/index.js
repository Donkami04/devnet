const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.NODE_PORT;
const cors = require("cors");
const { allRoutes } = require("./routes/index.routes");
require("./jobs/index");
const { checkStatusActility } = require("./jobs/health_check_actility");
checkStatusActility()
const {
  logErrors,
  errorHandler,
  ormErrorHandler,
  boomErrorHandler,
} = require("./middlewares/error.handler");

app.use(express.json());
app.use(cors({
  origin: [
  'http://localhost:4000',
  'http://10.224.116.78',
  'http://10.224.116.14',
  'http://10.224.116.78:4000',
  'http://10.224.116.14:4000',
],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

allRoutes(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(errorHandler);
require("./utils/auth");

app.listen(port, () => {
  console.log(`System running on port ${port}`);
});
