const express = require("express");
require("dotenv").config();

let app = express();

let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
