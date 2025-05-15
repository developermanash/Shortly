const express  = require("express");
const path = require("path");
const cookieParser = require('cookie-parser')
const {restrictToLoggedInUserOnly} = require('./middlewares/auth')

const staticRoute = require("./routes/staticRouter");
const urlRoute = require('./routes/url');
const userRoute = require('./routes/users')
const {connectMongoDb} = require('./connections');
const URL = require("./models/url");
require("dotenv").config();



const app = express();
const PORT = process.env.PORT || 8000;
app.locals.port = PORT;


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/url",restrictToLoggedInUserOnly ,urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);



connectMongoDb(process.env.MONGODB_URI).then(() => 
  console.log('MongoDB connected')
);

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
