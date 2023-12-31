const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");
require("dotenv").config();

const app = express();

// connect to db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// app middlewares
//app.use(bodyParser.json());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://law-firm-system-client.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors());
// routes attached with server
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", require("./routes/auth"));
app.use("/api-auth0", require("./routes/auth0"));
app.use("/api", require("./routes/contribute"));
app.use("/api", require("./routes/contributecontent"));
app.use("/api", require("./routes/libraryPaymentData"));
app.use("/api", require("./routes/packageData"));
app.use("/api", require("./routes/subjectArea"));
app.use("/api", require("./routes/agent"));
app.use("/api", require("./routes/superAdmin"));
app.use("/api", require("./routes/favourite"));
app.use("/api", require("./routes/member"));
app.use("/api", require("./routes/trashData"));

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
