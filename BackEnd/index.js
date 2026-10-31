const express = require("express");
const UserRoutes = require("./routes/UserRoutes.js");
require("dotenv").config();

let app = express();

app.use("/api/user/", UserRoutes);

let port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
