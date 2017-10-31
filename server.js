const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookie = require("cookie-parser");
const morgan = require("morgan");

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }



const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(cookie());
app.use(morgan('dev'))
app.use(express.static(path.join("public")));

const polygongs = require('./routes/polygongs');
app.use(polygongs);


app.use((req, res) => {
  res.sendStatus(404);
});

// console.log("hayo");


app.listen(port, () => {
  console.log('listening on port', port)
})
