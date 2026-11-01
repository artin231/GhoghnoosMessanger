const express = require("express");
const path = require("path");
const UserRoutes = require("./routes/UserRoutes.js");
require("dotenv").config();

let app = express();

app.use(express.json());
app.use("/api/user/", UserRoutes);

app.use(express.static(path.join(__dirname, "../FrontEnd")));

app.get(/(.*)/, (req, res) => {
res.sendFile(path.join(__dirname, "../FrontEnd/index.html"));
});

let port = process.env.PORT || 8000;
app.listen(port, () => {
console.log(`listening to port ${port}`);
});