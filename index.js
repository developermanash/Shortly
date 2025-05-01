const express  = require("express");
const urlRoute = require('./routes/url')
const {connectMongoDb} = require('./connections')
const URL = require("./models/url");
require("dotenv").config();



const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/", urlRoute);

connectMongoDb(process.env.MONGODB_URI).then(() => 
  console.log('MongoDB connected')
);

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
