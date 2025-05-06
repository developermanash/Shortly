const express  = require("express");
const path = require("path");
const staticRoute = require("./routes/staticRouter");
const urlRoute = require('./routes/url');
const {connectMongoDb} = require('./connections');
const URL = require("./models/url");
require("dotenv").config();



const app = express();
const PORT = process.env.PORT || 8000;

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/url", urlRoute);
app.use("/", staticRoute);



connectMongoDb(process.env.MONGODB_URI).then(() => 
  console.log('MongoDB connected')
);

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
