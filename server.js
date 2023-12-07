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

app.use(); 
const corsOptions ={
  origin:'https://law-firm-system-client.vercel.app', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
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
